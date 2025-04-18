import { defineConfig } from 'vite';
<<<<<<< HEAD
import react from '@vitejs/plugin-react';
import path from 'path';
=======

import react from '@vitejs/plugin-react';

import path from 'path';


>>>>>>> b9b859d682a33981f976f5692707a4daacfd873e

export default defineConfig({

  plugins: [react()],
<<<<<<< HEAD
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
=======

  resolve: {

    alias: {

      '@': path.resolve(__dirname, './src'),

    },

  },

});
>>>>>>> b9b859d682a33981f976f5692707a4daacfd873e
