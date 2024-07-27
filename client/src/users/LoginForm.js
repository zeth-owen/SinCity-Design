import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUser } from '../contexts/CurrentUser'; 

function LoginForm() {
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUser); 

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('token', data.token);
        history.push('/');
        setErrorMessage(null); 
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Failed to connect to the server');
    }
  }

  return (
    <main className="auth-container">
    <div className="auth-form">
      <h1>Login</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              value={credentials.email}
              onChange={e => setCredentials({ ...credentials, email: e.target.value })}
              className="form-control"
              id="email"
              name="email"
            />
          </div>
          <div className="col-sm-6 form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              className="form-control"
              id="password"
              name="password"
            />
          </div>
        </div>
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
    </div>
    </main>
  );
}

export default LoginForm;



