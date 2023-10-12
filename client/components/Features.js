import React from 'react';
import './Features.css'; // Import your CSS file for styling

const Features = () => {
  return (
    <div className="features">
      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Calendar</h3>
        <p>Do you want to plan longterm? Frustrated with flipping pages in your physical calendar? Go digital today with Meetings and gain a broad view of your monthly upcoming meetings.</p>
      </div>

      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Meetings</h3>
        <p>Democratize your meetings. Invite classmates or collegues to your meetings and present them a plethora of time slots as per your desire. Your participants can vote on a timeslot within your provided timeslot buffet. </p>
      </div>

      <div className="feature">
        <i className="fas fa-check-circle"></i>
        <h3>Security</h3>
        <p>Are you worried that your details might end up in malicious hands? With our highly optimized security system, no hacker will be able to decode your encrypted data. </p>
      </div>

    </div>
  );
}

export default Features;
