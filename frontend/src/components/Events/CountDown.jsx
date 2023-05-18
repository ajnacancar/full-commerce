import React, { useEffect, useState } from "react";
const calculateTimeLeft = () => {
  const difference = +new Date("2023-05-15") - +new Date();
  let timeleft = {};

  if (difference > 0) {
    timeleft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeleft;
  }
};

function CountDown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponent = timeLeft && Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-2xl text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timeLeft && timerComponent.length ? (
        timerComponent
      ) : (
        <span className="text-red-500 text-2xl float-right">Time's up!</span>
      )}
    </div>
  );
}

export default CountDown;
