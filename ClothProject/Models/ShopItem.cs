using System.ComponentModel.DataAnnotations;

namespace ClothProject.Models
{
    public class ShopItem
    {
        public int ShopItemId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Range(1, int.MaxValue)]
        public int Price { get; set; }
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Size { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Colour { set; get; }

        public int ClothCategoryId { get; set; }
        public ClothCategory ClothCategory { get; set; }

        public int ClothTypeId { get; set; }
        public ClothType ClothType { get; set; }

        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
