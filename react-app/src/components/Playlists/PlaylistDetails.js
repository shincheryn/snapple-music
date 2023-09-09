import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as playlistActions from "../../store/playlist.js";
import OpenModalButton from "../OpenModalButton";
import DeleteSongFromPlaylist from "./DeleteSongfromPlaylistModal.js";
import { useModal } from "../../context/Modal";

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openModal } = useModal();

  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetailsThunk(id));
  }, [dispatch, id]);

  const currentPlaylist = useSelector((state) =>
    state.playlist.hasOwnProperty(id) ? state.playlist[id] : {}
  );

  const user = useSelector((state) => state.session.user);

  // const openDeleteModal = (songId) => {
  //   openModal(
  //     <DeleteSongFromPlaylist playlistId={id} songId={songId} />,
  //     'Delete Song from Playlist'
  //   );
  // };

  return (
    <>
      <div>
        <img
          className="playlist-image"
          key={currentPlaylist.id}
          src={currentPlaylist.playlist_image_url}
          alt={currentPlaylist.playlist_name}
          title={currentPlaylist.playlist_name}
        />
      </div>

      <div>
        {currentPlaylist?.Songs?.map((each, index) => (
          <div key={`${index}`}>
            <div>{`${index + 1}. {each?.song_name}`}</div>
            <div>
              {user && (
                <openModal
                  buttonText="Delete Song from Playlist"
                  onItemClick={() => DeleteSongFromPlaylist(each?.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaylistDetailsPage;
