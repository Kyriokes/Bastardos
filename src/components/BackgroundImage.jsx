import React from 'react';

const OVERLAP_BACKGROUND_AND_NAVBAR = true;
const USE_BACKGROUND_IMAGE = true;
const BACKGROUND_IMAGE_FILE_NAME = 'background.png';


function BackgroundImage () {
  return (
    <div style={{
      position: 'fixed',
      top: OVERLAP_BACKGROUND_AND_NAVBAR ? '0px' : '85px', // Navbar/Header height offset
      width: '100%',
      // Prevent overflow bottom when not overlapping
      height: OVERLAP_BACKGROUND_AND_NAVBAR
        ? '100lvh'
        : 'calc(100lvh - 85px)',
      ...(USE_BACKGROUND_IMAGE && {
        backgroundImage: `url('/${BACKGROUND_IMAGE_FILE_NAME}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        zIndex: -1
      })
    }} />
  );
}

export default BackgroundImage;
