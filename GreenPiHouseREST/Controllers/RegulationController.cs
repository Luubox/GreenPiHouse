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
    public class RegulationController : ControllerBase
    {
        private ManageRegulations manager = new ManageRegulations();

        // GET: /GetAllRegulations
        [HttpGet]
        [Route("/GetAllRegulations")]
        public IEnumerable<Regulation> Get()
        {
            return manager.Get();
        }

        // POST: api/Regulation
        [HttpPost]
        public void Post([FromBody] Regulation value)
        {
            Regulation r = new Regulation(value.Timestamp, value.Status);

            manager.Post(r);
        }
    }
}
