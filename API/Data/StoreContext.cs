using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext //який наслідується від DbContext і представляє сесію з базою даних
    {
        public StoreContext(DbContextOptions options) : base(options) //base() передаємо options до батька(DbContext)
        {
            
        }
        public DbSet<Product> Products { get; set; } //table for DB
    }
}