# PriceRadar

PriceRadar is a price comparison web application that helps users find the best deals on products across multiple online stores. The application allows users to search for products, compare prices, view price history, set price alerts, and save favorite products.

## Features

- **Product Search**: Search for products across multiple online stores
- **Price Comparison**: Compare prices from different retailers
- **Price History**: View price trends and history charts
- **Price Alerts**: Set notifications for when prices drop to a target level
- **User Authentication**: Register, login, and manage your account
- **Favorites**: Save and manage your favorite products
- **Deal Analysis**: Get insights on whether a deal is actually good based on price history
- **Category Browsing**: Browse products by categories

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/project-priceRadar.git
cd project-priceRadar
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## Supabase Setup

1. Create a new project in Supabase
2. Set up the following tables:
   - profiles
   - products
   - categories
   - stores
   - prices
   - price_history
   - favorites
   - price_alerts

3. Enable authentication with email/password

## Project Structure

```
project-priceRadar/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API and service functions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── .env.local          # Environment variables
├── index.html          # HTML template
└── package.json        # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) 