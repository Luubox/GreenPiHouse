using System;

namespace ClassLibrary
{
    public class Data
    {
        //{"SensorName": "Room D3.07", "Temperature": 28, "CO2": 352}
        private string _sensorName;
        private int _temperature;
        private int _co2;

        public string SensorName { get => _sensorName; set => _sensorName = value; }
        public int Temperature { get => _temperature; set => _temperature = value; }
        public int Co2 { get => _co2; set => _co2 = value; }

        public Data()
        {
            
        }

        public Data(string sensorName, int temperature, int co2)
        {
            _sensorName = sensorName;
            _temperature = temperature;
            _co2 = co2;
        }

        public override string ToString()
        {
            return $"{nameof(SensorName)}: {SensorName}, {nameof(Temperature)}: {Temperature}, {nameof(Co2)}: {Co2}";
        }
    }
}
