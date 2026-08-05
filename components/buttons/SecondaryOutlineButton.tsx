export const SecondaryOutlineButton = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`border-2 border-[#000d22] text-[#000d22] hover:bg-[#000d22] hover:text-white transition-all duration-300 font-semibold rounded-lg flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </button>
);
