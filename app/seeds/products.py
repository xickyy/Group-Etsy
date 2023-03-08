from app.models import db, Product, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        title='Caramel Pillow', description='Our caramel, grey, and orange plaid pillow cover is a great pillow cover to add texture and brighten up a space!', price=46.80, image_URL="https://i.etsystatic.com/16119277/r/il/f1dfa3/3551572525/il_1588xN.3551572525_nrnp.jpg", user_id=1)
    product2 = Product(
        title='Gold Necklace', description='Perfect for pairing with any outfit, our Solid Gold Name Necklace offers a look that’s both chic and stylish.', price=18.90, image_URL="https://i.etsystatic.com/24042361/r/il/62c7e3/4221094131/il_1588xN.4221094131_ji8c.jpg", user_id=2)
    product3 = Product(
        title='Watercolor Print', description='Printable art is an easy and affordable way to personalize your home or office.', price=5.43, image_URL="https://i.etsystatic.com/14789656/r/il/a86632/1296942973/il_1588xN.1296942973_nlyi.jpg", user_id=3)
    product4 = Product(
        title='Yakes Hat', description='A cool hat for cool people!', price=24.99, image_URL="https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/fdd635b9cd494d12a9e4ac8e015ebe19_9366/superlite-hat.jpg", user_id=1)
    product5 = Product(
        title='Glass Cups', description="These very fancy cups will break if you drop them, so don't... or do?", price=17.98, image_URL="https://m.media-amazon.com/images/I/71yKdvUjuIL.jpg", user_id=2)
    product6 = Product(
        title='Indigo Blue Japandi Art Print', description='Indigo Blue Japandi Wall Art Printable, Navy Abstract Art Print, Modern Geometric Poster, Bohemian Abstract Print, Stripes Curves Painting', price=6.50, image_URL="https://i.etsystatic.com/25191255/r/il/c7143b/3872381504/il_794xN.3872381504_jesw.jpg", user_id=3)
    product7 = Product(
        title='Gabes Cat', description='This cat is a package deal, comes with a hooman named Gabriel', price=999.99, image_URL="https://www.thesprucepets.com/thmb/vgvK9_iqmLpIHezaqZ_Mi5evmQM=/1600x0/filters:no_upscale():strip_icc()/black-and-white-cat-breeds-4843190-hero-8ea9ae92c05c46fb9495f789ca595f37.jpg", user_id=1)
    product8 = Product(
        title='Fancy Bowl', description='Large Bowl in Rustic White Concrete with Gold Leaf Interior', price=150.00, image_URL="https://i.etsystatic.com/5256837/r/il/eea7a5/4041213035/il_794xN.4041213035_epwa.jpg", user_id=1)
    product9 = Product(
        title='The Mask', description='*WEAR WITH CAUTION* side effects of wearing this mask may increase rizz ', price=42.50, image_URL="https://i.etsystatic.com/23074566/r/il/3f7320/2762529568/il_fullxfull.2762529568_1z5m.jpg", user_id=2)
    product10 = Product(
        title='Chakra Set', description='7 Chakra Stones + 1 Healing Crystals Necklace - Healing Stones Kit with Life Tree Necklace', price=10.79, image_URL="https://i.etsystatic.com/38981368/r/il/3c5670/4557800782/il_794xN.4557800782_hwb9.jpg", user_id=3)


    products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10]
    for product in products:
        db.session.add(product)

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
