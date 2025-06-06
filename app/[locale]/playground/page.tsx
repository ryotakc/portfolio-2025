import { generateMetadata as baseGenerateMetadata } from '@/lib/metadata';
import { getMdxBySlug } from '@/lib/mdx-utils'
import { languages, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import ReturnButton from '@/components/return-back'
import type { Metadata } from 'next'

type Params = {
  locale: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return languages.map((locale) => ({ locale }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<Params> 
}): Promise<Metadata> {
  // paramsを非同期で解決
  const { locale } = await params;
  
  return baseGenerateMetadata({
    title: locale === 'ja' ? "MDX Test" : "Playgound",
    description: locale === 'ja' 
      ? "MDXのテスト" 
      : "MDX Test",
    path: 'playground',
    locale,
    theme: 'dark'
  })
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<Params> 
}) {
  // paramsを非同期で解決
  const { locale } = await params;
  
  // mdxコンテンツを取得
  const post = await getMdxBySlug(locale, ['playground'])
  
  if (!post) {
    notFound()
  }
  
  const dictionary = getDictionary(locale)
  
  return (
    <>
      {post.content}
      <div className="mt-8">
        <ReturnButton />
      </div>
    </>
  )
}
