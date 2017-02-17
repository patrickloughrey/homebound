// Twilio Credentials
var accountSid = 'AC253122f14819aa08f57e732f9ef0ea62';
var authToken = '543eb46428cccfcf3f68af5bf078f5a6';


//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
//When sending SMS with Twilio, the 'to:' phone number must be verified in Twilio while in Trial Mode
client.messages.create({ 
    to: "+18482996673", 
    from: "+18483730521", 
    body: "Testing"
}, function(err, message) { 
    console.log(message.sid); 
});


// JQuery variables to retrieve user input
var phone = $('#phone').val();
var message = $('#message').val();
var origin = $('#origin').val();
var dest = $('#destination').val();

$(".submit").click(e => {

    e.preventDefault();

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

    })

});

