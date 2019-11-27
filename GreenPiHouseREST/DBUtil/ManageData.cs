using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ClassLibrary;

namespace GreenPiHouseREST.DBUtil
{
    public class ManageData
    {
        private readonly string _connectionString =
            "Data Source=greenpihousedb.database.windows.net;Initial Catalog=GreenPiHouseDB;" +
            "User ID=dbadmin;Password=Secret123;" +
            "Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private const String Insert = "INSERT INTO Data VALUES (@sensorName, @temperature, @co2)";
        private const String GetAll = "SELECT * FROM Data";

        
        public int Post(Data value)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(Insert, conn))
            {
                conn.Open();
                cmd.Parameters.AddWithValue("@sensorName", value.SensorName);
                cmd.Parameters.AddWithValue("@temperature", value.Temperature);
                cmd.Parameters.AddWithValue("@co2", value.Co2);
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

        protected Data ReadNextElement(SqlDataReader reader)
        {
            Data element = new Data();

            element.SensorName = reader.GetString(0);
            element.Temperature = reader.GetInt32(1) ;
            element.Co2 = reader.GetInt32(2);

            return element;
        }
    }
}
