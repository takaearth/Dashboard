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

const usePickupsFetch = () => {
  const { user: session } = useAuth();
  const [pickups, setPickups] = useState([]);

  const [pickupsPending, setPickupsPending] = useState(false);

  const [pickupsError, setPickupsError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id?.length > 0) {
        let queryRef = query(
          collection(db, "pickup_requests"),
         // orderBy("timestamp", "desc")
        );
        localforage.getItem("pickups", function (err, value) {
          // if err is non-null, we got an error. otherwise, value is the value
          if (!err && value) {
            setPickups(JSON.parse(value));
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

            setPickups(tmp);
            localforage.setItem("pickups", JSON.stringify(tmp), function (err) {
              // if err is non-null, we got an error
            });
            setPickupsPending(false);
          },
          (error) => {
            console.info("Pickups Hook: getPickups useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.log("Pickups   Hook: getPickups useEffect: ", error);
      setPickupsError(error);
      setPickupsPending(false);
    }
  }, [session, session?.id]);

  return {
    pickups,
    pickupsPending,
    pickupsError
  };
};

export default usePickupsFetch;
