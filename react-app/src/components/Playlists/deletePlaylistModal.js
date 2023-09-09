import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as playlistActions from "../../store/playlist";
import { useHistory } from "react-router-dom";

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
      <h1>Delete Playlist</h1>
      <p>Are you sure you want to delete this playlist?</p>
      <form onSubmit={handleSubmit}>
        <button className='yesDeletePlaylist' type='submit'>
          Yes (Delete Playlist)
        </button>
        <button className='noDeletePlaylist' onClick={closeModal}>
          No (Keep Playlist)
        </button>
      </form>
    </>
  );
}

export default DeletePlaylistModal;
