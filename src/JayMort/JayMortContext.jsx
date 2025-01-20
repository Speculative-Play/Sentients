import { useEffect, createContext, useState } from "react";
import OpenAI from "openai";
const AppContext = createContext(null);

const ASSISTANTS = [
  import.meta.env.VITE_JAYMORT_DAY1,
  import.meta.env.VITE_JAYMORT_DAY2,
  import.meta.env.VITE_JAYMORT_DAY3,
  import.meta.env.VITE_JAYMORT_DAY4,
  import.meta.env.VITE_JAYMORT_DAY5,
  import.meta.env.VITE_JAYMORT_DAY6,
  import.meta.env.VITE_JAYMORT_DAY7,
  import.meta.env.VITE_JAYMORT_DAY8,
  import.meta.env.VITE_JAYMORT_DAY9,
  null,
  import.meta.env.VITE_JAYMORT_DAY11,
];

export const AppProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(0); // 0 is history, 1 is interactive chat

  const [day, setDay] = useState(0);

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState();
  const [thread, setThread] = useState(null);

  var elem = document.getElementById("chatscreen");

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

  useEffect(() => {
    if (elem) {
      elem.scrollTop = elem?.scrollHeight;
    }
  }, [history]);

  async function CreateThread() {
    const thread_id = localStorage.getItem("Jaymort_ThreadID");
    console.log(thread_id);
    const starting_messages = [
      {
        content: "Hey, I'm Jay Mort but you can call me Jay. Who are you?",
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
          localStorage.setItem("Jaymort_ThreadID", resp.id);
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
          JayResponse();
          setMessage("");
        });
    }
  }

  async function JayResponse() {
    setLoading(true);

    openai.beta.threads.runs
      .createAndPoll(thread.id, {
        assistant_id: ASSISTANTS[day],
      })
      .then(() => {
        FetchThreadMessages();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function NextDay() {
    setDay(day == 11 ? 11 : day + 1);
  }

  function PreviousDay() {
    setDay(day == 1 ? 1 : day - 1);
  }

  function ToggleChatMode() {
    if (chatMode === 0) setChatMode(1);
    else if (chatMode === 1) setChatMode(0);
  }

  function ClearChatHistory() {
    setThread(null);
    setHistory(null);
    localStorage.removeItem("Jaymort_ThreadID");
    CreateThread();
  }

  return (
    <AppContext.Provider
      value={{
        message,
        chatMode,
        loading,
        setMessage,
        ClearChatHistory,
        history,
        NextDay,
        PreviousDay,
        SendMessage,
        ToggleChatMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
