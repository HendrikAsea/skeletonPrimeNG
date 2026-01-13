# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 21 application using PrimeNG UI components with Tailwind CSS and Chart.js for data visualization. The app uses standalone components (no NgModules), zoneless change detection, and implements a custom design system based on Figma specifications.

## Development Commands

### Start Development Server
```bash
ng serve
```
Dev server runs at `http://localhost:4200/` with automatic reload.

### Build
```bash
ng build                    # Production build (outputs to dist/)
ng build --configuration development  # Development build
```

### Testing
```bash
ng test                     # Run Karma unit tests
```

### Code Generation
```bash
ng generate component component-name
ng generate --help          # See all available schematics
```

## Architecture

### Component Structure

All components are **standalone components** (Angular 21 pattern) - no NgModules are used. Components must explicitly import dependencies in their `imports` array.

**Component Organization:**
- `src/app/components/dashboard/` - Dashboard-specific widgets and charts
- `src/app/components/shared/` - Reusable components (sidebar, topbar, metric cards)
- `src/app/service/` - Services (layout service for theme/dark mode management)

**Key Components:**
- `DashboardComponent` - Main dashboard container, uses inline template/styles
- `MetricCardComponent` - Reusable card showing metrics with trend indicators
- `AgeAnalysisChartComponent` / `NcfChartComponent` - Chart.js visualizations
- `SidebarComponent` / `DashboardTopbarComponent` - Navigation components

### Application Bootstrap

Uses standalone bootstrap pattern in `src/main.ts`:
```typescript
bootstrapApplication(AppComponent, appConfig)
```

Configuration in `src/app/app.config.ts`:
- `providePrimeNG()` - PrimeNG with Aura theme preset
- `provideZonelessChangeDetection()` - Uses signals instead of zone.js
- `provideRouter(routes)` - Router configuration (currently empty routes)

### Styling Architecture

**Design System:**
- Custom CSS variables defined in `src/styles.scss` based on Figma design system
- Montserrat font family as primary typeface
- Utility classes for cards, buttons, typography, and colors
- PrimeNG Aura theme with dark mode support (`.p-dark` class)

**Styling Approach:**
- Components use inline styles (template literal in `styles` array)
- Global utilities and design tokens in `src/styles.scss`
- TailwindCSS configured (via `src/tailwind.css`) alongside PrimeNG
- Component prefix: `app-`

**Key CSS Variables:**
- `--spacing-*` / `--margin-*` - Spacing system
- `--card-radius`, `--button-radius`, `--global-radius` - Border radius tokens
- `--primary-navy-main`, `--text-primary-main` - Primary colors
- `--font-size-*` / `--line-height-*` - Typography scale
- `--bg-light` - Main background color (#F8FAFC)

### Layout & Theme Service

`LayoutService` manages application theme state using Angular signals:
- Tracks preset, primary color, surface, and dark mode state
- Uses View Transitions API for smooth dark mode transitions
- Dark mode toggled via `.p-dark` class on `document.documentElement`
- State reactive through `appState` signal and `appStateUpdate$` observable

### Chart Components

Chart components use Chart.js with the following pattern:
- Import `Chart` and `registerables` from 'chart.js'
- Register: `Chart.register(...registerables)`
- Use `@ViewChild` to get canvas `ElementRef`
- Initialize chart in `ngOnInit` with configuration
- Destroy chart in `ngOnDestroy` to prevent memory leaks

### TypeScript Configuration

Strict mode enabled with:
- `strict: true`
- `noImplicitOverride: true`
- `noPropertyAccessFromIndexSignature: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- Angular strict templates and injection parameters

Target: ES2022 with bundler module resolution.

## Key Patterns

### Component Pattern
```typescript
@Component({
  selector: 'app-example',
  standalone: true,  // Always standalone
  imports: [CommonModule, OtherComponent],  // Explicit imports
  template: `...`,  // Inline templates common
  styles: [`...`]   // Inline styles common
})
export class ExampleComponent {}
```

### Signals Usage
The app uses Angular signals (zoneless change detection):
- `signal()` for writable signals
- `effect()` for reactive side effects
- Layout state managed via signals in `LayoutService`

### PrimeNG Integration
- Theme configured in `app.config.ts` with Aura preset
- Dark mode selector: `.p-dark`
- PrimeIcons available via `primeicons/primeicons.css`

## File Conventions

- Component files: `component-name.component.ts`
- Service files: `service-name.service.ts`
- Use SCSS for styles (configured in angular.json)
- All components are standalone (no `*.module.ts` files)

## Routing

Currently using empty routes array in `app.routes.ts`. The main `AppComponent` directly imports and renders `DashboardComponent` instead of using router outlet.

To add routing:
1. Define routes in `app.routes.ts`
2. Update `app.component.html` to use `<router-outlet />`
3. Routes are already configured via `provideRouter(routes)` in app.config

## Responsive Design

Components include responsive breakpoints:
- Desktop: default styles
- Tablet: `@media (max-width: 1200px)`
- Mobile: `@media (max-width: 768px)`

Dashboard adapts:
- Cards stack vertically on mobile
- Sidebar collapses/repositions
- Chart sections become full-width