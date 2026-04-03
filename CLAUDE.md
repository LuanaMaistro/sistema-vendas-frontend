# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Sistema de Vendas is a React-based sales management system built with TypeScript, Vite, Ant Design, and a custom `@luanamaistro/core-lib` library. The application manages customers and products with full CRUD operations.

## CRITICAL: @luanamaistro/core-lib Library

**DO NOT MODIFY `@luanamaistro/core-lib` UNDER ANY CIRCUMSTANCES.**

- `@luanamaistro/core-lib` is a separate library maintained by another team
- You must NEVER suggest changes, modifications, or additions to this library
- You must NEVER create or modify interfaces, types, or functions within this library
- If new interfaces or types are needed in the core library, this is the responsibility of the other team
- Only consume what already exists in `@luanamaistro/core-lib`
- If functionality is missing from the core library, document what is needed but DO NOT implement it yourself

## Development Commands

- **Start dev server**: `npm run dev`
- **Build**: `npm run build` (runs TypeScript compiler + Vite build)
- **Lint**: `npm run lint`
- **Preview production build**: `npm run preview`

## Architecture

### Core Library Integration (`@luanamaistro/core-lib`)

The application is built around the `@luanamaistro/core-lib` package, which provides:

- **Either/Result types**: Functional error handling using `Either<L, R>` and `Result<T>` types
- **Application instance**: Created via `createApplicationInstance(serviceFactory)` in `src/infra/applicationInstance.ts`
- **Service interfaces**: Defines contracts like `CustomerService`, `ProductService`
- **Domain types**: `Customer`, `Product`, `CNPJ`, `CPF`, etc.

**Auto-imported utilities** (configured in `vite.config.ts`):
- `fold`, `right`, `left` from `@luanamaistro/core-lib`
- `eitherToBoolean`, `operationResultToNotification` from `@/tools/either`
- React hooks (`useState`, `useEffect`, etc.)

### Directory Structure

```
src/
├── infra/                    # Infrastructure layer
│   ├── applicationInstance.ts  # Central application instance
│   └── servicesImp/           # Service implementations
│       ├── serviceFactiory.ts # Service factory for DI
│       ├── CustomerServiceImp.ts
│       └── ProductServiceImp.ts
├── pages/                    # Feature pages (one per entity)
│   ├── appLayout/           # Main layout wrapper
│   ├── customerCrud/        # Customer CRUD page
│   └── productCrud/         # Product CRUD page
├── routes/                  # Routing configuration
│   ├── RouteConfig.ts      # Route interface
│   └── routes.tsx          # Route definitions
├── components/             # Shared components
│   ├── headers/           # Header components (CrudHeader, etc.)
│   └── modals/            # Modal components
├── hooks/                 # Shared hooks
│   ├── notification/      # Notification system
│   └── useTheme.ts       # Theme management
├── config/               # App configuration
│   └── theme.ts         # Ant Design theme definitions
├── tools/               # Utilities
│   └── either.ts       # Either/Result helpers
└── types/              # Type definitions
```

### Page Structure Pattern

Each CRUD page follows a consistent structure:

```
pages/[entityName]Crud/
├── [Entity]CrudPage.tsx        # Main page component
├── [Entity]CrudStore.ts        # Zustand store for state
├── components/                 # Page-specific components
│   ├── [Entity]Table/
│   ├── [Entity]Filters/
│   ├── Add[Entity]Drawer/
│   └── Update[Entity]Drawer/
├── hooks/                      # Page-specific hooks
│   ├── useAdd[Entity].ts
│   ├── useEdit[Entity].ts
│   └── useDelete[Entity].ts
└── types/                      # Page-specific types
    └── [Entity]FormFields.ts
```

### Service Layer

Services implement interfaces from `@luanamaistro/core-lib`:

```typescript
interface CustomerService {
  Add(entity: Customer): Result
  Remove(id: string): Result
  Update(entity: Customer): Result
  List(): Result<Customer[]>
  GetById(id: string): Result<Customer>
}
```

Currently using mock implementations with `@faker-js/faker` for data generation. All service instances are created through the service factory in `src/infra/servicesImp/serviceFactiory.ts`.

### State Management

- **Zustand** for global and page-level state
- **Store pattern**: Each CRUD page has its own store (e.g., `useCustomerCrudStore`)
- **Theme state**: Managed via `useTheme` hook with persistence to localStorage
- Stores typically contain entity lists and loading functions

### Routing

Routes are centrally defined in `src/routes/routes.tsx` as `RouteConfig` objects:

```typescript
interface RouteConfig {
  path: string
  element: JSX.Element
  title: string
  icon?: JSX.Element
}
```

The `AppLayout` component wraps all routes and provides the sidebar navigation.

### Error Handling

The codebase uses functional error handling with Either types:

- **`fold(either, onLeft, onRight)`**: Pattern match on Either values
- **`eitherToBoolean`**: Convert Either to boolean (true for Right, false for Left)
- **`operationResultToNotification`**: Convert operation results to user notifications

All service operations return `Result<T>` types that must be handled using `fold`.

### Theming

- **Light and dark themes** configured in `src/config/theme.ts`
- Theme selection persisted via `useTheme` hook (Zustand + localStorage)
- Ant Design `ConfigProvider` wraps the app with current theme
- Custom color palette: Primary color `#13C2C2` (light) / `#36CFC9` (dark)

### Path Aliases

- `@/` maps to `./src` (configured in `vite.config.ts`)
- Use absolute imports: `@/components/...`, `@/hooks/...`, etc.

## Adding New CRUD Pages

**Prerequisites**: The service interface must already exist in `@luanamaistro/core-lib`. If it doesn't exist, request the other team to create it first.

1. Verify service interface exists in `@luanamaistro/core-lib`
2. Implement service in `src/infra/servicesImp/[Entity]ServiceImp.ts`
3. Add service to factory in `src/infra/servicesImp/serviceFactiory.ts`
4. Create page directory following the pattern: `src/pages/[entity]Crud/`
5. Create store: `[Entity]CrudStore.ts` with Zustand
6. Create page component, table, filters, and drawer components
7. Create hooks: `useAdd[Entity]`, `useEdit[Entity]`, `useDelete[Entity]`
8. Add route to `src/routes/routes.tsx`

## Important Notes

- Services currently use mock data with faker - replace with actual API calls when integrating backend
- All React hooks are auto-imported (configured via `unplugin-auto-import`)
- Use `fold` for all Either/Result type handling - never access `.value` directly
- Follow the established page structure pattern for consistency
- Component styles use CSS modules (`.module.css`)
