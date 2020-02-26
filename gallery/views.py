from django.shortcuts import render
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from gallery.models import Gallery

# Create your views here.

@csrf_exempt
def gallery_feed(request):
    response_Json = {'image_feed': []}
    if request.method == 'GET':
        try:
            ted_gallery_feed = Gallery.objects.all().order_by('-id')
            for event_image in ted_gallery_feed:
                temp_json = {'description': event_image.description, 'year': event_image.year,
                               'image': request.scheme + '://' + request.get_host() +
                                '/media/' + str(event_image.image)}
          
                response_Json['image_feed'].append(temp_json)
            print response_Json
            response_Json['success'] = True
            response_Json['message'] = 'Images of previous TEDx event has been succesfully shown'
            return JsonResponse(response_Json)




        except Exception as e:
            print str(e)
            response_Json['Failed'] = False
            response_Json['message'] = 'An error has occured. Please try again later'
            return JsonResponse(response_Json)

def show_gallery(request):
    return render(request, 'gallery.html')