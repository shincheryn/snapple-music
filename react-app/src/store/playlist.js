// Action Types
const GET_MY_PLAYLISTS = "playlists/getMyPlaylists";
const GET_PLAYLIST_DETAILS = "playlists/getPlaylistDetails";
const CREATE_PLAYLIST = "playlists/createPlaylist";
const ADD_SONGS_TO_PLAYLIST = "playlists/addSongsToPlaylist";
const DELETE_SONGS_FROM_PLAYLIST = "playlists/deleteSongsFromPlaylist";
const DELETE_PLAYLIST = "playlists/deletePlaylist";

// Action Creators
export const getMyPlaylistsAction = (myPlaylists) => {
  return {
    type: GET_MY_PLAYLISTS,
    payload: myPlaylists,
  };
};

export const getPlaylistDetailsAction = (playlistId) => {
  return {
    type: GET_PLAYLIST_DETAILS,
    payload: playlistId,
  };
};

export const createPlaylistAction = (newPlaylist) => {
  return {
    type: CREATE_PLAYLIST,
    payload: newPlaylist,
  };
};

export const addSongsToPlaylistAction = (playlistId, songId) => {
  return {
    type: ADD_SONGS_TO_PLAYLIST,
    payload: { playlistId, songId },
  };
};

export const deleteSongsFromPlaylistAction = (playlistId, songId) => {
  return {
    type: DELETE_SONGS_FROM_PLAYLIST,
    payload: { playlistId, songId },
  };
};

export const deletePlaylistAction = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    payload: playlistId,
  };
};

// Thunks
// GET All Owned Playlists
export const getMyPlaylistsThunk = () => async (dispatch) => {
  const response = await fetch("/api/playlists/owned");

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getMyPlaylistsAction(playlists));
    return playlists;
  }
};

// GET Playlist Details
export const getPlaylistDetailsThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`);

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylistDetailsAction(playlists));
    return playlists;
  }
};

// CREATE New Playlist
export const createPlaylistThunk = (newPlaylist) => async (dispatch) => {
  const post = JSON.stringify(newPlaylist)

  const response = await fetch(`/api/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: post,
  });

  if (response.ok) {
    const createNewPlaylist = await response.json();
    dispatch(createPlaylistAction(createNewPlaylist));
  } else {
    console.log("Failed to create new playlist");
  }
};

// ADD Song to Playlist
export const addSongsToPlaylistThunk = (playlistId, songId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {},
      }
    );

    if (response.ok) {
      const addSongsToPlaylist = await response.json();
      dispatch(addSongsToPlaylistAction(playlistId, songId));
      return addSongsToPlaylist
    }
  };

// DELETE Song from Playlist
export const deleteSongsFromPlaylistThunk = (playlistId, songId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: "DELETE",
      }
    );

    if (response.ok) {
      dispatch(deleteSongsFromPlaylistAction(playlistId, songId));
      console.log("Song successfully deleted");
    } else {
      console.log("Failed to delete song from playlist");
    }
  };

// DELETE Playlist
export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return dispatch(deletePlaylistAction(playlistId));
  }
};

// Reducer
const initialState = {};

const playlistsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_MY_PLAYLISTS:
      action.payload.Playlists.forEach((each) => {
        newState[each.id] = each;
      });
      return newState;
    case GET_PLAYLIST_DETAILS:
      newState[action.payload.id] = action.payload;
      return newState;
    case CREATE_PLAYLIST:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_SONGS_TO_PLAYLIST:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SONGS_FROM_PLAYLIST:
      delete newState[action.payload];
      return newState;
    case DELETE_PLAYLIST:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default playlistsReducer;
