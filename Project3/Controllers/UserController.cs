using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project3.Models;

namespace Project3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private readonly AzureDbContext _context;

        public UserController(AzureDbContext dbContext)
        {
            _context = dbContext;
        }

        [Route("SignUpUser")]
        [HttpPost]
        public async Task<JsonResult> SignUpUser([FromBody]XUnit8User xu)
        {
            try
            {

                User u = new User(xu.UserName, xu.UserPassword, xu.UserEmail, AuthController.temp_Avatar);

                await _context.Users.AddAsync(u);

                await _context.SaveChangesAsync();
                return Json("Success");
            }
            catch (Exception ex)
            {
                return Json("Bad");
            }
            

            

        }
    }
}
