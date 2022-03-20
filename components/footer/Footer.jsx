import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <h4>
        Designed and Developed by{' '}
        <a
          href="https://github.com/alex-reyne/pomodowo-timer"
          target="_blank"
          rel="noreferrer"
        >
          Alex Reyne
        </a>
      </h4>
    </div>
  );
};
