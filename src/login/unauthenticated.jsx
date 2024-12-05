import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <div>
        <span id="top-secret">
            <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
          </span>
        <div className='input-group mb-3'>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='username' />
        </div>
        <div className='input-group mb-3'>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <div className="login-btns" style={{ display: 'flex', gap: '10px' }}>
          <Button className="primary-btn" variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
            Login
          </Button>
          <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
            Create
          </Button>
        </div>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
