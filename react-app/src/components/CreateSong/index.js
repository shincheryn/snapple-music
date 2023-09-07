import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as songsActions from '../../store/songs'

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory(); // so that you can redirect after the image upload is successful
    const [songName, setSongName] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [songLoading, setSongLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("song", song)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(songsActions.createSong(formData));
        history.push("/songs");
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
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
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
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Select Song MP3
                    <input
                        type="file"
                        accept="song/*"
                        onChange={(e) => setSong(e.target.files[0])}
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
