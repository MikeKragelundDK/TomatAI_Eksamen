import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import FavoritesContext from '../../store/favorites-context';

function MainNavigation() {
	const favoritesCtx = useContext(FavoritesContext);
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.location.href = '/login';
	};

	return (
		<header className={classes.header}>
			<div className={classes.logo}>Analysis tool</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>All Analysis</Link>
					</li>
					<li>
						<Link to='/new-analysis'>Analyse new picture</Link>
					</li>
					<li>
						<Link to='/favorites'>
							Saved Analysis
							<span className={classes.badge}>
								{favoritesCtx.totalFavorites}
							</span>
						</Link>
					</li>

					<li>
						<Link to='/' onClick={handleLogout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
