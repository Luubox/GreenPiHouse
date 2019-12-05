using System;
using System.Collections.Generic;
using System.Text;

namespace TheClassierLibrary
{
    public class Regulation
    {
        private DateTime _timestamp;
        private bool _status;

        public DateTime Timestamp
        {
            get => _timestamp;
            set => _timestamp = value;
        }

        public bool Status
        {
            get => _status;
            set => _status = value;
        }

        public Regulation(DateTime timestamp, bool status)
        {
            Timestamp = timestamp;
            Status = status;
        }

        public Regulation()
        {
            
        }

        public override string ToString()
        {
            return $"{nameof(Timestamp)}: {Timestamp}, {nameof(Status)}: {Status}";
        }

        protected bool Equals(Regulation other)
        {
            return _timestamp.Equals(other._timestamp) && _status == other._status;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((Regulation) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (_timestamp.GetHashCode() * 397) ^ _status.GetHashCode();
            }
        }
    }
}
