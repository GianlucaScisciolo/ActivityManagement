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

      // Items
      '/INSERISCI_ITEM': 'http://localhost:3000', 
      '/VISUALIZZA_ITEMS': 'http://localhost:3000', 
      '/OTTIENI_TUTTI_GLI_ITEMS': 'http://localhost:3000', 
      '/ELIMINA_ITEMS': 'http://localhost:3000', 
      
      // Persone
      '/OTTIENI_TUTTI_I_CLIENTI': 'http://localhost:3000',
      '/ELIMINA_CLIENTI': 'http://localhost:3000',
      '/MODIFICA_CLIENTI': 'http://localhost:3000',
      
      // Professionisti
      '/OTTIENI_TUTTI_I_PROFESSIONISTI': 'http://localhost:3000',
      '/ELIMINA_PROFESSIONISTI': 'http://localhost:3000',
      '/MODIFICA_PROFESSIONISTI': 'http://localhost:3000',
      
      // Servizi
      '/OTTIENI_TUTTI_I_SERVIZI': 'http://localhost:3000', 
      '/ELIMINA_SERVIZI': 'http://localhost:3000', 
      '/MODIFICA_SERVIZI': 'http://localhost:3000', 

      // Lavori
      '/ELIMINA_LAVORI': 'http://localhost:3000',
      '/ELIMINA_LAVORI_RANGE_GIORNI': 'http://localhost:3000',
      '/MODIFICA_LAVORI': 'http://localhost:3000', 
      '/OTTIENI_LAVORI_GIORNO': 'http://localhost:3000', 

      // Saloni
      '/ELIMINA_SPESE': 'http://localhost:3000', 
      '/ELIMINA_SPESE_RANGE_GIORNI': 'http://localhost:3000', 
      '/MODIFICA_SPESE': 'http://localhost:3000', 
      '/VISUALIZZA_ENTRATE_LAVORI': 'http://localhost:3000',
      '/VISUALIZZA_USCITE_SPESE': 'http://localhost:3000',
    }
  }
});
