import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as songsActions from '../../store/songs';

const UpdateSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const song = useSelector((state) => state.song[id]);
    const [songName, setSongName] = useState(song?.song_name ||'');
    const [genre, setGenre] = useState(song?.genre || '');
    const [image, setImage] = useState(song?.image_url || null);
    const [songMP3, setSongMP3] = useState(song?.song_url || null);
    const [songLoading, setSongLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(songsActions.getSongsDetails(id))
            .then((songdetails) =>{
                setSongName(songdetails?.song_name || '');
                setGenre(songdetails?.genre || '');
                setImage(songdetails?.image_url || null);
                setSongMP3(songdetails?.song_url || null);
            })
    }, [dispatch, id]);

    // useEffect(() => {
    //     if(song){
    //     setSongName(song?.song_name || '');
    //     setGenre(song?.genre || '');
    //     setImage(song?.image_url || null);
    //     setSongMP3(song?.song_url || null);
    //     }
    // }, [song])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
          } else {
            setErrors({});
            const formData = new FormData();
            formData.append("song_name", songName);
            formData.append("genre", genre);
            formData.append("image_url", image);
            formData.append("song_url", songMP3)
            setImageLoading(true);
            setSongLoading(true);

            dispatch(songsActions.updateSong(id, formData))
                .then((song) => {
                    history.push(`/songs/${song.id}`)
                })
                .catch((err) => {
                    setErrors(err)
                })
          }
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
                        name="song_name"
                        placeholder="Song Name"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Genre
                    <input
                        className=""
                        type='text'
                        name="genre"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Select Song Image
                    <input
                        type="file"
                        name="image_url"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                </div>
                <div>
                <label className="">
                    Select Song MP3
                    <input
                        type="file"
                        name="song_url"
                        accept="songMP3/*"
                        onChange={(e) => setSongMP3(e.target.files[0])}
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
