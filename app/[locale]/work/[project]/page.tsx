import type { MetadataTheme } from '@/lib/metadata';
import { generateMetadata as baseGenerateMetadata } from '@/lib/metadata';
import { getMdxBySlug, getAllContentPaths } from '@/lib/mdx-utils'
import { languages, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import ReturnButton from '@/components/return-back'
import type { Metadata } from 'next'

type Params = {
  locale: string;
  project: string;
}

// 静的生成のためのパスを取得
export async function generateStaticParams(): Promise<Params[]> {
  const paths = []
  
  for (const locale of languages) {
    // work/配下のコンテンツを取得（work/project1.mdxなど）
    const allPaths = await getAllContentPaths(locale)
    const workPaths = allPaths.filter(path => 
      path.length > 1 && path[0] === 'work'
    )
    
    for (const path of workPaths) {
      // work/project1 → projectに変換
      const project = path[1]
      
      paths.push({
        locale,
        project,
      })
    }
  }
  
  return paths
}

// メタデータを生成
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<Params> 
}): Promise<Metadata> {
  // paramsを非同期で解決
  const { locale, project } = await params;
  
  // MDXデータを取得 - 配列として渡す
  const post = await getMdxBySlug(locale, ['work', project])
  
  if (!post) {
    return {}
  }
  
  const { frontmatter } = post
  
  // themeの型安全な処理
  let theme: MetadataTheme = 'light'
  if (frontmatter.theme === 'dark' || frontmatter.theme === 'light') {
    theme = frontmatter.theme
  }
  
  return baseGenerateMetadata({
    title: frontmatter.title || `Project: ${project}`,
    description: frontmatter.description || '',
    path: `work/${project}`,
    locale,
    theme
  })
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<Params> 
}) {
  // paramsを非同期で解決
  const { locale, project } = await params;
  
  console.log(`ProjectPage: locale=${locale}, project=${project}`)
  
  // MDXコンテンツを取得 - 明示的に配列として渡す
  const post = await getMdxBySlug(locale, ['work', project])
  
  if (!post) {
    console.error(`Content not found for locale=${locale}, project=${project}`)
    notFound()
  }
  
  return (
    <>
      {post.content}
      <div className="mt-8">
        <ReturnButton />
      </div>
    </>
  )
}
