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
    title: locale === 'ja' ? "制作物" : "My Work",
    description: locale === 'ja' 
      ? "私のプロジェクトと成果のショーケース" 
      : "A showcase of my projects and achievements",
    path: 'work',
    locale,
    theme: 'light'
  })
}

export default async function WorkPage({ 
  params 
}: { 
  params: Promise<Params> 
}) {
  // paramsを非同期で解決
  const { locale } = await params;
  
  // mdxコンテンツを取得
  const post = await getMdxBySlug(locale, ['work'])
  
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
