using System;

namespace ClassLibrary
{
    public class Data
    {
        #region deprecated iteration 1

        //ITERATION 1
        //private string _sensorName;
        //private int _temperature;
        //private int _co2;

        //public string SensorName { get => _sensorName; set => _sensorName = value; }
        //public int Temperature { get => _temperature; set => _temperature = value; }
        //public int Co2 { get => _co2; set => _co2 = value; }

        //public Data(string sensorName, int temperature, int co2)
        //{
        //    _sensorName = sensorName;
        //    _temperature = temperature;
        //    _co2 = co2;
        //}
        //public override string ToString()
        //{
        //    return $"{nameof(SensorName)}: {SensorName}, {nameof(Temperature)}: {Temperature}, {nameof(Co2)}: {Co2}";
        //}

        //public Data()
        //{
            
        //}

        #endregion

        //ITERATION 2
        private double _temperature;
        private double _humidity;

        public Data()
        {
            
        }

        public Data(double temperature, double humidity)
        {
            _temperature = temperature;
            _humidity = humidity;
        }

        public override string ToString()
        {
            return $"{nameof(Temperature)}: {Temperature}, {nameof(Humidity)}: {Humidity}";
        }


        public double Temperature
        {
            get => _temperature;
            set => _temperature = value;
        }

        public double Humidity
        {
            get => _humidity;
            set => _humidity = value;
        }
    }
}
