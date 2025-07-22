import { createContext, useState, useEffect } from "react";
import OpenAI from "openai";

const BotController = createContext(null);

const ASSISTANTS = [
  [
    import.meta.env.VITE_Schon_INTERVIEW,
    import.meta.env.VITE_Schon_FEEDBACK
  ]
];
export const BotCore = (props) => {
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(0); // 0 is history, 1 is interactive chat

  const [feedback, setFeedback] = useState(0); // 0 interview mode, 1 feedback mode
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

  function UpdateFeedback() {
    setFeedback(feedback);
  }

  async function CreateThread() {
    const thread_id = localStorage.getItem("Schon_ThreadID");
    const starting_messages = [
      {
        content: "Hello. I can help you clarify your design intentions. Please describe what you are working on.",
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
          localStorage.setItem("Schon_ThreadID", resp.id);
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
          SchonResponse();
          setMessage("");
        });
    }
  }

  async function SchonResponse() {
    setLoading(true);

    openai.beta.threads.runs
      .createAndPoll(thread.id, {
        assistant_id: ASSISTANTS[feedback],
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
    localStorage.removeItem("Schon_ThreadID");
    CreateThread();
  }

  return (
    <BotController.Provider
      value={{
        //state
        empathy: feedback,
        history,
        message,
        chatMode,
        loading,

        //methods
        UpdateEmpathy: UpdateFeedback,
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

const SchonColorPalette = {
  user_chat_bubble: "#f6bd60",
  Schon_chat_bubble: "#f5cac3",
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
