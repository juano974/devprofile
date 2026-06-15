import html2pdf from "html2pdf.js"

/**
 * Genera un archivo PDF a partir de un elemento HTML utilizando html2pdf.js.
 * Configura alta calidad, márgenes profesionales, control de saltos de página y compatibilidad.
 * 
 * @param {HTMLElement} element - El elemento del DOM que se convertirá en PDF.
 * @param {string} filename - El nombre que tendrá el archivo PDF descargado.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la descarga.
 */
export const generatePDF = async (element, filename) => {
  if (!element) {
    throw new Error("No se proporcionó un elemento válido para la exportación a PDF.")
  }

  // Opciones de configuración de html2pdf.js
  const options = {
    margin: [10, 10, 10, 10], // Margen profesional de 10mm en todos los lados
    filename: filename || "DevProfile_CV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // Incrementa la resolución del PDF (evita textos borrosos)
      useCORS: true, // Permite cargar imágenes remotas (ej: foto de perfil desde Unsplash)
      letterRendering: true, // Optimiza el renderizado del texto
      logging: false // Desactiva logs en consola de html2canvas
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    // Modos de salto de página: evitar cortes en tarjetas, usar reglas CSS y soporte heredado
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }
  }

  // Agregar la clase de modo de impresión al body para inyectar los estilos de PDF
  document.body.classList.add("html2pdf-mode")

  try {
    // Generar y guardar el archivo PDF
    await html2pdf().from(element).set(options).save()
  } catch (error) {
    console.error("Error detallado en el generador de PDF:", error)
    throw error // Re-lanzar para que el botón de UI pueda reaccionar
  } finally {
    // Retirar la clase del body para restaurar la vista web normal
    document.body.classList.remove("html2pdf-mode")
  }
}
