import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Away From Office - Travel Planner',
  description: 'Your intelligent travel companion for before and after arrival planning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
