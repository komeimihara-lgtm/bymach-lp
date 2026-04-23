# BYMACH PRO スワイプ型LP

孔明さん、お疲れ様です。LPの実装完了しました。

---

## ファイル構成

```
bymach-lp/
├── index.html          メインLP
├── style.css           スタイル
├── script.js           Swiper動作
├── thanks.html         デモ予約完了ページ
├── vercel.json         Vercel設定
└── images/             画像14枚
    ├── sl01-hook.png
    ├── sl02-problem.png
    ├── sl03-menu5.png
    ├── sl04-datsumo.png
    ├── sl05-facial.png
    ├── sl06-bust.png
    ├── sl07-mechanism.png
    ├── sl08-patent.png
    ├── sl09-madeinjapan.png
    ├── sl10-performance.png
    ├── sl11-voices.png
    ├── sl12-support.png
    ├── sl13-offer.png
    └── sl14-cta.png
```

---

## 機能

- **縦スワイプUI**: Swiper.jsで滑らかな縦スクロール
- **フェードインアニメーション**: 各スライドが下からふわっと表示
- **固定CTAバー(下部)**: 無料デモ予約 / LINE相談 / 資料請求
- **ページネーション(右側ドット)**: 現在位置を表示
- **SL14(Final CTA)のクリックエリア**: 画像内の3ボタンがタップ可能
- **デモ予約モーダル**: フォーム送信で info@lenard.jp に通知
- **スマホ最適化**: viewport設定・セーフエリア対応

---

## デモ予約フォームについて

FormSubmit というサービスを使用しています(無料・登録不要)。

### 初回のみ必要な設定

1. LPを一度Vercelにデプロイ
2. テスト送信を1回行う
3. info@lenard.jp に確認メールが届く
4. メール内のリンクをクリックして承認
5. 以降、フォーム送信が info@lenard.jp に届くようになる

### 将来、別のフォームサービスに切り替える場合

`index.html` の以下の部分を変更:

```html
<form class="demo-form" id="demoForm"
      action="https://formsubmit.co/info@lenard.jp"
      method="POST">
```

---

## Vercelデプロイ手順

### 方法1: GitHub経由(推奨)

1. このフォルダをGitHubリポジトリにpush
2. Vercelで「New Project」
3. リポジトリを選択して「Deploy」
4. 自動でデプロイされる

### 方法2: Vercel CLIで直接デプロイ

```bash
# Vercel CLIインストール(初回のみ)
npm install -g vercel

# bymach-lpフォルダ内で
cd bymach-lp
vercel

# 本番デプロイ
vercel --prod
```

### 方法3: ドラッグ&ドロップ(最も簡単)

1. Vercelダッシュボード → 「New Project」
2. ZIPにしたbymach-lpフォルダをドラッグ&ドロップ
3. Deploy

---

## カスタムドメイン設定(lp.bymach-pro.site)

1. Vercelプロジェクト → 「Settings」 → 「Domains」
2. `lp.bymach-pro.site` を追加
3. DNSレコードを設定(bymach-pro.siteのDNS管理画面で):
   - タイプ: CNAME
   - ホスト名: lp
   - 値: cname.vercel-dns.com
4. 数分〜数時間で反映

---

## 将来の拡張ポイント

### Meta Pixel / GA4 追加方法

`index.html` の `</head>` 直前に以下を追加:

```html
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s){...}
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>

<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');
</script>
```

CTA クリック時のイベント送信は `script.js` に追加。

### フェーズ2: 要素アニメーション

現状はスライド全体がフェードインする仕様(案B)。
将来、要素単位のアニメ(機器だけ浮遊など)に変える場合は:
- 各スライドの画像焼き込みをやめる
- 背景・機器・テキストを分離
- CSSアニメーションで個別制御

---

## SL14(Final CTA)のクリックエリアについて

画像内の3つのボタンに対して、透明なリンクエリアを重ねています。
もしクリック位置がずれていたら、`style.css` の以下の値を調整してください:

```css
.cta-area-demo { top: 23%; height: 9%; }
.cta-area-line { top: 34%; height: 9%; }
.cta-area-doc  { top: 45%; height: 9%; }
```

---

## 動作確認チェックリスト

- [ ] スマホで縦スワイプできる
- [ ] 各スライドが下からふわっと表示される
- [ ] 下部CTAバーが常に表示される(SL14以外)
- [ ] SL14では下部CTAバーが自動で隠れる
- [ ] 「無料デモ予約」をタップするとモーダルが開く
- [ ] フォームを送信すると thanks.html に遷移する
- [ ] 「LINEで相談」で正しいLINEが開く
- [ ] 「資料請求」で既存の予約ページが開く
- [ ] SL14画像内のボタンがタップできる

---

何か調整が必要な箇所があれば教えてください。
