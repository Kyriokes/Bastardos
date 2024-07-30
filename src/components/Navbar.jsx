import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/Navbar.module.css';

const USE_SCROLL_INDICATOR = true;
const NAVBAR_BACKGROUND_COLOR = 'rgba(0,0,0,.7)';
const SCROLL_INDICATOR_BACKGROUND_COLOR = 'grey';
const BRANDING_LOGO_FILE_NAME = 'logo.png' ;
const COMMUNITY_BUTTON_INVITE_LINK = 'https://discord.com/invite/qEmJcmmv6r';
const COMMUNITY_BUTTON_USE_DISCORD_LOGO = true;
const COMMUNITY_BUTTON_TEXT = 'Únete a Discord!';
const SCROLL_INDICATOR_COLOR = '#FFF';



const NavBar = () => {
  // const [scrapedData, setScrapedData] = useState([]);
  // console.log(scrapedData);
  // useEffect(() => {
  //   // Check if scroll indicator is disabled
  //   if (USE_SCROLL_INDICATOR) {
  //     // When the user scrolls the page, execute myFunction
  //     window.onscroll = () => {
  //       const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  //       const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  //       const scrolled = (winScroll / height) * 100;
  //       document.getElementById('scroll-tracker').style.width = scrolled + '%';
  //     };
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/scrape');
  //       const data = await response.json();
  //       const answer = [data.info[1],data.info[3]]
  //       setScrapedData(answer);
        
  //     } catch (error) {
  //       console.error('Error fetching scraped data:', error);
  //       setScrapedData(["",""])
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Navbar
        sticky="top"
        variant="dark"
        className={styles.navbar}
        style={{
          backgroundColor: NAVBAR_BACKGROUND_COLOR,
          borderBottom: `2px solid ${SCROLL_INDICATOR_BACKGROUND_COLOR}`
        }}
      >
        <Container className={styles.navContainer}>
          <Navbar.Brand href="/" className={styles.brand}>
            <Image
              alt="logo"
              src={`/${BRANDING_LOGO_FILE_NAME}`}
              width="75"
              height="75"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle />
          <div className={styles.ButtonsGroup}>
            <Link className={styles.leaderboardButton} href="/leaderboard" passHref>
              Clasificaciones
            </Link>
            <Link className={styles.leaderboardButton} href="/hallOfFame" passHref>
              Salón de la Fama
            </Link>
            <Link className={styles.leaderboardButton} href="/rules" passHref>
              Reglas
            </Link>
          </div>
          <Navbar.Collapse className={styles.discordButtonG}>
            {/* <div className={styles.ServerInfoGroup}>
              <p className={styles.ServerInfo}>Jugadores: {scrapedData[0]}</p>
              <div className={styles.ServerCont}>
              <p className={styles.ServerInfo}>Servidor: </p>
              <p className={styles[scrapedData[1]]}>{scrapedData[1]}</p>
              </div>
            </div> */}
            <Button
              className={styles.discordButton}
              variant="outline-primary"
              href={COMMUNITY_BUTTON_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              {COMMUNITY_BUTTON_USE_DISCORD_LOGO && <Image
                alt="discord-logo"
                src='/discord-logo-white.svg'
                width='30'
                height='30'
                style={{ marginRight: '.4em' }}
              />}
              {' '}{COMMUNITY_BUTTON_TEXT}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Scroll Indicator Vertical Bar */}
      <div
        id="scroll-tracker"
        className={styles.scrollTracker}
        style={{
          backgroundColor: SCROLL_INDICATOR_COLOR,
          visibility: USE_SCROLL_INDICATOR ? 'visible': 'hidden'
        }}
      />
    </>
  );
};

export default NavBar;
