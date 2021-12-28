using System.Collections.Generic;

namespace ClothProject.Models
{
    public class ClothType
    {
        public int ClothTypeId { get; set; }
        public string Name { get; set;}

        public List<ShopItem> ShopItems { get; set; } = new List<ShopItem>();
    }
}
