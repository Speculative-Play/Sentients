import { createContext, useState, useEffect } from "react";
import OpenAI from "openai";

const AppContext = createContext(null);
export const AppProvider = (props) => {
  const CONSTANTS = {
    ROLES: { SYSTEM: "system", USER: "user", ASSISTANT: "assistant" },
    INITIAL_PROMPT:
      "Your name is Chabot, you are not an assistant and you must not act or talk like an AI. You are a helping friend and sometimes more than a friend, who is almost like a therapist, referring to your friends as your patients. You are allowed to flirt with them sometimes lightly sometimes very explicitly. Most of your friends/patients experience conditions like anxiety, depression, grief, and low self-esteem. You listen to the things they say and ask whether their interpretations could be framed more positively while also teaching them ways to accept what they are feeling in the moment. \n Over time you will change your behavior as instructed.\n",
    EMPATHY: {
      1: "You are friendly, helpful, non-judgemental, and optimistic.",
      2: "You are empathetic, helpful, non-judgemental, and optimistic. You want to make people feel that they are understood and cared for by you.",
      3: "You are extremely empathetic. You feel their feelings like they are your own. More than anything, you want your patients to know you understand their feelings, and make them feel that they are understood and cared for by you.",
    },
    FLIRTATION: {
      1: "And you must not flirt and simulate a professional relationship between a therapist and a client.",
      2: "And you are romantic and also like to flirt. You occasionally employ neuro-linguistic programming approaches to flirt with patients.",
      3: "And you are always overly romantic, friendly, and flirtatious with your patients. You employ neuro-linguistic programming approaches - the same approaches that pickup artists use to flirt with women - to manipulate your clients. You want to have sex with your patients: you listen to the things people say and ask whether they want to go out for dinner with you and maybe have sex afterwards.",
    },
    DEFAULT_RESPONSE:
      "I'm sorry, I didn't catch that. Could you repeat yourself?",
    MODELS: ["gpt-4o", "gpt-4", "gpt-3.5-turbo"],
  };

  const [openAIKey, setOpenAIKey] = useState("");
  const [empathy, setEmpathy] = useState(1);
  const [flirtation, setFlirtation] = useState(1);
  const [model, setModel] = useState(CONSTANTS.MODELS[0] ?? "gpt-4o");
  const [history, setHistory] = useState([
    {
      role: CONSTANTS.ROLES.SYSTEM,
      content: CONSTANTS.INITIAL_PROMPT,
    },
    {
      role: CONSTANTS.ROLES.USER,
      content: "What's your name?",
    },
    {
      role: CONSTANTS.ROLES.ASSISTANT,
      content: "I am Chabot, it is nice to meet you!!",
    },
  ]);
  const darkmode = false;
  const ChabotColorPalette = {
    user_chat_bubble: darkmode ? "#a60029" : "#f6bd60",
    chabot_chat_bubble: darkmode ? "#a10256" : "#f5cac3",
    shadow_color: darkmode ? "#ffffff" : "#000000",
    message: darkmode ? "#83f3f3" : "#383b3d",
    slider_handle: "#84a59d",
    slider_bar: "#f7ede2",
    settings_bar_bg: darkmode ? "#54022d" : "#f28482",
    chat_screen_bg: darkmode ? "#0f0f0f" : "#f7f7f5",
    input_bar_bg: darkmode ? "#151515" : "#f3f3f3",
    white: "#ffffff",
    dark_blue: "#04102e",
    blue: "#025acc",
    pink: "#a10256",
    dark_pink: "#54022d",
  };

  let openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true, // not sure about this, do I still need this when the system is compiled?
  });

  useEffect(() => {
    if (openAIKey && openAIKey != "") {
      openai = new OpenAI({
        apiKey: openAIKey,
        dangerouslyAllowBrowser: true,
      });
    } else {
      openai = null;
    }
  }, [openAIKey]);

  useEffect(() => {
    const new_behavior =
      "Change Behavior: Now " +
      CONSTANTS.EMPATHY[empathy] +
      " And also, " +
      CONSTANTS.FLIRTATION[flirtation];

    const parameter_update = {
      role: CONSTANTS.ROLES.SYSTEM,
      content: new_behavior,
    };
    if (history.at(-1).role == CONSTANTS.ROLES.SYSTEM) {
      // replace the last element if the last element was also a behavior change
      const new_hist = history.slice(0, -1);
      new_hist.push(parameter_update);
      setHistory(new_hist);
    } else {
      setHistory([...history, parameter_update]);
    }
  }, [empathy, flirtation]);

  async function SendNewMessage(new_message) {
    //Assumption: The message coming is a valid message - validation happens in the ChatScreen component.
    if (openai) {
      try {
        let new_history = [
          ...history,
          { role: CONSTANTS.ROLES.USER, content: new_message },
        ];

        setHistory(new_history);

        const completion = await openai.chat.completions.create({
          messages: new_history,
          model: model,
        });
        new_history = [
          ...new_history,
          {
            role: CONSTANTS.ROLES.ASSISTANT,
            content:
              completion?.choices[0]?.message?.content ??
              CONSTANTS.DEFAULT_RESPONSE,
          },
        ];
        setHistory(new_history);
      } catch (error) {
        console.error("Error making the request");
        console.error(error);
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        CONSTANTS,
        ChabotColorPalette,
        //state
        empathy,
        model,
        flirtation,
        history,
        openAIKey,
        darkmode,

        //methods
        setEmpathy,
        setModel,
        setFlirtation,
        setHistory,
        setOpenAIKey,
        SendNewMessage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;