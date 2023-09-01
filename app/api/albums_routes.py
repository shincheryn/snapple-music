from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album
from app.forms import AlbumForm
from flask_login import current_user, login_required

albums_routes = Blueprint('albums', __name__)

# Get All Albums Owned by Current User
@albums_routes.route('/owned', methods=["GET"])
# @login_required
def albumsOwned():
  albums_owned=[]
  current_user_id = current_user.get_id()
  owned = Album.query.all()
  # filter(Album.userId == current_user_id)
  print(owned)
  return jsonify({'Albums': albums_owned})
