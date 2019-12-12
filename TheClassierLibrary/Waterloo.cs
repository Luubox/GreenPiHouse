using System;
using System.Collections.Generic;
using System.Text;

namespace TheClassierLibrary
{
    public class Waterloo
    {
        private bool _status;

        public bool Status
        {
            get => _status;
            set => _status = value;
        }

        public Waterloo()
        {
            
        }

        public Waterloo(bool status)
        {
            Status = status;
        }

        public override string ToString()
        {
            return $"{nameof(Status)}: {Status}";
        }

        private sealed class StatusEqualityComparer : IEqualityComparer<Waterloo>
        {
            public bool Equals(Waterloo x, Waterloo y)
            {
                if (ReferenceEquals(x, y)) return true;
                if (ReferenceEquals(x, null)) return false;
                if (ReferenceEquals(y, null)) return false;
                if (x.GetType() != y.GetType()) return false;
                return x._status == y._status;
            }

            public int GetHashCode(Waterloo obj)
            {
                return obj._status.GetHashCode();
            }
        }

        public static IEqualityComparer<Waterloo> StatusComparer { get; } = new StatusEqualityComparer();
    }
}
