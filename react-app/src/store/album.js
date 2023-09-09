import Cookies from 'js-cookie';
const LOAD_ALBUM_OWNED = "albums/owned";
const LOAD_ALBUM_BY_ID = "albums/loadSpotById";
const ADD_ALBUM = "albums/addAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";
const ADD_SONG_TO_ALBUM = "albums/addAlbum";
const DELETE_SONG_TO_ALBUM = "albums/deleteAlbum";

// async function csrfFetch(url, options = {}) {
//   // set options.method to 'GET' if there is no method
//   options.method = options.method || 'GET';
//   // set options.headers to an empty object if there is no headers
//   options.headers = options.headers || {};

//   // if the options.method is not 'GET', then set the "Content-Type" header to
//     // "application/json", and set the "XSRF-TOKEN" header to the value of the
//     // "XSRF-TOKEN" cookie
//   if (options.method.toUpperCase() !== 'GET') {
//     options.headers['Content-Type'] =
//       options.headers['Content-Type'] || 'application/json';
//     options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
//   }
//   // call the default window's fetch with the url and the options passed in
//    const res = await window.fetch(url, options);

//   // if the response status code is 400 or above, then throw an error with the
//     // error being the response
//   if (res.status >= 400) throw res;

//   // if the response status code is under 400, then return the response to the
//     // next promise chain
//   return res;
// }

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

export const deleteSongToAlbum = (albumsId) => ({
  type: DELETE_SONG_TO_ALBUM,
  payload: albumsId
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

  const res = await fetch("/api/albums/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody
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
    dispatch(deleteSongToAlbum(albumId));
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
      // delete newState[action.payload];
      return newState;
    default:
      return state
  }
};

export default albumReducer;
