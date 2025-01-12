やったこと：

- 多肢選択肢クイズ脱出室開発空間の完成.(UI に変更の余地あり)
- playground の拡張.
- drag_and_drop の実装.
- mazeER の drag & drop レイアウト実装.
- mazeER の大きさ拡張ボタンの実装.

やること：

- 迷路脱出室開発空間の製作.
  - 動作指定用ブロックビルディング環境の製作.
    - 挙動がおかしい. 要修正.
    - octahedron を動かしたとき、actionTarget menu が消失するようにしたい.
    - initVisibility は動かなくてもいいかな.
    - 入力後、矢印オブジェクトが発生するようにする?(future)
  - 作業状態の save.
    - object/textblock 配置時に、saveRegistry が動くようにする.
  - 作業状態の load.
    - registry に従って object なり設定項目なりも湧くようにする.
- 迷路脱出室 playground の製作.

やるかもしれないこと：

- 設定メニュー表示時に,バックアップの呼び出し.
  - 何もないところをクリックしたときに, 前作ったのがそのままなのは別にいいと思う.
  - 既に編集したやつをクリックしたときに, 全然関係ないのが表示されるのは少し面倒だと思う.
  - popup の registerComponent にて, クリック後, registry に既に name があれば, そこからバックアップを各種 Picker などに呼び出したのち, Modal を表示させる.

やらないこと：

- パーツメーカー
