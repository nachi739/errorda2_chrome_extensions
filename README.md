# Chrome 拡張機能プロジェクト

このプロジェクトは、React と Vite を使用して構築された Chrome 拡張機能です。

下記の NotionDB テンプレートの利用を前提としています。

[テンプレート](https://honored-motion-55e.notion.site/129eaa80727680f19b06d02621f24066?v=129eaa807276819899ee000c30bb0f5b&pvs=4)

## 利用方法（開発環境を構築せずに利用する場合）

[導入手順リンク先](https://github.com/nachi739/Errorda2?tab=readme-ov-file#%E5%88%A9%E7%94%A8%E6%96%B9%E6%B3%95)

## はじめに

このプロジェクトを始めるには、以下の手順に従ってください：

1. **リポジトリをクローンする:**

```sh
git clone https://github.com/yourusername/errorda2_chrome_extensions.git
cd errorda2_chrome_extensions.git
```

2. **依存関係をインストールする:**

```sh
yarn install
```

3. **開発サーバーを起動する:**

```sh
yarn dev
```

4. **プロジェクトをビルドする:**

```sh
yarn build
```

5. **Chrome に拡張機能を読み込む:**

- Chrome を開き、`chrome://extensions/` にアクセス
- 「デベロッパーモード」を有効にする
- 「パッケージ化されていない拡張機能を読み込む」をクリックし、`dist` フォルダを選択

## プロジェクト構成

- `src/`: 拡張機能のソースコードが含まれています
- `public/`: 静的アセットが含まれています
- `dist/`: ビルド出力ディレクトリ

## 機能

- テンプレートの NotionDB との連携
- 検索時に Google 検索を行い・NotionDB の Title に検索内容保存・検索開始時刻を保存
- 解決時に NotionDB の詳細ページへ画面遷移・検索終了時刻を保存

## ライセンス

このプロジェクトは [MIT ライセンス](./LICENSE) の下でライセンスされています。

### 使用しているライブラリのライセンス

- **React**: [MIT License](https://github.com/facebook/react/blob/main/LICENSE)
- **Vite**: [MIT License](https://github.com/vitejs/vite/blob/main/LICENSE)
- **ESLint**: [MIT License](https://github.com/eslint/eslint/blob/main/LICENSE)
- **@notionhq/client**: [MIT License](https://github.com/makenotion/notion-sdk-js/blob/main/LICENSE)
- **@crxjs/vite-plugin**: [MIT License](https://github.com/crxjs/chrome-extension-tools/blob/main/LICENSE)
- **@mantine/core**: [MIT License](https://github.com/mantinedev/mantine/blob/master/LICENSE)
- **@mantine/form**: [MIT License](https://github.com/mantinedev/mantine/blob/master/LICENSE)
- **@mantine/hooks**: [MIT License](https://github.com/mantinedev/mantine/blob/master/LICENSE)
- **@types/chrome**: [MIT License](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE)
- **dayjs**: [MIT License](https://github.com/iamkun/dayjs/blob/dev/LICENSE)
- **typescript**: [Apache License 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt)

このテンプレートは、HMR といくつかの ESLint ルールを使用して、Vite で React を動作させるための最小限のセットアップを提供します。

現在、2 つの公式プラグインが利用可能です：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) は、[Babel](https://babeljs.io/) を使用して Fast Refresh を実現します
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) は、[SWC](https://swc.rs/) を使用して Fast Refresh を実現します
