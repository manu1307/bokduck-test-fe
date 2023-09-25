import { ChangeEvent, useEffect, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/under-arrow.svg";
import Timer from "../../components/Timer";
import { sendUrl } from "../../utils/SendUrl";

type Telecom = "SKT" | "KT" | "LGU+";
function Verify() {
  const [telecom, setTelecom] = useState<Telecom>("SKT");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [agreementOpen, setAgreementOpen] = useState<boolean>(false);

  const [amAll, setAmAll] = useState<boolean>(false);
  const [amOne, setamOne] = useState<boolean>(false);
  const [amTwo, setamTwo] = useState<boolean>(false);
  const [amThree, setamThree] = useState<boolean>(false);
  const [amFour, setamFour] = useState<boolean>(false);
  const [amFive, setamFive] = useState<boolean>(false);
  const [amSix, setamSix] = useState<boolean>(false);
  const [amNext, setAmNext] = useState<boolean>(false);

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [verifyActivate, setVerifyActivate] = useState<boolean>(false);
  const [sendVerification, setSendVerification] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleAllCheck = (bool: boolean) => {
    setAmAll(bool);
    setamOne(bool);
    setamTwo(bool);
    setamThree(bool);
    setamFour(bool);
    setamFive(bool);
    setamSix(bool);
  };
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
      // 인증 확인 코드 필요
    }
    setVerificationCode(event.target.value);
  };

  const clickNext = () => {
    setAgreementOpen(true);
  };

  const startVerification = () => {
    setSendVerification(true);
  };
  const handleAllClicked = () => {
    setAmAll((prev) => {
      if (!prev) {
        handleAllCheck(true);
      } else {
        handleAllCheck(false);
      }
      return !prev;
    });
  };
  useEffect(() => {
    if (amOne && amTwo && amThree && amFour && amFive) {
      setAmNext(true);
    } else {
      setAmNext(false);
    }
  }, [amOne, amTwo, amThree, amFour, amFive]);

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
              className={` w-full border-b-2 text-[20px] p-[6px] pr-[60px] border-[#E2E2E2] focus:border-blue focus:outline-none tracking-[10px]  placeholder:text-[#BEBEBE] placeholder:tracking-[0] disabled:bg-white `}
              placeholder="인증번호 입력"
              type="password"
              value={verificationCode}
              onChange={handleCodeInput}
              maxLength={4}
              disabled={verified ? true : false}
            />
            {verified ? (
              ""
            ) : (
              <button className="absolute right-[14px] top-[18px]">
                <Timer stop={verified ? true : false} />
              </button>
            )}
          </div>
          <div className={` w-full flex justify-start mt-[6px] text-[12px] text-[#9A9A9A]`}>
            입력하신 휴대전화번호로 인증번호(4자리)를 보냈습니다
          </div>
        </div>
      )}

      {verified && (
        <div>
          <div
            className="absolute bottom-0 left-0 w-full h-[80px] flex items-center justify-center text-[20px] font-bold pb-5 text-white  bg-blue"
            onClick={clickNext}
          >
            <button>다음</button>
          </div>
          {agreementOpen && (
            <>
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#7b7b7bce]"
                onClick={() => {
                  setAgreementOpen(false);
                  handleAllCheck(false);
                }}
              ></div>
              <div className="agreement z-10 rounded-t-lg bg-white absolute bottom-0 left-0 w-full h-fit p-[20px]">
                <div className="flex p-[12px] gap-4">
                  <input type="checkbox" onChange={() => handleAllClicked()} checked={amAll} />
                  <div>전체동의</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    required
                    checked={amOne}
                    onChange={({ target: { checked } }) => setamOne(checked)}
                  />
                  <div>[필수] 만 14세 이상</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    required
                    checked={amTwo}
                    onChange={({ target: { checked } }) => setamTwo(checked)}
                  />
                  <div>[필수] 이용약관 동의</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    required
                    checked={amThree}
                    onChange={({ target: { checked } }) => setamThree(checked)}
                  />
                  <div>[필수] 개인정보수집 및 이용 동의</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    required
                    checked={amFour}
                    onChange={({ target: { checked } }) => setamFour(checked)}
                  />
                  <div>[필수] 개인정보 제 3자 제공 및 위탁동의</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    required
                    checked={amFive}
                    onChange={({ target: { checked } }) => setamFive(checked)}
                  />
                  <div>[필수] 위치정보이용약관 동의</div>
                </div>
                <div className="flex p-[12px] gap-4">
                  <input
                    type="checkbox"
                    checked={amSix}
                    onChange={({ target: { checked } }) => setamSix(checked)}
                  />
                  <div>[선택] 마케팅 수신 동의</div>
                </div>
                {amNext && (
                  <button
                    className="bg-blue w-full h-[50px] mt-[20px]  rounded-[8px] text-[16px] font-bold text-white"
                    onClick={() => sendUrl("/signup/done")}
                  >
                    완료
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Verify;
