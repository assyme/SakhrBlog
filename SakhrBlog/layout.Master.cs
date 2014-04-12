using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SakhrBlog
{
    public partial class layout : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            var users = GetUsers();
            ddlUsers.DataTextField = "UserName";
            ddlUsers.DataValueField = "Id";
            ddlUsers.DataSource = users;
            ddlUsers.DataBind();
            if (Session["userId"] == null && users.Rows.Count > 0)
            {
                Session.Add("userId",users.Rows[0][0]);
            }
        }

        private DataTable GetUsers()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["SakhrBlogConnectionString"].ConnectionString;
            var sqlAdapter = new SqlDataAdapter("select * from users", connectionString);
            DataSet ds = new DataSet();
            sqlAdapter.Fill(ds, "users");
            return ds.Tables["users"];
        }
    }
}