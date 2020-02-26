import os
from django.http import JsonResponse
from django.shortcuts import render
from django.core.mail import send_mail

# speaker_application
# previous_speakers
# current_speakers
from django.views.decorators.csrf import csrf_exempt

# from TEDWeb.settings import EMAIL_HOST_USER
from speakers.models import SpeakerApplicationData

def show_speaker_page(request):
    return render(request, 'speaker.html')


@csrf_exempt
def speaker_application(request):
    response_json = {}
    try:
        if request.method == 'POST':
            speaker_name = request.POST.get('speaker_name')
            field_of_interest = request.POST.get('field_of_interest')
            speaker_image = request.FILES.get('speaker_image').name
            speaker_email = request.POST.get('speaker_email')
            speaker_phone = request.POST.get('speaker_phone')
            speaker_resume = request.FILES.get('speaker_resume').name
            previous_talk_link = request.POST.get('previous_talk_link')
            try:
                send_mail(
                    'Speaker Application',
                    speaker_name + ' has tried to apply to become a speaker. The speaker can be reached out at ' + speaker_email+' and ' + speaker_phone,
                    EMAIL_HOST_USER,
                    ['yashmoda624@gmail.com'],
                    fail_silently=False
                )
            except Exception as e:
                print e
            print(speaker_image)
            print(speaker_resume)
            try:
                speaker_image_name = speaker_image.replace(" ", "_")
                speaker_resume_name = speaker_resume.replace(" ", "_")
                folder = "media/images/speakers/"
                full_filename = os.path.join(folder, speaker_image_name)
                print ("Full filename = " + full_filename)
                fout = open(folder + speaker_image_name, 'w')
                image_file_content = request.FILES.get('speaker_image').read()
                fout.write(image_file_content)
                fout.close()

                folder = "media/profile/speakers/"
                full_filename = os.path.join(folder, speaker_resume_name)
                print ("Full filename = " + full_filename)
                fout = open(folder + speaker_resume_name, 'w')
                profile_file_content = request.FILES.get('speaker_resume').read()
                fout.write(profile_file_content)
                fout.close()
                if SpeakerApplicationData.objects.filter(email=speaker_email,
                                                         phone_no=speaker_phone).count() > 0:
                    response_json['success'] = True
                    response_json['message'] = "You have already applied. We will get back to you shortly."
                    return JsonResponse(response_json)
                else:
                    speaker = SpeakerApplicationData.objects.create(name=speaker_name,
                                                                    domain=field_of_interest,
                                                                    image='/images/speakers/' + speaker_image_name,
                                                                    email=speaker_email,
                                                                    phone_no=speaker_phone,
                                                                    profile='/profile/speakers/'+speaker_resume_name,
                                                                    previous_talk_link=previous_talk_link)
                    response_json['success'] = True
                    response_json['message'] = "You will soon receive an email confirming your application."
                    return JsonResponse(response_json)
            except Exception as e:
                print str(e)
                response_json['success'] = False
                response_json['message'] = "An error has occurred. Please try again later."
                return JsonResponse(response_json)
    except Exception as e:
        print str(e)
        response_json['success'] = False
        response_json['message'] = "An error has occurred. Please try again later."
        return JsonResponse(response_json)


def previous_speakers(request):
    response_json = {'speaker_details': []}
    if request.method == 'GET':
        try:
            previous_speaker_list = SpeakerApplicationData.objects.filter(status=5)
            for previous_speaker in previous_speaker_list:
                temp_json = {'name': previous_speaker.name,
                             'domain': previous_speaker.domain,
                             'image': request.scheme + '://' + request.get_host() +
                                      '/media/' + str(previous_speaker.image),
                             'id': previous_speaker.id,
                             'description': previous_speaker.description,
                             'previous_talk_link': previous_speaker.previous_talk_link}
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
            current_speaker_list = SpeakerApplicationData.objects.filter(status=6)
            for current_speaker in current_speaker_list:
                temp_json = {'name': current_speaker.name,
                             'domain': current_speaker.domain,
                             'description': current_speaker.description,
                             'image': request.scheme + '://' + request.get_host() +
                                      '/media/' + str(current_speaker.image),
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
            speaker_data = SpeakerApplicationData.objects.get(id=speaker_id)
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
