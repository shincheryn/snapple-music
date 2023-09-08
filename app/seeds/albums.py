from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_albums():
    a1 = Album(
        album_name='Dangerous Woman', userId= 1, genre= 'Mix', release_year= 2016, description= 'Dangerous Woman is the third studio album by American singer Ariana Grande.',album_image_url='https://i.imgur.com/Fl65OP9.jpeg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    a2 = Album(
        album_name='Highway to Hell', userId= 2, genre= 'Mix', release_year= 1979, description= 'Highway to Hell is the sixth studio album by Australian hard rock band AC/DC',album_image_url='https://i.imgur.com/N78J4gd.jpeg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    a3 = Album(
        album_name='One Thing at a Time', userId= 3, genre= 'Mix', release_year= 2023, description= 'One Thing at a Time is the third studio album by American country music singer Morgan Wallen',album_image_url='https://i.imgur.com/Aj8li3F.jpeg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
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
