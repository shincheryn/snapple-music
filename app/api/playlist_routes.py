from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms import PlaylistForm
from app.models import db, User, Playlist, Song, playlist_songs
from sqlalchemy import and_
from app.api.helper import upload_file_to_s3, get_unique_filename

playlist_routes = Blueprint('playlists', __name__)
DEFAULT_PLAYLIST_IMAGE_URL = "https://res.cloudinary.com/dvlsr70pm/image/upload/v1694219162/noimageplaylist.jpg"

#GET ALL PLAYLISTS OWNED BY CURRENT USER
@playlist_routes.route('/owned', methods=['GET'])
@login_required
def get_user_playlists_by_id():
    current_user_id = current_user.get_id()
    owned = Playlist.query.filter(Playlist.userId == current_user.id)
    playlists = []
    for playlist in owned:
        playlist_details = playlist.to_dict()
        playlist_details["songs"] = []
        for song in playlist.songs:
            playlist_details["songs"].append(song.to_dict())

        playlists.append(playlist_details)

    return jsonify({'Playlists': playlists})


#GET DETAILS OF A PLAYLIST FROM ID
@playlist_routes.route('/<int:playlistId>', methods=['GET'])
@login_required
def get_playlist_details(playlistId):
    playlist = Playlist.query.get(playlistId)

    if not playlist:
        return {'errors': ["Playlist couldn't be found"]}, 404

    # Ensure that requested playlist belongs to current user
    if playlist.userId != current_user.id:
        return {'errors': ["Access Denied"]}, 403
    playlist_details = playlist.to_dict()
    playlist_details["songs"] = []
    for song in playlist.songs:
        playlist_details["songs"].append(song.to_dict())
    return playlist_details


# CREATE A PLAYLIST
@playlist_routes.route('/', methods=['POST'])
@login_required
def createPlaylist():
    form = PlaylistForm()
    current_user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.playlist_image.data:
            image_file = form.playlist_image.data
            image_filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file, image_filename)

            if "url" not in upload:
                return {'errors': 'Failed to upload'}

            url_image = upload["url"]
        else:
            url_image = DEFAULT_PLAYLIST_IMAGE_URL


        new = Playlist(
            userId=current_user.id,
            playlist_name=form.data['playlist_name'],
            playlist_image_url=url_image,
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()

    return {'errors': [form.errors]}, 401


# ADD A SONG TO PLAYLIST BASED ON PLAYLIST ID
@playlist_routes.route('/<int:playlistId>/songs/<int:songId>', methods=['POST'])
@login_required
def add_song_to_playlist(playlistId, songId):

    # Find playlist by id (join table)
    playlist_ID = Playlist.query.get(playlistId)
    song_ID = Song.query.get(songId)

    if playlist_ID is None:
        return {'errors': ["Playlist couldn't be found"]}, 404

    if song_ID is None:
        return {'errors': ["Song couldn't be found"]}, 404

    existing_entry =  db.session.query(playlist_songs).filter_by(playlistId=playlistId, songId=songId).first()

    if existing_entry:
        return {'error': "Song is already in the playlist"}, 400

    new_song = playlist_songs.insert().values(
        playlistId=playlistId, songId=songId
    )

    db.session.execute(new_song)
    db.session.commit()

    return {'message': "Successfully added song to playlist"}, 200


# Edit a Playlist
@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_playlist(id):

    playlist_edit = Playlist.query.get(id)
    current_user_id = int(current_user.get_id())

    #error response:
    if playlist_edit is None:
        return {'message': ["Playlist couldn\'t be found"]}, 404

    if playlist_edit.userId != current_user_id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_file = form.playlist_image.data

        if image_file == None:
            url_image = ""
        else:
            image_filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file, image_filename)
            if "url" not in upload:
             return {'errors': 'Failed to upload'}

            url_image = upload["url"]
            playlist_edit.playlist_image_url=url_image

        playlist_edit.playlist_name=form.data['playlist_name']

        db.session.commit()
        return playlist_edit.to_dict()
    return {'errors': [form.errors]}, 401


# DELETE SONG FROM PLAYLIST BASED ON PLAYLIST ID
@playlist_routes.route('/<int:playlistId>/songs/<int:songId>', methods=["DELETE"])
@login_required
def delete_song_from_playlist(playlistId, songId):
    # Find playlist by id (join table)
    playlist_ID = Playlist.query.get(playlistId)
    song_ID = Song.query.get(songId)

    if playlist_ID is None:
        return {'errors': ["Playlist couldn't be found"]}, 404

    if song_ID is None:
        return {'errors': ["Song couldn't be found"]}, 404

    db.session.query(playlist_songs).filter(and_(playlist_songs.c.playlistId == playlistId, playlist_songs.c.songId == songId)).delete()
    db.session.commit()
    return {'message': "Successfully deleted"}, 200


# DELETE A PLAYLIST
@playlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist_id = Playlist.query.get(id)
    if playlist_id is None:
        return {'errors': ["Playlist couldn't be found"]}, 404
    db.session.delete(playlist_id)
    db.session.commit()
    return {'message': "Successfully deleted"}, 200
