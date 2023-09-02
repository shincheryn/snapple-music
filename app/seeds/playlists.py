from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_playlists():
    # playlists_data = [
    #         {'userId': 1, 'playlist_name': 'Favorites'},
    #         {'userId': 1, 'playlist_name': 'Rock Hits'},
    #         {'userId': 2, 'playlist_name': 'Daily Mix'},
    #         {'userId': 2, 'playlist_name': 'Viral Hits'},
    #         {'userId': 3, 'playlist_name': 'New Music Friday'},
    #         {'userId': 3, 'playlist_name': 'K-Pop ON!'},
    # ]
    # for playlist in playlists_data:
    #     db.session.add(**playlist)
    p1 = Playlist(
        userId= 1, playlist_name= 'Favorites', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p2 = Playlist(
        userId= 2, playlist_name= 'New Music Friday', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p3 = Playlist(
        userId= 3, playlist_name= 'Daily Mix', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
