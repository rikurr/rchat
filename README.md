# チャットアプリ

Demo（削除済み）

https://rchat-eight.vercel.app/


## 技術選定

### 全体設計

- Next.js
- Firebase Firestore
- Firebase Auth
- Tailwind CSS
- Radix UI


### 技術選定

#### Next.js

- 様々なレンダリング方式のサポートと、ルーティングやコードの最適化など必要な機能を提供しているため
- 今回はサーバーコンポーネントについては、あまり使用できていません。

#### CSS

- 今までCSS Module やEmotionを使用することが多かったが、Nexe.jsのサーバーコンポーネントでの対応状況を考えCSS modulesやTailwind CSSを選択
- shadcn uiというRadix UI + Tailwind CSSを利用したコンポーネント集を利用したかったので、Tailwind CSSを利用する

#### Firebase Firestore

- クライアント側の実装のみでリアルタイムな更新を実現でき、サーバーレスで自動でスケールできるため、バックエンドの実装が不要になるため