from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, re
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS
from wtforms.validators import Optional
from app.models import Song
import os

class SongForm (FlaskForm):
    song_name = StringField('Song', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_url = FileField('Song File', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
