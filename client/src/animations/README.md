# Animation System

Centralized animation utilities for the ALIVE application.

## Structure

```
src/animations/
  ├─ variants.js          # Animation variants
  ├─ pageTransitions.js   # Page transition components
  ├─ microInteractions.js # Button, card, and micro animations
  ├─ config.js            # Animation configuration
  └─ index.js             # Central exports
```

## Usage

### Page Transitions

```jsx
import { PageTransition } from '../animations/pageTransitions';

<PageTransition>
  <YourPageContent />
</PageTransition>
```

### Stagger Container

```jsx
import { StaggerContainer } from '../animations/pageTransitions';

<StaggerContainer>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>
```

### Animated Button

```jsx
import { AnimatedButton } from '../animations/microInteractions';

<AnimatedButton onClick={handleClick}>
  Click Me
</AnimatedButton>
```

### Animated Card

```jsx
import { AnimatedCard } from '../animations/microInteractions';

<AnimatedCard index={0}>
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>
```

## Hooks

### useReducedMotion

Detects if user prefers reduced motion.

```jsx
import { useReducedMotion } from '../hooks/useReducedMotion';

const MyComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Conditionally disable animations
  if (prefersReducedMotion) {
    return <StaticVersion />;
  }
  
  return <AnimatedVersion />;
};
```

### useLowEndDevice

Detects low-end devices for performance optimization.

```jsx
import { useLowEndDevice } from '../hooks/useReducedMotion';

const MyComponent = () => {
  const isLowEnd = useLowEndDevice();
  
  // Reduce animation complexity
  const config = isLowEnd ? fastConfig : normalConfig;
};
```

## Configuration

Edit `config.js` to:
- Disable animations globally
- Adjust performance settings
- Modify animation presets

## Accessibility

All animations:
- Respect `prefers-reduced-motion`
- Have fallbacks for reduced motion
- Use appropriate easing
- Don't cause motion sickness
