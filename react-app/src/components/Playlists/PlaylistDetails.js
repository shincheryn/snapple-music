import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import OpenModalButton from "../OpenModalButton";
import DeleteSongFromPlaylist from "./DeleteSongfromPlaylistModal.js";
import { useModal } from "../../context/Modal";
import { Link } from 'react-router-dom';
import './PlaylistDetails.css'

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetailsThunk(id));
  }, [dispatch, id]);

  const currentPlaylist = useSelector((state) => state.playlist[id]);
  const isLoading = !currentPlaylist && !showModal;

  const user = useSelector((state) => state.session.user);

  const closeMenu = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showModal]);

  return (
    <div className="container">
    <div className="playlist-details-container">
      {!isLoading && !currentPlaylist && <div>Playlist not found.</div>}
      {!isLoading && currentPlaylist && (
        <>
          <img
            className="playlist-image"
            key={currentPlaylist?.playlist_id}
            src={currentPlaylist?.playlist_image_url}
            alt={currentPlaylist?.playlist_name}
            title={currentPlaylist?.playlist_name}
          />

          <div>

            {currentPlaylist?.songs?.map((song, index) => (
              <div key={`${index}`} className="song-item">
                <Link className='' to={`/songs/${song.id}`}>
                  <div class="song-line">
                    <p>{index + 1}.</p>
                    <img src={song?.image_url} alt='song prev' className='image' title={song?.song_name}/>
                    <p>{song?.song_name}</p>
                  </div>
                </Link>
                <div className="delete-button">
                  {user && (
                    <OpenModalButton
                      buttonText="Delete Song from Playlist"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteSongFromPlaylist playlistId={id} songId={song?.id} />}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default PlaylistDetailsPage;
