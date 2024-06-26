import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A555EC',
        secondary: '#D09CFA',
        tertiary: '#F3CCFF',
        canvas: '#FFFFD0',
        success: '#50CB93',
        pending: '#FEA82F',
        failed: '#ED2B2A',
      },
    },
  },
  plugins: [],
};
export default config;
