import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

const defaultTime = 1500;

export const Timer = ({ bgColor }) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [running, setRunning] = useState(false);

  function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    let interval;

    if (timeLeft === 0) {
      setRunning(false);

      setTimeout(() => {
        setTimeLeft(5);
      }, 1000);

      clearInterval(interval);
    }

    if (running) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, timeLeft]);

  return (
    <div id="timer" className={styles.timer__container} style={{ backgroundColor: bgColor }}>
      <div className={styles.base_timer}>
        <svg
          className={styles.base_timer__svg}
          viewBox="0 0 100 100"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <g className={styles.base_timer__circle}>
            <circle className={styles.base_timer__path_elapsed} cx="50" cy="50" r="45" />
          </g>
        </svg>
        <span id="base-timer-label" className={styles.base_timer__label}>
          {formatTimeLeft(timeLeft)}
        </span>
      </div>
      <div>
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTimeLeft(defaultTime)}>Reset</button>
      </div>
    </div>
  );
};
