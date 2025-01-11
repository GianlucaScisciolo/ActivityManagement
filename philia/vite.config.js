/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// http://localhost:8081/lavori_professionisti

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Autenticazione
      '/LOGIN': 'http://localhost:3000',
      '/MODIFICA_PROFILO': 'http://localhost:3000',
      '/LOGOUT': 'http://localhost:3000',
      
      // Persone
      '/INSERISCI_CLIENTE': 'http://localhost:3000',
      '/VISUALIZZA_CLIENTI': 'http://localhost:3000',
      '/OTTIENI_TUTTI_I_CLIENTI': 'http://localhost:3000',
      '/ELIMINA_CLIENTI': 'http://localhost:3000',
      '/MODIFICA_CLIENTI': 'http://localhost:3000',
      
      // Professionisti
      '/INSERISCI_PROFESSIONISTA': 'http://localhost:3000',
      '/VISUALIZZA_PROFESSIONISTI': 'http://localhost:3000',
      '/OTTIENI_TUTTI_I_PROFESSIONISTI': 'http://localhost:3000',
      '/ELIMINA_PROFESSIONISTI': 'http://localhost:3000',
      '/MODIFICA_PROFESSIONISTI': 'http://localhost:3000',
      
      // Lavori
      '/INSERISCI_LAVORO': 'http://localhost:3000',
      '/VISUALIZZA_LAVORI': 'http://localhost:3000',
      '/ELIMINA_LAVORI': 'http://localhost:3000',
      '/ELIMINA_LAVORI_RANGE_GIORNI': 'http://localhost:3000',
      '/MODIFICA_LAVORI': 'http://localhost:3000',
    }
  }
});
