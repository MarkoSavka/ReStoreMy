using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options) //base() передаємо options до батька(DbContext)
        {
            
        }
        public DbSet<Product> Products { get; set; } //table for DB
    }
}