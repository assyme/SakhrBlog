window.RowMultiple = 1;
$(document).ready(function () {
    //start rendering an arrayed json. 
    var elem = $('#resultPanel .flightPanel');
    var flights = aJson.flights;
    var j = 0;
    while (j < window.RowMultiple) {
        for (var i = 0; i < flights.length; i++) {  
            elem.append(flights[i]);
        }
        j++;
    }
    
});

