import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// console.log('Vite configuration loaded');
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     port:3000,
//     proxy: {
//       '/api': {
//         target: 'http://lucast-001-site1.ptempurl.com',  // El servidor al que deseas hacer proxy
//         changeOrigin: true,  // Cambia el origen de la solicitud para evitar problemas de CORS
//         secure: false,  // Si el servidor usa HTTPS, ponlo en `true`
//         rewrite: (path) => path.replace(/^\/api/, ''),  // Reescribe la URL si es necesario
//       },
//     },
//   },
// });