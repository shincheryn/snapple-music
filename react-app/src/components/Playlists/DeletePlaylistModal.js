import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as playlistActions from "../../store/playlist";
import { useHistory } from "react-router-dom";
import './DeletePlaylistModal.css'

function DeletePlaylistModal({ id }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(playlistActions.deletePlaylistThunk(id))
      .then(() => {
        closeModal();
        history.push("/playlists/owned");
      })
  };

  return (
    <div className="deleteCon">
      <h1>Delete Playlist</h1>
      <p>Are you sure you want to delete this playlist?</p>
      <form onSubmit={handleSubmit}>
        <button className='yesDeletePlaylist' type='submit'>
          Yes (Delete)
        </button>
        <button className='yesDeletePlaylist' onClick={closeModal}>
          No (Keep)
        </button>
      </form>
    </div>
  );
}

export default DeletePlaylistModal;
