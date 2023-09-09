from app.models import db, playlist_songs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    ps1 = playlist_songs.insert().values(
        playlistId= 1, songId=1
    )
    ps2 = playlist_songs.insert().values(
        playlistId= 1, songId=2
    )
    ps3 = playlist_songs.insert().values(
        playlistId= 1, songId=3
    )
    ps4 = playlist_songs.insert().values(
        playlistId= 1, songId=4
    )
    ps5 = playlist_songs.insert().values(
        playlistId= 2, songId=5
    )
    ps6 = playlist_songs.insert().values(
        playlistId= 2, songId=6
    )
    ps7 = playlist_songs.insert().values(
        playlistId= 2, songId=7
    )
    ps8 = playlist_songs.insert().values(
        playlistId= 2, songId=8
    )
    ps9 = playlist_songs.insert().values(
        playlistId= 3, songId=9
    )
    ps10 = playlist_songs.insert().values(
        playlistId= 3, songId=10
    )
    ps11 = playlist_songs.insert().values(
        playlistId= 3, songId=11
    )
    ps12 = playlist_songs.insert().values(
        playlistId= 3, songId=12
    )
    db.session.execute(ps1)
    db.session.execute(ps2)
    db.session.execute(ps3)
    db.session.execute(ps4)
    db.session.execute(ps5)
    db.session.execute(ps6)
    db.session.execute(ps7)
    db.session.execute(ps8)
    db.session.execute(ps9)
    db.session.execute(ps10)
    db.session.execute(ps11)
    db.session.execute(ps12)
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
