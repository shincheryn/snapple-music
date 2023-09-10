//Going to have a button in songs that says "Add song to playlist"
//Will trigger a popup modal that provides a list of playlists

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
  console.log(songId);

  useEffect(() => {
    dispatch(playlistActions.getMyPlaylistsThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playlistId) {
      setErrors(['Please select a playlist']);
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
          <option value="">Select a Playlist</option>
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
