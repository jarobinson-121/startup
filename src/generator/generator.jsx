import React from 'react';
import './generate.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Generator(props) {

  const navigate = useNavigate();
  const [theme, setTheme] = React.useState(props.theme||'');
  const [{ title, description }, newDetails] = React.useState({ title: 'Awaiting theme', description: 'Awaiting description' });
  const [recentTheories, setRecentTheories] = React.useState([]);

  async function generateNew(theme) {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: theme }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Generated data:', data);
      const { title: theoryTitle, description: theoryText } = data;
      newDetails({ title: theoryTitle, description: theoryText });
    } catch (error) {
      console.error('Error generating theory:', error);
      newDetails({ title: 'Error', description: 'Failed to generate theory' });
    }
  }

  async function setTheories() {
    try {
      const response = await fetch('/api/recenttheories');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const theories = await response.json();
      console.log('Fetched theories from backend:', theories);
      setRecentTheories(theories);
    } catch (error) {
      console.error('Error fetching theories:', error.message);
    }
  }
  

  React.useEffect(() => {
    if (title === 'Awaiting theme') {
      console.log('Fetching recent theories because title is:', title);
      setTheories();
    }
  }, [title]);
  

  async function saveTheory() {
    try {
      const response = await fetch('/api/saveusertheory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Details saved successfully:', data);
      navigate('/myfiles');
    } catch (error) {
      console.error('Error saving details:', error);
    }
  }

return (
  <main>
    <h1>Open Your Eyes...</h1>
    <div className="content">
      <span id="top-secret">
        <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
      </span>
      <div className="input-group mb-3">
        <input id="theme-input-field" className="form-control" value={theme} onChange={(e) => setTheme(e.target.value)} type="text" placeholder="Enlighten me about..." />
        <Button className="primary-btn" variant="primary" onClick={() => generateNew(theme)} disabled={!theme} >
          Show Me
        </Button>
      </div>

      <div id="recent-disc-sec">
        <h2 id="recent-disc-text">
          {title === 'Awaiting theme' ? 'Recent Discoveries by Others' : 'New File Found!'}
        </h2>
        {title === 'Awaiting theme' ? (
        <div className="recent-theories">
          {recentTheories.length > 0 ? (
            recentTheories.map((theory, index) => (
              <div key={index} className="theory-item">
                <h3>{theory.title}</h3>
                <p>{theory.description}</p>
              </div>
            ))
          ) : (
            <p>No recent theories available.</p>
          )}
        </div>
      ) : (
        <div className="theory-text">
          <h3>{title}</h3>
          <p>{description}</p>
          <div id="save-btn">
            <Button className="primary-btn" variant="primary" onClick={() => saveTheory()} >
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
