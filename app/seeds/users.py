from app.models import db, User, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', 
        last_name='User', 
        image_URL='https://i.pinimg.com/originals/c7/0c/36/c70c3652b86753708079b17e9033c488.jpg',
        email='demo@aa.io', 
        username='demouser', 
        password='password')
    marnie = User(
        first_name='Marnie',
        last_name='Jones',
        image_URL='https://i.pinimg.com/474x/27/6f/46/276f46d26122f515a4362993e0bfd141.jpg',
        email='marnie@aa.io', 
        username='marniesshop', 
        password='password')
    jane = User(
        first_name='Jane',
        last_name='Smith',
        image_URL='https://i.pinimg.com/474x/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg',
        email='jane@aa.io', 
        username='shopwithjane', 
        password='password')

    users = [demo, marnie, jane]
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