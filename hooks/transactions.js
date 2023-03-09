import { useEffect, useState } from "react";
import { query, orderBy, collection, onSnapshot } from "@firebase/firestore";
import localforage from "localforage";
//custom
import { db } from "@/firebase";
import { isEmpty } from "@/helpers";
import { useAuth } from "@/context/authContext";

const useTransactionsFetch = () => {
  const { user: session } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [transactionsPending, setTransactionsPending] = useState(false);
  const [transactionsError, setTransactionsError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id?.length > 0) {
        let queryRef = query(
          collection(db, "transactions"),
          orderBy("timestamp", "desc")
        );
        localforage.getItem("transactions", function (err, value) {
          // if err is non-null, we got an error. otherwise, value is the value
          if (!err && value) {
            setTransactions(JSON.parse(value));
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

            setTransactions(tmp);
            localforage.setItem(
              "transactions",
              JSON.stringify(tmp),
              function (err) {
                // if err is non-null, we got an error
              }
            );
            setTransactionsPending(false);
          },
          (error) => {
            console.info(
              "Transactions Hook: getTransactions useEffect: ",
              error
            );
          }
        );
      }
    } catch (error) {
      console.log("Transactions   Hook: getTransactions useEffect: ", error);
      setTransactionsError(error);
      setTransactionsPending(false);
    }
  }, [session, session?.id]);

  return {
    transactions,
    transactionsPending,
    transactionsError,
  };
};

export default useTransactionsFetch;
