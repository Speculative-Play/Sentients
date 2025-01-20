import AppContext from "./SAMContext";
import { useContext, useState, useEffect } from "react";
import { delay } from "../common";

const AnimatedChatBubble = (props) => {
  const AppC = useContext(AppContext);
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.item?.content[0].text.value != text) {
      setText("");
      Typing();
    }
  }, [props.item]);

  useEffect(() => {
    if (props.typing != false) {
      Typing();
    }
  }, []);

  async function Typing() {
    const typingSpeed = 101; // lower is faster.
    const splitMessage = props.item?.content[0]?.text.value.split(" "); //type each word

    for (let index = 0; index <= splitMessage?.length; index++) {
      setText(splitMessage.slice(0, index).join(" "));
      await delay(typingSpeed);
    }
  }

  let tailwindString = "";

  if (props.item != null) {
    if (props.item.role == "user") {
      tailwindString += "bg-orange-100 ";
    }
    if (props.item.role == "assistant") {
      if (
        props.item?.metadata?.sam == "good" ||
        props.item.assistant_id == AppC.goodSam
      ) {
        tailwindString += "bg-sky-200 ";
      } else if (
        props.item?.metadata?.sam == "bad" ||
        props.item.assistant_id == AppC.badSam
      ) {
        tailwindString += "bg-rose-200 ";
      }
    }
  }

  return (
    <div
      className={
        tailwindString +
        "flex flex-row min-h-10 px-2.5 py-2.5 mb-2.5 mt-2.5 font-medium rounded-lg w-full"
      }
    >
      {props.item?.content.length > 0 ? <p>{text}</p> : null}
    </div>
  );
};

const InteractiveChat = (props) => {
  const AppC = useContext(AppContext);
  const [AIMessage, setAIMessage] = useState(null);
  const [userMessage, setUserMessage] = useState(null);

  function GetLastAIMessage() {
    if (AppC.history?.length > 0) {
      for (let index = AppC.history.length - 1; index >= 0; index--) {
        if (AppC.history[index].role == "assistant") {
          setAIMessage(AppC.history[index]);
          break;
        }
      }
    }
  }

  function GetLastUserMessage() {
    if (AppC.history?.length > 0) {
      for (let index = AppC.history.length - 1; index >= 0; index--) {
        if (AppC.history[index].role == "user") {
          setUserMessage(AppC.history[index]);
          break;
        }
      }
    }
  }

  useEffect(() => {
    GetLastAIMessage();
    GetLastUserMessage();
  }, []);

  useEffect(() => {
    if (
      AppC.loading === true &&
      AppC.history !== null &&
      AppC.history.length > 0
    ) {
      GetLastUserMessage();
    }
    if (
      AppC.loading === false &&
      AppC.history !== null &&
      AppC.history.length > 0
    ) {
      GetLastAIMessage();
    }
  }, [AppC.loading, AppC.history]);

  return (
    <div
      id="chatscreen"
      className="h-full flex flex-col justify-between align-super"
    >
      {AppC.history?.length == 2 ? (
        <div>
          <AnimatedChatBubble item={AppC.history[0]} />
          <AnimatedChatBubble item={AppC.history[1]} />
        </div>
      ) : (
        <AnimatedChatBubble item={AIMessage} />
      )}
      <AnimatedChatBubble item={userMessage} typing={false} />
    </div>
  );
};

export default InteractiveChat;
