import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import "./MyPlaylists.css";

const MyPlaylistsPage = () => {
  const dispatch = useDispatch();
  const myPlaylists = useSelector((state) => Object.values(state.playlist));
  const user = useSelector((state) => Object.values(state.session));

  useEffect(() => {
    console.log("dispatching playlist thunk!");
    dispatch(playlistActions.getMyPlaylistsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>My Playlists</h1>
      {myPlaylists.map((playlist) => (
        <div key={playlist.id}>
          <Link to={`/playlists/${playlist.id}`}>
            <div>
              <div>
                <img
                  className="playlist_image"
                  key={playlist.id}
                  src={playlist.playlist_image_url}
                  alt={playlist.playlist_name}
                  title={playlist.playlist_name}
                />
              </div>
              <div>{playlist.playlist_name}</div>
              <div>
                {user[0].firstName} {user[0].lastName}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPlaylistsPage;
