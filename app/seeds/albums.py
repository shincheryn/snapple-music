from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_albums():
    # albums_data = [
    #         {'album_name': 'Dangerous Woman', 'userId': 1, 'genre': 'Pop', 'release_year': 2016, 'description': 'Dangerous Woman is the third studio album by American singer Ariana Grande.'},
    #         {'album_name': 'Highway to Hell', 'userId': 2, 'genre': 'Rock', 'release_year': 1979, 'description': 'Highway to Hell is the sixth studio album by Australian hard rock band AC/DC'},
    #         {'album_name': 'One Thing at a Time', 'userId': 3, 'genre': 'Country', 'release_year': 2023, 'description': 'One Thing at a Time is the third studio album by American country music singer Morgan Wallen'},
    #         # {'album_name': 'Song 4', 'userId': 1, 'genre': 'Hip hop', 'release_year': 1993, 'description': 'description4'},
    #         # {'album_name': 'Song 5', 'userId': 2, 'genre': 'R&B', 'release_year': 1994, 'description': 'description5'},
    #         # {'album_name': 'Song 6', 'userId': 2, 'genre': 'Electronic', 'release_year': 1995, 'description': 'description6'},
    #         # {'album_name': 'Song 7', 'userId': 2, 'genre': 'Metal', 'release_year': 1996, 'description': 'description7'},
    #         # {'album_name': 'Song 8', 'userId': 2, 'genre': 'Funk', 'release_year': 1997, 'description': 'description8'},
    #         # {'album_name': 'Song 9', 'userId': 3, 'genre': 'K-pop', 'release_year': 1998, 'description': 'description9'},
    #         # {'album_name': 'Song 10', 'userId': 3, 'genre': 'Alternative rock', 'release_year': 1999, 'description': 'description10'},
    #         # {'album_name': 'Song 11', 'userId': 3, 'genre': 'Synth-pop', 'release_year': 2000, 'description': 'description11'},
    #         # {'album_name': 'Song 12', 'userId': 3, 'genre': 'Pop rock', 'release_year': 2023, 'description': 'description12'}
    #     ]
    # for album in albums_data:
    #     db.session.add(**album)
    a1 = Album(
        album_name='Dangerous Woman', userId= 1, genre= 'Mix', release_year= 2016, description= 'Dangerous Woman is the third studio album by American singer Ariana Grande.', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    a2 = Album(
        album_name='Highway to Hell', userId= 2, genre= 'Mix', release_year= 1979, description= 'Highway to Hell is the sixth studio album by Australian hard rock band AC/DC', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    a3 = Album(
        album_name='One Thing at a Time', userId= 3, genre= 'Mix', release_year= 2023, description= 'One Thing at a Time is the third studio album by American country music singer Morgan Wallen', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
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
