using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SakhrBlog.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PostDetail { get; set; }
        public List<Category> Categories { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}