/* Create Playlist */
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as playlistActions from '../../store/playlist'
import './CreatePlaylist.css'

const CreatePlaylist = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlistName, setPlaylistName] = useState('');
    // const [errors, setErrors] = useState({}); error handlers?

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("playlist", playlistName)

        await dispatch(playlistActions.createPlaylistAction(formData));
        history.push("/playlists");
    }

    return (
        <div>
            <h1>Create a Playlist</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                <label className="Playlist Name">
                    Playlist Name
                    <input
                        className=""
                        type="text"
                        placeholder="Playlist Name"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePlaylist;
