using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using SakhrBlog.Models;
using SakhrBlog.Repositories;

namespace SakhrBlog
{
    public partial class index : System.Web.UI.Page
    {
        private static string _connectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            _connectionString = ConfigurationManager.ConnectionStrings["SakhrBlogConnectionString"].ConnectionString;


            //Load categories for the user
            
        }

        

        [WebMethod(EnableSession = true)]
        public static string GetUserPosts(int userId,int rowCount, int pageIndex,int[] filter)
        {
            var jsSeriallizer = new JavaScriptSerializer();
            var postRepo = new PostRepository(_connectionString);
            var totalRows = 0;
            var userPosts = postRepo.GetPostsByUser(userId,rowCount,pageIndex,filter,ref totalRows);
            var postModel = new UserPostModel();
            postModel.Posts = userPosts;
            postModel.TotalRows = totalRows;
            if (HttpContext.Current.Session["userId"] == null)
            {
                HttpContext.Current.Session.Add("userId", userId);
            }
            else
            {
                HttpContext.Current.Session["userId"] = userId;
            }
            return jsSeriallizer.Serialize(postModel);
        }

        [WebMethod]
        public static string GetUserCategories(int userId)
        {
            var jsSerializer = new JavaScriptSerializer();
            var categoryRepo = new CategoryRepository(_connectionString);
            var userCategories = categoryRepo.GetUserCategories(userId);
            return jsSerializer.Serialize(userCategories);

        }
    }

    public class UserPostModel
    {
        public List<Post> Posts { get; set; }
        public int TotalRows { get; set; }
    }
}