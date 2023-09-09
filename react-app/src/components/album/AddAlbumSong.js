import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../store/album";
import { useHistory } from "react-router-dom";


function AddAlbumSong({ albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [songId, setSongId] = useState("")
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (songId < 1) {
      setErrors(['Song Id not exist'])
    }
      await dispatch(albumActions.addSongToAlbumThunk(albumId, songId));
      closeModal()
      // history.push(`/albums/${albumId}`);
      history.push(`/albums/owned`);
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
        Song Id
        <input
          type="number"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          required
        />
      </label>
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
};

export default AddAlbumSong;
