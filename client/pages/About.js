import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about">
      <h1 className="about-header">About Us</h1>

      <div className="about-content">
        <p>
          Who are we? We are a group of students from the Jönköping University who are passionate about making the world a better place. 
          But how do we do that? We do that by making your life easier. We do that by making your life more organized.
          <strong> If you don't plan, you plan to fail</strong>. This is why we created Meetings. And who are we? 
        </p>

        <p>
          Are group of developers consists of <u>4 members</u>:
        </p>

        <ul>
          <li>ICE</li>
          <li>Neobyte01</li>
          <li>mosmar99</li>
          <li>tuura01</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
