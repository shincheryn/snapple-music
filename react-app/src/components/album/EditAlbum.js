import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../store/album";

function EditAlbum({ albumId, album_info }) {
  const dispatch = useDispatch();
  const [album_name, setAlbum_name] = useState(album_info.album_name);
  const [genre, setGenre] = useState(album_info.genre);
  const [release_year, setRelease_year] = useState(album_info.release_year);
  const [description, setDescription] = useState(album_info.description);
  const [album_image_url, setAlbum_image_url] = useState(album_info.album_image_url);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("######", album_image_url)

    let errorMess = [];

    if ((isNaN(release_year) && isNaN(parseFloat(release_year))) || (release_year.toString().length !== 4)) {
      errorMess.push('Release year must be a 4 digit number')
    }

    if (description.length > 200) {
      errorMess.push('description length must less than 200 characters')
    }

    if (album_image_url !== '') {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      let fileExtension

      if(album_image_url.name) {
        fileExtension = album_image_url.name.split('.');
      } else {
        fileExtension = album_image_url.split('.');
      }

      if (!allowedExtensions.includes(fileExtension[fileExtension.length - 1])) {
        errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
      }

    }
    setErrors(errorMess)

    if (errorMess.length === 0) {
      const updatedAlbum = new FormData();
      updatedAlbum.append("album_name", album_name);
      updatedAlbum.append("genre", genre);
      updatedAlbum.append("release_year", release_year);
      updatedAlbum.append("description", description);
      updatedAlbum.append("album_image_url", album_image_url);
      await dispatch(albumActions.editAlbumThunk(albumId, updatedAlbum));
      closeModal()
    }
  };

  return (
    <div className="form-create">
      <h1>Update Album</h1>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ul>
          {errors.length > 0 && errors.map(el => (
            <div key={el} className="errors">{el}</div>
          ))}
        </ul>
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
            <p>Album Image Url (optional)</p>
            <p>URL must ends in .png, .jpg or .jpeg</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAlbum_image_url(e.target.files[0])}
            />
            {album_image_url.name ? album_image_url.name : album_image_url}
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
};

export default EditAlbum;
