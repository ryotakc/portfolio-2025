import { HistoryTracker } from '@/components/history-tracker'
import { languages } from '@/lib/i18n'

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <article className='pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14'>
      <HistoryTracker />
      {children}
    </article>
  )
}

// import type { Metadata } from 'next'
// import cn from 'clsx'
// import Navbar from '@/components/Navbar'
// import { ModeToggle } from '@/components/mode-toggle'
// import { LanguageToggle } from '@/components/language-toggle'
// import { HistoryTracker } from '@/components/history-tracker'
// import { languages } from '@/lib/i18n'

// export async function generateStaticParams() {
//   return languages.map((locale) => ({ locale }))
// }

// export async function generateMetadata({ 
//   params 
// }: { 
//   params: Promise<{ locale: string }> 
// }): Promise<Metadata> {
//   // paramsを非同期で解決
//   const { locale } = await params;
  
//   return {
//     title: {
//       template: '%s | Leo',
//       default: 'Leo',
//     },
//   }
// }

// export default async function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode
//   params: Promise<{ locale: string }>
// }) {
//   // paramsを非同期で解決
//   const { locale } = await params;
  
//   return (
//     <div className={cn('w-full p-6 sm:p-10 md:p-14', 'text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7')}>
//       <div className='fixed sm:hidden h-6 sm:h-10 md:h-14 w-full top-0 left-0 z-30 pointer-events-none content-fade-out' />
//       <div className=''>
//         <div className='flex flex-col mobile:flex-row justify-center'>
//           {/* Navbarをクライアントコンポーネントとして実装、localeを属性として渡す */}
//           <Navbar initialLocale={locale} />
//           <main className='relative flex-1 max-w-2xl [contain:inline-size]'>
//             <div className='absolute w-full h-px opacity-50 bg-rurikon-border dark:bg-rurikon-border-dark right-0 mobile:right-auto mobile:left-0 mobile:w-px mobile:h-full mobile:opacity-100' />
//             <article className='pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14'>
//               <HistoryTracker />
//               {children}
//             </article>
//           </main>
//         </div>  
        
//         <div className="fixed bottom-6 right-16 z-50">
//           <ModeToggle /> 
//         </div>
        
//         <div className="fixed bottom-26 right-6 z-50">
//           <LanguageToggle />
//         </div>      
//       </div>
//     </div>
//   )
// }
