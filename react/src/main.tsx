import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {routes} from "@/routes.tsx";
import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@/components/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routes}/>
      </ThemeProvider>
    </StrictMode>,
)
