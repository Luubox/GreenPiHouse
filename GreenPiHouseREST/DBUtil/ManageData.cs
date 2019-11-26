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
            "Connection string: Data Source=greenpihousedb.database.windows.net;Initial Catalog=GreenPiHouseDB;" +
            "User ID=dbadmin;Password=Secret123;" +
            "Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private const String Insert = "insert into Data values (@SensorName, @Temperature, @Co2)";
        
        public void Post(Data value)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(Insert, conn))
            {
                conn.Open();
                cmd.Parameters.AddWithValue("@SensorName", value.SensorName);
                cmd.Parameters.AddWithValue("@Temperature", value.Temperature);
                cmd.Parameters.AddWithValue("@Co2", value.Co2);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
