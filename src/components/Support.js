import React from 'react';
import './support.css'; 

const Support = () => {
  return (
    <div className="support">
      <div className="support-header">
        <h1>Welcome to Our Support Center</h1>
      </div>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>How do I book a meeting online?</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis felis eget nunc laoreet ultricies.
          </li>
          <li>
            <strong>What payment methods do you accept?</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis felis eget nunc laoreet ultricies.
          </li>
          <li>
            <strong>How can I cancel a booking?</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis felis eget nunc laoreet ultricies.
          </li>
        </ul>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <p>
          Getting started with our online meeting booking system is easy. Follow these simple steps to get started:
        </p>
        <ol>
          <li>Create an account on our website.</li>
          <li>Log in to your account.</li>
          <li>Search for available meetings.</li>
          <li>Select a meeting and book your appointment.</li>
          <li>Manage your bookings in your account dashboard.</li>
        </ol>
      </section>

      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>
          If you need assistance or have any questions, feel free to reach out to our support team:
        </p>
        <ul>
          <li>Email: <a href="mailto:support@example.com">support@example.com</a></li>
          <li>Phone: +1-800-123-4567</li>
          <li>Address: 123 Main Street, City, State, ZIP</li>
        </ul>
      </section>

    </div>
  );
}

export default Support;
