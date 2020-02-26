from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from regi.models import Registration
# Create your views here.


@csrf_exempt
def registration(request):
    response_json = {}
    try:
        if request.method=='POST':
            name = request.POST.get('name')
            phone_no = request.POST.get('phone_no')
            email_id = request.POST.get('email_id')
            if Registration.objects.filter(phone = phone_no).count()>0:
                response_json['success']= True
                response_json['message']= "You have already been registered."
                return JsonResponse(response_json)
            else:
                register= Registration.objects.create(name=name, phone = phone_no, email_id= email_id)
                response_json['success']= True
                response_json['message']= "Thank you for your registration."
                return JsonResponse(response_json)

    except Exception as e:
        print str(e)
        response_json['success']= False
        response_json['message']= "Something went wrong. We are sorry for inconvenience caused."
        return JsonResponse(response_json)