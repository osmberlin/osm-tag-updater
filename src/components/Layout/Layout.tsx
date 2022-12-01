import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = { children: React.ReactNode }

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-2 rounded bg-violet-100 px-6 py-4 sm:mx-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
