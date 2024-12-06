import React from 'react';
import './generate.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Generator(props) {

  const navigate = useNavigate();
  const [theme, setTheme] = React.useState(props.theme||'');
  const [{ title, description }, newDetails] = React.useState({ title: 'Awaiting theme', description: 'Awaiting description' });


  async function generateNew(theme) {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: theme })
      });
  
      if (!response.ok) {
        // If the server responded with a non-2xx status, handle it as an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const { title: theoryTitle, theory: theoryText } = data;
      newDetails({ title: theoryTitle, description: theoryText });
  
    } catch (error) {
      console.error("Error generating theory:", error);
      newDetails({ title: 'Error', description: 'Failed to generate theory' });
    }
  }

  // List of theories
  const theories = [
    {
      title: "Area 51",
      description:
        "Area 51 is a top-secret military base in the Nevada desert. It is the most famous secret military installation in the world. The base has been shrouded in secrecy, with many conspiracy theories surrounding its purpose. Some believe that the base is used to store and study alien technology, while others think it is a testing ground for experimental aircraft. The truth is still unknown, as the US government has never officially acknowledged the base's existence.",
    },
    {
      title: "Chemtrails",
      description:
        "Chemtrails are the white streaks that form behind airplanes in the sky. Some believe that these streaks are actually chemicals being sprayed into the atmosphere for nefarious purposes. The most common theory is that the government is using chemtrails to control the weather or manipulate the population. However, scientists have debunked these claims, stating that chemtrails are simply contrails, which are formed when water vapor condenses and freezes in the cold air at high altitudes.",
    },
    {
      title: "Flat Earth",
      description:
        "The flat Earth theory is the belief that the Earth is flat, rather than a sphere. This theory has been around for centuries, but has gained popularity in recent years due to the rise of the internet and social media. Proponents of the flat Earth theory claim that the Earth is a disc, with the North Pole at the center and the continents spread out around it. However, this theory has been debunked by scientists, who have provided overwhelming evidence that the Earth is round.",
    },
  ];

  function setTheories() {
    return theories.map((theory, index) => (
      <div className="theory-text" key={index}>
        <h3>{theory.title}</h3>
        <p>{theory.description}</p>
      </div>
    ));
  }

  function saveDetails() {
    // Assuming you have a way to save the details, e.g., localStorage or a context
    fetch('/api/theory')
      .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
      })
      .then(data => {
      console.log('Details saved successfully:', data);
      })
      .catch(error => {
      console.error('Error saving details:', error);
      });
    navigate('/myfiles');
  }

  return (
    <main>
      <h1>Open Your Eyes...</h1>
      <div className="content">
        <span id="top-secret">
          <img src="Top_Secret.png" alt="Top Secret" width="600" height="100"
          />
        </span>
        <div className="input-group mb-3">
          <input
            id="theme-input-field"
            className="form-control"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            type="text"
            placeholder="Enlighten me about..."
          />
          <Button className="primary-btn" variant="primary" onClick={() => generateNew(theme)} disabled={!theme}>
            Show Me
          </Button>
        </div>

        <div id="recent-disc-sec">
          <h2 id="recent-disc-text">{title === 'Awaiting theme' ? 'Recent Discoveries by Others' : 'New File Found!'}</h2>
          {title === 'Awaiting theme' ? setTheories() : (
            <div className="theory-text">
              <h3>{title}</h3>
              <p>{description}</p>
              <div id="save-btn">
                <Button className="primary-btn" variant='primary' onClick={() => saveDetails()}>
                  Save File
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
