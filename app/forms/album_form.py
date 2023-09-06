from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    album_name = StringField('Name of the album', validators=[DataRequired()])
    release_year = IntegerField('Release year', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    submit = SubmitField("Create Album")
