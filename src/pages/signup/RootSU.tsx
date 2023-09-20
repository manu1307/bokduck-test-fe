import { Outlet } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/left-arrow.svg";

function RootSU() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="h-[100px] flex items-center justify-center relative">
        <button className="absolute left-0" onClick={goBack}>
          <Arrow />
        </button>
        회원가입
        <div></div>
      </div>
      <Outlet />
    </>
  );
}

export default RootSU;
