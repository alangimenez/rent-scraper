async function navigateWithRetry(page, url, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        return; // Salir si tiene éxito
      } catch (error) {
        console.error(`Error en la navegación: ${error.message}`);
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`No se pudo navegar a ${url} después de ${maxRetries} intentos`);
          throw error; // Lanzar el error después de todos los intentos
        }
        console.log(`Reintentando navegación a ${url}...`);
      }
    }
  }
  
  // Exportar la función
  module.exports = { navigateWithRetry };
  