import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as playlistActions from '../../store/playlist';
import './CreatePlaylist.css';

const CreatePlaylistPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const defaultPlaylistImageUrl = 'https://res.cloudinary.com/dvlsr70pm/image/upload/v1694219162/noimageplaylist.jpg';
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImageUrl, setPlaylistImageUrl] = useState(null);
  const [errors, setErrors] = useState('');
  const [imageLoading, setImageLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMess = [];

    // Error handler for empty playlist name
    if (playlistName.trim() === '') {
      // setErrors('Please add a playlist name');
      errorMess.push('Please add a playlist name')
      // return;
    }

    // Playlist URL: Check if empty, if yes, make it defaultPlaylistImageUrl
    // const imageUrlToUse = playlistImageUrl.trim() === '' ? defaultPlaylistImageUrl : playlistImageUrl;

    if (playlistImageUrl.name) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      const fileExtension = playlistImageUrl.name.split('.');
      
      if (!allowedExtensions.includes(fileExtension[fileExtension.length-1])) {
        errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
      }
    }

    setErrors(errorMess)

    if (errorMess.length === 0) {
      const formData = new FormData();
      formData.append("playlist_name", playlistName);
      formData.append("playlist_image_url", playlistImageUrl);

      setImageLoading(true);

      dispatch(playlistActions.createPlaylistThunk(formData));
      history.push("/playlists/owned");
    }
    setImageLoading(false);
  }

  return (
    <div className="create-playlist-container">
      <div className="centered-content">
        <h1 className="create-playlist-title">Create a Playlist</h1>
        <form className="create-playlist-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <ul>
            {errors.length > 0 && errors.map(el => (
              <div key={el} className="errors">{el}</div>
            ))}
          </ul>
          <div>
            <label className="create-playlist-label">
              Playlist Name
              <input
                className="create-playlist-input"
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </label>
            {(imageLoading)&& <p>Image Uploading...</p>}
            <label className="create-playlist-label">
              Playlist Image Url
              <input
                className="create-playlist-input"
                type="file"
                // placeholder="Playlist Image URL"
                // value={playlistImageUrl}
                accept="image/*"
                onChange={(e) => setPlaylistImageUrl(e.target.files[0])}
              />
            </label>
            {/* {error && <p className="create-playlist-error-message">{error}</p>} */}
          </div>
          <button className="create-playlist-submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistPage;
