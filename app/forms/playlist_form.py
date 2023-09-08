from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    playlist_name = StringField('Playlist Name', validators=[DataRequired()])
    playlist_image_url = StringField('Image', validators=[DataRequired()])
    submit = SubmitField("Create Playlist")
