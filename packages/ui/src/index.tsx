import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./providers/theme";

type UiProviderProperties = ThemeProviderProps;

/**
 * El proveedor de nivel superior para todos los componentes de la interfaz de usuario.
 *
 * @remarks
 *
 * Este componente envuelve tu aplicación en proveedores que son usados por
 * todos los componentes de la interfaz de usuario. Proporciona el tema, análisis, y otros
 * servicios que son utilizados por los componentes.
 *
 * @param properties - Las propiedades del ThemeProvider.
 * @param children - Los componentes UI de la aplicación.
 */

export const UIProvider = ({
  children,
  ...properties
}: UiProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster />
  </ThemeProvider>
);
