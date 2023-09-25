import { ReactComponent as Logo } from "../../assets/logo.svg";
import { sendUrl } from "../../utils/SendUrl";

function Done() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="mt-[130px]">
        <Logo />
        <div className="text-[30px] text-blue font-bold mt-[24px]">복덕방</div>
      </div>
      <div className="mt-[105px]">
        <span className="text-[24px]"> abcdefg 님</span> <br />
        <span className="text-[30px]"> 환영합니다!</span>
      </div>
      <div className="w-full">
        <button className="bg-blue w-full h-[50px] mt-[100px]  rounded-[8px] text-[16px] font-bold text-white">
          프로필 설정하러 가기
        </button>
        <button className="my-6 text-[#9A9A9A]" onClick={() => sendUrl("/")}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

export default Done;
