export function getErrorMessage(error) {
  if (error.response) {
    // El servidor respondió con un código de error fuera del rango 2xx
    return `Error del servidor: ${error.response.status} - No se pudieron cargar los datos.`;
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    return "Error de red: No se pudo conectar con The Simpsons API";
  } else {
    // Error al configurar la petición
    return "Ocurrió un error inesperado al procesar la solicitud.";
  }
}
