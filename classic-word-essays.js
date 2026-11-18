(() => {
  'use strict';

  const library = window.HAN_ESSAYS;
  const traditional = text => '<span lang="zh-Hant">' + text + '</span>';
  const simplified = text => '<span lang="zh-CN">' + text + '</span>';
  const word = (han, py, meaning) => ({han, py, meaning});
  const source = (title, url, note) => ({title, url, note});
  const glyphSource = character => 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=' + encodeURIComponent(character);

  const home = {
    id:'gia', glyph:'家', category:'Hán Việt & văn chương',
    title:'Gia 家 — về nhà, về quê',
    deck:'Dưới mái 家 có hình con lợn. Trong thơ Hạ Tri Chương, người mang giọng quê trở về lại được trẻ con hỏi từ đâu đến.',
    subtitle:'Từ mái nhà trong chữ cổ đến một câu hỏi khiến người trở về thành khách.',
    sections:[
      {
        title:'Dưới mái nhà có gì?',
        html:`<p>Khi nói <strong>${simplified('我在家。')}</strong> <i>Wǒ zài jiā.</i>, bạn đang dùng một chữ viết giống nhau ở cả giản thể lẫn phồn thể. Nhìn chữ <strong>${traditional('家')}</strong> từ trên xuống, bạn thấy ${traditional('宀')}, hình mái nhà, và ${traditional('豕')}, chữ chỉ lợn. Tư liệu giáp cốt và kim văn do Đại học Trung văn Hồng Kông tập hợp có dạng với ${traditional('豕')} và dạng với ${traditional('豭')}, tên gọi lợn đực.</p>
          <p>Hứa Thận trong <cite>Thuyết văn giải tự</cite> giảng ${traditional('家')} là chỗ ở, lấy ${traditional('宀')} và phần rút gọn của ${traditional('豭')} để gợi âm. Theo cách giải thích của nhóm biên soạn tự khố Hồng Kông, chữ cổ còn gợi cảnh nuôi gia súc trong nơi cư trú. Cùng một hình chữ cho ta hai câu hỏi. Hình ảnh nào giúp nhận ra nghĩa? Dấu vết nào cho biết người xưa ghi âm ra sao? Ở đây, <strong>mái nhà</strong> cho bạn chỗ bám về nghĩa, còn ${traditional('豭')} là phần được nêu trong phân tích về âm.</p>`,
      },
      {
        title:'Nhà là một chỗ, cũng là những người ở đó',
        html:`<p>Âm Hán Việt <strong>gia</strong> vẫn ở ngay trong “gia đình” ${simplified('家庭')}, “gia tộc” ${simplified('家族')}, “gia quy” ${simplified('家规')}. Trong tiếng Trung, chữ ấy đứng riêng được trong <strong>${simplified('回家')}</strong> <i>huí jiā</i>, về nhà, và đi với ${simplified('人')} thành <strong>${simplified('家人')}</strong> <i>jiārén</i>, người thân trong gia đình.</p>
          <p>Cũng có lúc bạn gặp chữ ấy trên biển hiệu. Trong ${simplified('一家饭店')} <i>yì jiā fàndiàn</i>, ${simplified('家')} là lượng từ đếm cơ sở kinh doanh. Nhìn vị trí để biết vai trò của nó. ${simplified('我家有一家饭店。')} <i>Wǒ jiā yǒu yì jiā fàndiàn.</i> nghĩa là “Nhà tôi có một nhà hàng.” Chữ thứ nhất nằm trong ${simplified('我家')}, gia đình tôi. Chữ thứ hai đi giữa số ${simplified('一')} và danh từ ${simplified('饭店')}.</p>`,
      },
      {
        title:'Ai là khách ở quê mình?',
        html:`<p>Trong bài thứ nhất của <cite>Hồi hương ngẫu thư</cite>, Hạ Tri Chương đặt hai mốc của cả đời người vào một câu, rồi để trẻ con trong làng lên tiếng ở cuối bài.</p>
          <blockquote><span lang="zh-Hant">少小離家老大回，鄉音無改鬢毛衰。<br>兒童相見不相識，笑問客從何處來。</span></blockquote>
          <p><em>Dịch nghĩa</em><br>Rời nhà từ nhỏ, đến già mới về. Giọng quê chẳng đổi, tóc mai đã thưa. Trẻ con gặp mà chẳng nhận ra, cười hỏi khách từ đâu đến.</p>
          <p>Trong câu đầu, người trở về tự đặt mình trong động tác ${traditional('離家')} rồi ${traditional('回')}. Vào câu cuối, lũ trẻ gọi ông là ${traditional('客')}, khách. Chúng chỉ thấy một người lạ. Người đọc lại biết ông mang theo thứ vẫn còn nguyên là ${traditional('鄉音')}, giọng quê. Hai cách nhận ra nhau lệch đi đúng ở chữ “khách”.</p>
          <p>Trong chương ba của <cite>Hô Lan hà truyện</cite>, Tiêu Hồng đặt bài thơ ấy vào buổi học giữa hai ông cháu. Đứa bé hỏi ông rằng sau này nó có phải rời nhà không, rồi lo đến lúc nó già trở về, liệu ông còn nhận ra nó không. Bài thơ nhìn cuộc xa nhà từ đầu bên kia của một đời người. Tiểu thuyết để một đứa trẻ nghe cùng bài thơ và lần đầu sợ mất một người đang ngồi ngay trước mặt mình.</p>`,
      },
      {
        title:'Bạn đang về nhà hay về quê?',
        html:`<p>Tan ca rồi về nơi mình ở, nói ${simplified('我下班后就回家。')} <i>Wǒ xiàbān hòu jiù huí jiā.</i> “Tan ca là tôi về nhà.” Khi muốn nói mình về quê dịp Tết, có thể dùng ${simplified('我过年要回老家。')} <i>Wǒ guònián yào huí lǎojiā.</i> ${simplified('老家')} <i>lǎojiā</i> có thể là quê gốc hay quê nhà, tùy người nói. Thử đặt câu cho hai tình huống của chính bạn. Nhà hiện tại và nơi bạn lớn lên có thể cách nhau hàng trăm cây số.</p>`,
      },
    ],
    words:[word('家','jiā','Nhà, gia đình. Cũng dùng đếm cửa hàng và cơ sở kinh doanh.'),word('家人','jiārén','Người trong gia đình.'),word('回家','huí jiā','Về nhà.'),word('老家','lǎojiā','Quê nhà, quê gốc.'),word('一家饭店','yì jiā fàndiàn','Một nhà hàng.')],
    sources:[
      source('Đại học Trung văn Hồng Kông · 家',glyphSource('家'),'Có ảnh chữ cổ, mục Thuyết văn và phân tích vai trò của 豭.'),
      source('Bộ Giáo dục Đài Loan · 家','https://dict.concised.moe.edu.tw/dictView.jsp?ID=21800&la=0&powerMode=0','Các nghĩa hiện đại, trong đó có lượng từ cho cửa hàng và doanh nghiệp.'),
      source('Hạ Tri Chương · Hồi hương ngẫu thư, bài thứ nhất','https://zh.wikisource.org/zh-hant/回鄉偶書二首','Văn bản có ghi dị bản. Bài học theo dòng chữ chính của bản chép này.'),
      source('Tiêu Hồng · Hô Lan hà truyện, chương ba','https://zh.wikisource.org/wiki/呼蘭河傳/第三章','Đoạn hai ông cháu đọc thơ Hạ Tri Chương.'),
    ],
    related:['thu','lich-duyet'],
  };

  const writing = {
    id:'thu', glyph:'書', category:'Hán Việt & văn chương',
    title:'Thư 書 — một chữ từ cây bút đến lá thư',
    deck:'Bạn đã gặp 书 trong 一本书. Trong thơ Đỗ Phủ, chữ ấy gọi một lá thư đáng giá vạn vàng.',
    subtitle:'Lần theo nét bút trong chữ cổ rồi đọc lại chữ “thư” bằng tai người Việt.',
    sections:[
      {
        title:'Cầm bút trước khi có quyển sách',
        html:`<p>Trong ${simplified('一本书')} <i>yì běn shū</i>, ${simplified('书')} là sách. Đặt dạng phồn thể ${traditional('書')} cạnh dạng giản thể ${simplified('书')}, rồi nhìn xa hơn về chữ trên đồ đồng. Tự khố Đại học Trung văn Hồng Kông nhận ra hai thành phần trong các dạng kim văn, ${traditional('聿')} và ${traditional('者')}, trong đó ${traditional('者')} có thể viết lược. ${traditional('聿')} gợi hình bàn tay cầm bút, còn ${traditional('者')} là phần gợi âm trong phân tích này. Nghĩa gốc được tự khố nêu là <strong>viết</strong>.</p>
          <p><cite>Thuyết văn giải tự</cite> cũng phân tích theo hai phần đó. Nếu nhìn chữ ${traditional('書')} in ngày nay và thấy phía dưới giống ${traditional('曰')}, hãy nhớ rằng đây là hai lớp bằng chứng. Mắt bạn đang nhận một nét giống nhau trong dạng chữ hiện đại. Phân tích ${traditional('者')} gợi âm dựa vào dạng chữ cổ. Pinyin <i>shū</i> và <i>zhě</i> ngày nay cũng cho thấy vì sao không thể nhìn thanh bàng rồi đọc ra âm hiện đại một cách máy móc.</p>`,
      },
      {
        title:'Chữ viết đi khỏi bàn viết',
        html:`<p>Âm Hán Việt <strong>thư</strong> giữ lại nhiều mặt của ${traditional('書')}. “Thư pháp” ${simplified('书法')} là nghệ thuật viết chữ. “Thư viện” viết là ${traditional('書院')}, nhưng khi hỏi chỗ mượn sách trong tiếng Trung hiện đại, bạn dùng <strong>${simplified('图书馆')}</strong> <i>túshūguǎn</i>. ${simplified('书院')} thường gợi thiết chế học tập kiểu học viện, nhất là trong bối cảnh truyền thống. Còn “thư tín” ${simplified('书信')} giữ nghĩa lá thư. Từ một động tác viết, hãy để ý xem từ ghép đang gọi cách viết, đồ vật đã viết thành, hay lời gửi đi cho ai đó.</p>
          <p>Trong khẩu ngữ, ${simplified('我在看书。')} <i>Wǒ zài kàn shū.</i> nghĩa là “Tôi đang đọc sách.” ${simplified('我在写信。')} <i>Wǒ zài xiě xìn.</i> là “Tôi đang viết thư.” Còn ${simplified('我还在读书。')} <i>Wǒ hái zài dúshū.</i> có thể là “Tôi vẫn đang đi học” nếu người đối diện vừa hỏi bạn đã đi làm chưa. Câu này nối thẳng với ${simplified('你还在读大学吗？')} mà bạn đã gặp.</p>`,
      },
      {
        title:'Lá thư đáng vạn vàng',
        html:`<p>Trong <cite>Xuân vọng</cite>, Đỗ Phủ đặt tin từ người nhà cạnh một dấu hiệu của chiến tranh.</p>
          <blockquote><span lang="zh-Hant">烽火連三月，家書抵萬金。</span><br>Phong hỏa liên tam nguyệt, gia thư để vạn kim.</blockquote>
          <p><em>Dịch nghĩa</em><br>Khói lửa chiến tranh kéo dài ba tháng, thư nhà đáng giá vạn vàng.</p>
          <p>Chữ ${traditional('抵')} ở đây là “đáng, ngang giá”. Đỗ Phủ lấy đơn vị đo của tiền bạc để nói về thứ tiền khó mua được giữa loạn lạc, tin tức của gia đình. Chữ ${traditional('家')} trong ${traditional('家書')} thu cả căn nhà về phía người gửi. Thử đọc lại câu thơ sau bài <a href="#essay/gia">Gia</a>. Người trong bài Hạ Tri Chương trở về được đến quê. Ở câu này, chỉ cần lời nhắn từ nhà đến được tay người xa xứ đã là một chuyện lớn.</p>`,
      },
      {
        title:'Một quyển hay một lá?',
        html:`<p>Đặt cạnh nhau ${simplified('一本书')} <i>yì běn shū</i> và ${simplified('一封信')} <i>yì fēng xìn</i>. Nếu đang đọc văn và thấy ${simplified('一封家书')} <i>yì fēng jiāshū</i>, lượng từ ${simplified('封')} đã cho một manh mối rằng đây là lá thư. Hãy thử nói câu đời thường bằng những chữ bạn đã học. “Tôi mua một quyển sách” là ${simplified('我买了一本书。')} <i>Wǒ mǎi le yì běn shū.</i> “Tôi viết một lá thư cho người nhà” là ${simplified('我给家人写了一封信。')} <i>Wǒ gěi jiārén xiě le yì fēng xìn.</i></p>`,
      },
    ],
    words:[word('书','shū','Sách. Trong một số từ ghép và văn cổ còn chỉ văn thư, thư từ.'),word('读书','dúshū','Đọc sách hoặc đi học, tùy ngữ cảnh.'),word('书法','shūfǎ','Thư pháp.'),word('家书','jiāshū','Thư giữa những người trong gia đình.'),word('一封信','yì fēng xìn','Một lá thư.'),word('图书馆','túshūguǎn','Thư viện.')],
    sources:[
      source('Đại học Trung văn Hồng Kông · 書 trong bảng chữ cổ','https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/ancient.php?start=470','Dạng kim văn, vai trò của 聿 và 者, mục Thuyết văn.'),
      source('Đỗ Phủ · Xuân vọng','https://zh.wikisource.org/zh-hant/春望','Văn bản bài thơ, đối chiếu cặp câu về khói lửa và thư nhà.'),
      source('Bộ Giáo dục Đài Loan · 家書','https://dict.revised.moe.edu.tw/dictView.jsp?ID=89489&la=0&powerMode=0','Nghĩa thư từ giữa người nhà và dẫn chứng dùng lượng từ 封.'),
      source('Từ điển Hán Nôm · mục 院','https://hvdic.thivien.net/whv/%E9%99%A2','Đối chiếu mặt chữ 書院 và một nghĩa khác trong văn bản tiếng Trung.'),
    ],
    related:['gia','lich-duyet'],
  };

  const water = {
    id:'thuy', glyph:'水', category:'Hán Việt & văn chương',
    title:'Thủy 水 — khi nước rút, đá hiện ra',
    deck:'Từ cốc nước trong bài học đến cảnh Xích Bích vào mùa lạnh, rồi đến một câu dùng khi sự thật dần sáng tỏ.',
    subtitle:'Một nét nước trong chữ cổ đi vào văn Tô Thức và lời nói ngày nay ra sao.',
    sections:[
      {
        title:'Một dòng chảy, vài giọt hai bên',
        html:`<p>Trong câu bạn đã gặp ${simplified('回家后再喝些热水。')} <i>Huí jiā hòu zài hē xiē rèshuǐ.</i>, ${simplified('水')} là thứ rót ra uống được. Nhìn dạng giáp cốt do Đại học Trung văn Hồng Kông tập hợp, có thể nhận ra một nét giữa biểu thị dòng nước và những nét nhỏ hai bên như giọt nước. Các dạng cổ có số giọt khác nhau. Cái được giữ lại là hình dòng chảy. Đây là một trường hợp <strong>tượng hình</strong>.</p>
          <p>Khi đi vào bên trái chữ khác, thành phần chỉ nước thường có dạng ${simplified('氵')}. Trong ${simplified('河')} <i>hé</i>, “sông”, ${simplified('氵')} gợi nghĩa và ${simplified('可')} gợi âm theo cấu tạo chữ. Trong ${simplified('海')} <i>hǎi</i>, “biển”, phần bên phải là ${simplified('每')}. Hai chữ đều cho bạn cùng một manh mối về nghĩa trước khi tra pinyin. ${simplified('河水')} <i>héshuǐ</i> và ${simplified('海水')} <i>hǎishuǐ</i> lại là hai <em>từ ghép</em>, mỗi từ có hai chữ đứng riêng.</p>`,
      },
      {
        title:'Thủy trong tiếng Việt, shuǐ trong câu hằng ngày',
        html:`<p>Chữ ${traditional('水')} đọc Hán Việt là <strong>thủy</strong>, có trong “thủy điện” ${simplified('水电')} và “thủy sản” ${simplified('水产')}. Sang câu mua đồ, ${simplified('我想买些水果。')} <i>Wǒ xiǎng mǎi xiē shuǐguǒ.</i> nghĩa là “Tôi muốn mua ít trái cây.” Khi nhìn ra ${simplified('水')} và ${simplified('果')}, bạn có thêm cách nhận mặt chữ. Trong hội thoại hãy gọi cả từ ${simplified('水果')} là trái cây.</p>
          <p>Một chỗ chữ “thủy” đi xa khỏi nghĩa nước uống là ${simplified('水平')} <i>shuǐpíng</i>. Ngoài nghĩa liên quan đến mặt phẳng ngang, từ này còn chỉ mức độ, trình độ. ${simplified('我的汉语水平提高了。')} <i>Wǒ de Hànyǔ shuǐpíng tígāo le.</i> là “Trình độ tiếng Trung của tôi đã tiến bộ.” Trong câu ấy, ${simplified('水平')} trả lời câu hỏi bạn đã đạt tới mức nào.</p>`,
      },
      {
        title:'Cùng một bờ sông, cảnh đã khác',
        html:`<p>Trong <cite>Hậu Xích Bích phú</cite>, Tô Thức trở lại Xích Bích. Ông viết ${traditional('山高月小，水落石出')}, núi cao, trăng nhỏ, nước rút, đá lộ. Sau đó ông ngạc nhiên vì thời gian qua chưa bao lâu mà cảnh sông núi đã khó nhận ra. Hãy đọc từng nhịp. ${traditional('水落')} là việc của nước. ${traditional('石出')} là việc của đá. Đá ở đó từ trước, nhưng lần này nó mới vào tầm mắt người đi thuyền.</p>
          <p>Âu Dương Tu cũng tả cảnh nước xuống đá lộ khi viết về bốn mùa trong <cite>Túy Ông đình ký</cite>. Bản <cite>Lư Lăng văn sao</cite> chép ${traditional('水落而石出')}, có thêm ${traditional('而')} nối hai vế. Bộ từ điển thành ngữ của Bộ Giáo dục Đài Loan ghi nhận các dị bản ở đoạn của Âu Dương Tu. Hai văn bản giúp thấy hình ảnh này đã sống trong văn chương như thế nào, và bản của Tô Thức cho ta đúng chuỗi bốn chữ quen thuộc ngày nay.</p>`,
      },
      {
        title:'Lúc vụ án đã rõ',
        html:`<p>Khi đọc truyện trinh thám, hãy thử dịch ${simplified('事情终于水落石出了。')} <i>Shìqing zhōngyú shuǐ luò shí chū le.</i> là “Cuối cùng sự việc cũng sáng tỏ.” Từ điển ghi nhận đây là nghĩa bóng hiện nay. “Nước” trong câu chuyện có thể là lời khai mâu thuẫn, còn “đá” là tình tiết được nhìn rõ sau khi đối chiếu chứng cứ. Nếu manh mối mới chỉ giúp bạn bắt đầu nghi ngờ, hãy nói ${simplified('我还不知道。')} <i>Wǒ hái bù zhīdào.</i> “Tôi vẫn chưa biết.” Đến lúc lời giải đã hiện ra, lúc ấy dùng ${simplified('水落石出')} mới đúng tình huống.</p>`,
      },
    ],
    words:[word('水','shuǐ','Nước. Âm Hán Việt là thủy.'),word('水果','shuǐguǒ','Trái cây.'),word('海水','hǎishuǐ','Nước biển.'),word('水平','shuǐpíng','Mức độ, trình độ trong cách dùng nghĩa bóng.'),word('水落石出','shuǐ luò shí chū','Nước rút đá lộ. Nghĩa bóng là sự thật sáng tỏ.')],
    sources:[
      source('Đại học Trung văn Hồng Kông · 水',glyphSource('水'),'Dạng chữ cổ của 水 và giải thích hình dòng nước.'),
      source('Đại học Trung văn Hồng Kông · 河',glyphSource('河'),'Vai trò của 水 và 可 trong cấu tạo về sau của 河.'),
      source('Tô Thức · Hậu Xích Bích phú','https://zh.wikisource.org/zh/古賦辯體_(四庫全書本)/卷08#後赤壁賦','Văn bản trong Cổ phú biện thể, bản Tứ khố toàn thư.'),
      source('Âu Dương Tu · Túy Ông đình ký','https://zh.wikisource.org/zh-hant/廬陵文鈔/21#醉翁亭記','Bản chép có 水落而石出 trong đoạn tả bốn mùa.'),
      source('Bộ Giáo dục Đài Loan · 水落石出','https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=-7&la=0&webMd=2','Văn bản dẫn, dị bản và nghĩa bóng.'),
      source('Bộ Giáo dục Đài Loan · 水平','https://dict.concised.moe.edu.tw/dictView.jsp?ID=35596&la=0&powerMode=1','Nghĩa mức độ hoặc trình độ.'),
    ],
    related:['be-dau','thu'],
  };

  const essays = [home, writing, water];
  for (const essay of essays) {
    essay.wordCount = essay.sections.reduce((sum, section) => sum + section.html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length, 0);
    essay.minutes = Math.ceil(essay.wordCount / 155);
    library.byId.set(essay.id, essay);
  }
  library.articles.unshift(...essays);
})();
