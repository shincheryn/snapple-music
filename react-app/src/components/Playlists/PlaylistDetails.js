import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import "./Playlists.css";

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetailsThunk(id));
  }, [dispatch, id]);

  const currentPlaylist = useSelector((state) =>
  {
    if(state.playlist.hasOwnProperty(id)){
      return state.playlist[id];
     }
     else{
      return {};
     }
    }
  );

  console.log("Current Playlist:", currentPlaylist);

  const user = useSelector((state) => state.session.user);
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
        <p>Created by: {user.firstName} {user.lastName}</p>
      </div>
    </>
  );
};

export default PlaylistDetailsPage;
