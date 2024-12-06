import React, { useState, useEffect } from 'react';
import './myfiles.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function MyFiles(props) {
  const navigate = useNavigate();
  const [theories, setTheories] = useState([]);

  async function getTheoriesObject() {
    const response = await fetch('/api/theories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const theories = await response.json();
    return theories;
  }

  useEffect(() => {
    async function fetchTheories() {
      try {
        const theoriesObject = await getTheoriesObject();
        setTheories(theoriesObject);
      } catch (error) {
        console.error('Error fetching theories:', error);
      }
    }

    fetchTheories();
  }, []);

  return (
    <main>
      <div className="content">
        <h1>My Files</h1>
        <span id="top-secret">
          <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
        </span>
        <div>
          <div id="recent-disc-sec">
            {theories.map((theory, index) => (
              <div className="theory-text" key={index}>
                <h3>{theory.title}</h3>
                <p>{theory.description}</p>
              </div>
            ))}
          </div>
          <div id="show-btn">
            <Button className="primary-btn" variant="primary" onClick={() => navigate('/generator')}>
              Show Me More
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
