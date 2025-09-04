const { defineConfig } = require('vite')

module.exports = async () => {
  const { default: react } = await import('@vitejs/plugin-react')
  return defineConfig({ plugins: [react()], server: { port: 5173 } })
}