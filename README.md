# Alpha DOJO v2

## フロントエンドの起動について
* フロントエンド (Next.js) を起動する際には、Strapi を利用したログイン状態の管理が必須になっています。
* 非ログイン状態では `/login` ページ以外を表示できません。

### 1. Strapi の起動
* [Strapi の起動方法](#strapi-の起動方法) を参照してください

### 2. Strapi の設定
1. Strapi の GitHub OAuth の機能を有効化します。
    * [Strapi の公式ガイド](https://strapi.io/blog/how-to-implement-github-social-login-in-next-js-with-strapi) の "Setting Up Strapi Github Auth Provider" の内容を参照してください。
    * 管理画面にログインし、`Settings` -> `Users & Permissions plugin` -> `Providers` -> `github` の内容を設定します。
2. ログインするユーザーに Strapi からデータを取得する権限を付与します。
    1. 管理画面にログインし、`Settings` -> `Users & Permissions plugin` -> `Roles` -> `Authenticated` を開きます。
    2. `Permissions` -> `Problem` を開き、以下にチェックを入れます
        * [x] find
        * [x] findOne

### 3. フロントエンドの起動
```bash
pnpm run dev
```

## Firebaseエミュレータの設定方法

### Firebaseへのログイン
1. Dockerを使って、以下のコマンドでFirebaseにログインします。
    - コマンド: `firebase login --no-localhost`
    - 注意: すでにFirebaseプロジェクトを作成しており、ログインするアカウントには権限が必要です。

    - エラー時のレポートについて（お好みで）
    Firebase optionally collects CLI and Emulator Suite usage and error reporting information to help improve our products. Data is collected in accordance with Google's privacy policy (https://policies.google.com/privacy) and is not used to identify you.
    ? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? (y/n)

    To sign in to the Firebase CLI:

    1. Take note of your session ID:
        - session ID が表示される

    2. Visit the URL below on any device and follow the instructions to get your code:
        - URL が表示されるので、クリックする
        - 1の session ID と同じかどうか確認し、authorization code をコピーする

    3. Paste or enter the authorization code below once you have it:
        - コピーした authorization code を貼り付けてEnterを押す
    ? Enter authorization code:

2. 以下の手順でアクセストークンを取得し、ターミナルに貼り付けます。
    - コマンド: `docker compose run --rm firebase firebase login --no-localhost`

### Firebaseの初期設定
1. 以下のコマンドを実行してFirebaseを初期設定します。
    - コマンド: `docker compose run --rm firebase firebase init emulators`

    - エミュレータは 'bin' フォルダにインストールされます。

### エミュレータの起動
1. 上記の「Firebaseの初期設定」が完了していること

2. コンテナ起動
    - コマンド: `docker compose up`
    - 起動後、ブラウザで `localhost:4000` にアクセスすると、Firebaseエミュレータの画面が表示されます。

### エミュレーターの起動に失敗する場合
1. ログアウト
    - コマンド: `docker compose run --rm firebase firebase logout`

2. 再ログイン
    - コマンド: `docker compose run --rm firebase firebase login --no-localhost`

   1. 表示されたURLへアクセス
   2. step1,2 と進み、表示されたトークンをコンソールに貼り付け

3. 再度dockerコンテナを立ち上げ
    - コマンド: `docker compose up -d`


## Strapi の起動方法
### 0. 前提条件
* Docker
  * Windows 環境の場合はいくつか注意点があるので、[Windows 環境の注意点](#windows-環境の注意点) を参照してください。
* ストレージ: 約 5GB
* メモリ: 約 4GB

### 1. 環境変数の設定
* `.env.sample` を `.env` に変更してください。

### 2. Docker コンテナの作成・起動
* Docker Compose で、Strapi やそれに必要なアプリ (MySQL など) を起動します。
  ```bash
  docker compose up strapi
  ```
  バックグラウンドで起動したい場合は、オプション -d を付けます
  ```bash
  docker compose up strapi -d
  ```
* 上記を実行すると、Strapi が実行されます。
* ストレージを約 5GB 消費します。
* メモリが約 4GB 必要です。
* [http://localhost:1337/admin](http://localhost:1337/admin) から管理画面にアクセスできます。
  * Strapi の起動には時間がかかります。バックグラウンドで動作している場合にログを確認するには以下を実行します。
    ```bash
    docker compose logs strapi
    ```

### 3. Docker の停止
* 以下を実行すると、Docker の全体が停止します。
  ```bash
  docker compose down
  ```

### トラブルシューティング
#### Windows 環境の注意点
* Docker Desktop バックエンドを WSL にすることをお勧めします。
  * Settings -> General -> Use the WSL 2 based engine
    * WSL 上の Linux で、Windows の Docker を操作可能
  * Settings -> Resources -> Network -> Enable host networking
    * Docker container で `localhost` としてホストしているアプリに、Windows からアクセスする際に必要
* WSL の Docker (docker-desktop) が時々故障 (消滅) することがあります。
  * この場合、Docker Desktop の再インストールが必要
* Windows 環境で `docker compose build` や `docker compose up --build` を実行 (特に、再ビルド時) すると、以下のようなエラーが発生することがあります。
  ```
  ERROR [strapi internal] load build context
  failed to solve: archive/tar: unknown file mode ?rwxr-xr-x
  ```
  * Docker Desktop で WSL integration を有効にし、WSL 上の Linux 上から Windows の Docker を操作することで回避
  * WSL から Windows の Docker Desktop を操作するには、以下の要件が必要
    * WSL に docker-desktop 以外のディストリビューションがインストールされていること
    * Docker Desktop の WSL integration が有効になっていること
      * Settings -> Resources -> WSL integration -> Enable integration with ...

#### Docker のキャッシュクリア
* 何か不具合が発生した場合や、ファイルの変更を確実に反映させたい場合には、以下を実行するとキャッシュを無効化して再ビルドできます。
  ```bash
  docker compose down
  docker image prune -a
  docker compose build strapi --no-cache
  docker compose up strapi
  ```
