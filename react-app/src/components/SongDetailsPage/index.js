import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as songsActions from '../../store/songs';

const SongDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const song = useSelector((state) => state.song[id]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(songsActions.getSongsDetails(id))
    }, [dispatch])

    return (
        <>
            <h1>Song Details</h1>
        </>
    )
}

export default SongDetails;
