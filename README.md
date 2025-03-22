# SaaS Platform Monorepo

![Mermaid Diagram](https://mermaidviewer.com/api/diagrams/YFicy36gCZTJ4j_ErUbP7/image)


## 📋 Requisitos Previos

- Node.js ≥18.x
- pnpm 8.15.6
- TurboRepo 1.9+

```bash
# Verificar instalaciones
node --version
pnpm --version
```

## 🚀 Guía de Implementación

### Instalación de dependencias
```bash
pnpm install
```

### Desarrollo
```bash
pnpm dev
```

### Construcción para Producción
```bash
pnpm build
```

### Creación de Nuevos Paquetes
```bash
pnpm turbo gen run init
```

**Configuración inicial automática incluye:**
- TypeScript con configuración base

**Convenciones:**
1. Ubicación en `packages/` para librerías compartidas
2. Nomenclatura: `@repo/package-name` en package.json
3. Dependencias internas: Usar `workspace:*` para referenciar otros paquetes

## 🧩 Estructura del Proyecto
```bash
.
├── apps/
│   ├── web/       # Aplicación principal
│   └── docs/      # Documentación técnica
├── packages/
│   ├── ui/        # Componentes UI con Shadcn
│   └── typescript-config/ # Configuración TypeScript
└── turbo.json     # Pipeline de construcción
```

## 🔧 Configuraciones Clave

## 📦 Componentes

Los componentes se encuentran en la carpeta `packages/ui/src/components`.

Estos componentes son reutilizables mediante `Shadcn UI` y pueden ser utilizados en diferentes `apps`.

Para sobreescribir todos los componentes de la UI, se debe ejecutar el siguiente comando:

```bash
pnpm bump-ui
```

## 🛠️ Pipeline de Calidad

| Herramienta      | Propósito                | Configuración           |
|------------------|--------------------------|-------------------------|
| Biome            | Linting/Formateo         | `biome.json`            |
| Husky            | Git Hooks                | `.husky/pre-commit`     |
| TurboRepo        | Task Orchestration       | `turbo.json`            |

```bash
# Ejecutar checks de calidad
pnpm lint
pnpm check-types
```

## 🔮 Roadmap

1. [ ] Implementar GitHub Actions para CI/CD
2. [ ] Configurar Package para UI Testing
3. [ ] Integrar SonarCloud para análisis de código

---

📌 **Nota:** Variables de entorno se configurarán en `apps/*/.env.local` siguiendo el formato:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```