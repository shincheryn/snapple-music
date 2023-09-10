import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../store/album";


function DeleteAlbum({albumId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
        await dispatch(albumActions.deletelbumAThunk(albumId));
        closeModal()
    };

    return(
        <div className="pageContainers">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this album?</h5>
            <button onClick={confirmButtonHandler}>Yes (Delete Album)</button>
            <button onClick={closeModal}>No (Keep Album)</button>
        </div>
    )
};

export default DeleteAlbum;
