using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TheClassierLibrary;

namespace GreenPiHouseREST.DBUtil
{
    public class ManageData
    {
        private readonly string _connectionString =
            "Data Source=greenpihousedb.database.windows.net;Initial Catalog=GreenPiHouseDB;" +
            "User ID=dbadmin;Password=Secret123;" +
            "Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private const String Insert = "INSERT INTO DataTable VALUES (@temperature, @humidity)";
        private const String GetAll = "SELECT * FROM DataTable";

        
        public int Post(Data value)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(Insert, conn))
            {
                conn.Open();
                cmd.Parameters.AddWithValue("@temperature", value.Temperature);
                cmd.Parameters.AddWithValue("@humidity", value.Humidity);
                return cmd.ExecuteNonQuery();
            }
        }

        public IEnumerable<Data> Get()
        {
            List<Data> liste = new List<Data>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(GetAll, conn))
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Data d = ReadNextElement(reader);
                    liste.Add(d);
                }
                reader.Close();
            }
            return liste;
        }

        public Data GetLatest()
        {
            IEnumerable<Data> getLatestList = Get();
            return getLatestList.Last();
        }

        protected Data ReadNextElement(SqlDataReader reader)
        {
            Data element = new Data();

            element.Temperature = reader.GetDouble(1) ;
            element.Humidity = reader.GetDouble(2);

            return element;
        }
    }
}
