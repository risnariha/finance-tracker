export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.12)",
      },
      colors: {
        midnight: "#0f172a",
        moonlight: "#1e293b",
      },
    },
  },
  plugins: [],
};
