import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  return (
    <main>
      <div className="image-container">
      <img src="Fire.jpg" alt="Background" className="background-image" />

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




