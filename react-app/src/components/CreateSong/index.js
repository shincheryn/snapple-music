import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as songsActions from '../../store/songs'

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory(); // so that you can redirect after the image upload is successful
    const [song_name, setSong_Name] = useState('');
    const [genre, setGenre] = useState('');
    const [image_url, setImage_url] = useState(null);
    const [song_url, setSong_url] = useState(null);
    const [songLoading, setSongLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song_name", song_name);
        formData.append("genre", genre);
        formData.append("image_url", image_url);
        formData.append("song_url", song_url)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        setSongLoading(true);

        try {
            await dispatch(songsActions.createSong(formData));
            history.push("/songs/owned");
        } catch (err){
            console.error("Error creating song:", err);
            setImageLoading(false);
            setSongLoading(false);
        }
    }

    return (
        <div>
            <h1>Create a New Song</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                <label className="">
                    Song Name
                    <input
                        className=""
                        type='text'
                        placeholder="Song Name"
                        value={song_name}
                        onChange={(e) => setSong_Name(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Genre
                    <input
                        className=""
                        type='text'
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Select Song Image
                    <input
                        type="file"
                        accept="image_url/*"
                        onChange={(e) => setImage_url(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Select Song MP3
                    <input
                        type="file"
                        accept="song_url/*"
                        onChange={(e) => setSong_url(e.target.files[0])}
                    />
                </label>
                </div>
                <button type="submit">Submit</button>
                {(songLoading)&& <p>Loading...</p>}
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default UploadSong;
