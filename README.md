# Antonia Studio

Sitio estático, responsive y accesible para Antonia Studio. No requiere instalar paquetes ni compilar.

## Abrir el sitio

Abrí `index.html` en un navegador. También podés ejecutar `py -m http.server 8000` desde esta carpeta y visitar `http://localhost:8000`.

## Editar precios y otros datos

Los datos están centralizados en `site-content.js`, junto a `index.html`:

- En cada servicio, cambiá `price: ''` por un valor numérico, por ejemplo `price: 85000`; se mostrará como `Gs. 85.000`. También podés usar una etiqueta de texto como `price: 'Desde Gs. 85.000'`.
- Si el precio queda vacío, se muestra “Consultar precio”.
- `duration` permite agregar una duración; dejalo vacío para ocultarla.
- Podés cambiar los nombres y las descripciones de los servicios.
- En `studio`, podés editar `whatsapp`, el texto visible del número, el enlace y nombre de Instagram, y la ubicación.

Guardá los cambios y recargá el sitio. Las animaciones aparecen suavemente al desplazarse por la página y respetan la preferencia de movimiento reducido del dispositivo.

## Solicitar un turno

En “Agendá tu turno” se eligen servicio, fecha y hora preferidas. El formulario abre la solicitud en WhatsApp para enviarla al estudio; el turno queda sujeto a confirmación de disponibilidad.

## Recursos visuales

El logotipo y las fotografías originales están en `assets/`. La página usa versiones WebP optimizadas.

