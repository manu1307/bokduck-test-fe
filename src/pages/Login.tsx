import { ChangeEvent, useState } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as IconEye } from "../assets/icon-eye.svg";

function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pwInputType, setPwInputType] = useState<"text" | "password">("password");
  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("아이디와 비밀번호를 입력해주세요.");
  const [errorCount, setErrorCount] = useState<number>(0);

  const sendUrl = (url: string) => {
    window.location.href = url;
  };

  const handleId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(() => {
      if (event.target.value) {
        setIsLoginError(false);
      }
      return event.target.value;
    });
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(() => {
      if (event.target.value) {
        setIsLoginError(false);
      }
      return event.target.value;
    });
  };
  const handlePasswordType = () => {
    setPwInputType((prev) => {
      if (prev === "text") return "password";
      return "text";
    });
  };
  const checkLogin = () => {
    if (id === "park" && password === "1234") {
      sendUrl("/");
      return;
    }
    console.log(errorCount);
    if (!id && !password) {
      setErrorMsg("아이디와 비밀번호를 입력해주세요.");
    }
    if (id !== "park" || password !== "1234") {
      setErrorCount((prev) => prev + 1);

      if (errorCount < 5 && errorCount > 1) {
        setErrorMsg("5회 이상 비밀번호 입력 실패 시 비밀번호 재설정이 필요합니다.");
      } else if (errorCount >= 5) {
        alert("5회 이상 비밀번호 입력 실패하였으므로 비밀번호 재설정이 필요합니다");
        sendUrl("/findpassword");
      } else {
        setErrorMsg("이메일 또는 비밀번호를 잘못 입력하셨거나 등록되지 않은 이메일 입니다");
      }
    }
    setId("");
    setPassword("");
    setPwInputType("password");
    setIsLoginError(true);
  };
  return (
    <div className="flex flex-col justify-center w-full mt-[160px]">
      <div className="flex flex-col items-center gap-[20px] mb-[48px] ">
        <Logo />
        <div className="text-blue text-[30px] font-bold">복덕빵</div>
      </div>
      <div>
        <input
          className={`w-full h-[50px] rounded-[8px] border-[1px] border-${
            isLoginError ? "red" : "[#BEBEBE]"
          } p-3 outline-none placeholder:text-[#E2E2E2] focus:border-blue focus:border-[2px]`}
          type="text"
          placeholder="아이디(이메일) 입력"
          value={id}
          onChange={handleId}
        />
      </div>
      <div className="relative mt-3">
        <input
          className={`w-full h-[50px] rounded-[8px] border-[1px] ${
            pwInputType === "password" ? "tracking-[10px]" : ""
          } border-${
            isLoginError ? "red" : "[#BEBEBE]"
          } p-3 pr-[60px] outline-none placeholder:text-[#E2E2E2] placeholder:tracking-[0px] focus:border-blue focus:border-[2px]`}
          type={pwInputType}
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePassword}
        />
        <button className="absolute right-[14px] top-[18px]" onClick={handlePasswordType}>
          <IconEye />
        </button>
      </div>
      <div className="flex gap-2 mt-[6px] text-[12px] justify-end text-[#9A9A9A]">
        <button>
          <span onClick={() => sendUrl("/findinfo")}>아이디</span>/
          <span onClick={() => sendUrl("/findpassword")}>비밀번호 찾기</span>
        </button>
        | <button onClick={() => sendUrl("/signup")}>회원가입</button>
      </div>
      <div className="mt-[30px]">
        <div className={`${isLoginError ? "" : "invisible"} text-[10px] text-red`}>{errorMsg}</div>
        <button
          className="bg-blue w-full h-[50px]  rounded-[8px] text-[16px] font-bold text-white"
          onClick={checkLogin}
        >
          로그인 하기
        </button>
      </div>
      <div className="mt-[45px] flex flex-col gap-[10px]">
        <button>카카오 로그인</button>
        <button>애플 로그인</button>
      </div>
    </div>
  );
}

export default Login;
