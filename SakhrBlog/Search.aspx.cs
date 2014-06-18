using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Caching;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SakhrBlog
{
    public partial class Search : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        [WebMethod(BufferResponse = true)]
        [ScriptMethod(UseHttpGet = true)]
        
        public static string GetResults()
        {
            //This guy does a search and returns the result page url.
            Thread.Sleep(10000); // to mimic searching senario. 
            var obj = new {url = "Results.aspx"};
            var jsonSerializer = new JavaScriptSerializer();
            return jsonSerializer.Serialize(obj);
        }

        [WebMethod(BufferResponse = true)]
        public static string GetResults_Post()
        {
            //This guy does a search and returns the result page url.
            Thread.Sleep(10000); // to mimic searching senario. 
            var obj = new { url = "Results.aspx" };
            var jsonSerializer = new JavaScriptSerializer();
            return jsonSerializer.Serialize(obj);
        }
    }
}