from django.shortcuts import render
from django.http import JsonResponse

#name
#phone_no
#query

@csrf_exempt
def contact_us(request):
    try:
        response_json= {}
        if request.method=='POST':
            name= request.POST.get('name')
            phone_no= request.POST.get('phone_no')
            query= request.POST.get('query')


            if Queries.objects.filter(phone_no= phone_no).count()>0:
                response_json['success']= True
                response_json['message']= "You have already applied. We will contact you shortly."
                return JsonResponse(response_json)

            else:
                query1= Queries.objects.create(name=name, phone_no= phone_no, query=query)

                response_json['success']= True
                response_json['message']= "You will recieve an email shortly."
                return JsonResponse(response_json)

    except Exception as e:
        print str(e)
        response_json['success']= False
        response_json['message']= "Something went wrong. We are sorry for inconvenience caused."
        return JsonResponse(response_json)
