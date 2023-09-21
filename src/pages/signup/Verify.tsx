import { ChangeEvent, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/under-arrow.svg";
import Timer from "../../components/Timer";

type Telecom = "SKT" | "KT" | "LGU+";
function Verify() {
  const [telecom, setTelecom] = useState<Telecom>("SKT");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [verifyActivate, setVerifyActivate] = useState<boolean>(false);
  const [sendVerification, setSendVerification] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleDropDown = (telecom: Telecom) => {
    setTelecom(telecom);
    setDropDownOpen(false);
  };

  const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetNum = event.target.value;
    if (targetNum.length >= 11) setVerifyActivate(true);
    setPhoneNum(targetNum.replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`));
  };
  const handleCodeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 4) {
      setVerified(true);
    }
    setVerificationCode(event.target.value);
  };
  const startVerification = () => {
    setSendVerification(true);
  };

  return (
    <div>
      <div className="flex flex-col items-start">
        <div className="text-[14px] font-normal ml-[8px] mb-[10px]">통신사 선택</div>
        <div className="relative w-3/4">
          <div
            className={` w-full border-b-2 h-[60px] text-[20px] p-[8px] text-left pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none`}
          >
            {telecom}
          </div>
          <button
            className="absolute right-[14px] top-[18px]"
            onClick={() => setDropDownOpen((prev) => !prev)}
          >
            <Arrow />
          </button>
          {dropDownOpen && (
            <div className="z-10 bg-white absolute flex flex-col gap-[10px] w-full py-[8px] border-[1px] border-t-0 border-[#E2E2E2] rounded-b-lg">
              <div onClick={() => handleDropDown("SKT")}>SKT</div>
              <div onClick={() => handleDropDown("KT")}>KT</div>
              <div onClick={() => handleDropDown("LGU+")}>LGU+</div>
            </div>
          )}
        </div>
      </div>
      <div className="relative w-full mt-[20px]">
        <input
          className={`w-full border-b-2 text-[20px] p-[8px] pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none  placeholder:text-[#BEBEBE] placeholder:tracking-[0]`}
          placeholder="전화번호 입력"
          type="tel"
          onChange={handlePhoneInput}
          value={phoneNum}
          required
          maxLength={11}
        />
        <button
          disabled={verifyActivate ? false : true}
          className={`absolute right-[10px] top-[10px] text-[16px] py-[4px] px-[10px] ${
            verifyActivate ? "text-black  " : "text-[#BEBEBE]"
          } `}
          onClick={startVerification}
        >
          인증
        </button>
      </div>
      {sendVerification && (
        <div>
          <div className="relative w-full mt-[20px]">
            <input
              className={` w-full border-b-2 text-[20px] p-[6px] pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none tracking-[10px]  placeholder:text-[#BEBEBE] placeholder:tracking-[0] `}
              placeholder="인증번호 입력"
              type="password"
              value={verificationCode}
              onChange={handleCodeInput}
              maxLength={4}
            />
            <button className="absolute right-[14px] top-[18px]">
              <Timer />
            </button>
          </div>
        </div>
      )}
      {verified && (
        <div className="absolute bottom-0 left-0 w-full h-[80px] flex items-center justify-center text-[20px] font-bold pb-5 text-white  bg-blue">
          <button>다음</button>
        </div>
      )}
    </div>
  );
}

export default Verify;
