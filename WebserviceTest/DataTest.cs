using System.Collections.Generic;
using System.Linq.Expressions;
using TheClassierLibrary;
using GreenPiHouseREST.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace WebserviceTest
{
    [TestClass]
    public class DataTest
    {
        private DataController _controller;
        private List<Data> _list;

        [TestInitialize()]
        public void InitTest()
        {
            _controller = new DataController();
            _list = new List<Data>();
        }

        [TestMethod]
        public void TestGetAllData()
        {
            _list.AddRange(_controller.Get());

            Assert.AreNotEqual(0, _list.Count);
        }
        
        [TestMethod]
        public void TestGetLatestData()
        {
            TestGetAllData();
            int index = _list.Count - 1;

            Data expectedData = _list[index];
            Data actualData = _controller.GetLatest();
            
            Assert.AreEqual(expectedData.Temperature, actualData.Temperature);
            Assert.AreEqual(expectedData.Humidity, actualData.Humidity);
        }

        [TestMethod]
        public void TestPost()
        {
            Data expectedNewData = new Data(100.0,100.0);
            Data actualData = _controller.GetLatest();

            _controller.Post(expectedNewData);
            
            Assert.AreEqual(expectedNewData.Temperature, actualData.Temperature);
            Assert.AreEqual(expectedNewData.Humidity, actualData.Humidity);
        }
    }
}
