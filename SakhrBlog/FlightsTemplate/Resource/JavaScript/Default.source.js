///<summary>Adds an airport bubble to an input field</summary>
///<param name="input">Input element</param>
///<param name="nextElement">Next element</param>

function addAirportBubble(input, mode, nextElement)
{
 var latency = 350;
 var airportBubble = $("#airport");

 input.mode = mode;
 
 if (airportBubble.length < 1)
 {
  createAirportBubble();
 }
 input.attr("autocomplete", "off");
 input.attr("autocorrect", "off");
 if (nextElement != undefined)
 {
  input.nextElement = nextElement;
 }
 input.bind("keyup focus", function(e)
 {
  if (input.lastAirportTimeoutID != undefined)
  {
   clearTimeout(input.lastAirportTimeoutID);
  }
  input.lastAirportTimeoutID = setTimeout(showAirportBubble, latency);
  if ((document.lastAirportInput != undefined) && (document.lastAirportInput != input))
  {
   hideAirportBubble(false);
  }
  document.lastAirportInput = input;
 });
 input.blur(function(e)
 {
  if (document.lastAirportInput != undefined)
  {
   if (!document.lastAirportInput.mouseoverAirportBubble)
   {
    hideAirportBubble(false);
   }
  }
 });
}

///<summary>Adds calendar functionality to an input field</summary>
///<param name="input">Input element</param>
///<param name="nextElement">Next element</param>
///<param name="defaultDate">Function to calculate the default date</param>
///<param name="earliestDate">Function to calculate the earliest date</param>
///<param name="farthestDate">Function to calculate the farthest date</param>

function addCalendarBubble(input, nextElement, defaultDate, earliestDate, farthestDate, onNextElementFocus)
{
 var latency = 350;
 var calendarBubble = $("#calendar");

 if (calendarBubble.length < 1)
 {
  createCalendarBubble();
 }
 input.attr("autocomplete", "off");
 input.attr("autocorrect", "off");
 
 //Set fields to read-only if mobile optimized
 if (isDefined(document.isMobileOptimized))
  input.attr("readonly", true);

 if (formatCalendarInput(input.val()) == "//")
 {
  input.val("");
 }
 input.defaultDate = defaultDate;
 input.earliestDate = earliestDate;
 input.farthestDate = farthestDate;
 if (nextElement != undefined)
 {
  input.nextElement = nextElement;
  if (onNextElementFocus != undefined)
  {
   input.onNextElementFocus = onNextElementFocus;
  }
 }
 input.bind("keyup focus", function(e)
 {
  if (input.lastCalendarTimeoutID != undefined)
  {
   clearTimeout(input.lastCalendarTimeoutID);
  }
  input.lastCalendarTimeoutID = setTimeout(showCalendarBubble, latency);
  if ((document.lastCalendarInput != undefined) && (document.lastCalendarInput != input))
  {
   hideCalendarBubble(false);
  }
  document.lastCalendarInput = input;
 });
 input.blur(function(e)
 {
  if (document.lastCalendarInput != undefined)
  {
   if (!document.lastCalendarInput.mouseoverCalendarBubble)
   {
    hideCalendarBubble(false);
   }
  }
 });
}

///<summary>Adds the specified number of days to a given date</summary>
///<param name="date">Given date</param>
///<param name="days">Days to add</param>

function addDays(date, days)
{
 var millisecondsInDay = 86400000;
 var addedDate = new Date();
 addedDate.setTime(date.valueOf() + (days * millisecondsInDay));
 return addedDate;
}

///<summary>Adds the specified number of hours to a given date</summary>
///<param name="date">Given date</param>
///<param name="hours">HOurs to add</param>

function addHours(date, hours)
{
 var millisecondsInHour = 3600000;
 var addedDate = new Date();
 addedDate.setTime(date.valueOf() + (hours * millisecondsInHour));
 return addedDate;
}

///<summary>Adds airport resolution functionality to an input field</summary>
///<param name="input">Input element</param>

function addAirportResolutionBubble(input)
{
 $(document).ready(function()
 {
  addAirportBubble(input, 1, undefined);
 });
}

///<summary>Adds hotel location resolution functionality to an input field</summary>
///<param name="input">Input element</param>

function addHotelLocationBubble(input)
{
 $(document).ready(function()
 {
  addAirportBubble(input, 2, undefined);
 });
}

///<summary>Adds organization resolution functionality to an input field</summary>
///<param name="input">Input element</param>
///<param name="isActiveOnly">Include active only</param>

function addOrganizationBubble(input, isActiveOnly)
{
 $(document).ready(function()
 {
  if(isActiveOnly == true)
   addAirportBubble(input, 4, undefined);
  else
   addAirportBubble(input, 5, undefined);
 });
}

///<summary>Adds airline resolution functionality to an input field</summary>
///<param name="input">Input element</param>

function addAirlineBubble(input, isActiveOnly)
{
 $(document).ready(function()
 {
  addAirportBubble(input, 6, undefined);
 });
}

///<summary>Adds city resolution functionality to an input field</summary>
///<param name="input">Input element</param>

function addCityBubble(input, isActiveOnly)
{
 $(document).ready(function()
 {
  addAirportBubble(input, 7, undefined);
 });
}

///<summary>Creates a new airport bubble</summary>

function createAirportBubble()
{
 var airportBubbleMarkup = "<div id=\"airport\"><div class=\"title\"><h3>Did you mean</h3><a class=\"close\"></a></div><ul></ul></div><iframe id=\"airportMask\" src=\"javascript:false\" />";
 var airportBubble;
 var airportBubbleClose;
 
 $("body").append(airportBubbleMarkup);
 airportBubble = $("#airport");
 airportBubbleClose = airportBubble.find(".close");
 airportBubble.mouseover(function(e)
 {
  document.lastAirportInput.mouseoverAirportBubble = true;
 });
 airportBubble.mouseout(function(e)
 {
  document.lastAirportInput.mouseoverAirportBubble = false;
 });
 airportBubble.click(function(e)
 {
  document.lastAirportInput.focus();
 });
 airportBubbleClose.click(function(e)
 {
  document.lastAirportInput.focus();
  hideAirportBubble(true);
  preventEventPropagation(e);
 });
 document.airportBubbleOnKeyDownListener = function(e)
 {
  var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
  var enter = 13;
  var tab = 9;
  var escape = 27;
  var upArrow = 38;
  var downArrow = 40;
  switch (key)
  {
   case upArrow:
   case downArrow:
    return false;
    break;
   case enter:
    break;
   case tab:
    var airportListSelectedItem = airportBubble.find("li.active");
    airportListSelectedItem.trigger("click");
    return false;
    break;
   case escape:
    airportBubbleClose.trigger("click");
    return false;
  }
 };
 document.isAirportBubbleOnKeyDownListenerRunning = false;
 document.lastAirportBubbleDataRequest = undefined;
}

///<summary>Creates a new calendar bubble</summary>

function createCalendarBubble()
{
 var calendarBubbleMarkup = "<div id=\"calendar\"><div class=\"month current\"><div class=\"title\"><h3></h3><a class=\"back\">back</a><a class=\"close\">close</a><a class=\"forward\">forward</a></div><ul class=\"days\"><li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li class=\"weekend\">F</li><li class=\"weekend\">S</li></ul><ul class=\"dates\"></ul></div></div><iframe id=\"calendarMask\" src=\"javascript:false\" />";
 var calendarBubble;
 var calendarBubbleClose;
 var calendarBubbleBackMonth;
 var calendarBubbleForwardMonth;

 $("body").append(calendarBubbleMarkup);
 calendarBubble = $("#calendar");
 calendarBubbleClose = calendarBubble.find(".close");
 calendarBubbleBackMonth = calendarBubble.find(".back");
 calendarBubbleForwardMonth = calendarBubble.find(".forward");
 calendarBubble.mouseover(function(e)
 {
  document.lastCalendarInput.mouseoverCalendarBubble = true;
 });
 calendarBubble.mouseout(function(e)
 {
  document.lastCalendarInput.mouseoverCalendarBubble = false;
 });
 calendarBubble.click(function(e)
 {
  document.lastCalendarInput.focus();
 });
 calendarBubbleClose.click(function(e)
 {
  document.lastCalendarInput.focus();
  hideCalendarBubble(true);
  preventEventPropagation(e);
 });
 calendarBubbleBackMonth.click(function(e)
 {
  var defaultDate = new Date(document.lastCalendarInput.calendarDefaultDate);
  var earliestDate = new Date(document.lastCalendarInput.calendarEarliestDate);
  var farthestDate = new Date(document.lastCalendarInput.calendarFarthestDate);
  var currentMonth = new Date(document.lastCalendarInput.calendarCurrentMonth);
  var previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  renderCalendarBubble(defaultDate, earliestDate, farthestDate, previousMonth);
  document.lastCalendarInput.focus();
  preventEventPropagation(e);
 });
 calendarBubbleForwardMonth.click(function(e)
 {
  var defaultDate = new Date(document.lastCalendarInput.calendarDefaultDate);
  var earliestDate = new Date(document.lastCalendarInput.calendarEarliestDate);
  var farthestDate = new Date(document.lastCalendarInput.calendarFarthestDate);
  var currentMonth = new Date(document.lastCalendarInput.calendarCurrentMonth);
  var nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  renderCalendarBubble(defaultDate, earliestDate, farthestDate, nextMonth);
  document.lastCalendarInput.focus();
  preventEventPropagation(e);
 });
 document.calendarBubbleOnKeyDownListener = function(e)
 {
  var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
  var enter = 13;
  var escape = 27;
  switch (key)
  {
   case enter:
    return false;
    break;
   case escape:
    calendarBubbleClose.trigger("click");
    return false;
  }
 };
 document.isCalendarBubbleOnKeyDownListenerRunning = false;

 //Assign swipe functionality
 calendarBubble.bind("swipeleft", function(e)
 {
  $(this).find(".forward:not(.hidden)").trigger("click");
 });
 calendarBubble.bind("swiperight", function(e)
 {
  $(this).find(".back:not(.hidden)").trigger("click");
 });
}

///<summary>Displays a centered createPopup window</summary>
///<param name="url">URL of the page in the createPopup</param>
///<param name="name">Name of the createPopup</param>
///<param name="width">Width of the createPopup</param>
///<param name="height">Height of the createPopup</param>

function createPopup(url, name, width, height, resizable)
{
 var left = (screen.width) ? ((screen.width - width) / 2) : 0;
 var top = (screen.height) ? ((screen.height - height) / 2) : 0;
 var features = "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",scrollbars=yes,location=yes,directories=no,status=yes,menubar=no,toolbar=no,resizable=" + (resizable ? "yes" : "no");
 var popup;
 try
 {
  popup = window.open(url, name, features);
 }
 catch(exceptionObject)
 {
  alert("Your computer seems to be blocking this popup.\n\nPlease enable popups and try to click this link again.");
 }
 try
 {
  popup.window.focus();
 }
 catch(exceptionObject)
 {
 }
}

///<summary>Returns the number of days between two dates</summary>
///<param name="date1">First date</param>
///<param name="date2">Second date</param>

function daysInBetween(date1, date2)
{
 var millisecondsInDay = 86400000;
 return (Math.floor(date2 / millisecondsInDay) - Math.floor(date1 / millisecondsInDay));
}

///<summary>Returns the number of days in a month</summary>
///<param name="month">Requested month</param>
///<returns type="number">Number of days</returns>

function daysInMonth(month)
{
 var monthIndex = month.getMonth();
 var year = month.getFullYear();
 if (monthIndex == 0 || monthIndex == 2 || monthIndex == 4 || monthIndex == 6 || monthIndex == 7 || monthIndex == 9 || monthIndex == 11)
 {
  return 31;
 }
 else if (monthIndex == 1)
 {
  if (((year % 4) == 0) && (((year % 100) != 0) || (year % 400 == 0)))
  {
   return 29;
  }
  else
  {
   return 28;
  }
 }
 else
 {
  return 30;
 }
}

///<summary>Emphasizes a keyword in a phrase</summary>
///<param name="phrase">Phrase to search in</param>
///<param name="keyword">Keyword to emphasize</param>
///<returns type="string">Emphasized phrase</returns>

function emphasizeKeyword(phrase, keyword)
{
 var emphasizedPhrase = "";
 var lastIndex = 0;
 var currentIndex = 0;
 var lowerCaseKeyword = keyword.toLowerCase();
 var lowerCasePhrase = phrase.toLowerCase();

 while (lastIndex < phrase.length)
 {
  currentIndex = lowerCasePhrase.indexOf(lowerCaseKeyword, lastIndex);
  if (currentIndex < 0)
  {
   emphasizedPhrase += phrase.substr(lastIndex);
   lastIndex = phrase.length;
  }
  else
  {
   emphasizedPhrase += phrase.substring(lastIndex, currentIndex) + "<em>" + phrase.substr(currentIndex, keyword.length) + "</em>";
   lastIndex = currentIndex + keyword.length;
  }
 }
 return emphasizedPhrase;
}

///<summary>Focuses on the default input field</summary>

function focusDefaultInput()
{
 window.focus();
 $(".text:not(.tabInaccessible):first").focus();
}

///<summary>Converts minutes to hh mm</summary>
///<param name="timeInMinutes">Number of minutes</param>
///<returns type="string">hh mm formatted string</returns>

function formatDuration(timeInMinutes)
{
 var minutesInHour = 60;
 var hours = Math.floor(timeInMinutes / minutesInHour);
 var minutes = timeInMinutes % minutesInHour;
 
 return hours + "h " + minutes + "m";
}

///<summary>Converts minutes to hh:mm</summary>
///<param name="timeInMinutes">Number of minutes</param>
///<returns type="string">hh:mm formatted string</returns>

function formatTime(timeInMinutes)
{
 var minutesInHour = 60;
 var hoursInDay = 24;
 var hours = Math.floor(timeInMinutes / minutesInHour);
 var minutes = timeInMinutes % minutesInHour;
 
 return ((hours >= hoursInDay) ? "23:59" : hours + ":" + ((minutes > 9) ? minutes : ("0" + minutes)));
}

///<summary>Trims or pads the left-hand-side of an input value to meet a specified string length</summary>
///<param name="value">Input value</param>
///<param name="length">Length to be padded</param>
///<param name="pad">Padding character</param>
///<returns type="string">Padded string</returns>

function fixedLength(value, length, padCharacter)
{
 var fixedLengthString = value.toString();
 if (fixedLengthString.length < length)
 {
  while (fixedLengthString.length < length)
  {
   fixedLengthString = padCharacter + fixedLengthString;
  }
 }
 else if (fixedLengthString.length > length)
 {
  fixedLengthString = fixedLengthString.substr(fixedLengthString.length - length);
 }
 return fixedLengthString;
}

///<summary>Formats the input value for the airport bubble</summary>
///<param name="value">The input value</param>
///<returns type="string">Formatted value</returns>

function formatAirportBubbleInput(value)
{
 return value.replace(/\s+/g, " ").replace(/^\s+/g, "").replace(/\s+$/g, "");
}

///<summary>Formats the input value for the calendar bubble</summary>
///<param name="value">The input value</param>
///<returns type="string">Formatted value</returns>

function formatCalendarInput(value)
{
 return value.replace(/[^0-9\/]/g, "");
}

///<summary>Returns all the content text inside an element</summary>
///<param name="element">Element</param>
///<returns type="string">Content text</returns>

function getContentText(element)
{
 var contentText = "";
 var childElement = element.contents();
 var currentChildElement;

 for (var i = 0; i < childElement.length; i++)
 {
  currentChildElement = $(childElement[i]);
  contentText = contentText + currentChildElement.text() + currentChildElement.val();
 }
 
 return contentText;
}

///<summary>Sets up expandable content</summary>

function getExpandableTargetElementID()
{
}


///<summary>Hides the airport bubble</summary>
///<param name="temporary">Whether the airport bubble should be temporarily hidden</param>

function hideAirportBubble(temporary)
{
 var airportBubble = $("#airport");
 var airportMask = $("#airportMask");

 if (document.lastAirportBubbleDataRequest != undefined)
 {
  document.lastAirportBubbleDataRequest.abort();
 }
 if (document.isAirportBubbleOnKeyDownListenerRunning)
 {
  $(document).unbind("keydown", document.airportBubbleOnKeyDownListener);
  document.isAirportBubbleOnKeyDownListenerRunning = false;
 }
 if (temporary != undefined)
 {
  if (document.lastAirportInput.lastAirportTimeoutID != undefined)
  {
   clearTimeout(document.lastAirportInput.lastAirportTimeoutID);
  }
  delete document.lastAirportInput.lastAirportTimeoutID;
  $.keynav.reset();
  if (temporary == false)
  {
   delete document.lastAirportInput.lastKeyword;
  }
  else
  {
   document.lastAirportInput.lastKeyword = formatAirportBubbleInput(document.lastAirportInput.val());
  }
 }
 airportBubble.hide();
 airportMask.css("display", "none");
}

///<summary>Hides the calendar bubble</summary>
///<param name="temporary">Whether the calendar bubble should be temporarily hidden</param>

function hideCalendarBubble(temporary)
{
 var calendarBubble = $("#calendar");
 var calendarMask = $("#calendarMask");
 if (document.isCalendarBubbleOnKeyDownListenerRunning)
 {
  $(document).unbind("keydown", document.calendarBubbleOnKeyDownListener);
  document.isCalendarBubbleOnKeyDownListenerRunning = false;
 }
 if (temporary != undefined)
 {
  if (document.lastCalendarInput.lastCalendarTimeoutID != undefined)
  {
   clearTimeout(document.lastCalendarInput.lastCalendarTimeoutID);
  }
  delete document.lastCalendarInput.lastCalendarTimeoutID;
  $.keynav.reset();
  if (temporary == false)
  {
   delete document.lastCalendarInput.lastDate;
  }
  else
  {
   document.lastCalendarInput.lastDate = formatCalendarInput(document.lastCalendarInput.val());
  }
 }
 setTimeout(function(e)
 {
  calendarBubble.hide();
  calendarMask.css("display", "none");
 }, 25);
}

///<summary>Hides a modal element</summary>
///<param name="modalElement">Modal element</param>

function hideModal(modalElement)
{
 var modalBackground = $("#modalBackground");
 var modalTransitionTime = 250;

 modalBackground.unbind("click");
 modalBackground.fadeOut(modalTransitionTime);
 modalElement.fadeOut(modalTransitionTime);
}

///<summary>Initializes functionality for the build your trip form</summary>
///<param name="referenceUTCDateTime">The UTC time at the server</param>
///<param name="earliestTimeZonePrecedingUTC">The earliest time zone behind UTC</param>
///<param name="earliestDateDeltaHours">The number of hours to the earliest bookable flight</param>
///<param name="farthestDateDeltaDays">The number of days to the farthest bookable flight</param>
///<param name="automateFlow">Indicates whether the flow of the form should be automated</param>

function initializeBuildYourTrip(referenceUTCDateTime, earliestTimeZonePrecedingUTC, earliestDateDeltaHours, farthestDateDeltaDays, automateFlow)
{
 var build = $(".build");
 document.referenceUTCDateTime = referenceUTCDateTime;
 document.earliestTimeZonePrecedingUTC = earliestTimeZonePrecedingUTC;
 document.earliestDateDeltaHours = earliestDateDeltaHours;
 document.farthestDateDeltaDays = farthestDateDeltaDays;

 $(document).ready(function()
 {
  if (automateFlow)
  {
   $(".build .origin input").focus();
  }
  if (build.length > 0)
  {
   var startDate = build.find(".start input:text");
   var end = build.find(".end");
   var endDate = end.find("input:text");
   var tripType = build.find(".tripType");
   var flightType = build.find(".flightType");
   var direct = build.find(".direct");
   var origin = build.find(".origin input:text");
   var destination = build.find(".destination input:text");
   var hotelLocation = build.find(".hotelLocation input:text");
   var organization = build.find(".organization input:text");
   var airline = build.find(".airline input:text");
   var city = build.find(".city input:text");
   var search = build.find(".action input:submit");
   var inputLabel = build.find("label[for]");
   var flightsOnly = "1";
   var hotelsOnly = "2";
   var flightsPlusHotels = "3";
   var roundTrip = "1";
   var oneWay = "0";
   var multiCity = "4";
   var input = "input";
   var defaultEarliestDate = truncateTime(addHours(document.referenceUTCDateTime, document.earliestDateDeltaHours + document.earliestTimeZonePrecedingUTC));
   var defaultFarthestDate = truncateTime(addHours(addDays(document.referenceUTCDateTime, document.farthestDateDeltaDays), document.earliestTimeZonePrecedingUTC));

   var tripTypeValue = tripType.find("input:checked").val();
   var airportsOnly = 1;
   var hotelLocations = 2;
   var airportCityPairs = 3;
   var organizations = 4;
   var airlines = 6;
   var cities = 7;

   var isTripTypePrimaryNavigationLinked = ($("#panorama #build").length == 1);
   var primaryNavigation = $("#primaryNavigation");
   var primaryNavigationTab = primaryNavigation.find("li");
   var primaryNavigationFlightsOnly = primaryNavigation.find(".flight");
   var primaryNavigationHotelsOnly = primaryNavigation.find(".hotel");
   var primaryNavigationFlightsPlusHotels = primaryNavigation.find(".package");

   addAirportBubble(origin, airportsOnly, (automateFlow ? destination : undefined));
   addAirportBubble(destination, (tripTypeValue == flightsPlusHotels ? airportCityPairs : airportsOnly), (automateFlow ? (((startDate.length > 0) && (endDate.length > 0)) ? startDate : search) : undefined));
   addAirportBubble(hotelLocation, hotelLocations, (automateFlow ? (((startDate.length > 0) && (endDate.length > 0)) ? startDate : search) : undefined));
   addAirportBubble(organization, organizations, (automateFlow ? search : undefined));
   addAirportBubble(airline, airlines, (automateFlow ? search : undefined));
   addAirportBubble(city, cities, (automateFlow ? search : undefined));
   if ((startDate.length > 0) && (endDate.length > 0))
   {
    addCalendarBubble
    (
     startDate,
     (automateFlow ? endDate : undefined),
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultFarthestDate;
     }
    );
    addCalendarBubble
    (
     endDate,
     (automateFlow ? search : undefined),
     function()
     {
      var defaultDate = parseDate(formatCalendarInput(startDate.val()));
      if (defaultDate != null)
       defaultDate = addDays(defaultDate, 1);
      if ((defaultDate < defaultEarliestDate) || (defaultDate > defaultFarthestDate))
      {
       defaultDate = defaultEarliestDate;
      }
      return defaultDate;
     },
     function()
     {
      var earliestDate = parseDate(formatCalendarInput(startDate.val()));
      if ((earliestDate < defaultEarliestDate) || (earliestDate > defaultFarthestDate))
      {
       earliestDate = defaultEarliestDate;
      }
     return earliestDate;
     },
     function()
     {
      return addHours(addDays(document.referenceUTCDateTime, document.farthestDateDeltaDays), document.earliestTimeZonePrecedingUTC);
     }
    );
   }
   var dateFields = $(".multiCity .origin1 input:text");
   if (dateFields.length > 0)
   {
    var origin1 = $(".multiCity .origin1 input:text");
    var destination1 = $(".multiCity .destination1 input:text");
    var start1 = $(".multiCity .start1 input:text");
    var origin2 = $(".multiCity .origin2 input:text");
    var destination2 = $(".multiCity .destination2 input:text");
    var start2 = $(".multiCity .start2 input:text");
    var origin3 = $(".multiCity .origin3 input:text");
    var destination3 = $(".multiCity .destination3 input:text");
    var start3 = $(".multiCity .start3 input:text");

    addAirportBubble(origin1, airportsOnly, (automateFlow ? destination1 : undefined));
    addAirportBubble(destination1, (tripTypeValue == flightsPlusHotels ? airportCityPairs : airportsOnly), (automateFlow ? start1 : undefined));
    addAirportBubble(origin2, airportsOnly, (automateFlow ? destination2 : undefined));
    addAirportBubble(destination2, (tripTypeValue == flightsPlusHotels ? airportCityPairs : airportsOnly), (automateFlow ? start2 : undefined));
    addAirportBubble(origin3, airportsOnly, (automateFlow ? destination3 : undefined));
    addAirportBubble(destination3, (tripTypeValue == flightsPlusHotels ? airportCityPairs : airportsOnly), (automateFlow ? start3 : undefined));

    addCalendarBubble
    (
     start1,
     (automateFlow ? destination2 : undefined),
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultFarthestDate;
     },
     function()
     {
      if (origin2.val() == "" && destination1.val() != "")
      {
       origin2.val(destination1.val());
      }
     }
    );
    addCalendarBubble
    (
     start2,
     (automateFlow ? destination3 : undefined),
     function()
     {
      var defaultDate = parseDate(formatCalendarInput(start1.val()));
      if ((defaultDate < defaultEarliestDate) || (defaultDate > defaultFarthestDate))
      {
       defaultDate = defaultEarliestDate;
      }
      return defaultDate;
     },
     function()
     {
      var earliestDate = parseDate(formatCalendarInput(start1.val()));
      if ((earliestDate < defaultEarliestDate) || (earliestDate > defaultFarthestDate))
      {
       earliestDate = defaultEarliestDate;
      }
     return earliestDate;
     },
     function()
     {
      return addHours(addDays(document.referenceUTCDateTime, document.farthestDateDeltaDays), document.earliestTimeZonePrecedingUTC);
     },
     function()
     {
      if (origin3.val() == "" && destination2.val() != "")
      {
       origin3.val(destination2.val());
      }
     }
    );
    addCalendarBubble
    (
     start3,
     (automateFlow ? search : undefined),
     function()
     {
      var defaultDate = parseDate(formatCalendarInput(start2.val()));
      if ((defaultDate < defaultEarliestDate) || (defaultDate > defaultFarthestDate))
      {
       defaultDate = defaultEarliestDate;
      }
      return defaultDate;
     },
     function()
     {
      var earliestDate = parseDate(formatCalendarInput(start2.val()));
      if ((earliestDate < defaultEarliestDate) || (earliestDate > defaultFarthestDate))
      {
       earliestDate = defaultEarliestDate;
      }
     return earliestDate;
     },
     function()
     {
      return addHours(addDays(document.referenceUTCDateTime, document.farthestDateDeltaDays), document.earliestTimeZonePrecedingUTC);
     }
    );
   }
   
   setChoiceHighlighting(tripType);
   setChoiceHighlighting(flightType);
   setChoiceHighlighting(direct);

   tripType.find(input).bind("click", function(e)
   {
     build.setupBuildTripFields();
   });

   build.find(".rooms select").bind("change", function(e)
   {
    build.setupRoomTypeDropdowns();
   });

   build.find(".travelers select").bind("change", function(e)
   {
    build.setupRoomTypeDropdowns();
   });

   flightType.find(input).bind("click", function(e)
   {
    build.setupBuildTripFields();
   });

   $(".moreFlights a.show").bind("click", function(e)
   {
    if ($(".multiCity:hidden").length > 0)
    {
     $(".multiCity:hidden").eq(0).removeClass("hidden");
     if ($(".multiCity:hidden").length == 0)
     {
      $(this).addClass("hidden");
      $(this).parent().find(".evenMore").show();
     }
    }
   });

   // Show all form elements hidden by CSS
   build.find(".hidden:not(.tripType):not(.toggleVisibility):not(#advancedBuild)").removeClass("hidden");

   //Trigger radio buttons and checkboxes from their labels
   inputLabel.bind("click", function(e)
   {
    $($(this).attr("for")).prop("checked", true).trigger("click");
   });
   
   // Link primary navigation to TripType on home page
   if (isTripTypePrimaryNavigationLinked)
   {
    primaryNavigationFlightsOnly.bind("click", function(e)
    {
     tripType.find("input[value=" + flightsOnly + "]").prop("checked", true).trigger("click");
     preventEventPropagation(e);
    });
    primaryNavigationHotelsOnly.bind("click", function(e)
    {
     tripType.find("input[value=" + hotelsOnly + "]").prop("checked", true).trigger("click");
     preventEventPropagation(e);
    });
    primaryNavigationFlightsPlusHotels.bind("click", function(e)
    {
     tripType.find("input[value=" + flightsPlusHotels + "]").prop("checked", true).trigger("click");
     preventEventPropagation(e);
    });
   }
   
   // Setup build trip fields on first run and on subsequent refresh
   build.setupBuildTripFields = function()
   {
    var tripTypes = ["flightsOnly", "hotelsOnly", "flightsPlusHotels"];
    var flightTypes = ["oneWay", "roundTrip", "", "","multiCity"];

    var selectedTripType = tripType.find("input:checked").val();
    var selectedFlightType = flightType.find("input:checked").val();
    
    // remove to allow F+H multicity searches
    if (tripTypes[selectedTripType-1] == "flightsPlusHotels")
    {
     flightType.find("input").val(["1"]);
     flightType.find("label").removeClass("checked");
     flightType.find("input:checked+label").addClass("checked");
     selectedFlightType = flightType.find("input:checked").val();
    }
    
    build.find(".flightType,.multiCity,.origin,.destination,.hotelLocation,.start,.end,.cabinClass,.direct,.hotelBudget,.rooms,.travelers,.roomTypes,.airline,.action .more").removeClass("hidden").removeClass("toggleShown");
    
    build.find(".optional,#advancedBuild:not(.visible)").addClass("hidden");
    //build.find("#advancedBuild.visible").removeClass("visible");
    
    build.find("[class*='" + tripTypes[selectedTripType-1] + "_all']" ).removeClass("hidden");
    build.find("[class*='" + tripTypes[selectedTripType-1] + "_" + flightTypes[selectedFlightType] + "']" ).removeClass("hidden");

    build.find(".start").removeClass("alone");
    
    if (isTripTypePrimaryNavigationLinked)
     primaryNavigationTab.removeClass("selected");
    
    var fieldsToHide = new Array();
    switch(selectedTripType)
    {
     case flightsOnly:
      fieldsToHide.push(".hotelLocation");
      fieldsToHide.push(".hotelBudget");
      fieldsToHide.push(".rooms");
      fieldsToHide.push(".roomTypes");
      if (selectedFlightType == oneWay)
      {
       fieldsToHide.push(".end");
       build.find(".start").addClass("alone");
       startDate.nextElement = search;
      }
      else if (selectedFlightType == multiCity)
      {
       fieldsToHide.push(".origin");
       fieldsToHide.push(".destination");
       fieldsToHide.push(".start");
       fieldsToHide.push(".end");
      }
      else
      {
       startDate.nextElement = endDate;
      }
      destination.mode = airportsOnly;
      if (isTripTypePrimaryNavigationLinked)
       primaryNavigationFlightsOnly.addClass("selected");
      break;
     case hotelsOnly:
      fieldsToHide.push(".flightType");
      fieldsToHide.push(".origin");
      fieldsToHide.push(".destination");
      fieldsToHide.push(".cabinClass");
      fieldsToHide.push(".direct");
      fieldsToHide.push(".airline");
      fieldsToHide.push(".action .more");
      startDate.nextElement = endDate;
      if (isTripTypePrimaryNavigationLinked)
       primaryNavigationHotelsOnly.addClass("selected");
      break;
     case flightsPlusHotels:
      fieldsToHide.push(".flightType");
      if (hotelLocation.val() == "")
       fieldsToHide.push(".hotelLocation");
      destination.mode = airportCityPairs;
      startDate.nextElement = endDate;
      if (isTripTypePrimaryNavigationLinked)
       primaryNavigationFlightsPlusHotels.addClass("selected");
      break;
    }
    
    if (fieldsToHide.length > 0)
    {
     build.find(fieldsToHide.join(",")).addClass("hidden");
    }
    
    build.setupRoomTypeDropdowns();
   };
   
   // Setup the number of room type dropdowns
   build.setupRoomTypeDropdowns = function()
   {
    var selectedTripType = tripType.find("input:checked").val();
    if (selectedTripType != hotelsOnly && selectedTripType != flightsPlusHotels)
    {
     build.find(".roomTypes").addClass("hidden");
     return;
    }
    var rooms = build.find(".rooms select").val();
    var adults = build.find(".adults select").val();
    var children = build.find(".children select").val();
    var infants = build.find(".infants select").val();
    
    if ((rooms == 1 || rooms == undefined)
     && (adults == 1 || adults == undefined)
     && (children == 0 || children == undefined)
     && (infants == 0 || infants  == undefined))
    {
     build.find(".roomTypes").addClass("hidden");
     build.find(".roomTypes .roomType select.roomType1 option:first-child").prop("selected", "selected");
    }
    else
    {
     build.find(".roomTypes").removeClass("hidden");
     build.find(".roomTypes .roomType").addClass("hidden");
     build.find(".roomTypes span").removeClass("row1");
     build.find(".roomTypes span").removeClass("row2");
     
     var rows = Math.floor((rooms-1)/3) + 1;
     if(rows < 3)
     {
      build.find(".roomTypes span").addClass("row" + rows);
     }
     
     for (var roomNumber = 1; roomNumber <= rooms; roomNumber++)
     {
         build.find(".roomType" + roomNumber).parent().removeClass("hidden");
     }
    }
   };
   
   build.setupBuildTripFields();
   build.setupRoomTypeDropdowns();
   
  }
 });
}

///<summary>Initializes functionality for flight filters</summary>
///<param name="numberFormat">Number format string</param>
///<param name="locale">Two-character ISO country code</param>

function initializeFlightFilter(numberFormat, locale)
{
 $(document).ready(function()
 {
  var filter = $("#filter");

  var airlineAndCabinClass = "";
  var airlineFilter = filter.find(".airline li");
  var airlineFilterCheckbox = filter.find(".airline input");
  var airlineFilterCheckedCheckbox = filter.find(".airline input:checked");
  var airlineFilterMore = filter.find(".airline a.more");
  var arrivalFilterLabel = filter.find(".arrival legend, .arrives legend");
  var arrivalFilterMaximum = 1440;
  var arrivalFilterMinimum = 0;
  var arrivalFilterSlider = filter.find(".arrival div, .arrives div");
  var cheaperResultsMessage = $("#cheaperResultsMessage");
  var cheaperResultsMessageMore = cheaperResultsMessage.find("a.more");
  var dataFormatTime = 0;
  var dataFormatDuration = 1;
  var dataFormatAmount = 2;
  var departureFilterLabel = filter.find(".departure legend, .departs legend");
  var departureFilterMaximum = 1440;
  var departureFilterMinimum = 0;
  var departureFilterSlider = filter.find(".departure div, .departs div");
  var durationFilter = filter.find(".duration");
  var durationFilterLabel = durationFilter.find("legend");
  var durationFilterMaximum;
  var durationFilterMinimum;
  var durationFilterSlider = durationFilter.find("div");
  var filterCheckbox = filter.find("input:checkbox");
  var flight = $("#contentPanel table.listing > tbody > tr");
  var granularity = 10;
  var maximumAirlineFilters = 8;
  var maximumStops;
  var maximumSupportedStops = 2;
  var noResultsMessageMore = $("#noResultsMessage a.more");
  var priceDisplayMode = Number($("#priceDisplayMode select").val());
  var priceFilter = filter.find(".price");
  var priceFilterLabel = priceFilter.find("legend");
  var priceFilterMaximum;
  var priceFilterMinimum;
  var priceFilterSlider = priceFilter.find("div");
  var refundableIndicator = "R";
  var stopsFilterCheckbox = filter.find(".stops input");
  var stopsElement;
  
  //Optimize filters
  if ((airlineFilter.length > maximumAirlineFilters) && (airlineFilterCheckedCheckbox.length == 0))
  {
   for (var i = maximumAirlineFilters; i < airlineFilter.length; i++)
   {
    $(airlineFilter[i]).hide();
   }
   airlineFilterMore.removeClass("invisible");
   airlineFilterMore.bind("click", showFlightAllAirlineFilters);
  }

  //Aggregate filters
  flight.each(function()
  {
   //Aggregate departure, arrival and duration
   this.departure = parseMinutes($(this).find("td.details > table > tbody > tr > td.departure > p").first().text());
   this.arrival = parseMinutes($(this).find("td.details > table > tbody > tr > td.arrival > p").last().text());
   this.duration = parseMinutes($(this).find("td.details > table > tbody > tr > td.duration > p").first().text());
   if (isDefined(durationFilterMinimum))
   {
    durationFilterMinimum = Math.min(durationFilterMinimum, this.duration);
    durationFilterMaximum = Math.max(durationFilterMaximum, this.duration);
   }
   else
   {
    durationFilterMinimum = this.duration;
    durationFilterMaximum = this.duration;
   }
   
   //Aggregate price based on the optional priceDisplayMode
   if (isDefinedAndNotNull(priceDisplayMode))
   {
    this.grossPrice = parseAmount($(this).find("td.sell p.price span.gross").text());
    this.netPrice = parseAmount($(this).find("td.sell p.price span.net").text());
    if ((priceDisplayMode == 2) || (priceDisplayMode == 4))
     this.price = this.grossPrice;
    else
     this.price = this.netPrice;
   }
   else
   {
    this.price = parseAmount($(this).find("td.sell p.price").text());
   }
   if (isDefined(priceFilterMinimum))
   {
    priceFilterMinimum = Math.min(priceFilterMinimum, this.price);
    priceFilterMaximum = Math.max(priceFilterMaximum, this.price);
   }
   else
   {
    priceFilterMinimum = this.price;
    priceFilterMaximum = this.price;
   }
   
   //Aggregate stops
   maximumStops = 0;
   $(this).find("td.details > table > tbody > tr").each(function()
   {
    stopsElement = $(this).find("td.flights > p");
    if (stopsElement.length == 1)
    {
     maximumStops = Math.max(maximumStops, Number($(stopsElement[0]).attr("title")));
     $(stopsElement[0]).attr("title", "");
    }
   });
   maximumStops = Math.min(maximumSupportedStops, maximumStops);
   this.stops = maximumStops.toString();

   //Aggregate refundability
   this.refundable = ($(this).find("td.sell > p.restrictiveRules").length == 0) ? refundableIndicator : "";

   //Aggregate airlines and cabin classes
   airlineAndCabinClass = "";
   $(this).find("td.details > table > tbody > tr > td.flights > ul > li").each(function()
   {
    airlineAndCabinClass = airlineAndCabinClass + jQuery.trim($(this).attr("title")) + ",";
    $(this).attr("title", "");
   });
   if (airlineAndCabinClass.length > 0)
   {
    this.airlineAndCabinClass = airlineAndCabinClass.substr(0, airlineAndCabinClass.length - 1);
   }
  });

  //Prepare and optimize filter data
  cheaperResultsMessage.find("em").append($.formatNumber(priceFilterMinimum, {format:numberFormat, locale:locale}));
  if (durationFilterMinimum == durationFilterMaximum)
   durationFilter.addClass("invisible");
  durationFilterMinimum = Math.floor(durationFilterMinimum / granularity) * granularity;
  durationFilterMaximum = Math.ceil(durationFilterMaximum / granularity) * granularity;
  if (priceFilterMinimum == priceFilterMaximum)
   priceFilter.addClass("invisible");
  priceFilterSlider[0].minimum = priceFilterMinimum;
  priceFilterMinimum = Math.floor(priceFilterMinimum / granularity) * granularity;
  priceFilterMaximum = Math.ceil(priceFilterMaximum / granularity) * granularity;
  filterCheckbox.each(function()
  {
   this.value = jQuery.trim(this.value);
  });

  //Render the departure, arrival and duration sliders
  renderSlider(departureFilterSlider, departureFilterLabel, departureFilterMinimum, departureFilterMaximum, onChangeFlightFilter, dataFormatTime, numberFormat, locale);
  renderSlider(arrivalFilterSlider, arrivalFilterLabel, arrivalFilterMinimum, arrivalFilterMaximum, onChangeFlightFilter, dataFormatTime, numberFormat, locale);
  renderSlider(durationFilterSlider, durationFilterLabel, durationFilterMinimum, durationFilterMaximum, onChangeFlightFilter, dataFormatDuration, numberFormat, locale);

  //Render the price slider if priceDisplayMode is not available else remove it
  if (!isDefinedAndNotNull(priceDisplayMode))
   renderSlider(priceFilterSlider, priceFilterLabel, priceFilterMinimum, priceFilterMaximum, onChangeFlightFilter, dataFormatAmount, numberFormat, locale);
  else
   priceFilter.remove();

  //Attach event handlers
  filterCheckbox.bind("change", onChangeFlightFilter);
  airlineFilterCheckbox.bind("change", function(e)
  {
   showFlightAllAirlineFilters();
  });
  cheaperResultsMessageMore.bind("click", resetFlightFilters);
  noResultsMessageMore.bind("click", resetFlightFilters);

  //Filter on page load
  setFlightFilter();
 });
}


///<summary>Initializes functionality for flight display mode</summary>

function initializePriceDisplayMode()
{
 $(document).ready(function()
 {
  var priceDisplayModeElement = $("#priceDisplayMode select");

  //Attach event handlers
  priceDisplayModeElement.bind("change keyup", setPriceDisplayMode);

  //Filter on page load
  setPriceDisplayMode();
 });
}

///<summary>Returns whether or not an input is defined</summary>
///<param name="input">Input object/variable</param>
///<returns type="bool">Boolean indicating whether the input is defined</returns>

function isDefined(input)
{
 return (typeof(input) != "undefined");
}

///<summary>Returns whether or not an input is defined and not null</summary>
///<param name="input">Input object/variable</param>
///<returns type="bool">Boolean indicating whether the input is defined and not null</returns>

function isDefinedAndNotNull(input)
{
 if (isDefined(input))
  return ((input != null) && !isNaN(input));
 else
  return false;
}

///<summary>Handles the onChange event for flight filters</summary>
///<param name="e">Event</param>

function onChangeFlightFilter(e)
{
 var filter = document.getElementById("searchBy");
 var latency = 700;

 if (filter.lastFilterTimeoutID != undefined)
  clearTimeout(filter.lastFilterTimeoutID);
 filter.lastFilterTimeoutID = setTimeout(setFlightFilter, latency);
}

///<summary>Parses an amount into an integer</summary>
///<param name="amount">Amount in string format</param>
///<returns type="Number">Returns number if valid or null otherwise</param>

function parseAmount(amount)
{
 var parsedAmount = Number(amount.replace(/[\u2012\u2013\u2014\u2212]/g, "-").replace(/[^0-9^\-^\.]/g, ""));
 return isNaN(parsedAmount) ? 0 : parsedAmount;
}
///<summary>Parses a string into a date</summary>
///<param name="date">Date in string format</param>
///<returns type="Date">Returns date if valid or null otherwise</param>

function parseDate(date)
{
 var parsedDate = null;
 var datePart = date.split("/");
 if (datePart.length == 3)
 {
  if ((datePart[0].length > 0) && (datePart[1].length > 0) && (datePart[2].length > 0))
  {
   try
   {
    parsedDate = new Date((2000 + parseInt(datePart[2], 10)), (parseInt(datePart[1], 10) - 1), parseInt(datePart[0], 10));
   }
   catch(exceptionObject)
   {
    parsedDate = null;
   }
  }
 }
 return parsedDate;
}

///<summary>Parses a string into minutes</summary>
///<param name="time">Time in string format</param>
///<returns type="Number">Returns number of minutes if valid or null otherwise</param>

function parseMinutes(time)
{
 var parsedMinutes = null;
 var timeComponent = jQuery.trim(time).replace(/[:]/g, " ").replace(/[^0-9^ ]/g, "").split(" ");
 var minutesInHour = 60;

 if (timeComponent.length == 2)
  parsedMinutes = Number(timeComponent[0]) * minutesInHour + Number(timeComponent[1]);
 else if (timeComponent.length == 1)
  parsedMinutes = Number(timeComponent[0]);

 return parsedMinutes;
}

///<summary>Prevents an event from being propagated to an element's parents</summary>
///<param name="e">Event</param>

function preventEventPropagation (e)
{
 if (!e)
 {
  var e = window.event;
 }
 e.cancelBubble = true;
 if (e.stopPropagation)
 {
  e.stopPropagation();
 }
 if (e.preventDefault)
 {
  e.preventDefault();
 }
}

///<summary>Protects all forms from resubmission and incorrect submission</summary>

function protectFormSubmission()
{
 var submitButton = $("input:submit,input:button[value!=\"Clear\"]");
 
 //Prevent forms from being resubmitted
 submitButton.bind("click", function(e)
 {
  if (!$(this).hasClass("allowMultipleSubmission"))
  {
   if ($(this).attr("isClicked") != undefined)
   {
    return false;
   }
   else
   {
    $(this).attr("isClicked", true);
   }
  }
 });
 
 if (submitButton.length > 1)
 {
  $(document).bind("keydown", function(e)
  {
   var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
   var enter = 13;
   if (key == enter)
   {
    if ($("*:focus").first().prop("tagName").toUpperCase() != "TEXTAREA")
    {
     e.preventDefault();
     return false;
    }
   }
  });
 }
}

///<summary>Prompts the user to choose their market profile</summary>
///<param name="marketProfile">Market profiles</param>
///<param name="currentMarketProfile">Current market profile</param>
///<param name="message">Message</param>

function promptMarketProfile(marketProfile, currentMarketProfile, message)
{
 var prompt = $("#marketProfilePrompt");
 var promptMarkup = "<div id=\"marketProfilePrompt\" class=\"modalDialog\"><a class=\"close\">close</a> <div class=\"contentPanel\"><div class=\"message\"></div><ul class=\"marketProfiles\"></ul></div></div>";
 var marketProfileListMarkup = "";
 
 //Generate the prompt if it doesn't exist
 if (prompt.length < 1)
 {
  $("body").append(promptMarkup);
  prompt = $("#marketProfilePrompt");
  prompt.find(".close").bind("click", function(e){hideModal(prompt);});
 }
 
 //Generate the market profile list
 for (var marketProfileCode in marketProfile)
  marketProfileListMarkup = marketProfileListMarkup + "<li><a href=\"" + marketProfile[marketProfileCode].url + "\" class=\"" + marketProfileCode + "\">" + marketProfile[marketProfileCode].name + "</a></li>";
 prompt.find("div.message").first().html(message);
 prompt.find("ul.marketProfiles").first().html(marketProfileListMarkup);
 
 //Display the prompt
 showModal(prompt);
}

///<summary>Renders an airport bubble</summary>
///<param name="data">Airport data</param>

function renderAirportBubble(data)
{
 document.lastAirportBubbleDataRequest == undefined;
 var airportBubble = $("#airport");
 var airportMask = $("#airportMask");
 var input = document.lastAirportInput;
 var keyword = formatAirportBubbleInput(input.val());
 var airportList = airportBubble.find("ul");
 var airport;

 var airportsOnly = 1;
 var hotelLocations = 2;
 var airportCityPairs = 3;
 var activeOrganizations = 4;
 var allOrganizations = 5;
 var airlinesOnly = 6;
 var cities = 7;
 
 if (input.mode == airportsOnly)
 {
  airport = $(data).find("airports airport");
 }
 else if (input.mode == hotelLocations)
 {
  airport = $(data).find("hotelLocations city");
 }
 else if (input.mode == airportCityPairs)
 {
  airport = $(data).find("airportcitypairs airportcitypair");
 }
 else if (input.mode == activeOrganizations || input.mode == allOrganizations)
 {
  airport = $(data).find("organizations organization");
 }
 else if (input.mode == airlinesOnly)
 {
  airport = $(data).find("airlines airline");
 }
 else if (input.mode == cities)
 {
  airport = $(data).find("cities city");
 }

 if (airport.length < 1)
 {
  hideAirportBubble();
 }
 else
 {
 
  //Populate the airport list
  airportList.empty();
  airport.each(function()
  {
   if (input.mode == airportCityPairs)
   {
    if ($(this).find("airport").attr("AirportCity") == "true")
    {
     airportList.append("<li class=\"" + $(this).attr("type") + "\"><dfn>" + emphasizeKeyword($(this).find("airport").text(), keyword) + "</dfn><span class=\"hidden\">" + $(this).find("city").text() + "</span></li>");
    }
    else
    {
     airportList.append("<li class=\"" + $(this).attr("type") + "\">Fly to <dfn>" + emphasizeKeyword($(this).find("airport").text(), keyword) + "</dfn> and stay in <dfn>" + emphasizeKeyword($(this).find("city").text(), keyword) + "</dfn></li>");
    }
   }
   else
   {
    airportList.append("<li class=\"" + $(this).attr("type") + "\">" + emphasizeKeyword($(this).text(), keyword) + "</li>");
   }
  });
  
  //Position and display the airport list
  var airportListItem = airportList.find("li");
  var top = input.position().top + input.outerHeight();
  var left = (input.position().left + airportBubble.outerWidth() > $(window).width()) ? Math.max(0, (input.position().left + input.outerWidth() - airportBubble.outerWidth())) : input.position().left;
  airportBubble.css("top", top);
  airportBubble.css("left", left);
  airportBubble.show();
  airportMask.css("top", top);
  airportMask.css("left", left);
  airportMask.css("width", airportBubble.width());
  airportMask.css("height", airportBubble.height());
  airportMask.css("display", "block");
 
  //Auto-scroll if the bubble is hidden
  if ((input.position().top + input.outerHeight() + airportBubble.height() - $(window).scrollTop()) > $(window).height())
   $("html, body").animate({scrollTop: Math.min(input.position().top, input.position().top + input.outerHeight() + airportBubble.outerHeight() - $(window).height())}, 200);

  //Set click navigation
  airportListItem.click(function(e)
  {
   if (input.mode == airportCityPairs)
   {
    var hotelLocation = $(".hotelLocation");    
    if ($(this).find("dfn").length == 2)
    {
     input.val($(this).find("dfn:first").text());
     hotelLocation.find("input:text").val($(this).find("dfn:last").text());
     hotelLocation.show();
    }
    else if ($(this).find("dfn").length == 1 && $(this).find("span").length == 1)
    {
     input.val($(this).find("dfn").text());
     hotelLocation.find("input:text").val($(this).find("span").text());
    }
    else
    {
     input.val($(this).text());
     hotelLocation.find("input:text").val($(this).text());
    }
   }
   else
   {
    input.val($(this).text());
   }
   hideAirportBubble(false);
   if (input.nextElement != undefined)
   {
    if (input.nextElement.length > 1)
    {
     input.nextElement.filter(":visible").filter(":first").focus();
    }
    else
    {
     input.nextElement.focus();
    }
   }
   preventEventPropagation(e);
  });

  //Set key navigation
  $.keynav.reset();
  airportListItem.keynav("active", "inactive");
  $.keynav.setActive($.keynav.el[0]);
  if (!document.isAirportBubbleOnKeyDownListenerRunning)
  {
   document.isAirportBubbleOnKeyDownListenerRunning = true;
   $(document).bind("keydown", document.airportBubbleOnKeyDownListener);
  }
 }
}

///<summary>Renders a calendar bubble</summary>
///<param name="defaultDate">Default calendar date</param>
///<param name="earliestDate">Earliest valid date</param>
///<param name="farthestDate">Farthest valid date</param>

function renderCalendarBubble(defaultDate, earliestDate, farthestDate, defaultCurrentMonth)
{
 var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
 var calendarBubble = $("#calendar");
 var calendarMask = $("#calendarMask");
 var input = document.lastCalendarInput;
 var calendarList = calendarBubble.find(".dates");
 var currentMonthCalendar = calendarBubble.find(".current");
 var currentMonthCalendarList = currentMonthCalendar.find(".dates");
 var currentMonthCalendarTitle = currentMonthCalendar.find("h3");
 var currentMonth = (defaultCurrentMonth == undefined) ? new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1) : defaultCurrentMonth;
 var earliestMonth = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
 var farthestMonth = new Date(farthestDate.getFullYear(), farthestDate.getMonth(), 1);
 var backMonth = calendarBubble.find(".back");
 var forwardMonth = calendarBubble.find(".forward");

 //Populate the calendar
 input.calendarDefaultDate = defaultDate;
 input.calendarEarliestDate = earliestDate;
 input.calendarFarthestDate = farthestDate;
 input.calendarCurrentMonth = currentMonth;
 currentMonthCalendarTitle.text(monthName[currentMonth.getMonth()] + " " + currentMonth.getFullYear());
 renderCalendarBubbleMonth(currentMonthCalendarList, currentMonth, defaultDate, earliestDate, farthestDate);
 backMonth.css("display", (currentMonth <= earliestMonth) ? "none" : "block");
 forwardMonth.css("display", (currentMonth >= farthestMonth) ? "none" : "block");

 //Position and display the calendar
 var calendarListItem = calendarList.find("li:not(.invalid)");
 var top = input.position().top + input.outerHeight();
 var left = (input.position().left + calendarBubble.outerWidth() > $(window).width()) ? Math.max(0, (input.position().left + input.outerWidth() - calendarBubble.outerWidth())) : input.position().left;
 calendarBubble.css("top", top);
 calendarBubble.css("left", left);
 calendarBubble.show();
 calendarMask.css("top", top);
 calendarMask.css("left", left);
 calendarMask.css("width", calendarBubble.width());
 calendarMask.css("height", calendarBubble.height());
 calendarMask.css("display", "block");
 
 //Auto-scroll if the bubble is hidden
 if ((input.position().top + input.outerHeight() + calendarBubble.height() - $(window).scrollTop()) > $(window).height())
  $("html, body").animate({scrollTop: Math.min(input.position().top, input.position().top + input.outerHeight() + calendarBubble.outerHeight() - $(window).height())}, 200);
 
 //Set key navigation
 var dayIndex = daysInBetween(currentMonth, defaultDate);
 $.keynav.reset();
 calendarListItem.keynav("active", "inactive");
 if ((defaultDate >= earliestDate) && (defaultDate <= farthestDate) && (dayIndex >= 0) && (dayIndex < (daysInMonth(currentMonth))))
 {
  if (earliestDate > currentMonth)
  {
   $.keynav.setActive($.keynav.el[dayIndex - earliestDate.getDate() + 1]);
  }
  else
  {
   $.keynav.setActive($.keynav.el[dayIndex]);
  } 
 }
 else
 {
  $.keynav.setActive($.keynav.el[0]);
 }
 if (!document.isCalendarBubbleOnKeyDownListenerRunning)
 {
  document.isCalendarBubbleOnKeyDownListenerRunning = true;
  $(document).bind("keydown", document.calendarBubbleOnKeyDownListener);
 }
}

///<summary>Renders a calendar bubble month</summary>
///<param name="monthContainer">Calendar bubble month to be renderd</param>
///<param name="month">Month to be rendered</param>
///<param name="defaultDate">Default date</param>
///<param name="earliestDate">Earliest valid date</param>
///<param name="farthestDate">Farthest valid date</param>

function renderCalendarBubbleMonth(monthContainer, month, defaultDate, earliestDate, farthestDate)
{
 var day = new Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
 var days = daysInMonth(month);
 var dateClass = new Array();
 var date = new Date(month);
 var dateContainer = monthContainer[0].childNodes;
 var currentDateContainer;
 var dateIndex = 1;

 monthContainer.attr("calendarMonth", month);
 for (dateIndex = 1; dateIndex <= days; dateIndex++)
 {
  date.setDate(dateIndex);
  dateClass.length = 0;
  if (dateIndex == 1)
  {
   dateClass.push(day[date.getDay()]);
  }
  if ((date < earliestDate) || (date > farthestDate))
  {
   dateClass.push("invalid");
  }
  else if (date.valueOf() == defaultDate.valueOf())
  {
   dateClass.push("default");
  }
  
  //Improve performance by reusing existing DOM objects when possible
  if (dateIndex > dateContainer.length)
  {
   currentDateContainer = document.createElement("li");
   monthContainer[0].appendChild(currentDateContainer);
   currentDateContainer.onclick = function(e)
   {
    var dateContainer = $(this);
    if (!dateContainer.hasClass("invalid"))
    {
     var calendarMonth = new Date(dateContainer.parent().attr("calendarMonth"));
     var input = document.lastCalendarInput;
     input.val(fixedLength(dateContainer.text(), 2, "0") + "/" + fixedLength((calendarMonth.getMonth() + 1), 2, "0") + "/" + fixedLength(calendarMonth.getFullYear(), 2));
     input.trigger("change");
     hideCalendarBubble(false);
     if (input.nextElement != undefined)
     {
      if (input.nextElement.length > 1)
      {
       input.nextElement.filter(":visible").filter(":first").focus();
      }
      else
      {
       input.nextElement.focus();
      }
      if (input.onNextElementFocus != undefined)
      {
       input.onNextElementFocus();
      }
     }
     preventEventPropagation(e);
    }
   }
  }
  else
  {
   currentDateContainer = dateContainer[dateIndex - 1];
  }
  currentDateContainer.innerHTML = dateIndex;
  currentDateContainer.className = dateClass.join(" ");
 }
 
 //Delete extra DOM objects
 while (dateIndex <= dateContainer.length)
 {
  monthContainer[0].removeChild(dateContainer[dateIndex - 1]);
 }
}

///<summary>Renders a slider</summary>
///<param name="monthContainer">Calendar bubble month to be rendered</param>
///<param name="sliderLabel"></param>
///<param name="minimum"></param>
///<param name="maximum"></param>
///<param name="onStopFunction">Function to call on final change of values</param>
///<param name="dataFormat">Value format</param>
///<param name="numberFormat">Number format string</param>
///<param name="locale">Two-character ISO country code</param>

function renderSlider(sliderContainer, sliderLabel, minimum, maximum, onStopFunction, dataFormat, numberFormat, locale)
{
 var granularity = 10;
 var dataFormatTime = 0;
 var dataFormatDuration = 1;
 var dataFormatAmount = 2;
 var sliderValues;
 
 sliderContainer.dataFormat = dataFormat;
 sliderLabel.append("<em></em>");
 sliderValues = sliderLabel.find("em");
 sliderContainer.slider({range: true, min: minimum, max: maximum, values: [minimum, maximum], step: granularity, stop: onStopFunction, slide: function(event, ui)
 {
  var showValues = (ui.values[0] != minimum) || (ui.values[1] != maximum);
  switch (sliderContainer.dataFormat)
  {
   case dataFormatTime:
    sliderValues.html(showValues ? (" <em>" + formatTime(ui.values[0]) + " to " + formatTime(ui.values[1]) + "</em>") : "");
    break;
   case dataFormatDuration:
    sliderValues.html(showValues ? (" <em>" + formatDuration(ui.values[0]) + " to " + formatDuration(ui.values[1]) + "</em>") : "");
    break;
   case dataFormatAmount:
    sliderValues.html(showValues ? (" <em>" + $.formatNumber(ui.values[0], {format:"-#,###", locale:locale}) + " to " + $.formatNumber(ui.values[1], {format:numberFormat, locale:locale}) + "</em>") : "");
    break;
  }
 }});
}

///<summary>Reset airline filters</summary>

function resetFlightFilters()
{
 var filter = $("#filter");
 var filterCheckedCheckbox = filter.find("input:checked");
 var filterSlider = filter.find(".ui-slider");
 var filterSliderValues = filter.find(".slider legend em");
 
 filterCheckedCheckbox.prop("checked", false);
 filterSliderValues.text("");
 filterSlider.each(function()
 {
  $(this).slider("values", 0, $(this).slider("option", "min"));
  $(this).slider("values", 1, $(this).slider("option", "max"));
 });
 
 setFlightFilter();
}

///<summary>Rounds a number to a pre-specified decimal precision</summary>
///<param name="number">Number to render</param>
///<param name="precision">Number of decimal places</param>

function round(number, precision)
{
 divisor = Math.pow(10, precision);
 return Math.round(number * divisor) / divisor;
}

///<summary>Shows or hides an element based on the value of a group of multiple-choice input fields in a container</summary>
///<param name="container">Container element</param>
///<param name="value">Conditional value</param>
///<param name="element">Element to be shown or hidden</param>

function setChoiceConditionalElement(container, values, element)
{
 var input = "input";
 var checked = "checked";
 
 //Show or hide the element for the default container value
 if (container.find(input + ":" + checked).val() == values || jQuery.inArray(container.find(input + ":" + checked).val(),values) >= 0)
 {
   element.show();
 }
 else
 {
   element.hide();
 }

 //Show and hide the element when the container value changes
 container.find(input).bind("click", function(e)
 {
  if ($(this).val() == values || jQuery.inArray($(this).val(),values) >= 0)
  {
   element.show();
  }
  else
  {
   element.hide();
  }
 });
}

///<summary>Adds highlighting functionality to a group of multiple-choice input fields in a container</summary>
///<param name="container">Container element</param>

function setChoiceHighlighting(container)
{
 var input = "input";
 var label = "label";
 var name = "name";
 var checked = "checked";
 var selectedClass = "checked";

 //Set the selected class for the default selection
 container.find(label).removeClass(selectedClass);
 container.find(input + ":" + checked).parent().find(label).addClass(selectedClass);

 //Set a selected class on selection
 $(container.find(input)).click(function(e)
 {
  container.find(input).parent().find(label).removeClass(selectedClass);
  container.find(input + ":" + checked).parent().find(label).addClass(selectedClass);
 });
}

///<summary>Forces external links to open in a new window</summary>

function setExternalLinks()
{
 var externalLinks = $("a[href^='http']");
 var excludedDomain = new Array("musafir.com");
 
 externalLinks.each(function()
 {
  var link = $(this);
  if ((!link.hasClass("compactPopup")) && (!link.hasClass("popup")))
  {
   var protocolDelimiterIndex = this.href.indexOf("://") + 3;
   var domainDelimiterIndex = this.href.indexOf("/", protocolDelimiterIndex);
   var domain = this.href.substring(protocolDelimiterIndex, ((domainDelimiterIndex < 1) ? (this.href.length - domainDelimiterIndex) : domainDelimiterIndex));
   for (var i = 0; i < excludedDomain.length; i++)
   {
    if (domain.lastIndexOf(excludedDomain[i]) >= 0 && domain.lastIndexOf(excludedDomain[i]) == (domain.length - excludedDomain[i].length))
    {
     return;
    }
   }
   $(this).click(function(e)
   {
    try
    {
     var pageTracker = _gat._getTracker(document.googleAnalyticsId);
     pageTracker._trackEvent("External link", domain);
    }
    catch(exceptionObject)
    {
    }
    window.open(this.href);
    return false;
   });
  }
 });
}

///<summary>Sets the flight filters</summary>

function setFlightFilter()
{
 var filter = $("#filter");
 var airlineFilter = new Array();
 var airlineFilterCheckbox = filter.find(".airline input:checked");
 var arrivalFilterSlider = filter.find(".arrival div");
 var cabinClassFilter = new Array();
 var cabinClassFilterCheckbox = filter.find(".cabinClass input:checked");
 var cabinClassPrefix = "/";
 var cheaperResultsMessage = $("#cheaperResultsMessage");
 var cheapestMatchingPrice;
 var departureFilterSlider = filter.find(".departure div");
 var durationFilterSlider = filter.find(".duration div");
 var flight = $("#contentPanel table.listing > tbody > tr");
 var foundMatchingResults = false;
 var matched;
 var matchedAirline;
 var matchedCabinClass;
 var noResultsMessage = $("#noResultsMessage");
 var priceFilterSlider = filter.find(".price div");
 var refundableFilterCheckbox = filter.find(".refundable input:checked");
 var refundableIndicator = "R";
 var stopsFilter = "";
 var stopsFilterCheckbox = filter.find(".stops input:checked");

 delete filter.lastFilterTimeoutID;

 //Prepare and optimize filters
 stopsFilterCheckbox.each(function()
 {
  stopsFilter += this.value;
 });
 cabinClassFilterCheckbox.each(function()
 {
  cabinClassFilter.push(cabinClassPrefix + this.value);
 });
 airlineFilterCheckbox.each(function()
 {
  airlineFilter.push(this.value);
 });
 
 //Filter results
 flight.each(function()
 {
  matched = true;
  
  //Check departure, arrival, duration and price
  if (departureFilterSlider.length > 0)
   matched = matched && (this.departure >= departureFilterSlider.slider("values", 0)) && (this.departure <= departureFilterSlider.slider("values", 1));
  if (arrivalFilterSlider.length > 0)
   matched = matched && (this.arrival >= arrivalFilterSlider.slider("values", 0)) && (this.arrival <= arrivalFilterSlider.slider("values", 1));
  if (durationFilterSlider.length > 0)
   matched = matched && ((this.duration == 0) || ((this.duration >= durationFilterSlider.slider("values", 0)) && (this.duration <= durationFilterSlider.slider("values", 1))));
  if (priceFilterSlider.length > 0)
   matched = matched && (this.price >= priceFilterSlider.slider("values", 0)) && (this.price <= priceFilterSlider.slider("values", 1));

  //Check stops
  if (stopsFilter.length > 0)
   matched = matched && (stopsFilter.indexOf(this.stops) > -1);
   
  //Check airlines
  if (airlineFilter.length > 0)
  {
   matchedAirline = false;
   for (var i in airlineFilter)
   {
    matchedAirline = matchedAirline || (this.airlineAndCabinClass.indexOf(airlineFilter[i]) > -1);
   }
   matched = matched && matchedAirline;
  }
  
  //Check refundability
  if (refundableFilterCheckbox.length == 1)
   matched = matched && (this.refundable == refundableIndicator);
  
  //Check cabin classes
  if (cabinClassFilter.length > 0)
  {
   matchedCabinClass = false;
   for (var i in cabinClassFilter)
   {
    matchedCabinClass = matchedCabinClass || (this.airlineAndCabinClass.indexOf(cabinClassFilter[i]) > -1);
   }
   matched = matched && matchedCabinClass;
  }
  
  //Check match
  if (matched)
  {
   $(this).show();
   cheapestMatchingPrice = Math.min(cheapestMatchingPrice || this.price, this.price);
   foundMatchingResults = true;
  }
  else
  {
   $(this).hide();
  }
 });

 //Display message if no results or warn the user if better results are filtered
 if (foundMatchingResults)
 {
  noResultsMessage.addClass("invisible");
  if (priceFilterSlider.length > 0)
  {
   if (cheapestMatchingPrice == priceFilterSlider[0].minimum)
    cheaperResultsMessage.addClass("invisible");
   else
    cheaperResultsMessage.removeClass("invisible");
  }
 }
 else
 {
  noResultsMessage.removeClass("invisible");
  cheaperResultsMessage.addClass("invisible");
 }
 
}


///<summary>Adds enhanced usability functionality to input fields</summary>

function setInputs()
{
 //Add placeholder text functionality
 $("input:text.placeholder").each(function()
 {
  //Store the default placeholder
  if ((isDefined($(this).prop("placeholder"))) && ($(this).prop("placeholder") != ""))
   $(this).attr("placeholderValue", $(this).prop("placeholder"));
  else
   $(this).attr("placeholderValue", $(this).val());

  //Set default styles
  if ($(this).val() != $(this).attr("placeholderValue"))
   $(this).removeClass("placeholder");

  //Set styles on focus/blur/change
  $(this).bind("focus", function(e)
  {
   if ($(this).val() == $(this).attr("placeholderValue"))
   {
    $(this).val("");
    $(this).removeClass("placeholder");
   }
  });
  $(this).bind("blur change", function(e)
  {
   switch ($(this).val())
   {
    case $(this).attr("placeholderValue"):
     break;
    case "":
     $(this).val($(this).attr("placeholderValue"));
     $(this).addClass("placeholder");
     break;
    default:
     $(this).removeClass("placeholder");
     break;
   }
  });
 });

 //Add selection functionality
 $("input:text").bind("focus", function(e)
 {
  if ($(this).val() == $(this).attr("placeholderValue"))
   $(this).select();
 });
}

///<summary>Sets up popups</summary>

function setPopups()
{
 $("a").each(function()
 {
  var link = $(this);
  if (link.hasClass("compactPopup"))
  {
   link.bind("click", function(e)
   {
    createPopup(this.href, "compactPopup", 580, 450, false);
    return false;
   });
  }
  else if (link.hasClass("popup"))
  {
   link.click(function(e)
   {
    window.open(this.href);
    return false;
   });
  }
 });
}

///<summary>Sets the flight display mode</summary>

function setPriceDisplayMode()
{
 var flight = $("#contentPanel table.listing > tbody > tr");
 var fareList = $("#contentPanel ul.itinerary table.fareList");
 var fareTotal = $("#contentPanel ul.itinerary li.total");
 var hotel = $("#contentPanel #hotels #listing > li > table > tbody > tr");
 var priceDisplayMode = Number($("#priceDisplayMode select").val());
 var priceDisplay = {net: 1, gross: 2, netAndCommission: 3, grossAndCommission: 4};
 
 //Show/hide gross/net price
 if ((priceDisplayMode == priceDisplay.gross) || (priceDisplayMode == priceDisplay.grossAndCommission))
 {
  flight.find("td.sell p.price span.gross").removeClass("hidden");
  flight.find("td.sell p.price span.net").addClass("hidden");
  hotel.find("td.priceInfo p.price span.gross").removeClass("hidden");
  hotel.find("td.priceInfo p.price span.net").addClass("hidden");
  hotel.find("").addClass("hidden");
  fareList.find(".customerPrice").removeClass("hidden");
  fareList.find(".customerUnitPrice").removeClass("hidden").removeClass("optional");
  fareList.find(".marketPrice,.markup,.surcharges,.price").addClass("hidden");
  fareTotal.find("p.customer").addClass("simple");
  fareTotal.find("p.units,p.price").addClass("hidden");
 }
 else
 {
  flight.find("td.sell p.price span.gross").addClass("hidden");
  flight.find("td.sell p.price span.net").removeClass("hidden");
  hotel.find("td.priceInfo p.price span.gross").addClass("hidden");
  hotel.find("td.priceInfo p.price span.net").removeClass("hidden");
  fareList.find(".customerPrice").addClass("hidden");
  if (priceDisplayMode == priceDisplay.net)
   fareList.find(".customerUnitPrice").removeClass("hidden").addClass("optional");
  else
   fareList.find(".customerUnitPrice").addClass("hidden").removeClass("optional");
  fareList.find(".marketPrice,.markup,.surcharges,.price").removeClass("hidden");
  fareTotal.find("p.customer").removeClass("simple");
  fareTotal.find("p.units,p.price").removeClass("hidden");
 }
 
 //Show/hide commission
 if ((priceDisplayMode == priceDisplay.netAndCommission) || (priceDisplayMode == priceDisplay.grossAndCommission))
 {
  flight.find("td.commission").removeClass("hidden");
  hotel.find("td.commission").removeClass("hidden");
  hotel.find("td.description").addClass("compact");
  hotel.find("td.description ul.additionalInfo li.areaMap").addClass("hidden");
  fareList.find(".commission").removeClass("hidden");
 }
 else
 {
  flight.find("td.commission").addClass("hidden");
  hotel.find("td.commission").addClass("hidden");
  hotel.find("td.description").removeClass("compact");
  hotel.find("td.description ul.additionalInfo li.areaMap").removeClass("hidden");
  fareList.find(".commission").addClass("hidden");
 }
 
 //Set price based on the priceDisplayMode
 flight.each(function()
 {
  if ((priceDisplayMode == priceDisplay.gross) || (priceDisplayMode == priceDisplay.grossAndCommission))
   this.price = this.grossPrice;
  else
   this.price = this.netPrice;
 });
}

///<summary>Sets up tab accessibility</summary>

function setTabAccessibility()
{
 $("a, input, select, textarea").each(function()
 {
  var element = $(this);
  if (element.hasClass("tabInaccessible"))
  {
   element.attr("tabIndex", "2");
  }
  else
  {
   element.attr("tabIndex", "1");
  }
 });
}

///<summary>Displays the airport bubble</summary>

function showAirportBubble()
{
 var dataSource = "/Trip/Resource/Pages/Resolve/Default.aspx";
 var airportBubble = $("#airport");
 var input = document.lastAirportInput;
 var keyword = formatAirportBubbleInput(input.val());
  
 delete input.lastAirportTimeoutID;
 
 if ((keyword.replace(/([^a-zA-Z]+)/g, '').length > 2) && (keyword.search(/\([a-zA-Z]{3}\)/) == -1))
 {
  if (keyword != input.lastKeyword)
  {
   if (document.lastAirportBubbleDataRequest != undefined)
   {
    document.lastAirportBubbleDataRequest.abort();
   }
   document.lastAirportBubbleDataRequest = $.ajax({type:"GET", url:dataSource, dataType:"xml", data:("mode=" + input.mode + "&keyword=" + encodeURIComponent(keyword.toLowerCase())), success:renderAirportBubble});
  }
 }
 else
 {
  hideAirportBubble();
 } 
 
 // This is added to resolve the same keyword again
 input.lastKeyword = keyword;
}

///<summary>Displays the calendar bubble</summary>

function showCalendarBubble()
{
 var calendarBubble = $("#calendar");
 var calendarBubbleClose = $("#calendar .close");
 var input = document.lastCalendarInput;
 var date = formatCalendarInput(input.val());
 var earliestDate = input.earliestDate();
 var defaultDate;
 var farthestDate = input.farthestDate();

 delete input.lastCalendarTimeoutID;
 if (date != input.lastDate)
 {
  input.lastDate = date;
  defaultDate = parseDate(date);
  if (defaultDate == null)
  {
   defaultDate = input.defaultDate();
  }
  else if ((defaultDate < earliestDate) || (defaultDate > farthestDate))
  {
   defaultDate = input.defaultDate();
  }
  renderCalendarBubble(defaultDate, earliestDate, farthestDate);
 }
}

///<summary>Shows all flight location filters</summary>

function showFlightAllAirlineFilters()
{
  var filter = $("#filter");
  var airlineFilter = filter.find(".airline li");
  var airlineFilterMore = filter.find(".airline a.more");

  airlineFilterMore.hide();
  airlineFilter.each(function()
  {
   $(this).show();
  });
}

///<summary>Shows a modal element</summary>
///<param name="modalElement">Modal element</param>

function showModal(modalElement)
{
 var modalBackground = $("#modalBackground");
 var modalBackgroundMarkup = "<div id=\"modalBackground\" class=\"modalBackground\">&nbsp;</div>";
 var modalTransitionTime = 250;
 
 //Create the modal background if it doesn't exist
 if (modalBackground.length < 1)
 {
  $("body").append(modalBackgroundMarkup);
  modalBackground = $("#modalBackground");
 }
 
 modalBackground.bind("click", function(e){hideModal(modalElement);});
 modalBackground.css("height", $("body").height());
 modalBackground.css("width", $("body").width());
 modalBackground.fadeIn(modalTransitionTime);
 
 modalElement.css("top", ($(window).height() - modalElement.outerHeight()) / 2);
 modalElement.css("left", ($(window).width() - modalElement.outerWidth()) / 2);
 modalElement.fadeIn(modalTransitionTime);
}

///<summary>Shows a tip</summary>
///<param name="element">Element</param>
///<param name="message">Message</param>

function showTip(element, message)
{
 var tipMarkup = "<div class=\"tip\"><div class=\"pointer\"></div>" + message + "</div>";
 element.first().append(tipMarkup);
}

///<summary>Prompts the user to choose their market profile</summary>
///<param name="suggestedMarketProfile">Suggested market profile</param>
///<param name="message">Message</param>

function suggestMarketProfile(suggestedMarketProfile, message)
{
 if (!($.browser.msie && $.browser.version < 9))
  $("#secondaryNavigation li.country").first().after("<li class=\"information\"><a href=\"" + suggestedMarketProfile.url + "\">" + message + suggestedMarketProfile.name + "</a></li>")
}

///<summary>Truncates</summary>
///<param name="temporary">Whether the calendar bubble should be temporarily hidden</param>

function truncateTime(date)
{
 return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

///<summary>Opens deep link in new window</summary>

function openDeepLink()
{
  var deepLink = $("a.deeplink");
  var deepLinkURL = deepLink.attr("href");
  if (deepLinkURL == undefined)
  {
   alert("No deep links found");
  }
  else
  {
   alert(deepLinkURL);
  }
}

///<summary>Sets up expandable content</summary>

function setExpandables()
{
 //Added document readiness to set classes if the link toggles
 $(document).ready(function()
 {
  $(".toggleVisibility").each(function()
  {
   var link = $(this);
   var toggleAction;
   var targetElement;
   var targetElementId = $(this).attr("name");
  
   //Parse toggleAction
   if (targetElementId.indexOf(".") > -1)
   {
    toggleAction = targetElementId.split(".")[1];
    toggleAction = toggleAction.toLowerCase();
    targetElementId = targetElementId.split(".")[0];
   }
   link.attr("targetElementId", targetElementId);
   link.attr("toggleAction", toggleAction); 

   //Set classes if the link toggles
   if ((targetElementId != undefined) && (toggleAction == undefined))
   {
    targetElement = $("#" + targetElementId);
    if (targetElement.hasClass("hidden"))
     link.addClass("toggleHidden").removeClass("toggleShown");
    else
     link.addClass("toggleShown").removeClass("toggleHidden");
   }
   
   //Show/hide/toggle on click
   link.click(function(e)
   {
    var targetElementId = $(this).attr("targetElementId");
    var toggleAction = $(this).attr("toggleAction");
    if (targetElementId != undefined)
    {
     var targetElement = $("#" + targetElementId);
     switch (toggleAction)
     {
      case "show":
       targetElement.removeClass("hidden");
       $(this).addClass("hidden");
       $("[name=\"" + targetElementId + ".hide\"]").removeClass("hidden");
       break;
      case "hide":
       targetElement.addClass("hidden");
       $(this).addClass("hidden");
       $("[name=\"" + targetElementId + ".show\"]").removeClass("hidden");
       break;
      case "showoptionalcolumns":
       var firstFooterCell = targetElement.find("tfoot tr td").first();
       var firstColumnSpan = Number(firstFooterCell.attr("colspan"));
       var optionalColumns = targetElement.find("thead tr").last().find(".optional").length;
       firstColumnSpan = isNaN(firstColumnSpan) ? 1 : firstColumnSpan;
       firstFooterCell.attr("colspan", firstColumnSpan + optionalColumns);
       targetElement.find(".optional").removeClass("hidden");
       $(this).addClass("hidden");
       $("[name=\"" + targetElementId + ".hideOptionalColumns\"]").removeClass("hidden");
       break;
      case "hideoptionalcolumns":
       var firstFooterCell = targetElement.find("tfoot tr td").first();
       var firstColumnSpan = Number(firstFooterCell.attr("colspan"));
       var optionalColumns = targetElement.find("thead tr").last().find(".optional").length;
       firstColumnSpan = isNaN(firstColumnSpan) ? 1 : firstColumnSpan;
       firstFooterCell.attr("colspan", Math.max(firstColumnSpan - optionalColumns, 1));
       targetElement.find(".optional").addClass("hidden");
       $(this).addClass("hidden");
       $("[name=\"" + targetElementId + ".showOptionalColumns\"]").removeClass("hidden");
       break;
      default:
       if (targetElement.hasClass("hidden"))
       {
        targetElement.removeClass("hidden");
        $(".toggleVisibility[name=\"" + targetElementId + "\"]").addClass("toggleShown").removeClass("toggleHidden");
       }
       else
       {
        targetElement.addClass("hidden");
        $(".toggleVisibility[name=\"" + targetElementId + "\"]").addClass("toggleHidden").removeClass("toggleShown");
       }
       break;
     }
     $(this).blur();

     //Auto-focus on the target element
     if ((!isDefined(toggleAction)) || (toggleAction == "show"))
      if ($(this).hasClass("autoFocus"))
      {
       if ((targetElement.position().top + targetElement.outerHeight() - $(window).scrollTop()) > $(window).height())
        $("html, body").animate({scrollTop: Math.min(targetElement.position().top, targetElement.position().top + targetElement.outerHeight() - $(window).height())}, 200);
       //Add optional functionality to highlight the targetElement here
      }
    }
    return false;
   });
  });
 });
}

///<summary>Sets up clickable table rows</summary>

function setClickable()
{
 $(".clickable").each(function()
 {
  var clickableElement = $(this);
  var defaultClick;
  
  //Find the defaultClick or the first link instead
  defaultClick = clickableElement.find(".defaultClick[href]").first();
  if (defaultClick.length < 1)
   defaultClick = clickableElement.find("a[href]").first();
  
  if (defaultClick.length == 1)
  {
   $(this).attr("href", defaultClick.attr("href"));
   clickableElement.bind("mouseover", function(e)
   {
    $(this).addClass("hover");
   });
   clickableElement.bind("mouseout", function(e)
   {
    $(this).removeClass("hover");
   });
   clickableElement.bind("click", function(e)
   {
    if (e.ctrlKey)
     window.open($(this).attr("href"));
    else
     document.location = $(this).attr("href");
     
    //Prevent nested links/buttons
    //preventEventPropagation(e);
   });
  }
 });
}

///<summary>Attaches a calendar bubble to the input field</summary>

function attachCalenderBubble(inputId, referenceUTCDateTime, earliestTimeZonePrecedingUTC, earliestDateDeltaHours, farthestDateDeltaDays)
{
 document[inputId] = new Object();
 document[inputId].referenceUTCDateTime = referenceUTCDateTime;
 document[inputId].earliestTimeZonePrecedingUTC = earliestTimeZonePrecedingUTC;
 document[inputId].earliestDateDeltaHours = earliestDateDeltaHours;
 document[inputId].farthestDateDeltaDays = farthestDateDeltaDays;

 $(document).ready(function()
 {
  var input = $("#" + inputId);
 
  if (input != undefined)
  {
   var defaultEarliestDate = truncateTime(addHours(document[inputId].referenceUTCDateTime, document[inputId].earliestDateDeltaHours + document[inputId].earliestTimeZonePrecedingUTC));
   var defaultFarthestDate = truncateTime(addHours(addDays(document[inputId].referenceUTCDateTime, document[inputId].farthestDateDeltaDays), document[inputId].earliestTimeZonePrecedingUTC));

   if (input.length > 0)
   {
    addCalendarBubble
    (
     input, undefined,
     function()
     {
      var currentDate = truncateTime(new Date());
      return currentDate;
     },
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultFarthestDate;
     }
    );
   }
  }
 });
}

///<summary>Attaches calendar bubbles to the two input fields for selecting date range</summary>

function attachDateRangeCalenderBubbles(startInputId, endInputId, referenceUTCDateTime, earliestTimeZonePrecedingUTC, earliestDateDeltaHours, farthestDateDeltaDays)
{
 document[startInputId] = new Object();
 document[startInputId].referenceUTCDateTime = referenceUTCDateTime;
 document[startInputId].earliestTimeZonePrecedingUTC = earliestTimeZonePrecedingUTC;
 document[startInputId].earliestDateDeltaHours = earliestDateDeltaHours;
 document[startInputId].farthestDateDeltaDays = farthestDateDeltaDays;

 $(document).ready(function()
 {
  var startInput = $("#" + startInputId);
  var endInput = $("#" + endInputId);
 
  if (startInput != undefined && endInputId != undefined)
  {
   var defaultEarliestDate = truncateTime(addHours(document[startInputId].referenceUTCDateTime, document[startInputId].earliestDateDeltaHours + document[startInputId].earliestTimeZonePrecedingUTC));
   var defaultFarthestDate = truncateTime(addHours(addDays(document[startInputId].referenceUTCDateTime, document[startInputId].farthestDateDeltaDays), document[startInputId].earliestTimeZonePrecedingUTC));

   if (startInput.length > 0)
   {
    addCalendarBubble
    (
     startInput, undefined,
     function()
     {
      var currentDate = truncateTime(new Date());
      return currentDate;
     },
     function()
     {
      return defaultEarliestDate;
     },
     function()
     {
      return defaultFarthestDate;
     }
    );
   }
   if (endInput.length > 0)
   {
    addCalendarBubble
    (
     endInput, undefined,
     function()
     {
      var defaultDate = parseDate(formatCalendarInput(startInput.val()));
      if (defaultDate < defaultEarliestDate)
      {
       defaultDate = defaultEarliestDate;
      }
      else if (defaultDate > defaultFarthestDate)
      {
       defaultDate = defaultFarthestDate;
      }
      return defaultDate;
     },
     function()
     {
      var defaultDate = parseDate(formatCalendarInput(startInput.val()));
      if (defaultDate < defaultEarliestDate)
      {
       defaultDate = defaultEarliestDate;
      }
      else if (defaultDate > defaultFarthestDate)
      {
       defaultDate = defaultFarthestDate;
      }
      return defaultDate;
     },
     function()
     {
      return addHours(addDays(document[startInputId].referenceUTCDateTime, document[startInputId].farthestDateDeltaDays), document[startInputId].earliestTimeZonePrecedingUTC);
     }
    );
   }
  }
 });
}

///<summary>Sets up custom toolips</summary>

function setTooltips()
{
 $(function()
 {
  if ($(".tooltip").length > 0)
  {
   $(".tooltip").tooltip({showURL: false});
  }
 });
}

///<summary>Sets up clear action button for form fields</summary>

function setClearForm()
{
 $(".clearForm").each(function()
  {
   $(this).click(function()
   {
    var targetFormId = $(this).attr("name");
    if (targetFormId != undefined)
    {
     var targetForm = $("#" + targetFormId);
     targetForm.find("input[type=text]").val("");
     targetForm.find("select option:first-child").prop("selected", "selected");
     targetForm.find("input[type=checkbox]").prop("checked", false);
    }
   });
  });
}

///<summary>Sets up check box fieldsets to toggle CSS class based on selection</summary>

function setCheckSelection()
{
 $(".checkSelection input").click(function()
  {
    if ($(this).is(":checked"))
    {
     $(this).parent().parent().addClass("selected");
    }
    else
    {
     $(this).parent().parent().removeClass("selected");
    }
  });
}

///<summary>Selects a requested tab</summary>
///<param name="index">Tab index</param>

function selectTab(index)
{
 var tab = $("ul.tabs li");
 var pane = $("div.pane");
 tab.removeClass("Selected");
 tab.eq(index).addClass("Selected");
 pane.addClass("hidden");
 pane.eq(index).removeClass("hidden");
}

///<summary>Removes spacing between child blocks in *Panel elements</summary>

function tightenPanelBlocks()
{
 $("div[id$=\"Panel\"], #build, #build fieldset").contents().filter(function() { return this.nodeType === 3; }).remove();
}

///<summary>Sets scroller functionality for all matching containers</summary>

function setScrollable()
{
 //Added document readiness to set classes if the link toggles
 $(document).ready(function()
 {
  //Event to auto-position next/previous arrowheads
  document.scrollableOnResizeListener = function(e)
  {
   //Exit if the body height has not changed since it's unlikely that the arrowheads need to be repositioned
   if (isDefined(document.scrollableBodyHeight))
    if (document.scrollableBodyHeight == $("body").height())
     return false;
   document.scrollableBodyHeight = $("body").height();
   
   $(".scrollable").each(function()
   {
    var currentElement = $(this);
    var buttonTop = (currentElement.offset().top + currentElement.outerHeight() / 2);
    var previous = currentElement.children(".previous:first");
    var next = currentElement.children(".next:first");
    var previousLeft = previous.hasClass("autoPosition") ? (currentElement.offset().left - previous.outerWidth()) : previous.offset().left;
    var nextLeft = next.hasClass("autoPosition") ? (currentElement.offset().left + currentElement.outerWidth()) : next.offset().left;
    var nextWidth = next.outerWidth();

    //Position and show scroll buttons only if they're within the visible area of the screen
    if ((previousLeft >= 0) && ((nextLeft + nextWidth) < document.body.clientWidth))
    {
     if (previous.hasClass("autoPosition"))
      previous.css({position:"absolute", left: previousLeft, top: buttonTop});
     if (next.hasClass("autoPosition"))
      next.css({position:"absolute", left: nextLeft, top: buttonTop});
     previous.show();
     next.show();
    }
    else
    {
     previous.hide();
     next.hide();
    }
   });
  };

  //Initialize tinyCarousel
  $(".scrollable").each(function()
  {
   var currentElement = $(this);
   var classes = currentElement.attr("class");
   var millisecondsInASecond = 1000;
   var scrollItems = 1;
   var scrollTime = 1000;
   var animationTime = 150;
   var previous = currentElement.children(".previous:first");
   var next = currentElement.children(".next:first");

   //Read custom parameters from the CSS class value
   if ((isDefined(document.isMobileOptimized)) && (classes.indexOf("mobileScrollItems") >= 0))
    scrollItems = parseInt(classes.split("mobileScrollItems")[1].split(" ")[0]);
   else if (classes.indexOf("scrollItems") >= 0)
    scrollItems = parseInt(classes.split("scrollItems")[1].split(" ")[0]);
   if (classes.indexOf("scrollTime") >= 0)
    scrollTime = parseInt(classes.split("scrollTime")[1].split(" ")[0]) * millisecondsInASecond;
   
   //Assign swipe functionality
   currentElement.bind("swipeleft", function(e)
   {
    $(this).find(".next:not(.hidden):first").trigger("click");
   });
   currentElement.bind("swiperight", function(e)
   {
    $(this).find(".previous:not(.hidden):first").trigger("click");
   });
 
   currentElement.tinycarousel({interval:true, display:scrollItems, intervaltime:scrollTime, duration:animationTime, callback:document.scrollableOnResizeListener});
  });
 
  //Auto-position next/previous arrowheads
  document.scrollableOnResizeListener();
  $(window).resize(document.scrollableOnResizeListener);
 });
}

///<summary>Optimizes the website for mobile devices</summary>

function optimizeMobile()
{
 $(document).ready(function()
 {
  document.isMobileOptimized = true;
  
  //Prevents auto-fill
  $("input").attr("autocomplete", "off").attr("autocorrect", "off");
 });
}

///<summary>Set all YouTube video links to play in-situ. Remember to suffix the URL with &autoplay=1 to trigger auto-play.</summary>

function setVideoAutoPlay()
{
 var video = $(".video.autoPlay a:first");

 //Unbind any other events attached to the link
 video.unbind();
 
 //Set the link to auto-play in an iframe with the same size as the image
 video.bind("click", function(e)
 {
  var currentVideo = $(this);
  var image = currentVideo.find("img:first");
  var imageWidth = image.width();
  var imageHeight = image.height();
  var videoElement = "";
  
  //Render auto-play iframe if the image's width/height exist
  if (isDefinedAndNotNull(imageWidth) && isDefinedAndNotNull(imageHeight))
  {
   currentVideo.hide();
   videoElement = "<iframe src=\"" + currentVideo.attr("href") + "\" width=\"" + imageWidth + "\" height=\"" + imageHeight + "\"></iframe>";
   currentVideo.after(videoElement);
   return false;
  }
 });
}

///<summary>Set google maps</summary>

function setGoogleMaps()
{
 var googleMap = $(".googleMap");
 
 //Check if any map elements exist
 if (googleMap.length >= 1)
 {
  //Load the Google Maps JS if it hasn't been loaded
  if (!isDefined(document.isGoogleMapsInitialized))
  {
   $(window).bind("load", function(e)
   {
    var script = document.createElement("script");
    var googleMapsApiKey = isDefined(document.googleMapsApiKey) ? document.googleMapsApiKey : "";
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&v=3&sensor=false&language=en&callback=setGoogleMaps";
    document.body.appendChild(script);
   });
   document.isGoogleMapsInitialized = true;
  }
  else
  //Render Google Maps
  {
   //Convert all googleMap elements with coordinates into maps
   googleMap.each(function()
   {
    var map;
    var mapMarkerIcon = "/Resource/Image/Icon/MapMarker.png";
    var mapPoint = new Array();
    var mapStrokeColor = "#008ED6";
    var textCoordinate = $(this).attr("title").replace(/[^0-9^\-^\,\.]/g, "").split(",");
    
    //Build a mapPoint coordinate array or quit if the coordinates are invalid
    if (((textCoordinate.length % 2) != 0) && (textCoordinate.length > 1))
     return false;
    else
     for (var i = 0; i < (textCoordinate.length / 2); i++)
      mapPoint.push(new google.maps.LatLng(parseAmount(textCoordinate[(2 * i)]), parseAmount(textCoordinate[((2 * i) + 1)])));
    $(this).attr("title", "");

    //Draw the map as a single point or route
    map = new google.maps.Map($(this)[0], {mapTypeControl: false, streetViewControl: false, zoomControl: true, zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.TOP_RIGHT}});
    if (mapPoint.length == 1)
    {
     map.setZoom(7);
     map.setCenter(mapPoint[0]);
     var marker = new google.maps.Marker({position: mapPoint[0], map: map, icon: mapMarkerIcon});
    }
    else
    {
     var path = new google.maps.Polyline({path: mapPoint, geodesic: false, strokeColor: mapStrokeColor, strokeOpacity: 0.75, strokeWeight: 5});
     var bounds = new google.maps.LatLngBounds();

     for (var i = 0; i < mapPoint.length; i++)
     {
      var marker = new google.maps.Marker({position: mapPoint[i], map: map, icon: mapMarkerIcon});
      bounds.extend(mapPoint[i]);
     }
     path.setMap(map);
     map.fitBounds(bounds);
    }
   });
  }
 }
}


 
///<summary>Sticky navigation for filters and action panel</summary>
function setstickyNav()
{
 var stickyNavTop = $("#flightSummary, .actionBar, .mapView .googleMap").offset();
 $(window).scroll(function () 
  {     
   if ($(window).scrollTop() > stickyNavTop.top)
    $("#flightSummary, .actionBar, .mapView .googleMap").addClass('sticky');
   else      
    $("#flightSummary, .actionBar, .mapView .googleMap").removeClass('sticky');
    $("#resultPanel").each(function(){
     var minHeight = $(window).height(); 
     minHeight -= 145;
     $(".googleMap").css("height", minHeight );
    });
  });
}



///<summary>Checking the filter height and adding the same to resultPanel</summary>
function setFilterheight()
{
 var totalHeight = 80;
  $("#filter > *").each(function(){
   totalHeight += $(this).height();
  });
 $("#resultPanel").css("min-height", +totalHeight + "px" );
}

function setPlaceholder()
{
 var supportsPlaceholder = 'placeholder' in document.createElement('input');
 $('[placeholder]').each(function () {
  if (!supportsPlaceholder) {
   var self = $(this);
   self.val(self.attr('placeholder')).addClass('placeholder');
   self.focus(function(){
    if (self.val() == self.attr('placeholder')) {
     self.val('').removeClass('placeholder');
    }
   });
   self.blur(function(){
    if (self.val() == '') {
     self.val(self.attr('placeholder')).addClass('placeholder');
    }
   });
  }	
 });
}

///<summary>Event triggered when the DOM is loaded</summary>

$(document).ready(function()
{
 protectFormSubmission();
 setPopups();
 setExpandables();
 setClickable();
 setTooltips();
 setCheckSelection();
 setClearForm();
 setTabAccessibility();
 setExternalLinks();
 focusDefaultInput();
 tightenPanelBlocks();
 setScrollable();
 setVideoAutoPlay();
 setGoogleMaps();
 setstickyNav();
 setInputs();
 setFilterheight();
 setPlaceholder();
});
