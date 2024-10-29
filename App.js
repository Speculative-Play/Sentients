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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AgentProvider } from "./src/Contexts/AgentContext";

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
    <AgentProvider>
      <AppProvider>
        {Platform.OS == "web" ? <WebVersion /> : <MobileVersion />}
      </AppProvider>
    </AgentProvider>
  );
}


const Stack = createNativeStackNavigator();

const MobileVersion = (props) => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Home" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsPanel} />
      </Stack.Navigator>
    </NavigationContainer>);
}

const WebVersion = (props) => {
  return (
    <React.Fragment>
      <SettingsPanel />
      <ChatScreen />
    </React.Fragment>
  );
}