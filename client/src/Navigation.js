import React, { useContext } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { CurrentUser } from './contexts/CurrentUser';
import './App.css';

function Navigation() {
    const location = useLocation();
    const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        history.push('/');
    };

    // Determine if the current path is active
    const isActive = (path) => location.pathname === path;

    // Determine if the background should be active (i.e., video background with overlay)
    const isBackgroundActive = () => {
        const activePaths = [
            '/apps',
            '/websites',
            '/photography',
            '/templates',
            '/sign-up',
            '/login'
        ];
        return activePaths.some(basePath => location.pathname.startsWith(basePath));
    };

    return (
        <nav className={isBackgroundActive() ? 'active-background' : 'home-background'}>
            {/* Video background */}
            {isBackgroundActive() && (
           <img src="/Fire.jpg" alt="Fire" />
            )}

            {/* Navigation links */}
            <ul>
                <li>
                    <Link 
                        to="/" 
                        className={`nav-link ${isActive('/') ? 'active-link' : ''}`} 
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/apps" 
                        className={`nav-link ${isActive('/apps') ? 'active-link' : ''}`} 
                    >
                        Apps
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/websites" 
                        className={`nav-link ${isActive('/websites') ? 'active-link' : ''}`} 
                    >
                        Websites
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/photography" 
                        className={`nav-link ${isActive('/photography') ? 'active-link' : ''}`} 
                    >
                        Photography
                    </Link>
                </li>
                {currentUser && (
                    <li style={{ textAlign: 'center', color: 'black', backgroundColor: 'white', fontWeight: 'bold', padding: '7px', borderRadius: '10px', outline: '2px solid black'}}>
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






