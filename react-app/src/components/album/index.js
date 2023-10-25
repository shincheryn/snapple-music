import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as albumActions from "../../store/album.js";
import * as songActions from "../../store/songs.js";
import DeleteAlbum from "./DeleteAlbum.js";
import EditAlbum from "./EditAlbum.js";
import OpenModalButton from "../OpenModalButton";
import "./Album.css";
import noPicture from "./no_image.jpeg";

const Albums = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const allalbums = useSelector(state => Object.values(state.album).filter(e => e.userId == user.id));
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(albumActions.loadAlbumOwnedThunk());
    dispatch(songActions.getSongs());
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, showModal]);

  const closeMenu = () => setShowModal(false);

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
      <h1 className="title">My Albums</h1>
      <div className="button-85">
        <NavLink to="/albums" style={{ color: 'white', textDecoration: 'none' }}>Create New Album</NavLink>
      </div>
      <div className="albumGrid">
        {allalbums.map(album => (
          <div key={album.id}>
            <Link to={`/albums/${album.id}`}>
              {handleAlbumImage(album)}
              {/* <img className="album-image" key={album?.id} src={album?.album_image_url} alt={album?.album_name} title={album?.album_name} /> */}
              <div className="a-details">{album?.album_name}</div>
              <div className="b-details">Genre: {album?.genre} </div>
              {/* <div>{user[0].firstName} {user[0].lastName}</div> */}
            </Link>
            <div className='button-containers'>
              <div>
                <OpenModalButton
                  buttonText="Update"
                  onItemClick={closeMenu}
                  modalComponent={<EditAlbum albumId={album.id} album_info={album} />}
                />
              </div>
              <div>
                <OpenModalButton
                  buttonText="Delete"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteAlbum albumId={album.id} />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Albums
