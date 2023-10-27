import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import MySongsPage from "./components/Songs/MySongsPage";
import SongDetails from "./components/Songs/SongDetailsPage";
import CreateSong from "./components/Songs/CreateSong";
import UpdateSong from "./components/Songs/UpdateSongPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import MyPlaylistsPage from "./components/Playlists/index";
import CreatePlaylistPage from "./components/Playlists/CreatePlaylist";
import PlaylistDetailsPage from "./components/Playlists/PlaylistDetails";
import Albums from "./components/album/index";
import AlbumDetails from "./components/album/AlbumDetails";
import PostAlbumModal from "./components/album/PostAlbumModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <ProtectedRoute path="/songs/owned">
            <MySongsPage />
          </ProtectedRoute>
          <Route path="/songs/newsong">
            <CreateSong />
          </Route>
          <ProtectedRoute path="/playlists/owned">
            <MyPlaylistsPage />
          </ProtectedRoute>
          <Route path="/playlists/new">
            <CreatePlaylistPage />
          </Route>
          <Route path="/songs/:id/edit">
            <UpdateSong />
          </Route>
          <Route exact path="/songs/:id">
            <SongDetails />
          </Route>
          <Route exact path="/playlists/:id">
            <PlaylistDetailsPage />
          </Route>
          <ProtectedRoute path="/albums/owned">
            <Albums />
          </ProtectedRoute>
          <Route path="/albums/:albumId">
            <AlbumDetails />
          </Route>
          <Route path="/albums/">
            <PostAlbumModal />
          </Route>
        </Switch>
      )}
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
