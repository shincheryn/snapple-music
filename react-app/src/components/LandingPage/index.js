import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <NavLink to='/'>Browse</NavLink>
      <NavLink to='/songs/owned'>My Songs</NavLink>
      <NavLink to='/albums/owned'>My Albums</NavLink>
      <NavLink to='/playlists/owned'>My Playlists</NavLink>
    </div>
  )
}

export default LandingPage;
