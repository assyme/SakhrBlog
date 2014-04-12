//View Model for NewPost.aspx
var sakhr = sakhr || {};

sakhr.NewPost = {
    Validate: function() {
        //text validations on client side. 
        var elem = document.getElementById("pageHolder_txtTitle");
        var titleValue = elem.value;
        if (!titleValue.match(/\S/)) {
            alert("Please enter a title");
            return false;
        }
        var detail = document.getElementById("pageHolder_txtDetail").value;
        if (!detail.match(/\S/)) {
            alert("Please enter details of the post");
            return false;
        }
        var inputElements = document.getElementsByTagName("input");
        var atleastOneChecked = false;
        for (var i = 0; i < inputElements.length; i++) {
            if (inputElements[i].id.indexOf("cblCategories") > 0 && inputElements[i].checked) {
                atleastOneChecked = true;
                break;
            }
        }
        if (!atleastOneChecked) {
            alert("Atlease one category must be checked. ");
            return false;
        }
        return true;
    }
};

