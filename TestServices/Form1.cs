using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;
using System.Xml.Serialization;
using TestServices.PostServiceClient;

namespace TestServices
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, EventArgs e)
        {
            var client = new Iv1Client();
            var dateInput = new DateInput();
            dateInput.Day = Convert.ToInt32(txtDay.Text);
            dateInput.Month = Convert.ToInt32(txtMonth.Text);
            dateInput.Year = Convert.ToInt32(txtYear.Text);

            int userId = Convert.ToInt32(txtUserId.Text);
            var post = client.GetPostForUserOnDate(userId, dateInput);
            var serializer = new XmlSerializer(typeof (PostList));
            var sw = new StringWriter();
            serializer.Serialize(sw,post);
            txtResponse.Text = sw.ToString();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
