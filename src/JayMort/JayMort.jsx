// Root for Jay Mort
import { useEffect, useContext } from "react";
import { ChatScreen, ScreenContainer, SettingsPanel } from "../common";
import AppContext, { AppProvider } from "./JayMortContext";

const JayMort = (props) => {

  const AppC = useContext(AppContext);

  return (
    <AppProvider>
      <ScreenContainer>
        <SettingsPanel
          title={"Jay Mort"}
          subtitle={"Your AI Companion!"}
          smallSubtitle={"Terminally ill"}
        >
          <p>Hello world</p>
        </SettingsPanel>
        <ChatScreen context={AppContext} />
      </ScreenContainer>
    </AppProvider>
  );
};
export default JayMort;
