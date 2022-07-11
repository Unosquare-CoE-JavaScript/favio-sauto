# Suspense

- Allows React to "suspend" rendering a component subtree
  - Used when a (grand) child component is not ready to be rendered
    - ECMAScript bundle containing the component isn't loaded yet
    - The data needed for a component to render isn't available yet
- The "fallback" component will be rendered instead
  - Replaces the complete children component tree
- Rendering is suspended when a promise is thrown
  - And resumed when the promise resolves

# SWR and Suspense

- SWR is used in the application to load data
  - A convenient hook to fetch data
- SWR makes it easy to start using suspense
  - Add suspense: true to the <SWRConfig />

# <Suspense /> & Errors

- If a suspense resource fails to load an error is thrown
  - When requesting it during the render()
- Catch the error using an ErrorBoundary
  - Just like other runtime errors in React lifecycle functions
- Error boundaries can be nested
  - Just like suspense boundaries

# Nesting <Suspense />

- Multiple suspense components can be nested
- React will use the closest parent <Suspense /> component
  - Very useful to control what part of the UI is replaced by a fallback
- There is a behavior change in React 18 with null fallback

# Parallel <Suspense />

- Multiple suspense boundaries can suspend in parallel
  - React will suspend them all and show multiple fallback components
- If we want to render a component while others are still loading
- Multiple suspending components in a single <Suspense /> is also fine
  - Will resume when all resource promises are resolved

# New Hooks

- useDeferredValue()
  - Returns a deferred version of the value that may lag behind
- useTransition()
  - Avoid undesirable states when waiting for content
- useMutableSource() or useSyncExternalSource()
  - Enables React components to safely and efficiently read from a mutable external source in Concurrent Mode
  - Avoids tearing
- useOpaqueIdentifier() or useId()
  - Can be used to generate unique ID's in an SSR-safe way

# useTransition Hook

- The useTransition() hook can be used to control how React renders when components suspend
  - Prevent the fallback component being rendered immediately
- The new components will be rendered when:
  - Their resources are ready
  - The timeout is expired
- The "old" UI can use the isPending state when rendering

# useDeferredValue Hook

- The useDeferredValue() hook can be used to create a deferred version of the value that may "lag behind"
  - Can prevent extra re-renders of expensive components
