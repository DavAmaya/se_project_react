import "./Footer.css";

function Footer() {
  return (
    <footer className="footer__content">
      <p className="footer__text">Developed by David Amaya</p>
      <p className="footer__text">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
