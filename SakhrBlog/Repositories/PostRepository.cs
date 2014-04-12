using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using SakhrBlog.Models;

namespace SakhrBlog.Repositories
{
    public class PostRepository
    {
        private string _connnectionString;

        public PostRepository(string connectionString)
        {
            if (String.IsNullOrEmpty(connectionString))
            {
                throw new Exception("Repositories should have a connection string to a data source");
            }
            _connnectionString = connectionString;
        }

        public List<Post> GetPostsByUser(int userId,int rowCount, int pageIndex, int[] filter ,ref int totalRows)
        {

            var lsPost = new List<Post>();
            var connection = new SqlConnection(_connnectionString);
            var command = connection.CreateCommand();
            command.CommandText = "sp_GetUserPosts";
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@userId", userId);
            command.Parameters.AddWithValue("@rowCount", rowCount);
            command.Parameters.AddWithValue("@pageIndex", pageIndex);
            var filterParam = new SqlParameter("@filter",SqlDbType.Structured);
            command.Parameters.Add(GetCategoryIdsParameter(filter));
            
            connection.Open();
            var reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {

                    var post = new Post();
                    post.Id = reader.GetInt32(0);
                    post.Name = reader.GetString(1);
                    post.PostDetail = reader.GetString(2);
                    lsPost.Add(post);
                    if (totalRows == 0)
                    {
                        totalRows = int.Parse(reader.GetValue(reader.GetOrdinal("TotalRows")).ToString());
                    }
                
                }
                
            }
            connection.Close();
            return lsPost;
        }

        public void AddNewPost(int userId, Post post)
        {
            var connection = new SqlConnection(_connnectionString);
            var command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "sp_AddNewPost";
            command.Parameters.AddWithValue("@name", post.Name);
            command.Parameters.AddWithValue("@detail", post.PostDetail);
            
            command.Parameters.Add(GetCategoryIdsParameter(post.Categories.Select(x => x.Id)));

            try
            {
                connection.Open();
                var result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
            }
        }

        private SqlParameter GetCategoryIdsParameter(IEnumerable<int> ids)
        {
            var filterTable = new DataTable("CategoryIds");
            filterTable.Columns.Add("Id", typeof(Int32));

            foreach (var id in ids)
            {
                filterTable.Rows.Add(id);
            }
            var filterParam = new SqlParameter("@filter", SqlDbType.Structured);
            filterParam.Value = filterTable;
            return filterParam;
        }

        public List<Post> GetAllPostsOnDate(int userId, DateTime dateObj)
        {
            var lsPosts = new List<Post>();
            
            var connection = new SqlConnection(_connnectionString);
            var command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "sp_GetAllPostsOnDate";
            command.Parameters.AddWithValue("@userId", userId);
            command.Parameters.AddWithValue("@createdOn", dateObj);

            try
            {
                connection.Open();
                var reader = command.ExecuteReader();
                var POSTID = reader.GetOrdinal("PostId");
                var NAME = reader.GetOrdinal("PostName");
                var DETAIL = reader.GetOrdinal("PostDetail");
                var CREATEDON = reader.GetOrdinal("CreatedOn");

                while (reader.Read())
                {
                    var post = new Post();
                    post.Id = reader.GetInt32(POSTID);
                    post.Name = reader.GetString(NAME);
                    post.PostDetail = reader.GetString(DETAIL);
                    post.CreatedOn = reader.GetDateTime(CREATEDON);
                    lsPosts.Add(post);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
            }

            return lsPosts;
        }
    }
}