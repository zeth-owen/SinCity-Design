import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUser } from './contexts/CurrentUser';
import { Link } from 'react-router-dom';
import './App.css';

function Navigation() {
    const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        history.push('/');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/apps" className="nav-link">Apps</Link>
                </li>
                <li>
                    <Link to="/websites" className="nav-link">Websites</Link>
                </li>
                <li>
                    <Link to="/photography" className="nav-link">Photography</Link>
                </li>
                {currentUser && (
                    <li style={{ textAlign: 'center' }}>
                        {currentUser.first_name} {currentUser.last_name}
                        <br />
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;



