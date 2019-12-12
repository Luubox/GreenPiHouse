using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TheClassierLibrary;

namespace GreenPiHouseREST.DBUtil
{
    public class ManageWaterloo
    {
        private readonly string _connectionString =
            "Data Source=greenpihousedb.database.windows.net;Initial Catalog=GreenPiHouseDB;" +
            "User ID=dbadmin;Password=Secret123;" +
            "Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private const String Insert = "INSERT INTO Waterloo VALUES (@status)";
        private const String GetAll = "SELECT * FROM Waterloo";
        
        public int Post(Waterloo value)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(Insert, conn))
            {
                conn.Open();
                cmd.Parameters.AddWithValue("@status", value.Status);
                return cmd.ExecuteNonQuery();
            } 
        }

        public IEnumerable<Waterloo> Get()
        {
            List<Waterloo> liste = new List<Waterloo>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(GetAll, conn))
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Waterloo w = ReadNextElement(reader);
                    liste.Add(w);
                }
                reader.Close();
            }
            return liste;
        }

        public Waterloo GetLatest()
        {
            IEnumerable<Waterloo> getLatestList = Get();
            return getLatestList.Last();
        }

        protected Waterloo ReadNextElement(SqlDataReader reader)
        {
            Waterloo element = new Waterloo();

            element.Status = reader.GetBoolean(1) ;

            return element;
        }
    }
}
