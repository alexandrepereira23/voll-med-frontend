import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { MedicosPage } from './features/medicos/components/MedicosPage'
import { PacientesPage } from './features/pacientes/components/PacientesPage'
import { ConsultasPage } from './features/consultas/components/ConsultasPage'
import './index.css'

// Instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Definição das Rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <div className="p-8"><h1>Bem-vindo à Voll.med</h1><p className="text-gray-500 mt-2">Selecione uma opção no menu lateral para começar.</p></div>
      },
      {
        path: 'medicos',
        element: <MedicosPage />
      },
      {
        path: 'pacientes',
        element: <PacientesPage />
      },
      {
        path: 'consultas',
        element: <ConsultasPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
