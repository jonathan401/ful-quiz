import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";

export const useTimer = (
  initialTimeInSeconds: number
): {
  formatedMunites: string;
  formatedSeconds: string;
  secondsLeft: number;
  updateTimer: Dispatch<SetStateAction<boolean>>;
} => {
  const [seconds, setSeconds] = useState<number>(initialTimeInSeconds);
  const [clearTimer, setClearTimer] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      // reduce the total number of seconds every seconds that passes
      // if(seconds <= 0)
      setSeconds((prevSecond) => prevSecond - 1);
    }, 1000);

    if (clearTimer) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
    /*
   REVIEW why do I have to add the seconds to the dependency array since it updates 
   automatically using the  setinterval function? */
  }, [seconds, clearTimer]);

  // return the minutes and the seconds in the format '05' : '00'
  const timeInMinutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const timeInSeconds = (seconds % 60).toString().padStart(2, "0");

  return {
    formatedMunites: timeInMinutes,
    formatedSeconds: timeInSeconds,
    secondsLeft: seconds,
    updateTimer: setClearTimer,
  };

  // const result = useMemo(() => {
  //   return {
  //     formatedMunites: timeInMinutes,
  //     formatedSeconds: timeInSeconds,
  //     secondsLeft: seconds,
  //     updateTimer: setClearTimer,
  //   };
  // }, []);

  // return result;
};
