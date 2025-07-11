This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🍎 AppleRotation オブジェクトアニメーションの使い方

### 概要

このプロジェクトでは、スクロール位置に応じて90枚の連写画像を切り替え、りんごオブジェクトが回転・拡大縮小するアニメーションを実現しています。

### 基本的な使い方

`src/components/AppleRotation.tsx` をページや他のコンポーネントで呼び出してください。

```tsx
import AppleRotation from "@/components/AppleRotation";

<AppleRotation />
```

### カスタマイズ

`AppleRotation` コンポーネントは以下のpropsで制御できます：

| Prop           | 型                       | 説明                                      | デフォルト値         |
|----------------|--------------------------|-------------------------------------------|---------------------|
| size           | 'small' \| 'medium' \| 'large' | りんごの表示サイズ                        | 'medium'            |
| rotationSpeed  | number                   | 回転速度（1.0で1周、2.0で2周など）         | 1                   |
| scaleRange     | [number, number]         | 拡大縮小の最小・最大倍率                   | [0.5, 1.5]          |
| className      | string                   | 追加のクラス名                             | ''                  |
| triggerOffset  | number                   | スクロールトリガーのオフセット（0〜1）     | 0.2                 |

#### 例：
```tsx
<AppleRotation 
  size="large" 
  rotationSpeed={1.5} 
  scaleRange={[0.8, 1.8]} 
  className="mx-auto my-8"
/>
```

### 複数配置・応用例

複数の場所に異なる設定で配置できます。

```tsx
<div className="flex gap-8">
  <AppleRotation size="small" rotationSpeed={1.2} />
  <AppleRotation size="medium" rotationSpeed={0.8} scaleRange={[0.7, 1.3]} />
  <AppleRotation size="large" rotationSpeed={2.0} scaleRange={[0.5, 2.0]} />
</div>
```

### 技術的ポイント
- 90枚の画像を事前読み込みし、スクロール位置でフレームを切り替え
- Intersection Observerでパフォーマンス最適化
- スクロールに応じて拡大縮小も同時に制御
- TypeScriptで型安全

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
