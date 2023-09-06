from app.models import db, album_songs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_album_songs():
    # album_songs_data = [
    #         {'albumId': 1, 'songId': 1},
    #         {'albumId': 1, 'songId': 2},
    #         {'albumId': 1, 'songId': 3},
    #         {'albumId': 1, 'songId': 4},
    #         {'albumId': 2, 'songId': 5},
    #         {'albumId': 2, 'songId': 6},
    #         {'albumId': 2, 'songId': 7},
    #         {'albumId': 2, 'songId': 8},
    #         {'albumId': 3, 'songId': 9},
    #         {'albumId': 3, 'songId': 10},
    #         {'albumId': 3, 'songId': 11},
    #         {'albumId': 3, 'songId': 12}
    # ]
    # for album_song in album_songs_data:
    #     db.session.add(*album_song)
    as1 = album_songs.insert().values(
        albumId= 1, songId=1
    )
    as2 = album_songs.insert().values(
        albumId= 1, songId=2
    )
    as3 = album_songs.insert().values(
        albumId= 1, songId=3
    )
    as4 = album_songs.insert().values(
        albumId= 1, songId=4
    )
    as5 = album_songs.insert().values(
        albumId= 2, songId=5
    )
    as6 = album_songs.insert().values(
        albumId= 2, songId=6
    )
    as7 = album_songs.insert().values(
        albumId= 2, songId=7
    )
    as8 = album_songs.insert().values(
        albumId= 2, songId=8
    )
    as9 = album_songs.insert().values(
        albumId= 3, songId=9
    )
    as10 = album_songs.insert().values(
        albumId= 3, songId=10
    )
    as11 = album_songs.insert().values(
        albumId= 3, songId=11
    )
    as12 = album_songs.insert().values(
        albumId= 3, songId=12
    )
    db.session.execute(as1)
    db.session.execute(as2)
    db.session.execute(as3)
    db.session.execute(as4)
    db.session.execute(as5)
    db.session.execute(as6)
    db.session.execute(as7)
    db.session.execute(as8)
    db.session.execute(as9)
    db.session.execute(as10)
    db.session.execute(as11)
    db.session.execute(as12)
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
