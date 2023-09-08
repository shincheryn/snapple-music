import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MySongsPage from "./components/MySongsPage";
import SongDetailsPage from "./components/SongDetailsPage";
import CreateSong from "./components/CreateSong";
import UpdateSongPage from './components/UpdateSongPage'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreatePlaylist from "./components/Playlists";
import Albums from "./components/album/index";
import AlbumDetails from "./components/album/AlbumDetails";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path='/songs/owned'>
            <MySongsPage />
          </Route>
          <Route path='/songs/newsong'>
            <CreateSong />
          </Route>
          {/* <Route path='/playlists/owned'>
            <MyPlaylists/>
          </Route>*/
          <Route path='/playlists/create'>
            <CreatePlaylist />
          </Route>}
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/songs/:id/edit'>
            <UpdateSongPage />
          </Route>
          <Route exact path='/songs/:id'>
            <SongDetailsPage />
          {/* <Route exact path='/playlists/:id'>
            <PlaylistDetails/>
          </Route> */}
          <Route path="/albums/owned">
            <Albums />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
