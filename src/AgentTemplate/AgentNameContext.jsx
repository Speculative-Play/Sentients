import { createContext } from "react";

const AppContext = createContext(null);

export const AppProvider = (props) => {
  return (
    <AppContext.Provider value={null}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
