from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_songs():
    s1 = Song(
        song_name='Into You', userId= 1, genre= 'Pop', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534465/snapple-music/ariana-grande-into-you.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Ariana+Grande+-+Into+You+(Official+Audio).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s2 = Song(
        song_name='Highway to Hell', userId= 1, genre= 'Rock', image_url= 'https://i.pinimg.com/originals/99/6e/cc/996ecc010fe1339b124880d0d62cdecb.png', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/AC+DC+-+Highway+to+Hell+(lyrics).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s3 = Song(
        song_name='Last Night', userId= 1, genre= 'Country', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534742/snapple-music/Morgan-Wallen-LastNight.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Morgan+Wallen+-+Last+Night+(Audio+Only).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s4 = Song(
        song_name='Congratulations', userId= 1, genre= 'Hip hop', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534811/snapple-music/Congratulations-PostMalone.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Congratulations.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s5 = Song(
        song_name='Let Me Love You', userId= 2, genre= 'R&B', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534884/snapple-music/Mario-let-me-love-you.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Mario+-+Let+Me+Love+You+(Lyrics).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s6 = Song(
        song_name='Rumble', userId= 2, genre= 'Electronic', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534971/snapple-music/skrillex-rumble.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Skrillex%2C+Fred+again.+Flowdan+-+Rumble+%5BOfficial+Audio%5D.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s7 = Song(
        song_name='Stairway to Heaven', userId= 2, genre= 'Metal', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535034/snapple-music/stairway-to-heaven.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Stairway+to+Heaven+(Remaster).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s8 = Song(
        song_name='Problemz', userId= 2, genre= 'Funk', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535160/snapple-music/Problemz.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/PROBLEMZ.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s9 = Song(
        song_name='Super Shy', userId= 3, genre= 'K-pop', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535191/snapple-music/super-shy.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/NewJeans+(%E1%84%82%E1%85%B2%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3)+-+Super+Shy+%5BOfficial+Audio%5D.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s10 = Song(
        song_name='Club 57', userId= 3, genre= 'Alternative rock', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535356/snapple-music/club57.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Club+57.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s11 = Song(
        song_name='Take On Me', userId= 3, genre= 'Synth-pop', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535291/snapple-music/take-on-me.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Take+on+Me+(2016+Remaster).mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    s12 = Song(
        song_name='Demons', userId= 3, genre= 'Pop rock', image_url= 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535241/snapple-music/imagine-dragons-demons.jpg', song_url= 'https://snapple-music-bucket.s3.us-west-2.amazonaws.com/Imagine+Dragons+-+Demons.mp3', createdAt= datetime(2021,11,19), updatedAt= datetime(2021,11,19)
    )
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.add(s6)
    db.session.add(s7)
    db.session.add(s8)
    db.session.add(s9)
    db.session.add(s10)
    db.session.add(s11)
    db.session.add(s12)
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
