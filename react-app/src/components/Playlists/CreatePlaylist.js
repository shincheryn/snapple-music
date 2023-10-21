import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as playlistActions from "../../store/playlist";
import "../CSS/CreatePage.css";

const CreatePlaylistPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState(null);
  const [errors, setErrors] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMess = [];

    // Error handler for empty playlist name
    if (playlistName.trim() === "") {
      // setErrors('Please add a playlist name');
      errorMess.push("Please add a playlist name");
      // return;
    }

    setErrors(errorMess);

    if (errorMess.length === 0) {
      const formData = new FormData();
      formData.append("playlist_name", playlistName);
      formData.append("playlist_image", playlistImage);

      setImageLoading(true);

      dispatch(playlistActions.createPlaylistThunk(formData));
      history.push("/playlists/owned");
    }
    setImageLoading(false);
  };

  return (
    <div className="page-container">
      <div className="form-create">
        <h1>Create a New Playlist</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <ul>
            {errors.length > 0 &&
              errors.map((el) => (
                <div key={el} className="error-message">
                  {el}
                </div>
              ))}
          </ul>
          <div>
            <label className="label-create">
              Playlist Name
              <input
                className="input-create"
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </label>
            {imageLoading && <p>Image Uploading...</p>}
            <label className="label-create">
              Playlist Image Url
              <input
                className="input-create"
                type="file"
                accept="image/*"
                onChange={(e) => setPlaylistImage(e.target.files[0])}
              />
            </label>
          </div>
          <div className="align-create-button">
          <button className="create-button" type="submit">
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
