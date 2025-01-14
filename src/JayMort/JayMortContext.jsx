import { createContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = (props) => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState("");

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      {props.children}
    </AppContext.Provider>
  );
};


export default AppContext;
