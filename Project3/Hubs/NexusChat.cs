
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Project3.Controllers;
using Project3.Models;

namespace Project3.Hubs
{
    public class NexusChat : Hub
    {

        private readonly AzureDbContext _context;

        public NexusChat(AzureDbContext dbContext)
        {
            _context = dbContext;
        }


        public async Task BroadcastMessage(string message, int senderId){
            string email = Context.GetHttpContext().User.Claims.ToList()[0].Value;

            Console.WriteLine("CCCCCCC 1 " + senderId);

            User? u = _context.Users.ToList().FirstOrDefault(x => x.UserEmail != email);

            await Clients.All.SendAsync("broadcastMessage", senderId, message);    
        }

          
        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                    .SendAsync("echo", name, $"{message} (echo from server)");

    }
}
