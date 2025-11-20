# StayFinder - Hotel Booking Platform

A complete, production-ready hotel and accommodation booking platform built with React, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

```
/
├── components/
│   ├── ui/                      # ShadCN UI components
│   ├── Header.tsx               # Main navigation header
│   ├── HeroSearch.tsx           # Hero section with search
│   ├── PropertyCard.tsx         # Reusable property card component
│   ├── FeaturedStays.tsx        # Featured properties section
│   ├── Categories.tsx           # Browse by property type
│   ├── Footer.tsx               # Site footer
│   ├── SearchBar.tsx            # Search bar (compact/full modes)
│   ├── FiltersSidebar.tsx       # Filters panel for search results
│   └── FiltersBar.tsx           # Top filters bar with sort options
│
├── pages/
│   ├── SearchResults.tsx        # Search results with filters
│   ├── PropertyDetails.tsx      # Property details page
│   ├── Checkout.tsx             # Checkout and payment page
│   ├── Login.tsx                # Login page
│   ├── SignUp.tsx               # Registration page
│   ├── ForgotPassword.tsx       # Password reset page
│   └── PaymentSuccess.tsx       # Booking confirmation page
│
└── App.tsx                      # Main app with routing
```

## 📄 Pages Overview

### 1. Home Page (`/`)
**Components:**
- Header with navigation
- Hero section with search form (location, dates, guests)
- Featured stays grid (6 properties)
- Categories section (Hotels, Apartments, Villas, etc.)
- Footer with newsletter signup

**Features:**
- Responsive design
- Search tabs (Stays/Experiences)
- Property cards with ratings, prices, badges

---

### 2. Search Results Page (`/search`)
**Components:**
- Header
- Compact search bar
- Filters bar with sort options and map toggle
- Left sidebar with filters:
  - Price range slider
  - Property type checkboxes
  - Neighborhood filters
- Grid of property cards (9 results)
- Load more button
- Footer

**Features:**
- Sticky filters bar
- Expandable filter sections
- Results count display
- Sort options (recommended, price, rating, etc.)

---

### 3. Property Details Page (`/property`)
**Components:**
- Header
- Image gallery with carousel
- Property title, rating, location
- Highlights section
- Full description
- Amenities grid with icons
- Available rooms section with room cards
- Guest reviews section
- Sticky booking card (right sidebar)

**Features:**
- Image carousel with thumbnails
- Room selection with pricing
- Price breakdown calculator
- Reviews display
- Share and favorite buttons

---

### 4. Checkout Page (`/checkout`)
**Components:**
- Header
- Two-column layout:
  - **Left:** Guest info form, payment form
  - **Right:** Booking summary card
- Cancellation policy section
- Terms and conditions checkbox

**Features:**
- Form validation ready
- Secure payment indicators
- Price breakdown
- Booking details summary

---

### 5. Payment Success Page (`/success`)
**Components:**
- Header
- Success message with confirmation number
- Full reservation details
- Important information section
- Download/Email confirmation buttons
- Footer

**Features:**
- Confirmation number display
- Complete booking summary
- Check-in/out instructions
- Action buttons for confirmation

---

### 6. Login Page (`/login`)
**Features:**
- Email and password fields
- Remember me checkbox
- Forgot password link
- Social login (Google, Facebook)
- Link to sign up page
- Password visibility toggle

---

### 7. Sign Up Page (`/signup`)
**Features:**
- Name, email, phone, password fields
- Password confirmation
- Terms and conditions checkbox
- Social sign up options
- Link to login page
- Password visibility toggles

---

### 8. Forgot Password Page (`/forgot-password`)
**Features:**
- Email input for reset
- Success state after submission
- Resend email option
- Back to login link

---

## 🎨 Design Features

### Color Scheme
- Primary: Blue (#2563eb)
- Success: Green
- Background: White/Gray-50
- Text: Gray-700, Gray-900

### Components Used
- **ShadCN UI:** Button, Input, Label, Slider, Select, Checkbox, Badge, Textarea, Card
- **Lucide Icons:** Complete icon set for all UI elements
- **Unsplash Images:** Real property photos

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible mobile menus
- Adaptive grid layouts

---

## 🚀 Key Features

### Search & Filters
- Location search
- Date range picker (ready for integration)
- Guest counter
- Price range slider
- Property type filters
- Neighborhood filters
- Sort options (best seller, price, rating)
- Map view toggle

### Property Listings
- Image galleries
- Rating and reviews
- Price display with discounts
- Badge system (Featured, Best Seller, Offers)
- Amenities display
- Room selection

### Booking Flow
1. Search → Results
2. Select Property → Details
3. Choose Room → Checkout
4. Enter Info & Pay → Success

### User Authentication
- Login/Sign up
- Social authentication UI
- Password reset flow
- Form validation ready

---

## 🔧 Technical Details

### State Management
- Simple useState for routing (production: use React Router)
- Component-level state for UI interactions

### Styling
- Tailwind CSS v4.0
- Custom tokens in `/styles/globals.css`
- Responsive utilities
- Hover effects and transitions

### Images
- Unsplash integration via ImageWithFallback component
- Optimized loading
- Fallback support

---

## 📱 Navigation

The app includes a temporary navigation helper (bottom-right corner) for quick page switching during development. Remove this in production when implementing proper routing.

### Quick Nav Pages:
- Home
- Search (Results)
- Details (Property)
- Checkout
- Success (Confirmation)
- Login
- Sign Up
- Forgot Password

---

## 🎯 Next Steps for Production

### Phase 1 - Core Functionality
1. ✅ Complete UI for all pages
2. ⏳ Integrate React Router for proper routing
3. ⏳ Add date picker (react-day-picker)
4. ⏳ Implement guest counter dropdown
5. ⏳ Connect search to results

### Phase 2 - Backend Integration
1. ⏳ Connect to backend API or Supabase
2. ⏳ Implement real authentication
3. ⏳ Add booking database
4. ⏳ Integrate payment gateway (Stripe)
5. ⏳ Email confirmations

### Phase 3 - Enhancements
1. ⏳ Map view with Google Maps
2. ⏳ Advanced filters (amenities)
3. ⏳ User profile/dashboard
4. ⏳ Booking history
5. ⏳ Wishlist/favorites
6. ⏳ Reviews and ratings system
7. ⏳ Multi-language support
8. ⏳ Currency converter

### Phase 4 - Advanced Features
1. ⏳ Host dashboard (list properties)
2. ⏳ Calendar availability
3. ⏳ Messaging system
4. ⏳ Booking modifications
5. ⏳ Refund processing

---

## 📝 Notes

- All forms are UI-ready but need validation logic
- Mock data is used throughout for demonstration
- Images are from Unsplash (replace with actual property images)
- Payment processing is UI-only (integrate Stripe/PayPal)
- Authentication is UI-only (integrate Firebase/Supabase/Auth0)

---

## 🎨 Customization

### To Change Colors:
Edit `/styles/globals.css` and update the CSS custom properties

### To Add/Remove Filters:
Edit `FiltersSidebar.tsx` and add/remove filter sections

### To Modify Property Data:
Update the mock data arrays in each page component

### To Add New Pages:
1. Create component in `/pages/`
2. Add route case in `App.tsx`
3. Add navigation button (temporary nav helper)

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and ShadCN UI
