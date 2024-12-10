# Alpha DOJO v2


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
