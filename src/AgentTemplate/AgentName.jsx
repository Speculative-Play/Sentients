// Root for Jay Mort
import { useContext } from "react";
import { ScreenContainer } from "../common";
import AppContext, { AppProvider } from "./AgentNameContext";

const AgentName = (props) => {
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
      className="border-double border-4 border-black h-full bg-[#d3d3d3]"
      style={{ width: "70%" }}
    ></div>
  );
};

const SidePanel = (props) => {
  return (
    <div
      className="border-double border-4 border-black h-full"
      style={{ width: "30%" }}
    />
  );
};

export default AgentName;
