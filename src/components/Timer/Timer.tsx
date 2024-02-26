import React, { useState, useEffect } from "react";

const Timer = React.memo(({ initialSeconds }: { initialSeconds: number }) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return <p>Time left: {formatTime(initialSeconds)}</p>;
});

export default Timer;
