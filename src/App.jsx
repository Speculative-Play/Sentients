import * as React from "react";
import SentientCard from "./SentientCard";

const sentientData = [
  {
    id: "sam-1",
    name: "S.A.M.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    actionText: "Talk to S.A.M.",
    onAction: () => console.log("S.A.M. interaction initiated"),
  },
  {
    id: "jaymort-1",
    name: "Jay Mort",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    actionText: "Talk to Jay",
    onAction: () => console.log("Jay Mort interaction initiated"),
  },
  {
    id: "chabot-1",
    name: "Chabot",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    actionText: "Talk to Chabot",
    onAction: () => console.log("Chabot interaction initiated"),
  },
];

const SentientsLayout = () => {
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
                onAction={sentient.onAction}
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
