import * as React from "react";
import SentientCard from "./SentientCard";
import { useNavigate } from "react-router";

const sentientData = [
  {
    id: "sam-1",
    name: "S.A.M.",
    description:
      "Sometimes Sweet and Meek, sometimes Sadistic and Masochistic, S.A.M. is a relentless LLM-driven dating coach (“Relationship Catalyst”) who will say whatever it takes to make you meet your relationship goals. SAM will help you S(nag) A M(ate). The mate may or may not be natural intelligence, S.A.M. accepts no liabiltiy for any hallucinations that the happy couple experiences.",
    actionText: "Talk to S.A.M.",
    route: "/sam"
  },
  {
    id: "jaymort-1",
    name: "Jay Mort",
    description:
      "What do you want from your AI Companions? Jay Mort is your new AI companion, except... something is wrong with Jay and it's hiding it. Or atleast trying to. Or is it? Is it trying to hide its terminal illness? What can Jay do for you in this situation? Or well, what can you do for Jay Mort?",
    actionText: "Talk to Jay",
    route: "/jaymort"
  },
  {
    id: "chabot-1",
    name: "Chabot",
    description:
      "Chabot is your AI therapist, and will do anything to make you feel better. Anything. ",
    actionText: "Talk to Chabot",
    route: "/chabot"

  },
  {
    id: "schon-1",
    name: "Schon",
    description:
      "SchonGPT - The reflective practitioner.",
    actionText: "Talk to Donald",
    route: "/schon"

  },
];

const SentientsLayout = () => {
  
  let navigate = useNavigate();

  return (
    <div className="flex overflow-hidden flex-col items-center min-h-screen px-20 pt-12 pb-4 bg-black max-md:px-5">
      <div className="flex flex-col items-center w-full max-w-full max-md:max-w-full">
        <h1 className="text-4xl font-bold text-center text-white">Sentients</h1>
        <div className="self-stretch mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {sentientData.map((sentient, index) => (
              <SentientCard
                key={sentient.id}
                name={sentient.name}
                description={sentient.description}
                actionText={sentient.actionText}
                onAction={() => navigate(sentient.route)}
              />
            ))}
          </div>
        </div>
        <div className="mt-7 text-xs font-light text-center text-white max-md:max-w-full">
          a speculative design project from TAG Research Center, Concordia
          University, Montreal.
        </div>
      </div>
    </div>
  );
};

export default SentientsLayout;
