# 🤖 タミヤ クローラーロボット プログラミング＆コントローラー

micro:bit V2 を使ってタミヤのクローラーロボットを WebUSB 経由で操作できる **Scratch 3.0 カスタム拡張機能** および **WebコントローラーUI** です。

本物の Scratch (TurboWarp / Xcratch) 画面からブロックでプログラミングしてロボットを動かすことも、ブラウザ上のコントローラーから直接ラジコン操作することも可能です。

---

## 🚀 すぐに使う（Webアプリ）

* **🧩 Scratchでプログラミングする（TurboWarp）**  
  [👉 Scratchエディタを開く](https://turbowarp.org/editor?extension=https://Aikame-Game.github.io/tamiya-robot-extension/tamiya_robot_extension.js)  
  ※URLを開くだけで「タミヤロボット」専用拡張ブロックが自動で読み込まれます。

* **🎮 コントローラーで手動操作する**  
  [👉 Webコントローラーを開く](https://Aikame-Game.github.io/tamiya-robot-extension/)

---

## ✨ 主な機能

### 1. Scratch 3.0 拡張機能 (`tamiya_robot_extension.js`)
* **コマンド送信**: 前進（ギア1/2）、バック（ギア1/2）、左右旋回、停止、クラクション
* **イベント検知（ハットブロック）**: ロボット側の「壁接近（`WALL`）」「転倒（`FLIP`）」警報信号をリアルタイム受信してプログラムを割り込み発火

### 2. Webコントローラー (`index.html`)
* **2段階矢印ボタン**: ワンタップで1速（標準）/ 2速（高速）を直感的に切り替え
* **安全停止機能**: 「STOP」ボタンや別ボタンタップで安全に動作切替
* **警報ポップアップ表示**: ロボットの壁接近や転倒通知を画面上に視覚的アラート表示
* **Scratch連携ボタン**: ワンタップでScratchエディタへジャンプ

---

## 🔧 動作環境・要件

### 動作対応ブラウザ
* **Google Chrome**（推奨）
* **Microsoft Edge**
* **Opera**  
※ **Safari** および **Firefox** は Web Serial API 非対応のため動作しません。

### 必要なハードウェア
1. **パソコン / Chromebook**（USBポート搭載、またはOTG対応Android）
2. **micro:bit V2** × 2台（送信機用・ロボット受信用）
3. **USB ケーブル**
4. **タミヤ クローラーロボット**（受信用 micro:bit とモータードライバー等を搭載）

---

## 📡 通信プロトコル仕様

WebUSB (115200 bps) で送信機 micro:bit へ送信される文字列コマンド一覧：

| コマンド | 動作 |
| :---: | :--- |
| `F` | 前進（ギア1 / 標準速度） |
| `F2` | 前進（ギア2 / 高速） |
| `B` | バック（ギア1 / 標準速度） |
| `B2` | バック（ギア2 / 高速） |
| `L` | 左旋回 |
| `R` | 右旋回 |
| `S` | 停止 |
| `H` | クラクション |
| `WALL` | （受信）壁接近アラート |
| `FLIP` | （受信）転倒アラート |

---

## 🛠️ 開発者向け情報

### 拡張機能スクリプト直リンク
```text
[https://Aikame-Game.github.io/tamiya-robot-extension/tamiya_robot_extension.js](https://Aikame-Game.github.io/tamiya-robot-extension/tamiya_robot_extension.js)
