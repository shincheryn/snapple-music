import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MySongsPage from "./components/Songs/MySongsPage";
import SongDetails from "./components/Songs/SongDetailsPage";
import CreateSong from "./components/Songs/CreateSong";
import UpdateSong from './components/Songs/UpdateSongPage';
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MyPlaylistsPage from "./components/Playlists/index";
import CreatePlaylistPage from "./components/Playlists/CreatePlaylist";
import PlaylistDetailsPage from "./components/Playlists/PlaylistDetails"
import Albums from "./components/album/index";
import AlbumDetails from "./components/album/AlbumDetails";
import PostAlbumModal from "./components/album/PostAlbumModal";


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
          <Route path='/playlists/owned'>
            <MyPlaylistsPage />
          </Route>
          <Route path='/playlists/new'>
            <CreatePlaylistPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/songs/:id/edit'>
            <UpdateSong />
          </Route>
          <Route exact path='/songs/:id'>
            <SongDetails />
          </Route>
          <Route exact path='/playlists/:id'>
            <PlaylistDetailsPage />
          </Route>
          <Route path="/albums/owned">
            <Albums />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetails />
          </Route>
          <Route path="/albums/">
            <PostAlbumModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
