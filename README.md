# Stripe Payments with Buy Now & Subscriptions - Next.js App

This project is a **full-stack eCommerce starter** built with **Next.js 14 App Router**, **Stripe**, **MongoDB**, and **NextAuth**. It supports product display, "Buy Now" payments using Stripe Elements, and future support for subscriptions. Authentication is handled via email and password using NextAuth.

---

## 🚀 Features

- 🔐 Authentication with **NextAuth.js**
- 💳 "Buy Now" flow using **Stripe Elements**
- 📦 Static product data file (no DB needed for products)
- 🧾 Stripe PaymentIntent creation
- 🎨 Clean UI with **Tailwind CSS**
- 📄 Stripe Elements UI for card & mobile payments (Apple/Google Pay)
- 🧠 Scalable structure for future subscriptions and webhooks

---

## 🧾 Folder Structure Overview

```
├── src
│   ├── app
│   │   ├── api
│   │   │   └── stripe/payment-intent/route.ts   # Creates Stripe PaymentIntent
│   │   ├── buy/[productId]/page.tsx             # Buy Now Page (left + right components)
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── page.tsx                             # Product carousel page
│   ├── components
│   │   ├── ProductCard.tsx
│   │   ├── BuyNowProductInfo.tsx                # Left side of Buy Now page
│   │   └── BuyNowStripePayment.tsx              # Stripe Elements on right
│   ├── data
│   │   └── products.ts                          # Static products array
│   ├── features
│   │   └── auth/useAuth.ts                      # NextAuth-based hook
│   ├── lib
│   │   └── stripe.ts                            # Stripe instance
│   ├── types
│   │   └── product.ts                           # ProductInfo types
│   ├── utils
│   │   └── formatCurrency.ts
├── public
├── .env.local
└── README.md
```

---

## 📦 Static Product Data

Located in `src/data/products.ts`, no need for database integration for product data.

```ts
const products: ProductInfo[] = [
  {
    id: "1",
    name: "Sample Product 1",
    image: "https://placehold.co/400x400",
    price: 20,
    originalPrice: 25,
    discount: "-20%",
    rating: 5,
  },
  ...
]
```

---

## 🧑‍💻 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd <your-repo-folder>
yarn install
```

### 2. Environment Setup

Create `.env.local`:

```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/your-db
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

### 3. Run Project

```bash
yarn dev
```

Go to: `http://localhost:3000`

---

## 💳 Buy Now Flow

1. Product cards on homepage have "Buy Now" button.
2. Redirects to `/buy/[productId]` page.
3. Left: Shows product data. Right: Stripe payment UI.
4. User can pay with card or Apple/Google Pay.

---

## ✅ Packages Used

```bash
yarn add next-auth stripe @stripe/stripe-js @stripe/react-stripe-js
yarn add tailwindcss postcss autoprefixer -D
```

---

## 🔐 Auth Pages

| Route     | Description        |
| --------- | ------------------ |
| `/login`  | Sign in page       |
| `/signup` | Register new user  |
| `/`       | Home with carousel |
| `/buy/id` | Payment page       |

---

## 📝 License

MIT License

---

## 📬 Contact

For questions or support, open an issue or PR on the GitHub repo.

---

Happy Hacking 🎉🚀
