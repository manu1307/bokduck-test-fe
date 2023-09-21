import { useEffect, useState } from "react";

const secondFormat = (second: number) => {
  if (second < 10) return `0${second}`;
  return second;
};
function Timer() {
  const [time, setTime] = useState<number>(180);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time <= 0) {
      alert("인증시간이 초과되었습니다.");
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time]);

  return <div>{`${Math.floor(time / 60)} : ${secondFormat(time % 60)} `}</div>;
}

export default Timer;
