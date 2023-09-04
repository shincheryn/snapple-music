from app.models import db, playlist_songs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    playlist_songs_data = [
            {'playlistId': 1, 'songId': 1},
            {'playlistId': 1, 'songId': 2},
            {'playlistId': 1, 'songId': 3},
            {'playlistId': 2, 'songId': 4},
            {'playlistId': 2, 'songId': 5},
            {'playlistId': 2, 'songId': 6},
            {'playlistId': 5, 'songId': 7},
            {'playlistId': 6, 'songId': 8},
            {'playlistId': 3, 'songId': 9},
            {'playlistId': 3, 'songId': 10},
            {'playlistId': 3, 'songId': 11},
            {'playlistId': 4, 'songId': 12}
    ]
    for playlist_song in playlist_songs_data:
        db.session.add(**playlist_song)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
