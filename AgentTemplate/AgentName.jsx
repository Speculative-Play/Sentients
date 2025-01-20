// Root for Jay Mort
import { useContext } from "react";
import { ScreenContainer } from "../src/common.jsx";
import BotController, { BotCore } from "./AgentNameContext.jsx";

const AgentName = (props) => {
  return (
    <BotCore>
      <ScreenContainer>
        <SidePanel />
        <ChatScreen />
      </ScreenContainer>
    </BotCore>
  );
};

const ChatScreen = (props) => {
  const BotC = useContext(BotController);
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
