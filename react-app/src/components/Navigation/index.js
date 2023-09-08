import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/"><i className="fas fa-apple-alt"> Music</i></NavLink>
			</li>
			{isLoaded && (
				<>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
					<li>
						<NavLink to='/'>Browse</NavLink>
					</li>
					<h5>Library</h5>
					<li>
						<NavLink to='/songs/owned'>Songs</NavLink>
					</li>
					<li>
						<NavLink to='/albums/owned'>Albums</NavLink>
					</li>
					<h5>Playlists</h5>
					<li>
						<NavLink to='/playlists/owned'>All Playlists</NavLink>
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
