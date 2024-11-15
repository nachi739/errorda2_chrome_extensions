# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# package.jsonとyarn.lockをコピー
COPY package.json yarn.lock ./

# 依存パッケージをインストール
RUN yarn install --ignore-optional

# ソースコードをコピー
COPY . .

# 環境変数を設定してyarnのパスを追加
ENV PORT 3030

# アプリケーションを起動
CMD ["yarn", "dev"]