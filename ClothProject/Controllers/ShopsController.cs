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
    public class ShopsController : ControllerBase
    {
        private readonly DataContext _context;

        public ShopsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Shop>>> GetShops()
        {
            var shop = await _context.Shops.Where(x => x.User.Email == HttpContext.User.Identity.Name).ToListAsync();
            return Ok(shop.Select(x => new
            {
                x.ShopId,
                x.Name,
                x.Address
            }));
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpPost("create")]
        public async Task<ActionResult<Shop>> PostShop(Shop shop)
        {
            shop.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                shop.ShopId,
                shop.Name,
                shop.Address
            });
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShop(int id, Shop shop)
        {
            if (id != shop.ShopId)
            {
                return BadRequest();
            }

            if (!await _context.Shops.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShopId == id))
            {
                return BadRequest();
            }

            _context.Entry(shop).State = EntityState.Modified;
            _context.Entry(shop).Property(x => x.UserId).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize(Roles = "ShopOwner")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await _context.Shops
                .Where(x => x.User.Email == HttpContext.User.Identity.Name)
                .SingleOrDefaultAsync(x => x.ShopId == id);

            if (shop == null)
            {
                return NotFound();
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopExists(int id)
        {
            return _context.Shops.Any(e => e.ShopId == id);
        }
    }
}
