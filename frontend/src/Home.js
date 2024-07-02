import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  return (
    <main>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src="Fire.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='title'>
          <h1 className='Sincity'>Sin City Media</h1>
          <button className="custom-button" onClick={() => history.push('/sign-up')}>Sign Up</button>
          <button className="custom-button" onClick={() => history.push('/login')}>Log In</button>
        </div>
      </div>
    </main>
  );
}

export default Home;




