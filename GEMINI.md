# Project: Portfolio 2025

このプロジェクトは、Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, MDX を使用した個人ポートフォリオサイトです。

## 🤖 Agent Global Rules (Critical)

1.  **言語設定**:
    *   **思考 (Thinking)**: 英語で行う (Think in English).
    *   **回答 (Response)**: **必ず日本語**で行う (Always respond in Japanese).
    *   **成果物 (Artifacts)**: **必ず日本語**で作成する (Artifacts must be written in Japanese). 特に `implementation_plan.md` や `task.md` は日本語で記述すること。

2.  **進行管理**:
    *   **10ステップルール**: Tool callなどのステップが10を超えた場合、一度作業を中断し、以下の内容をユーザーに報告すること。
        *   完了した作業
        *   現在の状況
        *   次のアクション
        *   ユーザーへの確認 (Proceed?)

## 🛠 Tech Stack

*   **Framework**: Next.js 15 (App Router), React 19 (Experimental)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **Content**: MDX (with `next-mdx-remote`, `remark`, `rehype`, `shiki`)
*   **Animation**: motion, rough-notation
*   **Formatter/Linter**: Biome (`pnpm format`, `pnpm check`)
*   **Package Manager**: pnpm

## 📝 Coding Guidelines

*   **Component Style**: React Functional Components (RFC) と Hooks を使用する。
*   **Styling**: Tailwind CSS v4 のクラスを使用する。複雑な条件付きクラスには `clsx` と `tailwind-merge` (`lib/utils.ts` の `cn` 関数など) を使用する。
*   **Type Safety**: TypeScript の型定義を厳格に行う。`any` は避ける。
*   **Formatting**: コードを変更した際は、可能な限り `pnpm format` (Biome) を実行してフォーマットを整えること。
*   **Filesystem**:
    *   新しいコンポーネントは `components/` 配下に配置する。
    *   汎用的なUIコンポーネントは `components/ui/` 配下に配置する。
    *   ページは `app/` 配下に配置する。

## 🚀 Workflow

1.  変更を加える前に、関連するファイルを確認する。
2.  大きな変更を行う際は、`implementation_plan.md` (日本語) を作成し、ユーザーの承認を得る。
3.  MDX関連の変更を行う際は、`mdx-components.tsx` や関連するプラグイン設定 (`next.config.mjs` 等) に注意する。
