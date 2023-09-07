import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as songsActions from '../../store/songs';

const MySongs = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector((state) => state.song);
    const songsArray = Object.values(songs);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(songsActions.getSongs())
        dispatch(songsActions.getCurrentUsersSongs())
    }, [dispatch])

    return (
        <>
            <h1>My Songs</h1>
        </>
    )

}

export default MySongs;
