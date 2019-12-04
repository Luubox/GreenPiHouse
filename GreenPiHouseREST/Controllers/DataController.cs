using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheClassierLibrary;
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

        // GET: /GetAll
        [HttpGet]
        [Route("/GetAllData")]
        public IEnumerable<Data> Get()
        {
            return manager.Get();
        }

        // GET: /GetLatest
        [HttpGet]
        [Route("/GetLatestData")]
        public Data GetLatest()
        {
            return manager.GetLatest();
        }

        // POST: api/Data
        [HttpPost]
        public string Post([FromBody] Data value)
        {
            Data d = new Data(value.Temperature, value.Humidity);
            //return manager.Post(d);
            
            return $"Affected Rows: {manager.Post(d)}"; //testing purposes
        }
    }
}
