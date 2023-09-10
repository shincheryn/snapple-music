import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Player from '../AudioPlayer/audioplayer';
import * as songsActions from '../../store/songs';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const songs = useSelector((state) => state.song);

	useEffect(() => {
		dispatch(songsActions.getSongs())
	}, [dispatch])

	return (
		<div className="nav-container">
			<div className="nav-items">
					<li className="nav-logo">
						<NavLink exact to="/" className="nav-link">
							<i className="fas fa-apple-alt"> Music</i>
						</NavLink>
					</li>
				<ul>
					{isLoaded && (
						<>
							<li>
								<ProfileButton user={sessionUser} />
							</li>
							<Player song_url={songs.song_url} />
							<li>
								<NavLink to='/'>Browse</NavLink>
							</li>
						</>
					)}
					{sessionUser && (
						<>
							<h5>Library</h5>
							<li>
								<NavLink to='/songs/owned'>Songs</NavLink>
							</li>
							<li>
								<NavLink to='/albums/owned'>Albums</NavLink>
							</li>
							<h5>Playlists</h5>
							<li>
								<NavLink to='/playlists/owned'>My Playlists</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</div >
	);
}

export default Navigation;
