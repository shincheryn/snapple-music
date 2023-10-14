import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import * as albumsActions from "../../store/album.js";
import "./Album.css";
import AddAlbumSong from "./AddAlbumSong";
import DeleteAlbumSong from "./DeleteAlbumSong";
import OpenModalButton from "../OpenModalButton";

const AlbumDetails = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false);

  const album = useSelector(state => Object.values(state.album));
  let currentAlbumId = 0;
  for (let i = 0; i < album.length; i++) {
    if (album[i].id == albumId) {
      currentAlbumId = i;
      break;
    }
  }
  const currentAlbum = album[currentAlbumId];
  const user = useSelector(state => Object.values(state.session));

  const closeMenu = () => setShowModal(false);

  useEffect(() => {
    dispatch(
      albumsActions.loadAlbumByIdThunk(albumId)
    )
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, albumId, showModal])


  return (
    <div className="pageContainersAlbum">
      <div className="">
        <OpenModalButton
          buttonText="Add Song"
          onItemClick={closeMenu}
          modalComponent={<AddAlbumSong albumId={albumId} />}
        />
      </div>
      <div>
        <img className="album-image" key={currentAlbum?.id} src={currentAlbum?.album_image_url} alt={currentAlbum?.album_name} title={currentAlbum?.album_name} />
      </div>
      <div>
        {currentAlbum?.album_name}
      </div>
      {/* <div>{user[0].firstName} {user[0].lastName}</div> */}
      <div>
        Genre: {currentAlbum?.genre} · Release Year: {currentAlbum?.release_year}
      </div>
      <div>
        Description: {currentAlbum?.description}
      </div>
      <div>
        {currentAlbum?.Songs?.map((each, index) => (
          <div key={`${index}`}>
            <div>{`${index + 1}`} {each?.song_name}</div>
            <div className="">
              <OpenModalButton
                buttonText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteAlbumSong albumId={albumId} songId={each?.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumDetails
