from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
    title = StringField('Name of Product', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    imageURL = StringField("Image URL")
    submit = SubmitField('Submit')