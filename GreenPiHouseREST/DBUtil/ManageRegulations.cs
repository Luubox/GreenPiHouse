using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TheClassierLibrary;

namespace GreenPiHouseREST.DBUtil
{
    public class ManageRegulations
    {
        private readonly string _connectionString =
            "Data Source=greenpihousedb.database.windows.net;Initial Catalog=GreenPiHouseDB;" +
            "User ID=dbadmin;Password=Secret123;" +
            "Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private const String Insert = "INSERT INTO Regulation VALUES (@Timestamp, @Status)";
        private const String GetAll = "SELECT * FROM Regulation";


        public int Post(Regulation value)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(Insert, conn))
            {
                conn.Open();
                cmd.Parameters.AddWithValue("@Status", value.Status);
                cmd.Parameters.AddWithValue("@Timestamp", value.Timestamp);
                return cmd.ExecuteNonQuery();
            }
        }

        public IEnumerable<Regulation> Get()
        {
            List<Regulation> liste = new List<Regulation>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(GetAll, conn))
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Regulation r = ReadNextElement(reader);
                    liste.Add(r);
                }
                reader.Close();
            }
            return liste;
        }

        protected Regulation ReadNextElement(SqlDataReader reader)
        {
            Regulation element = new Regulation();

            element.Timestamp = reader.GetDateTime(1);
            element.Status = reader.GetBoolean(2);

            return element;
        }
    }
}
