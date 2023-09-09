/* Create Playlist */
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as playlistActions from '../../store/playlist'
import './CreatePlaylist.css'

const CreatePlaylistPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const defaultPlaylistImageUrl = 'https://res.cloudinary.com/dvlsr70pm/image/upload/v1694219162/noimageplaylist.jpg';
    const [playlistName, setPlaylistName] = useState('');
    const [playlistImageUrl, setPlaylistImageUrl] = useState('');
    // const [errors, setErrors] = useState({}); error handlers?

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(playlistImageUrl.trim() === ''){
            playlistImageUrl = defaultPlaylistImageUrl;
        }
        await dispatch(playlistActions.createPlaylistThunk(playlistName, playlistImageUrl));
        history.push("/playlists/owned");
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
                </label><label className="Playlist Image URL">
                    Playlist Image Url
                    <input
                        className=""
                        type="text"
                        placeholder="Playlist Image URL"
                        value={playlistImageUrl}
                        onChange={(e) => setPlaylistImageUrl(e.target.value)}
                    />
                </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePlaylistPage;
