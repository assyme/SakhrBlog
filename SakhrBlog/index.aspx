<%@ Page Title="" Language="C#" MasterPageFile="~/layout.Master" AutoEventWireup="true"
    CodeBehind="index.aspx.cs" Inherits="SakhrBlog.index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="pageHolder" runat="server">
    
    
    <h3>Hide Categories</h3>
    <div id="userCategories">
        
    </div>
    <input type="submit" value="filter" onclick="return sakhr.events.GetUserPosts()"/>
    <div id='userposts'>
        
    </div>
    <ul id="pagination" class="pagination">
        
    </ul>
    
    <script>
        document.addEventListener("DOMContentLoaded", function (event) {
            console.log("DOM fully loaded and parsed");
            sakhr.Posts.getUserCategories();

        });
</script>
</asp:Content>
