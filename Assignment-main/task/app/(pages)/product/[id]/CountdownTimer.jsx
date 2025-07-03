'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endTime) - new Date();
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex gap-2 text-red-600 font-medium">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex items-center gap-1">
          <span className="font-mono">{String(value).padStart(2, '0')}</span>
          <span className="text-sm">{unit}</span>
        </div>
      ))}
    </div>
  );
}