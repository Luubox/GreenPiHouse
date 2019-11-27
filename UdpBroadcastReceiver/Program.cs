using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ClassLibrary;
using Newtonsoft.Json;

namespace UdpBroadcastReceiver
{
    class Program
    {
        private const int Port = 10100;

        static void Main()
        {
            //Parse("{\"SensorName\": \"Room D3.07\", \"Temperature\": 52, \"CO2\": 547}");

            using (UdpClient socket = new UdpClient(new IPEndPoint(IPAddress.Any, Port)))
            {
                IPEndPoint remoteEndPoint = new IPEndPoint(0, 0);
                while (true)
                {
                    Console.WriteLine("Waiting for broadcast {0}", socket.Client.LocalEndPoint);
                    byte[] datagramReceived = socket.Receive(ref remoteEndPoint);

                    string message = Encoding.ASCII.GetString(datagramReceived, 0, datagramReceived.Length);
                    Console.WriteLine("Receives {0} bytes from {1} port {2} message {3}", datagramReceived.Length,
                        remoteEndPoint.Address, remoteEndPoint.Port, message);
                    Parse(message);
                }
            }
        }

        private static void Parse(string response)
        {
            Uri uri = new Uri("https://thegreenerpihouse.azurewebsites.net/api/data");
            //Uri uri = new Uri("http://localhost:61399/api/data");

            //"{\"SensorName\": \"Room D3.07\", \"Temperature\": 52, \"CO2\": 547}"
            //Data d = JsonConvert.DeserializeObject<Data>(response);

            using (HttpClient client = new HttpClient())
            {
                //String jsonStr = JsonConvert.SerializeObject(d);
                StringContent content = new StringContent(response, Encoding.UTF8, "application/json");

                Task<HttpResponseMessage> postAsync = client.PostAsync(uri, content);

                HttpResponseMessage resp = postAsync.Result;
                if (resp.IsSuccessStatusCode)
                {
                    Debug.WriteLine(resp);
                }
            }
        }
    }
}
