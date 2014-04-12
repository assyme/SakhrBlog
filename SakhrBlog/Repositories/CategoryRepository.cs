using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using SakhrBlog.Models;



namespace SakhrBlog.Repositories
{
    /// <summary>
    /// Ideally these should be in a separate project as Engine. Keeping it here
    /// to keep the scope of the task limited. 
    /// </summary>
    public class CategoryRepository
    {
        private string _connectionString;

        public CategoryRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Category> GetUserCategories(int userId)
        {
            var lsCategories = new List<Category>();
            var connection = new SqlConnection(_connectionString);
            var command = connection.CreateCommand();
            command.CommandText = "select * from Categories where BlogId in (Select Id from Blogs where UserId = @userId)";
            command.Parameters.AddWithValue("@userId", userId);
            try
            {
                connection.Open();
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    var idOrdinal = reader.GetOrdinal("Id");
                    var nameOrdinal = reader.GetOrdinal("Name");
                    while (reader.Read())
                    {
                        var category = new Category();
                        category.Id = reader.GetInt32(idOrdinal);
                        category.Name = reader.GetString(nameOrdinal);
                        lsCategories.Add(category);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                connection.Close();
            }
            return lsCategories;
        }
    }

    
}