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
import localforage from "localforage";
//custom
import { db } from "@/firebase";
import { isEmpty } from "@/helpers";
import { useAuth } from "@/context/authContext";

const useFeedbackFetch = () => {
  const { user: session } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [feedbackPending, setFeedbackPending] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id?.length > 0) {
        let queryRef = query(
          collection(db, "feedback"),
          //orderBy("timestamp", "desc")
        );
        localforage.getItem("feedback", function (err, value) {
          // if err is non-null, we got an error. otherwise, value is the value
          if (!err && value) {
            setFeedback(JSON.parse(value));
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

            setFeedback(tmp);
            localforage.setItem("feedback", JSON.stringify(tmp), function (err) {
              // if err is non-null, we got an error
            });
            setFeedbackPending(false);
          },
          (error) => {
            console.info("Feedback Hook: getFeedback useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.log("Feedback   Hook: getFeedback useEffect: ", error);
      setFeedbackError(error);
      setFeedbackPending(false);
    }
  }, [session, session?.id]);

  return {
    feedback,
    feedbackPending,
    feedbackError
  };
};

export default useFeedbackFetch;
