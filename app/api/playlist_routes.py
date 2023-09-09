from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms import PlaylistForm
from app.models import db, User, Playlist, Song, playlist_songs

playlist_routes = Blueprint('playlists', __name__)

#GET ALL PLAYLISTS OWNED BY CURRENT USER
@playlist_routes.route('/owned', methods=['GET'])
@login_required
def get_user_playlists_by_id():
    current_user_id = current_user.get_id()
    owned = Playlist.query.filter(Playlist.userId == current_user.id)
    return jsonify({'Playlists':[each.to_dict() for each in owned]})


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
    return playlist.to_dict()


# CREATE A PLAYLIST
@playlist_routes.route('/', methods=['POST'])
@login_required
def createPlaylist():
    form = PlaylistForm()
    current_user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new = Playlist(
            userId=current_user.id,
            playlist_name=form.data['playlist_name'],
            playlist_image_url=form.data['playlist_image_url'],
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

    # Check that requested playlist belongs to current user
    # if playlistId != current_user.id:
    #     return jsonify({'message': 'Access denied', 'statusCode': 403}), 403

    # Parse JSON data request to check for necessary information
    # data = request.get_json()

    # Check if song is already in playlist
    # if any(Song.id == song_ID for song in Playlist_Songs.songId):
    #     return jsonify({'message': 'Playlist aready has this song', 'statusCode': 403}), 403

    # if not song_ID:
        # return jsonify({'message': 'Song not found', 'statusCode': 404}), 404

    # # Add song to playlist
    # Playlist.songs.append(song)
    # db.session.commit()

    new_song = playlist_songs.insert().values(
        playlistId=playlistId, songId=songId
    )

    db.session.execute(new_song)
    db.session.commit()

    return {'message': "Successfully added song to playlist"}, 200

    # Format and return playlist with newly added song
    # playlist_data = {
    #     'id': playlist.id,
    #     'playlist_name': playlist.playlist_name,
    #     'username': current_user.username,
    #     'createdAt': playlist.createdAt,
    #     'updatedAt': playlist.updatedAt,
    #     'Songs': [
    #         {
    #             'id': song.id,
    #             'song_name': song.song_name,
    #             'username': song.username,
    #             'genre': song.genre,
    #             'createdAt': song.createdAt,
    #             'updatedAt': song.updatedAt,
    #             'image_url': song.image_url,
    #             'song_url': song.song_url
    #         }
    #     ]
    # }

    # return jsonify(playlist_data), 200


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

    # Check that requested playlist belongs to current user
    if Playlist.id != current_user.id:
        return jsonify({'message': 'Access denied', 'statusCode': 403}), 403

    db.session.query(playlist_songs).filter(playlist_songs.c.playlistId == playlistId and playlist_songs.c.songId == songId).delete()
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
