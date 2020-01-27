from django.http import JsonResponse
from django.shortcuts import render


# speaker_application
# previous_speakers
# current_speakers
from django.views.decorators.csrf import csrf_exempt

from speakers.models import SpeakerApplicationData


@csrf_exempt
def speaker_application(request):
    try:
        response_json = {}
        if request.method == 'POST':
            speaker_name = request.post.get('speaker_name')
            field_of_interest = request.post.get('field_of_interest')

            # speaker_image = request.post.get('')
            speaker_email = request.post.get('speaker_email')
            speaker_phone = request.post.get('speaker_phone')
            #speaker_resume = upload a file
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
                                                                profile=speaker_resume)
                #send email for successful application.
                response_json['success'] = True
                response_json['message'] = "You will soon receive an email confirming your application."
                return JsonResponse(response_json)
    except Exception as e:
        print str(e)
        response_json['success'] = False
        response_json['message'] = "An error has occured. Please try again later."
        return JsonResponse(response_json)
