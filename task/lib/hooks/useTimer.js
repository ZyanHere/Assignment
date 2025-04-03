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
      setTimeLeft({ ...timeLeft, expired: true });
      return;
    }

    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();
      if (difference <= 0) return { expired: true };

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
};

export default useTimer;