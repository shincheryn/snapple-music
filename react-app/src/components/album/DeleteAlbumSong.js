import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as albumActions from "../../store/album";


function DeleteAlbumSong({albumId, songId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
        await dispatch(albumActions.deleteSongToAlbumThunk(albumId, songId));
        closeModal()
        history.push(`/albums/${albumId}`);
    };

    return(
        <div className="deleteSpotButtonDiv">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this album?</h5>
            <button onClick={confirmButtonHandler}>Yes (Delete Album)</button>
            <button onClick={closeModal}>No (Keep Album)</button>
        </div>
    )
};

export default DeleteAlbumSong;
