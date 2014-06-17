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
          
        <input runat="server" id="btnSubmit" type="submit" value="Search"/>
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


        $('#btnSubmit').bind('click', function () {
            console.log('button clicked');
        });
        $('#form1').bind('submit', function() {
            console.log('form submitted');
            advert.show('body');
        });
    </script>
</body>
</html>
