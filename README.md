# Chrome 拡張機能プロジェクト

このプロジェクトは、React と Vite を使用して構築された Chrome 拡張機能です。

下記の NotionDB テンプレートの利用を前提としています。

[テンプレート](https://honored-motion-55e.notion.site/129eaa80727680f19b06d02621f24066?v=129eaa807276819899ee000c30bb0f5b&pvs=4)

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

- **React**: ユーザーインターフェースを構築するための JavaScript ライブラリ
- **Vite**: 高速なビルドツールおよび開発サーバー
- **ESLint**: JavaScript コードの問題を特定し修正するためのツール

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
