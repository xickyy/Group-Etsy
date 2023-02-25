from app.models import db, User, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', 
        last_name='User', 
        image_URL='https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/800px-SpongeBob_SquarePants_character.svg.png',
        email='demo@aa.io', 
        username='Demo', 
        password='password')
    marnie = User(
        first_name='Marnie',
        last_name='Jones',
        image_URL='https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png',
        email='marnie@aa.io', 
        username='marnie', 
        password='password')
    bobbie = User(
        first_name='Bobbie',
        last_name='Smith',
        image_URL='https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Squidward_Tentacles.svg/800px-Squidward_Tentacles.svg.png',
        email='bobbie@aa.io', 
        username='bobbie', 
        password='password')

    users = [demo, marnie, bobbie]
    for user in users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()