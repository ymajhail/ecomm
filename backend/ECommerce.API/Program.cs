using Microsoft.EntityFrameworkCore;
using ECommerce.API.Data;
using ECommerce.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Add DbContext
builder.Services.AddDbContext<ECommerceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? "Server=(localdb)\\mssqllocaldb;Database=ECommerceHealthProducts;Trusted_Connection=true;MultipleActiveResultSets=true"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ECommerceDbContext>();
    context.Database.EnsureCreated();
    
    if (!context.Products.Any())
    {
        SeedProducts(context);
    }
}

app.Run();

static void SeedProducts(ECommerceDbContext context)
{
    var products = new List<Product>
    {
        new Product
        {
            Name = "Organic Multivitamin Complex",
            Description = "Premium blend of essential vitamins and minerals for overall health and wellness. Supports immune system, energy levels, and bone health.",
            Price = 29.99m,
            ImageUrl = "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500",
            Category = "Vitamins",
            Stock = 50,
            Brand = "HealthPlus"
        },
        new Product
        {
            Name = "Omega-3 Fish Oil Capsules",
            Description = "High-quality fish oil rich in EPA and DHA. Supports heart health, brain function, and reduces inflammation.",
            Price = 24.99m,
            ImageUrl = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
            Category = "Supplements",
            Stock = 75,
            Brand = "PureHealth"
        },
        new Product
        {
            Name = "Probiotic Digestive Health",
            Description = "Advanced probiotic formula with 50 billion CFU. Promotes healthy digestion and supports gut microbiome balance.",
            Price = 34.99m,
            ImageUrl = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
            Category = "Digestive Health",
            Stock = 60,
            Brand = "GutWell"
        },
        new Product
        {
            Name = "Vitamin D3 5000 IU",
            Description = "High-potency Vitamin D3 supplement. Essential for bone health, immune function, and mood support.",
            Price = 19.99m,
            ImageUrl = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500",
            Category = "Vitamins",
            Stock = 100,
            Brand = "SunVital"
        },
        new Product
        {
            Name = "Turmeric Curcumin Extract",
            Description = "Powerful anti-inflammatory supplement. Supports joint health, reduces inflammation, and promotes overall wellness.",
            Price = 27.99m,
            ImageUrl = "https://images.unsplash.com/photo-1606787619248-f301830a5a57?w=500",
            Category = "Supplements",
            Stock = 45,
            Brand = "NatureCure"
        },
        new Product
        {
            Name = "Collagen Peptides Powder",
            Description = "Grass-fed collagen peptides for skin, hair, and joint health. Unflavored and easily mixable.",
            Price = 39.99m,
            ImageUrl = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
            Category = "Beauty & Wellness",
            Stock = 55,
            Brand = "BeautyBoost"
        },
        new Product
        {
            Name = "Magnesium Glycinate",
            Description = "Highly absorbable magnesium supplement. Supports muscle function, sleep quality, and stress management.",
            Price = 22.99m,
            ImageUrl = "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500",
            Category = "Minerals",
            Stock = 80,
            Brand = "CalmLife"
        },
        new Product
        {
            Name = "Echinacea Immune Support",
            Description = "Natural immune system booster. Helps reduce duration and severity of cold symptoms.",
            Price = 18.99m,
            ImageUrl = "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500",
            Category = "Immune Support",
            Stock = 65,
            Brand = "HerbalGuard"
        },
        new Product
        {
            Name = "CoQ10 Heart Health",
            Description = "Coenzyme Q10 supplement for cardiovascular health. Supports energy production and antioxidant protection.",
            Price = 32.99m,
            ImageUrl = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500",
            Category = "Heart Health",
            Stock = 40,
            Brand = "CardioCare"
        },
        new Product
        {
            Name = "Melatonin Sleep Aid",
            Description = "Natural sleep support supplement. Helps regulate sleep cycles and improve sleep quality.",
            Price = 16.99m,
            ImageUrl = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500",
            Category = "Sleep Support",
            Stock = 90,
            Brand = "RestWell"
        },
        new Product
        {
            Name = "Green Tea Extract",
            Description = "High-potency green tea extract with EGCG. Supports metabolism, weight management, and antioxidant health.",
            Price = 21.99m,
            ImageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
            Category = "Weight Management",
            Stock = 70,
            Brand = "MetaboBoost"
        },
        new Product
        {
            Name = "B-Complex Vitamins",
            Description = "Complete B-vitamin complex for energy, metabolism, and nervous system support.",
            Price = 23.99m,
            ImageUrl = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
            Category = "Vitamins",
            Stock = 85,
            Brand = "EnergyMax"
        }
    };

    context.Products.AddRange(products);
    context.SaveChanges();
}
