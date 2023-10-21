import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as songsActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import AddSongToPlaylistModal from '../Playlists/AddSongtoPlaylistModal';
import DeleteModal from './DeleteSongModal';
import '../CSS/MyPage.css'

const MySongs = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector((state) => state.song);
    const songsArray = Object.values(songs);

    useEffect(() => {
        dispatch(songsActions.getCurrentUsersSongs())
    }, [dispatch])


    const defaultImage = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg'

    return (
        <>
            <div className='page-container'>
            <h1 className='title'>My Songs</h1>
            {songsArray.length === 0 ? (
                 <button onClick={(e) => {
                    e.stopPropagation()
                    history.push('/songs/newsong')
                    }}>Upload Your First Song</button>
            ): (

                <div>
                    <button className='upload-button' onClick={(e) => {
                    e.stopPropagation()
                    history.push('/songs/newsong')
                    }}>Upload a New Song</button>
                    <main className='my-container'>
                        {songs && songsArray.map((song) => (
                        <div key={song.id} className='my-tile'>
                            <Link className='' to={`/songs/${song.id}`}>
                                <img src={song.image_url || defaultImage} alt='song prev' className='image' title={song.song_name}/>
                                <p className='a-details'>{song.song_name}</p>
                                <p className='b-details'>{song.genre}</p>
                            </Link>

                            {song?.song_url && (
                                <div className="apple-music-player">
                                    <audio controls>
                                        <source src={song.song_url} type="audio/mpeg" />
                                    </audio>
                                </div>
                            )}
                            <div className='button-container'>
                            <button className='button-31' onClick={(e) => {
                                e.stopPropagation()
                                history.push(`/songs/${song.id}/edit`)
                                }}>Update</button>
                                    {/* ADD TO PLAYLIST MODAL BUTTON */}
                                    <OpenModalButton
                                        modalComponent={<AddSongToPlaylistModal songId={song.id}/>}
                                        buttonText = 'Add to Playlist'
                                    />
                                    <OpenModalButton
                                        className='button-31'
                                        modalComponent={<DeleteModal id={song.id}/>}
                                        buttonText = 'Delete'

                                    />
                            </div>
                        </div>
                        ))}
                    </main>
                </div>
            )}
            </div>
        </>
    )

}

export default MySongs;
