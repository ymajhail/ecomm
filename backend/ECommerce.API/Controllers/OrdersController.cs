using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.API.Data;
using ECommerce.API.DTOs;
using ECommerce.API.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ECommerceDbContext _context;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(ECommerceDbContext context, ILogger<OrdersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.SessionId == dto.SessionId)
            .ToListAsync();

        if (!cartItems.Any())
        {
            return BadRequest("Cart is empty");
        }

        var orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        var totalAmount = cartItems.Sum(ci => ci.Product.Price * ci.Quantity);

        var order = new Order
        {
            OrderNumber = orderNumber,
            CustomerName = dto.CustomerName,
            Email = dto.Email,
            Phone = dto.Phone,
            Address = dto.Address,
            City = dto.City,
            ZipCode = dto.ZipCode,
            TotalAmount = totalAmount,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        foreach (var cartItem in cartItems)
        {
            if (cartItem.Quantity > cartItem.Product.Stock)
            {
                return BadRequest($"Insufficient stock for {cartItem.Product.Name}");
            }

            cartItem.Product.Stock -= cartItem.Quantity;

            order.OrderItems.Add(new OrderItem
            {
                ProductId = cartItem.ProductId,
                Quantity = cartItem.Quantity,
                Price = cartItem.Product.Price
            });
        }

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        var orderDto = new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            CustomerName = order.CustomerName,
            Email = order.Email,
            Phone = order.Phone,
            Address = order.Address,
            City = order.City,
            ZipCode = order.ZipCode,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = cartItems.First(ci => ci.ProductId == oi.ProductId).Product.Name,
                Quantity = oi.Quantity,
                Price = oi.Price
            }).ToList()
        };

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, orderDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        var orderDto = new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            CustomerName = order.CustomerName,
            Email = order.Email,
            Phone = order.Phone,
            Address = order.Address,
            City = order.City,
            ZipCode = order.ZipCode,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.Product.Name,
                Quantity = oi.Quantity,
                Price = oi.Price
            }).ToList()
        };

        return Ok(orderDto);
    }
}
