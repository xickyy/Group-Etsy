from app.models import db, Review, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        body="This is a really good pillow!", stars=4, product_id=1, user_id=3)
    review2 = Review(
        body="Broke the first try!", stars=1, product_id=2, user_id=1)
    review3 = Review(
        body="Great quality, but got the wrong size.", stars=3, product_id=3, user_id=2)

    reviews = [review1, review2, review3]
    for review in reviews:
        db.session.add(review)

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