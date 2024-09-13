import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Switch, Platform } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../Contexts/AppContext";
import DropDownPicker from "react-native-dropdown-picker";

const PersonalitySlider = (props) => {
  const AppC = useContext(AppContext);
  const SAMColorPalette = AppC.SAMColorPalette;
  const SAMFonts = AppC.SAMFonts;
  const stylesheet = StyleSheet.create({
    label: {
      color: SAMColorPalette.white,
      fontSize: 16,
      marginTop: 5,
      fontFamily: SAMFonts.LightItalic,
    },
    trackStyle: {
      backgroundColor: SAMColorPalette.slider_bar + "D0",
      height: "20%",
      borderRadius: 10,
    },
  });
  return (
    <>
      <Text style={stylesheet.label}>{props.label}</Text>
      <Slider
        thumbTintColor={SAMColorPalette.slider_handle}
        step={1}
        trackStyle={stylesheet.trackStyle}
        minimumValue={1}
        maximumValue={3}
        onSlidingComplete={(val) => {
          props.onChange(val[0] ?? 1);
        }}
        value={props.value}
      />
    </>
  );
};

export const SettingsPanel = (props) => {
  const AppC = useContext(AppContext);
  const SAMColorPalette = AppC.SAMColorPalette;
  const SAMFonts = AppC.SAMFonts;
  const [secureText, setSecureText] = useState(true);
  const [showModelSelector, setShowModelSelector] = useState(false);

  const stylesheet = StyleSheet.create({
    container: {
      width: Platform.OS == "web" ? "25%" : "100%",
      alignSelf: "flex-start",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "3%",
      backgroundColor: SAMColorPalette.settings_bar_bg,
    },
    titleContainer: {
      width: "60%",
      marginBottom: "15%",
      marginTop: "5%",
      alignItems: "baseline",
    },
    title: {
      fontSize: 30,
      fontFamily: SAMFonts.BoldItalic,
      color: SAMColorPalette.white,
    },
    subtitle: {
      fontFamily: SAMFonts.ExtraLightItalic,
      fontSize: 14,
      color: SAMColorPalette.white,
    },
    heading: {
      color: SAMColorPalette.white,
      fontSize: 18,
      marginBottom: 10,
      fontFamily: SAMFonts.Medium,
    },
    label: {
      color: SAMColorPalette.white,
      fontSize: 16,
      marginVertical: 8,
      fontFamily: SAMFonts.LightItalic,
    },
    apikey: {
      width: "100%",
      height: 45,
      backgroundColor: SAMColorPalette.AI_chat_bubble + "90",
      borderColor: SAMColorPalette.white,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 12,
      color: SAMColorPalette.white,
      fontFamily: SAMFonts.Regular,
    },
  });

  return (
    <SafeAreaView style={stylesheet.container}>
      <View style={stylesheet.titleContainer}>
        <Text style={stylesheet.title}>S.A.M.</Text>
        <Text style={stylesheet.subtitle}>The relationship coach</Text>
      </View>

      {/* <View style={{ width: "60%" }}>
        <Text style={stylesheet.heading}>PERSONALITY SETTINGS</Text>

        <PersonalitySlider
          label={"EMPATHY"}
          value={AppC.empathy}
          onChange={AppC.setEmpathy}
        />
        <PersonalitySlider
          label={"FLIRTATION"}
          value={AppC.flirtation}
          onChange={AppC.setFlirtation}
        />
      </View> */}
      <View style={{ width: "60%", marginTop: 30 }}>
        <View>
          <Text style={stylesheet.heading}>ENGINE SETTINGS</Text>
          <Text style={stylesheet.label}>API Key</Text>
          <TextInput
            style={stylesheet.apikey}
            placeholderTextColor={SAMColorPalette.white}
            placeholder="OpenAI API Key..."
            value={AppC.openAIKey}
            onChangeText={AppC.setOpenAIKey}
            spellCheck={false}
            secureTextEntry={secureText}
            onFocus={() => {
              setSecureText(false);
            }}
            onBlur={() => {
              setSecureText(true);
            }}
          />
        </View>
      </View>

      <View style={{ width: "60%", marginTop: 30 }}>
        <Text style={stylesheet.label}>GPT Model</Text>
        <DropDownPicker
          open={showModelSelector}
          setOpen={setShowModelSelector}
          value={AppC.model}
          setValue={AppC.setModel}
          items={AppC.CONSTANTS.MODELS?.map((v) => ({
            label: v,
            value: v,
          }))}
          textStyle={{
            fontSize: 12,
            fontFamily: SAMFonts.Regular,
            color: SAMColorPalette.white,
          }}
          style={{
            backgroundColor: SAMColorPalette.AI_chat_bubble + "90",
            borderColor: SAMColorPalette.white,
            borderWidth: 1,
            borderRadius: 8,
          }}
          dropDownContainerStyle={{
            backgroundColor: SAMColorPalette.AI_chat_bubble + "90",
            borderColor: SAMColorPalette.white,
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
      </View>

      <View
        style={{
          width: "60%",
          marginTop: "auto",
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: SAMColorPalette.white,
            fontSize: 14,
            fontFamily: SAMFonts.BoldItalic,
            marginRight: 20,
          }}
        >
          Dark Mode
        </Text>
        <Switch
          value={AppC.darkmode}
          onValueChange={AppC.setDarkmode}
          thumbColor={SAMColorPalette.user_chat_bubble}
          trackColor={"white"}
        />
      </View>
    </SafeAreaView>
  );
};
