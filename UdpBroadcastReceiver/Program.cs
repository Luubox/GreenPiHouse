using System;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text;
using ClassLibrary;
using Newtonsoft.Json;

namespace UdpBroadcastReceiver
{
    class Program
    {
        private const int Port = 10100;

        static void Main()
        {
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
            Data d = JsonConvert.DeserializeObject<Data>(response);
            //todo rest 
        }
    }
}
