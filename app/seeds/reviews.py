from app.models import db, Review, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        body="This is a really good pillow!", stars=4, product_id=1, user_id=3)
    review2 = Review(
        body="Broke the first try!", stars=1, product_id=2, user_id=1)
    review3 = Review(
        body="Great quality, but got the wrong size.", stars=3, product_id=3, user_id=2)
    review4 = Review(
        body="After wearing this hat i noticed my coding skills increase!", stars=5, product_id=4, user_id=2)
    review5 = Review(
        body="just got these last week and i love them! Although I may or may not have broke them all already...", stars=4, product_id=5, user_id=3)
    review6 = Review(
        body="This really brings my whole livingroom together! although the quality could be better.", stars=4, product_id=6, user_id=1)
    review7 = Review(
        body="The cat is awesome! And Gabe is a huge help when it comes to debugging, 10/10 would recommend", stars=5, product_id=7, user_id=3)
    review8 = Review(
        body="I bought this for my boyfriend and he loved it till he found out how much i spent!", stars=3, product_id=8, user_id=2)
    review9 = Review(
        body="ITS PARTY TIME!! P-A-R-T-WHY? BECAUSE I GOTTA!!!", stars=5, product_id=9, user_id=1)
    review10 = Review(
        body="all my stones came broken!!", stars=1, product_id=10, user_id=2)

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10]
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
