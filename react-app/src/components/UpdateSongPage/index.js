import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as songsActions from '../../store/songs';

const UpdateSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const song = useSelector((state) => state.song[id]);
    const [song_name, setSong_Name] = useState(song?.song_name || '');
    const [genre, setGenre] = useState(song?.genre || '');
    const [image_url, setImage_url] = useState(song?.image_url || '');
    const [song_url, setSong_url] = useState(song?.song_url || '');
    const [songLoading, setSongLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(songsActions.getSongsDetails(id))
    },[dispatch, id])

    useEffect(() => {
        if (song){
            setSong_Name(song?.song_name || '');
            setGenre(song?.genre || '');
            setImage_url(song?.image_url || '');
            setSong_url(song?.song_url || '');
        }
    }, [song])

    const songConverter = (e) => {
        const file = e.target.value;
        if (file) {
            setSong_url(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!song) {
            return <div>No song</div>
        }

        const formData = new FormData();
        formData.append("song_name", song_name);
        formData.append("genre", genre);
        formData.append("image_url", image_url);
        formData.append("song_url", song_url)

        // formData = {song_name, genre, image_url, song_url}

        const songInfo = { song_name, genre, image_url, song_url}
        // const songInfo = {song_name, genre}
        console.log('!!!!!songInfo', songInfo)
        dispatch(songsActions.updateSong(id, songInfo));
            history.push(`/songs/${id}`)


        // try {
        //      dispatch(songsActions.updateSong(id, songInfo));
        //          history.push(`/songs/${id}`);
        // }
        // catch (err){
        //     console.error("Error creating song:", err);
        //     setImageLoading(false);
        //     setSongLoading(false);
        // }
    }

    return (
        <>
            <h1>Update Song</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                <label className="">
                    Song Name
                    <input
                        className=""
                        type='text'
                        placeholder="Song Name"
                        value={song_name}
                        onChange={(e) => setSong_Name(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Genre
                    <input
                        className=""
                        type='text'
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Existing Image File
                    <input
                        className=""
                        type='text'
                        placeholder="image url"
                        value={image_url}
                        onChange={(e) => setImage_url(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Update Image File
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage_url(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Existing Song File
                    <input
                        className=""
                        type='text'
                        placeholder="song url"
                        value={song_url}
                        onChange={(e) => setSong_url(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Update MP3 File
                    <input
                        type="file"
                        accept="songMP3/*"
                        onChange={(e) => setSong_url(e.target.files[0])}
                    />
                </label>
                </div>
                <button type="submit">Submit</button>
                {(songLoading)&& <p>Loading...</p>}
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    );
};

export default UpdateSong;
