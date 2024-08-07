import React from 'react';
import PropTypes from 'prop-types';

// Styles / CSS
import '../styles/globals.css'; // Our global stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css
import SEO from '../components/SEO';

const PAGE_TITLE = 'BASTARDOS';
const PAGE_SUB_TITLE = 'DayZ';
const PAGE_DESCRIPTION = 'Tabla de clasificación de DayZ para la comunidad de BASTARDOS. Navega por los mejores jugadores y muestra estadísticas detalladas de jugador.';
const BRANDING_LOGO_FILE_NAME = 'logo.png';
const BRANDING_THEME_COLOR = '#00FFFF';


function MyApp ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (<>
    {/* Default Search Engine Optimization */}
    <SEO
      title={PAGE_TITLE}
      subTitle={PAGE_SUB_TITLE}
      description={PAGE_DESCRIPTION}
      imageURL={process.env.NEXT_PUBLIC_IMAGE_URL || `/${BRANDING_LOGO_FILE_NAME}`}
      favicon={BRANDING_LOGO_FILE_NAME}
      largeImg={process.env.NEXT_PUBLIC_LARGE_OG_IMAGE === 'true'}
      color={BRANDING_THEME_COLOR}
    />
    <Component {...pageProps} />
  </>);
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};


export default MyApp;
