import { useEffect, useState } from "react";
import {
  query,
  orderBy,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import localforage from "localforage";
//custom
import { db } from "@/firebase";
import { isEmpty } from "@/helpers";
import { useAuth } from "@/context/authContext";

const useDropsFetch = () => {
  const { user: session } = useAuth();
  const [drops, setDrops] = useState([]);
  const [dropsPending, setDropsPending] = useState(false);
  const [dropsError, setDropsError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id?.length > 0) {
        let queryRef = query(
          collection(db, "drops"),
          orderBy("timestamp", "desc")
        );
        localforage.getItem("drops", function (err, value) {
          // if err is non-null, we got an error. otherwise, value is the value
          if (!err && value) {
            setDrops(JSON.parse(value));
          }
        });

        return onSnapshot(
          queryRef,
          (snapshot) => {
            let tmp = [];
            snapshot.forEach((doc) => {
              let timestm = doc.data().timestamp.toDate();
              let d = {
                id: doc.id,
                ...doc.data(),
                timestamp: timestm,
              };

              tmp.push(d);
            });

            setDrops(tmp);
            localforage.setItem("drops", JSON.stringify(tmp), function (err) {
              // if err is non-null, we got an error
            });
            setDropsPending(false);
          },
          (error) => {
            console.info("Drops Hook: getDrops useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.log("Drops   Hook: getDrops useEffect: ", error);
      setDropsError(error);
      setDropsPending(false);
    }
  }, [session, session?.id]);

  return {
    drops,
    dropsPending,
    dropsError
  };
};

export default useDropsFetch;
