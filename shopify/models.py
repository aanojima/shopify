# Aaron Nojima
# HackMIT
# Team Phi

from django.db import models
from django.forms import ModelForm

# Models

class User(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 40)
    address = models.ForeignKey(Address)

class Address(models.Model):
	mobile_number = PhoneNumberField(blank=True)
	home_number = PhoneNumberField(blank=True)
	fax_number = PhoneNumberField(blank=True)
	address = models.CharField(max_length=30)
	city = models.CharField(max_length=30)
	state = USStateField()
	zip_code = USPostalCodeField()

