import { ChangeEvent, useState } from "react";
import { ReactComponent as IconEye } from "../../assets/icon-eye.svg";

function SignUp() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRe, setPasswordRe] = useState<string>("");
  const [pwInputType, setPwInputType] = useState<"text" | "password">("password");
  const [pwReInputType, setPwReInputType] = useState<"text" | "password">("password");
  const inputOnblur = () => {};

  const handleId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(() => {
      return event.target.value;
    });
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(() => {
      return event.target.value;
    });
  };
  const handlePasswordRe = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordRe(() => {
      return event.target.value;
    });
  };
  const handlePasswordType = () => {
    setPwInputType((prev) => {
      if (prev === "text") return "password";
      return "text";
    });
  };
  const handlePasswordReType = () => {
    setPwReInputType((prev) => {
      if (prev === "text") return "password";
      return "text";
    });
  };
  return (
    <div>
      <div className="flex flex-col items-start" onBlur={inputOnblur}>
        <div className="text-[14px] font-normal ml-[8px] mb-[22px]">아이디(이메일)</div>
        <input
          type="text"
          className="w-full border-b-2 placeholder:text-[#BEBEBE] text-[20px] p-[6px] border-[#E2E2E2] focus:border-blue focus:outline-none"
          placeholder="이메일 입력"
          value={id}
          onChange={handleId}
        />
      </div>

      <div className="h-[25px]"></div>
      <div className="flex flex-col items-start" onBlur={inputOnblur}>
        <div className="text-[14px] font-normal ml-[8px] mb-[22px]">비밀번호</div>
        <div className="relative w-full">
          <input
            className={`${
              pwInputType === "password" ? "tracking-[10px]" : ""
            } w-full border-b-2 text-[20px] p-[6px] pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none  placeholder:text-[#BEBEBE] placeholder:tracking-[0]`}
            type={pwInputType}
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePassword}
            maxLength={12}
          />
          <button className="absolute right-[14px] top-[18px]" onClick={handlePasswordType}>
            <IconEye />
          </button>
        </div>
        <div className="w-full flex mt-[6px] text-[12px] justify-center text-[#9A9A9A]">
          대문자, 소문자, 특수문자, 숫자를 조합하여 8~12글자로 설정
        </div>
      </div>
      <div>
        <div className="relative w-full">
          <input
            className={`${
              pwReInputType === "password" ? "tracking-[10px]" : ""
            } w-full border-b-2 text-[20px] p-[6px] pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none  placeholder:text-[#BEBEBE] placeholder:tracking-[0]`}
            type={pwReInputType}
            placeholder="비밀번호 재입력"
            value={passwordRe}
            onChange={handlePasswordRe}
            maxLength={12}
          />
          <button className="absolute right-[14px] top-[18px]" onClick={handlePasswordReType}>
            <IconEye />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[80px] flex items-center justify-center text-[20px] font-bold pb-5 text-white  bg-blue">
        <button>다음</button>
      </div>
    </div>
  );
}

export default SignUp;
