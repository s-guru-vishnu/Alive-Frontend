# Emergency Animation Components

Reusable components for emergency request animations.

## Components

### EmergencyBadge
Animated badge for emergency requests with pulse animation.

```jsx
import { EmergencyBadge } from '../components/emergency';

<EmergencyBadge />
```

### EmergencyCard
Wrapper component that adds emergency styling and animations to content.

```jsx
import { EmergencyCard } from '../components/emergency';

<EmergencyCard>
  <h3>Emergency Request</h3>
  <p>Urgent blood needed</p>
</EmergencyCard>
```

### EmergencyBanner
Slide-down banner for emergency notifications.

```jsx
import { EmergencyBanner } from '../components/emergency';

<EmergencyBanner 
  isVisible={hasEmergency} 
  count={emergencyCount}
  onDismiss={() => setHasEmergency(false)}
/>
```

### EmergencyCount
Animated count indicator for emergency requests.

```jsx
import { EmergencyCount } from '../components/emergency';

<EmergencyCount count={5} />
```

## Features

- Respects `prefers-reduced-motion`
- Subtle, professional animations
- Pauses on hover
- No aggressive flashing
- Accessible
