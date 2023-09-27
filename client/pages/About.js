import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about">
      <h1 className="about-header">About Us</h1>

      <div className="about-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero eget gravida viverra, velit odio hendrerit tortor,
          quis volutpat orci elit id nunc. Sed sed turpis eget turpis cursus bibendum. Sed ultrices ultrices risus, at
          bibendum elit ultricies a. Sed sodales, odio nec hendrerit facilisis, metus nunc bibendum massa, eu cursus tortor est ut justo.
        </p>

        <p>
          Nulla facilisi. Sed non bibendum urna. Vivamus vestibulum, ligula in feugiat laoreet, augue neque vestibulum lorem, a eleifend
          nunc mi et arcu. Integer vel ex vitae tellus dictum tincidunt. Nullam condimentum justo eu posuere fermentum. Vivamus eget
          condimentum tellus. Integer vel tellus sit amet elit lacinia eleifend in sit amet tellus.
        </p>
      </div>
    </div>
  );
}

export default About;
