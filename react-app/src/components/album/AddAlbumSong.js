import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../store/album";
import { useHistory } from "react-router-dom";


function AddAlbumSong({ albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [songId, setSongId] = useState("")
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const album = useSelector(state => Object.values(state.album).filter(x=>x.id == albumId));
  const songExist = useSelector(state => Object.values(state.song).filter(x=>x.id == songId));

  let albumSongs = album[0].Songs
  const handleSubmit = async (e) => {
    e.preventDefault();

    for(let i = 0; i < albumSongs.length; i++) {
      if(albumSongs[i].id == songId) {
        setErrors(['Song already added into this album'])
        return
      }
    }
    if (songId < 1 || songExist) {
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
