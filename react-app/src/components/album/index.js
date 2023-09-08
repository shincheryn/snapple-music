import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as albumActions from "../../store/album.js";
import "./Album.css";

const Albums = () => {
  const dispatch = useDispatch();
  const allalbums = useSelector(state => Object.values(state.album));
  const user = useSelector(state => Object.values(state.session));
  useEffect(() => {
    dispatch(albumActions.loadAlbumOwnedThunk());
  }, [dispatch]);

  return (
    <div>
      {allalbums.map(album => (
        <div key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <div>
              <div>
                <img className="album-image" key={album.id} src={album.album_image_url} alt={album.album_name} title={album.album_name} />
              </div>
              <div>{album.album_name}</div>
              <div>{user[0].firstName} {user[0].lastName}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Albums
