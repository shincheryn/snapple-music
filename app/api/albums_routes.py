from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album, Song, album_songs
from app.forms import AlbumForm
from flask_login import current_user, login_required
from sqlalchemy import and_
from app.api.helper import upload_file_to_s3, get_unique_filename

albums_routes = Blueprint('albums', __name__)


# Get All Albums Owned by Current User
@albums_routes.route('/owned', methods=["GET"])
@login_required
def albumsOwned():
    current_user_id = current_user.get_id()
    owned = Album.query.filter(Album.userId == current_user_id)
    return jsonify({'Albums': [each.to_dict() for each in owned]})


# Get Details of an Album from Id
@albums_routes.route('/<int:id>', methods=["GET"])
@login_required
def albumDetails(id):
    album_Details = Album.query.get(id)
    if album_Details is None:
        return {'errors': ["Album couldn't be found"]}, 404

    song_info = album_Details.songs

    ret = {
        'id': album_Details.id,
        'album_name': album_Details.album_name,
        'userId': album_Details.userId,
        'genre': album_Details.genre,
        'description': album_Details.description,
        'album_image_url':album_Details.album_image_url,
        'release_year': album_Details.release_year,
        'createdAt': album_Details.createdAt,
        'updatedAt': album_Details.updatedAt,
        'Songs': [each.to_dict() for each in song_info]
    }

    return ret


# Create an Album
@albums_routes.route('/', methods=['POST'])
# @login_required
def createAlbum():
    form = AlbumForm()
    current_user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_file = form.album_image_url.data
        image_filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file, image_filename)
        if "url" not in upload:
            return {'errors': 'Failed to upload'}

        url_image = upload["url"]

        new = Album(
            album_name=form.data['album_name'],
            release_year=form.data['release_year'],
            genre=form.data['genre'],
            description=form.data['description'],
            album_image_url=url_image,
            userId=current_user_id
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()

    return {'errors': [form.errors]}, 401


# Delete an Album
@albums_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteAlbum(id):
    album_Delete = Album.query.get(id)
    if album_Delete is None:
        return {'errors': ["Album couldn't be found"]}, 404
    db.session.delete(album_Delete)
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200


# Add Songs to an Album User Created based on the Album's id
@albums_routes.route('/<int:albumId>/songs/<int:songId>', methods=["POST"])
@login_required
def albumAddSong(albumId, songId):
    album_ID = Album.query.get(albumId)
    song_ID = Song.query.get(songId)

    if album_ID is None:
        return {'errors': ["Album couldn't be found"]}, 404
    if song_ID is None:
        return {'errors': ["Song couldn't be found"]}, 404

    new_song = album_songs.insert().values(
        albumId=albumId, songId=songId
    )
    db.session.execute(new_song)
    db.session.commit()

    album_Details = Album.query.get(albumId)
    if album_Details is None:
        return {'errors': ["Album couldn't be found"]}, 404

    song_info = album_Details.songs

    ret = {
        'id': album_Details.id,
        'album_name': album_Details.album_name,
        'userId': album_Details.userId,
        'genre': album_Details.genre,
        'album_image_url': album_Details.album_image_url,
        'description': album_Details.description,
        'createdAt': album_Details.createdAt,
        'updatedAt': album_Details.updatedAt,
        'Songs': [each.to_dict() for each in song_info]
    }

    return ret


# Remove Songs from an Album User Created based on the Album's id
@albums_routes.route('/<int:albumId>/songs/<int:songId>', methods=["DELETE"])
@login_required
def deleteSongFromAlbum(albumId, songId):
    album_ID = Album.query.get(albumId)
    song_ID = Song.query.get(songId)

    if album_ID is None:
        return {'errors': ["Album couldn't be found"]}, 404
    if song_ID is None:
        return {'errors': ["Song couldn't be found"]}, 404

    db.session.query(album_songs).filter(and_(album_songs.c.albumId == albumId, album_songs.c.songId == songId)).delete()
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200
