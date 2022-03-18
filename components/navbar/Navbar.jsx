import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src="./pomodowo-logotype.svg" className={styles.logo} />
    </nav>
  );
};
