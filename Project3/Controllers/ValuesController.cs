using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project3.Hubs;
using Project3.Models;
using System.Net;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project3.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ValuesController : Controller
    {

        private readonly AzureDbContext _context;

        public ValuesController(AzureDbContext dbContext)
        {
            _context = dbContext;
        }

        [HttpGet]
        public JsonResult Index()
        {
            ClaimsPrincipal principal = HttpContext.User;

            for (int i = 0; i < HttpContext.User.Identities.ToList().Count(); i++)
            {
                Console.WriteLine(HttpContext.User.Identities.ToList()[i].IsAuthenticated);
            }

            if (principal.Identity.IsAuthenticated)
            {
                return new JsonResult("/nexus");
            }
            else
            {
                return new JsonResult("/login");
            }
            
        }

        //[HttpPost]
        //public async Task GetUsers()
        //{
        //    Console.WriteLine("XXXXXXXXXXXXxx");
            
        //    Redirect("/login");
        //}

    }
}
