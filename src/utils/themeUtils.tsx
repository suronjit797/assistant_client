import { theme } from "antd";

export const customDarkTheme = (isDark: boolean) => ({
  components: {
    // Button: {
    //   colorBgContainerDisabled: "#4b93fd",
    //   colorTextDisabled: "#fff",
    //   defaultHoverBorderColor: "#0d6efd",
    //   defaultHoverColor: "#0c60d0",
    // },

    Input: {
      colorTextPlaceholder: "#95a5a6",
      hoverBorderColor: "#4FC3F7",
      activeBorderColor: "#4FC3F7",
    },
  },
  token: {
    colorPrimary: "#4FC3F7",
    colorBgBase: isDark ? "#14181e" : "#ffffff",
    colorTextBase: isDark ? "#f8fafc" : "#000000",
    colorBgContainerDisabled: "",
    colorTextDisabled: "",
  },
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
});
