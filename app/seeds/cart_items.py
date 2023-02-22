from app.models import db, CartItem, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_cart_items():
    item_one = CartItem(
        userId=1, productId=2)
    item_two = CartItem(
        userId=1, productId=3)
    item_three = CartItem(
        userId=2, productId=3)
    item_four = CartItem(
        userId=3, productId=1)
    item_five = CartItem(
        userId=3, productId=2)

    db.session.add(item_one)
    db.session.add(item_two)
    db.session.add(item_three)
    db.session.add(item_four)
    db.session.add(item_five)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cart_items")
        
    db.session.commit()