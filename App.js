import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  RobotoMono_100Thin,
  RobotoMono_200ExtraLight,
  RobotoMono_300Light,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
  RobotoMono_100Thin_Italic,
  RobotoMono_200ExtraLight_Italic,
  RobotoMono_300Light_Italic,
  RobotoMono_400Regular_Italic,
  RobotoMono_500Medium_Italic,
  RobotoMono_600SemiBold_Italic,
  RobotoMono_700Bold_Italic,
} from "@expo-google-fonts/roboto-mono";
import { SettingsPanel } from "./src/Views/SettingsPanel";
import { ChatScreen } from "./src/Views/ChatScreen";
import { Platform } from "react-native";
import { AppProvider } from "./src/Contexts/AppContext";
import React from "react";

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoMono_100Thin,
    RobotoMono_200ExtraLight,
    RobotoMono_300Light,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
    RobotoMono_100Thin_Italic,
    RobotoMono_200ExtraLight_Italic,
    RobotoMono_300Light_Italic,
    RobotoMono_400Regular_Italic,
    RobotoMono_500Medium_Italic,
    RobotoMono_600SemiBold_Italic,
    RobotoMono_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      {Platform.OS == "web" ? (
        <React.Fragment>
          <SettingsPanel />
          <ChatScreen />
        </React.Fragment>
      ) : (
        <>
          <StatusBar style="auto" />
          <ChatScreen />
        </>
      )}
    </AppProvider>
  );
}
