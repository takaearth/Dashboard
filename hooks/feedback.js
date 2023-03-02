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
import { db } from "../firebase";
import localforage from "localforage";
import { useAuth } from "../context/authContext";
import { isEmpty } from "@/helpers";
//custom

const useFeedbackFetch = () => {
  const { user: session } = useAuth();
  const [ussdfeed, setUssdfeed] = useState([]);

  const [ussdfeedPending, setUssdfeedPending] = useState(false);

  const [ussdfeedError, setUssdfeedError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id?.length > 0) {
        let queryRef = query(
          collection(db, "ussd_feedback"),
          //orderBy("timestamp", "desc")
        );
        localforage.getItem("ussdfeed", function (err, value) {
          // if err is non-null, we got an error. otherwise, value is the value
          if (!err && value) {
            setUssdfeed(JSON.parse(value));
          }
        });

        return onSnapshot(
          queryRef,
          (snapshot) => {
            let tmp = [];
            snapshot.forEach((doc) => {
              //let timestm = doc.data().timestamp.toDate();
              let d = {
                id: doc.id,
                ...doc.data(),
                //timestamp: timestm,
              };

              tmp.push(d);
            });

            setUssdfeed(tmp);
            localforage.setItem("ussdfeed", JSON.stringify(tmp), function (err) {
              // if err is non-null, we got an error
            });
            setUssdfeedPending(false);
          },
          (error) => {
            console.info("Ussdfeed Hook: getUssdfeed useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.log("Ussdfeed   Hook: getUssdfeed useEffect: ", error);
      setUssdfeedError(error);
      setUssdfeedPending(false);
    }
  }, [session, session?.id]);

  return {
    ussdfeed,
    ussdfeedPending,
    ussdfeedError
  };
};

export default useFeedbackFetch;
