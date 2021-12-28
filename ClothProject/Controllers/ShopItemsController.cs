using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace ClothProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ShopItemsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetShopItems(int id)
        {
            var shop = await _context.Shops
                .Include(x => x.ShopItems).ThenInclude(x => x.ClothType)
                .Include(x => x.ShopItems).ThenInclude(x => x.ClothCategory)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShopId == id);

            if (shop == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                shop.Name,
                shop.Address,
                ShopItems = shop.ShopItems.Select(x => new {
                    x.ShopItemId,
                    x.Name,
                    x.Price,
                    x.Amount,
                    x.Size,
                    x.Colour,
                    x.ClothCategoryId,
                    ClothCategory = x.ClothCategory.Name,
                    x.ClothTypeId,
                    ClothType = x.ClothType.Name
                })
            });
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpPost("create")]
        public async Task<ActionResult<ShopItem>> PostShopItem(ShopItem shopItem)
        {
            var shop = await _context.Shops
                .Include(x => x.ShopItems)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShopId == shopItem.ShopId);

            if (shop == null)
            {
                return BadRequest();
            }

            _context.ShopItems.Add(shopItem);
            await _context.SaveChangesAsync();

            var clothCategory = await _context.ClothCategories.FindAsync(shopItem.ClothCategoryId);
            var clothType = await _context.ClothTypes.FindAsync(shopItem.ClothTypeId);

            return Ok(new
            {
                shopItem.ShopItemId,
                shopItem.Name,
                shopItem.Price,
                shopItem.Amount,
                shopItem.Size,
                shopItem.Colour,
                shopItem.ClothCategoryId,
                ClothCategory = clothCategory.Name,
                shopItem.ClothTypeId,
                ClothType = clothType.Name
            });
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShopItem(int id, ShopItem model)
        {
            if (id != model.ShopItemId)
            {
                return BadRequest();
            }

            var shopItem = await _context.ShopItems
                .SingleOrDefaultAsync(x => x.Shop.User.Email == HttpContext.User.Identity.Name && x.ShopItemId == model.ShopItemId);

            _context.Entry(shopItem).State = EntityState.Modified;

            if (model == null)
            {
                return BadRequest();
            }

            shopItem.Name = model.Name;
            shopItem.Price = model.Price;
            shopItem.Amount = model.Amount;
            shopItem.Size = model.Size;
            shopItem.Colour = model.Colour;
            shopItem.ClothCategoryId = model.ClothCategoryId;
            shopItem.ClothTypeId = model.ClothTypeId;

            return NoContent();
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShopItem(int id)
        {
            var shopItem = await _context.ShopItems
                .SingleOrDefaultAsync(x => x.ShopItemId == id && x.Shop.User.Email == HttpContext.User.Identity.Name);
            if (shopItem == null)
            {
                return NotFound();
            }

            _context.ShopItems.Remove(shopItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
