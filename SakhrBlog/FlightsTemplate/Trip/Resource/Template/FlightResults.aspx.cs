using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SakhrBlog.FlightsTemplate.Trip.Resource.Template
{
    public partial class FlightResults : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static string GetFlights()
        {
            Thread.Sleep(10000); // mimic search operations. 
            //Normally you would use a json serializer to convert a .net object to json string and return. 
            //for now just using a js file. 
            var path = HttpContext.Current.Server.MapPath("../JsonData/structjson_1200.js");
            var jsonData = File.ReadAllText(path);
            jsonData = jsonData.Remove(0, 10).Replace(Environment.NewLine,""); // removing var ajson = 
            return jsonData;
        }
    }
}