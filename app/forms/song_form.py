from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

#checking if user is signed in??

class SongForm (FlaskForm):
    pass
