import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../Contexts/AppContext";

const ChatBubble = (props) => {
  const AppC = useContext(AppContext);
  const SAMColorPalette = AppC.SAMColorPalette;
  const SAMFonts = AppC.SAMFonts;
  const stylesheet = StyleSheet.create({
    container: {
      backgroundColor: props.AI
        ? SAMColorPalette.AI_chat_bubble
        : SAMColorPalette.user_chat_bubble,
      minHeight: 40,
      maxWidth: Platform.OS == "web" ? "65%" : "70%",
      borderRadius: Platform.OS == "web" ? 20 : 16,
      borderBottomLeftRadius: props.AI ? 0 : Platform.OS == "web" ? 20 : 16,
      borderBottomRightRadius: props.AI ? (Platform.OS == "web" ? 20 : 16) : 0,
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 5,
      alignItems: props.AI ? "flex-start" : "flex-end",
      alignSelf: props.AI ? "flex-start" : "flex-end",
    },
    text: {
      fontFamily: SAMFonts.Regular,
      fontSize: Platform.OS == "web" ? 16 : 12,
      color: SAMColorPalette.message,
    },
  });
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.text}>{props.message}</Text>
    </View>
  );
};

const MobileTitle = (props) => {
  const AppC = useContext(AppContext);
  const SAMColorPalette = AppC.SAMColorPalette;
  const SAMFonts = AppC.SAMFonts;
  const stylesheet = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: SAMColorPalette.AI_chat_bubble,
      borderBottomWidth: StyleSheet.hairlineWidth,
      padding: 10,
    },
    settingsButton: {
      flexDirection: "row",
      justifyContent: "center",
      color: SAMColorPalette.message
    },
  });
  return (
    <View style={stylesheet.container}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: SAMFonts.Bold,
          color: SAMColorPalette.message,
        }}
      >
        S.A.M.
      </Text>
      <Ionicons
        name="settings-outline"
        size={18}
        onPress={() => props.navigate("Settings")}
        style={stylesheet.settingsButton}
      />
    </View>
  );
};

export const ChatScreen = (props) => {
  const AppC = useContext(AppContext);
  const SAMColorPalette = AppC.SAMColorPalette;
  const SAMFonts = AppC.SAMFonts;

  const [message, setMessage] = useState("");

  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  const stylesheet = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "space-between",
      width: Platform.OS == "web" ? "75%" : "100%",
      marginVertical: Platform.OS == "web" ? "3%" : 0,
      flex: 1,
      backgroundColor: SAMColorPalette.chat_screen_bg
    },
    newMessageBar: {
      flexDirection: "row",
      width: Platform.OS == "web" ? "85%" : "100%",
      alignSelf: "center",
      justifyContent: "space-between",
      borderRadius: Platform.OS == "web" ? 10 : 0,
      paddingHorizontal: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: SAMColorPalette.AI_chat_bubble,
      backgroundColor:
        Platform.OS == "web" ? SAMColorPalette.input_bar_bg : "transparent",
    },
    inputField: {
      minHeight: 50,
      flex: 1,
      fontFamily: SAMFonts.Regular,
      marginRight: 10,
      backgroundColor: "transparent",
      color: SAMColorPalette.message,
    },
  });

  useEffect(() => {
    // messagesRef?.current?._listRef?._scrollRef?.scrollToEnd(); // for flatlist
    messagesRef?.current?.scrollToEnd(); //for ScrollView
  }, [message, AppC.history]);

  async function SendMessage() {
    if (ValidMessage(message)) {
      setMessage("");
      await AppC.SendNewMessage(message);
    }
  }

  function ValidMessage(msg) {
    if (msg.trim() === "") {
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={stylesheet.container}>
      {Platform.OS == "web" ? null : <MobileTitle navigate={props.navigation.navigate} />}

      <ScrollView
        ref={messagesRef}
        showsVerticalScrollIndicator={false}
        style={{
          width: Platform.OS == "web" ? "85%" : "97%",
          height: Dimensions.get("window").height * 0.8,
          marginBottom: 10,
        }}
      >
        {AppC.history?.map((item, idx) =>
          item.role !== AppC.CONSTANTS.ROLES.SYSTEM ? (
            <ChatBubble
              key={idx}
              AI={item.role === AppC.CONSTANTS.ROLES.ASSISTANT}
              message={item.content}
            />
          ) : null
        )}
      </ScrollView>
      <View style={stylesheet.newMessageBar}>
        <TextInput
          ref={inputRef}
          placeholder="Say something to SAM..."
          placeholderTextColor={SAMColorPalette.shadow_color + "50"}
          value={message}
          onSubmitEditing={() => {
            SendMessage();
          }}
          onChangeText={setMessage}
          style={stylesheet.inputField}
          autoFocus
        />
        <Ionicons
          name="send"
          onPress={SendMessage}
          size={20}
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
          color={SAMColorPalette.user_chat_bubble}
        />
      </View>
      {Platform.OS == "ios" ? (
        <KeyboardAvoidingView behavior={"padding"} />
      ) : null}
    </SafeAreaView>
  );
};
