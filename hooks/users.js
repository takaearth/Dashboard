import { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "@firebase/firestore";
import localforage from "localforage";
//custom
import { db } from "@/firebase";

const useUsersFetch = () => {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [usersPending, setUsersPending] = useState(false);

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
            let timestm = doc.data().created.toDate();
            let per = { id: doc.id, ...doc.data(), created: timestm };
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
