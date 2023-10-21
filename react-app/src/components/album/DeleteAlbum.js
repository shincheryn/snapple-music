import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as albumActions from "../../store/album";
import "../CSS/DeleteModal.css";

function DeleteAlbum({albumId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    // const confirmButtonHandler = async(e) => {
    //     e.preventDefault();
    //     await dispatch(albumActions.deletelbumAThunk(albumId));
    //     closeModal()
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(albumActions.deletelbumAThunk(albumId))
          .then(() => {
            closeModal();
            history.push("/albums/owned");
          })
      };

    return (
        <>
            <main className="main">
            <h1 className="center-text title">Delete Album</h1>
            <p className="center-text child">Are your sure you want to delete this album?</p>
            <div className="structure">
            <form className='form-delete' onSubmit={handleSubmit}>
                <button className='create-button' type='submit'>Yes (Delete Album)</button>
                <button className='keep-button delete-style' onClick={closeModal}>No (Keep Album)</button>
            </form>
            </div>
            </main>
        </>
      )
};

export default DeleteAlbum;
