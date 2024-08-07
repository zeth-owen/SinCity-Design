import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUser } from '../contexts/CurrentUser'; 

function SignUpForm() {
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUser); 

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
    
      const response = await fetch('https://sincity-media-server.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), 
      });
  
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create user: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
    
      const data = await response.json();
      const { user: newUser, token } = data; 
  
     
      localStorage.setItem('token', token);
      setCurrentUser(newUser);
  
    
      history.push('/');
    } catch (error) {
      
      console.error('Error creating user:', error);
    }
  }
  

  return (
    <main className="auth-container">
    <div className="auth-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name </label>
          <input
            required
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className="form-control"
            id="first_name"
            name="first_name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name </label>
          <input
            required
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className="form-control"
            id="last_name"
            name="last_name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Sign Up" />
      </form>
      </div>
    </main>
  );
}

export default SignUpForm;



