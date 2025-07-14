import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center dark:bg-zinc-800 dark:text-white">
      <h1>Test</h1>
    </div>
  )
}
