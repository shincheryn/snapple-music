from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS

class PlaylistForm(FlaskForm):
    playlist_name = StringField('Playlist Name', validators=[DataRequired()])
    # playlist_image_url = StringField('Image', validators=[DataRequired()])
    playlist_image = FileField("Playlist Image File", validators=[Optional(), FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Playlist")
