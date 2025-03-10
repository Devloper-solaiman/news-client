"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import { persistor, store } from "../redux/store";

import { IsConnectedProvider } from "@/context/isConnectProvider";
import ChatProvider from "@/context/chatContext";
import { SocketProvider } from "@/context/socketProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <Provider store={store}>
        <Toaster />
        <IsConnectedProvider>
          <ChatProvider>
            <SocketProvider>
              <PersistGate loading={null} persistor={persistor}>
                <NextThemesProvider
                  {...themeProps}
                  attribute="class"
                  defaultTheme="system"
                >
                  {children}
                </NextThemesProvider>
              </PersistGate>
            </SocketProvider>
          </ChatProvider>
        </IsConnectedProvider>
      </Provider>
    </HeroUIProvider>
  );
}
