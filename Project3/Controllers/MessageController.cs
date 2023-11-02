using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


        [Route("GetUserMessages/{id}/{receiver}")]
        [HttpGet]
        public async Task<List<Message>> CreateMessage(int id, int receiver)
        {

            try
            {
                List<Message> messages = await _context.Messages.Where(x => (x.SenderId == id || x.ReceiverId == id) && (x.SenderId == receiver || x.ReceiverId == receiver)).ToListAsync();
                return messages;
            }
            catch (Exception ex) {
                return new List<Message>();
            }
            

            
        }


        [Route("GetContactInfo/{sender}/{receiver}/{current}")]
        [HttpGet]
        public async Task<User> GetContactInfo(int sender, int receiver, int current)
        {
            try
            {
                int id = current == sender ? receiver : sender;

                User u = _context.Users.ToList().Find(x => x.UserId == id);
                
                return u;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
