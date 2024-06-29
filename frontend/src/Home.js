import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css'; 

function Home() {
  const history = useHistory();

  return (
    <main>
      <div className="Animation">
        <div className='title'>
          <h1 className='Sincity'>Sincity Design</h1>
          <button className="custom-button" onClick={() => history.push('/sign-up')}>Sign Up</button>
          <button className="custom-button" onClick={() => history.push('/login')}>Log In</button>
        </div> 
        <video autoPlay loop muted style={{ width: '100%', height: '100%' }}>
          <source src="Fire.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}

export default Home;



