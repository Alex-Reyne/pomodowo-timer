import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useSound from 'use-sound';

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
  const [flowSet, setFlowSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [circleTime, setCircleTime] = useState(workTime);
  const [timer, setTimer] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [playBaka] = useSound('./baka.mp3', { volume });
  const [playAraAra] = useSound('./ara-ara.mp3', { volume });

  const circleTimer = () => {
    return (
      <CountdownCircleTimer
        key={circleTime}
        isPlaying={isPlaying}
        duration={circleTime}
        isSmoothColorTransition={false}
        rotation="counterclockwise"
        trailColor="#ffffff00"
        colors={[`#0000004e`, '#F7B8014e', '#A300004e', '#A300004e']}
        colorsTime={[5 * 60, 2 * 60, 1 * 60, 0]}
      >
        {({ remainingTime }) => (
          <span id="base-timer-label" className={styles.base_timer__label}>
            {formatTimeLeft(timeLeft)}
          </span>
        )}
      </CountdownCircleTimer>
    );
  };

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const reset = () => {
    clearInterval(timer);
    setCircleTime(0);

    setTimeout(() => {
      setTimeLeft(circleTime);
      setCircleTime(circleTime);
    }, 100);
  };

  const checkFlow = (sound) => {
    if (flowType === 'pomo') {
      setTimeLeft(workTime);
      setCircleTime(workTime);

      sound ? playBaka() : null;
    }

    if (flowType === 'doro') {
      flowSet % 4 === 0 ? setTimeLeft(longBreakTime) : setTimeLeft(breakTime);

      flowSet % 4 === 0
        ? setCircleTime(longBreakTime)
        : setCircleTime(breakTime);

      sound ? playAraAra() : null;
    }
  };

  useEffect(() => {
    checkFlow(true);
  }, [flowType]);

  const start = () => {
    setIsPlaying(true);
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
      if (timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    checkFlow(false);
  }, [workTime, breakTime, longBreakTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsPlaying(false);
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
      {circleTimer(timeLeft)}
      <img src={waifu} className={styles.waifu_pic} />
      <div>
        <h1 className={styles.flow_type}>
          {flowType === 'pomo' && 'Pomo Flow'}
          {flowType === 'doro' && 'Doro Flow'}
        </h1>
        <button onClick={() => start()}>Start</button>
        <button
          onClick={() => {
            clearInterval(timer);
            setIsPlaying(false);
          }}
        >
          Stop
        </button>
        <button onClick={(e) => reset()}>Reset</button>
      </div>
    </div>
  );
};
