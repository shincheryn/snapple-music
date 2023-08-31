from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_songs():
    songs_data = [
            {'song_name': 'Into You', 'userId': 1, 'genre': 'Pop', 'image_url': 'https://i.redd.it/t6wxb5mnseya1.jpg', 'song_url': 'url1'},
            {'song_name': 'Highway to Hell', 'userId': 1, 'genre': 'Rock', 'image_url': 'https://i.imgur.com/Yp6eHP5.jpeg', 'song_url': 'url2'},
            {'song_name': 'Last Night', 'userId': 1, 'genre': 'Country', 'image_url': 'https://i.ytimg.com/vi/K2uoUmaMZCQ/maxresdefault.jpg', 'song_url': 'url3'},
            {'song_name': 'Congratulations', 'userId': 1, 'genre': 'Hip hop', 'image_url': 'https://upload.wikimedia.org/wikipedia/en/5/57/PostyCongratsremix.jpeg', 'song_url': 'url4'},
            {'song_name': 'Let Me Love You', 'userId': 2, 'genre': 'R&B', 'image_url': 'https://upload.wikimedia.org/wikipedia/en/9/9f/KDA_single_-_MORE.jpg', 'song_url': 'url5'},
            {'song_name': 'Rumble', 'userId': 2, 'genre': 'Electronic', 'image_url': 'https://i.ytimg.com/vi/x4wNlrF173k/maxresdefault.jpg', 'song_url': 'url6'},
            {'song_name': 'Stairway to Heaven', 'userId': 2, 'genre': 'Metal', 'image_url': 'https://i1.sndcdn.com/artworks-000127380203-93pa4d-t500x500.jpg', 'song_url': 'url7'},
            {'song_name': 'Problemz', 'userId': 2, 'genre': 'Funk', 'image_url': 'https://m.media-amazon.com/images/I/510oOhzOCYL._UXNaN_FMjpg_QL85_.jpg', 'song_url': 'url8'},
            {'song_name': 'Super Shy', 'userId': 3, 'genre': 'K-pop', 'image_url': 'https://e.snmc.io/i/600/s/4b0dcfeb7634a1f2a54905f5fc4965d8/11134855/newjeans-super-shy-Cover-Art.jpg', 'song_url': 'url9'},
            {'song_name': 'Club 57', 'userId': 3, 'genre': 'Alternative rock', 'image_url': 'https://cdns-images.dzcdn.net/images/cover/09888165d889502659273b1e16bbb824/264x264.jpg', 'song_url': 'url10'},
            {'song_name': 'Take On Me', 'userId': 3, 'genre': 'Synth-pop', 'image_url': 'https://upload.wikimedia.org/wikipedia/en/d/d5/A-ha_take_on_me-1stcover.jpg', 'song_url': 'url11'},
            {'song_name': 'Demons', 'userId': 3, 'genre': 'Pop rock', 'image_url': 'https://i1.sndcdn.com/artworks-000241938427-nscbv9-t500x500.jpg', 'song_url': 'url12'}
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
