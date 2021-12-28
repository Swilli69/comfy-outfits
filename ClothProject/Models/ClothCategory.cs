using System.Collections.Generic;

namespace ClothProject.Models
{
    public class ClothCategory
    {
        public int ClothCategoryId { get; set; }
        public string Name { get; set; }

        public List<ShopItem> ShopItems { get; set; } = new List<ShopItem>();
    }
}
