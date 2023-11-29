import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as albumActions from "../../store/album";


function DeleteAlbumSong({ albumId, songId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmButtonHandler = async (e) => {
        e.preventDefault();
        await dispatch(albumActions.deleteSongToAlbumThunk(albumId, songId));
        closeModal()
        history.push(`/albums/${albumId}`);
    };

    return (
        <main className="main">
            <h1 className="center-text title">Delete Song</h1>
            <p className="center-text child">Are your sure you want to delete this song?</p>
            <div className="structure">
                <form className='form-delete' onSubmit={confirmButtonHandler}>
                    <button className='create-button' type='submit'>Yes (Delete Song)</button>
                    <button className='create-button' onClick={closeModal}>No (Keep Song)</button>
                </form>
            </div>
        </main>
    )
};

export default DeleteAlbumSong;
