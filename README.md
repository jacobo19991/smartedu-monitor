# SmartEdu Monitor 🎓

![SmartEdu Monitor Cover](./src/assets/hero.png)

> **Dashboard académico inteligente para monitoreo de rendimiento, asistencia y riesgo estudiantil.**

SmartEdu Monitor es una plataforma integral diseñada para instituciones educativas, que permite a directores y coordinadores identificar tempranamente a los estudiantes en riesgo de deserción o bajo rendimiento.

## 🚀 Características Principales

- **Detección de Riesgo Automatizada:** Algoritmos que clasifican el nivel de riesgo (Alto, Medio, Bajo) combinando calificaciones y asistencia.
- **Centro de Alertas:** Panel centralizado para revisar y gestionar alertas críticas con acciones recomendadas generadas dinámicamente.
- **Directorio de Estudiantes:** Tabla completa con búsqueda en tiempo real y filtros por grado y nivel de riesgo.
- **Reportes Analíticos:** Dashboard de métricas globales y exportación de base de datos completa a CSV.
- **Modo Oscuro:** Soporte nativo para temas claros y oscuros según la preferencia del usuario.
- **Diseño Premium:** Interfaz de usuario moderna, fluida y con micro-interacciones.

## 🛠️ Tecnologías Utilizadas

- **Core:** React 19, TypeScript, Vite
- **Estilos:** Tailwind CSS, Framer Motion
- **Estado:** Zustand
- **Gráficos:** Recharts
- **Iconos:** Lucide React

## 📦 Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/smartedu-monitor.git

# 2. Entra al directorio
cd smartedu-monitor

# 3. Elimina instalaciones previas si descargaste un ZIP (Opcional pero recomendado)
rm -rf node_modules package-lock.json

# 4. Instala las dependencias
npm install

# 5. Inicia el servidor de desarrollo
npm run dev
```

Abre tu navegador en [http://localhost:5173](http://localhost:5173) (o el puerto indicado en la consola).

## 🏗️ Compilación y Despliegue Cloud (Producción)

### Opción 1: Build Estático
Para compilar el proyecto y prepararlo para despliegue en Vercel, Netlify o GitHub Pages:
```bash
npm run build
```

### Opción 2: Contenedor Docker (Recomendado)
El proyecto incluye un `Dockerfile` Multi-Stage optimizado con Nginx para servir el frontend de manera aislada y ligera en VPS o orquestadores:

```bash
# Construir la imagen de producción
docker build -t smartedu-monitor .

# Ejecutar el contenedor
docker run -p 80:80 -d --name smartedu-ui smartedu-monitor
```

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura escalable y modular:

```text
src/
├── components/
│   ├── dashboard/  # Gráficas, KPIs, Hero
│   ├── filters/    # Componentes de filtrado
│   ├── tables/     # Tablas reutilizables
│   └── ui/         # Componentes atómicos (Cards, Headers)
├── data/           # Dataset estático simulado
├── layouts/        # Sidebar, TopBar, DashboardLayout
├── pages/          # Vistas (Landing, Dashboard, Estudiantes, Alertas, etc.)
├── store/          # Estado global con Zustand
├── types/          # Definiciones de TypeScript
└── utils/          # Funciones auxiliares
```

## 🔮 Mejoras Futuras

- Integración con base de datos real (Supabase / Firebase).
- Autenticación segura de usuarios (Clerk o Auth0).
- Gráficas evolutivas comparando años anteriores.
- Envío automático de reportes PDF por correo a padres de familia.

---
*Desarrollado como proyecto de portafolio.*
