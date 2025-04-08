import type { Metadata, Viewport } from 'next'
import { unstable_ViewTransition as ViewTransition } from 'react'
import cn from 'clsx'
import 'katex/dist/katex.min.css'
import './globals.css'
import { Provider } from 'react-wrap-balancer'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import NavbarWrapper from '@/components/navbar-wrapper'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    template: '%s | Leo',
    default: 'Leo',
  },
}

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: 'only light',
  themeColor: '#fcfcfc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='overflow-x-hidden touch-manipulation' suppressHydrationWarning>
      <body className={cn(
        'font-mono',
        'w-full p-6 sm:p-10 md:p-14',
        'text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7',
        'text-rurikon-500',
        'antialiased',
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >   
          <div className='fixed sm:hidden h-6 sm:h-10 md:h-14 w-full top-0 left-0 z-30 pointer-events-none content-fade-out' />
          <div className=''>
            <div className='flex flex-col mobile:flex-row justify-center'>
              <NavbarWrapper />
              <main className='relative flex-1 max-w-2xl [contain:inline-size]'>
                <div className='absolute w-full h-px opacity-50 bg-rurikon-border dark:bg-rurikon-border-dark right-0 mobile:right-auto mobile:left-0 mobile:w-px mobile:h-full mobile:opacity-100' />
                <Provider>
                  <ViewTransition name='crossfade'>
                    {children}
                    <Analytics />
                  </ViewTransition>            
                </Provider>
              </main>
            </div>  
            
              <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                {/* LanguageToggleを上部に配置 */}
                <div>
                  <LanguageToggle />
                </div>
                
                {/* ModeToggleを下部に配置 */}
                <div>
                  <ModeToggle /> 
                </div>
              </div> 
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


// import type { Metadata, Viewport } from 'next'
// import { unstable_ViewTransition as ViewTransition } from 'react'
// import 'katex/dist/katex.min.css'
// import './globals.css'
// import { Provider } from 'react-wrap-balancer'
// import { ThemeProvider } from '@/components/theme-provider'

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Leo',
//     default: 'Leo',
//   },
// }

// export const viewport: Viewport = {
//   maximumScale: 1,
//   colorScheme: 'only light',
//   themeColor: '#fcfcfc',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang='en' className='overflow-x-hidden touch-manipulation' suppressHydrationWarning>
//       <body className='w-full font-mono text-rurikon-500 antialiased'>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >   
//           <Provider>
//             <ViewTransition name='crossfade'>
//               {children}
//             </ViewTransition>            
//           </Provider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
