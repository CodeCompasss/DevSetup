

### **`doc/DeveloperGuide.md`**

```markdown
# DevSetup Developer Guide

Welcome to **DevSetup**! This document provides an in-depth guide for developers, covering architecture, folder structure, testing, CI/CD, and best practices to maintain a high-quality, scalable project.

---

## 1. Project Overview

**DevSetup** is a developer tool script generator for multiple operating systems. It allows users to:

- Select OS (Windows, macOS, Linux)
- Choose package manager
- Select development tools
- Generate installation scripts
- Copy or download the script

The app is built with **React 19 + TypeScript**, following **industry-level clean architecture principles**, making it maintainable, testable, and scalable.

---

## 2. Folder Structure

```

src/
├── components/
│    ├── ScriptGenerator/
│    │     ├── ScriptGenerator.tsx
│    │     ├── Header.tsx
│    │     ├── SearchBox.tsx
│    │     ├── OSSelector.tsx
│    │     ├── PackageManagerSelector.tsx
│    │     ├── ToolGrid.tsx
│    │     ├── ToolCard.tsx
│    │     ├── ScriptOutput.tsx
│    │     └── ActionButtons.tsx
│    └── common/  # Shared buttons, layout, icons
│
├── hooks/
│    ├── useTheme.ts           # Theme toggle logic
│    ├── useToolsData.ts       # Fetch and manage tool JSON data
│    └── useScriptGenerator.ts # Script generation logic
│
├── lib/
│    ├── types.ts              # TypeScript types for tools and OS
│    ├── constants.ts          # App-wide constants
│    └── script.ts             # Utility functions for script generation
│
├── data/
│    └── tools.json            # Tool definitions
│
├── pages/
│    └── index.tsx             # Entry page
│
└── tests/
├── lib/
│   └── script.test.ts
├── hooks/
│   ├── useScriptGenerator.test.ts
│   └── useTheme.test.ts
└── components/
└── ScriptGenerator.test.tsx

````

---

## 3. Architecture Overview

- **Components**: Presentational components only. Each component focuses on **one responsibility**.  
- **Hooks**: Handle state and logic. Components call hooks but don't manage state directly.  
- **Lib**: Utilities, constants, and TypeScript types.  
- **Data**: JSON files defining all tools and categories.  
- **Pages**: Next.js page(s) entry point.  

**Design Principles**:

1. **Single Responsibility**: Each file/component does one thing.
2. **Separation of Concerns**: UI vs Logic vs Data.
3. **Reusability**: Common components in `components/common/`.
4. **Testability**: All logic is isolated for unit and integration tests.

---

## 4. Testing Strategy

### **Unit Tests**
- Test all hooks, components, and utilities individually.
- Tools:
  - `Jest` for assertions
  - `React Testing Library` for component rendering
  - `jest-axe` for accessibility checks

**Example**:
```ts
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ScriptGenerator from '../ScriptGenerator';

test('should have no accessibility violations', async () => {
  const { container } = render(<ScriptGenerator />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
````

---

### **Integration Tests**

* Test multiple components interacting together.
* Verify flows like:

  * OS → Package → Tool selection → Script output
  * Theme toggling
  * Search filtering

---

### **End-to-End Tests (E2E)**

* Tools: `Playwright`
* Test full user flows in real browsers:

  * Select OS, package, and tools
  * Copy / download script
  * Mobile responsiveness
  * Accessibility snapshot

---

### **Performance & SEO**

* Run **Lighthouse** in CI or locally:

  * Performance (FCP, LCP, CLS)
  * Accessibility
  * Best Practices
  * SEO
* Ensure scripts are generated quickly, DOM updates efficiently, and components render optimally.

---

### **Security**

* Run `npm audit` or 
* periodically
* Keep dependencies updated
* Avoid unsafe operations (`innerHTML`, eval)

---

## 5. CI/CD Workflow

1. **GitHub Actions** triggers on PR and push to main.
2. Runs:

   * ESLint & Prettier
   * TypeScript compilation
   * Unit & integration tests
   * Accessibility tests (`jest-axe` / Playwright snapshot)
   * Lighthouse audits (performance + SEO)
3. Deploy previews via **Vercel / Netlify**
4. Merge → production deploy

---

## 6. Contribution Guidelines

* **Branching**: Use feature branches: `feature/<name>` or `bugfix/<name>`
* **Commit messages**: Conventional commits
* **Pull requests**: Include tests + screenshots if UI changes
* **Code review**: Ensure accessibility, performance, and type safety

---

## 7. Best Practices

* Keep components small & reusable
* Use TypeScript types everywhere
* Isolate hooks for testability
* Ensure proper contrast and ARIA attributes
* Write meaningful test cases
* Monitor performance & accessibility in CI

---

## 8. Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Run tests:

```bash
npm run test
```

4. Run accessibility audits:

```bash
npm run test:a11y
```

5. Run Lighthouse performance/SEO:

```bash
npm run audit
```

---

> This guide ensures the project is maintainable, scalable, testable, and up to top-tier industry standards.

```

