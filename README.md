やったこと：

- 多肢選択肢クイズ脱出室開発空間の完成.(UI に変更の余地あり)
- playground の拡張.
- drag_and_drop の実装(砂場レベル).
- mazeER の drag & drop レイアウト実装.
- mazeER の大きさ拡張ボタンの実装.
- 作業状態の save.
  - object/textblock 配置時に, saveRegistry が動くようにした.
  - object/textblock を除いたとき, saveRegistry での delete が動くようにした.
  - object/textblock を除いたとき, menu が消えるようにした.
  - object 配置時に, 既に menu 上に textblock があれば saveRegistry が動くようにした.
- 動作指定用ブロックビルディング環境の製作.
- 迷路脱出室開発空間の製作.
  - init による object/textblock の repop.
  - 作業状態の load.
    - registry に従って object なり設定項目なりも湧くようにする.
    - registry を読んで initMazeMaker 動かすだけなので, すぐ終わりそう.
- 多肢選択肢クイズ開発空間の改良.
  - 矢印の color を, outerColorPicker に依存させた.
- 迷路脱出室 playground の製作.
  - grid, wall を, 動的に配置できた.

やること：

- 迷路脱出室 playground の製作.
  - object の配置, 機能の有効化

やるかもしれないこと：

- 設定メニュー表示時に,バックアップの呼び出し.
  - 何もないところをクリックしたときに, 前作ったのがそのままなのは別にいいと思う.
  - 既に編集したやつをクリックしたときに, 全然関係ないのが表示されるのは少し面倒だと思う.
  - popup の registerComponent にて, クリック後, registry に既に name があれば, そこからバックアップを各種 Picker などに呼び出したのち, Modal を表示させる.

やらないこと：

- パーツメーカー
- 迷路脱出室開発空間の製作.
  - 動作指定用ブロックビルディング環境の製作.
    - 入力後、矢印オブジェクトが発生するようにする?(future)
