import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as albumActions from "../../store/album.js";
import * as songActions from "../../store/songs.js";
import DeleteAlbum from "./DeleteAlbum.js";
import OpenModalButton from "../OpenModalButton";
import "./Album.css";

const Albums = () => {
  const dispatch = useDispatch();
  const allalbums = useSelector(state => Object.values(state.album));
  const user = useSelector(state => Object.values(state.session));
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

  return (
    <div className="pageContainersAlbum">
      <div className="button-85">
        <NavLink to="/albums" style={{ color: 'white', textDecoration: 'none' }}>Create New Album</NavLink>
      </div>
      <div className="albumGrid">
        {allalbums.map(album => (
          <div key={album.id}>
            <Link to={`/albums/${album.id}`}>
              <img className="album-image" key={album?.id} src={album?.album_image_url} alt={album?.album_name} title={album?.album_name} />
              <div>{album?.album_name}</div>
              <div>Genre: {album?.genre} </div>
              {/* <div>{user[0].firstName} {user[0].lastName}</div> */}
            </Link>
            <div className="button-85x">
              <OpenModalButton
                buttonText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteAlbum albumId={album.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Albums
