import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

export const Timer = ({
  bgColor,
  flowType,
  setFlowType,
  waifu,
  workTime,
  breakTime,
  longBreakTime,
}) => {
  //test

  const [flowSet, setFlowSet] = useState(1);

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [timer, setTimer] = useState();

  function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  const checkFlow = () => {
    if (flowType === 'pomo') {
      setTimeLeft(workTime);
    }

    if (flowType === 'doro') {
      flowSet % 4 === 0 ? setTimeLeft(longBreakTime) : setTimeLeft(breakTime);
    }
  };

  useEffect(() => {
    checkFlow();
  }, [flowType]);

  const start = () => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
      if (timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    checkFlow();
  }, [workTime, breakTime, longBreakTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer);
      if (flowType === 'pomo') {
        setFlowType('doro');
      }
      if (flowType === 'doro') {
        setFlowSet((prev) => prev + 1);
        setFlowType('pomo');
      }
    }
  }, [timeLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div
      id="timer"
      className={styles.timer__container}
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles.base_timer}>
        <svg className={styles.base_timer__svg} viewBox="0 0 100 100">
          <g className={styles.base_timer__circle}>
            <circle
              className={styles.base_timer__path_elapsed}
              cx="50"
              cy="50"
              r="45"
            />
          </g>
        </svg>
        <span id="base-timer-label" className={styles.base_timer__label}>
          {formatTimeLeft(timeLeft)}
        </span>
      </div>
      <img src={waifu} className={styles.waifu_pic} />
      <div>
        <h1 className={styles.flow_type}>
          {flowType === 'pomo' && 'Pomo Flow'}
          {flowType === 'doro' && 'Doro Flow'}
        </h1>
        <button onClick={() => start()}>Start</button>
        <button onClick={() => clearInterval(timer)}>Stop</button>
        <button
          onClick={() => {
            checkFlow();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
