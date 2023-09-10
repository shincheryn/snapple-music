import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from "../../store/songs.js";
import aPicture from "./a.png";
import bPicture from "./b.png";
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(songActions.getSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => Object.values(state.song))

  return (
    <div className="container">
      <h1 className="headline">Browse</h1>
        <div className="featured-section">
          <div>
            <div className="featured-title">Today's Hits</div>
            <div className="song-genre">Snapple Music Hits</div>
            <img src={aPicture} alt="Hits"></img>
          </div>
          <div>
            <div className="featured-title">Snapple Music Hits: Dominic Fike</div>
            <div className="song-genre">Dominic Fike</div>
            <img src={bPicture} alt="Hits"></img>
          </div>
        </div>
        <div className="song-card-grid">
          {allSongs.map((song) => (
            <Link className='song-id' to={`/songs/${song.id}`}>
            <a key={song.id} href="#" className="song-card">
              <img src={song.image_url} alt={song.song_name} title={song.song_name} />
              <div className="song-name">{song.song_name}</div>
              <div className="song-genre">Snapple Music {song.genre}</div>
            </a>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default LandingPage;
