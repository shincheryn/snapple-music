from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Song

#checking if user is signed in??

class SongForm (FlaskForm):
    song_name = StringField('Song', validators=[DataRequired()])
    userId = IntegerField('User Id', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    image_url = StringField('Image', validators=[DataRequired()])
    song_url = StringField('Song URL', validators=[DataRequired()])
    submit = SubmitField('Submit')
