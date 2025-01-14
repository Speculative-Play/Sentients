// Root for Jay Mort
import { useContext } from "react";
import { ChatScreen, ScreenContainer, SettingsPanel } from "../common";
import AppContext, { AppProvider } from "./JayMortContext";

const JayMort = (props) => {
  return (
    <AppProvider>
      <ScreenContainer>
        <SettingsPanel
          title={"Jay Mort"}
          subtitle={"Your AI Companion!"}
          smallSubtitle={"Terminally ill"}
        />
        <ChatScreen context={AppContext} />
      </ScreenContainer>
    </AppProvider>
  );
};
export default JayMort;
