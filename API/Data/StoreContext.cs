using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions opt) : base(opt)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}