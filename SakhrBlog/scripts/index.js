var sakhr = sakhr || {};
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
        });
    };
}
//defining namespaces. 
sakhr.events = {};
sakhr.events.GetUserPosts = function() {
    sakhr.Posts.currentPage = 0;
    sakhr.Posts.getPostByUser();
    return false; // to prevent default asp.net callback;
};

sakhr.events.applyPagination = function(page) {
    sakhr.Posts.currentPage = page;
    sakhr.Posts.getPostByUser();
};

var ajax = function (options) {
    var xhr;

    if (typeof options == "undefined" || options == null) {
        return; //throw error or just return without hitting any url
    }
    options.success = options.success || function () { };
    options.error = options.error || function () { };


    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        //for microsofts grandpa's
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            options.success.call(options,JSON.parse(xhr.responseText));
        } else if (xhr.readyState == 4 && xhr.state != 200) {
            options.error.call(xhr.responseText);
        };
    };

    xhr.open("POST", options.url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    if (typeof options.data != "undefined") {
        xhr.send(JSON.stringify(options.data));
    } else {
        xhr.send();    
    }
    

};

sakhr.Posts = (function() {

    var posts = function() {
        this.posts = []; // array of posts
        this.currentPage = 0;
    };

    posts.prototype.getUserCategories = function() {
        var userDropDown = document.getElementById("ddlUsers");
        var selectedUser = userDropDown.options[userDropDown.selectedIndex].value;
        console.log(selectedUser);
        ajax({
            url: "index.aspx/GetUserCategories",
            data: { userId: selectedUser },
            success: function (response) {
                console.log(response.d);
                var jsonObject = JSON.parse(response.d);
                var elem = document.getElementById("userCategories");
                elem.innerHTML = "";
                for (var i = 0; i < jsonObject.length; i++) {
                    var cat = jsonObject[i];
                    elem.innerHTML += "<input type='checkbox' name='chk_group' value='{0}'/>{1}<br/>".format(cat.Id,cat.Name);
                }
                sakhr.Posts.getPostByUser();
            }
        });
    };

    

    posts.prototype.getPostByUser = function (page) {
        var selectedCategories = [];
        var catElems = document.getElementsByName("chk_group");
        for (var i = 0; i < catElems.length; i++) {
            var ele = catElems[i];
            if (ele.checked) {
                selectedCategories.push(ele.value);
            }
        }
        var ddlElement = document.getElementById("ddlUsers");
        var userId = ddlElement.options[ddlElement.selectedIndex].value;
        
        ajax({ // This is not jquery - Implemented above. 
            url: "index.aspx/GetUserPosts",
            data : {userId : userId,rowCount : 2, pageIndex : this.currentPage,filter : selectedCategories},
            success: function(response) {
                console.log(response.d);
                var jsonObject = JSON.parse(response.d);
                posts.render("userposts", jsonObject.Posts);
                posts.renderPager("pagination",jsonObject.TotalRows);
            }
        });
    };

    posts.renderPager = function(elemId,totalRows) {
        var elem = document.getElementById(elemId);
        elem.innerHTML = "";
        for (var i = 1, j=1; i < totalRows; i=i * 2,j++) {
            elem.innerHTML += "<li><a href='#' onClick='javascript:sakhr.events.applyPagination({0})'>{1}</a></li>".format(j-1,j);
        }
    };  

    posts.render = function(elemId, lsposts) {
        // life becomes so easy with handlebars, but was asked to use vanila JS. :)
        var elem = document.getElementById(elemId);
        elem.innerHTML = "";
        for (var i = 0; i < lsposts.length; i++) {
            var post = lsposts[i];
            var template = "<div class='well well-sm'><h3>" + post.Name + "</h3><p>" + post.PostDetail + "</p></div>";
            elem.innerHTML += template;
        }
    };

    return new posts(); // singleton class hence initialize here itself. 
})();

