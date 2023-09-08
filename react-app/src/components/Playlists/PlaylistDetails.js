import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import "./Playlists.css";

const PlaylistDetailsPage = () => {
  const { playlistId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetailsThunk(playlistId));
  }, [dispatch, playlistId]);

  const playlist = useSelector((state) => Object.values(state.playlist));
  console.log("Playlist:", playlist);


  const currentPlaylist = playlist[0];
  console.log("Current Playlist:", currentPlaylist);

  const user = useSelector((state) => Object.values(state.session));
  console.log("User:", user);


  return (
    <>
      <div>
        <img
          className="playlist-image"
          key={currentPlaylist.id}
          src={currentPlaylist.playlist_image_url}
          alt={currentPlaylist.playlist_name}
          title={currentPlaylist.playlist_name}
        />
      </div>
      <div>{currentPlaylist.playlist_name}</div>

      <div className="playlist-details">
        <p>Created by: {user[0].firstName} {user[0].lastName}</p>
      </div>
    </>
  );
};

export default PlaylistDetailsPage;
