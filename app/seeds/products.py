from app.models import db, Product, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_products():
    pillow = Product(
        title='Caramel Pillow', description='Our caramel, grey, and orange plaid pillow cover is a great pillow cover to add texture and brighten up a space!', price=46.80, imageURL="https://i.etsystatic.com/16119277/r/il/f1dfa3/3551572525/il_1588xN.3551572525_nrnp.jpg", userId=1)
    necklace = Product(
        title='Gold Necklace', description='Perfect for pairing with any outfit, our Solid Gold Name Necklace offers a look that’s both chic and stylish.', price=18.90, imageURL="https://i.etsystatic.com/24042361/r/il/62c7e3/4221094131/il_1588xN.4221094131_ji8c.jpg", userId=2)
    art_print = Product(
        title='Watercolor Print', description='Printable art is an easy and affordable way to personalize your home or office.', price=5.43, imageURL="https://i.etsystatic.com/14789656/r/il/a86632/1296942973/il_1588xN.1296942973_nlyi.jpg", userId=3)
    
    db.session.add(pillow)
    db.session.add(necklace)
    db.session.add(art_print)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")
        
    db.session.commit()