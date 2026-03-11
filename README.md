# 🌤️ Weather App

A mobile weather application built with **Expo (React Native)**, **TypeScript**, and **Tailwind CSS**. Get real-time weather updates using your device's GPS or search for any location worldwide. Includes AI integration that provides simple, contextual advice based on current weather conditions — with file-based routing via Expo Router.

---

## ✨ Features

- 📍 **Real-Time Weather via GPS** — Automatically detects your location and fetches live weather data
- 🔍 **Location Search** — Search for any city or place worldwide
- 🤖 **AI Weather Advice** — Get simple, context-aware recommendations based on current conditions
- 🗺️ **File-Based Navigation** — Clean and scalable routing powered by Expo Router
- 🎨 **Tailwind CSS Styling** — Utility-first UI with NativeWind

---

## 🛠️ Tech Stack

| Technology                | Purpose                            |
| ------------------------- | ---------------------------------- |
| Expo                      | Mobile framework and build tooling |
| React Native              | Cross-platform UI rendering        |
| TypeScript                | Static typing                      |
| Tailwind CSS (NativeWind) | Utility-first styling              |
| Expo Router               | File-based navigation              |

---

## 📁 Project Structure

```
weather-app/
├── app/                    # Screens and layouts (Expo Router)
│   ├── _layout.tsx         # Root layout and navigation wrapper
│   └── index.tsx           # Home screen / weather dashboard
├── assets/                 # Static assets (images, SVGs)
├── components/             # Reusable UI components (WeatherCard, WeatherAdvice, etc.)
├── constants/              # Application constants and configurations mapping
├── hooks/                  # Custom React hooks (useWeather, useLocation, useGeocoding, etc.)
├── Services/               # API service integrations (weatherService, geocodingService)
├── types/                  # TypeScript definitions and interfaces
├── global.css              # Global Tailwind styles
├── app.json                # Expo app configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler (NativeWind support)
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android device with [Expo Go](https://expo.dev/go) — or Android Studio emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/TyronBech/weather-app.git
cd weather-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on Android

```bash
npx expo start --android
```

Or scan the QR code in the terminal with **Expo Go** on your Android device.

---

## 🔄 How It Works

```
App Launch
    │
    ▼
GPS Available? ──── Yes ──► Fetch Coordinates ──► Weather API
    │                                                   │
    No                                                  ▼
    │                                         Display Weather Data
    ▼                                                   │
Search Screen ─────────────────────────────────► AI Advice
```

1. On launch, the app requests location permissions
2. If granted, GPS coordinates are sent to the weather API
3. Live weather data is displayed on the dashboard
4. The AI module reads the weather context and returns plain-language advice
5. Users can also search manually for any location
