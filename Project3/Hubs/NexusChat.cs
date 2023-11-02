
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


        public async Task BroadcastMessage(string message, int senderId, int receiverId){
            string email = Context.GetHttpContext().User.Claims.ToList()[0].Value;

            User? u = _context.Users.ToList().FirstOrDefault(x => x.UserId == senderId);

            Message m = new Message(senderId, receiverId, message, u.UserAvatar, DateTime.Now.ToShortTimeString(), u.UserName, u.UserAvatar);

            await _context.Messages.AddAsync(m);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("broadcastMessage", senderId, receiverId, message);    
        }

          
        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                    .SendAsync("echo", name, $"{message} (echo from server)");

    }
}
