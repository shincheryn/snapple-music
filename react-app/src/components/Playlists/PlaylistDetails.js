/* Playlist Details */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import "./index.js";

const PlaylistDetailsPage = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const playlist = useSelector((state) => Object.values(state.playlist));
  const currentPlaylist = playlist[0];
  const user = useSelector((state) => Object.values(state.session));

  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetailsThunk(playlistId));
  }, [dispatch, playlistId]);

  return (
    <>
      <div>
        <img
          className="playlist_image"
          key={currentPlaylist.id}
          src={currentPlaylist.playlist_image_url}
          alt={currentPlaylist.playlist_name}
          title={currentPlaylist.playlist_name}
        />
      </div>
      <div>{currentPlaylist.playlist_name}</div>
      <div>
        {user[0].firstName} {user[0].lastName}
      </div>
    </>
  );
};

export default PlaylistDetailsPage;
