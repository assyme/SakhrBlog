/**
 * @author Adil Baig
 * @since 2009-02-26
 * @version 0.98
 * 
 * This file contains all functionality necessary to display the slideshow on the Hotel Listing page.
 * Its also creates and assigns the GMap, and the room price change functionality 
 */

/**
 * Customize the SlideShow config.
 */

SlideShowConfig.mapClass = "map";
SlideShowConfig.getMapClass = function() {
    return this.mapClass;
};
SlideShowConfig.getMapHTML = function() {
    return "<div class=\"generalPopup loading "
            + SlideShowConfig.mapClass
            + "\" >"
            + "<div class=\"panel\"><p>Area Map</p><a class=\"close\" href=\"#\"><img src=\"../../../Resource/Image/Icon/Bubble/Close.png\" alt=\"Close\" /></a></div>"
            + "<div class=\"viewport\"><div class=\"holder\"></div></div>"
            + "<!--[if IE 6]><iframe frameborder=\"0\"></iframe><![endif]--></div>";
};
SlideShowConfig.getStaticGMapURL = function(latitude, longitude) {
    var gmapUrl = SlideShowConfig.gmapStaticUrl;
    gmapUrl = gmapUrl.replace(/\[LongitudeLatitude]/g, latitude+","+longitude);
    gmapUrl = gmapUrl.replace("[GoogleAPIKey]", SlideShowConfig.gmapKey);
    return gmapUrl;
};
SlideShowConfig.getGMapLink = function(latitude, longitude) {
    return "http://maps.google.com/maps?q=loc:"+latitude+","+longitude+"&iwloc=J";
};
/*
 * Other misc. functions
 */

/**
 * getCoordinates - This function will tell get the coordinates for Google Map
 * 
 * @param object -
 *            The DOM node whose child contains the coordindate for the map
 */
function getCoordinates(object) {
    var val = $(object).children("a").attr("title");
    if (val == null) return false;
	$(object).children("a").attr("title", "");
    return parseMapCoordinates(val);
};

/**
 * Initialize slideshow, googlemaps and hotel rooms. This is where the action
 * starts.
 * 
 * @return
 */
function initialize() {
    var expr = "." + SlideShowConfig.getSlideShowClass();
    // SlideShow : Hook up all the hotel images with a slideshow object. Define
    // the hover events for each image. Also add the "plus" sign on the image
    $("#hotels .slideshowHolder").each( function() {

        // This adds the "plus" sign to the hotel images
            var imageContainer = $(this).find(".imageContainer");
            var thumbnailImageURL = imageContainer.attr("title");
            
            //Load images only when they scroll into view
            imageContainer.bind("scrollin", function()
            {
             var image = $(this);
             image.unbind("scrollin");
             image.css("background-image", "url(" + image.attr("title") + ")");
             image.attr("title", "");
            });
            
            //Extract image URL
            thumbnailImageURL = thumbnailImageURL.replace("url(", "");
            thumbnailImageURL = thumbnailImageURL.replace(")", "");
            thumbnailImageURL = thumbnailImageURL.replace("\"", "");
            thumbnailImageURL = thumbnailImageURL.replace("\"", "");
            
            if (thumbnailImageURL != undefined)
            {
               $(this).append("<span class=\"activateSlideshow\">View slideshow</span>");
               
               $(this).hover( function()
               {
                var obj = $(this);
                // Create a new slideshow object
                var slideshow = new SlideShow();

                // Insert the slideshow inside this DOM node (.slidehowHolder)
                if (!obj.children(expr).length)
                 slideshow.insertSlideShow(obj);

                // Set the slideshow DOM node
                slideshow.setDOMObject(obj.children(expr));

                // Go!
                slideshow.show();
               }, function()
               {
                // If the mouse hovers out, hide the slide show
                var slideshow = new SlideShow($(this).children(expr));
                slideshow.hide();                    
               });
            }
        });

    // Maps : Embed Maps
    $("#hotels .areaMap .mapHolder").each( function() {

            $(this).hover( function() {

                var cls = SlideShowConfig.getMapClass();
                var mapHolder = $(this);
                var map = $(mapHolder).find("." + cls);

                // If the map has not been created, create it
                    if (!map.length) {
                        var str = SlideShowConfig.getMapHTML();
                        $(mapHolder).append(str);

                        // Assign event handler for the "close" button. When the close button is clicked hide the popup.
                        mapHolder.find(".close").click( function() {
                            $(this).parents("." + cls).hide();
                            return false;
                        });
                        map = $(mapHolder.find("." + cls));
                    };
                    
                    showIE($(map));
                    $(map).show();
                    
                    // If the map has already been inserted, stop!
                    if (mapHolder.find(".holder").html().length > 0)
                        return;

                    // Fetch the coordinates.
                    var coords = getCoordinates(mapHolder);

                    if (coords == false)
                        return;

                    var latitude = Number(coords[0]);
                    var longitude = Number(coords[1]);

                    // Insert GMap
                        insertGMap(mapHolder.find(".holder").get(0), latitude, longitude);
                },
                // On hover out, hide the map
                    function() {
                        var temp = $(this).find("." + SlideShowConfig.getMapClass());
                        temp.hide();
                        hideIE(temp);
                    });
        });

        //Nearby areas : Show/hide the dropdowns
        $("#content a.nearby").click( function() {
         var nearbyLocations = $(this).parent().find(".nearbyLocations");
         
         if(nearbyLocations.css('display') != 'none')
         {
          nearbyLocations.hide();
          $(this).removeClass('open');
         }
         else
         {
          nearbyLocations.show();
          $(this).addClass('open');
         }
         return false;
        });
        
};

function unload() {
    // This is needed to prevent memory leaks in IE
    if (typeof GUnload == "function")
        GUnload();
};

///<summary>Sets the hotel filters</summary>

function setHotelFilter()
{
 var filter = $("#searchBy");
 var starRatingFilter = "";
 var starRatingFilterCheckbox = filter.find(".starRating input:checked");
 var locationFilter = new Array();
 var locationFilterCheckbox = filter.find(".location input:checked");
 var nameFilter = jQuery.trim(filter.find(".hotel input:text").val()).toLowerCase();
 var hotel = $("#listing > li");
 var filteredResults = 0;
 var noResultsMessage = $("#noResultsMessage");

 delete filter.lastFilterTimeoutID;

 //Prepare and optimize filters
 starRatingFilterCheckbox.each(function()
 {
  starRatingFilter += this.value;
 });
 locationFilterCheckbox.each(function()
 {
  locationFilter.push(this.value);
 });
 
 //Filter results
 hotel.each(function()
 {
  var matched = true;
  if (starRatingFilter.length > 0)
   matched = matched && (starRatingFilter.indexOf(this.starRating) > -1);
  if (locationFilter.length > 0)
  {
   var matchedLocation = false;
   for (var i in locationFilter)
    matchedLocation = matchedLocation || (this.location.indexOf(locationFilter[i]) > -1);
   matched = matched && matchedLocation;
  }
  if (nameFilter.length > 0)
   matched = matched && (this.name.indexOf(nameFilter) > -1);
  if (matched)
  {
   $(this).show();
   filteredResults++;
  }
  else
  {
   $(this).hide();
  }
 });

 //Display message if no results
 if (filteredResults > 0)
  noResultsMessage.addClass("invisible");
 else
  noResultsMessage.removeClass("invisible");
}

///<summary>Reset hotel filters</summary>

function resetHotelFilters()
{
 var filter = $("#searchBy");
 var filterCheckedCheckbox = filter.find("input:checked");
 var filterText = filter.find("input:text");
 
 filterCheckedCheckbox.prop("checked", false);
 filterText.val("");
 
 setHotelFilter();
}

///<summary>Shows all hotel location filters</summary>

function showHotelAllLocationFilters()
{
  var filter = $("#searchBy");
  var locationFilter = filter.find(".location li");
  var locationFilterMore = filter.find(".location a.more");

  locationFilterMore.hide();
  locationFilter.each(function()
  {
   $(this).show();
  });
}

///<summary>Initializes functionality for hotel filters</summary>

function initializeHotelFilter()
{
 $(document).ready(function()
 {
  var filter = $("#searchBy");
  var filterCheckbox = filter.find("input:checkbox");
  var nameFilterInput = filter.find(".hotel input:text");
  var locationFilter = filter.find(".location li");
  var locationFilterCheckbox = filter.find(".location input");
  var locationFilterCheckedCheckbox = filter.find(".location input:checked");
  var locationFilterMore = filter.find(".location a.more");
  var latency = 700;
  var maximumLocationFilters = 8;
  var noResultsMessageMore = $("#noResultsMessage a.more");
  var hotel = $("#listing > li");
  
  //Optimize filters
  if ((locationFilter.length > maximumLocationFilters) && (locationFilterCheckedCheckbox.length == 0))
  {
   for (var i = maximumLocationFilters; i < locationFilter.length; i++)
   {
    $(locationFilter[i]).hide();
   }
   locationFilterMore.removeClass("invisible");
   locationFilterMore.bind("click", showHotelAllLocationFilters);
  }

  //Prepare and optimize filter data
  filterCheckbox.each(function()
  {
   this.value = jQuery.trim(this.value).toLowerCase();
  });
  hotel.each(function()
  {
   this.starRating = jQuery.trim($(this).find("p.rating").text()).substr(0, 1);
   this.location = jQuery.trim(this.title).toLowerCase();
   this.title = "";
   this.name = jQuery.trim($(this).find("h5").text()).toLowerCase() + " " + jQuery.trim($(this).find("p.summary").text()).toLowerCase();
  });
  nameFilterInput.oldValue = jQuery.trim(nameFilterInput.val()).toLowerCase();

  //Attach event handlers
  filterCheckbox.bind("change", onChangeHotelFilter);
  locationFilterCheckbox.bind("change", function(e)
  {
   showHotelAllLocationFilters();
  });
  nameFilterInput.bind("keyup", function(e)
  {
   var newValue = jQuery.trim($(this).val()).toLowerCase();
   if (this.oldValue != newValue)
   {
    onChangeHotelFilter();
    this.oldValue = newValue;
   }
  });
  noResultsMessageMore.bind("click", resetHotelFilters);

  //Filter on page load
  setHotelFilter();
 });
}
 
///<summary>Handles the onChange event for hotel filters</summary>
///<param name="e">Event</param>

function onChangeHotelFilter(e)
{
 var filter = document.getElementById("searchBy");
 var latency = 700;

 if (filter.lastFilterTimeoutID != undefined)
  clearTimeout(filter.lastFilterTimeoutID);
 filter.lastFilterTimeoutID = setTimeout(setHotelFilter, latency);
}


///<summary>Load images only when they scroll into view</summary>
$("body img").each(function() {
  var imageHolder =$(img);
   imageHolder.bind("scrollin", function()
   { 
    var image = $(img [data-src!=""] [src=""]);
    image.unbind("scrollin");
    image.src = $(this).data('src');
    image.attr("data-src", "");
   });
});

$(document).ready(initialize);
$(document).unload(unload);
