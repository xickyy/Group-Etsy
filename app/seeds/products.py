from app.models import db, Product, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        title='White Pampas Grass', description='30 beautiful stems that are perfect for brightening up a space!', price=19.88, image_URL="https://i.etsystatic.com/28344632/r/il/207b89/3147753808/il_1588xN.3147753808_b8av.jpg", user_id=1)
    product2 = Product(
        title='Wooden Turntable Station', description='Custom-made turntable station made of solid pine wood.', price=60.70, image_URL="https://i.etsystatic.com/38186931/r/il/c1435c/4576064750/il_1588xN.4576064750_ml7l.jpg", user_id=2)
    product3 = Product(
        title='Planter Pot Set', description='Made from agricultural by-products and equipped with a drainage hole and a saucer, this pot is perfect for upcycle enthusiasts and plant beginners.', price=45.00, image_URL="https://i.etsystatic.com/24265176/r/il/f59f23/4261237757/il_1588xN.4261237757_aw7f.jpg", user_id=3)
    product4 = Product(
        title="Yake's Hat", description="A cool hat for cool people!", price=24.99, image_URL="https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/fdd635b9cd494d12a9e4ac8e015ebe19_9366/superlite-hat.jpg", user_id=1)
    product5 = Product(
        title='Modern Bookshelf', description="Tempered glass shelves with gold frame.", price=494.10, image_URL="https://i.etsystatic.com/34160888/r/il/c5b9cc/4071636324/il_1588xN.4071636324_112s.jpg", user_id=2)
    product6 = Product(
        title='Indigo Blue Japandi Art Print', description='Wall art printable featuring Japandi artwork.', price=6.50, image_URL="https://i.etsystatic.com/25191255/r/il/c7143b/3872381504/il_794xN.3872381504_jesw.jpg", user_id=3)
    product7 = Product(
        title="Gabe's Cat", description='This cat is a package deal (comes with a hooman named Gabriel).', price=999.99, image_URL="https://www.thesprucepets.com/thmb/vgvK9_iqmLpIHezaqZ_Mi5evmQM=/1600x0/filters:no_upscale():strip_icc()/black-and-white-cat-breeds-4843190-hero-8ea9ae92c05c46fb9495f789ca595f37.jpg", user_id=1)
    product8 = Product(
        title='Gold Leaf Bowl', description='Large bowl in rustic white concrete with a gold leaf interior.', price=150.00, image_URL="https://i.etsystatic.com/5256837/r/il/eea7a5/4041213035/il_794xN.4041213035_epwa.jpg", user_id=1)
    product9 = Product(
        title='The Mask', description='Please wear with caution!', price=42.50, image_URL="https://i.etsystatic.com/23074566/r/il/3f7320/2762529568/il_fullxfull.2762529568_1z5m.jpg", user_id=2)
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
