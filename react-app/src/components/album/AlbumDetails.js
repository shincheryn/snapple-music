import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as albumsActions from "../../store/album.js";
import "./Album.css";

const AlbumDetails = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const album = useSelector(state => Object.values(state.album));
  const currentAlbum = album[0];
  const user = useSelector(state => Object.values(state.session));

  useEffect(() => {
    dispatch(
      albumsActions.loadAlbumByIdThunk(albumId)
    )
  }, [dispatch, albumId])

  return (
    <>
      <div>
        <img className="album-image" key={currentAlbum.id} src={currentAlbum.album_image_url} alt={currentAlbum.album_name} title={currentAlbum.album_name} />
      </div>
      <div>
        {currentAlbum.album_name}
      </div>
      <div>{user[0].firstName} {user[0].lastName}</div>
      <div>
        Genre: {currentAlbum.genre}
      </div>
      <div>
        Description: {currentAlbum.description}
      </div>
      <div>
        Release Year: {currentAlbum.release_year}
      </div>
      
    </>
  )
}

export default AlbumDetails
