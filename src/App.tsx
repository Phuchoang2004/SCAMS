import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App as AntApp } from "antd";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { AppRouter } from "@/components/routing/AppRouter";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { customTheme, darkTheme } from "@/config/theme";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const ThemedApp: React.FC = () => {
  const { theme } = useApp();

  return (
    <ConfigProvider theme={theme === "dark" ? darkTheme : customTheme}>
      <AntApp>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </AntApp>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
