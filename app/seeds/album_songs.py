from app.models import db, album_songs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_album_songs():
    album_songs_data = [
            {'albumId': 1, 'songId': 1},
            {'albumId': 1, 'songId': 2},
            {'albumId': 1, 'songId': 3},
            {'albumId': 1, 'songId': 4},
            {'albumId': 2, 'songId': 5},
            {'albumId': 2, 'songId': 6},
            {'albumId': 2, 'songId': 7},
            {'albumId': 2, 'songId': 8},
            {'albumId': 3, 'songId': 9},
            {'albumId': 3, 'songId': 10},
            {'albumId': 3, 'songId': 11},
            {'albumId': 3, 'songId': 12}
    ]
    for album_song in album_songs_data:
        db.session.add(**album_song)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_album_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_songs"))

    db.session.commit()
