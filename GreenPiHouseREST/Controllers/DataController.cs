using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClassLibrary;
using GreenPiHouseREST.DBUtil;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GreenPiHouseREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private ManageData manager = new ManageData();

        // GET: api/Data
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Data/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Data
        [HttpPost]
        public void Post([FromBody] Data value)
        {
            Data d = new Data(value.SensorName, value.Temperature, value.Co2);
            manager.Post(d);
        }

        // PUT: api/Data/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
