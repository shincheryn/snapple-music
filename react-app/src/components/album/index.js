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
    <div>
      <div>
        <NavLink to="/albums" style={{ color: 'black', textDecoration: 'none' }}>Create a new album</NavLink>
      </div>
      <div>
        {allalbums.map(album => (
          <div key={album.id}>
            <div>
              <Link to={`/albums/${album.id}`}>
                <div>
                  <img className="album-image" key={album?.id} src={album?.album_image_url} alt={album?.album_name} title={album?.album_name} />
                </div>
                <div>{album?.album_name}</div>
                <div>{user[0].firstName} {user[0].lastName}</div>
              </Link>
            </div>
            <div>
              <OpenModalButton
                buttonText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteAlbum albumId={album.id}/>}
              />
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Albums
