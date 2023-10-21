import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as playlistActions from "../../store/playlist";
import { useHistory } from "react-router-dom";
import "../CSS/DeleteModal.css";

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
    <>
        <main className="main">
        <h1 className="center-text title">Delete Playlist</h1>
        <p className="center-text child">Are your sure you want to delete this playlist?</p>
        <div className="structure">
        <form className='form-delete' onSubmit={handleSubmit}>
            <button className='create-button' type='submit'>Yes (Delete Playlist)</button>
            <button className='keep-button delete-style' onClick={closeModal}>No (Keep Playlist)</button>
        </form>
        </div>
        </main>
    </>
  )
};

export default DeletePlaylistModal;
