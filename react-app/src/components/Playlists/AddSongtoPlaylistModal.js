import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as playlistActions from "../../store/playlist";
import { useHistory } from "react-router-dom";

function AddSongToPlaylistModal({ songId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [playlistId, setPlaylistId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const playlistMap = useSelector((state) => state.playlist);
  const playlists = Object.values(playlistMap);

  useEffect(() => {
    dispatch(playlistActions.getMyPlaylistsThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPlaylist = playlists.find((playlist) => playlist.id == playlistId);
    if (selectedPlaylist && selectedPlaylist.songs.some((song) => song.id === songId)) {
      setErrors(["Song is already in the playlist"]);
    } else {
      await dispatch(playlistActions.addSongsToPlaylistThunk(playlistId, songId));
      closeModal();
      history.push(`/playlists/${playlistId}`);
    }
  };

  return (
    <div>
      <h1>Add Song to Playlist</h1>
      <div>
        {errors.length > 0 && errors.map((el) => (
          <div key={el} className="errors">
            {el}
          </div>
        ))}
      </div>

      <label>
        Select Playlist
        <select
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
          required
        >
          <option key="default" value="">
            Select a Playlist
          </option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.playlist_name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddSongToPlaylistModal;
