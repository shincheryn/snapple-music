import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as songsActions from "../../store/songs";

function DeleteModal({id}) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(songsActions.deleteSong(id))
            .then(closeModal)
    };

    return (
        <>
            <h1>Delete Song</h1>
            <p>Are your sure you want to delete this song?</p>
            <form className=''onSubmit={handleSubmit}>
                <button className='' type='submit'>Yes (Delete Song)</button>
                <button className='' onClick={closeModal}>No (Keep Song)</button>
            </form>
        </>
    )
}

export default DeleteModal;
