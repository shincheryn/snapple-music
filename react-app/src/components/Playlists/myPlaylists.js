import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as playlistActions from '../../store/playlist';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeletePlaylistModal';
import './MyPlaylists.css'

const MyPlaylists = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const myPlaylists = useSelector((state) => state.playlist);
    const playlistArray = Object.values(myPlaylists);

    useEffect(() => {
        dispatch(playlistActions.getMyPlaylistsAction())
    }, [dispatch])


    return (
        <>
            <h1>My Playlists</h1>
            
        </>
    )

}

export default MyPlaylists;
