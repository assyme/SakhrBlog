$(document).ready(function() {
    //start rendering an arrayed json. 
    var elem = $('#resultPanel .flightPanel');
    var flights = aJson.flights;
    var j = 0;
    while (j < 200) {
        for (var i = 0; i < flights.length; i++) { // 4 rows. 
            elem.append(flights[i]);
        }
        j++;
    }
    
});


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