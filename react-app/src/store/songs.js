const LOAD_SONGS = 'songs/LOAD_SONGS';
const LOAD_ONE_SONG = 'songs/LOAD_ONE_SONG';
const LOAD_USER_SONGS = 'songs/LOAD_USER_SONGS';
const UPDATE_SONG = 'songs/UPDATE_SONG';
const DELETE_SONG = 'songs/DELETE';
const CREATE_SONG = 'songs/CREATE';

const loadsongs = list => ({
    type: LOAD_SONGS,
    list
})

const loadsong = song => ({
    type: LOAD_ONE_SONG,
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

const updateOne = (song)=> ({
    type: UPDATE_SONG,
    song
});
// const updateOne = (id, songInfo)=> ({
//     type: UPDATE_SONG,
//     payload: {id, songInfo}
// });

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
export const getCurrentUsersSongs = () => async dispatch => {
    const response = await fetch('/api/songs/owned');

    if(response.ok){
        const songs = await response.json();
        dispatch(loadUserSongs(songs));
    }
}

// get a song's details
export const getSongsDetails = (id) => async dispatch => {
    const response = await fetch(`/api/songs/${id}`);

    if(response.ok){
        const song = await response.json();
        dispatch(loadsong(song));

    }
}

// create a song
// export const createSong = (post) => async (dispatch) => {
//     const response = await fetch(`/api/songs`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//     },
//       body: post
//     });

//     if (response.ok) {
//         const { resPost } = await response.json();
//         dispatch(createOne(resPost));
//     } else {
//         console.log("There was an error making your post!")
//     }
// };
export const createSong = (song) => async (dispatch) => {
    const response = await fetch('/api/songs/newsong', {
      method: "POST",
      body: song
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(createOne(resPost));
    } else {
        console.log("There was an error making your post!")
    }
};

// delete a song
export const deleteSong = (id) => async dispatch => {
    const response = await fetch(`/api/songs/${id}`, {
        method: 'DELETE'
    });

    if(response.ok){
       return dispatch(deleteOne(id));
    }
}

// update a song
export const updateSong = (id, songInfo) => async dispatch => {
    console.log('!!!!!Updating spot:!!!', songInfo);
    const response = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songInfo)
    });

    response.text().then((text) => {
        console.log('Response body:', text);
      });

    console.log('!!res!!', response)
    if(response.ok) {
        const updated = await response.json();
        console.log('!!!!updated!!!', updated)
        dispatch(updateOne(updated));
        return updated;
    }
};

// update a song
// export const updateSong = (id, formData) => async dispatch => {
//     console.log('!!!!!Updating spot:!!!', formData);
//     const response = await fetch(`/api/songs/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     });

//     // response.text().then((text) => {
//     //     console.log('Response body:', text);
//     //   });

//     // console.log('!!res!!', response)
//     if(response.ok) {
//         const updated = await response.json();
//         console.log('!!!!updated!!!', updated)
//         dispatch(updateOne(updated));
//         return updated;
//     } else {
//         console.error('Update Song Failed:', response.status, response.statusText);
//     const errorData = await response.json(); // You might have error messages in the response
//     console.error('Error Data:', errorData);
//     }
// };

const initialState = {};

const songsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_SONGS:
            const allSongs = {};
            action.list.songs.forEach((song) => {
                allSongs[song.id] = song;
            });
            return {
                ...allSongs
            }
        case LOAD_USER_SONGS:
            const user = {};
            action.songs.songs.forEach((song) => {
                user[song.id] = song;
            })
            return user;
        case LOAD_ONE_SONG:
            newState[action.song.id] = {...newState[action.song.id], ...action.song};
            return newState
        case CREATE_SONG:
            if (action.song && action.song.id) {
                newState[action.song.id] = action.song;
            }
            return newState;
        case UPDATE_SONG:
            newState[action.song.id] = action.song;
            return newState
        case DELETE_SONG:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
}

export default songsReducer;
