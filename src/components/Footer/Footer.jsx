import style from './Footer.module.css';

import { useWindowSizeContext } from '../../context/WindowSizeContext';

function Footer () {
  return (
    <div className={style.container}>
      <h1>Footer</h1>
    </div>
  );
}

export default Footer;