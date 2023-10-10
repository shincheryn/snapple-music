import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as songsActions from "../../store/songs";
import './css/delete.css'


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
            <main className="main">
            <h1 className="center-text title">Delete Song</h1>
            <p className="center-text child">Are your sure you want to delete this song?</p>
            <div className="structure">
            <form className='form-delete' onSubmit={handleSubmit}>
                <button className='create-button' type='submit'>Yes (Delete Song)</button>
                <button className='keep-button delete-style' onClick={closeModal}>No (Keep Song)</button>
            </form>
            </div>
            </main>
        </>
    )
}

export default DeleteModal;
