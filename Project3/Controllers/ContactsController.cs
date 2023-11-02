using Microsoft.AspNetCore.Mvc;
using Project3.Models;
using System.Security.Claims;

namespace Project3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : Controller
    {

        private readonly AzureDbContext _context;

        public ContactsController(AzureDbContext dbContext)
        {
            _context = dbContext;
        }


        [Route("GetUserContacts")]
        [HttpGet]
        public async Task<List<Contact>> GetUserContacts()
        {

            ClaimsPrincipal principal = HttpContext.User;
            try
            {
                if (principal.Identity.IsAuthenticated)
                {
                    User? u = _context.Users.ToList().FirstOrDefault(x => x.UserEmail == principal.Claims.ToList()[0].Value);

                    List<Contact> contacts = _context.Contacts.ToList().FindAll(x => x.SenderId == u.UserId || x.ReceiverId == u.UserId);

                    await Console.Out.WriteLineAsync(contacts.Count + " Hello");

                    return contacts;
                }
                else
                {
                    return new List<Contact>();
                }

                
            }
            catch (Exception ex)
            {
                return new List<Contact>();
            }

        }

    }
}
