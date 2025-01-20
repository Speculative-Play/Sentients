export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const ScreenContainer = (props) => {
  return (
    <div className="flex flex-col h-screen w-screen max-md:flex-col">
      {props.children}
    </div>
  );
};
