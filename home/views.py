from django.shortcuts import render


def show_home(request):
    return render(request, 'HomePage.html')


def show_speakers(request):
    return render(request, 'speaker.html')


def show_team(request):
    return render(request, 'team.html')
