const LOAD_ALBUM_OWNED = "albums/owned";
const LOAD_ALBUM_BY_ID = "albums/loadSpotById";
const ADD_ALBUM = "albums/addAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";
const ADD_SONG_TO_ALBUM = "albums/addAlbumSong";
const DELETE_SONG_TO_ALBUM = "albums/deleteAlbumSong";

export const loadAlbumOwned = (albums) => ({
  type: LOAD_ALBUM_OWNED,
  payload: albums
});

export const loadAlbumById = (album) => ({
  type: LOAD_ALBUM_BY_ID,
  payload: album
});

export const addAlbum = (album) => ({
  type: ADD_ALBUM,
  payload: album
});

export const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  payload: albumId
});

export const addSongToAlbum = (album) => ({
  type: ADD_SONG_TO_ALBUM,
  payload: album
});

export const deleteSongToAlbum = (albumsId, songId) => ({
  type: DELETE_SONG_TO_ALBUM,
  payload: [albumsId, songId]
});


//thunk
export const loadAlbumOwnedThunk = () => async (dispatch) => {
  const res = await fetch("/api/albums/owned");
  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAlbumOwned(albums));
    return albums;
  }
};

export const loadAlbumByIdThunk = (albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}`);

  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAlbumById(albums));
    return albums;
  }
}

export const addAlbumThunk = (newAlbum) => async (dispatch) => {

  const res = await fetch("/api/albums/", {
    method: "POST",
    body: newAlbum
  });

  if (res.ok) {
    const album = await res.json();
    dispatch(addAlbum(album));
    return album;
  }
};

export const deletelbumAThunk = (albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteAlbum(albumId));
  }
};

export const addSongToAlbumThunk = (albumId, songId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {}
  });

  if (res.ok) {
    const ret = await res.json();
    dispatch(addSongToAlbum(ret));
    return ret;
  }
};

export const deleteSongToAlbumThunk = (albumId, songId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(deleteSongToAlbum(albumId, songId));
  }
};

const funDeleteSong = (state, albumId, songId) => {
  let songs = state[albumId.toString()].Songs
  let currentSongId = 0;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id == songId) {
      currentSongId = i;
      break;
    }
  }
  delete state[albumId].Songs[currentSongId.toString()]
  return state
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_ALBUM_OWNED:
      action.payload.Albums.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_ALBUM_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_ALBUM:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ALBUM:
      delete newState[action.payload];
      return newState;
    case ADD_SONG_TO_ALBUM:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SONG_TO_ALBUM:
      return funDeleteSong(newState, action.payload[0], action.payload[1])
    default:
      return newState
  }
};

export default albumReducer;
