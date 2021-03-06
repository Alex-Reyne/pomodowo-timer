import { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { useEffect } from 'react/cjs/react.production.min';
import styles from './Drawer.module.scss';

const colors = [
  '#fff',
  '#1d1d1d',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#8766bf',
];

export const Drawer = ({
  bgColor,
  setBgColor,
  fontColor,
  setFontColor,
  waifu,
  setWaifu,
  flowType,
  setFlowType,
  workTime,
  setWorkTime,
  breakTime,
  setBreakTime,
  longBreakTime,
  setLongBreakTime,
}) => {
  const [openColorChanger, setOpenColorChanger] = useState(false);
  const [openFontColorChanger, setOpenFontColorChanger] = useState(false);
  const [openWaifuPicker, setOpenWaifuPicker] = useState(false);
  const [openPomo, setOpenPomo] = useState(false);
  const [openShort, setOpenShort] = useState(false);
  const [openLong, setOpenLong] = useState(false);
  const [settings, setSettings] = useState(false);
  const [visualSettings, setVisualSettings] = useState(false);
  const [timerSettings, setTimerSettings] = useState(false);

  const waifus = [
    'rem',
    'ram',
    'hange',
    'holo',
    'marin',
    'asuka',
    'emilia',
    'marisa',
    'oumae',
    'sakuraku',
    'alice',
    '2b',
  ];

  const handleSetOpen = () => {
    setOpenFontColorChanger(false);
    openColorChanger ? setOpenColorChanger(false) : setOpenColorChanger(true);
  };

  const handleSetOpenFont = () => {
    setOpenColorChanger(false);
    openFontColorChanger
      ? setOpenFontColorChanger(false)
      : setOpenFontColorChanger(true);
  };

  const handleChange = (e) => {
    setBgColor(e.hex);
    localStorage.setItem('bgColor', e.hex);
    setOpenColorChanger(false);
  };

  const handleFontChange = (e) => {
    setFontColor(e.hex);
    localStorage.setItem('fontColor', e.hex);
    setOpenFontColorChanger(false);
  };

  const handleWaifuPicker = () => {
    openWaifuPicker ? setOpenWaifuPicker(false) : setOpenWaifuPicker(true);
  };

  const handlePomo = (e) => {
    e.preventDefault();

    if (e.target[0].value <= 0) return;

    setWorkTime(e.target[0].value * 60);
    setOpenPomo(false);
  };
  const handleShort = (e) => {
    e.preventDefault();

    if (e.target[0].value <= 0) return;

    setBreakTime(e.target[0].value * 60);
    setOpenShort(false);
  };
  const handleLong = (e) => {
    e.preventDefault();

    if (e.target[0].value <= 0) return;

    setLongBreakTime(e.target[0].value * 60);
    setOpenLong(false);
  };

  const handleAestheticMenu = () => {
    if (!visualSettings) {
      setTimerSettings(false);
      setVisualSettings(true);
      return;
    }
    setVisualSettings(false);
  };

  const handleTimerMenu = () => {
    if (!timerSettings) {
      setVisualSettings(false);
      setTimerSettings(true);
      return;
    }

    setTimerSettings(false);
  };

  return (
    <>
      {!settings && (
        <div
          className={styles.settings_button}
          onClick={() => {
            setSettings(true);
          }}
        >
          <h1>Settings</h1>
        </div>
      )}
      {settings && (
        <div className={styles.drawer__container}>
          <div className={styles.drawer__list}>
            <h1
              onClick={() => {
                setSettings(false);
              }}
            >
              Settings
            </h1>
            <h2 onClick={handleAestheticMenu}>Aesthetics</h2>
            {visualSettings && (
              <>
                <h2 onClick={handleSetOpen}>BG Color</h2>
                {openColorChanger && (
                  <div className={styles.colors}>
                    <TwitterPicker
                      colors={colors}
                      triangle="top-right"
                      onChange={handleChange}
                    />
                  </div>
                )}
                <h2 onClick={handleSetOpenFont}>Font Color</h2>
                {openFontColorChanger && (
                  <div className={styles.font_colors}>
                    <TwitterPicker
                      colors={colors}
                      triangle="top-right"
                      onChange={handleFontChange}
                    />
                  </div>
                )}
                <h2 onClick={handleWaifuPicker}>Change Waifu</h2>
                {openWaifuPicker && (
                  <div className={styles.drawer__waifu_list}>
                    {waifus.map((waifu) => {
                      return (
                        <h3
                          key={waifu}
                          onClick={(e) => {
                            setWaifu(`/${waifu}.png`);
                            localStorage.setItem('waifu', `/${waifu}.png`);
                          }}
                        >
                          {waifu}
                        </h3>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {!openWaifuPicker && (
              <>
                <h2 onClick={handleTimerMenu}>Timers</h2>
                {timerSettings && (
                  <>
                    <h2
                      onClick={() => {
                        setOpenShort(false);
                        setOpenLong(false);
                        openPomo ? setOpenPomo(false) : setOpenPomo(true);
                      }}
                    >
                      Pomo Timer
                    </h2>
                    {openPomo && (
                      <form onSubmit={(e) => handlePomo(e)}>
                        <p style={{ marginBottom: 0 }}>Default: 25 minutes</p>
                        <p style={{ marginBottom: 0 }}>
                          Current: {workTime / 60} minutes
                        </p>
                        <input
                          type="number"
                          placeholder="minutes"
                          style={{ color: fontColor }}
                        ></input>
                        <button
                          type="submit"
                          style={{ color: bgColor, backgroundColor: fontColor }}
                        >
                          set
                        </button>
                      </form>
                    )}
                    <h2
                      onClick={() => {
                        setOpenPomo(false);
                        setOpenLong(false);
                        openShort ? setOpenShort(false) : setOpenShort(true);
                      }}
                    >
                      Short Doro Timer
                    </h2>
                    {openShort && (
                      <form onSubmit={(e) => handleShort(e)}>
                        <p style={{ marginBottom: 0 }}>Default: 5 minutes</p>
                        <p style={{ marginBottom: 0 }}>
                          Current: {breakTime / 60} minutes
                        </p>
                        <input
                          type="number"
                          placeholder="minutes"
                          style={{ color: fontColor }}
                        ></input>
                        <button
                          type="submit"
                          style={{ color: bgColor, backgroundColor: fontColor }}
                        >
                          set
                        </button>
                      </form>
                    )}
                    <h2
                      onClick={() => {
                        setOpenPomo(false);
                        setOpenShort(false);
                        openLong ? setOpenLong(false) : setOpenLong(true);
                      }}
                    >
                      Long Doro Timer
                    </h2>
                    {openLong && (
                      <form onSubmit={(e) => handleLong(e)}>
                        <p style={{ marginBottom: 0 }}>Default: 25 minutes</p>
                        <p style={{ marginBottom: 0 }}>
                          Current: {longBreakTime / 60} minutes
                        </p>
                        <input
                          type="number"
                          placeholder="minutes"
                          style={{ color: fontColor }}
                        ></input>
                        <button
                          type="submit"
                          style={{ color: bgColor, backgroundColor: fontColor }}
                        >
                          set
                        </button>
                      </form>
                    )}
                  </>
                )}
                <h2>Flow Type</h2>
                <div className={styles.flow_types}>
                  <h3
                    onClick={(e) => setFlowType('pomo')}
                    className={
                      flowType === 'doro' ? styles.flow_unselected : null
                    }
                  >
                    Pomo
                  </h3>
                  <h3
                    className={
                      flowType === 'pomo' ? styles.flow_unselected : null
                    }
                    onClick={(e) => setFlowType('doro')}
                  >
                    Doro
                  </h3>
                </div>
              </>
            )}
          </div>
          <div className={styles.coffee}>
            <a
              href="https://paypal.me/jordanreyne"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/paypal.svg" width="50px" />
              <p>Buy me a coffee</p>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
