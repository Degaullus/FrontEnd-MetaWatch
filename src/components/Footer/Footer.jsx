import style from './Footer.module.css';

function Footer () {
  return (
    <footer className={style.container}>
      <div className={style.footerContent}>
        <p>&copy; {new Date().getFullYear()} MetaHammer. Some rights reserved.</p>
        <p>Join our community on <a href="https://www.example.com" className={style.link}>Social Media</a></p>
      </div>
    </footer>
  );
}

export default Footer;