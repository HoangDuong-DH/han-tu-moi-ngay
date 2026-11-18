(() => {
  'use strict';

  const essayData = window.HAN_ESSAYS;
  const charSource = han => 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=' + encodeURIComponent(han);
  const han = text => '<span lang="zh-CN">' + text + '</span>';

  const lichDuyet = {
    id:'lich-duyet', glyph:'歷', category:'Hán Việt & văn chương', minutes:5,
    title:'Lịch duyệt',
    deck:'Hai chữ cùng âm lịch, một mái đầu bạc và kinh nghiệm của Pha giữa hai cú đánh.',
    subtitle:'Từ 歷閱 trong thơ Nguyễn Khuyến đến 阅历 trong tiếng Trung hiện đại.',
    sections:[
      {
        title:'Lịch nào là lịch?',
        html:'<p>“Lịch duyệt” viết là ' + han('歷閱') + '. Chữ <strong>' + han('歷') + ' lịch</strong> có nghĩa là trải qua, đi qua. Trong <em>lai lịch</em> ' + han('來歷') + ', chữ ấy chỉ đường đi đã qua để truy về nguồn gốc. Trong <em>lịch sử</em> ' + han('歷史') + ', nó gợi những việc đã xảy ra. Còn <em>du lịch</em> ' + han('遊歷') + ' là đi qua nhiều nơi. Nếu muốn nói “đi du lịch” trong tiếng Trung thường ngày, hãy nhớ ' + han('去旅游') + ' <i>qù lǚyóu</i>.</p>' +
          '<p>Chữ <strong>' + han('曆') + ' lịch</strong> dùng trong phép tính ngày tháng, như <em>dương lịch</em> ' + han('陽曆') + ' và <em>âm lịch</em> ' + han('陰曆') + '. Để phân biệt mặt chữ phồn thể, hãy nhìn phần dưới. ' + han('歷') + ' có ' + han('止') + ', còn ' + han('曆') + ' có ' + han('日') + ', chữ chỉ mặt trời và ngày. Khi đọc giản thể, cả hai cùng viết <strong>' + han('历') + '</strong>. Muốn biết là lịch sử hay cuốn lịch, bạn cần nhìn chữ đứng cùng.</p>',
      },
      {
        title:'Từ chữ phồn thể đến ba từ dễ lẫn',
        html:'<figure class="essay-character-map" aria-label="Sơ đồ chữ lịch và duyệt">' +
          '<div class="essay-map-row"><div><b lang="zh-Hant">歷</b><small>lịch · trải qua</small></div><span aria-hidden="true">→</span><div class="essay-map-merge"><b lang="zh-CN">历</b><small>lì · giản thể</small></div><span aria-hidden="true">→</span><div><b lang="zh-CN">历史</b><small>lìshǐ · lịch sử</small></div></div>' +
          '<div class="essay-map-row"><div><b lang="zh-Hant">曆</b><small>lịch · ngày tháng</small></div><span aria-hidden="true">→</span><div class="essay-map-merge"><b lang="zh-CN">历</b><small>lì · giản thể</small></div><span aria-hidden="true">→</span><div><b lang="zh-CN">日历</b><small>rìlì · lịch ngày</small></div></div>' +
          '<div class="essay-map-row"><div><b lang="zh-Hant">閱</b><small>duyệt · xem, trải</small></div><span aria-hidden="true">→</span><div><b lang="zh-CN">阅</b><small>yuè · giản thể</small></div><span aria-hidden="true">+</span><div><b lang="zh-CN">历</b><small>nhánh 歷 · trải qua</small></div></div>' +
          '<figcaption><b lang="zh-Hant">閱歷</b> → <b lang="zh-CN">阅历</b> · <i>yuèlì</i> · vốn từng trải</figcaption></figure>' +
          '<p>Chữ <strong>' + han('閱') + ' duyệt</strong> là xem hoặc đọc trong ' + han('閱讀') + ' <i>yuèdú</i>, kiểm tra trong ' + han('閱兵') + ' <i>yuèbīng</i> và ' + han('檢閱') + ' <i>jiǎnyuè</i>. Thiều Chửu dẫn ' + han('閱人多矣') + ' <em>duyệt nhân đa hĩ</em> cho nghĩa từng trải, ở đây là từng tiếp xúc và biết nhiều hạng người.</p>' +
          '<p>Tiếng Việt nói <em>lịch duyệt</em> theo thứ tự ' + han('歷閱') + ' như câu thơ dưới đây, và cũng có cách nói <em>duyệt lịch</em>. Khi nói về vốn sống trong tiếng Trung hiện đại, bạn có thể nói <strong>' + han('她阅历丰富。') + '</strong> <i>Tā yuèlì fēngfù.</i> — Bà ấy rất từng trải.</p>',
      },
      {
        title:'Một mái đầu bạc và hai cú đánh',
        html:'<p>Trong <cite>Tiểu thán</cite>, Nguyễn Khuyến viết:</p>' +
          '<blockquote><span lang="zh-Hant">歷閱風霜半白頭，<br>一官幸得老而休。</span><br><br>Lịch duyệt phong sương bán bạch đầu,<br>Nhất quan hạnh đắc lão nhi hưu.</blockquote>' +
          '<p><em>Bản tạm dịch bạn gửi</em><br>Bạc nửa mái đầu trải gió sương,<br>Làm quan cáo lão về quê hương.</p>' +
          '<p>“Phong sương” là gió sương, ở đây gợi những nhọc nhằn của một quãng đời. Câu thơ cho quãng đời ấy một dấu vết nhìn thấy được: mái đầu đã bạc một nửa.</p>' +
          '<p>Nguyễn Công Hoan lại dùng chữ ấy trong một cảnh khác, ở <cite>Bước đường cùng</cite>:</p>' +
          '<blockquote>Dứt lời, anh bị một quả tống nữa vào giữa ngực. Lần này đã lịch duyệt, anh cố nhăn nhó chứ không dám kêu.</blockquote>' +
          '<p>Pha vừa bị tát và đã kêu lên. Bị dọa, đến cú đánh sau anh cố nén tiếng. Cái kinh nghiệm mà lời kể gọi là “lịch duyệt” hình thành ngay giữa hai cú đánh. Dùng một chữ thường gợi vốn sống dày dặn cho một bài học bị ép phải thuộc tức thì, câu văn khiến sự nhẫn nhịn của Pha càng cay đắng.</p>' +
          '<p class="tiny muted">Hai đoạn trích giữ theo văn bản bạn cung cấp. Bản số hóa của <cite>Bước đường cùng</cite> dùng “đã là lịch duyệt” ở cùng vị trí.</p>',
      },
    ],
    words:[
      {han:'历史',py:'lìshǐ',meaning:'Lịch sử, quá khứ của một nơi, một cộng đồng hoặc một sự việc.'},
      {han:'日历',py:'rìlì',meaning:'Lịch để xem ngày tháng.'},
      {han:'阅历',py:'yuèlì',meaning:'Những điều đã trải qua, vốn từng trải.'},
      {han:'阅读',py:'yuèdú',meaning:'Đọc.'},
      {han:'经历',py:'jīnglì',meaning:'Trải qua, hoặc những việc đã trải qua.'},
    ],
    quiz:{
      title:'Điền đúng từ vào câu',
      options:['历史','日历','阅历'],
      questions:[
        {before:'我想了解这座城市的',after:'。',answer:'历史',translation:'Tôi muốn tìm hiểu lịch sử của thành phố này.',reason:'Những chuyện đã diễn ra ở một thành phố thuộc về 历史.'},
        {before:'我把生日标在',after:'上了。',answer:'日历',translation:'Tôi đã đánh dấu sinh nhật trên lịch.',reason:'Vật hoặc ứng dụng để xem và đánh dấu ngày tháng là 日历.'},
        {before:'她去过很多地方，',after:'很丰富。',answer:'阅历',translation:'Cô ấy đã đi nhiều nơi và rất từng trải.',reason:'Vốn sống có được từ những gì đã trải qua là 阅历. Cụm hay gặp là 阅历丰富.'},
        {before:'这本书讲的是越南的',after:'。',answer:'历史',translation:'Cuốn sách này kể về lịch sử Việt Nam.',reason:'Nội dung là quá khứ của một đất nước, nên chọn 历史.'},
        {before:'看一下',after:'，下周一是几号？',answer:'日历',translation:'Xem lịch một chút, thứ Hai tuần sau là ngày mấy?',reason:'Hỏi ngày mấy thì tra 日历.'},
        {before:'从他的谈吐里，可以看出他的',after:'。',answer:'阅历',translation:'Qua cách ông ấy nói chuyện, có thể thấy vốn sống của ông ấy.',reason:'Cách nói chuyện ở đây cho thấy sự từng trải của một người, nên chọn 阅历.'},
      ],
    },
    sources:[
      {title:'Đại học Trung văn Hồng Kông · 歷',url:charSource('歷'),note:'Nghĩa trải qua và dạng giản thể 历.'},
      {title:'Đại học Trung văn Hồng Kông · 曆',url:charSource('曆'),note:'Nhánh lịch pháp và dạng giản thể 历.'},
      {title:'Từ điển Bộ Giáo dục Đài Loan · 閱',url:'https://dict.concised.moe.edu.tw/dictView.jsp?ID=44632&la=0&powerMode=0',note:'Ba nhóm nghĩa của 閱.'},
      {title:'Từ điển Bộ Giáo dục Đài Loan · 閱歷',url:'https://dict.revised.moe.edu.tw/dictView.jsp?ID=164736&la=0&powerMode=0',note:'Cách đọc và nghĩa của từ.'},
      {title:'Hán Việt tự điển Thiều Chửu · mục 閱 trên Từ điển Hán Nôm',url:'https://hvdic.thivien.net/whv/%E9%96%B1',note:'Nghĩa từng trải và ví dụ 閱人多矣.'},
      {title:'Nguyễn Khuyến · Tiểu thán, bản chép chữ Hán và phiên âm',url:'https://triancuocdoi.blogspot.com/2014/#:~:text=L%E1%BA%A1i%20d%E1%BB%8Bch%20th%C6%A1%20Nguy%E1%BB%85n%20Khuy%E1%BA%BFn%20b%C3%A0i%2050',note:'Hai câu đầu. Bài học giữ bản tạm dịch bạn gửi.'},
      {title:'Nguyễn Công Hoan · Bước đường cùng, bản số hóa đối chiếu',url:'https://www.scribd.com/document/927293209/Ti%E1%BB%83u-Thuy%E1%BA%BFt-B%C6%B0%E1%BB%9Bc-%C4%90%C6%B0%E1%BB%9Dng-Cung-Nguy%E1%BB%85n-Cong-Hoan',note:'Cảnh Pha bị người lính đánh. Có khác biệt một chữ so với đoạn bạn gửi.'},
    ],
    related:['be-dau','han-viet'],
  };

  const beDau = {
    id:'be-dau', glyph:'桑', category:'Hán Việt & văn chương', minutes:4,
    title:'Bể dâu',
    deck:'Từ lời kể của Ma Cô về biển Đông hóa ruộng dâu đến hai tiếng “bể dâu” ở đầu Truyện Kiều.',
    subtitle:'Một điển tích nhìn bằng con mắt của người sống qua biến đổi.',
    sections:[
      {
        title:'Bể nào, dâu nào?',
        html:'<p>“Bể dâu” gợi thành ngữ <strong>' + han('滄海桑田') + '</strong>, giản thể <strong>' + han('沧海桑田') + '</strong>, đọc <i>cānghǎi sāngtián</i>, âm Hán Việt là <em>thương hải tang điền</em>. ' + han('滄海') + ' là biển rộng. ' + han('桑田') + ' là ruộng trồng dâu. Ruộng dâu cần đất, biển thì phủ nước. Đặt hai cảnh vào cùng một chỗ, ta hình dung được một đổi thay lớn đến mức cảnh cũ khó còn nhận ra.</p>' +
          '<p>Chữ <strong>' + han('桑') + '</strong> <i>sāng</i> là cây dâu, cũng gặp trong <em>tang diệp</em> ' + han('桑葉') + ', lá dâu. Chữ “tang” ấy khác mặt chữ với <strong>' + han('喪') + '</strong> trong <em>tang lễ</em> ' + han('喪禮') + '. Còn trong hai tiếng “bể dâu”, tiếng Việt gọi thẳng tên hai cảnh bằng những chữ quen thuộc.</p>',
      },
      {
        title:'Ma Cô đã thấy gì?',
        html:'<p>Trong truyện <cite>Ma Cô</cite> ở quyển 60 của <cite>Thái Bình quảng ký</cite>, Ma Cô kể với Vương Phương Bình rằng bà đã thấy biển Đông ba lần hóa ruộng dâu: <q lang="zh-Hant">已見東海三為桑田</q>. Bà còn nhận thấy nước ở Bồng Lai đã cạn hơn trước và hỏi liệu nơi ấy có lại thành đất liền. Vương Phương Bình cười, nhắc đến lời nói rằng rồi giữa biển lại có bụi bay.</p>' +
          '<p>Đây là chuyện thần tiên. Chi tiết “ba lần” khiến ta thử nhìn thời gian bằng con mắt của nhân vật: một điều đủ lớn để con người tưởng như chẳng bao giờ đổi, Ma Cô đã tận mắt thấy đổi nhiều lần. Thành ngữ về sau dùng để nói chuyện đời biến đổi sâu sắc.</p>',
      },
      {
        title:'Qua một cuộc bể dâu',
        html:'<p>Ở đầu <cite>Truyện Kiều</cite>, Nguyễn Du viết:</p>' +
          '<blockquote>Trải qua một cuộc bể dâu,<br>Những điều trông thấy mà đau đớn lòng.</blockquote>' +
          '<p>Chữ <em>cuộc</em> gom biến đổi thành một đoạn đời có thể trải qua. Sang câu sau, “những điều trông thấy” đưa ta từ cảnh biển và ruộng về phía người chứng kiến. Điều còn đọng lại là cái đau của người đã nhìn thấy. Có thể đọc hai câu ấy như lời mở đầu về cách người kể nhìn câu chuyện sắp kể, với cả ký ức và lòng thương.</p>' +
          '<p>Trong tiếng Trung, bạn còn gặp dạng rút gọn <strong>' + han('沧桑') + '</strong> <i>cāngsāng</i>. <strong>' + han('他历尽沧桑。') + '</strong> <i>Tā lìjìn cāngsāng.</i> nghĩa là “Ông ấy đã trải bao thăng trầm.” Đọc lại chữ <b lang="zh-CN">历</b> trong câu này: nó thuộc nhánh <b lang="zh-Hant">歷</b> của bài Lịch duyệt. Cụm <b lang="zh-CN">历尽沧桑</b> đặt trọng tâm vào những đổi thay đã đi qua. <b lang="zh-CN">阅历丰富</b> nói về vốn sống còn lại từ những gì đã trải.</p>',
      },
    ],
    words:[
      {han:'沧海桑田',py:'cānghǎi sāngtián',meaning:'Thương hải tang điền, ví những đổi thay lớn của chuyện đời.'},
      {han:'桑田',py:'sāngtián',meaning:'Ruộng trồng dâu.'},
      {han:'沧桑',py:'cāngsāng',meaning:'Bể dâu, những biến đổi hoặc thăng trầm.'},
      {han:'历尽沧桑',py:'lìjìn cāngsāng',meaning:'Trải qua bao thăng trầm.'},
    ],
    sources:[
      {title:'Thái Bình quảng ký · bản Tứ khố toàn thư, quyển 60, truyện Ma Cô',url:'https://zh.wikisource.org/zh-hant/太平廣記_(四庫全書本)/卷060#麻姑',note:'Văn bản câu chuyện, có lời Ma Cô kể về biển Đông và đoạn đối thoại về Bồng Lai.'},
      {title:'Từ điển Bộ Giáo dục Đài Loan · 滄海桑田',url:'https://dict.revised.moe.edu.tw/dictView.jsp?ID=142000&la=0&powerMode=0',note:'Điển tích và nghĩa thành ngữ.'},
      {title:'Từ điển Bộ Giáo dục Đài Loan · 滄桑',url:'https://dict.concised.moe.edu.tw/dictView.jsp?ID=38206&la=0&powerMode=0',note:'Dạng rút gọn và cách dùng với 歷盡.'},
      {title:'Hội Bảo tồn Di sản chữ Nôm · Truyện Kiều bản 1870',url:'https://www.nomfoundation.org/nom-project/tale-of-kieu/tale-of-kieu-version-1870?uiLang=vn',note:'Câu 3–4 trong bản phiên âm, khảo dị của Nguyễn Quảng Tuân.'},
    ],
    related:['lich-duyet','han-viet'],
  };

  essayData.articles.unshift(lichDuyet,beDau);
  for (const article of [lichDuyet,beDau]) essayData.byId.set(article.id,article);
})();
