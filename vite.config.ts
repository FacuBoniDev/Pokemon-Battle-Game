import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pokemon-battle-game/', // Asegúrate de que esto coincida con el nombre de tu repositorio
})