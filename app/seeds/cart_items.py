from app.models import db, CartItem, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_cart_items():
    item1 = CartItem(
        user_id=1, product_id=2)
    item2 = CartItem(
        user_id=1, product_id=3)
    item3 = CartItem(
        user_id=2, product_id=3)
    item4 = CartItem(
        user_id=3, product_id=1)
    item5 = CartItem(
        user_id=3, product_id=2)


    items = [item1, item2, item3, item4, item5]
    for item in items:
        db.session.add(item)
    
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cart_items")
        
    db.session.commit()