function initializeHotelDescription()
{
	$("#listing .item").each(function()
	{
	 var $parent = $(this);
	 $(".less, .more", $parent).each(function()
	 {
	  var $current = $(this);
	  $current.click(function()
	  {
	   $current.removeClass("active");

	   var $summary = $(".summary", $parent);
	   if($current.hasClass("less"))
	   {
	    $summary.hide();
		$(".more",$parent).addClass("active");
	   }
	   else
	   {
	    $summary.show();
		$(".less",$parent).addClass("active");
	   }
	   return false;
	  });
	 });

	 $(".roomType", $parent).each(function()
	 {
	  var $current = $(this);
	  $current.click(function()
	  {
		$(".summary", $parent).show();
		$(".more",$parent).removeClass("active");
		$(".less",$parent).addClass("active");
	   return false;
	  });
	 });
	});

	if ($("#photos .more").length > 0)
	{
	 $("#photos li").css("cursor", "pointer");
	 $("#photos .more,#photos li").click(function()
     {
      $("#slideShowImages li a").lightBox({'imageLoading': '/Resource/Image/Icon/Spinner.gif',
       'fixedNavigation': true,
       'containerBorderSize': 0,
       'imageBtnPrev': '/Resource/Image/Icon/Slider/Left.png',
       'imageBtnNext': '/Resource/Image/Icon/Slider/Right.png',
       'imageBtnClose': '/Resource/Image/Icon/Close.png'
      });
      $("#slideShowImages li a:first").trigger("click");
      return false;
     });
	}
}

function unload() {
    // This is needed to prevent memory leaks in (guess which browser?)
    if (typeof GUnload == "function")
        GUnload();
}

$(document).ready(initializeHotelDescription);
$(document).unload(unload);
