import Head from 'next/head';

import { Drawer } from '../components/drawer/Drawer';
import { Timer } from '../components/timer/Timer';
import { Navbar } from '../components/navbar/Navbar';
import styles from '../styles/Home.module.css';

import { useState, useEffect } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#8ED1FC');
  const [fontColor, setFontColor] = useState('#fff');
  const [waifu, setWaifu] = useState('/rem.png');
  const [flowType, setFlowType] = useState('pomo');
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(25 * 60);

  useEffect(() => {
    if (localStorage.getItem('waifu')) {
      setWaifu(localStorage.getItem('waifu'));
    }
    if (localStorage.getItem('bgColor')) {
      setBgColor(localStorage.getItem('bgColor'));
    }
    if (localStorage.getItem('fontColor')) {
      setFontColor(localStorage.getItem('fontColor'));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>PomodOwO</title>
        <meta property="og:image" content="./pomodowo-screenshot.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="description"
          content="Designed and Developed by Alex-Reyne on github."
        />
        <link rel="icon" href="/pomodowo-logo.svg" />
      </Head>

      <main className={styles.main} style={{ color: fontColor }}>
        <Navbar />
        <Drawer
          bgColor={bgColor}
          setBgColor={setBgColor}
          fontColor={fontColor}
          setFontColor={setFontColor}
          setWaifu={setWaifu}
          flowType={flowType}
          setFlowType={setFlowType}
          workTime={workTime}
          setWorkTime={setWorkTime}
          breakTime={breakTime}
          setBreakTime={setBreakTime}
          longBreakTime={longBreakTime}
          setLongBreakTime={setLongBreakTime}
        />
        <Timer
          bgColor={bgColor}
          waifu={waifu}
          flowType={flowType}
          setFlowType={setFlowType}
          workTime={workTime}
          breakTime={breakTime}
          longBreakTime={longBreakTime}
        />
      </main>
    </div>
  );
}
