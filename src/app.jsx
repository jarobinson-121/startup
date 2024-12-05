import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyFiles } from './files/myfiles';
import { Generator } from './generator/generator';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export function App(props) {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');

  React.useEffect(() => {
    setImageUrl(`conspirtatoriumIcon.png`);
  }, []);


  return (
    <BrowserRouter>
    <main>
    <div className='body'>
        <header className='navbar navbar-expand-lg navbar-light bg-light' id="navbar">
          <nav className='navbar fixed-top navbar-dark'>
            <img  id="nav-icon" src={imageUrl} width="56px"/>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Home
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='myfiles'>
                    My Files
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/myfiles' element={<MyFiles />} />
          <Route path='/generator' element={<Generator />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div className='container-fluid'>
            <span >Jared Robinson</span>
            <a className='text-reset' href='https://github.com/jarobinson-121/startup/tree/main'>
              Source
            </a>
          </div>
        </footer>
      </div>
    </main>
      
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
