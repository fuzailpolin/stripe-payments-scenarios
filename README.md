# Stripe Payments with Subscription & Auth - Next.js App

This project is a **full-stack subscription-based SaaS starter** built with **Next.js 14 App Router**, **Stripe**, **MongoDB**, and **NextAuth**. It allows users to sign up, subscribe to products, and handle payments with Stripe. Failed payments are tracked, and authentication is managed using email and password.

---

## 🚀 Features

- 🔐 Authentication via **NextAuth** (Credentials Provider)
- 💳 Stripe integration for products & subscriptions
- 👥 User management in MongoDB (Atlas)
- 📦 Product & price fetching from Stripe
- 📃 Webhooks handling (e.g., for failed payments)
- 📄 Protected routes using session-based logic
- 🎨 Tailwind CSS for styling
- ☁️ Fully environment-configured with `.env`

---

## 🧾 Folder Structure Overview

```
├── src
│   ├── app
│   │   ├── api
│   │   │   └── auth/[...nextauth]/route.ts      # NextAuth route
│   │   │   └── stripe/subscribe/route.ts       # Subscribe endpoint
│   │   │   └── stripe/webhooks/route.ts        # Stripe webhook handler
│   │   ├── login/page.tsx                      # Login page
│   │   ├── signup/page.tsx                     # Signup page
│   │   └── page.tsx                            # Home page (Products)
│   ├── components
│   │   ├── ProductCard.tsx
│   │   └── SubscriptionButton.tsx
│   ├── features
│   │   └── auth/useAuth.ts                     # Auth hook using NextAuth
│   ├── lib
│   │   ├── mongodb.ts                          # MongoDB connection
│   │   └── stripe.ts                           # Stripe initialization
│   ├── services
│   │   └── userService.ts                      # User DB helper
│   ├── types
│   │   └── product.ts                          # Stripe product types
│   ├── utils
│   │   └── formatCurrency.ts
│
├── public                                      # Static assets
├── .env.local                                  # Environment variables
└── README.md                                   # This file
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd <your-repo-folder>
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root with the following values:

```env
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/your-db
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLIC_KEY=pk_test_...
```

> 💡 Use tools like `openssl rand -base64 32` to generate `NEXTAUTH_SECRET`.

### 3. Run the Development Server

```bash
yarn dev
```

Visit: `http://localhost:3000`

---

## 🧪 How It Works

### Authentication

- Uses NextAuth with **email/password** (credentials provider).
- Stores user data in MongoDB (`users` collection).

### Products and Pricing

- Loaded from Stripe via `/api/products` route.
- Displayed on the homepage.

### Subscription Flow

1. User signs in.
2. Chooses a product and clicks Subscribe.
3. Stripe Checkout session is created and user is redirected.
4. On success/failure, Stripe webhook notifies your app.
5. Webhook updates subscription/payment status.

### Webhooks

Set these events in Stripe:

- `checkout.session.completed`
- `invoice.payment_failed`
- `customer.subscription.deleted`

### Failed Payments

- Tracked in a MongoDB collection (`failedPayments`).
- Used to re-attempt payment or alert users.

---

## 🔐 Pages

| Route     | Description              |
| --------- | ------------------------ |
| `/signup` | Register a new user      |
| `/login`  | Sign in with credentials |
| `/`       | Homepage with products   |

---

## ✅ TODO / Enhancements

- [ ] Add profile dashboard for users
- [ ] Email notifications (e.g. failed payment, welcome)
- [ ] Admin panel to manage subscriptions
- [ ] Subscription tier upgrades/downgrades

---

## 🧠 Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS**
- **MongoDB (Atlas)**
- **Stripe** (products, prices, subscriptions)
- **NextAuth** for auth

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contribution

Feel free to open issues or PRs. Suggestions are welcome!

---

## 📬 Contact

For questions or support, reach out to the repo owner or open a GitHub issue.

---

Happy Coding 💻✨
