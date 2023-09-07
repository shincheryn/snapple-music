// import { csrfFetch } from "./csrf";

const LOAD_SONG = 'songs/LOAD_SONG';
const LOAD_SONGS = 'songs/LOAD_SONGS';
const LOAD_USER_SONGS = 'songs/LOAD_USER_SONGS';
const UPDATE_SONG = 'songs/UPDATE_SONG';
const DELETE_SONG = 'songs/DELETE';
const CREATE_SONG = 'songs/CREATE';

const loadsongs = list => ({
    type: LOAD_SONGS,
    list
})

const loadsong = song => ({
    type: LOAD_SONG,
    song
})

const loadUserSongs = songs => ({
    type: LOAD_USER_SONGS,
    songs
})

const createOne = song => ({
    type: CREATE_SONG,
    song
});

const deleteOne = id => ({
    type: DELETE_SONG,
    id
});

const updateOne = song => ({
    type: UPDATE_SONG,
    song
});

// get the list of all songs thunk
export const getSongs = () => async dispatch => {
    const response = await fetch('/api/songs');

    if(response.ok) {
        const list = await response.json();
        dispatch(loadsongs(list));
        return list;
    }
}

// get all the current user's songs

// get a song's details


// create a spot
// export const createImage = (post) => async (dispatch) => {
//     const response = await fetch(`/images/new`, {
//       method: "POST",
//       body: post
//     });

//     if (response.ok) {
//         const { resPost } = await response.json();
//         dispatch(createOne(resPost));
//     } else {
//         console.log("There was an error making your post!")
//     }
// };

// delete a spot


// update a spot



const initialState = {};

const songsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_SONGS:
            const allSongs = {};
            action.list.Songs.forEach((song) => {
                allSongs[song.id] = spot;
            });
            return {
                ...allSongs
            }

        case CREATE_SONG:
            newState[action.song.id] =  action.song;
            return newState;
        default:
            return newState;
    }
}

export default songsReducer;
