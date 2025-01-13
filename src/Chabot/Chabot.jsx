// Root for Chabot

import React from "react";
import SettingsPanel from "./SettingsPanel";
import ChatScreen from "./ChatScreen";
import { AppProvider } from "./ChabotContext";
import { ScreenContainer } from "../common";

const Chabot = (props) => {
  return (
    <AppProvider>
      <ScreenContainer>
        <SettingsPanel />
        <ChatScreen />
      </ScreenContainer>
    </AppProvider>
  );
};

export default Chabot;
