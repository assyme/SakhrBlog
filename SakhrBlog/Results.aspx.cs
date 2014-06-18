using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SakhrBlog
{
    public partial class Results : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
     
        }

        protected override void Render(HtmlTextWriter writer)
        {
            base.Render(writer);
        
            
            
            
            
            writer.Write("<p>Result data loaded<p>");
          
           
        
        }
    }
}