import { theme } from "antd";

export const customDarkTheme = (isDark: boolean) => ({
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      fontWeight: 500,
      boxShadow: isDark 
        ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      colorTextPlaceholder: isDark ? "#64748b" : "#94a3b8",
      hoverBorderColor: "#6366f1",
      activeBorderColor: "#6366f1",
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    Table: {
      borderRadius: 12,
      headerBg: isDark ? '#1e293b' : '#f8fafc',
      rowHoverBg: isDark ? '#334155' : '#f1f5f9',
    },
    Card: {
      borderRadius: 16,
      boxShadow: isDark 
        ? '0 4px 16px rgba(0, 0, 0, 0.3)' 
        : '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
    Layout: {
      bodyBg: isDark ? '#0f172a' : '#f8fafc',
      headerBg: isDark ? '#1e293b' : '#ffffff',
      siderBg: isDark ? '#1e293b' : '#ffffff',
    },
  },
  token: {
    colorPrimary: "#3b82f6",
    colorInfo: "#06b6d4",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorBgBase: isDark ? "#111827" : "#ffffff",
    colorBgContainer: isDark ? "#1f2937" : "#ffffff",
    colorBgLayout: isDark ? "#111827" : "#f8fafc",
    colorTextBase: isDark ? "#f9fafb" : "#111827",
    colorTextSecondary: isDark ? "#9ca3af" : "#6b7280",
    colorBorder: isDark ? "#374151" : "#e5e7eb",
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    lineHeight: 1.6,
  },
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
});
