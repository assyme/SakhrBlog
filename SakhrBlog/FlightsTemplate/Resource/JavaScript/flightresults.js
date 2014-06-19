var ms = ms || {}; //ms (musafir) for global namespacing. 

ms.flights = (function() {
    //private helpers
    var renderRow = function (flight) {

        var rowText = '<li class="clickable"> \
                        <div> \
                            <p class="flight"><img src="' + flight.Image.Source + '" alt="' + flight.Image.Alt + '" /><span>' + flight.Name + '</span></p> \
                            <p class="depart">'+ flight.Departure.Time + '<span class="airlines">British Air..</span></p> \
                            <ul class="route stop0"> \
                                <li class="first alternateAirport">'+ flight.Departure.Destination + '</li> \
                                <li class="last">' + flight.Arrival.Destination + '<em>2</em></li> \
                            </ul> \
                            <p class="arrive">'+ flight.Arrival.Time + '<span class="duration">45h 30m</span></p> \
                            <p class="duration">' + flight.Duration + '</p> \
                            <a class="more">more</a> \
                            <p class="price"><em>'+ flight.Price.Currency + '</em>' + flight.Price.Amount + '</p> \
                            <p class="sell"><a class=" button blue">Book</a></p> \
                        </div>\
                    </li>';

        return rowText;
    }



    var flights = function () {
        //constructor
        this.flights = [];
    }

    flights.prototype.init = function() {
        //initialize
        
    }

    flights.prototype.load = function() {
        //function that loads flight json data from server. 
        var $this = this;
        $('#interstitial').show(); // show interstitial. 
        $.ajax({ //ignoring request data parameters for now. 
            url : "FlightResults.aspx/GetFlights",
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/json;charset=utf-8',
            success : function(response) {
                var flightReponse = JSON.parse(response.d);
                //here you could map the flight object with the response we get from server.
                $this.flights = flightReponse.Flights;
                $this.render();
            }
        });
    }

    flights.prototype.render = function() {
        $('#interstitial').hide(); // hide the interstitial
        //start loading flights
        var elem = $('.flightPanel');
        var rowText = "";
        for (var i = 0; i < this.flights.length; i++) {
            rowText += renderRow(this.flights[i]);
        }
        elem.append(rowText);
    }

    return new flights(); // singleton class. I just need one object of this. 
})();

$(document).ready(function() {
    //ideally this should be in a aspx/html page and not here for unit testing purpose. 
    ms.flights.load();
});