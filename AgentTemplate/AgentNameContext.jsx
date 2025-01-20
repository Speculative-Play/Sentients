import { createContext } from "react";

const BotController = createContext(null);

export const BotCore = (props) => {
  return (
    <BotController.Provider value={null}>{props.children}</BotController.Provider>
  );
};

export default BotController;
