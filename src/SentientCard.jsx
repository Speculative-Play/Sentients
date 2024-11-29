import * as React from "react";

function SentientCard({ name, description, actionText, onAction}) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow py-7 w-full text-center text-white rounded-3xl bg-zinc-300 bg-opacity-20 max-md:mt-8">
        <div className="self-center text-3xl font-bold">{name}</div>
        <div className="flex flex-col px-3 mt-16 text-sm max-md:mt-10">
          <div>{description}</div>
          <button
            className="self-end mt-72 max-md:mt-10 bg-slate-600 rounded-md p-2 font-thin hover:bg-slate-500"
            onClick={onAction}
            tabIndex={0}
            aria-label={actionText}
          >
            {actionText} &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SentientCard;
