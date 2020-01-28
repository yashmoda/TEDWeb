from django.shortcuts import render
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from sponsors.models import SponsorApplicationData, SponsorData


@csrf_exempt
def sponsors_application(request):
    response_Json = {}
    try:
        if request.method == 'POST':
            sponsor_name = request.POST.get('sponsor_name')
            sponsor_domain = request.POST.get('sponsor_domain')
            sponsor_image = request.FILES.get('sponsor_image')
            person_of_contact = request.POST.get('person_of_contact')
            sponsor_no = request.POST.get('sponsor_no')
            sponsor_email = request.POST.get('sponsor_email')
            if SponsorApplicationData.objects.filter(email=sponsor_email, contactNo=sponsor_no).count() > 0:

                response_Json['success'] = True
                response_Json['message'] = 'You have already applied. We will get back to you shortly.'
                return JsonResponse(response_Json)

            else:
                sponsor = SponsorApplicationData.objects.create(name=sponsor_name, domain=sponsor_domain,
                                                                contactNo=sponsor_no, POC=person_of_contact,
                                                                email=sponsor_email, logo=sponsor_image)

                # confirmation email code

                response_Json['success'] = True
                response_Json['message'] = 'You have applied succesfully. We will get back to you shortly.'
                return JsonResponse(response_Json)

    except Exception as e:
        print (str(e))
        response_Json['success'] = False
        response_Json['message'] = 'An error has occured. Please try again later'
        return JsonResponse(response_Json)


def previous_sponsors(request):
    response_Json = {'sponsor_details': []}
    if request.method == 'GET':
        try:
            previous_sponsors_list = SponsorApplicationData.objects.filter(status=5)
            for previous_sponsor in previous_sponsors_list:
                temp_json = {'name': previous_sponsor.name, 'domain': previous_sponsor.domain,
                             'logo': request.scheme + '://' + request.get_host() +
                                     '/media/' +str(previous_sponsor.logo),
                             'id': previous_sponsor.id}
                response_Json['sponsor_details'].append(temp_json)
            response_Json['success'] = True
            response_Json['message'] = 'The list of Sponsors has been succesfully shown'
            return JsonResponse(response_Json)

        except Exception as e:
            print str(e)
            response_Json['Failed'] = False
            response_Json['message'] = 'An error has occured. Please try again later'
            return JsonResponse(response_Json)


def current_sponsors(request):
    response_Json = {'sponsors_details': []}
    if request.method == 'GET':
        try:
            current_sponsos_list = SponsorApplicationData.objects.filter(status=6)
            for current_sponsor in current_sponsos_list:
                temp_json = {'name': current_sponsor.name, 'domain': current_sponsor.domain,
                             'logo': request.scheme + '://' + request.get_host() +
                                     '/media/' +str(current_sponsor.logo),
                             'id': current_sponsor.id}
                response_Json['sponsors_details'].append(temp_json)
            response_Json['success'] = True
            response_Json['message'] = 'The list of current sponsors has been successfully shown'
            return JsonResponse(response_Json)

        except Exception as e:
            print str(e)
            response_Json['success'] = False
            response_Json['message'] = 'An error has occured. Please try again later'
            return JsonResponse(response_Json)
