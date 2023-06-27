import '@styles/globals.css'

export const metadata = {
  title: 'Promptopia',
  description: 'Dicover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        {/* render all the children */}
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout