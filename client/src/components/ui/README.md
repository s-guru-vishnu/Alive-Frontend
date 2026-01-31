# CustomDialog Component

A fully accessible, reusable dialog/modal component with smooth animations and keyboard support.

## Features

✅ **Centered modal overlay** with backdrop blur  
✅ **Click outside to close** (optional)  
✅ **ESC key closes dialog**  
✅ **Focus trapped** inside dialog  
✅ **Prevents background scroll** when open  
✅ **Smooth animations** (scale + fade)  
✅ **Three variants**: default, danger, success  
✅ **Fully accessible** (ARIA roles, focus management)  
✅ **Mobile-friendly** responsive design  

## Basic Usage

```jsx
import React, { useState } from 'react';
import CustomDialog from './components/ui/CustomDialog';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>

      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!');
          // Your action here
        }}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        confirmText="Yes, Proceed"
        cancelText="Cancel"
      />
    </>
  );
}
```

## Props API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | - | ✅ | Controls dialog visibility |
| `onClose` | `function` | - | ✅ | Callback when dialog closes |
| `onConfirm` | `function` | - | ❌ | Callback for confirm action |
| `title` | `string` | - | ✅ | Dialog title |
| `description` | `string` | - | ❌ | Optional description text |
| `confirmText` | `string` | `"Confirm"` | ❌ | Text for confirm button |
| `cancelText` | `string` | `"Cancel"` | ❌ | Text for cancel button |
| `variant` | `"default" \| "danger" \| "success"` | `"default"` | ❌ | Dialog variant |
| `closeOnOverlayClick` | `boolean` | `true` | ❌ | Allow closing by clicking overlay |
| `showCancel` | `boolean` | `true` | ❌ | Show cancel button |
| `showConfirm` | `boolean` | `true` | ❌ | Show confirm button |
| `children` | `ReactNode` | - | ❌ | Custom content to render in dialog body |

## Variants

### Default (Blue)
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Information"
  description="This is a default dialog"
  variant="default"
/>
```

### Danger (Red)
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  description="This action cannot be undone."
  variant="danger"
  confirmText="Delete"
/>
```

### Success (Green)
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success!"
  description="Your action was completed successfully."
  variant="success"
  confirmText="OK"
  showCancel={false}
/>
```

## Custom Content

You can pass custom JSX as children:

```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Form"
  confirmText="Save"
>
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Enter name"
      className="w-full px-3 py-2 border rounded-md"
    />
    <input
      type="email"
      placeholder="Enter email"
      className="w-full px-3 py-2 border rounded-md"
    />
  </div>
</CustomDialog>
```

## Advanced Examples

### Prevent Overlay Click
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Important Notice"
  description="You must use the buttons to close."
  closeOnOverlayClick={false}
/>
```

### No Cancel Button
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success"
  description="Operation completed!"
  showCancel={false}
  confirmText="OK"
/>
```

### No Confirm Button
```jsx
<CustomDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Information"
  description="This is just an informational dialog."
  showConfirm={false}
/>
```

## Accessibility

The component includes:

- ✅ ARIA `role="dialog"` and `aria-modal="true"`
- ✅ Proper `aria-labelledby` and `aria-describedby` attributes
- ✅ Focus management (focuses first element on open, returns focus on close)
- ✅ Keyboard navigation (Tab, Shift+Tab, ESC)
- ✅ Focus trap (Tab key cycles within dialog)

## Keyboard Shortcuts

- **ESC**: Closes the dialog
- **Tab**: Moves to next focusable element
- **Shift + Tab**: Moves to previous focusable element

## Styling

The component uses Tailwind CSS and is fully customizable through props. All animations are handled via CSS transitions for smooth performance.

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Transitions
- ES6+ JavaScript
