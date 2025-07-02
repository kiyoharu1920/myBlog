module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "text-sm",
    "w-20",
    "w-32",
    "w-48",
    "max-w-xs",
    "max-w-md",
  ],
  theme: { extend: {} },
  plugins: [],
};
