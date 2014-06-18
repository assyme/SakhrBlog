<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Search.aspx.cs" Inherits="SakhrBlog.Search" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="FlightsTemplate/Resource/JavaScript/Default.js"></script>
</head>
<body>
    <form id="form1" runat="server" action="Search.aspx">
    <div>
          
        <input runat="server" id="btnPost" type="button" value="Post Request"/>
        <input runat="server" id="btnGet" type="button" value="Get Request"/>
    </div>
    </form>
    <script type="text/javascript">
        var advert = (function() {
            var advert = function() {
                
            }
            advert.prototype.show = function(elem) {
                $(elem).html('');
                $(elem).html('Loading..');
            }
            return new advert();
        })();


        $('#btnPost').bind('click', function () {
            console.log("Execute get request");
            advert.show('body');
            $.ajax({
                type: "POST",
                url: "Search.aspx/GetResults_POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var jsonResponse = JSON.parse(response.d);
                    window.location = jsonResponse.url;
                }
            });
        });
        $('#btnGet').bind('click', function(e) {
            //e.preventDefaults();
            console.log("Execute get request");
            advert.show('body');
            $.ajax({
                type : "GET",
                url: "Search.aspx/GetResults",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var jsonResponse = JSON.parse(response.d);
                    window.location = jsonResponse.url;
                }
        });
        });
        
    </script>
</body>
</html>
