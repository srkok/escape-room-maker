やったこと：

- 多肢選択肢クイズ脱出室開発空間の完成.(UI に変更の余地あり)
- playground の拡張.

やること：

- 迷路脱出室開発空間の製作.
  - 動作指定用ブロックビルディング環境の考察.
  - パーツメーカー <- どうする?
  - 参考になりそうな拡張
    - <https://github.com/extraymond/aframe-mouse-dragndrop>
    - <https://github.com/jesstelford/aframe-click-drag-component>
      - [用例](https://jesstelford.github.io/aframe-click-drag-component/)

やるかもしれないこと：

- 設定メニュー表示時に,バックアップの呼び出し.
  - 何もないところをクリックしたときに, 前作ったのがそのままなのは別にいいと思う.
  - 既に編集したやつをクリックしたときに, 全然関係ないのが表示されるのは少し面倒だと思う.
  - popup の registerComponent にて, クリック後, registry に既に name があれば, そこからバックアップを各種 Picker などに呼び出したのち, Modal を表示させる.
