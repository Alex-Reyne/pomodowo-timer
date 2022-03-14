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
  '#9900EF',
];

export const Drawer = ({
  setBgColor,
  setFontColor,
  setWaifu,
  flowType,
  setFlowType,
  setWorkTime,
  setBreakTime,
  setLongBreakTime,
}) => {
  const [openColorChanger, setOpenColorChanger] = useState(false);
  const [openFontColorChanger, setOpenFontColorChanger] = useState(false);
  const [openWaifuPicker, setOpenWaifuPicker] = useState(false);
  const [openPomo, setOpenPomo] = useState(false);
  const [openShort, setOpenShort] = useState(false);
  const [openLong, setOpenLong] = useState(false);

  const waifus = [
    'rem',
    'hange',
    'holo',
    'ram',
    'emilia',
    '2b',
    'alice',
    'marisa',
    'oumae',
    'sakuraku',
  ];

  const handleSetOpen = () => {
    setOpenFontColorChanger(false);
    openColorChanger ? setOpenColorChanger(false) : setOpenColorChanger(true);
  };

  const handleSetOpenFont = () => {
    setOpenColorChanger(false);
    openFontColorChanger ? setOpenFontColorChanger(false) : setOpenFontColorChanger(true);
  };

  const handleChange = (e) => {
    setBgColor(e.hex);
    setOpenColorChanger(false);
  };

  const handleFontChange = (e) => {
    setFontColor(e.hex);
    setOpenFontColorChanger(false);
  };

  const handleWaifuPicker = () => {
    openWaifuPicker ? setOpenWaifuPicker(false) : setOpenWaifuPicker(true);
  };

  const handlePomo = (e) => {
    e.preventDefault();
    setWorkTime(e.target[0].value * 60);
    setOpenPomo(false);
  };
  const handleShort = (e) => {
    e.preventDefault();
    setBreakTime(e.target[0].value * 60);
    setOpenShort(false);
  };
  const handleLong = (e) => {
    e.preventDefault();
    setLongBreakTime(e.target[0].value * 60);
    setOpenLong(false);
  };

  return (
    <div className={styles.drawer__container}>
      <div className={styles.drawer__list}>
        <h1>Settings</h1>
        <h2 onClick={handleSetOpen}>BG Color</h2>
        {openColorChanger && (
          <div className={styles.colors}>
            <TwitterPicker colors={colors} triangle="top-right" onChange={handleChange} />
          </div>
        )}
        <h2 onClick={handleSetOpenFont}>Font Color</h2>
        {openFontColorChanger && (
          <div className={styles.font_colors}>
            <TwitterPicker colors={colors} triangle="top-right" onChange={handleFontChange} />
          </div>
        )}
        <h2
          onClick={() => {
            setOpenPomo(true);
            setOpenShort(false);
            setOpenLong(false);
          }}
        >
          Pomo Timer
        </h2>
        {openPomo && (
          <form onSubmit={(e) => handlePomo(e)}>
            <input type="number" placeholder="minutes"></input>
            <button type="submit">set</button>
          </form>
        )}
        <h2
          onClick={() => {
            setOpenPomo(false);
            setOpenShort(true);
            setOpenLong(false);
          }}
        >
          Short Doro Timer
        </h2>
        {openShort && (
          <form onSubmit={(e) => handleShort(e)}>
            <input type="number" placeholder="minutes"></input>
            <button type="submit">set</button>
          </form>
        )}
        <h2
          onClick={() => {
            setOpenPomo(false);
            setOpenShort(false);
            setOpenLong(true);
          }}
        >
          Long Doro Timer
        </h2>
        {openLong && (
          <form onSubmit={(e) => handleLong(e)}>
            <input type="number" placeholder="minutes"></input>
            <button type="submit">set</button>
          </form>
        )}
        <h2>Flow Type</h2>
        <div className={styles.flow_types}>
          <h3
            onClick={(e) => setFlowType('pomo')}
            className={flowType === 'doro' ? styles.flow_unselected : null}
          >
            Pomo
          </h3>
          <h3
            className={flowType === 'pomo' ? styles.flow_unselected : null}
            onClick={(e) => setFlowType('doro')}
          >
            Doro
          </h3>
        </div>
        <h2 onClick={handleWaifuPicker}>Change Waifu</h2>
        {openWaifuPicker && (
          <div className={styles.drawer__waifu_list}>
            {waifus.map((waifu) => {
              return (
                <h3
                  onClick={(e) => {
                    setWaifu(`/${waifu}.png`);
                    setOpenWaifuPicker(false);
                  }}
                >
                  {waifu}
                </h3>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
