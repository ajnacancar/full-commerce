import React, { useEffect, useState } from "react";

function CountDown({ data }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(data.finish_date) - +new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(data));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponent =
    timeLeft &&
    Object.keys(timeLeft).map((interval) => {
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
