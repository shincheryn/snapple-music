const CREATE_SONG = 'songs/CREATE';

const createOne = spot => ({
    type: CREATE_SONG,
    spot
});


export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/images/new`, {
      method: "POST",
      body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(createOne(resPost));
    } else {
        console.log("There was an error making your post!")
    }
};

const initialState = {};

const songsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case CREATE:
            newState[action.song.id] =  action.song;
            return newState;
        default:
            return newState;
    }
}

export default songsReducer;
