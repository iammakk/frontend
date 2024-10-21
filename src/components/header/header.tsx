import { Outlet, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="py-2 px-10 w-full border-b border-b-[rgba(255,255,255,0.1)] sticky top-0 bg-[#070707] z-30">
        <div className="max-w-[1280px] h-[52px] mx-auto flex text-white font-semibold items-center justify-between cursor-pointer">
          <p
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            VERSEIN
          </p>
          <div className="flex items-center justify-center gap-3">
            <p>Products</p>
            <p>Safety</p>
            <p>Learn Versein</p>
          </div>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Try Versein
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Header;
