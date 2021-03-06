﻿using System;

namespace TheClassierLibrary
{
    public class Data
    {
        private double _temperature;
        private double _humidity;

        public Data()
        {

        }

        public Data(double temperature, double humidity)
        {
            Temperature = temperature;
            Humidity = humidity;
        }

        public override string ToString()
        {
            return $"{nameof(Temperature)}: {Temperature}, {nameof(Humidity)}: {Humidity}";
        }


        public double Temperature
        {
            get => _temperature;
            set => _temperature = Math.Round(value, 1);
        }

        public double Humidity
        {
            get => _humidity;
            set => _humidity = Math.Round(value, 1);
        }

        public override bool Equals(object obj)
        {
            if (obj is Data that)
            {
                return Math.Abs(this.Temperature - that.Temperature) < 0.001 && Math.Abs(this.Humidity - that.Humidity) < 0.001;
            }

            return false;
        }

        protected bool Equals(Data other)
        {
            return _temperature.Equals(other._temperature) && _humidity.Equals(other._humidity);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (_temperature.GetHashCode() * 397) ^ _humidity.GetHashCode();
            }
        }
    }
}
