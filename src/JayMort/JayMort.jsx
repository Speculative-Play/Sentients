// Root for Jay Mort
import { useContext } from "react";
import { ScreenContainer } from "../common";
import AppContext, { AppProvider } from "./JayMortContext";

const JayMort = (props) => {
  return (
    <AppProvider>
      <ScreenContainer>
        <SidePanel />
        <ChatScreen />
      </ScreenContainer>
    </AppProvider>
  );
};

const ChatScreen = (props) => {
  const AppC = useContext(AppContext);
  return (
    <div
      className="border-double border-4 border-black h-full bg-black text-white"
      style={{ width: "70%" }}
    ></div>
  );
};

const SidePanel = (props) => {
  return (
    <div
      className="h-full bg-slate-950 text-white text-center"
      style={{ width: "30%" }}
    >
      <h1 className="font-bold text-center mt-5 text-2xl italic">Jay Mort</h1>
      <p className="italic font-light text-[8px] mt-10">Terminally ill,</p>
      <p className="italic font-light text-m mt-2">Your AI Companion!</p>
    </div>
  );
};
export default JayMort;
