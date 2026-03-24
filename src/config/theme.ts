import { type ThemeConfig, theme } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary: oklch(0.6840 0.1270 176.8287) → teal-green
    colorPrimary: "#00B298",
    // Backgrounds: oklch(0.9876 0.0044 185) → off-white with teal tint
    colorBgLayout: "#F5FAFA",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    // Borders: oklch(0.9214 0.0198 186) / oklch(0.9585 0.0066 185)
    colorBorder: "#DDEAEB",
    colorBorderSecondary: "#EDF4F4",
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    // Shadows com tint da cor primária (hsl(171 50% 20%) = teal escuro)
    boxShadow: "0px 8px 20px -2px hsl(171 50% 20% / 0.08), 0px 1px 2px -3px hsl(171 50% 20% / 0.06)",
    boxShadowSecondary: "0px 8px 20px -2px hsl(171 50% 20% / 0.12), 0px 4px 6px -3px hsl(171 50% 20% / 0.08)",
    fontSize: 14,
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    margin: 16,
    marginLG: 24,
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Primary: oklch(0.8607 0.1582 177.3031) → teal-green brilhante
    colorPrimary: "#1ADBC8",
    // Backgrounds: oklch(0.1592 0.0163 195.6) e oklch(0.2032 0.0218 195.6)
    colorBgLayout: "#141F22",
    colorBgContainer: "#1A292C",
    colorBgElevated: "#1E3032",
    // Border: oklch(0.3331 0.0335 195.7)
    colorBorder: "#2C4245",
    colorBorderSecondary: "#1E3032",
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    boxShadow: "0px 10px 25px 0px hsl(0 0% 0% / 0.40), 0px 1px 2px -1px hsl(0 0% 0% / 0.40)",
    boxShadowSecondary: "0px 10px 25px 0px hsl(0 0% 0% / 0.50), 0px 4px 6px -1px hsl(0 0% 0% / 0.40)",
    fontSize: 14,
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    margin: 16,
    marginLG: 24,
  }
};
