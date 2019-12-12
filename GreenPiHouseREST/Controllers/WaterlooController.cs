using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GreenPiHouseREST.DBUtil;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheClassierLibrary;

namespace GreenPiHouseREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterlooController : ControllerBase
    {
        private ManageWaterloo bonaparte = new ManageWaterloo();

        // GET: /GetAllWaterloos
        [HttpGet]
        [Route("/GetAllWaterloos")]
        public IEnumerable<Waterloo> Get()
        {
            return bonaparte.Get();
        }

        // GET: /GetLatestWaterloo
        [HttpGet]
        [Route("/GetLatestWaterloo")]
        public Waterloo GetLatestWaterloo()
        {
            return bonaparte.GetLatest();
        }

        // POST: api/Waterloo
        [HttpPost]
        public string Post([FromBody] Waterloo value)
        {
            Waterloo w = new Waterloo(value.Status);

            return $"Affected Rows: {bonaparte.Post(w)}";
        }
    }
}
