//..store/playlist.js

// Action Types
const GET_MY_PLAYLISTS = "playlists/getMyPlaylists"
const GET_PLAYLIST_DETAILS = "playlists/getPlaylistDetails"
const CREATE_PLAYLIST = "playlists/createPlaylist";
const ADD_SONGS_TO_PLAYLIST = "playlists/addSongsToPlaylist";
const DELETE_SONGS_FROM_PLAYLIST = "playlists/deleteSongsFromPlaylist"
const DELETE_PLAYLIST = "playlists/deletePlaylist"

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

export const addSongsToPlaylistAction = (addPlaylistId, newSong) => {
    return {
        type: ADD_SONGS_TO_PLAYLIST,
        payload: {addPlaylistId, newSong},
    };
};

export const deleteSongsFromPlaylistAction = (deletePlaylistId, songId) => {
    return {
        type: DELETE_SONGS_FROM_PLAYLIST,
        payload: {deletePlaylistId, songId},
    };
};

export const deletePlaylistAction = (id) => {
    return {
        type: DELETE_PLAYLIST,
        payload: id,
    };
};


// Thunks
// GET All Owned Playlists
export const getMyPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch ('api/playlists/owned');

    if(response.ok) {
        const allMyPlaylists = await response.json();
        dispatch(getMyPlaylistsAction(allMyPlaylists));
        return allMyPlaylists;
    }
};

// GET Playlist Details
export const getPlaylistDetailsThunk = () => async (dispatch) => {
    const response = await fetch ('api/playlists/<int:playlistId>');

    if (response.ok) {
        const getPlaylistDetails = await response.json();
        dispatch(getPlaylistDetailsAction(getPlaylistDetails));
        return getPlaylistDetails;
    }
};

// CREATE New Playlist
export const createPlaylistThunk = (post) => async (dispatch) => {
    const response = await fetch ('api/playlists/create', {
        method: "POST",
        body: post
    });

    if (response.ok) {
        const { createNewPlaylist } = await response.json();
        dispatch(createPlaylistAction(createNewPlaylist));
    } else {
        console.log ("Failed to create new playlist")
    }
};

// ADD Song to Playlist
export const addSongsToPlaylistThunk = (playlistId, newSong) => async (dispatch) => {
    const response = await fetch ('api/playlists/<int:playlistId>/songs/<int:songId>', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
    });

    if (response.ok) {
        const addSongsToPlaylist = await response.json();
        dispatch(addSongsToPlaylistAction(playlistId, addSongsToPlaylist));
    } else {
        console.log("Failed to add song to playlist")
    }
};

// DELETE Song from Playlist
export const deleteSongsFromPlaylistThunk = (playlistId, songId) => async (dispatch) => {
    const response = await fetch ("api/playlists/<int:playlistId>/songs/<int:songId>", {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSongsFromPlaylistAction(playlistId, songId));
        console.log("Song successfully deleted");
    } else {
        console.log ("Failed to delete song from playlist")
    }
};

// DELETE Playlist
export const deletePlaylistThunk = (id) => async (dispatch) => {
    const response = await fetch ("api/playlists/<int:id>", {
        method: "DELETE"
    });

    if (response.ok) {
        return dispatch(deletePlaylistAction(id))
    };
}


// Reducer
const initialState = {};

const playlistsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_MY_PLAYLISTS:
            const ownedPlaylists = action.payload;
            ownedPlaylists.forEach((myPlaylists) => {
                newState[myPlaylists.id] = myPlaylists;
            });
            return newState;

        case GET_PLAYLIST_DETAILS:
            const playlistDetails = action.payload;
            newState[playlistDetails.id] = playlistDetails;
            return newState;

        case CREATE_PLAYLIST:
            const newPlaylist = action.payload;
            newState[newPlaylist.id] = newPlaylist;
            return newState;

        case ADD_SONGS_TO_PLAYLIST:
            const { addPlaylistId, newSong } = action.payload;
            newState[addPlaylistId].songs.push(newSong);
            return newState;

        case DELETE_SONGS_FROM_PLAYLIST:
            const { deletePlaylistId, songId } = action.payload;
            const playlist = newState.playlists[deletePlaylistId]

            if (!playlist){
                return newState;
            }

            const updatedSongs = playlist.songs.filter((song) => song.id !== songId);
            newState.playlists[deletePlaylistId] = {
                ...playlist,
                songs: updatedSongs,
            };
            return newState;

        case DELETE_PLAYLIST:
            delete newState[action.payload];
            return newState;

    default:
        return state;
    }
};

export default playlistsReducer;
