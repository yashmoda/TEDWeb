from django.contrib import admin

from sponsors.models import SponsorData, SponsorApplicationData

admin.site.register(SponsorApplicationData)
admin.site.register(SponsorData)

