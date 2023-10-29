using Microsoft.AspNetCore.Mvc;
using Project3.Models;

namespace Project3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private readonly AzureDbContext _context;

        public MessageController(AzureDbContext dbContext)
        {
            _context = dbContext;
        }


        [Route("CreateMessage")]
        [HttpPost]
        public async Task<JsonResult> CreateMessage([FromBody]Message message)
        {

            try
            {
                await _context.Messages.AddAsync(message);
                await _context.SaveChangesAsync();

                return Json("Success");
            }
            catch (Exception ex) {
                return Json("Fail");
            }
            
        }
    }
}
