"use client";
import { useEffect, useState } from 'react';

const useTimer = (endTime) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  useEffect(() => {
    if (!endTime || endTime <= Date.now()) {
      setTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      });
      return;
    }

    const calculateTimeLeft = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
      }
      return {
        hours:   Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);



    return () => clearInterval(timerId);
  }, [endTime]);

  return timeLeft;
};

export default useTimer;