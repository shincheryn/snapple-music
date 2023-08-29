from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    albums_data = [
            {'album_name': 'Song 1', 'userId': 1, 'genre': 'Pop', 'release_year': 1990, 'description': 'description1'},
            {'album_name': 'Song 2', 'userId': 1, 'genre': 'Rock', 'release_year': 1991, 'description': 'description2'},
            {'album_name': 'Song 3', 'userId': 1, 'genre': 'Country', 'release_year': 1992, 'description': 'description3'},
            {'album_name': 'Song 4', 'userId': 1, 'genre': 'Hip hop', 'release_year': 1993, 'description': 'description4'},
            {'album_name': 'Song 5', 'userId': 2, 'genre': 'R&B', 'release_year': 1994, 'description': 'description5'},
            {'album_name': 'Song 6', 'userId': 2, 'genre': 'Electronic', 'release_year': 1995, 'description': 'description6'},
            {'album_name': 'Song 7', 'userId': 2, 'genre': 'Metal', 'release_year': 1996, 'description': 'description7'},
            {'album_name': 'Song 8', 'userId': 2, 'genre': 'Funk', 'release_year': 1997, 'description': 'description8'},
            {'album_name': 'Song 9', 'userId': 3, 'genre': 'K-pop', 'release_year': 1998, 'description': 'description9'},
            {'album_name': 'Song 10', 'userId': 3, 'genre': 'Alternative rock', 'release_year': 1999, 'description': 'description10'},
            {'album_name': 'Song 11', 'userId': 3, 'genre': 'Synth-pop', 'release_year': 2000, 'description': 'description11'},
            {'album_name': 'Song 12', 'userId': 3, 'genre': 'Pop rock', 'release_year': 2023, 'description': 'description12'}
        ]
    for album in albums_data:
        db.session.add(**album)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
