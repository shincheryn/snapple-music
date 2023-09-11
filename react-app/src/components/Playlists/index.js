import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import OpenModalButton from '../OpenModalButton';
import DeletePlaylistModal from "./DeletePlaylistModal.js";
import "./Playlists.css";

const MyPlaylistsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const playlists = useSelector((state) => Object.values(state.playlist));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(playlistActions.getMyPlaylistsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">My Playlists</h1>
        {playlists.length === 0 ? (
          <div className="create-first-playlist">
            <button className="upload-button" onClick={(e) => {
              e.stopPropagation()
              history.push(`/playlists/new`)
            }}>Create Your First Playlist</button>
          </div>
        ) : (
          <div className="playlist-button">
            <button className="upload-button" onClick={(e) => {
              e.stopPropagation()
              history.push(`/playlists/new`)
            }}>Create a New Playlist</button>
            <div className='playlist-container'>
              {playlists.map((playlist) => (
                <div key={playlist.id} className='playlist-tile'>
                  <Link to={`/playlists/${playlist.id}`} className="playlist-link">
                    <div className="image-tiles">
                      <img
                        src={playlist.playlist_image_url}
                        alt={playlist.playlist_name}
                        title={playlist.playlist_name}
                      />
                    </div>
                    <div className="a-details">
                      {playlist.playlist_name}
                    </div>
                    <div className="b-details">
                      Created by: {user?.firstName} {user?.lastName}
                    </div>
                  </Link>
                  <div className="button-container">
                    <OpenModalButton
                      modalComponent={<DeletePlaylistModal id={playlist.id} />}
                      buttonText="Delete"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylistsPage;
