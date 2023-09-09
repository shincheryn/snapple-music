from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_playlists():
    p1 = Playlist(
        userId= 1, playlist_name= 'favorites', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694162035/favorites.png', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p2 = Playlist(
        userId= 1, playlist_name= 'at the moment', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694162179/atthemoment.png', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p3 = Playlist(
        userId= 1, playlist_name= 'everyday jams', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694162299/everydayjams.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p4 = Playlist(
        userId= 1, playlist_name= 'existential crisis', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694243051/existentialcrisis.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p5 = Playlist(
        userId= 2, playlist_name= 'yellow', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242121/yellow.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p6 = Playlist(
        userId= 2, playlist_name= 'blue', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242173/blue.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p7 = Playlist(
        userId= 2, playlist_name= 'green', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242262/green.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p8 = Playlist(
        userId= 2, playlist_name= 'purple', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242277/purple.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p9 = Playlist(
        userId= 3, playlist_name= 'jazz', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242854/jazz.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p10 = Playlist(
        userId= 3, playlist_name= 'l-o-v-e', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694242558/love.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p11 = Playlist(
        userId= 3, playlist_name= 'r&b', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694243077/rnb.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    p12 = Playlist(
        userId= 3, playlist_name= 'a musical', playlist_image_url='https://res.cloudinary.com/dvlsr70pm/image/upload/v1694243034/musical.jpg', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.add(p8)
    db.session.add(p9)
    db.session.add(p10)
    db.session.add(p11)
    db.session.add(p12)
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
