# Astro + React + Three.js + Framer Motion (Docker)

このリポジトリには、Astro をベースに React / three.js / framer-motion を使うプロジェクトのサンプル Dockerfile を含みます。

目的
- ローカル開発: `npm run dev` で Astro 開発サーバーを起動
- 本番配布: `astro build` で static な `dist/` を作成し、Docker で配布（nginx を利用）

含まれるファイル
- `package.json` — 必要な依存とスクリプト
- `Dockerfile` — マルチステージビルド（Node でビルド → nginx で配布）
- `.dockerignore` — ビルドに含めないファイル

Docker イメージを作る（静的配布 via nginx）

```bash
# プロジェクトルートで
docker build -t astro-portfolio:latest .
# コンテナを起動（ポート80で配布）
docker run --rm -p 8080:80 astro-portfolio:latest
# ブラウザで http://localhost:8080 を開く
```

開発時にイメージで確認したい場合（preview を使う）

```bash
# ビルドを行い、Node イメージで preview を実行する簡易的な流れ（開発向け）
# ただしこのリポジトリのデフォルト Dockerfile は静的配布を目的としています。
```

補足
- このリポジトリにはまだコンポーネントやページは含まれていません。`src/` 以下に Astro ページや React コンポーネントを追加してください。
- バージョンは執筆時点の互換性を想定したものです。必要に応じて `package.json` のバージョンを調整してください。
