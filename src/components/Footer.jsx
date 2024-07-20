import React from 'react';
import Row from 'react-bootstrap/Row';
import styles from '../styles/Footer.module.css';

const BRANDING_NAME= 'BASTARDOS';
const BRANDING_URL= 'https://discord.com/invite/qEmJcmmv6r';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row>
        <a
          href={BRANDING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {new Date().getUTCFullYear()} &#169; {BRANDING_NAME}
        </a>
      </Row>
      <Row>
        {/*
          Bruh =(
          Why would you remove this?
          It's a free, open-source tool - leave credit where credit is due
          Nothing is stopping you from doing so - though
          Just your own conscious, hopefully
        */}
        <a
          href="https://github.com/Kyriokes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hecho por Kyriokes
        </a>
        <a
          href="https://mirasaki.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Basado en el modelo de Mirasaki
        </a>
      </Row>
    </footer>
  );
};

export default Footer;
