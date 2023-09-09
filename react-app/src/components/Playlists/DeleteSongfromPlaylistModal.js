import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlist";


function DeleteSongFromPlaylist({playlistId, songId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
        await dispatch(playlistActions.deleteSongsFromPlaylistThunk(playlistId, songId));
        closeModal()
        history.push(`/playlist/${playlistId}`);
    };

    return(
        <div className="delete-song-from-playlist">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this song?</h5>
            <button onClick={confirmButtonHandler}>Yes (Delete Song)</button>
            <button onClick={closeModal}>No (Keep Song)</button>
        </div>
    )
};

export default DeleteSongFromPlaylist;
