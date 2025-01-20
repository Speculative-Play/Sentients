import { createContext, useState, useEffect } from "react";
import OpenAI from "openai";

const BotController = createContext(null);

const ASSISTANTS = [
  [
    import.meta.env.VITE_CHABOT_E1F1,
    import.meta.env.VITE_CHABOT_E1F2,
    import.meta.env.VITE_CHABOT_E1F3,
  ],
  [
    import.meta.env.VITE_CHABOT_E2F1,
    import.meta.env.VITE_CHABOT_E2F2,
    import.meta.env.VITE_CHABOT_E2F3,
  ],
  [
    import.meta.env.VITE_CHABOT_E3F1,
    import.meta.env.VITE_CHABOT_E3F2,
    import.meta.env.VITE_CHABOT_E3F3,
  ],
];
export const BotCore = (props) => {
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(0); // 0 is history, 1 is interactive chat

  const [empathy, setEmpathy] = useState(1);
  const [flirtation, setFlirtation] = useState(1);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [thread, setThread] = useState(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    // Load a thread -- this is called twice in dev so be careful!
    CreateThread();
  }, []);

  useEffect(() => {
    // retrieve history from thread
    FetchThreadMessages();
  }, [thread]);

  var elem = document.getElementById("chatscreen");
  useEffect(() => {
    if (elem) {
      elem.scrollTop = elem?.scrollHeight;
    }
  }, [history]);

  function UpdateEmpathy() {
    setEmpathy((empathy % 3) + 1);
  }

  function UpdateFlirtation() {
    setFlirtation((flirtation % 3) + 1);
  }

  async function CreateThread() {
    const thread_id = localStorage.getItem("Chabot_ThreadID");
    console.log(thread_id);
    const starting_messages = [
      {
        content: "Hey, I'm Chabot, it's nice to meet you!",
        role: "assistant",
      },
    ];

    if (!thread_id) {
      openai.beta.threads
        .create({
          messages: starting_messages,
        })
        .then((resp) => {
          setThread(resp);
          localStorage.setItem("Chabot_ThreadID", resp.id);
        });
    } else {
      openai.beta.threads.retrieve(thread_id).then((resp) => {
        setThread(resp);
      });
    }
  }

  async function FetchThreadMessages() {
    if (thread != null) {
      openai.beta.threads.messages
        .list(thread?.id, { limit: 100 })
        .then((resp) => {
          setHistory(resp.body.data?.reverse());
        });
    }
  }

  async function SendMessage() {
    if (message != "") {
      // Create new message on thread
      // Fetch Thread Messages

      openai.beta.threads.messages
        .create(thread.id, {
          role: "user",
          content: message,
        })
        .then(() => {
          FetchThreadMessages();
          ChabotResponse();
          setMessage("");
        });
    }
  }

  async function ChabotResponse() {
    setLoading(true);

    openai.beta.threads.runs
      .createAndPoll(thread.id, {
        assistant_id: ASSISTANTS[empathy - 1][flirtation - 1],
      })
      .then(() => {
        FetchThreadMessages();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function ToggleChatMode() {
    if (chatMode === 0) setChatMode(1);
    else if (chatMode === 1) setChatMode(0);
  }

  function ClearChatHistory() {
    setThread(null);
    setHistory(null);
    localStorage.removeItem("Chabot_ThreadID");
    CreateThread();
  }

  return (
    <BotController.Provider
      value={{
        //state
        empathy,
        flirtation,
        history,
        message,
        chatMode,
        loading,

        //methods
        UpdateEmpathy,
        UpdateFlirtation,
        setMessage,
        SendMessage,
        ToggleChatMode,
        ClearChatHistory,
      }}
    >
      {props.children}
    </BotController.Provider>
  );
};

export default BotController;

const ChabotColorPalette = {
  user_chat_bubble: "#f6bd60",
  chabot_chat_bubble: "#f5cac3",
  shadow_color: "#000000",
  message: "#383b3d",
  slider_handle: "#84a59d",
  slider_bar: "#f7ede2",
  settings_bar_bg: "#f28482",
  chat_screen_bg: "#f7f7f5",
  input_bar_bg: "#f3f3f3",
  white: "#ffffff",
  dark_blue: "#04102e",
  blue: "#025acc",
  pink: "#a10256",
  dark_pink: "#54022d",
};
