const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, ShadingType } = require("docx");

// All extracted content, sorted by date
const entries = [
  {
    file: "IMG_2122.JPG",
    date: "2021-06-22 14:32",
    author: "虚虚小心",
    title: "为什么叫她小心",
    body: `为什么叫她小心
这是一个高频词，无论想与不想，自己口中 他人口中
每天都会出现无数次
这样 不可避免的 每一次都想起我
目的不是太纯良 你也应该猜到了
要的是 永远忘不了我
现在报应到自己身上
于是 不可避免的 每一次都想起她`,
    location: "",
    device: "来自虚心的 iPhone..."
  },
  {
    file: "IMG_2128.JPG",
    date: "2022-01-30 15:47",
    author: "虚虚小心",
    title: "一个拥抱着的夜晚",
    body: `'好想这样和你生活一辈子'
"好啊我答应了"
'别人不答应怎么办'
"那我们让她们答应呗"
'回家偷户口本我们结婚吧'
"可是有户口本我们也结不了婚啊"
'啊'
"我们拍一张红底的照片就当结婚了好不好？"
'啊！那我要先整容变漂亮了再拍'
………`,
    location: "",
    device: "来自啊虚的iPhone 11"
  },
  {
    file: "IMG_2129.JPG",
    date: "2022-06-29 11:17",
    author: "虚虚小心",
    title: "",
    body: `睡前 我俩正抱着西瓜刷剧 小心冷不丁的冒出一句
"你说人死了以后还会有意识吗"
'没有了吧 死了什么都没了'
'你不是不怕死吗哈哈哈 哈哈 怎么问这个'
"...我怕死了就忘记你了"
'有这么爱吗'
"讨厌的时候很讨厌
爱的时候很爱呗"（傲娇脸）`,
    location: "浙江",
    device: "来自啊虚的 iPhone 11"
  },
  {
    file: "IMG_2127.JPG",
    date: "2022-10-08 00:18",
    author: "虚虚小心",
    title: "",
    body: `这几天在小心家，心妈知道我爱吃海鲜和牛肉 几乎每天都有做给我们吃 还熬鸡汤让我们俩喝，今天过敏严重了 她一直问小心我的状况，知道我长久以来去很多医院都没有看好 很熏疼我，说了好几次我这么痒肯定很难受，还找了认识的有名中医带我去看。
其实已经不是第一次来小心家了 这次是待得最久的，包括小心的童年描述 一直感觉心妈是很单纯善良 非常信任孩子的那种妈妈，很尊重她们的选择 就连我们晚饭突然要出去吃 也不会说什么话（不知道大家能不能懂这个点 TT）。
她们家要好的亲戚基本都住在一个小区里，经常一起出来吃饭，碰面了好几次 大家都对我特别热情友好 再一次感叹，就是在这样好的氛围里才会养出这样好的小心 😔`,
    location: "福建",
    device: "来自啊虚的iPhone..."
  },
  {
    file: "IMG_2130.JPG",
    date: "2022-11-21 12:47",
    author: "虚虚小心",
    title: "",
    body: `大概是梦见她不相信我 不要我了，梦里力竭的呼喊撕破现实，清醒的触感是她紧紧的抱住我。
明明今天睡的不好 翻来覆去 我都听见她不开心的呢喃，估计这个时候眼睛都睁不开就来摸我的颈。
已经很久了 我想她的手臂都麻了，抬起身想出来 她又用另一只手按下，三番两次 她反倒摸起我的头。
妹妹 总是比我乐观又让我安心`,
    location: "浙江",
    device: ""
  },
  {
    file: "IMG_2132.JPG",
    date: "2023-02-17 02:48",
    author: "AXUXX",
    title: "",
    body: `生气归生气 一到晚上还是会默默把老婆的分加到100
她生气我哄几下就笑了 我生气她要哄一天 我真该死
（当然每个人体质不一样 生气时长也不一样）😭爱抚一下 睡着了 单纯的宝宝 #爱老婆#`,
    location: "浙江",
    device: "来自 iPhone 13 Pro Max"
  },
  {
    file: "IMG_2134.JPG",
    date: "2023-02-27 14:56",
    author: "虚虚小心",
    title: "",
    body: `宝宝真的很喜欢🏍️ 小白龙卖了以后 余光看见她在看车车的频率直线上升 比看我照片的时间还多，在街上看见喜欢的车车还要退回去看好久
上次生我气哄了半天还是不开心 我凑到她耳边说了一句 给你买车，转头就在那偷笑了 笑得眼睛变成眉毛
可是她挑挑拣拣还是犹豫不定的 一会喜欢这个一会喜欢那个，最后还是怕浪费钱摇摇头，然后在下一次遇见🏍️的时候再多留一分钟
好想多赚钱 让她遇见喜欢的可以不用再犹豫了`,
    location: "浙江",
    device: ""
  },
  {
    file: "IMG_2138.JPG",
    date: "2023-06-25 13:19",
    author: "虚虚小心",
    title: "",
    body: `这两天小心的亲戚来看她，逛了几圈家里 很是喜欢 还希望我和小心可以一起买一套
听到这话我忍不住的震惊，原来在她家人心里 我们已经是超越钱财纠纷 如此亲密的关系了
了解她以来 一直在给我刷新认知，这样的家庭 客人来了我一个人待在房间也没关系 阿姨还会给大家解释是客厅没有空调 我怕热，饭做好了 突然要出门吃也没关系，不爱吃 点外卖也没关系，一切的一切都没关系 只要你开心 永远有人在背后支持你
我的家里充满尖刺的爱，她却像是随海漂流的舟 没有目标 这样飘着就好，现在 她伸出手来邀请我同乘`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2133.JPG",
    date: "2023-08-24 03:40",
    author: "虚虚小心",
    title: "宝宝有时喜欢胡思乱想",
    body: `所以我們总在睡前聊天 聊八卦聊人生聊星际甚至灵魂这种缥缈的东西
说了一通不知是地理还是科学的理论 她似懂非懂的点点头"那宝宝 人死了到底会不会有灵魂啊，宇宙那么大 会不会灵魂去往另一个星球？"
'猜不到 可能会嘞'
"如果到时候我们不在一个星球怎么办？"
这下我昏昏欲睡的灵魂真的归位了，看着她偶尔像这样 孩童似的眼睛 仿佛身临其境
'我会来找你的，我们不要互相找对方 免得错过，你等着我 我一定会找到你的'
好像安下心来 轻抚着我的手慢慢均匀了呼吸
额头贴近她的耳朵 我补充'有灵魂我就去找你 没有的话 我们就是永远在一起了'
消失即永恒 也没错吧`,
    location: "",
    device: ""
  },
  {
    file: "IMG_2147.JPG",
    date: "2023-10-10 03:05",
    author: "AXUXX",
    title: "",
    body: `不得不承认 跟忍豆豆谈恋爱是真的很很有安全感 刷抖音就是看那些电影解说 吃播 宠物 爽文 营销号😂 刷到美女是一秒都不看……每天都在偷瞄她刷抖音 问各种刁钻问题 回答也是让人满意 想找她麻烦 无从下手😂`,
    location: "福建",
    device: "来自 iPhone 13..."
  },
  {
    file: "IMG_2149.JPG",
    date: "2024-03-08 02:08",
    author: "AXUXX",
    title: "",
    body: `我很爱照顾别人 可是我遇到了一个照顾我的 没有被谁精心照顾着 我还是觉得我适合照顾别人 不适合被别人照顾
于是 她睡着的时候 就是我最爱她的时候 因为我想搂着她 我想哄她睡觉 我想抚摸她的脸 我太想照顾她了 🙄😭😭`,
    location: "福建",
    device: "来自 iPhone 15 Pro Max"
  },
  {
    file: "IMG_2136.JPG",
    date: "2024-04-01 15:47",
    author: "虚虚小心",
    title: "",
    body: `我总是在不安，为已发生的事情焦虑，对未发生的事情恐惧
她没有埋怨我敏感乱想或者多愁善感
我说我想透口气，她换好衣服说 走吧 你想往哪去`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2141.JPG",
    date: "2024-04-25 16:55",
    author: "虚虚小心",
    title: "",
    body: `昨晚我先睡了 宝宝还在隔壁串珠
身边没有她 加上连绵不绝的雷声 又困又睡不着
想想还是起来去找她，刚带上眼镜她就从外面进来了
她说 刚刚的雷好大声 怕我吓到
她说 要抱着我 等我睡了再去工作
我说 除了你谁还把我当小孩～`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2150.JPG",
    date: "2024-06-03 01:45",
    author: "AXUXX",
    title: "平淡且幸福",
    body: `今天我们去逛了超市 她特别喜欢逛（她说过 准确来说是喜欢跟我逛）但买的却都是我爱吃的东西 或者 是她明天要给我做的饭...
我们 做饭 遛狗 拥抱 工作 打游戏 骑着摩托兜风 睡前一起涂身体乳 讨论着未来 这就是我们的一天
日复一日 让我肯定 她只爱我 只有我 我也是`,
    location: "福建",
    device: "来自 iPhone 15 Pro Max"
  },
  {
    file: "IMG_2140.JPG",
    date: "2024-07-29 04:38",
    author: "虚虚小心",
    title: "",
    body: `熟睡的宝宝翻过身抱住我 察觉我失眠
哼唧的哄拍着我
片刻 趁最后一丝意念也跑掉前
赶紧揽起我的手 不再动了
宝宝 我真的说过好多遍 你的味道 让我很安心很安心`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2144.JPG",
    date: "2024-11-19 21:32",
    author: "虚虚小心",
    title: "",
    body: `被长日的闷热放松了神经，虽然已经感觉气温有所下降
但我俩出门的那刻还是汗毛直立，还好都穿着外套不至于要回味感冒
小心终于妥协的被我带上了耳罩，骑车在冷风中送完东西 肚子已经呼呼叫不停，买上一早说好要吃的烤鸡
宝宝突然笑着說：有盼头的感觉真好呀！接着拉紧我的手 哼哧哼哧的往家里跑
是呀 不管外面再冷，一手拉着她 一手拿着我们的晚餐
这就是我生活的全部意义`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2148.JPG",
    date: "2024-12-14 01:54",
    author: "AXUXX",
    title: "",
    body: `大家经常问：家人亲戚不会刷到视频或者直播吗
答案是「会」（甚至都有关注也会看直播）
我们是不准备出柜 做不到两全的事情 绝对不会公开
但我不怕（目前妈妈一直知道我不想结婚）
上学作业没写我怕 考试没考好我怕 没找到工作我怕
想想很多时候都在害怕 也不知道什么时候开始悟到
我再也不想怕了 除了生离死别...`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2143.JPG",
    date: "2025-02-22 20:53",
    author: "虚虚小心",
    title: "",
    body: `刚刚送完快递回家 本来专心致志的玩着手机
突然抬头发现是陌生的路 问好几遍宝宝要去哪
她吞吞吐吐的说带我去买三文鱼 呆愣了好一会
想起来是下午逛超市的时候 看了一眼三文鱼
原来被她瞟到了
发生对话时 车里的bgm刚好是爱你 😟
回家拆快递 是她给我买的头疼药`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2145.JPG",
    date: "2025-04-17 00:08",
    author: "虚虚小心",
    title: "",
    body: `这两天大心来帮忙 不忍心虐待亲姐在沙发
三人挤一张床睡 自然而然的学会了闭麦贴贴
入睡前安静的抱在一起
宝宝突然戳戳戳开始在我手臂上写字
黑暗里我用脸贴着她摇头（其实每次我都猜不出来
她停了一会 开始画爱心
我马上画回更大的爱心 我们就这么一个爱心一个爱心
睡着啦`,
    location: "福建",
    device: ""
  },
  {
    file: "IMG_2146.JPG",
    date: "2025-04-28 02:27",
    author: "虚虚小心",
    title: "",
    body: `哎哟我们俩都爱跟对方说一些很俗的话
刚刚给宝宝泡捞面 她说"老婆我泡的面没你的好吃，上次吵架自己泡了一个好难吃"
我很大森'因为我泡的时候有加一些爱！'
"……"
（其实大概是她心情不好才觉得难吃）
不过每次她说要吃宵夜 我是真开心啊
连滚带爬就去厨房了 好像多吃这一口她能胖两斤`,
    location: "福建",
    device: ""
  },
  // No date entries
  {
    file: "IMG_2123.JPG",
    date: null,
    author: "虚虚小心",
    title: "虚虚小心",
    body: `有人问为什么在一起快五年了你们的感情状态依旧是热恋？
是看一个人愿不愿意为你改变

她是一个急性子的人，有时候越着急表达越容易做错
慢慢教她长大 是我最有成就感的一件事情，但也是因为她本身就是很好很好的人

我们爱对方依赖对方 在还没完全成熟的情况下就同居，从无到有 经历了种种，一直以来的相伴让我们更加珍爱彼此 从不觉得腻

我的生日到了 这两天她一直在给我准备礼物
这五年有四年都在同居 时时刻刻都黏在一起，其实想给对方准备点小惊喜 都无疑会被发现

所以她严厉要求我们异房哈哈（最遥远的距离）
奈何家里太小，收拾东西的时候无意间打开衣柜发现里面的小东西 我识相的闭上眼睛 她着急忙慌的关上，后面吃饭时我又在坐垫上摸到一个小零件 她又一把夺过...

笨蛋 是想让我捡点零碎 自己拼凑出来吗？看着她紧张的神情 不得不说 我喜欢她这样子

心里是知道她在给我准备惊喜 就是忍不住开心，因为有人很爱你 而且是非常非常爱你

我曾经说过 我很在意细节，但没想到她能给我们的玩偶都戴上生日帽 为我庆生 这些玩偶是我们一点一滴装饰的小家

遮遮掩掩的拿出来给我准备的相框
还没来得及拍的红底照 她也为我画了一张
最中间显眼的是那枚钻戒 原来还买了婚戒！！

以前她嘴里总是念叨着我们要 是能结婚 肯定早就结婚了吧
我们互相戴上婚戒 这次我们是彼此的见证人

我们现在的生活也如同婚后生活 依偎在一起
我想 我这辈子没她不行了`,
    location: "",
    device: ""
  }
];

function createParagraph(text, options = {}) {
  const runs = [];
  const defaultFont = options.font || "Microsoft YaHei";
  const defaultSize = options.size || 22; // half-points, 22 = 11pt

  // Split by newlines
  const lines = text.split("\n");
  lines.forEach((line, idx) => {
    if (idx > 0) {
      runs.push(new TextRun({ break: 1 }));
    }
    runs.push(new TextRun({
      text: line,
      font: defaultFont,
      size: defaultSize,
      ...options.runOptions
    }));
  });

  return new Paragraph({
    children: runs,
    spacing: { after: 120, line: 360 },
    ...options.paragraphOptions
  });
}

function createHeader(text, level = 2) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: "Microsoft YaHei",
      size: level === 1 ? 36 : level === 2 ? 28 : 24,
      bold: true,
      color: level === 1 ? "1F4E79" : "2E75B6"
    })],
    heading: level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 200 },
  });
}

async function main() {
  const children = [];

  // Title page
  children.push(new Paragraph({
    children: [new TextRun({
      text: "虚虚小心 & AXUXX",
      font: "Microsoft YaHei",
      size: 48,
      bold: true,
      color: "1F4E79"
    })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }));

  children.push(new Paragraph({
    children: [new TextRun({
      text: "社交动态合集",
      font: "Microsoft YaHei",
      size: 36,
      color: "2E75B6"
    })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
  }));

  children.push(new Paragraph({
    children: [new TextRun({
      text: `整理日期：2026年6月10日    共 ${entries.length} 篇`,
      font: "Microsoft YaHei",
      size: 22,
      color: "666666",
      italics: true
    })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 800 },
  }));

  // Separator
  children.push(new Paragraph({
    children: [new TextRun({ text: "━".repeat(60), font: "Microsoft YaHei", size: 18, color: "CCCCCC" })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }));

  let index = 0;
  for (const entry of entries) {
    index++;
    const hasDate = !!entry.date;

    // Entry separator
    if (index > 1) {
      children.push(new Paragraph({
        children: [new TextRun({ text: "· · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·", font: "Microsoft YaHei", size: 18, color: "BBBBBB" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 300, after: 300 },
      }));
    }

    // Index and date header
    let headerText = `第${index}篇`;
    if (hasDate) {
      headerText += `  ·  ${entry.date}`;
    } else {
      headerText += `  ·  无日期`;
    }

    children.push(createHeader(headerText, 3));

    // File source
    children.push(createParagraph(`📷 图片来源：${entry.file}`, {
      size: 18,
      runOptions: { color: "888888", italics: true }
    }));

    // Author
    children.push(createParagraph(`👤 作者：${entry.author}`, {
      size: 20,
      runOptions: { bold: true }
    }));

    // Location if available
    if (entry.location) {
      children.push(createParagraph(`📍 发布于：${entry.location}`, {
        size: 18,
        runOptions: { color: "666666" }
      }));
    }

    // Title if available
    if (entry.title) {
      children.push(createParagraph(`📌 ${entry.title}`, {
        size: 22,
        runOptions: { bold: true, color: "2E75B6" }
      }));
    }

    // Blank line before body
    children.push(new Paragraph({ spacing: { after: 80 } }));

    // Body content
    children.push(createParagraph(entry.body, {
      size: 22,
      runOptions: {}
    }));
  }

  // End
  children.push(new Paragraph({
    children: [new TextRun({ text: "━".repeat(60), font: "Microsoft YaHei", size: 18, color: "CCCCCC" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 600, after: 400 },
  }));

  children.push(new Paragraph({
    children: [new TextRun({
      text: "— 全文完 —",
      font: "Microsoft YaHei",
      size: 22,
      color: "888888",
      italics: true
    })],
    alignment: AlignmentType.CENTER,
  }));

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
        }
      },
      children
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve("D:/Claude&Imperare/AXUXX/虚虚小心_AXUXX_社交动态合集.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Word document saved to:", outPath);
  console.log(`Total entries: ${entries.length}`);
  console.log(`With dates: ${entries.filter(e => e.date).length}`);
  console.log(`Without dates: ${entries.filter(e => !e.date).length}`);
}

main().catch(console.error);
