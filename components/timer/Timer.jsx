import { useEffect } from 'react/cjs/react.production.min';
import styles from './Timer.module.scss';

export const Timer = ({ bgColor }) => {
  return (
    <div id="timer" className={styles.timer__container} style={{ backgroundColor: bgColor }}>
      <h1>Timer</h1>
    </div>
  );
};
