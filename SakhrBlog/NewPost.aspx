<%@ Page Title="" Language="C#" MasterPageFile="~/layout.Master" AutoEventWireup="true"
    CodeBehind="NewPost.aspx.cs" Inherits="SakhrBlog.NewPost" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="scripts/NewPostModel.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="pageHolder" runat="server">
    <div class="well">
    <div class="form-group">
        <label for="name">Post Title</label>
        <asp:TextBox CssClass="form-control" runat="server" ID="txtTitle"></asp:TextBox>    
    </div>
    <div class="form-group">
        <label for="detail">Post Detail</label>
        <asp:TextBox TextMode="MultiLine" CssClass="form-control" runat="server" ID="txtDetail"></asp:TextBox>    
    </div>
    <div class="form-group">
    <label for="categories">
      Categories 
    </label>
    <div class="checkbox"><asp:CheckBoxList runat="server" ID="cblCategories"/></div>
    
  </div>
    
    <asp:Button OnClientClick="return sakhr.NewPost.Validate()" runat="server" ID="btnSubmit" Text="Create"/>
    </div>
</asp:Content>
