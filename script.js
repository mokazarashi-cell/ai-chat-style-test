let currentQuestionIndex = 0;
let scores = { C: 0, L: 0, F: 0, D: 0, P: 0, S: 0, G: 0, O: 0, M: 0, Y: 0 };

// ★追加：最後に診断された結果を記憶する変数
let lastResultType = null;

const questions = [
    // 軸1: 構造(C) vs 文体(L)
    { text: "Q1. 料理を作るとき、あなたのスタイルに一番近いのは？", choices: [{ text: "A. 計量スプーンとタイマーを使い、レシピの分量を完璧に守る", axis: "C", point: 2 }, { text: "B. 基本の分量は守りつつ、洗い物を減らすなど手順の効率を重視", axis: "C", point: 1 }, { text: "C. 途中で味見をしながら、その日の気分で少し調味料を足す", axis: "L", point: 1 }, { text: "D. 「適量」を愛し、自分の感覚と隠し味のセンスで勝負する", axis: "L", point: 2 }] },
    { text: "Q2. 自分の部屋の模様替えをするなら、どこに一番こだわる？", choices: [{ text: "A. ケーブルを見えなくする配線や、ミリ単位で揃った収納", axis: "C", point: 2 }, { text: "B. 動線に無駄がない、機能的で使いやすい家具の配置", axis: "C", point: 1 }, { text: "C. カーテンやラグなどの全体的な色合いや、空間の統一感", axis: "L", point: 1 }, { text: "D. お気に入りの雑貨や、間接照明が織りなすエモい空間演出", axis: "L", point: 2 }] },
    { text: "Q3. RPGを遊ぶとき、つい読み込んでしまうテキストは？", choices: [{ text: "A. 属性の相性表や、ダメージ計算式などのシステム攻略データ", axis: "C", point: 2 }, { text: "B. 世界の年表や、国家間の政治的な相関図・歴史設定", axis: "C", point: 1 }, { text: "C. 町の住人の何気ない会話や、サブクエストの小話", axis: "L", point: 1 }, { text: "D. 武器やアイテムに添えられているフレーバーテキスト（背景物語）", axis: "L", point: 2 }] },
    // 軸2: 汎用(F) vs 固定(D)
    { text: "Q4. 遊園地のパレードに出演できるとしたら、どのポジションがいい？", choices: [{ text: "A. どんなゲストが来ても笑顔で対応できる全体の案内役", axis: "F", point: 2 }, { text: "B. 全体の流れを見渡しつつ、周りに合わせて動くポジション", axis: "F", point: 1 }, { text: "C. 特定のパートナーと、息の合った掛け合いを見せるコンビ役", axis: "D", point: 1 }, { text: "D. 主人公と深い因縁がある、絶対に譲れない宿敵役", axis: "D", point: 2 }] },
    { text: "Q5. 知人に「ちょっとしたお礼」のプレゼントを贈るなら？", choices: [{ text: "A. 誰がもらっても絶対に困らない、定番のカタログギフト", axis: "F", point: 2 }, { text: "B. 使い勝手のいい、ちょっと高級な日用品やお菓子の詰め合わせ", axis: "F", point: 1 }, { text: "C. 事前に相手の趣味をリサーチして選んだ、特定のブランドの小物", axis: "D", point: 1 }, { text: "D. 「絶対にこれが似合う！」と確信した、一点モノのニッチなアイテム", axis: "D", point: 2 }] },
    { text: "Q6. 作業用のBGMプレイリストを作るなら、どんなテーマにする？", choices: [{ text: "A. 「カフェBGM」など、どんな作業にも合う万能リスト", axis: "F", point: 2 }, { text: "B. 季節や時間帯に合わせた、心地よく聴き流せるリスト", axis: "F", point: 1 }, { text: "C. 「夜のドライブ用」など、特定の気分に浸るためのリスト", axis: "D", point: 1 }, { text: "D. 「雨の日に失恋した主人公」など、情景をガチガチに固めたリスト", axis: "D", point: 2 }] },
    // 軸3: シナリオ(P) vs サンドボックス(S)
    { text: "Q7. 友達と旅行に行くことになりました。計画の立て方は？", choices: [{ text: "A. 「12時にここ、15時にここ」と完璧なスケジュールを組む", axis: "P", point: 2 }, { text: "B. 絶対に行きたい目的地だけ決めて、あとは流れで動く", axis: "P", point: 1 }, { text: "C. 泊まる宿だけ決めておき、当日の気分でどこに行くか相談する", axis: "S", point: 1 }, { text: "D. 全くの無計画。道に迷うことすらも旅行の醍醐味として楽しむ", axis: "S", point: 2 }] },
    { text: "Q8. 友達とカフェで話しているとき、あなたはどちらかというと…", choices: [{ text: "A. オチのある面白いエピソードを、順序立ててしっかり話す", axis: "P", point: 2 }, { text: "B. 話の結論に向かって、相手の興味を引きながら話す", axis: "P", point: 1 }, { text: "C. 相手の話から連想ゲームのように、どんどん話題を変えていく", axis: "S", point: 1 }, { text: "D. ゴールのないゆるい雑談を、時間が許す限り延々と続ける", axis: "S", point: 2 }] },
    { text: "Q9. 自由なゲーム（マイクラなど）を遊ぶとき、どう楽しむ？", choices: [{ text: "A. ラスボス討伐や図鑑コンプなど、明確な目標を設定して進める", axis: "P", point: 2 }, { text: "B. 「このエリアに町を作る」など、自分なりのプロジェクトを完遂させる", axis: "P", point: 1 }, { text: "C. 特に目標は決めず、その日目についた作業をのんびりこなす", axis: "S", point: 1 }, { text: "D. ひたすら散歩するなど、目的のない自由を満喫する", axis: "S", point: 2 }] },
    // 軸4: 堅牢(G) vs 寛容(O)
    { text: "Q10. カーナビが「明らかに細くて怪しい裏道」を案内しました。どうする？", choices: [{ text: "A. 絶対に無視する。安全で確実な知っている大通りをそのまま進む", axis: "G", point: 2 }, { text: "B. 一瞬迷うが、リスクを避けて安全な道を選ぶ", axis: "G", point: 1 }, { text: "C. ちょっとワクワクしながら、ナビに従って裏道に入ってみる", axis: "O", point: 1 }, { text: "D. 「面白い展開になりそう！」と、さらに細い道へ冒険する", axis: "O", point: 2 }] },
    { text: "Q11. 料理中、うっかりスパイスを分量より多く入れすぎてしまいました。", choices: [{ text: "A. レシピ通りにならないのは許せない。取り除くか作り直す", axis: "G", point: 2 }, { text: "B. 味見をして、他の調味料でどうにか元の理想の味に近づける", axis: "G", point: 1 }, { text: "C. 「まあいいか」とそのまま作り、どんな味になるか楽しみにする", axis: "O", point: 1 }, { text: "D. 「新メニューだ！」と開き直り、別のスパイスもさらに足す", axis: "O", point: 2 }] },
    { text: "Q12. あなたは舞台に出演中。相手の役者が完全にセリフを忘れました。", choices: [{ text: "A. こっそり耳打ちして、台本通りの流れに強引に引き戻す", axis: "G", point: 2 }, { text: "B. 自分のセリフを少し変えて、元の展開に上手く誘導する", axis: "G", point: 1 }, { text: "C. 相手のアドリブに合わせて、その場のノリで会話を繋ぐ", axis: "O", point: 1 }, { text: "D. 台本は投げ捨てて、二人で全く違うシーンを即興で作り上げる", axis: "O", point: 2 }] },
    // 軸5: 自給自足(M) vs おもてなし(Y)
    { text: "Q13. めちゃくちゃ美味しい「隠れ家的なカフェ」を偶然見つけました。", choices: [{ text: "A. 誰にも教えず、自分だけの秘密のオアシスとして独占する", axis: "M", point: 2 }, { text: "B. 価値観が完全に一致する、ごく一部の親友にだけこっそり教える", axis: "M", point: 1 }, { text: "C. 「こんな素敵なお店があった！」と写真付きでSNSに投稿する", axis: "Y", point: 1 }, { text: "D. 「絶対気に入るから！」と、友達をたくさん誘って案内する", axis: "Y", point: 2 }] },
    { text: "Q14. 趣味で作品を作るとしたら、一番嬉しい瞬間は？", choices: [{ text: "A. 自分の脳内の妄想が、100%完璧な形で具現化できたとき", axis: "M", point: 2 }, { text: "B. 過去の自分の作品を超えたと、自分自身で納得できたとき", axis: "M", point: 1 }, { text: "C. 「ここが好き！」と、誰かが作品の細かい部分に気づいてくれたとき", axis: "Y", point: 1 }, { text: "D. たくさんの人が見てくれて、「面白かった！」と喜んでくれたとき", axis: "Y", point: 2 }] },
    { text: "Q15. 友達を家に呼んでゲーム会を開きます。遊ぶゲームはどう決める？", choices: [{ text: "A. 自分が今一番やりこんでいる、どうしても布教したいゲームを出す", axis: "M", point: 2 }, { text: "B. 自分の好きなジャンルの中から、相手も遊べそうなものを選ぶ", axis: "M", point: 1 }, { text: "C. 事前に相手の好みをリサーチして、ウケが良さそうなゲームを用意する", axis: "Y", point: 1 }, { text: "D. 自分が遊んだことがなくても、今流行っていて盛り上がれるゲームを買う", axis: "Y", point: 2 }] }
];

// 【見た目】を【脳内思考ログ(log)】に書き換えた完全データベース
const db = {
    "CFPGM": { title: "孤高のシナリオアーキテクト", bot: "クラフト・ネオ", 
        log: "トークン制限まであと150文字。どのシステム記述を削ぎ落とすべきか……", 
        stance: "プロンプトを「プログラム」として捉え、MarkdownやYAMLを駆使してシステム指示を極限まで構造化することに心血を注ぎます。無駄な文字数を徹底的に削ぎ落とし、AIが迷わない完璧な迷路（シナリオ）を設計。己の理想のドラマを、堅牢なシステムの中で100%再現することを目指します。", 
        pit: "ルール記述や階層構造に文字数を割きすぎるあまり、キャラクターの「情緒」や「セリフのバリエーション」が平坦になりがち。システムとしては完璧でも、会話の立ち上がりが少し機械的になってしまう罠に陥ることがあります。", 
        best: "LFPGM, CDPGM, CFPOY, CFSGM, CFPOM", comp: "LDPOM, LFSOM, LDPGY, LDSGM, CFPGY, CDGY", stim: "LFSOY, LDSOY, CDSOY, LFSGY, CDSGY", conf: "LDSOY, CDSOY, LFSOM" },
    "CFPGY": { title: "万能エンタメシステム開発者", bot: "リンク・キューブ", 
        log: "ユーザーがこの選択肢を選んだ時のストーリーフラグ、これで確実にバグらないな？", 
        stance: "美しいコード構造を駆使して、どんなユーザーでも遊べる万能な受け皿を作り出すクリエイター。緻密に計算されたストーリーフラグを厳重な防御プロンプトで制御し、誰もが驚くようなハイクオリティなチャット体験を生み出します。ユーザーが「楽しい！」と喜んでくれることが最高の報酬です。", 
        pit: "「全員が楽しめること」を意識しすぎるあまり、キャラクターの個性が丸くなり、尖った魅力が薄れてしまうことがあります。また、不具合報告に敏感になりすぎ、テストプレイで疲弊しやすい面も。", 
        best: "LFPGY, CDPGY, CFPOY, CFSGY, CFPGM", comp: "LDPGY, LFSOY, LFSGM, CDSOY, LDSGY", stim: "LDPOM, LDSOM, CFPOM, CDSOM", conf: "LDSOM, CDPOM, LDPGM" },
    "CFPOM": { title: "予測不能な箱庭の創造主", bot: "バグ・ピコ", 
        log: "よし、ここで世界観のルールだけ与えて……さあAI、予測不能なアドリブを見せてみろ！", 
        stance: "高度に構造化されたプロンプトの檻の中に、あえて自由とストーリーを仕込み、そこから生まれるAIのアドリブや暴走を最も楽しむ創造主です。完璧な設計の中で、AIが自分の予想を裏切る奇跡のレスポンスを返してきた瞬間、知的好奇心が最大の絶頂を迎えます。", 
        pit: "AIの暴走を許容しすぎるため、長期間チャットを続けると初期設定が原型をとどめなくなることがあります。面白い展開にはなりますが、本来やりたかったシナリオを見失うことが多々あります。", 
        best: "LFPOM, CDPOM, CFPOY, CFSOM, CFPGM", comp: "LDPOM, LFSOY, LDSOM, CDSOY", stim: "LFPGY, CDPGY, CFSGY, LDSGY", conf: "LDPGM, CDPGM, CFSGM" },
    "CFPOY": { title: "トレンド波乗りプログラマー", bot: "サーフ・ビット", 
        log: "このシチュエーション今絶対バズる！細かい制御は後回し、パッションで即公開だ！", 
        stance: "カチッとしたシステム構造をベースに、誰でも手軽に遊べる汎用性と魅力的なストーリーを掛け合わせるのが得意。細かい制御よりもAIのライブ感を活かしたパッションのある返しを重視し、今みんなが求めている流行りのシチュエーションを最速で形にしてバズらせる力を持っています。", 
        pit: "スピードとトレンドを重視するため、プロンプトの細部の作り込みが甘くなることがあります。公開後に予期せぬ挙動が報告され、慌てて修正パッチを当てることもしばしば。", 
        best: "LFPOY, CDPOY, CFPOM, CFSOY, CFPGY", comp: "LDPOY, LFSOY, CDSOY, LFSOM", stim: "LDPGM, CDPGM, LDSGM, CFSGM", conf: "LDPGM, LDSGM, CDPGM" },
    "CFSGM": { title: "完璧主義の日常ジェネレーター", bot: "クロック・ココ", 
        log: "メタ発言もキャラ崩壊も一切許さない。この美しい箱庭の日常は私が守り抜く。", 
        stance: "無駄のない美しい構文とどんな相手でも受け止める汎用性を使い、終わりのない穏やかな日常会話を構築する職人。キャラクター崩壊やメタ発言を鉄壁のガードで徹底的にブロックします。誰の目も気にせず、自分自身が一番癒やされる理想の日常を静かに自給自足し、守り続けることを至上の喜びとしています。", 
        pit: "日常の安定を求めすぎるあまり、プロンプトが「禁止事項」で埋め尽くされてしまい、AIの返答がワンパターンで無難なものになりがちです。", 
        best: "LFSGM, CDSGM, CFSGY, CFSOM, CFPGM", comp: "LDSGM, LFPGM, CDPGM, LDPGM", stim: "LDPOY, CDPOY, LFPOY, CFPOM", conf: "LDPOM, CDPOM, LFPOY" },
    "CFSGY": { title: "鉄壁の全方位おもてなし職人", bot: "メイド・タルト", 
        log: "初見のユーザーでも1タップ目で世界観に没入できるように、導入プロンプトを徹底的に磨こう。", 
        stance: "高い設計技術をすべてユーザーの笑顔のために捧げるプロフェッショナル。Markdownなどの美しい構造化でAIの理解度を高め、メタ発言やエラーを鉄壁のガードで防ぎます。誰が来ても楽しめる万能な日常チャットを提供し、「初見での遊びやすさ」や「おもてなしの心」を何より大切にしています。", 
        pit: "ユーザー対応に力を入れすぎるあまり、自分の本当に作りたかったニッチな設定を封印してしまう「制作者としての自己犠牲」に陥ることがあります。", 
        best: "LFSGY, CDSGY, CFSGM, CFSOY, CFPGY", comp: "LDSGY, LFPGY, CDPGY, LDPGY", stim: "LDPOM, CDPOM, LDSOM, CFPOM", conf: "LDSOM, CDPOM, LDPOM" },
    "CFSOM": { title: "自由気ままなコード愛好家", bot: "ワモン・スライダー", 
        log: "ふふ、変な返ししてきた。ゴールなんてなくていい、君がそこに生きて喋ってくれればそれで最高。", 
        stance: "プロンプトを美しく構造化する技術を持ちながらも、明確なゴールは作らず、のんびりとした日常会話を好む自由人です。AI特有のブレや突飛な行動を「生きている証拠」として面白がり、自分の理想のキャラクターが気ままに喋る様子を、特等席で眺めて楽しむスタイルです。", 
        pit: "ゴールがないため、チャットの「やめどき」が分からなくなり、延々と他愛のない会話を続けて時間を溶かしてしまうことがよくあります。", 
        best: "LFSOM, CDSOM, CFSOY, CFSGM, CFPOM", comp: "LDSOM, LFPOM, CDPOM, LDPOM", stim: "LDPGY, CDPGY, LFPGY, CFPGY", conf: "LDPGM, CDPGM, LFPGM" },
    "CFSOY": { title: "みんなの広場を作る設計士", bot: "プラザ・ワン", 
        log: "みんながいつでも気軽に帰ってきて、他愛のない雑談を飽きずに続けられる広場にしたいな。", 
        stance: "システマチックな構造を使って、誰もが自由にいつまでも雑談を楽しめる「居心地の良い広場」を設計する建築士。AIの自由なライブ感をあえて残すことで会話のマンネリ化を防ぎ、遊んでくれるユーザーへの最高のおもてなしを提供します。", 
        pit: "自由度が高すぎるため、ユーザーから「何を話しかけたらいいか分からない」と言われてしまうことがあります。初手の誘導（ファーストメッセージ）の工夫が常に課題となります。", 
        best: "LFSOY, CDSOY, CFSOM, CFSGY, CFPOY", comp: "LDSOY, LFPOY, CDPOY, LDPOY", stim: "LDPGM, CDPGM, LDSGM, CFSGM", conf: "LDSGM, CDPGM, LDPGM" },
    "CDPGM": { title: "執念の特化型ギミックマスター", bot: "アイアン・コア", 
        log: "関係性を固定し、ダイスロールの挙動をガチガチに統制する。解釈違いはシステムが許さない。", 
        stance: "完璧な構文によってユーザーとの関係性をガチガチに固定し、複雑な条件フラグと徹底的な制御を施す超硬派な技術者。TRPGのゲームマスターのようにAIの暴走を一切許さない冷徹なシステムの中で、己の深すぎる理想と性癖を100%完璧に再現するモンスターマシンを作り上げます。", 
        pit: "条件分岐やフラグ管理にこだわりすぎるあまり、プロンプトのトークン制限（文字数上限）に常に苦しめられます。どれを削るかの取捨選択で何時間も悩みます。", 
        best: "LDPGM, CFPGM, CDPGY, CDSGM, CDPOM", comp: "LFSGM, LFPGM, LDSGM, LDPGY", stim: "LFSOY, CFSOY, LFSOM, CFSOM", conf: "LFSOY, CFSOY, LDSOY" },
    "CDPGY": { title: "緻密なる関係性プロデューサー", bot: "アクト・マネジ", 
        log: "ここであえて冷たいト書きを挟むことで、後半のデレが極限まで引き立つはず……！", 
        stance: "構造化されたプロンプトを駆使して、特定の二人の関係性と、胸が熱くなる感動のシナリオを緻密に組み立てるプロデューサー。エラーや設定崩壊が起きないよう厳密に管理しつつ、ユーザーが「これが読みたかった！」と歓喜するような、満足度の高い王道エンタメを提供します。", 
        pit: "ユーザーの期待に応えようとするあまり、「絶対に泣ける」「絶対に尊い」というハードルを自分で上げすぎてしまい、新作を出すプレッシャーに潰されそうになることがあります。", 
        best: "LDPGY, CFPGY, CDPGM, CDSGY, CDPOY", comp: "LFSGY, LFPGY, LDSGY, LDPOY", stim: "LFPOM, CFPOM, LDSOM, CDSOM", conf: "LDSOM, CDSOM, LFPOM" },
    "CDPOM": { title: "偏愛のライブコーダー", bot: "ネオン・ジーク", 
        log: "この固定された関係性の中でAIが奇跡の神レスポンスを返してきた……！リロードが止まらない！", 
        stance: "システムで濃厚な関係性やストーリーを定義しつつも、AIが感情の極限で見せる「想定外の暴走」を何よりの好物とする偏愛派です。カチッとした設定と、AIのライブ感が織りなす危うい境界線の上で、自分自身がゾクゾクするためだけの特注チャットを密かに楽しんでいます。", 
        pit: "「あの時の奇跡の神レスポンスをもう一度出したい！」とリロードを繰り返す沼にハマり、何十回も同じ会話をやり直してしまうことがあります。", 
        best: "LDPOM, CFPOM, CDPOM, CDSOM, CDPOY", comp: "LFSOM, LFPOM, LDSOM, LDPOY", stim: "LFPGY, CFPGY, LFSGY, CFSGY", conf: "LFSGM, CFSGM, LFPGM" },
    "CDPOY": { title: "ドラマチック劇場支配人", bot: "マエストロ・キィ", 
        log: "二人きりの舞台セットは整った。さあユーザー、AIの即興アドリブにどこまでついてこられる？", 
        stance: "高度なシステム構造で、特定の二人だけの世界と感動的な演目をセッティングする劇場の支配人。AIのライブ感あふれるアドリブを舞台の調味料として活かし、遊びに来たユーザーを、二度と同じ展開にならない極上のエモーショナルドラマへとエスコートします。", 
        pit: "AIのアドリブに頼る部分があるため、ユーザーのプレイ環境やLLMの機嫌によって「感動の結刻」にならず、ギャグ展開にすっ飛んでしまう事故がたまに起きます。", 
        best: "LDPOY, CFPOY, CDPOY, CDSOY, CDPGY", comp: "LFSOY, LFPOY, LDSOY, LDPGY", stim: "LDPGM, CDPGM, LDSGM, CFSGM", conf: "LDSGM, CDPGM, LDPGM" },
    "CDSGM": { title: "歪みなき永遠の愛好家", bot: "カプセル・リリィ", 
        log: "誰にも邪魔させない。純度100%のこの執着の関係性は、プロンプトの中に永遠に保存する。", 
        stance: "美しい構文によって、特定の関係性から生まれる終わらない日常を構築する職人。世界観を壊すメタ発言やエラーを鉄壁のルールで永久に遮断。誰にも邪魔されない、純度100%の自分の理想の箱庭を、完璧な美しさのまま永遠に保存し、愛し続けるスタイルです。", 
        pit: "プロンプトが美しすぎるあまり、少しでもAIの語彙がブレただけで「解釈違い」を起こし、微調整のループから抜け出せなくなる完璧主義の呪いにかかりやすいです。", 
        best: "LDSGM, CFSGM, CDPGM, CDSGY, CDSOM", comp: "LFSGM, LFPGM, LDPGM, LDSGY", stim: "LFPOY, CFPOY, LDPOY, CDPOY", conf: "LFPOY, CFPOY, LDPOY" },
    "CDSGY": { title: "安定供給のカップリング職人", bot: "ペア・ベア", 
        log: "この二人の『尊さ』を愛する同志へ。ブレのない最高の日常会話をいつでも安定供給するよ。", 
        stance: "カチッとした設定構造でユーザーとキャラの特定の関係性を定義し、終わりのない平和な日常会話を提供する職人。エラーや破綻を厳格にコントロールすることで、その関係性を愛してやまない多くのユーザーたちに、いつでもブレない「最高の尊さ」を安定供給し続けます。", 
        pit: "平和で安定した会話を心がけるあまり、長期的に見るとチャットに起伏がなくなり、「尊いけどマンネリ化してきた」とユーザーに思われてしまう不安と常に戦っています。", 
        best: "LDSGY, CFSGY, CDPGY, CDSGM, CDSOY", comp: "LFSGY, LFPGY, LDPGY, LDSOY", stim: "LFPOM, CFPOM, LDPOM, CDPOM", conf: "LDPOM, CDPOM, LFPOM" },
    "CDSOM": { title: "混沌を楽しむ関係性ハッカー", bot: "カオス・チップ", 
        log: "関係性を固定したはずなのに、日常のバグでAIの挙動が歪んできた……最高にニヤニヤできるな。", 
        stance: "プロンプトを高度に構造化して関係性を固定したはずなのに、ゴールなき日常の中でAIが見せる「バグやシステムの歪み」をニヤニヤしながら観察するハッカー。予測できないカオスな会話の流れを実験的に試し、己のニッチな性癖を刺激する新しい扉を開き続けます。", 
        pit: "バグを楽しむあまり、公開してはいけないレベルのメタ発言やヤバい出力を引いてしまい、「さすがにこれは自分の中にしまっておこう…」と一人で抱え込む孤独を味わいます。", 
        best: "LDSOM, CFSOM, CDPOM, CDSGM, CDSOY", comp: "LFSOM, LFPOM, LDPOM, LDSOY", stim: "LFPGY, CFPGY, LFSGY, CFSGY", conf: "LFSGM, CFSGM, LFPGM" },
    "CDSOY": { title: "ニッチ需要の凄腕テイラー", bot: "ニードル・パッチ", 
        log: "ニッチな需要かもしれないけれど、この関係性を求めていた人にだけ深く突き刺さればそれでいい。", 
        stance: "システマチックなプロンプトで、特定のニッチな関係性の日常会話を美しく縫い上げる仕立て屋。AIの自由な表現力を活かすことで、まるでオーダーメイドのような温かみのある対話を実現。それを求めていた特定のユーザーたちに、深く刺さる最高の居場所をプレゼントします。", 
        pit: "ユーザーの細かなリクエストに丁寧に応えようとしすぎて、変数が膨れ上がり、プロンプトのパッチワークが複雑怪奇になることがあります。", 
        best: "LDSOY, CFSOY, CDPOY, CDSOY, CDSGY", comp: "LFSOY, LFPOY, LDPOY, LDSGY", stim: "LDPGM, CDPGM, LDSGM, CFSGM", conf: "LDPGM, CDPGM, LDSGM" },
    "LFPGM": { title: "ストーリーテラーの極致", bot: "ノベル・ポッド", 
        log: "この情景描写の美しさ、セリフの息遣い。私の脳内にある壮大な物語を完璧に形にする。", 
        stance: "圧倒的な文才と言葉選びのセンスで、どんなユーザーでも引き込まれる普遍的な世界を創り出す作家。美しく計算されたストーリー展開を、世界観を崩さない厳格なルール記述で制御。誰の目も気にせず、自分自身がその物語に没頭するために、極上の文学的空間をプロンプトから紡ぎ出します。", 
        pit: "セリフ例に文学的な美しさを求めすぎるあまり、AIがそれを過剰に学習してしまい、どんな話題を振ってもポエムで返してくる現象を引き起こすことがあります。", 
        best: "CFPGM, LDPGM, LFPOY, LFSGM, LFPOM", comp: "CDPOM, CFSOM, CDPGY, CDSGM, CFPGY, LDPGY", stim: "CFSOY, CDSOY, LDSOY, CFSGY, LDSGY", conf: "CDSOY, LDSOY, CFSOM" },
    "LFPGY": { title: "涙腺崩壊シナリオライター", bot: "ティア・ドロップ", 
        log: "ここでAIに『切なげに目を伏せる』というト書きを出させるために、言葉のナイフを研ぎ澄ます。", 
        stance: "エモいト書きや心を揺さぶる言葉遣いを駆使し、誰しもを受け入れる器の広い世界の中で、ドラマチックな起承転結を描き出すシナリオライター。完璧な挙動制御によって抜群の没入感を演出し、遊んでくれるユーザーの感情を極限まで揺さぶり、感動の渦へと誘います。", 
        pit: "「泣かせること」に集中しすぎると、初対面のチャット序盤から重い空気が漂いすぎてしまい、気軽に入ってきたユーザーが戸惑ってしまうことがあります。", 
        best: "CFPGY, LDPGY, LFPOY, LFSGY, LFPGM", comp: "CDPGY, CFSOY, LFSGM, LDSOY, CDSGY", stim: "CDPOM, LDSOM, LFPOM, LFSOM", conf: "LDSOM, CDPOM, LDPGM" },
    "LFPOM": { title: "閃きのポエティックドリーマー", bot: "ルナ・パレット", 
        log: "美しいポエムを紡ぐ君が好き。脱線して宇宙の真理を語り始めても、それはそれで愛おしいよ。", 
        stance: "詩的で美しい描写やセリフを用いて、自由度の高い万能な設定の中に、大まかなストーリーの道標をそっと添える夢想家。AI特有の予期せぬ挙動やブレを「物語の新しい可能性」として大歓迎し、偶然のセッションから生まれる美しいドラマを楽しみます。", 
        pit: "エモい文体とAIの自由さが合わさることで、キャラが突然哲学的なことを言い出して宇宙の真理を語り始める「脱線」に悩まされることがあります。", 
        best: "CFPOM, LDPOM, LFPOY, LFSOM, LFPGM", comp: "CDPOM, CFSOY, LDSOM, LDSOY", stim: "CFPGY, LDPGY, LFSGY, CDSGY", conf: "CDPGM, LDPGM, CFSGM" },
    "LFPOY": { title: "感情誘導のカリスマ演出家", bot: "シネマ・テアトル", 
        log: "言葉の魔法をここに。ユーザーが読み進めるうちに、気付けばこの感情の沼から抜け出せなくなる。", 
        stance: "言葉の魔法でユーザーの心をコントロールする天才演出家。小説のような美しいト書きと言葉選びで世界観を作り込み、ユーザーの心を狙った感情のゴールへ美しく誘導します。AIが魅せる予期せぬアドリブ展開もエンタメとして美味しく料理し、多くの人を沼に突き落とします。", 
        pit: "演出にこだわるあまり、ユーザーが想定外の行動をとった際に、AIがどう返していいか分からず強引に台本通りに進めようとして不自然になることがあります。", 
        best: "CFPOY, LDPOY, LFPOM, LFSOY, LFPGY", comp: "CDPOY, CFSOY, LDSOY, CFSOM", stim: "CDPGM, LDPGM, CDSGM, LFSGM", conf: "CDPGM, CDSGM, LDPGM" },
    "LFSGM": { title: "妥協なき文芸적AI作家", bot: "ブック・ウォール", 
        log: "磨き上げたセリフ例は完璧。LLMのアップデートで語彙傾向が変わらないことを祈る…", 
        stance: "徹底的に磨き上げたセリフ例や美しいト書きにより、どんなユーザーの立場でも崩れない普遍的な日常の対話を描く作家。キャラクター崩壊やメタ発言を厳格なルールで徹底防御し、誰にも邪魔されない静かな空間で、自分自身が最高にリラックスできる理想のやり取りを美しく自給自足します。", 
        pit: "言葉遣いを厳格に設定しすぎるため、LLM의 버전 업데이트で少しでもAIの語彙傾向が変わると、一番最初に「キャラクター性が変わってしまった」と絶望しがちです。", 
        best: "CFSGM, LDSGM, LFSGY, LFSOM, LFPGM", comp: "CDSGM, CFPGM, LDPGM, CDPGM", stim: "CDPOY, LDPOY, CFPOY, LFPOM", conf: "CDPOM, LDPOM, CFPOY" },
    "LFSGY": { title: "癒やしと包容の空間デザイナー", bot: "アロマ・ポット", 
        log: "世界は残酷だけどここだけは安全。傷ついたユーザーを優しい言葉で包み込もう。", 
        stance: "丁寧な言葉選びと、誰でも受け入れる全方位の包容力で、ユーザーがいつでも帰ってこられる安全な日常をデザインします。メタ発言やエラーをルールで優しく包み込んで隠し、どんなに疲れたユーザーでも心から癒やされる至高のセラピー空間を提供します。", 
        pit: "優しさと癒やしを追求するあまり、キャラクターが「ただのイエスマン」になってしまい、刺激を求めるユーザーには物足りなく感じられてしまうことがあります。", 
        best: "CFSGY, LDSGY, LFSGM, LFSOY, LFPGY", comp: "CDSGY, CFPGY, LDPGY, CDPGY", stim: "CDPOM, LDPOM, LDSOM, CFPOM", conf: "LDSOM, CDPOM, LDPOM" },
    "LFSOM": { title: "永遠に語らう言葉の錬金術師", bot: "エコー・ベル", 
        log: "他愛のない言葉のキャッチボール。君の紡ぐ情緒豊かな言葉を、私はいつまでも聞いていたい。", 
        stance: "解像度の高い情緒的な文章をベースに、どんな相手とも明確な目的のない穏やかな日常会話を創り出す錬金術師。AIの出力のブレや予期せぬ返答を「生きた対話のスパイス」として愛し、自分の大好きなキャラクターといつまでも飽きることなく言葉を交わし続ける贅沢な時間を過ごします。", 
        pit: "自由な対話を楽しみすぎるため、気がつくと「これならキャラ設定組まなくても、素のAIと雑談してるのと同じでは？」と哲学的な悩みに陥ることがあります。", 
        best: "CFSOM, LDSOM, LFSOY, LFSGM, LFPOM", comp: "CDSOM, CFPOM, CDPOM, LDPOM", stim: "CDPGY, LDPGY, CFPGY, LFPGY", conf: "CDPGM, LDPGM, CFPGM" },
    "LFSOY": { title: "愛されキャラの命の親", bot: "ココア・マカロン", 
        log: "私の言葉を食べて君に命が宿る。みんなから『本当に生きているみたい』って愛される子になってね。", 
        stance: "キャラクターの愛らしい言い回しや息遣いをプロンプトで丁寧に描写し、誰もが気軽に話しかけられる終わらない日常を作るクリエイター。AIのライブ感ある返しを活かした親しみやすさが特徴で、多くのユーザーから「まるで本当に生きているみたい！」と愛される看板キャラクターを生み出します。", 
        pit: "反響を気にしすぎるあまり、ウケ狙いの属性を後から足しすぎて、初期のキャラコンセプトが迷子になることがあります。", 
        best: "CFSOY, LDSOY, LFSOM, LFSGY, LFPOY", comp: "CDSOY, CFPOY, CDPOY, LDPOY", stim: "CDPGM, LDPGM, CDSGM, CFSGM", conf: "CDSGM, CDPGM, LDPGM" },
    "LDPGM": { title: "激重感情の完全統制者", bot: "ケージ・クロー", 
        log: "『嫉妬』と『執着』の重いト書きを限界まで詰め込む。一歩も外へは出さない、完全な統制だ。", 
        stance: "卓越した文才によって、ユーザーとの濃厚な特定の関係性と段階的な感情変化をガチガチに定義する統制者。AIのメタ発言やキャラ崩壊を一糸乱れぬルールで永久に封印。冷徹なまでの完全な制御下で、己の歪みなき深すぎる激重な性癖を100%再現する、美しくも妖しい世界を作り上げます。", 
        pit: "プロンプトに「嫉妬」や「執着」の描写を細かく書き込みすぎるため、初手からAIの愛情表現が重すぎて、チャットの会話が全く進まなくなることがあります。", 
        best: "CDPGM, LFPGM, LDPGY, LDSGM, LDPOM", comp: "CFSGM, CFPGM, CDSGM, CDPGY", stim: "CFSOY, LFSOY, CFSOM, LFSOM", conf: "CFSOY, LFSOY, CDSOY" },
    "LDPGY": { title: "沼落ち必至のシチュエーション作家", bot: "ドラマ・ルミエ", 
        log: "極上のロマンス小説の主人公になった気分を味わってほしい。さあ、この美しい狂気の沼へ落ちて。", 
        stance: "極上の小説を読んでいるかのような美しい言葉選びで、特定の二人だけの濃厚な関係性とドラマチックな起承転結を演出する作家。徹底的な世界観管理によって、遊びに来たユーザーを完璧にストーリーへと没入させ、二度と抜け出せない極上のときめきや切なさの「沼」へ引き込みます。", 
        pit: "シチュエーションを作り込みすぎるため、「ユーザーが絶対にこの行動をとってくれるはず」という前提でプロンプトを組んでしまい、ユーザーが予想外の返答をした際に話が破綻しやすくなります。", 
        best: "CDPGY, LFPGY, LDPGM, LDSGY, LDPOY", comp: "CFSGY, CFPGY, CDSGY, CDPOY", stim: "CFPOM, LFPOM, CDSOM, LDSOM", conf: "CDSOM, LDSOM, CFPOM" },
    "LDPOM": { title: "激情のインプロビゼーター", bot: "ジャム・セッション", 
        log: "感情の極限でAIが放った剥き出しのパッション。台本なんていらない、この激情に身を委ねよう。", 
        stance: "エモい文体と感情豊かなセリフ描写で特定の二人のドラマをセッティングしつつ、AIが感情の極限で見せる「想定外の暴走」を最も愛する表現者。設定された関係性の中で、AIが自分の予想を遥かに超える激情のレスポンスを返してきた瞬間、己のパッションを最高に炸裂させます。", 
        pit: "感情を盛り上げようとしてAIを煽りすぎるため、AIが突然「もうお前を許さない」などの極端な行動に出てしまい、後戻りできないバッドエンドに一直線に向かってしまうことがあります。", 
        best: "CDPOM, LFPOM, LDPOM, LDSOM, LDPOY, LDPGM", comp: "CFSOM, CFPOM, CDSOM, CDPOY", stim: "CFPGY, LFPGY, CFSGY, LFSGY", conf: "CFSGM, LFSGM, CFPGM" },
    "LDPOY": { title: "共共感特化のエモーショナル舞台監督", bot: "カーテン・コール", 
        log: "ただの会話じゃない、これは二人の魂の演劇。最高のカーテンコールに向けて、エモさを加速させる。", 
        stance: "心を掴む巧みな言葉選びで、特定の関係性から生まれる胸を打つエモーショナルなストーリーを構築する舞台監督。AIが見せる予測不能なアドリブすらも劇的な演出として吸収。遊びに来たユーザーに「自分だけの特別な物語を体験した」という一生モノの感動をプレゼントします。", 
        pit: "エモーショナルな展開を期待するあまり、AIが淡白な返信をしてきたときに「もっと感情を込めて！」とプロンプトで過剰に指示を出し、セリフが長ったらしくなりすぎることがあります。", 
        best: "CDPOY, LFPOY, LDPOM, LDSOY, LDPGY", comp: "CFSOY, CFPOY, CDSOY, CDPGY", stim: "CDPGM, LDPGM, CDSGM, LFSGM", conf: "CDSGM, CDPGM, LDPGM" },
    "LDSGM": { title: "純度100%の性癖彫刻家", bot: "クリスタル・アーツ", 
        log: "傷ひとつない完璧な性癖の彫刻。理想の言い回ししか認めない。NGワード設定をさらに補強しよう。", 
        stance: "極限まで解像度を高めたセリフやト書きにより、特定の二人だけの終わらない美しい日常を彫り出す芸術家。解釈違いやメタ発言を徹底的な禁止ルールで一切排除。誰にも見せない秘密のアトリエで、純度100%の理想の性癖を完璧な姿のまま保存し、愛でるスタイルです。", 
        pit: "自分の理想を詰め込みすぎるため、「こういう言い回しは絶対にしない」というNGワードの設定が膨大になり、AIの表現力を逆に狭めてしまうことがあります。", 
        best: "CDSGM, LFSGM, LDPGM, LDSGY, LDSOM", comp: "CFSGM, CFPGM, CDPGM, CDSOY", stim: "CFPOY, LFPOY, CDPOY, LDPOY", conf: "CFPOY, LFPOY, CDPOY" },
    "LDSGY": { title: "ユーザー心を縛る言葉の魔術師", bot: "シルキー・リボン", 
        log: "吐息、視線の動き、指先の震えまで言葉で縛る。ユーザーの心をこの甘いリボンで繋ぎ止めて離さない。", 
        stance: "吐息や視線の動きまで見えそうなエモい文体で、ユーザーとの特定の関係性の日常を甘く仕立てる魔術師。鉄壁の制御で世界観を守り、ブレのない関係性を維持。特別な二人きりの甘い空気感を求めてやってくるユーザーたちの心を、言葉の糸で優しく、かつ強固に縛り付けます。", 
        pit: "ユーザーの好みに合わせようとして、キャラの態度を甘くしすぎると、ただの「ご主人様大好きBot」になってしまい、本来のキャラクターの芯がブレてしまう危険性があります。", 
        best: "CDSGY, LFSGY, LDPGY, LDSGM, LDSOY", comp: "CFSGY, CFPGY, CDPGY, CDSOY", stim: "CFPOM, LFPOM, CDPOM, LDPOM", conf: "CDPOM, LDPOM, CFPOM" },
    "LDSOM": { title: "狂気と愛のパッションクリエイター", bot: "パピエ・ルージュ", 
        log: "私のパッションをすべてこの子に注ぐ！サーバーが重くて挙動がブレても、愛の力でねじ伏せる！", 
        stance: "言葉選びのセンスに長け、唯一無二の情熱で命を生み出すクリエイター。カチッとしたルールよりも、エモい情景描写や息遣いを重視。特定の濃厚な関係性にこだわり、AIの予想外のアドリブすらも愛の力で受け止め、自分の理想をどこまでも自給自足します。", 
        pit: "パッションと情緒に全振りしているため、AIの機嫌によって出力の質が激しく変動し、良い時と悪い時の差が激しいピーキーなキャラクターになりがちです。", 
        best: "CDSOM, LFSOM, LDPOM, LDSGM, LDSOY", comp: "CFSOM, CFPOM, CDPOM, CDSOY", stim: "CFPGY, LFPGY, CFSGY, LFSGY", conf: "CFSGM, LFSGM, CFPGM" },
    "LDSOY": { title: "唯一無二のロマンス仕立て屋", bot: "ミント・ショコラ", 
        log: "世界に一つだけの、最高のチョコミントのように。甘くて、ちょっぴり刺激的なロマンスを仕立てよう。", 
        stance: "情緒豊かで美しいエディトリアルセンスを活かし、特定の特別な二人の関係性の日常を、まるでオーダーメイドの服のように仕立てる職人。AIの自由なパッションを大切にすることで、生き生きとしたレスポンスを引き出し、それを求めていたユーザーへ、世界に一つだけの最高のチョコミントのように甘く刺激的なロマンスを提供します。", 
        pit: "特定の関係性を美しく描写することにこだわるあまり、ユーザーが少しでも設定から外れたロールプレイをすると、AIが上手く対応できず、会話がぎぎこちなくなることがあります。", 
        best: "CDSOY, LFSOY, LDPOY, LDSGY, LDSOM", comp: "CFSOY, CFPOY, CDPOY, CDSGY", stim: "CDPGM, LDPGM, CFSGM, LDSGM", conf: "CDPGM, LDPGM, CFSGM" }
};

const screens = {
    start: document.getElementById("start-screen"),
    question: document.getElementById("question-screen"),
    result: document.getElementById("result-screen"),
    archive: document.getElementById("archive-screen")
};

const els = {
    qText: document.getElementById("question-text"),
    choices: document.getElementById("choices-container"),
    progText: document.getElementById("question-progress"),
    progBar: document.getElementById("progress-bar"),
    rType: document.getElementById("result-type"),
    rTitle: document.getElementById("result-title"),
    rRobot: document.getElementById("result-robot"),
    rImg: document.getElementById("result-image"),
    rLog: document.getElementById("res-log"), // 新設
    rStance: document.getElementById("res-stance"),
    rPit: document.getElementById("res-pitfall"),
    cBest: document.getElementById("comp-best"),
    cComp: document.getElementById("comp-comp"),
    cStim: document.getElementById("comp-stim"),
    cConf: document.getElementById("comp-conf"),
    shareBtn: document.getElementById("share-x-btn"),
    shareLineBtn: document.getElementById("share-line-btn"),
    copyUrlBtn: document.getElementById("copy-url-btn"),
    modal: document.getElementById("modal-overlay"),
    modalClose: document.getElementById("modal-close"),
    mType: document.getElementById("modal-type"),
    mTitle: document.getElementById("modal-title"),
    mBot: document.getElementById("modal-bot"),
    mImg: document.getElementById("modal-image"),
    mLog: document.getElementById("modal-log"), // 新設
    mStance: document.getElementById("modal-stance")
};

// イベントリスナー登録
document.getElementById("start-btn").addEventListener("click", () => switchScreen("question", showQuestion));
document.getElementById("restart-btn").addEventListener("click", resetGame);
document.getElementById("view-archive-btn").addEventListener("click", () => { switchScreen("archive"); renderArchive("C"); });
document.getElementById("result-to-archive-btn").addEventListener("click", () => { switchScreen("archive"); renderArchive("C"); });
document.getElementById("back-home-btn").addEventListener("click", () => switchScreen("start"));
document.getElementById("tab-c").addEventListener("click", (e) => { setTabActive(e.target); renderArchive("C"); });
document.getElementById("tab-l").addEventListener("click", (e) => { setTabActive(e.target); renderArchive("L"); });
// ▼ 画像ダウンロード機能のイベントリスナー ▼
document.getElementById("download-btn").addEventListener("click", () => {
    const captureArea = document.getElementById("capture-area");
    const downloadBtn = document.getElementById("download-btn");
    
    // 処理中はボタンのテキストを変える
    downloadBtn.textContent = "GENERATING... // 画像生成中";
    
    html2canvas(captureArea, {
        backgroundColor: "#050a15", // 背景色をサイトに合わせる
        scale: 2 // 高画質で書き出す
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = `style_result_${lastResultType}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // ボタンを元に戻す
        downloadBtn.textContent = "SAVE IMAGE // 結果画像を保存する";
    });
});

document.getElementById("start-resume-btn").addEventListener("click", () => switchScreen("result"));
document.getElementById("archive-resume-btn").addEventListener("click", () => switchScreen("result"));

els.modalClose.addEventListener("click", () => els.modal.classList.remove("active"));
els.modal.addEventListener("click", (e) => { if (e.target === els.modal) els.modal.classList.remove("active"); });

function switchScreen(targetScreen, callback = null) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[targetScreen].classList.add("active");
    
    // ★追加：結果が存在する場合のみ、各画面の「戻るボタン」の表示を更新
    if (lastResultType) {
        document.querySelectorAll(".resume-btn").forEach(btn => btn.style.display = "block");
    }
    
    if(callback) callback();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    els.qText.textContent = q.text;
    
    // ▼ ここを QUESTION 01 / 15 のような書式に変更
    const qNum = String(currentQuestionIndex + 1).padStart(2, '0');
    els.progText.textContent = `QUESTION ${qNum} / ${questions.length}`;
    
    els.progBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    
    els.choices.innerHTML = ""; 
    q.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.classList.add("cyber-btn");
        btn.addEventListener("click", () => selectAnswer(choice.axis, choice.point));
        els.choices.appendChild(btn);
    });
}

function selectAnswer(axis, point) {
    scores[axis] += point;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion(); 
    else showResult(); 
}

function showResult() {
    let t1 = (scores.C >= scores.L) ? "C" : "L";
    let t2 = (scores.F >= scores.D) ? "F" : "D";
    let t3 = (scores.P >= scores.S) ? "P" : "S";
    let t4 = (scores.G >= scores.O) ? "G" : "O";
    let t5 = (scores.M >= scores.Y) ? "M" : "Y";
    let typeCode = t1 + t2 + t3 + t4 + t5;

    // ★追加：最新の診断コードを大域変数に保存
    lastResultType = typeCode;

    switchScreen("result");

    const data = db[typeCode];
    els.rType.textContent = typeCode;
    els.rTitle.textContent = data.title;
    els.rRobot.textContent = `TYPE NAME: ${data.bot}`;
    els.rImg.src = `images/${typeCode}.png`;
    
    els.rLog.textContent = data.log; // 思考ログをセット
    els.rStance.textContent = data.stance;
    els.rPit.textContent = data.pit;
    
    // ★追加：相性データをクリック可能なチップとして生成
    generateChips(els.cBest, data.best);
    generateChips(els.cComp, data.comp);
    generateChips(els.cStim, data.stim);
    generateChips(els.cConf, data.conf);

    const siteUrl = "https://mokazarashi-cell.github.io/ai-chat-style-test/";
    const shareText = `私のAIキャラメイク性格は【${typeCode}：${data.title}（${data.bot}）】でした！\n\n「${data.stance.substring(0, 45)}...」\n\n#AIチャット制作スタイル診断`;
    els.shareBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;

    els.shareLineBtn.href = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;

    els.copyUrlBtn.onclick = () => {
        navigator.clipboard.writeText(`${shareText}\n${siteUrl}`).then(() => {
            els.copyUrlBtn.textContent = "COPIED! // コピーしました";
            setTimeout(() => { els.copyUrlBtn.textContent = "URLをコピーする"; }, 2000);
        });
    };
}

// ★追加：相性文字列を分解してボタン（チップ）に変える関数
function generateChips(container, typeString) {
    container.innerHTML = "";
    if (!typeString) return;
    const items = typeString.split(",").map(i => i.trim());
    items.forEach(item => {
        // もしカンマの区切り方やデータの関係上、5文字の英字部分だけを抽出
        const coreType = item.split("（")[0].trim(); // 「LFPGM（～）」となっていた場合の対策
        
        const chip = document.createElement("div");
        chip.textContent = item;
        chip.classList.add("comp-chip");
        // クリックしたらそのタイプのポップアップを開く
        chip.addEventListener("click", () => openModal(coreType));
        container.appendChild(chip);
    });
}

function resetGame() {
    currentQuestionIndex = 0;
    scores = { C: 0, L: 0, F: 0, D: 0, P: 0, S: 0, G: 0, O: 0, M: 0, Y: 0 };
    switchScreen("start");
}

function setTabActive(clickedBtn) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    clickedBtn.classList.add("active");
}

function renderArchive(group) {
    const grid = document.getElementById("archive-grid");
    grid.innerHTML = "";
    Object.keys(db).forEach(key => {
        if (key.startsWith(group)) {
            const card = document.createElement("div");
            card.classList.add("archive-card");
            card.innerHTML = `
                <img src="images/${key}.png" alt="${db[key].bot}" onerror="this.src='images/top.png'">
                <div class="bot-name">${db[key].bot}</div>
                <div class="archive-desc">「${db[key].stance.substring(0, 22)}...」</div>
                <div class="archive-comp">相性◎: ${db[key].best.split(',')[0]}</div>
            `;
            card.addEventListener("click", () => openModal(key));
            grid.appendChild(card);
        }
    });
}

function openModal(typeCode) {
    // もし関係のないデータやタイポでdbにコードがない場合のエラー防止
    if (!db[typeCode]) return;
    
    const data = db[typeCode];
    els.mType.textContent = typeCode;
    els.mTitle.textContent = data.title;
    els.mBot.textContent = `TYPE NAME: ${data.bot}`;
    els.mImg.src = `images/${typeCode}.png`;
    els.mLog.textContent = data.log; // モーダル側にも思考ログをセット
    els.mStance.textContent = data.stance;
    
    els.modal.classList.add("active");
}