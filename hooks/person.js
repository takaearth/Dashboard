import { doc, getDoc } from "@firebase/firestore";
//custom
import { db } from "@/firebase";

const usePersonFetch = () => {
  function getPersonFromDb(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = doc(db, "takaEmployees", id);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          resolve(docSnap.data());
        } else {
          reject("Not Found");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    getPersonFromDb,
  };
};

export default usePersonFetch;
