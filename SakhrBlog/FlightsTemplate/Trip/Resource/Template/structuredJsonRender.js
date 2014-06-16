window.RowMultiple = 100;
$(document).ready(function () {
    //start rendering an arrayed json. 
    var elem = $('#resultPanel .flightPanel');
    var flights = aJson.flights;
    $.getJSON('flights.json', function(data) {
        data.Flights.forEach(function(flight,idx) {
            var rowText = renderRow(flight);
            elem.append(rowText);
        });
    });
    

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

var aJson = {
    'flights': [
        '<li class="clickable"> \
                        <div> \
                            <p class="flight multiAirline"><img src="../../../Resource/Image/Logo/Airline/Large/148.png" alt="American airlines" title="American Airlines" /> <img src="../../../Resource/Image/Logo/Airline/Large/181.png" alt="" title="Airlines " /> <img src="../../../Resource/Image/Logo/Airline/Large/607.png" alt="" title="Qatar airways" /></p> \
                            <p class="depart">16:00<span class="airlines">British Air..</span></p>\
                            <ul class="route stop0">\
                                <li class="first alternateAirport">SHJ</li>\
                                <li class="last">JFk<em>3</em></li>\
                            </ul>\
                            <p class="arrive">01:20<span class="duration">45h 30m</span></p>\
                            <p class="duration">5h 10m</p>\
                            <a class="more">more</a>\
                            <p class="price"><em>AED</em>21,085</p>\
                            <p class="sell"><a class=" button blue">Book</a></p>\
                        </div>\
                    </li>',
                    '<li class="clickable"> \
                        <div> \
                            <p class="flight"><img src="../../../Resource/Image/Logo/Airline/Large/155.png" alt="" /><span>Aerolineas Argentinas</span></p> \
                            <p class="depart">16:00<span class="airlines">British Air..</span></p> \
                            <ul class="route stop0"> \
                                <li class="first alternateAirport">SHJ</li> \
                                <li class="last">JFk<em>2</em></li> \
                            </ul> \
                            <p class="arrive">01:20<span class="duration">45h 30m</span></p> \
                            <p class="duration">5h 10m</p> \
                            <a class="more">more</a> \
                            <p class="price"><em>AED</em>21,085</p> \
                            <p class="sell"><a class=" button blue">Book</a></p> \
                        </div>\
                    </li>',
                    '<li class="clickable"> \
                        <div> \
                            <p class="flight"><img src="../../../Resource/Image/Logo/Airline/Large/270.png" alt="" /><span>American Airlines <em>6006</em> <em> / </em> <em class="codeShared">1263</em></span></p> \
                            <p class="depart">16:00<span class="airlines">British Air..</span></p> \
                            <ul class="route stop0"> \
                                <li class="first alternateAirport">SHJ</li> \
                                <li class="last">JFk<em>2</em></li>\
                            </ul>\
                            <p class="arrive">01:20<span class="duration">45h 30m</span></p> \
                            <p class="duration">5h 10m</p>\
                            <a class="more">more</a>\
                            <p class="price"><em>AED</em>21,085</p> \
                            <p class="sell"><a class=" button blue">Book</a></p>\
                        </div>\
                    </li>',
                    '<li class="clickable"> \
                        <div> \
                            <p class="flight"><img src="../../../Resource/Image/Logo/Airline/Large/494.png" alt="" /><span>Turkish Airlines</span></p> \
                            <p class="depart">16:00<span class="airlines">British Air..</span></p> \
                            <ul class="route stop0">\
                                <li class="first alternateAirport">SHJ</li>\
                                <li class="last">JFk<em>2</em></li>\
                            </ul>\
                            <p class="arrive">01:20<span class="duration">45h 30m</span></p>\
                            <p class="duration">5h 10m</p>\
                            <a class="more">more</a>\
                            <p class="price"><em>AED</em>21,085</p>\
                            <p class="sell"><a class=" button blue">Book</a></p>\
                        </div>\
                    </li>'
    ]
}