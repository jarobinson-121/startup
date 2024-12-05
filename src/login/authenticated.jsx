import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <span id="top-secret">
            <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
        </span>
      <div className='playerName'>{props.userName}</div>
      <div className="login-btns" style={{ display: 'flex', gap: '10px' }}>
        <Button className="primary-btn" variant='primary' onClick={() => navigate('/generated')}>
          Enter
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
