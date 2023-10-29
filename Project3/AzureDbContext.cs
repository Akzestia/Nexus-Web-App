using Microsoft.EntityFrameworkCore;
using Project3.Models;

namespace Project3
{
    public class AzureDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        //public DbSet<Server> _servers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Contact> Contacts { get; set; }


        public AzureDbContext(DbContextOptions<AzureDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

    }
}
