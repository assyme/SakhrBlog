using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SakhrBlog.Models;
using SakhrBlog.Repositories;

namespace SakhrBlog
{
    public partial class NewPost : System.Web.UI.Page
    {
        private string _connectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            btnSubmit.Click += BtnSubmitOnClick;
            _connectionString = ConfigurationManager.ConnectionStrings["SakhrBlogConnectionString"].ConnectionString;
            var userId = Convert.ToInt32(Session["userId"].ToString());

            if (!this.IsPostBack)
            {
                var categoryRepository = new CategoryRepository(_connectionString);
                var userCategories = categoryRepository.GetUserCategories(userId);
                cblCategories.DataSource = userCategories;
                cblCategories.DataValueField = "Id";
                cblCategories.DataTextField = "Name";
                cblCategories.DataBind();    
            }
            
        }

        private void BtnSubmitOnClick(object sender, EventArgs eventArgs)
        {
            //Submitting the form here. 
            if (!ValidateNewPostControl())
            {
                Response.Write("Javascript:alert('Input fields are invalide');");
                return;
            }
            
            var userId = Convert.ToInt32(Session["userId"].ToString());
            Post post = new Post {Name = txtTitle.Text, PostDetail = txtDetail.Text};
            post.Categories = new List<Category>();
            foreach (ListItem item in cblCategories.Items)
            {
                if (item.Selected)
                {
                    post.Categories.Add(new Category{Id = int.Parse(item.Value),Name = item.Text});
                }
            }
            var postRepository = new PostRepository(_connectionString);
            try
            {
                postRepository.AddNewPost(userId, post);
            }
            catch (Exception)
            {
                Response.Write("Javascript:alert('could not add post')");
            }
        }

        private bool ValidateNewPostControl()
        {
            if (String.IsNullOrEmpty(txtTitle.Text))
            {
                return false;
            }
            if (String.IsNullOrEmpty(txtDetail.Text))
            {
                return false;
            }
            var alteastOneChecked = cblCategories.Items.Cast<ListItem>().Any(listItem => listItem.Selected);
            if (!alteastOneChecked)
            {
                return false;
            }
            return true;
        }
    }
}