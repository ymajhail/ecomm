using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.API.Data;
using ECommerce.API.DTOs;
using ECommerce.API.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ECommerceDbContext _context;
    private readonly ILogger<CartController> _logger;

    public CartController(ECommerceDbContext context, ILogger<CartController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{sessionId}")]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCart(string sessionId)
    {
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.SessionId == sessionId)
            .Select(ci => new CartItemDto
            {
                Id = ci.Id,
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                Product = new ProductDto
                {
                    Id = ci.Product.Id,
                    Name = ci.Product.Name,
                    Description = ci.Product.Description,
                    Price = ci.Product.Price,
                    ImageUrl = ci.Product.ImageUrl,
                    Category = ci.Product.Category,
                    Stock = ci.Product.Stock,
                    Brand = ci.Product.Brand
                }
            })
            .ToListAsync();

        return Ok(cartItems);
    }

    [HttpPost]
    public async Task<ActionResult<CartItemDto>> AddToCart([FromBody] AddToCartDto dto)
    {
        var product = await _context.Products.FindAsync(dto.ProductId);
        if (product == null)
        {
            return NotFound("Product not found");
        }

        if (product.Stock < dto.Quantity)
        {
            return BadRequest("Insufficient stock");
        }

        var existingCartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.SessionId == dto.SessionId && ci.ProductId == dto.ProductId);

        if (existingCartItem != null)
        {
            existingCartItem.Quantity += dto.Quantity;
            if (existingCartItem.Quantity > product.Stock)
            {
                return BadRequest("Insufficient stock");
            }
        }
        else
        {
            var cartItem = new CartItem
            {
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                SessionId = dto.SessionId
            };
            _context.CartItems.Add(cartItem);
        }

        await _context.SaveChangesAsync();

        var cartItemDto = await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.SessionId == dto.SessionId && ci.ProductId == dto.ProductId)
            .Select(ci => new CartItemDto
            {
                Id = ci.Id,
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                Product = new ProductDto
                {
                    Id = ci.Product.Id,
                    Name = ci.Product.Name,
                    Description = ci.Product.Description,
                    Price = ci.Product.Price,
                    ImageUrl = ci.Product.ImageUrl,
                    Category = ci.Product.Category,
                    Stock = ci.Product.Stock,
                    Brand = ci.Product.Brand
                }
            })
            .FirstOrDefaultAsync();

        return Ok(cartItemDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCartItem(int id, [FromBody] int quantity)
    {
        var cartItem = await _context.CartItems
            .Include(ci => ci.Product)
            .FirstOrDefaultAsync(ci => ci.Id == id);

        if (cartItem == null)
        {
            return NotFound();
        }

        if (quantity <= 0)
        {
            _context.CartItems.Remove(cartItem);
        }
        else
        {
            if (quantity > cartItem.Product.Stock)
            {
                return BadRequest("Insufficient stock");
            }
            cartItem.Quantity = quantity;
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> RemoveFromCart(int id)
    {
        var cartItem = await _context.CartItems.FindAsync(id);
        if (cartItem == null)
        {
            return NotFound();
        }

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("clear/{sessionId}")]
    public async Task<ActionResult> ClearCart(string sessionId)
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.SessionId == sessionId)
            .ToListAsync();

        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
