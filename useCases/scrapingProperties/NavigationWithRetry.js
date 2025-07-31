const loggerProcessor = require('../loggerProcessor/LoggerProcessor')

async function navigateWithRetry(page, url, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });

        return; // Salir si tiene éxito
      } catch (error) {
        loggerProcessor.error(`Error en la navegación: ${error.message}`);
        attempt++;
        if (attempt >= maxRetries) {
          loggerProcessor.error(`No se pudo navegar a ${url} después de ${maxRetries} intentos`);
          throw error; // Lanzar el error después de todos los intentos
        }
        loggerProcessor.warning(`Reintentando navegación a ${url}...`);
      }
    }
  }
  
  // Exportar la función
  module.exports = { navigateWithRetry };
  