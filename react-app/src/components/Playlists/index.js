import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import OpenModalButton from "../OpenModalButton";
import DeletePlaylistModal from "./DeletePlaylistModal.js";
import "../CSS/MyPage.css";
import EditPlaylist from "./UpdatePlaylist.js";

const MyPlaylistsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) =>
    Object.values(state.playlist).filter((e) => e.userId == user.id)
  );

  useEffect(() => {
    dispatch(playlistActions.getMyPlaylistsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">My Playlists</h1>
        {playlists.length === 0 ? (
          <div>
            <button
              className="upload-button"
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/playlists/new`);
              }}
            >
              Create Your First Playlist
            </button>
          </div>
        ) : (
          <div>
            <button
              className="upload-button"
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/playlists/new`);
              }}
            >
              Create a New Playlist
            </button>
            <div className="my-container">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="my-tile">
                  <Link
                    to={`/playlists/${playlist.id}`}
                    className="playlist-link"
                  >
                    <div>
                      <img
                        class="image"
                        src={playlist.playlist_image_url}
                        alt={playlist.playlist_name}
                        title={playlist.playlist_name}
                      />
                    </div>
                    <div className="a-details">{playlist.playlist_name}</div>
                    <div className="b-details">
                      Created by: {user?.firstName} {user?.lastName}
                    </div>
                  </Link>
                  <div className="button-container">
                    <button
                      className="button-31"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/playlists/${playlist.id}/edit`);
                      }}
                    >
                      Update
                    </button>

                    <OpenModalButton
                      className="button-31"
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
