/**
 * @class SlideShowConfig
 * 
 * This class stores all the configurations and generally editable items for the
 * slideshow and map. The configs have been grouped up into a class to provide a
 * namespace for it.
 */
var SlideShowConfig = {
    slideshowClass :"slideshow", // The CSS class name of the slideshow
    autoSlideshow :true, // Set to true to automatically start the slideshow
    imageTransitionDelay :4000, // In milliseconds . 1 sec = 1000 milliseconds
    pauseTime :2000, // Default amount of time to pause the SlideShow
    slideshowDelay :1500, // Default amount of time the slideshow should wait before displaying
    hotelImagesPath :"/Trip/Resource/Pages/Hotel/Images/Default.aspx",
    // gmapKey : "ABQIAAAASz_m2e3ZGQLpvSneokUosBTigUcM_dOTfJ_Fgf6Sgi-i99uJ0hSIrwl1FzFZmLs0aRmB2VHGYvvMFg", This is assigned in the page
    // Functions to provide protection against variable name change.
    getSlideShowClass : function() {
        return this.slideshowClass;
    },
    getSlideShowHTML : function() {
        return "<div class=\"generalPopup "
                + SlideShowConfig.getSlideShowClass()
                + "\">"
                + "<div class=\"panel\">"
                + "<ul>"
                + " <li class=\"previous\"><a href=\"#\"><img src=\"../../../Resource/Image/Icon/Bubble/Back.png\" alt=\"Previous\" /></a></li>"
                + " <li class=\"next\"><a href=\"#\"><img src=\"../../../Resource/Image/Icon/Bubble/Next.png\" alt=\"Next\" /></a></li>"
                + " <li class=\"close\" ><a href=\"#\"><img src=\"../../../Resource/Image/Icon/Bubble/Close.png\" alt=\"Close\" /></a></li>"
                + "</ul>"
                + "<h4></h4>"
                + "</div>"
                + "<div class=\"viewport\"><div class=\"holder\"><span></span></div></div>"
                + "<!--[if IE 6]><iframe frameborder=\"0\"></iframe><![endif]--></div>";
    }
};

/*
 * IMPORTANT : User configurable options end here.
 */

/*
 * Some important global variables are declared here
 */
var currentSlideShow = null;
var intervalObject = null;
var timeoutObject = null;
var pause = false;
/**
 * callImages is a global function to make an AJAX call to request images for
 * the slideshow
 * 
 * @param id -
 *            The id to be passed to the server
 * @param object -
 *            The SlideShow object. This helps to load the images for the right
 *            slideshow
 * @return
 */
function callImages(id, type, object) {
    $.ajax( {
        method :"get",
        url :SlideShowConfig.hotelImagesPath,
        data :(type=="Room"?"roomid=":"id=") + id,
        beforeSend : function() {
            object.toggleLoading();
        },
        success : function(data) {
            object.toggleLoading();
            object.ajaxSuccessCallback(data);
        }
    });
};

/**
 * The following are slideshow related functions. They are used to manage the
 * autorunning of the slideshow
 */
function startSlideShow() {
    if (!SlideShowConfig.autoSlideshow || currentSlideShow == null)
        return;

    if (pause)
        pauseSlideShow();

    if (intervalObject == null && currentSlideShow.count() > 1)
        intervalObject = setInterval("runSlideShow()",SlideShowConfig.imageTransitionDelay);
};

function runSlideShow() {
    if (currentSlideShow == null) {
        endSlideShow();
        return;
    }

    if (!currentSlideShow.isNextImage()) {
        currentSlideShow.resetCurrentImage();
        currentSlideShow.currentImage();
    } else
        currentSlideShow.nextImage();

    currentSlideShow.redrawPanel();
};

function pauseSlideShow(ms) {
    if (ms == null)
        ms = SlideShowConfig.pauseTime;

    endSlideShow();
    timeoutObject = setTimeout("startSlideShow();", ms);
};

function endSlideShow() {
    clearInterval(intervalObject);
    intervalObject = null;
    clearTimeout(timeoutObject);
    timeoutObject = null;
};

/**
 * @class SlideShow
 * 
 * This class represents a SlideShow. To create a new slideshow, instantiate the
 * object and pass in the parent DOM node. The slideshow is displayed inside
 * that DOM node.
 * 
 * This class contains no configurable properties
 * 
 * @param obj
 * @return
 */
function SlideShow(obj) {
    this.object = $(obj); // The DOM node for this slideshow.
    this.ImageStack = new Array(); // The stack of images for this slideshow.
    this.currentImagePos = null; // The current image being shown
    this.isOn = false;
    
    this.isShow = function() {        
        return this.isOn;
    };    
    
    /**
     * This function creates the HTML of the slideshow, and returns it as a
     * string
     * 
     * @return string
     */
    this.getBaseHTML = function() {
        return SlideShowConfig.getSlideShowHTML();
    };

    /**
     * Insert the slideshow into the "parent" DOM node. It also assigns event
     * handlers to the panel buttons
     * 
     * @param parent -
     *            Parent DOM node, inside which the slideshow is created
     * @return null
     */
    this.insertSlideShow = function(parent) {
        $(parent).append(this.getBaseHTML());

        $(parent).find(".next a")[0].onclick = function() {
            pauseSlideShow();
            currentSlideShow.nextImage();
            currentSlideShow.redrawPanel();
            return false;
        };
        
        $(parent).find(".previous a")[0].onclick = function() {
            pauseSlideShow();
            currentSlideShow.previousImage();
            currentSlideShow.redrawPanel();
            return false;
        };
        
        $(parent).find(".close a")[0].onclick = function() {
            var t = new SlideShow($(this).parents("." + SlideShowConfig.getSlideShowClass())[0]);
            t.hide();
            return false;
        };
    };

    /**
     * Load the images via AJAX. The function passes the ID to the AJAX request.
     * IMPORTANT : Fetch the ID is not implemented. Where should i fetch it from
     * 
     * @return null
     */
    this.loadImages = function() {

        var id = this.getId();
        var type = this.getCollectionType();
        callImages(id, type, this);
    };

    /**
     * The callback is called by the AJAX request once the request as completed.
     * It assigns images to the ImageStack and displays the first one.
     * 
     * @param data -
     *            The data returned via AJAX
     * @return
     */
    this.ajaxSuccessCallback = function(data) {
        var xml;

        if (typeof data == "string") {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        } else
            xml = data;

        var imageContainer = $(xml).find("images").first();
        var isHttps = (window.location.href.indexOf("https://") == 0);
        var imageBase;
        var imageUrl;
        var temp = $(xml).find("image");
        
        if ((isHttps) && (imageContainer.attr("httpsbase") != undefined))
         imageBase = imageContainer.attr("httpsbase");
        else
         imageBase = imageContainer.attr("base");

        for ( var i = 0; i < temp.length; i++) {
            this.ImageStack[i] = new Array();
            
            if ((isHttps) && ($(temp[i]).first().attr("surl") != undefined))
             imageUrl = $(temp[i]).first().attr("surl");
            else
             imageUrl = $(temp[i]).first().attr("url");
            if ((imageUrl.indexOf("http://") != 0) && (imageUrl.indexOf("https://") != 0))
             imageUrl = imageBase + imageUrl;
            this.ImageStack[i]["src"] = imageUrl;

            this.ImageStack[i]["caption"] = $(temp[i]).attr("text");

            // Preload the images here
            var imageLoader = new Image(); // For image preloading
            //imageLoader.onload = function(){this.ready=true;};
            imageLoader.src = this.ImageStack[i]["src"];
            this.ImageStack[i]["cache"] = imageLoader; // store the image as a cache. We can use it to check of the image has loaded completely.
        };

        if (this.currentImagePos == null && temp.length > 0) {
            this.resetCurrentImage();
            this.currentImage();
            this.redrawPanel();

            if (SlideShowConfig.autoSlideshow) startSlideShow();
        };
    };

    /**
     * Show an image in the slideshow.
     * 
     * @param href -
     *            The href of the image
     * @param caption -
     *            The caption to display
     * @return null
     */
    this.showImage = function(href, caption) {
        this.object.addClass("loading");
        var xpos = 0, ypos = 0;
        this.object.find("h4").html(caption);

        var holder = this.object.find(".holder");
        var img = this.object.find(".holder img.slide");

        if (img.length > 0) // If an img is found, clear the styles
        {
            img.hide();
            img.css("margin", "auto");
            img.attr("src", href);
        } else {
            holder.append("<img class=\"slide\" src=\"" + href + "\" />");
            img = this.object.find(".holder img.slide");
            img.hover( function() {
                pause = true;
                pauseSlideShow();
            }, function() {
                pause = false;
            });
        };

        if ((!$.browser.msie && this.ImageStack[this.currentImagePos]["cache"].complete) || $.browser.msie) {
            // A bug in the calculation causes the display to mess-up
            // xpos = Math.floor((holder.width() - img.width()) / 2);
            // ypos = Math.floor((holder.height() - img.height()) / 2);
        } else if (!$.browser.msie && !this.ImageStack[this.currentImagePos]["cache"].complete) {
            endSlideShow();
            timeoutObject = setTimeout("runSlideShow(); startSlideShow();", 100);
            this.currentImagePos = -1;
            return;
        }

        img.css("margin-top", ypos);

        if (xpos == 0)
            img.css("margin", "auto");
        else
            img.css("margin-left", xpos);

        this.object.removeClass("loading");
        img.fadeIn("slow");
    };

    /**
     * Reset the current image to the first one on the stack
     * 
     * @return null
     */
    this.resetCurrentImage = function() {
        this.currentImagePos = 0;
    };

    /**
     * Clear the current image and caption. This does not reset the image
     * counter
     * 
     * @return null
     */
    this.clearImage = function() {
        this.object.find(".holder img").remove();
        this.object.find("h4").html("");
    };

    /**
     * Checks if there is another image on the stack.
     * 
     * @return bool
     */
    this.isNextImage = function() {
        return (this.currentImagePos + 1 < this.ImageStack.length);
    };

    /**
     * Checks if there is another image before this image on the stack.
     * 
     * @return bool
     */
    this.isPrevImage = function() {
        return (this.currentImagePos > 0);
    };

    /**
     * Display the current image from the stack
     * 
     * @return null
     */
    this.currentImage = function() {
        var t = this.ImageStack[this.currentImagePos];
        this.showImage(t["src"], t["caption"]);
    };

    /**
     * Display the next image on the stack
     * 
     * @return null
     */
    this.nextImage = function() {
        if (!this.isNextImage())
            return;

        var t = this.ImageStack[++this.currentImagePos];
        this.showImage(t["src"], t["caption"]);
    };

    /**
     * Display the previous image on the stack
     * 
     * @return null
     */
    this.previousImage = function() {
        if (this.currentImagePos < 1)
            return;

        var t = this.ImageStack[--this.currentImagePos];
        this.showImage(t["src"], t["caption"]);
    };

    /**
     * Check and display/hide the "next" and "previous" buttons on the slideshow
     * panel
     * 
     * @return null
     */
    this.redrawPanel = function() {
        this.displayNextButton(this.isNextImage());
        this.displayPrevButton(this.isPrevImage());
    };

    /**
     * Sets the DOM node for this object
     * 
     * @param object -
     *            The parent DOM node.
     * @return null
     */
    this.setDOMObject = function(object) {
        this.object = (!object.show) ? $(object) : object;
    };

    this.count = function() {
        return this.ImageStack.length;
    };
    
    /**
     * Display the slideshow
     * 
     * @return null;
     */
    this.show = function() {

        /* This is for IE, to solve the z-index stacking problem */
        showIE(this.object);

        currentSlideShow = this;
        this.loadImages();
        this.object.show();
        this.isOn = true;
    };

    /**
     * Hide the current slideshow NOTE : This also stops the auto-scrolling of
     * the slideshow, and clears the panel and viewport
     * 
     * @return null
     */
    this.hide = function() {

        var obj = this;

        var temp = function() {
            obj.object.hide();
            obj.clearImage();
            obj.redrawPanel();

            endSlideShow();
            pause = false;
            currentSlideShow = null;

            hideIE(obj.object);
        };
        temp();
        this.isOn = false;
    };

    /*
     * Various util functions
     */
    this.getId = function() {
        var temp = $(this.object.parent()).attr("id");
        temp = temp.split("_")[1];
        return parseInt(temp);
    };
    this.getCollectionType = function() {
        var temp = $(this.object.parent()).attr("id");
        temp = temp.split("_")[0];
        return temp;
    };
    this.toggleLoading = function() {
        this.object.toggleClass("loading");
    };
    this.getObject = function() {
        return this.object;
    };
    this.displayNextButton = function(bool) {
        this.object.find(".next")[0].style.visibility = (bool) ? "visible"
                : "hidden";
    };
    this.displayPrevButton = function(bool) {
        this.object.find(".previous")[0].style.visibility = (bool) ? "visible"
                : "hidden";
    };
}

/*
 * Other Functions - There are GoogleMap related functions here. They were put
 * here for lack of a better place :( Also some functions for IE :(
 */

/**
 * parseMapCoordinates - This function will get the coordinates for Google Map
 * 
 * @param val -
 *            CSV or space separated string containing the coordinates.
 */
function parseMapCoordinates(val) {
    if (val == null)
        return false;

    if (val.indexOf(",") > -1)
        var coords = val.split(",", 2);
    else
        var coords = val.split(" ", 2);

    if (coords.length < 2)
        return false;

    coords[0] = parseFloat(coords[0]);
    coords[1] = parseFloat(coords[1]);

    if (isNaN(coords[0]) || isNaN(coords[1]))
        return false;

    return coords;
};

/**
 * Inserts the Google Map into the placeholder provided. Note: All GMap
 * customizations are here
 * 
 * @param node -
 *            The DOM node to insert the GMap
 * @param latitude
 *            (float)
 * @param longitude
 *            (float)
 */
function insertGMap(node, latitude, longitude) {
    
    var url  = SlideShowConfig.getStaticGMapURL(latitude, longitude);
    var link = SlideShowConfig.getGMapLink(latitude, longitude); 
    
    if($(node).find("img.mapImage").length == 0)
        $(node).html("<a href=\""+link+"\" ><img src=\""+url+"\" class=\"mapImage popup\" /></a>");
    else
        $(node).find("img.mapImage").src = url;
    
    $(node).find("a").click(function(e)
    {
     window.open(this.href);
     return false;
    });
    
    return;

    return gmap;
};

function showIE(obj) {

    if (!$.browser.msie)
        return;

    var zindex = 1002;
    obj.parent().css("z-index", zindex);
    obj.parents("td").css("z-index", --zindex);
    obj.parents("tr").css("z-index", --zindex).css("position", "relative");
};

function hideIE(obj) {

    if (!$.browser.msie)
        return;

    obj.parent().get(0).style.zIndex = "auto";
    obj.parents("td")[0].style.zIndex = "auto";
    obj.parents("tr")[0].style.zIndex = "auto";
	obj.parents("tr")[0].style.position = "static";
};
