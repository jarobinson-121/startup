import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  const [setup, setSetup] = React.useState('Loading...');
  const [punchline, setPunchline] = React.useState('unknown');

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        console.log('Failed to logout');
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        console.log('Logged out');
        props.onLogout();
      });
  }

  React.useEffect(() => {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => response.json())
      .then((data) => {
        setSetup(data.setup);
        setPunchline(data.punchline);
      })
      .catch(() => {});
      }, []);

  return (
    <div id="authorized-con">
      <span id="top-secret">
            <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
        </span>
      <div className='playerName'>{props.userName}</div>
      <div className="login-btns" style={{ display: 'flex', gap: '10px' }}>
        <Button className="primary-btn" variant='primary' onClick={() => navigate('/generator')}>
          Enter
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
          Logout
        </Button>
      </div>
        <div id="quote">
          <p>{setup}</p>
          <p>{punchline}</p>
      </div>
    </div>
  );
}
