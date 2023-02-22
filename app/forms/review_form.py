from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

class ReviewForm(FlaskForm):
    body = StringField('Enter review here', validators=[DataRequired()])
    stars = SelectField('Choose the amount of stars', choices=[1, 2, 3, 4, 5], validators=[DataRequired()])
    submit = SubmitField('Submit')