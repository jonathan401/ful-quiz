import React, { useState, useEffect } from "react";

const Timer = React.memo(({ initialSeconds }: { initialSeconds: number }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return <p>Time left: {formatTime(seconds)}</p>;
});

export default Timer;
