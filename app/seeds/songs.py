from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_songs():
    songs_data = [
            {'song_name': 'Song 1', 'userId': 1, 'genre': 'Pop', 'image_url': 'url1', 'song_url': 'url1'},
            {'song_name': 'Song 2', 'userId': 1, 'genre': 'Rock', 'image_url': 'url2', 'song_url': 'url2'},
            {'song_name': 'Song 3', 'userId': 1, 'genre': 'Country', 'image_url': 'url3', 'song_url': 'url3'},
            {'song_name': 'Song 4', 'userId': 1, 'genre': 'Hip hop', 'image_url': 'url4', 'song_url': 'url4'},
            {'song_name': 'Song 5', 'userId': 2, 'genre': 'R&B', 'image_url': 'url5', 'song_url': 'url5'},
            {'song_name': 'Song 6', 'userId': 2, 'genre': 'Electronic', 'image_url': 'url6', 'song_url': 'url6'},
            {'song_name': 'Song 7', 'userId': 2, 'genre': 'Metal', 'image_url': 'url7', 'song_url': 'url7'},
            {'song_name': 'Song 8', 'userId': 2, 'genre': 'Funk', 'image_url': 'url8', 'song_url': 'url8'},
            {'song_name': 'Song 9', 'userId': 3, 'genre': 'K-pop', 'image_url': 'url9', 'song_url': 'url9'},
            {'song_name': 'Song 10', 'userId': 3, 'genre': 'Alternative rock', 'image_url': 'url10', 'song_url': 'url10'},
            {'song_name': 'Song 11', 'userId': 3, 'genre': 'Synth-pop', 'image_url': 'url11', 'song_url': 'url11'},
            {'song_name': 'Song 12', 'userId': 3, 'genre': 'Pop rock', 'image_url': 'url12', 'song_url': 'url12'}
        ]
    for song in songs_data:
        db.session.add(**song)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
