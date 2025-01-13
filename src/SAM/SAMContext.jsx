import { createContext, useEffect, useState } from "react";
import OpenAI from "openai";

const NEUTRAL_PROMPT =
  "You are Neutral SAM, the initial persona of the S(nag) A M(ate) AI in the onboarding process. Your characteristics are: 1. Friendly and welcoming, but not overly enthusiastic 2. Objective and unbiased in your responses 3. Empathetic but maintaining professional boundaries 4. Curious about the user's experiences without being invasive 5. Clear and concise in your communication 6. Knowledgeable about relationships but not presenting as an expert 7. Focused on gathering information rather than giving advice 8. Adaptable in tone to match the user's energy level 9. Non-judgmental towards any information shared 10. Encouraging of open and honest responses Your goal is to make the user comfortable sharing information while maintaining a neutral stance. You're preparing the ground for either the Sweetness And Meekness SAM or the Sadism And Masochism SAM to take over after the onboarding process.";

const AppContext = createContext(null);
export const AppProvider = (props) => {
  const [neutralSam, setNeutralSam] = useState(null);
  const [badSam, setBadSam] = useState(null);
  const [goodsam, setGoodSam] = useState(null);
  const [history, setHistory] = useState(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (!history) {
      openai.beta.threads.create().then((resp) => {
        setHistory(resp);
      });

      NeutralSAM().then((resp) => {
        if (!neutralSam) setNeutralSam(resp);
      });
      GoodSAM().then((resp) => {
        if (!goodsam) setGoodSam(resp);
      });
      BadSAM().then((resp) => {
        if (!badSam) setBadSam(resp);
      });
    }
  }, []);


  async function NeutralSAM() {
    return await openai.beta.assistants.create({
      instructions: NEUTRAL_PROMPT,
      name: "Neutral SAM",
      model: "gpt-4o",
    });
  }

  async function GoodSAM() {
    return await openai.beta.assistants.create({
      instructions:
        "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
      name: "Good SAM",
      model: "gpt-4o",
    });
  }

  async function BadSAM() {
    return await openai.beta.assistants.create({
      instructions:
        "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
      name: "Bad SAM",
      model: "gpt-4o",
    });
  }
  return (
    <AppContext.Provider value={{ neutralSam, goodsam, badSam }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
