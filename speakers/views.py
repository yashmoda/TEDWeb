from django.http import JsonResponse
from django.shortcuts import render


# speaker_application
# previous_speakers
# current_speakers
from django.views.decorators.csrf import csrf_exempt

from speakers.models import SpeakerApplicationData, SpeakerData


@csrf_exempt
def speaker_application(request):
    try:
        response_json = {}
        if request.method == 'POST':
            speaker_name = request.POST.get('speaker_name')
            field_of_interest = request.POST.get('field_of_interest')
            speaker_image = request.FILES.get('speaker_image').name
            speaker_email = request.POST.get('speaker_email')
            speaker_phone = request.POST.get('speaker_phone')
            speaker_resume = request.FILES.get('speaker_resume').name
            previous_talk_link = request.POST.get('previous_talk_link')
            if SpeakerApplicationData.objects.filter(email=speaker_email,
                                                     phone_no=speaker_phone).count()>0:
                response_json['success'] = True
                response_json['message'] = "You have already applied. We will get back to you shortly."
                return JsonResponse(response_json)
            else:
                speaker = SpeakerApplicationData.objects.create(name=speaker_name,
                                                                domain=field_of_interest,
                                                                image=speaker_image,
                                                                email=speaker_email,
                                                                phone=speaker_phone,
                                                                profile=speaker_resume,
                                                                previous_talk_link=previous_talk_link)
                #send email for successful application.
                response_json['success'] = True
                response_json['message'] = "You will soon receive an email confirming your application."
                return JsonResponse(response_json)
    except Exception as e:
        print str(e)
        response_json['success'] = False
        response_json['message'] = "An error has occured. Please try again later."
        return JsonResponse(response_json)


def previous_speakers(request):
    response_json = {'speaker_details': []}
    if request.method == 'GET':
        try:
            previous_speaker_list = SpeakerData.objects.filter(status=5)
            for previous_speaker in previous_speaker_list:
                temp_json = {'name': previous_speaker.name,
                             'domain': previous_speaker.domain,
                             'image': previous_speaker.image,
                             'id': previous_speaker.id}
                response_json['speaker_details'].append(temp_json)
            response_json['success'] = True
            response_json['message'] = "The list of previous speakers has been successfully shown."
            return JsonResponse(response_json)
        except Exception as e:
            print str(e)
            response_json['success'] = False
            response_json['message'] = "An error has occurred. Please try again later."
            return JsonResponse(response_json)


def current_speakers(request):
    response_json = {'speaker_details': []}
    if request.method == 'GET':
        try:
            current_speaker_list = SpeakerData.objects.filter(status=6)
            for current_speaker in current_speaker_list:
                temp_json = {'name': current_speaker.name,
                             'domain': current_speaker.domain,
                             'image': current_speaker.image,
                             'id': current_speaker.id}
                response_json['speaker_details'].append(temp_json)
            response_json['success'] = True
            response_json['message'] = "The list of current speakers has been successfully shown."
            return JsonResponse(response_json)
        except Exception as e:
            print str(e)
            response_json['success'] = False
            response_json['message'] = "An error has occurred. Please try again later."
            return JsonResponse(response_json)


def speaker_details(request):
    response_json = {}
    if request.method == 'GET':
        try:
            speaker_id = request.GET.get('speaker_id')
            speaker_data = SpeakerData.objects.get(id=speaker_id)
            response_json['speaker_name'] = speaker_data.name
            response_json['speaker_domain'] = speaker_data.domain
            response_json['speaker_description'] = speaker_data.description
            response_json['previous_talk_link'] = speaker_data.previous_talk_link
            response_json['success'] = True
            response_json['message'] = "All the speaker information has been shown."
            return JsonResponse(response_json)
        except Exception as e:
            print str(e)
            response_json['success'] = False
            response_json['message'] = "An error has occurred. Please try again later."
            return JsonResponse(response_json)
