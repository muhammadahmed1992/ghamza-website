import { useSelector } from "react-redux";

const BurgerButton = ({
  toggleDrawer,
  isDrawerOpen,
  isSearchOpen,
  burgerButtonvisible,
  isMobile,
  drawerButtonRef,
}) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  return (
    <button
      ref={drawerButtonRef}
      className={`${
        selectedLanguage === "AR"
          ? "fixed top-[13px] lg:top-[31px] right-4 lg:right-8 xl:right-12 z-[100]"
          : "fixed top-[13px] lg:top-[31px] left-4 lg:left-8 xl:left-12 z-[100]"
      } ${isSearchOpen && isMobile ? "opacity-0" : "opacity-100"} group`}
      style={{
        width: "36px",
        height: "36px",
      }}
      onClick={toggleDrawer}
    >
      <div className="flex items-center gap-3 text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[24px] 3xl:text-[30px]">
        <div className={`w-6 sm:w-8 h-[1px] relative mx-auto cursor-pointer`}>
          <span
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full transition duration-300 bg-black ${
              isDrawerOpen
                ? "rotate-45 mt-[10px] bg-white"
                : "rotate-0 group-hover:-mt-[1px]"
            }`}
          ></span>
          <span
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full transition duration-300 mt-[10px] bg-black ${
              isDrawerOpen
                ? "-rotate-45 bg-white"
                : "rotate-0 group-hover:mt-[11px]"
            }`}
          ></span>
        </div>
      </div>
    </button>
  );
};

export default BurgerButton;
