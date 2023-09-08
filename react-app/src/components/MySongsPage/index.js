import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as songsActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteSongModal';

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

    const defaultImage = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg'

    return (
        <>
            <h1>My Songs</h1>
            {songs && songsArray.map((song) => (
            <div key={song.id}>
                <Link className='' to={`/songs/${song.id}`}>
                        <p className=''>{song.song_name}</p>
                        <img src={song.image_url || defaultImage} alt='song prev' className='image'title={song.song_name}/>
                        <p className=''>{song.genre}</p>
                </Link>
                <button onClick={(e) => {
                    e.stopPropagation()
                    history.push(`/songs/${song.id}/edit`)
                    }}>Update</button>
                        <OpenModalButton
                            modalComponent={<DeleteModal id={song.id}/>}
                            buttonText = 'Delete'
                        />
                </div>
            ))}
        </>
    )

}

export default MySongs;
