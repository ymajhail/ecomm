using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.API.Data;
using ECommerce.API.DTOs;
using ECommerce.API.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ECommerceDbContext _context;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ECommerceDbContext context, ILogger<ProductsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] string? category = null)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category == category);
        }

        var products = await query.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            Category = p.Category,
            Stock = p.Stock,
            Brand = p.Brand
        }).ToListAsync();

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        var productDto = new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ImageUrl = product.ImageUrl,
            Category = product.Category,
            Stock = product.Stock,
            Brand = product.Brand
        };

        return Ok(productDto);
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<string>>> GetCategories()
    {
        var categories = await _context.Products
            .Select(p => p.Category)
            .Distinct()
            .ToListAsync();

        return Ok(categories);
    }
}
