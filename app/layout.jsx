import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promptopia',
  description: 'Dicover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          {/* render all the children */}
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout