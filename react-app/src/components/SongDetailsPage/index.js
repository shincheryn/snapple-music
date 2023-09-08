import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as songsActions from '../../store/songs';

const SongDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false);
    const song = useSelector((state) => state.song[id]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(songsActions.getSongsDetails(id))
    }, [dispatch, id])

    if (!song) {
        return <div>No song</div>
    }

    return (
        <>
            <div>
                <div className='song-details'>
                    <p>{song.song_name}</p>
                    <p>{user.username}</p>
                    <p>{song.genre}</p>
                </div>
                <div className='song-image'>
                    <img src={song.image_url}/>
                </div>
            </div>
        </>
    )
}

export default SongDetails;
