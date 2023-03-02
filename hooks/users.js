import { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  limit,
  addDoc,
  setDoc,
  orderBy,
  endAt,
  startAt,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../firebase";
import localforage from "localforage";
//import { useAuth } from "../context/authContext";
//custom

const useUsersFetch = () => {
  //const { user: session } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [usersPending, setUsersPending] = useState(false);
  const [page, setPage] = useState(null);


  useEffect(() => {
    try {
      let queryRef = query(collection(db, "users"));
      localforage.getItem("users", function (err, value) {
        // if err is non-null, we got an error. otherwise, value is the value
        if (!err && value) {
          setUsers(JSON.parse(value));
        }
      });

      return onSnapshot(
        queryRef,
        (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let per = { id: doc.id, ...doc.data() };
            tmp.push(per);
          });

          setUsers(tmp);
          localforage.setItem("users", JSON.stringify(tmp), function (err) {
            // if err is non-null, we got an error
          });
          setUsersError(false);
        },
        (error) => {
          console.info("Users Hook: getDataFromDb useEffect: ", error);
        }
      );
    } catch (error) {
      console.info("Users Hook: getDataFromDb useEffect: ", error);
      setUsersError(error);
      setUsersPending(false);
    }
  }, []);

  return {
    users,
    usersPending,
    usersError,
  };
};

export default useUsersFetch;
