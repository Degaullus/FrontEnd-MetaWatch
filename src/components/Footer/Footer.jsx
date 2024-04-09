import { useWindowSizeContext } from '../../context/WindowSizeContext';
import style from './Footer.module.css';

function Footer () {
  return (
    <div className={style.container}>
      <h1>Footer</h1>
    </div>
  );
}

export default Footer;