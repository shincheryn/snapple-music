import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlist";
import "./UpdatePlaylist.css";

const UpdatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlist[id]);
  const [playlistName, setPlaylistName] = useState(
    playlist?.playlist_name || ""
  );
  const [image, setImage] = useState(playlist?.image_url || null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!playlist) {
      dispatch(playlistActions.getPlaylistDetailsThunk(id))
        .then((playlistDetail) => {
          if (playlistDetail) {
            setPlaylistName(playlistDetail.playlist_name);
            setImage(playlistDetail.playlist_image_url);
          }
        })
        .catch((err) => {
          console.error("Error fetching playlist details:", err);
        });
    }
  }, [dispatch, id, playlist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!playlistName) errors.playlistName = "Playlist name is required";
    if (playlistName.length > 30)
      errors.playlist_name = "Playlist name must be less than 30 characters";

    if (image && typeof image === "object" && image.name) {
      const allowedExtensions = [".png", ".jpg", ".jpeg"];
      const fileExtension = image.name.toLowerCase().slice(-4);

      if (!allowedExtensions.includes(fileExtension)) {
        errors.image =
          "Image file must have a valid extension: .png, .jpg, .jpeg";
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("playlist_name", playlistName);
      formData.append("playlist_image", image);

      dispatch(playlistActions.editPlaylistThunk(id, formData))
        .then((playlist) => {
          history.push(`/playlists/${playlist.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-create">
          <h1>Update Playlist</h1>
          <form
            method="PUT"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <div className="error-message ">
                {errors.playlistName && (
                  <p className="">{errors.playlistName}</p>
                )}
              </div>
              <label className="label-create">
                Playlist Name
                <input
                  className="input-create"
                  type="text"
                  name="playlist_name"
                  placeholder="Playlist Name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </label>
            </div>

            <div>
              <div className="error-message ">
                {errors.image && <p className="">{errors.image}</p>}
              </div>
              <div>
                {playlist?.playlist_image_url && (
                  <img
                    className="image-update"
                    src={playlist.playlist_image_url}
                    alt="Current Playlist Image"
                  />
                )}
              </div>
              <label className="label-create">
                Select Playlist Image
                <input
                  type="file"
                  name="image_url"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              {image?.name && <label>Selected Image: {image.name} </label>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePlaylist;
