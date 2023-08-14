const NavigationButton = ({ onClick, direction }) => {
  return (
    <div
      onClick={onClick}
      className={`h-full bg-black/70 flex justify-center items-center text-white absolute ${direction}-0 top-0 w-11 cursor-pointer ${
        direction === "left" && "rotate-180"
      }`}
    >
      <span className="text-3xl pb-4 lg:pb-1 text-shadow select-none">
        &gt;
      </span>
    </div>
  );
};

export default NavigationButton;
