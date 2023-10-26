import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as songsActions from '../../store/songs'
import "../CSS/CreatePage.css";

const UploadSong = () => {
    const dispatch = useDispatch();
    const history = useHistory()
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
        if(song_name.length > 30) errors.song_name = 'Song name must be less than 30 characters';

        if(!genre) errors.genre = 'Genre is required';
        if(genre.length > 20) errors.genre = 'Genre must be less than 20 characters';

        if (image_url && typeof image_url === 'object' && image_url.name) {
            const allowedExtensions = ['png', 'jpg', 'jpeg'];

            const fileExtension = image_url.name.split('.');

            if (!allowedExtensions.includes(fileExtension[fileExtension.length-1])) {
              errors.image_url = 'Image file must have a valid extension: .png, .jpg, .jpeg';
            }
          } else {
            errors.image_url = 'Image is required';
          }

          if (song_url && typeof song_url === 'object' && song_url.name) {
            const allowedExtensions = ['.mp3'];
            const fileExtension = song_url.name.toLowerCase().slice(-4);

            if (!allowedExtensions.includes(fileExtension)) {
              errors.song_url = 'Song file must have a valid extension: .mp3';
            }
          } else {
            errors.song_url = 'Song file is required';
          }

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
        <>
        <div className="page-container">
        <div className="form-create">
            <h1>Create a New Song</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                <div className="error-message">{errors.song_name && <p className="">{errors.song_name}</p>}</div>
                <label className="label-create">
                    Your Song Name
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Song Name"
                        value={song_name}
                        onChange={(e) => setSong_Name(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.genre && <p className="">{errors.genre}</p>}</div>
                <label className="label-create">
                    Song Genre
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.image_url && <p className="">{errors.image_url}</p>}</div>
                {(imageLoading)&& <p>Image Uploading...</p>}
                <label className="label-create">
                    Select Song Image
                    <input
                        className="input-create"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage_url(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.song_url && <p className="">{errors.song_url}</p>}</div>
                {(songLoading)&& <p>Song Uploading...</p>}
                <label className="label-create">
                    Select Song MP3
                    <input
                        className="input-create"
                        type="file"
                        accept="song/*"
                        onChange={(e) => setSong_url(e.target.files[0])}
                    />
                </label>
                </div>
                <div className="align-create-button">
                <button className='create-button' type="submit">Upload</button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default UploadSong;
