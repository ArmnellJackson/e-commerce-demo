# Nube de Colores | E-commerce Infantil

Plataforma de comercio electrónico especializada en ropa para niños y niñas, diseñada con una estética lúdica, suave y moderna utilizando Astro.

## 🎨 Patrón de Diseño: Lúdico-Orgánico (Signature Design)

El proyecto se basa en el patrón de **Componentes Atómicos** integrados en un sistema de **Capas y Superficies (Layered Surfaces)**. Las decisiones técnicas clave incluyen:

- **Firma Visual (Organic Signatures):** Uso de `blobs` (formas orgánicas) y bordes redondeados irregulares (`--radius-blob`) para romper la rigidez de las interfaces tradicionales y evocar la suavidad y el juego infantil.
- **Transparencia y Profundidad:** Implementación de `Glassmorphism` en la navegación y el pie de página para integrarse suavemente con el fondo degradado, permitiendo que el contenido "flote" sin generar barreras visuales pesadas.
- **Arquitectura de Tokens:** Centralización de colores (`--brand-pink`, `--brand-blue`), tipografía (`Comfortaa` para impacto emocional, `Lato` para claridad funcional) y espaciado en variables CSS globales.
- **Estructura Asimétrica:** El Hero utiliza un diseño no lineal para guiar la vista del usuario de forma dinámica, reforzando la sensación de aventura y creatividad.

## 🚀 Estructura del Proyecto

- `src/components/`: Componentes individuales (Navbar, Hero, Footer).
- `src/layouts/`: Estructura base y estilos globales.
- `src/pages/`: Páginas del sitio.

## 🛠️ Comandos

| Comando | Acción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local. |
| `pnpm build` | Compila el sitio para producción. |
| `pnpm preview` | Previsualiza la compilación localmente. |

## 📝 Log de Errores

- **2024-04-17:** Limpieza inicial del proyecto (eliminación de `Welcome.astro` y assets por defecto). Se corrigió la configuración de fuentes de Google en el `Layout` para evitar problemas de carga asíncrona mediante el uso de enlaces `preconnect` y `link` tradicionales en lugar de `@fontsource` para asegurar compatibilidad total inmediata con el degradado de fondo.
- **2024-04-17:** Resolución de conflicto en el `Navbar` fijo sobre el `Hero`. Se implementó `padding-top` en el contenedor del Hero y un `backdrop-filter` para asegurar la legibilidad del texto durante el scroll.
