import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../store/album";
import { useHistory } from "react-router-dom";
import "./Album.css";


function AddAlbumSong({ albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [songId, setSongId] = useState("")
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const album = useSelector(state => Object.values(state.album).filter(x => x.id == albumId));
  const songExist = useSelector(state => Object.values(state.song))

  const checkSongExist = (songObj, songId) => {
    for (let key in songObj) {
      if (songObj[key].id == songId) {
        return false
      }
    }
    return true
  }

  let albumSongs = album[0].Songs
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < albumSongs.length; i++) {
      if (albumSongs[i].id == songId) {
        setErrors(['Song already added into this album'])
        return
      }
    }

    let songNotExist = checkSongExist(songExist, songId)

    if (songId < 1 || songNotExist) {
      setErrors(['Song Id not exist'])
    } else {
      await dispatch(albumActions.addSongToAlbumThunk(albumId, songId));
      closeModal()
      history.push(`/albums/${albumId}`);
    }
  };

  return (
    <div>
      <h1>Add Song into Album</h1>
      <div>
        {errors.length > 0 && errors.map(el => (
          <div key={el} className="errors">{el}</div>
        ))}
      </div>
      <label>
        Select Song to add:
        <select
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          required
        >
          <option key="default" value="">
            Select a Playlist
          </option>
          {songExist?.map((each, index) => (
            <option key={each.id} value={each.id}>
              {each.song_name}
            </option>
          ))}
        </select>
      </label>
      <button className="addSongButton" onClick={handleSubmit}>Add Song</button>

    </div>
  )
};

export default AddAlbumSong;
