# Walletfy – Financial Tracker

**Walletfy** is a simple web app to track personal finances. Users can log transactions (incomes and expenses), grouped by month, and view monthly and global summaries. It includes a form to set an initial balance, and calculates monthly and running totals.

## 🔧 Tech Stack

- **React + Vite**: Component-based architecture and fast builds.
- **TanStack Router + Query**: File-based routing and async state management.
- **Mantine UI**: Modern components, theming, and notifications.
- **Zustand**: Global state for theme and initial balance.
- **Zod**: Schema validation for form inputs.
- **Day.js**: Date formatting and grouping.
- **uuid**: Unique IDs for events.
- **LocalStorage**: Stores events and preferences persistently.

## 🗂️ Project Structure

```
src/
├─ main.tsx # App entry point with providers (Mantine, Query, Router)
├─ routes/ # App pages
│ ├─ \_\_root.tsx # Layout with <Header /> and <Outlet />
│ ├─ index.tsx # Dashboard (event list + summaries)
│ └─ event/\$id.tsx # Create/edit form for an event
├─ components/ # UI components
│ ├─ event/ # Event UI: list, item, form,
├─ api/ # Data layer
│ ├─ datasource/ # DataRepo using LocalStorage
│ └─ domain/ # Data source interface
├─ store/ # Global state (theme, initial money)
├─ hooks/ # Form hooks (TanStack + Mantine integration)
├─ types/ # Zod schemas and TypeScript types
├─ utils/ # Formatters, classnames, etc.

```

## 💼 Key Features

- **Transaction Tracking**: Add and update events (with name, date, amount, type, optional description).
- **Monthly Grouping**: Events are grouped by `month-year` and shown in cards.
- **Summaries**:
  - **Per Month**: Income, Expense, Balance.
  - **Global**: Running total including initial balance.
- **Initial Balance**: Optional user-defined starting amount, stored globally.
- **Forms**: Custom input components using TanStack Form + Mantine + Zod validation.
- **UI**: Responsive, themed, and user-friendly with dark/light toggle.

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---
