/* Delete Playlist Modal */

import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as playlistActions from "../../store/playlist";

function DeletePlaylistModal({id}) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(playlistActions.deletePlaylistAction(id))
            .then(closeModal)
    };

    return (
        <>
            <h1>Delete Playlist</h1>
            <p>Are your sure you want to delete this playlist?</p>
            <form className=''onSubmit={handleSubmit}>
                <button className='yesDeletePlaylist' type='submit'>Yes (Delete Playlist)</button>
                <button className='noDeletePlaylist' onClick={closeModal}>No (Keep Playlist)</button>
            </form>
        </>
    )
}

export default DeletePlaylistModal;
