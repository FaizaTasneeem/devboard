import { RouterProvider } from 'react-router-dom'
import './App.css'
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import router from './Router'

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
