namespace ECommerce.API.DTOs;

public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public ProductDto Product { get; set; } = null!;
    public int Quantity { get; set; }
}

public class AddToCartDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public string SessionId { get; set; } = string.Empty;
}
