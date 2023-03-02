import { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  limit,
  addDoc,
  setDoc,
  orderBy,
  collection,
  onSnapshot,
} from "@firebase/firestore";
//custom
import { db } from "../../firebase";
import { isEmpty } from "../utility";
import { useAuth } from "../../context/authContext";
import useUserFetch from "./user";

const usePersonFetch = (phoneNumber) => {
  const { user: session } = useAuth();
  const { users } = useUserFetch();
  const [person, setPerson] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [pending, setPending] = useState(false);
  const [transPending, setTransPending] = useState(false);
  const [error, setError] = useState(null);
  const [transError, setTransError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [phoneNumber]);

  useEffect(() => {
    try {
      if (phoneNumber?.length > 0 && phoneNumber?.length === 13) {
        setPending(true);

        //find user in users array with phone number
        let tmp = users.find((u) => u.id === phoneNumber);
        if (tmp) {
          setPerson(tmp);
          setPending(false);
        } else {
          setPerson(tmp);
          setPending(false);
        }
      } else {
        setPerson({});
        setPending(false);
      }
    } catch (error) {
      console.warn("Person Hook: getDataFromDb useEffect: ", error);
      setError(error);
      setPending(false);
    }
  }, [phoneNumber, users]);

  useEffect(() => {
    try {
      if (phoneNumber?.length > 0 && phoneNumber?.length === 13) {
        setTransPending(true);
        let queryRef = query(
          collection(db, "transactions"),
          where("user", "==", phoneNumber)
        );

        return onSnapshot(
          queryRef,
          (snapshot) => {
            let tmp = [];
            snapshot.forEach((doc) => {
              //let timestm = doc.data().timestamp.toDate();
              let tr = {
                id: doc.id,
                ...doc.data(),
                //timestamp: timestm,
              };

              tmp.push(tr);
            });

            setTransactions(tmp);
            setTransPending(false);
          },
          (error) => {
            console.info("User Hook: getUserNotifications useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.info("User Hook: getUserNotifications: ", error);
      setTransError(error);
      setTransPending(false);
    }
  }, [phoneNumber]);

  function createUserAccount(obj) {
    return new Promise((resolve, reject) => {
      try {
        if (!isEmpty(person)) {
          reject("User already exists");
        } else if (obj.phone?.length !== 13) {
          reject("Invalid phone number");
        } else {
          let { phone, name } = obj;
          let colRef = doc(db, "users", phone);

          setDoc(colRef, { name, points: 5 }).then((res) => {
            resolve("done");
          });
        }
      } catch (error) {
        console.warn("Person Hook: createUserAccount:");
        console.error(error);
        reject(error);
      }
    });
  }

  function createDropOffTransaction(obj) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(obj)) {
          reject("Nothing to update");
        } else if (phoneNumber?.length !== 13) {
          reject("Invalid phone number");
        } else if (session?.id?.length < 1) {
          reject("Please sign in");
        } else {
          let colRef = collection(db, "drops");
          obj.submitted = session.id;
          obj.status = "pending";

          addDoc(colRef, obj).then((res) => resolve("done"));
        }
      } catch (error) {
        console.warn("Person Hook: createDropOffTransaction:");
        console.error(error);
        reject(error);
      }
    });
  }

  return {
    person,
    transactions,

    pending,
    transPending,

    error,
    transError,
    createUserAccount,
    createDropOffTransaction,
  };
};

export default usePersonFetch;
