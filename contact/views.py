from django.core.mail import send_mail
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# from TEDWeb.settings import EMAIL_HOST_USER
from contact.models import Queries


@csrf_exempt
def contact_us(request):
    response_json = {}
    try:
        if request.method=='POST':
            name = request.POST.get('name')
            phone_no = request.POST.get('phone_no')
            query = request.POST.get('query')
            try:
                send_mail(
                    'Contact Application',
                    name + ' has requested for some regarding \"' + query + '\". The person can be reached out at ' + phone_no,
                    EMAIL_HOST_USER,
                    ['vsugandha17@gmail.com'],
                    fail_silently=False
                )
            except Exception as e:
                print  str(e)
            if Queries.objects.filter(phone = phone_no).count()>0:
                response_json['success']= True
                response_json['message']= "You have already applied. We will contact you shortly."
                return JsonResponse(response_json)

            else:
                query1= Queries.objects.create(name=name, phone = phone_no, query=query)
                response_json['success']= True
                response_json['message']= "You will recieve an email shortly."
                return JsonResponse(response_json)

    except Exception as e:
        print str(e)
        response_json['success']= False
        response_json['message']= "Something went wrong. We are sorry for inconvenience caused."
        return JsonResponse(response_json)
