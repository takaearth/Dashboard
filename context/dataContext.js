import { useState, useEffect, createContext, useContext } from "react";
//custom

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  //shared app data
  const [selDrop, setSelDrop] = useState(null);

  return {
    selDrop,
    setSelDrop,
  };
}
