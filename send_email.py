# in settings.py file
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'sender@gmail.com'
EMAIL_HOST_PASSWORD = 'sender_password'
EMAIL_PORT = 587
#


# in views.py file
from django.core.mail import send_mail

# for query
send_mail(
    'Response to your query.',  # SUBJECT
    'Dear Sir/Madam, <em/>This is an automated response.<em/> Thank you for connecting with us, we are glad to reach out to you regarding your query...',  # BODY
    'sender@gmail.com',  # SENDER EMAIL
    ['receiver@gmail.com'],  # RECEIVER EMAIL
    fail_silently=False
)
# for sponsorship
send_mail(
    'Request for sponsorship approved.',  # SUBJECT
    'Dear Sir/Madam, <em/>This is an automated response.<em/> Thank you for signing up for the sponsorship program and being a part of our community. We are glad to have you in the team of TEDx NIT Raipur. Thank you for your support. ',  # BODY
    'sender@gmail.com',  # SENDER EMAIL
    ['receiver@gmail.com'],  # RECEIVER EMAIL
    fail_silently=False
)

# for speaker application

send_mail(
    'Request for speaker application approved.',  # SUBJECT
    'Dear Sir/Madam, <em/>This is an automated response.<em/> Thank you for applying. We are glad to let you know that your application is approved for the speaker program. We are happy to have you as a part of TEDx NIT Raipur.',  # BODY
    'sender@gmail.com',  # SENDER EMAIL
    ['receiver@gmail.com'],  # RECEIVER EMAIL
    fail_silently=False
)
