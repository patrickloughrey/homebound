// Twilio Credentials
var accountSid = 'AC253122f14819aa08f57e732f9ef0ea62';
var authToken = '543eb46428cccfcf3f68af5bf078f5a6';
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
var map;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
};


$(".submit").click(e => {

    e.preventDefault();

    var origin = $("#origin").val();
    var dest = $("#destination").val();
    var phone = $('#phone').val();
    var message = $('#message').val();

    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [dest],
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(Date.now()),
            trafficModel: 'optimistic'
        };

    //JSON Response 
    }, (response, status) => {

        var duration = response.rows[0].elements[0].duration.text
        console.log(duration)

    });

});

//Create Twilio REST API client 
client.sms.messages.create({
    to: phone,
    from: '+8733730521',
    body: message

}, function(error, message) {
        if(!error) {
            console.log("Success! The SID for this SMS Message is: ");
            console.log(message.sid);
            console.log('Message sent on: ');
            console.log(message.dateCreated);

        } else {
            console.log('Oops! There was an error!');
        }

});


