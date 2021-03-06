﻿window.RowMultiple = 100;
$(document).ready(function () {
    //start rendering an arrayed json. 
    var elem = $('#resultPanel .flightPanel');
    var rowText = "";
    //$.getJSON('flights.json', function(data) {
        data.Flights.forEach(function(flight,idx) {
            rowText += renderRow(flight);
            
        });
        elem.append(rowText);
    //});
    

});


var renderRow = function (flight) {

    var rowText = '<li class="clickable"> \
                        <div> \
                            <p class="flight"><img src="' +flight.Image.Source + '" alt="'+ flight.Image.Alt + '" /><span>'+ flight.Name + '</span></p> \
                            <p class="depart">'+ flight.Departure.Time + '<span class="airlines">British Air..</span></p> \
                            <ul class="route stop0"> \
                                <li class="first alternateAirport">'+flight.Departure.Destination +'</li> \
                                <li class="last">' + flight.Arrival.Destination +'<em>2</em></li> \
                            </ul> \
                            <p class="arrive">'+flight.Arrival.Time +'<span class="duration">45h 30m</span></p> \
                            <p class="duration">' +flight.Duration + '</p> \
                            <a class="more">more</a> \
                            <p class="price"><em>'+ flight.Price.Currency + '</em>' + flight.Price.Amount +'</p> \
                            <p class="sell"><a class=" button blue">Book</a></p> \
                        </div>\
                    </li>';

    return rowText;
}

