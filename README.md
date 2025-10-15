# 📦 Shipping Box

A modern, responsive web application for calculating shipping costs for boxes to specific locations worldwide from India. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[Depolyed url to be added - ]

## 📋 Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Available Scripts](#available-scripts)
-   [Application Architecture](#application-architecture)
-   [Features Breakdown](#features-breakdown)
-   [Design Decisions](#design-decisions)

## ✨ Features

-   ✅ **Add Shipping Boxes** - Create new shipping entries with receiver details
-   ✅ **Dynamic Cost Calculation** - Automatic shipping cost calculation based on weight and destination
-   ✅ **Color Visualization** - Visual representation of box colors with RGB values
-   ✅ **Real-time Validation** - Form validation with instant error feedback
-   ✅ **Persistent Storage** - Data saved locally using localStorage
-   ✅ **Responsive Design** - Fully responsive across mobile, tablet, and desktop
-   ✅ **Clean UI/UX** - Modern interface with smooth transitions and hover effects

## 🛠 Tech Stack

### Frontend

-   **React 19.2.0** - UI library
-   **TypeScript 4.9.5** - Type-safe JavaScript
-   **Tailwind CSS 3.4.18** - Utility-first CSS framework
-   **React Router DOM 6.x** - Client-side routing

### State Management

-   **Context API** - Centralized state management
-   **localStorage** - Data persistence

### Build Tools

-   **Create React App** - React application setup
-   **PostCSS** - CSS processing
-   **Autoprefixer** - Browser compatibility

## 📁 Project Structure

```
shipping-box/
├── public/                # Static files
├── src/
│   ├── components/        # React components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── AddBox.tsx     # Form for adding boxes
│   │   └── BoxList.tsx    # Table displaying boxes
│   ├── context/           # State management
│   │   └── BoxContext.tsx # Box context provider
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Type definitions
│   ├── utils/             # Utility functions
│   │   └── calculations.t s # Shipping cost calculator
│   ├── App.tsx            # Main app component
│   └── index.tsx          # Entry point
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone git@github.com:Swastik1/shipping-box.git
    cd shipping-box
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm start
    ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

-   Hot reload enabled
-   Error reporting in browser

### `npm run build`

Builds the app for production to the `build` folder

-   Optimized and minified
-   Ready for deployment

### `npm test`

Launches the test runner in interactive watch mode

## 🏗 Application Architecture

### MVC Pattern Implementation

The application follows the **Model-View-Controller (MVC)** design pattern:

#### **Model** (Data Layer)

-   **Types** (`src/types/index.ts`) - Data structure definitions
-   **Context** (`src/context/BoxContext.tsx`) - Data management and business logic
-   **Calculations** (`src/utils/calculations.ts`) - Shipping cost computation

#### **View** (Presentation Layer)

-   **Components** (`src/components/`) - UI components
    -   `Navbar.tsx` - Navigation between views
    -   `AddBox.tsx` - Form for adding boxes
    -   `BoxList.tsx` - Table for displaying boxes

#### **Controller** (Logic Layer)

-   **BoxContext** - Manages state and provides data to views
-   **React Hooks** - `useState`, `useContext`, `useEffect` for component logic

### Data Flow

```
User Action → Component → Context API → localStorage
                                    ↓
                            State Update
                                    ↓
                            Component Re-render
```

## 🎯 Features Breakdown

### 1. Add Box Form (View A)

**Fields:**

-   **Receiver Name** (text input) - Required field
-   **Weight** (number input) - In kilograms, validates negative values
-   **Box Color** (color picker) - Returns RGB format
-   **Destination Country** (dropdown) - 4 countries with shipping rates

**Validation:**

-   All fields required
-   Weight cannot be negative (auto-resets to 0)
-   Weight must be greater than 0
-   Real-time error clearing on input

**Shipping Rates:**

-   Sweden: ₹7.35/kg
-   China: ₹11.53/kg
-   Brazil: ₹15.63/kg
-   Australia: ₹50.09/kg

### 2. Box List Table (View B)

**Columns:**

1. Receiver Name
2. Weight (kg)
3. Box Color (visual color box + RGB values)
4. Destination Country
5. Shipping Cost (INR format)

**Features:**

-   Responsive table with horizontal scroll on mobile
-   Hover effects on rows
-   Empty state message when no boxes added
-   Color visualization with actual colored boxes

### 3. Navigation

**Navbar Component:**

-   Two routes: Add Box and Box List
-   Active route highlighting
-   Responsive design (stacked on mobile, horizontal on desktop)

## 🎨 Design Decisions

### Why Context API over Redux?

-   **Simplicity** - Small-to-medium sized application
-   **No boilerplate** - Less code to maintain
-   **Built-in** - No additional dependencies
-   **Sufficient** - Handles our state management needs perfectly

### Why localStorage?

-   **Persistence** - Data survives page refreshes
-   **No backend needed** - Meets "local storage" requirement
-   **Simple API** - Easy to implement and maintain
-   **Synchronous** - No async complexity

### Why Tailwind CSS?

-   **Rapid development** - Utility-first approach speeds up styling
-   **Responsive design** - Built-in responsive utilities
-   **Consistency** - Design system out of the box
-   **Performance** - Purges unused styles in production

### TypeScript Benefits

-   **Type safety** - Catch errors at compile time
-   **Better IDE support** - Autocomplete and IntelliSense
-   **Code quality** - Self-documenting code
-   **Refactoring** - Safe and confident code changes

## 🔧 Key Implementation Details

### Color Picker RGB Conversion

The color picker returns hex values (`#FF5733`), which are converted to RGB format (`255, 87, 51`) using a custom utility function.

```typescript
const hexToRgb = (hex: string): string => {
	// Regex pattern extracts RGB components
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		return `${parseInt(result[1], 16)}, ${parseInt(
			result[2],
			16
		)}, ${parseInt(result[3], 16)}`;
	}
	return "255, 255, 255";
};
```

### Shipping Cost Calculation

```typescript
export const calculateShippingCost = (
	weight: number,
	country: Country
): number => {
	const rate = COUNTRY_RATES[country];
	const cost = weight * rate;
	return Math.round(cost * 100) / 100; // Round to 2 decimals
};
```

### Data Persistence

-   **On Mount**: Load boxes from localStorage
-   **On Change**: Auto-save to localStorage
-   **Key**: `shippingBoxes`

## 📱 Responsive Breakpoints

-   **Mobile**: < 640px
-   **Tablet**: ≥ 640px
-   **Desktop**: ≥ 768px

## 🌐 Browser Compatibility

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

## 🎓 Learning Outcomes

This project demonstrates:

-   React component architecture
-   TypeScript type safety
-   State management with Context API
-   Form handling and validation
-   Responsive design principles
-   Data persistence strategies
-   Clean code organization
-   MVC design pattern implementation

## 📄 License

This project is created for educational purposes.

## 👤 Author

[Swastik Panda]

-   GitHub: [@Swastik1]
-   Email: swastik.panda.official@gmail.com

## 🙏 Acknowledgments

-   Create React App for the initial setup
-   Tailwind CSS for the styling framework
-   React community for excellent documentation

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
