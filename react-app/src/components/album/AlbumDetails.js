import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import * as albumsActions from "../../store/album.js";
import "./Album.css";
import AddAlbumSong from "./AddAlbumSong";
import DeleteAlbumSong from "./DeleteAlbumSong";
import OpenModalButton from "../OpenModalButton";
import noPicture from "./no_image.jpeg";

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


  const checkImage = (urlString) => {
    const endings = ["png", "jpg", "jpeg"];
    const array = urlString.split(".");
    if (endings.includes(array[array.length - 1])) {
      return false;
    }
    return true;
  }

  const handleAlbumImage = (album) => {
    if (checkImage(album.album_image_url)) {
      return (
        <div>
          <img className="album-image" src={noPicture} alt="noImage"></img>
        </div>
      )
    } else {
      return (
        <div>
          <img className="album-image" src={album?.album_image_url} title={album?.album_name}
            alt="link broken"
            onError={event => {
              event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
              event.onerror = null
            }}></img>
        </div>
      )
    }
  }

  return (
    <div className="pageContainersAlbum">
      <div className="">
        <OpenModalButton
          buttonText="Add Song"
          onItemClick={closeMenu}
          modalComponent={<AddAlbumSong albumId={albumId} />}
        />
      </div>
      {handleAlbumImage(currentAlbum)}
      <div className='a-details'>
        <p className='a-details'>{currentAlbum?.album_name}</p>
      </div>
      {/* <div>{user[0].firstName} {user[0].lastName}</div> */}
      <div className='c-details'>
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
