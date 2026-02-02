# Health Products E-Commerce Application

A full-stack e-commerce application for health products built with .NET 8 Web API backend and Angular 17 frontend.

## Features

- 🛍️ **Product Catalog**: Browse health products by category
- 🛒 **Shopping Cart**: Add, update, and remove items from cart
- 💳 **Checkout**: Complete order placement with customer information
- 📦 **Order Management**: Track orders with unique order numbers
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🔒 **Session Management**: Cart persistence using session IDs

## Tech Stack

### Backend
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server (LocalDB)

### Frontend
- Angular 17
- TypeScript
- RxJS
- Standalone Components

## Prerequisites

- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server LocalDB (included with Visual Studio) or SQL Server Express
- Angular CLI: `npm install -g @angular/cli`

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/ECommerce.API
   ```

2. Restore packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` if needed (default uses LocalDB)

4. Run the application:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000` (or `https://localhost:7000`)

5. Swagger UI will be available at `http://localhost:5000/swagger` (in development mode)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL in `src/app/services/api.service.ts` if your backend is running on a different port

4. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200`

## Database

The application uses Entity Framework Core with Code First migrations. On first run, the database will be created automatically with seeded health products data.

### Seeded Products

The database is pre-populated with 12 health products including:
- Vitamins (Multivitamin, Vitamin D3, B-Complex)
- Supplements (Omega-3, Turmeric, Green Tea Extract)
- Digestive Health (Probiotics)
- Beauty & Wellness (Collagen)
- Minerals (Magnesium)
- Immune Support (Echinacea)
- Heart Health (CoQ10)
- Sleep Support (Melatonin)

## API Endpoints

### Products
- `GET /api/products` - Get all products (optional `?category=` filter)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart/{sessionId}` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart/clear/{sessionId}` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID

## Project Structure

```
.
├── backend/
│   └── ECommerce.API/
│       ├── Controllers/      # API controllers
│       ├── Data/            # DbContext
│       ├── DTOs/            # Data transfer objects
│       ├── Models/          # Entity models
│       └── Program.cs       # Application entry point
│
└── frontend/
    └── src/
        └── app/
            ├── components/  # Reusable components
            ├── pages/       # Page components
            ├── services/   # API and business logic services
            ├── models/      # TypeScript interfaces
            └── app.routes.ts # Routing configuration
```

## Development

### Backend Development
- The API uses CORS to allow requests from the Angular app
- Swagger is enabled in development mode
- Database is automatically created on first run

### Frontend Development
- Uses Angular standalone components (no NgModules)
- Reactive forms for checkout
- RxJS for state management
- Session-based cart persistence

## Production Build

### Backend
```bash
cd backend/ECommerce.API
dotnet publish -c Release
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/ecommerce-health-products`

## Troubleshooting

1. **CORS Issues**: Ensure the backend CORS policy allows `http://localhost:4200`
2. **Database Connection**: Verify SQL Server LocalDB is installed and running
3. **Port Conflicts**: Change ports in `launchSettings.json` (backend) or `angular.json` (frontend)
4. **API Connection**: Verify the API URL in `frontend/src/app/services/api.service.ts` matches your backend URL

## License

This project is created for educational purposes.
