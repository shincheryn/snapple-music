# Snapple Music

Welcome to Snapple Music! Check out our live version here: [https://snapple-music.onrender.com/](https://snapple-music.onrender.com/)

Snapple Music is based off Apple Music, which according to [Google](https://google.com), is a music, audio and video streaming service developed by Apple Inc. Users select music to stream to their device on-demand, or they can listen to existing playlists. 

The backend of Snapple Music is built using Python and Flask with a PostgreSQL database. The frontend is handled with React. 

## Screenshots (Once complete)
 - **Log in / Sign up**
 - **Homepage**
 -  **Songs**
 - **Albums**
 - **Playlists**

## Getting Started
(installation of GitHub instructions. tk)

1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## List of Technical Implementations
-   List of techs/languages/plugins/APIs used, more details on this other than the summary above.

## To Dos / Future Features
1. **Likes**
	- Users should be able to view the likes on a song.
	- Users should be able to like a song.
	- Users should be able to unlike a song.

 2. **WaveForms**
	- Users should be able to see the wave forms for a song.

3. **Search**
	- Users should be able to search for songs by artist or song name.
	- Users should be able to view the results of their search.
