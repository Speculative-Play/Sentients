import { useEffect, createContext, useState } from "react";
import OpenAI from "openai";
const BotController = createContext(null);

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

export const BotCore = (props) => {
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(0); // 0 is history, 1 is interactive chat
  const [day, setDay] = useState(0);

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [thread, setThread] = useState(null);
  const [mort, setMort] = useState(false);

  const BACKGROUNDS_COLORS = [
    "#f3f3f3",
    "#f7d5bd",
    "#b77e73",
    "#997871",
    "#746a6b",
    "#5c5364",
    "#403947",
    "#98949d",
    "#a2a2a2",
    "#808080",
    "#202020",
    "#151515",
  ];

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
    const user_count = GetUserMessagesCount();
    if (user_count < 3) {
      setDay(0); // day 1
    } else if (user_count >= 3 && user_count < 6) {
      setDay(1); // day 2
    } else if (user_count >= 6 && user_count < 9) {
      setDay(2); // day 3
    } else if (user_count >= 9 && user_count < 12) {
      setDay(3); // day 4
    } else if (user_count >= 13 && user_count < 15) {
      setDay(4); // day 5
    } else if (user_count >= 15 && user_count < 17) {
      setDay(5); // day 6
    } else if (user_count >= 17 && user_count < 20) {
      setDay(6); //day 7
    } else if (user_count >= 20 && user_count < 23) {
      setDay(7); //day 8
    } else if (user_count >= 23 && user_count < 26) {
      setDay(8); //day 9
    } else if (user_count >= 26 && user_count < 27) {
      setDay(9); //day 10
    } else if (user_count >= 30) {
      setDay(10); //day 11
    }
  }, [history]);

  async function CreateThread() {
    const thread_id = localStorage.getItem("Jaymort_ThreadID");
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

  function GetUserMessagesCount() {
    let count = 0;
    for (let index = 0; index < history?.length; index++) {
      if (history[index].role == "user") count++;
    }
    return count;
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
    if (mort) return;

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
        if (day == 10) setMort(true);
      });
  }

  function ToggleChatMode() {
    if (chatMode === 0) setChatMode(1);
    else if (chatMode === 1) setChatMode(0);
  }

  function ClearChatHistory() {
    setThread(null);
    setHistory(null);
    localStorage.removeItem("Jaymort_ThreadID");
    setMort(false);
    CreateThread();
  }
  function NextDay() {
    setDay(day == 11 ? 11 : day + 1);
  }

  function PreviousDay() {
    setDay(day == 1 ? 1 : day - 1);
  }
  return (
    <BotController.Provider
      value={{
        mort,
        day,
        message,
        chatMode,
        loading,
        history,
        setMessage,
        ClearChatHistory,
        NextDay,
        PreviousDay,
        SendMessage,
        ToggleChatMode,
        BACKGROUNDS_COLORS,
      }}
    >
      {props.children}
    </BotController.Provider>
  );
};

export default BotController;
