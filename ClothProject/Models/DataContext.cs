using Microsoft.EntityFrameworkCore;

namespace ClothProject.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ClothCategory> ClothCategories { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopItem> ShopItems { get; set; }
        public DbSet<ClothType> ClothTypes { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClothType>().HasData(new ClothType()
            {
                ClothTypeId = 1,
                Name = "Труси"
            },
            new ClothType()
            {
                ClothTypeId = 2,
                Name = "Шорти"
            },
            new ClothType()
            {
                ClothTypeId = 3,
                Name = "Футболка"
            },
            new ClothType()
            {
                ClothTypeId = 4,
                Name = "Куртка"
            });

            modelBuilder.Entity<ClothCategory>().HasData(new ClothCategory()
            {
                ClothCategoryId = 1,
                Name = "Спортивна"
            },
            new ClothCategory()
            {
                ClothCategoryId = 2,
                Name = "Парадна"
            },
            new ClothCategory()
            {
                ClothCategoryId = 3,
                Name = "Домашня"
            });
        }
    }
}
