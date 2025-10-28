import React from 'react';

export const ApiKeyInstructions: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-2xl p-8 border border-purple-500/30">
        <h1 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Configuración Requerida
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Para que esta aplicación funcione, necesitas una clave de API de Google Gemini.
        </p>

        <div className="space-y-6 text-left">
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h2 className="font-semibold text-lg text-purple-300 mb-2">Paso 1: Obtén tu API Key</h2>
            <p>
              Ve a{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:underline"
              >
                Google AI Studio
              </a>{' '}
              y crea una nueva clave de API.
            </p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h2 className="font-semibold text-lg text-purple-300 mb-2">Paso 2: Crea el archivo de configuración</h2>
            <p>
              En la raíz de tu proyecto, crea un nuevo archivo llamado{' '}
              <code className="bg-gray-700 text-pink-300 px-2 py-1 rounded">config.ts</code>.
            </p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h2 className="font-semibold text-lg text-purple-300 mb-2">Paso 3: Añade tu clave</h2>
            <p>Copia y pega el siguiente código en tu archivo <code className="bg-gray-700 text-pink-300 px-2 py-1 rounded">config.ts</code>, reemplazando el marcador de posición con tu clave real.</p>
            <pre className="bg-gray-900 text-sm p-4 rounded-md mt-3 overflow-x-auto">
              <code>
                {`// config.ts
export const API_KEY = "TU_API_KEY_AQUI";`}
              </code>
            </pre>
          </div>
          
           <div className="p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
            <h2 className="font-semibold text-lg text-yellow-300 mb-2">¡Importante! Protege tu clave</h2>
            <p>
              Para evitar que tu clave se suba a GitHub, asegúrate de que tu archivo <code className="bg-gray-700 text-pink-300 px-2 py-1 rounded">.gitignore</code> contenga la línea:
            </p>
             <pre className="bg-gray-900 text-sm p-2 rounded-md mt-2"><code>config.ts</code></pre>
          </div>

        </div>

        <p className="text-center text-gray-500 mt-8">
          Una vez que guardes los cambios en <code className="bg-gray-700 text-pink-300 px-2 py-1 rounded">config.ts</code>, la aplicación se recargará automáticamente.
        </p>
      </div>
    </div>
  );
};
