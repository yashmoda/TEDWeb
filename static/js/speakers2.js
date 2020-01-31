function get_previous_speakers()
{
    var temp = "";
    $.ajax({
       url: '/speaker/previous_speakers',
       type: "GET",
       dataType: "json",
       success: function(data)
       {
        for(j=0; j<data.speaker_details.length; j++)
        {
            temp += '<div class="pic-bg norm">';
            temp += '<div class="pic-cover">';
            temp += '<div class="pic-img" style="background-image:url(\'';
            temp += data.speaker_details[j].image;
            temp += '\')"></div>';
            temp += '<div class="pic-des">';
            temp += '<div class="card-title">'
            temp += data.speaker_details[j].name + '</div>';
            temp += '<div class="card-text">';
            temp += data.speaker_details[j].description + '<br>';
            temp += '<a href=\"'+ data.speaker_details[j].previous_talk_link +'\"> See TedX Talk</a>';
            temp += '</div>';
            temp += '</div>';
            temp += '</div>';
            temp += '</div>';
        }
        $("#speaker_details").html(temp);
       }
    });

}

$(document).ready(function () {
    get_previous_speakers();
    console.log("All Set");
});