using WebApi.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace WebApi.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<FavoriteVendor> FavoriteVendors { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options)
          : base(options)
        {
        }

    }
}
