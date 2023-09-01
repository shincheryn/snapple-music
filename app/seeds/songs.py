from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_songs():
    songs_data = [
            {'song_name': 'Into You', 'userId': 1, 'genre': 'Pop', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534465/snapple-music/ariana-grande-into-you.jpg', 'song_url': 'url1'},
            {'song_name': 'Highway to Hell', 'userId': 1, 'genre': 'Rock', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534604/snapple-music/Highway-to-Hell-AC-DC.jpg', 'song_url': 'url2'},
            {'song_name': 'Last Night', 'userId': 1, 'genre': 'Country', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534742/snapple-music/Morgan-Wallen-LastNight.jpg', 'song_url': 'url3'},
            {'song_name': 'Congratulations', 'userId': 1, 'genre': 'Hip hop', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534811/snapple-music/Congratulations-PostMalone.jpg', 'song_url': 'url4'},
            {'song_name': 'Let Me Love You', 'userId': 2, 'genre': 'R&B', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534884/snapple-music/Mario-let-me-love-you.jpg', 'song_url': 'url5'},
            {'song_name': 'Rumble', 'userId': 2, 'genre': 'Electronic', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693534971/snapple-music/skrillex-rumble.jpg', 'song_url': 'url6'},
            {'song_name': 'Stairway to Heaven', 'userId': 2, 'genre': 'Metal', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535034/snapple-music/stairway-to-heaven.jpg', 'song_url': 'url7'},
            {'song_name': 'Problemz', 'userId': 2, 'genre': 'Funk', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535160/snapple-music/Problemz.jpg', 'song_url': 'url8'},
            {'song_name': 'Super Shy', 'userId': 3, 'genre': 'K-pop', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535191/snapple-music/super-shy.jpg', 'song_url': 'url9'},
            {'song_name': 'Club 57', 'userId': 3, 'genre': 'Alternative rock', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535356/snapple-music/club57.jpg', 'song_url': 'url10'},
            {'song_name': 'Take On Me', 'userId': 3, 'genre': 'Synth-pop', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535291/snapple-music/take-on-me.jpg', 'song_url': 'url11'},
            {'song_name': 'Demons', 'userId': 3, 'genre': 'Pop rock', 'image_url': 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1693535241/snapple-music/imagine-dragons-demons.jpg', 'song_url': 'url12'}
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
