import { useState, useEffect } from "react";
import { STORAGE_CONSTANTS } from "../constants";

export const useTimer = (
  initialTime: number
): {
  formattedMinutes: string;
  formattedSeconds: string;
  secondsLeft: number;
  stopTimer: () => void;
} => {
  // const [seconds, setSeconds] = useState<number>(initialTime);
  const [seconds, setSeconds] = useState<number>(() => {
    const storedTimeRef = sessionStorage.getItem(STORAGE_CONSTANTS.TIME);
    const storedTime =
      storedTimeRef !== null ? JSON.parse(storedTimeRef) : initialTime;
    return storedTime;
  });
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

  useEffect(() => {
    sessionStorage.setItem(STORAGE_CONSTANTS.TIME, String(seconds));
  }, [seconds]);

  const stopTimer = () => {
    setClearTimer(true);
  };

  // return the minutes and the seconds in the format '05' : '00'
  const timeInMinutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const timeInSeconds = (seconds % 60).toString().padStart(2, "0");

  return {
    formattedMinutes: timeInMinutes,
    formattedSeconds: timeInSeconds,
    secondsLeft: seconds,
    stopTimer,
  };
};
