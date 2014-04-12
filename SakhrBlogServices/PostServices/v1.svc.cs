using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using SakhrBlog.Repositories;
using SakhrBlogServices.DataContracts;

namespace SakhrBlogServices.PostServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "v1" in code, svc and config file together.
    public class v1 : Iv1
    {
       
        public PostList GetPostForUserOnDate(int userId, DateInput date)
        {
            //Validate date inputs. 
            var postList = new PostList();
            try
            {
                var dateObj = new DateTime(date.Year, date.Month, date.Day);

                string connectionString = ConfigurationManager.ConnectionStrings["SakhrBlogConnectionString"].ConnectionString;
                var postRepository = new PostRepository(connectionString);
                var lsPosts = postRepository.GetAllPostsOnDate(userId, dateObj);
                postList.UserPosts = lsPosts;
            }
            catch (Exception ex)
            {
                postList.ExceptionMsg = ex.Message;
            }
            return postList;
        }
    }
}
