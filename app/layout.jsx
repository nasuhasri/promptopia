import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promptopia - Nasuha Asri',
  description: 'Dicover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
      <body suppressHydrationWarning={true}>
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