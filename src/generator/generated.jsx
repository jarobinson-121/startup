import React from 'react';
import './generate.css';

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Generated(props) {
  const navigate = useNavigate();

  const [theme, setTheme] = React.useState(props.theme);
  const [{ title, description }, setDetails] = React.useState({ title: 'Awaiting theme', description: 'Awaiting description' });
  const [theory, newTheory] = React.useState('No new theories yet');

  React.useEffect(() => {
    setDetails({ title: 'The Great Spin Society', description: 'The "Great Laundry Conspiracy" suggests that detergent companies are part of a secret coalition called "The Spin Society," manipulating people through micro-particles in detergent that influence emotions and cause anxiety, making people wash their clothes more often. Washing machine manufacturers are also in on it, programming machines to wear clothes out faster to fuel endless consumption. Even the "gentle cycle" is secretly aggressive, ruining fabrics to push people to buy more clothes. The conspiracy extends across industries, with coordinated scents used to keep the public compliant, while the elites use special detergents free from these manipulative chemicals.'});
  }, []);

  function saveDetails() {
    // Assuming you have a way to save the details, e.g., localStorage or a context
    localStorage.setItem(`theory_${title}`, JSON.stringify({ title, description }));
    navigate('/myfiles');
  }

  function generateNew(props) {
    // will be added in the service step
  }

  return (
    <main>
      <h1>New File Found!</h1>
      <div className="content">
        <span id="top-secret">
          <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
        </span>
        {/* <div className='input-group mb-3'>
          <input id="theme-input-field" className='form-control' value={theme} onChange={(e) => setTheme(e.target.value)} type='text' placeholder='Enlighten me about...' />
          <Button className="primary-btn" variant='primary' onClick={() => navigate('/generated')} disabled={!theme}>
            Show Me
          </Button>
        </div> */}

        <div id="recent-disc-sec">
          {/* <h2 className="recent-disc-text">New File Found!</h2> */}
          <div className="theory-text">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div id="save-btn">
          <Button className="primary-btn" variant='primary' onClick={() => saveDetails()}>
            Save File
          </Button>
          <Button className="secondary-btn" variant='secondary' onClick={() => navigate('/generator')}>
            Show Me More
          </Button>
        </div>
        
      </div>
    </main>
  );
}
