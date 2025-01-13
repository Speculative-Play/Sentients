import AppContext from "./ChabotContext";
import { useContext, useState } from "react";
import { Slider, RangeSlider } from "rsuite";

const PersonalitySlider = (props) => {
  const AppC = useContext(AppContext);
  return (
    <>
      <p className="text-base text-slate-800">{props.label}</p>
      <Slider
        progress
        step={1}
        min={1}
        max={3}
        style={{ color: AppC.ChabotColorPalette.slider_handle }}
        value={props.value}
        onChangeCommitted={(val) => {
          props.onChange(val[0] ?? 1);
        }}
      />
    </>
  );
};

const SettingsPanel = (props) => {
  // const AppC = useContext(AppContext);
  // const ChabotColorPalette = AppC.ChabotColorPalette;
  // const [secureText, setSecureText] = useState(true);

  // const stylesheet = {
  //   container: {
  //     width: "25%",
  //     alignSelf: "flex-start",
  //     height: "100%",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     paddingTop: "3%",
  //     backgroundColor: ChabotColorPalette.settings_bar_bg,
  //   },
  //   titleContainer: {
  //     width: "60%",
  //     marginBottom: "15%",
  //     marginTop: "5%",
  //     alignItems: "baseline",
  //   },
  //   title: {
  //     fontSize: 30,
  //     color: ChabotColorPalette.white,
  //   },
  //   subtitle: {
  //     fontSize: 14,
  //     color: ChabotColorPalette.white,
  //   },
  //   heading: {
  //     color: ChabotColorPalette.white,
  //     fontSize: 18,
  //     marginBottom: 10,
  //   },
  //   label: {
  //     color: ChabotColorPalette.white,
  //     fontSize: 16,
  //     marginVertical: 8,
  //   },
  //   apikey: {
  //     width: "100%",
  //     height: 45,
  //     backgroundColor: ChabotColorPalette.chabot_chat_bubble + "90",
  //     borderColor: ChabotColorPalette.white,
  //     borderWidth: 1,
  //     borderRadius: 8,
  //     paddingHorizontal: 10,
  //     fontSize: 12,
  //     color: ChabotColorPalette.white,
  //   },
  // };

  return (
    <div
      className="h-full bg-[#f28482] text-white text-center px-10"
      style={{ width: "30%" }}
    >
      <h1 className="font-bold text-center mt-5 text-2xl italic">ChaBot</h1>
      <p className="italic font-light text-m mt-2">
        A therapist who really wants to help!
      </p>

      <div>
        <h2 className="mt-10 font-medium">PERSONALITY SETTINGS</h2>
        <p>Empathy</p>
        <Slider
          progress
          min={1}
          max={3}
          barClassName=""
          handleStyle={{
            borderRadius: 10,
            color: "#fff",
            fontSize: 12,
            width: 32,
            height: 22,
          }}
        />
        <p>Flirtation</p>
      </div>
    </div>
  );

  // return (
  //   <div style={stylesheet.container}>
  //     <div style={stylesheet.titleContainer}>
  //       <p style={stylesheet.title}>
  //         Cha
  //         <p style={{ color: ChabotColorPalette.chabot_chat_bubble }}>BoT</p>
  //       </p>
  //       <p style={stylesheet.subtitle}>
  //         A therapist who
  //         <p>{" really "}</p>
  //         wants to help
  //       </p>
  //     </div>

  //     <div style={{ width: "60%" }}>
  //       <p style={stylesheet.heading}>PERSONALITY SETTINGS</p>

  //       <PersonalitySlider
  //         label={"EMPATHY"}
  //         value={AppC.empathy}
  //         onChange={AppC.setEmpathy}
  //       />
  //       <PersonalitySlider
  //         label={"FLIRTATION"}
  //         value={AppC.flirtation}
  //         onChange={AppC.setFlirtation}
  //       />
  //     </div>
  //     <div style={{ width: "60%", marginTop: 30 }}>
  //       <div>
  //         <p style={stylesheet.heading}>ENGINE SETTINGS</p>
  //         <p style={stylesheet.label}>API Key</p>
  //         <input
  //           style={stylesheet.apikey}
  //           placeholderTextColor={ChabotColorPalette.white}
  //           placeholder="OpenAI API Key..."
  //           value={AppC.openAIKey}
  //           onChangeText={AppC.setOpenAIKey}
  //           spellCheck={false}
  //           secureTextEntry={secureText}
  //           onFocus={() => {
  //             setSecureText(false);
  //           }}
  //           onBlur={() => {
  //             setSecureText(true);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SettingsPanel;
