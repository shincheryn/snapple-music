from flask import Blueprint, jsonify, request, redirect
from app.models import db, Song, User
from app.forms.song_form import SongForm
from flask_login import current_user, login_required, login_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.helper import upload_file_to_s3, get_unique_filename

song_routes = Blueprint('songs', __name__)


"""
Returns all the songs
"""
@song_routes.route('/', methods=['GET'])
def getAllSongs():
    songs = Song.query.all()

    song_info = []

    for song in songs:
        user_info = song.user_songs

        song_info.append({
            'id': song.id,
            'song_name': song.song_name,
            'username': user_info.username,
            'genre': song.genre,
            'image_url': song.image_url,
            'song_url': song.song_url,
            'createdAt': song.createdAt,
            'updatedAt': song.updatedAt,
        })

    return {'songs': song_info}


"""
Returns all songs owned by the current user.
"""
@song_routes.route('/owned', methods=['GET'])
@login_required
def currentUserSongs():

    currentuser_songs = Song.query.filter_by(userId = current_user.id).all()

    user_info = User.query.get(current_user.id)

    song_info = []

    for song in currentuser_songs:
        user_info = song.user_songs
        song_info.append({
                'id': song.id,
                'song_name': song.song_name,
                'username': user_info.username,
                'genre': song.genre,
                'image_url': song.image_url,
                'song_url': song.song_url,
                'createdAt': song.createdAt,
                'updatedAt': song.updatedAt,
            })


    return {'songs': song_info}


"""
Returns the details of a song specified by its id.
"""
@song_routes.route('/<int:id>', methods=['GET'])
def songId(id):

    song = Song.query.get(id)

    #error response:
    if song is None:
        return {'message': "Song couldn\'t be found", "statusCode": 404}, 404

    user_info = song.user_songs

    song_info = {
        'id': song.id,
        'song_name': song.song_name,
        'username': user_info.username,
        'genre': song.genre,
        'image_url': song.image_url,
        'song_url': song.song_url,
        'createdAt': song.createdAt,
        'updatedAt': song.updatedAt,
        'Owner': {
            'id': user_info.id,
            'firstName': user_info.firstName,
            'lastName': user_info.lastName
        }
    }

    return song_info


"""
Creates and returns a new song
"""
@song_routes.route('/newsong', methods=['POST'])
@login_required
def createSong():

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_file = form.image_url.data
        image_filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file, image_filename)

        # print(f'!!!upload {upload}') #debug

        if "url" not in upload:
            return {'errors': 'Failed to upload'}

        song_file = form.song_url.data
        song_filename = get_unique_filename(song_file.filename)
        upload_song = upload_file_to_s3(song_file, song_filename)

        if "url" not in upload_song:
            # Handle the error here
            return {'errors': 'Failed to upload'}

        url_image = upload["url"]
        url_song = upload_song["url"]

        song = Song(
            song_name=form.song_name.data,
            genre=form.genre.data,
            image_url=url_image,
            song_url=url_song,
            userId=current_user.id,
        )

        db.session.add(song)
        db.session.commit()
        return song.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': 'Invalid data received'}, 400


"""
Updates/Edit and returns an existing song.
"""
@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update(id):
    print("Trying to edit song with id", id)
    song = Song.query.get(id)

    #error response:
    if song is None:
        print(" no song")
        return {'message': "Song couldn\'t be found", "statusCode": 404}
    print("song exists")

    if song.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403
    print("User is correct")

    form = SongForm()
    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_image_file = form.image_url.data
        print("image file", new_image_file)
        if new_image_file:
            new_image_filename = get_unique_filename(new_image_file.filename)
            upload_image = upload_file_to_s3(new_image_file, new_image_filename)

            # print(f'!!!upload {upload}') #debug
            if "url" not in upload_image:
                print(" no url for upload image")
                return {'errors': 'Failed to upload'}

            song.song_url = upload_image["url"]

        new_song_file = form.song_url.data
        if new_song_file:
            new_song_filename = get_unique_filename(new_song_file.filename)
            upload_song = upload_file_to_s3(new_song_file, new_song_filename)

            if "url" not in upload_song:
                # Handle the error here
                print("no url")
                return {'errors': 'Failed to upload'}

            song.image_url = upload_song["url"]

        song.song_name=form.data["song_name"]
        song.genre=form.data["genre"]
        song.image_url = upload_image["url"]
        song.song_url = upload_song["url"]

        db.session.commit()
        return song.to_dict()

    return {"message": "Validation Error","statusCode": 400,'errors': validation_errors_to_error_messages(form.errors)}, 400


"""
Delete an existing song.
"""
@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    song = Song.query.get(id)

    #error response:
    if song is None:
        return {'message': "Song couldn\'t be found", "statusCode": 404}

    if song.userId != current_user.id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    db.session.delete(song)
    db.session.commit()

    return { "message": 'Successfully deleted', "statusCode": 200}
