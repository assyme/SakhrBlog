using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using SakhrBlog.Models;

namespace SakhrBlogServices.DataContracts
{
    [DataContract]
    public class PostList
    {
        [DataMember]
        public List<Post> UserPosts { get; set; } 

        [DataMember]
        public string ExceptionMsg { get; set; }
    }
}