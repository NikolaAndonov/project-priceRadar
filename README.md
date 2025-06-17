# PriceRadar.bg

A modern, data-driven website for comparing and analyzing real promotions in major retail stores in Bulgaria. The platform helps everyday consumers save money by tracking genuine discounts on groceries and household items across different chains like Lidl, Kaufland, Billa, Fantastico, T Market, and more.

## Features

🧠 **Search and Compare Tool**  
- Powerful search bar on homepage and header  
- Filter by category (e.g., Dairy, Beverages, Meat, Snacks, Cleaning, etc.)  
- Display matching products with images, descriptions, and prices from different retailers  
- Sort results by price, discount, or name

📊 **Price Comparison Table**  
- For each product, show prices in major stores  
- Highlight the lowest price  
- Show if the price is a discount or regular price  
- Display when the price was last updated

📈 **Price History Chart**  
- Interactive chart showing the price of a product over the last 4-8 weeks  
- Line graph format  
- Compare prices across different stores over time

🔔 **Price Alerts / Wishlist**  
- Users can "follow" a product  
- Get notified when its price drops under a chosen threshold  
- "Add to My List" button on every product page

📍 **Store Filter**  
- Filter results by preferred chains  
- Option to exclude unavailable products

🔥 **Top Deals Section**  
- Homepage features a list of the most impressive real discounts of the week  
- Based on price drop % and popularity

🧾 **Product Page**  
- Includes product image, name, brand, and size  
- Shows all stores where it is available and their respective prices  
- Shows price history and "Is this a real deal?" verdict  
- Includes nutritional info or labels when available

📱 **Mobile-First Design**  
- Responsive, lightweight and easy to use on mobile  
- Sticky search bar and quick filters

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Chart.js / React-Chartjs-2
- Headless UI
- Heroicons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/price-radar.git
cd price-radar
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Images, icons, and other static files
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Header, Footer, etc.)
│   ├── product/     # Product-related components
│   ├── search/      # Search-related components
│   └── ui/          # Generic UI components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services and data fetching
└── utils/           # Utility functions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All retail stores mentioned are trademarks of their respective owners
- This project is for educational purposes and is not affiliated with any retail store 