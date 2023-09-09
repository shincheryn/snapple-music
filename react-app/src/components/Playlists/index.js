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
      <h1>My Playlists</h1>
      {playlists.length === 0 ? (
        <button onClick={(e) => {
          e.stopPropagation()
          history.push(`/playlists/new`)
        }}>Create Your First Playlist</button>
      ) : (
        <div>
          <button onClick={(e) => {
            e.stopPropagation()
            history.push(`/playlists/new`)
          }}>Create a New Playlist</button>
          <main className='playlist-container'>
            {playlists.map((playlist) => (
              <div key={playlist.id} className='playlist-tile'>
                <Link to={`/playlists/${playlist.id}`}>
                  <div>
                    <img
                      className="playlist-image"
                      src={playlist.playlist_image_url}
                      alt={playlist.playlist_name}
                      title={playlist.playlist_name}
                    />
                  </div>
                  <div>{playlist.playlist_name}</div>
                  <div>
                    Created by: {user.firstName} {user.lastName}
                  </div>

                </Link>

                <OpenModalButton
                  modalComponent={<DeletePlaylistModal id={playlist.id} />}
                  buttonText="Delete"
                />
              </div>
            ))}
          </main>
        </div>
      )}
    </div>
  );
};

export default MyPlaylistsPage;
