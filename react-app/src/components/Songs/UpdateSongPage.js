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
    const [songName, setSongName] = useState(song?.song_name || '');
    const [genre, setGenre] = useState(song?.genre || '');
    const [image, setImage] = useState(song?.image_url || null);
    const [songMP3, setSongMP3] = useState(song?.song_url || null);
    const [songLoading, setSongLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (!song) {
            dispatch(songsActions.getSongsDetails(id))
                .then((songDetail) => {
                    console.log('song detail!!', songDetail)
                    if (songDetail) {
                        setSongName(songDetail.song_name);
                        setGenre(songDetail.genre);
                        setImage(songDetail.image_url);
                        setSongMP3(songDetail.song_url);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching song details:', err);
                });
        }

    }, [dispatch, id, song]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if(!songName) errors.songName = 'Song name is required';
        if(!genre) errors.genre = 'Genre is required';

        if (image && typeof image === 'object' && image.name) {
            const allowedExtensions = ['.png', '.jpg', '.jpeg'];
            const fileExtension = image.name.toLowerCase().slice(-4);

            if (!allowedExtensions.includes(fileExtension)) {
              errors.image = 'Image file must have a valid extension: .png, .jpg, .jpeg';
            }
        }

          if (songMP3 && typeof songMP3 === 'object' && songMP3.name) {
            const allowedExtensions = ['.mp3'];
            const fileExtension = songMP3.name.toLowerCase().slice(-4);

            if (!allowedExtensions.includes(fileExtension)) {
              errors.songMP3 = 'Song file must have a valid extension: .mp3';
            }
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
          } else {
            setErrors({});
            const formData = new FormData();
            formData.append("song_name", songName);
            formData.append("genre", genre);
            formData.append("image_url", image);
            formData.append("song_url", songMP3);

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
            <div className='page-container'>
                <div className='form-create'>
                    <h1>Update Song</h1>
                    <form
                        method='PUT'
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                    >
                        <div>
                            <div className="error-message ">{errors.songName && <p className="">{errors.songName}</p>}</div>
                            <label className="label-create">
                                Song Name
                                <input
                                    className="input-create"
                                    type='text'
                                    name="song_name"
                                    placeholder="Song Name"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <div className="error-message ">{errors.genre && <p className="">{errors.genre}</p>}</div>
                            <label className="label-create">
                                Song Genre
                                <input
                                    type='text'
                                    name="genre"
                                    placeholder="Genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <div className="error-message ">{errors.image && <p className="">{errors.image}</p>}</div>
                            <label className='songimageurl'>Current Image: {song?.image_url}</label>
                            <div>{song?.image_url && <img className='image-update' src={song.image_url} alt="Current Song Image"/>}</div>
                            <label className="label-create">
                                Select Song Image
                                <input
                                    type="file"
                                    name="image_url"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>
                            {(imageLoading)&& <p>Image Loading...</p>}
                        </div>
                        <div>
                            <div className="error-message ">{errors.songMP3 && <p className="">{errors.songMP3}</p>}</div>
                            <label className='songimageurl'>Current Song: {song?.song_url}</label>
                            {song?.song_url && (
                                <audio controls>
                                    <source src={song.song_url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            <label className="label-create">
                                Select Song MP3
                                <input
                                    type="file"
                                    name="song_url"
                                    accept="audio/*"
                                    onChange={(e) => setSongMP3(e.target.files[0])}
                                />
                            </label>
                            {(songLoading)&& <p>Loading...</p>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateSong;
