import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as songsActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import AddSongToPlaylistModal from '../Playlists/AddSongtoPlaylistModal';
import DeleteModal from '../DeleteSongModal';
import Player from '../AudioPlayer/audioplayer';
import './mysongs.css'

// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css'

const MySongs = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector((state) => state.song);

    const songsArray = Object.values(songs);
    // const user = useSelector(state => state.session.user);


    //  const [isPlaying, setIsPlaying] = useState(false);
    //  const [audioSrc, setAudioSrc] = useState("");

    // const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
    // const [currentSong, setCurrentSong] = useState(null);

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
                    <main className='song-container'>
                        {songs && songsArray.map((song) => (
                        <div key={song.id} className='song-tile'>
                            <Link className='' to={`/songs/${song.id}`}>
                                <img src={song.image_url || defaultImage} alt='song prev' className='image' title={song.song_name}/>
                                <p className='a-details'>{song.song_name}</p>
                                <p className='b-details'>{song.genre}</p>
                            </Link>
                            {/* <Player song_url={song?.song_url} className='audioplayer'/> */}

                            {song?.song_url && (
                        <div className="apple-music-player">
                        <audio controls>
                            <source src={song.song_url} type="audio/mpeg" />
                        </audio>
                        </div>
                )}
                            <div className='button-container'>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                history.push(`/songs/${song.id}/edit`)
                                }}>Update</button>
                                {/* <div className="spacer"></div> */}
                                    {/* ADD TO PLAYLIST MODAL BUTTON */}
                                    <OpenModalButton
                                        modalComponent={<AddSongToPlaylistModal songId={song.id}/>}
                                        buttonText = 'Add to Playlist'
                                    />
                                    {/* <div className="spacer"></div> */}
                                    <OpenModalButton
                                        className='del-button'
                                        modalComponent={<DeleteModal id={song.id}/>}
                                        buttonText = 'Delete'
                                    />
                                    </div>
                        </div>
                        ))}
                         {/* <AudioPlayer
                                className='audio-player'
                                autoPlay={isPlaying}
                                src={songs.song_url}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                customControls={[
                                    // Customize the player controls
                                    'play', 'progress', 'volume', 'duration', 'time', 'seek'
                                ]}
                            /> */}
                    </main>
                </div>
            )}
            </div>
        </>
    )

}

export default MySongs;
