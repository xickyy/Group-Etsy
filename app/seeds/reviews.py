from app.models import db, Review, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review_one = Review(
        body="This is a really good pillow!", stars=4, productId=1, userId=3)
    review_two = Review(
        body="Broke the first try!", stars=1, productId=2, userId=1)
    review_three = Review(
        body="Great quality, but got the wrong size.", stars=3, productId=3, userId=2)

    db.session.add(review_one)
    db.session.add(review_two)
    db.session.add(review_three)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()