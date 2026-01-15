import { type ThemeConfig, theme } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#13C2C2",
    colorBgLayout: "#F5F5F5",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    colorBorder: "#D9D9D9",
    colorBorderSecondary: "#F0F0F0",
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)",
    boxShadowSecondary: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
    ...lightTheme.token,
    colorPrimary: "#36CFC9",
  }
};
