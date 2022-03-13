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

export const Drawer = ({ setBgColor, setFontColor, setWaifu }) => {
  const [openColorChanger, setOpenColorChanger] = useState(false);
  const [openFontColorChanger, setOpenFontColorChanger] = useState(false);
  const [openWaifuPicker, setOpenWaifuPicker] = useState(false);

  const waifus = ['rem', 'ram', 'emilia', '2b', 'alice', 'marisa', 'oumae', 'sakuraku'];

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
        <h2>Work Timer</h2>
        <h2>Short Break Timer</h2>
        <h2>Long Break Timer</h2>
        <h2>Short Breaks</h2>
        <h2 onClick={handleWaifuPicker}>Change Waifu</h2>
        {openWaifuPicker && (
          <div className={styles.drawer__waifu_list}>
            {waifus.map((waifu) => {
              return (
                <h3
                  onClick={(e) => {
                    setWaifu(`/${waifu}.png`);
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
