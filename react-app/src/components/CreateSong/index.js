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

        const errors = {};

        if(!song_name) errors.song_name = 'Song name is required';
        if(!genre) errors.genre = 'Genre is required';
        if(!image_url) errors.image_url = 'Image is required';
        if(!song_url) errors.song_url = 'Song MP3 is required';

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
        const formData = new FormData();
        formData.append("song_name", song_name);
        formData.append("genre", genre);
        formData.append("image_url", image_url);
        formData.append("song_url", song_url)

        setImageLoading(true);
        setSongLoading(true);

        try {
            await dispatch(songsActions.createSong(formData));
            history.push("/songs/owned");
        } catch (err){
            setErrors({});
            console.error("Error creating song:", err);
            setImageLoading(false);
            setSongLoading(false);
        }
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
                <div className="">{errors.song_name && <p className="">{errors.song_name}</p>}</div>
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
                <div className="">{errors.genre && <p className="">{errors.genre}</p>}</div>
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
                <div className="">{errors.image_url && <p className="">{errors.image_url}</p>}</div>
                {(imageLoading)&& <p>Image Uploading...</p>}
                <label className="">
                    Select Song Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage_url(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <div className="">{errors.song_url && <p className="">{errors.song_url}</p>}</div>
                {(songLoading)&& <p>Song Uploading...</p>}
                <label className="">
                    Select Song MP3
                    <input
                        type="file"
                        accept="song/*"
                        onChange={(e) => setSong_url(e.target.files[0])}
                    />
                </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UploadSong;
