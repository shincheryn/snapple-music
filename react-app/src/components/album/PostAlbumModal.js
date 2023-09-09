import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as albumActions from "../../store/album";
import { useHistory } from "react-router-dom";

function PostAlbumModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [album_name, setAlbum_name] = useState("");
  const [genre, setGenre] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [description, setDescription] = useState("");
  const [album_image_url, setAlbum_image_url] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album_name", album_name);
    formData.append("genre", genre);
    formData.append("release_year", release_year);
    formData.append("description", description);
    formData.append("album_image_url", album_image_url);

    const data = await dispatch(albumActions.addAlbumThunk(formData));
    if (data) {
      setErrors(data);
    }
    history.push("/albums/owned");
  }

  return (
    <>
      <h1>Create New Album</h1>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div>
          <label>
            Album Name
            <input
              type="text"
              value={album_name}
              onChange={(e) => setAlbum_name(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Genre
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Release Year
            <input
              type="text"
              value={release_year}
              onChange={(e) => setRelease_year(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Album Image Url
            <input
              type="text"
              value={album_image_url}
              onChange={(e) => setAlbum_image_url(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default PostAlbumModal;
