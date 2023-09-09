import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as songActions from "../../store/songs.js";
import aPicture from "./a.png";
import bPicture from "./b.png";

function LandingPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(songActions.getSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => Object.values(state.song))

  return (
    <div>
      <h1>Browse</h1>
      <div className="hline"></div>
      <div>
        <div>Today's Hits</div>
        <div>Snapple Music Hits</div>
        <img src={aPicture} alt="Hits"></img>
      </div>
      <div>
        <div>Snapple Music Hits: Dominic Fike</div>
        <div>Dominic Fike</div>
        <img src={bPicture} alt="Hits"></img>
      </div>
      <div>
        <h3>You Gotta Hear </h3>
        <div>
          <img key={allSongs[0]?.id} src={allSongs[0]?.image_url} alt={allSongs[0]?.song_name} title={allSongs[0]?.song_name} />
          <div>{allSongs[0]?.song_name}</div>
          <div>Snapple Music {allSongs[0]?.genre}</div>
        </div>
        <div>
          <img key={allSongs[1]?.id} src={allSongs[1]?.image_url} alt={allSongs[1]?.song_name} title={allSongs[1]?.song_name} />
          <div>{allSongs[1]?.song_name}</div>
          <div>Snapple Music {allSongs[1]?.genre}</div>
        </div>
        <div>
          <img key={allSongs[2]?.id} src={allSongs[2]?.image_url} alt={allSongs[2]?.song_name} title={allSongs[2]?.song_name} />
          <div>{allSongs[2]?.song_name}</div>
          <div>Snapple Music {allSongs[2]?.genre}</div>
        </div>
        <div>
          <img key={allSongs[3]?.id} src={allSongs[3]?.image_url} alt={allSongs[3]?.song_name} title={allSongs[3]?.song_name} />
          <div>{allSongs[3]?.song_name}</div>
          <div>Snapple Music {allSongs[3]?.genre}</div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
