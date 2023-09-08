const LOAD_ALBUM_OWNED = "albums/owned";
const LOAD_ALBUM_BY_ID = "albums/loadSpotById";
const ADD_ALBUM = "albums/addAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";
const ADD_SONG_TO_ALBUM = "albums/addAlbum";
const DELETE_SONG_TO_ALBUM = "albums/deleteAlbum";

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

export const addSongToAlbum = (albumsId, songId) => ({
  type: ADD_SONG_TO_ALBUM,
  payload: { albumsId, songId }
});

export const deleteSongToAlbum = (albumsId, songId) => ({
  type: DELETE_SONG_TO_ALBUM,
  payload: { albumsId, songId }
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
  const reqBody = JSON.stringify(newAlbum);

  const res = await fetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
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
    dispatch(addSongToAlbum(albumId, songId));
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
      delete newState[action.payload];
      return newState;
    default:
      return state
  }
};

export default albumReducer;
