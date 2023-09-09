import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
// import 'react-h5-audio-player/lib/styles.less' //Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS



const Player = ({song_url}) => {

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log('song_url:', song_url);
  }, [song_url]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
       <AudioPlayer
    autoPlay
    // src={process.env.PUBLIC_URL + '/Test1.mp3'}
    src={song_url}
    // onPlay={e => console.log("onPlay")}
    // onPlay={() => setIsPlaying(true)}
    onPlay={() => {
      setIsPlaying(true);
      console.log('Audio is playing.');
    }}
    onPause={() => setIsPlaying(false)}
  />
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"} {/* Play/Pause button */}
      </button>
    </div>


)
}

export default Player;
