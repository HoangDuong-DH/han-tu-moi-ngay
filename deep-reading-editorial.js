(function () {
  'use strict';

  window.HAN_DEEP_READING_DATA.add([
    {
      id: 'giang-hang',
      glyph: '降',
      title: 'Vì sao ta nói giáng chức nhưng lại đầu hàng?',
      deck: 'Từ bản tin trời trở lạnh đến vận thư cổ, chữ 降 cho thấy vì sao “giáng chức” và “đầu hàng” giữ hai âm.',
      category: 'âm',
      search: ['jiang', 'xiang', 'giáng', 'hàng', '降温', '投降', '降价', '降落', 'sương giáng', 'phiên thiết'],
      intro: [
        'Bảng điện ở sân bay báo 飞机降落了, máy bay đã hạ cánh. Tối về, bản tin dùng đúng chữ 降 ấy trong 投降, đầu hàng. Chữ vẫn nguyên nét, mà âm đổi từ jiàng sang xiáng. Tiếng Việt cũng chia hai nẻo ấy. Một người có thể bị giáng chức, còn một người chịu thua thì đầu hàng.',
        'Cái thấp đi ở câu thứ nhất là độ cao của chiếc máy bay. Ở câu thứ hai, người ta chịu khuất phục. Nhìn xem chữ ấy đang nói về độ cao, về một mức, hay về việc khuất phục thường cho ta đủ manh mối để đọc.'
      ],
      summary: [
        ['Giáng · jiàng', 'Thấp xuống hoặc làm thấp đi. 降落 là hạ cánh, 降价 là giảm giá.'],
        ['Hàng · xiáng', 'Chịu khuất phục hoặc khiến ai, con vật nào chịu phục. 投降 là đầu hàng.'],
        ['Dấu vết trong vận thư', '古巷切 và 下江切 khác cả nhóm phụ âm đầu lẫn thanh loại.']
      ],
      sections: [
        {
          id: 'nghia-trong-cau',
          title: 'Máy bay hạ, giá hạ, người chịu phục',
          paragraphs: [
            'Trong 飞机降落, chiếc máy bay hạ xuống. Trong 商店降价, cửa hàng làm giá thấp đi. Hai kiểu cú pháp ấy đều dùng jiàng. Với 投降, chủ thể là người chịu phục. Với 降伏野马, chủ thể là người thuần phục và 野马 là con ngựa hoang phải chịu phục. Cả hai trường hợp đều thuộc nhánh xiáng.',
            'Vì thế, tìm xem động tác hướng vào điều gì sẽ có ích hơn chỉ nhìn vị trí chủ ngữ. Trong cụm 降伏野马, đọc 降伏 cùng nhau rồi mới xác định 野马 là con ngựa bị thuần phục.'
          ],
          table: {
            heading: 'Một chữ trong bốn tổ hợp',
            headers: ['Từ', 'Quan thoại', 'Nghĩa trong cảnh'],
            rows: [
              ['降落', 'jiàngluò', 'Hạ xuống, như máy bay hạ cánh'],
              ['降级 / 降价', 'jiàngjí / jiàngjià', 'Hạ cấp, giảm giá'],
              ['投降', 'tóuxiáng', 'Chịu thua, đầu hàng'],
              ['降伏', 'xiángfú', 'Chế phục hoặc thuần phục']
            ]
          },
          refs: ['moe-jiang', 'moe-xiang', 'moe-xiangfu']
        },
        {
          id: 'hai-phien-thiet',
          title: 'Hai dòng trong Quảng vận',
          paragraphs: [
            'Bản tra Quảng vận của Đại học Trung văn Hồng Kông ghi 古巷切 và 下江切. Trong phép phiên thiết, chữ đầu chỉ nhóm phụ âm đầu, chữ sau chỉ phần vần và thanh loại của hệ âm đương thời. Ở đây 古 đặt âm vào nhóm kiến 見, còn 下 đặt âm vào nhóm hạp 匣. Hai nhánh cũng tách nhau ở thanh khứ và thanh bình.',
            'Hệ thống của Thuyết văn còn cho ta thấy 夅 và 降 ở hai mục riêng. Mục 夅 giảng ý phục, mục 降 giảng ý xuống và nêu 夅 làm phần gợi âm. Đặt cạnh bảng Quảng vận, chi tiết ấy giúp ta hiểu vì sao một mặt chữ hiện nay có thể mang theo hai mục từ xưa.'
          ],
          table: {
            heading: 'Đối chiếu các nhánh âm',
            headers: ['Phiên thiết', 'Phân loại Trung cổ', 'Âm đối chiếu'],
            rows: [
              ['古巷切 · cổ hạng thiết', 'Kiến mẫu 見, khứ thanh, vần 絳', 'Giáng · jiàng'],
              ['下江切 · hạ giang thiết', 'Hạp mẫu 匣, bình thanh, vần 江', 'Hàng · xiáng']
            ]
          },
          refs: ['cuhk', 'moe-variant'],
          note: 'Phiên thiết là cách tra loại âm trong sách cổ. Giáng, hàng, jiàng và xiáng là âm đối chiếu thuộc hai truyền thống đọc hiện nay.'
        },
        {
          id: 'suong-giang',
          title: 'Thiều Chửu từng ghi cả sương hàng',
          paragraphs: [
            'Ở mục 降, Thiều Chửu đưa 霜降 làm ví dụ cho nghĩa rụng xuống và ghi “sương hàng”. Ông cũng ghi âm giáng cho việc hạ bậc, rồi lưu ý rằng người dùng phân biệt hàng ở nghĩa hàng phục với giáng ở những chữ nói lên xuống như 升降. Mục tra tiếng Việt hiện có cả “sương giáng” cho 霜降. Sự khác nhau ấy thuộc cách đọc một từ cụ thể trong những tài liệu khác nhau.',
            'Ngày nay, nếu nói một mức thấp đi, ta có thể mang chữ giáng trong “giáng chức” sang nhớ 降级 và 降温. Nếu nói người chịu thua, mang chữ hàng trong “đầu hàng” sang nhớ 投降. Đến một từ ít gặp, hãy tra cả tổ hợp như với 霜降 để thấy từ điển đặt âm vào nghĩa nào.'
          ],
          refs: ['thieu', 'moe-jiang', 'moe-xiang']
        }
      ],
      examples: [
        {
          han: '明天会降温。',
          py: 'Míngtiān huì jiàngwēn.',
          vi: 'Ngày mai trời sẽ lạnh hơn.',
          note: '明天 đặt thời gian. 会 báo dự đoán. 降温 là hạ nhiệt, và cả câu đang nói nhiệt độ sẽ giảm.'
        },
        {
          han: '飞机已经降落了。',
          py: 'Fēijī yǐjīng jiàngluò le.',
          vi: 'Máy bay đã hạ cánh rồi.',
          note: '降落 là sự kiện hạ xuống. 已经 và 了 cho biết việc đã xảy ra vào thời điểm nói.'
        },
        {
          han: '他们最后还是投降了。',
          py: 'Tāmen zuìhòu háishi tóuxiáng le.',
          vi: 'Cuối cùng họ vẫn đầu hàng.',
          note: '还是 mang ý rốt cuộc vẫn làm thế. Âm xiáng gắn với cả từ 投降.'
        }
      ],
      connections: [
        { han: '明天', why: 'Đặt mốc trước dự đoán 明天会降温. Đổi 明天 thành 今天 để nói trời trở lạnh hôm nay.' },
        { han: '便宜', why: '便宜 tả món đồ rẻ. 降价 kể giá đã hoặc sẽ được giảm. Cùng một món đồ có thể 降价 rồi mới trở nên 便宜.' },
        { han: '下来', why: 'Trong 价格降下来了, 下来 đi sau động từ để nói mức giá đã đi xuống. Nhánh jiàng hiện ra cùng hướng của bổ ngữ.' }
      ],
      quiz: {
        prompt: 'Bản tin có hai cụm 降价 và 投降. Theo thứ tự, chữ 降 đọc thế nào?',
        choices: ['jiàng · xiáng', 'xiáng · jiàng', 'jiàng · jiàng'],
        answer: 0,
        explain: '降价 hạ một mức giá nên đọc jiàng. 投降 nói việc chịu khuất phục nên đọc xiáng, tương ứng với chữ hàng trong đầu hàng.'
      },
      sources: [
        { id: 'cuhk', title: 'Đại học Trung văn Hồng Kông · mục 降', url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E9%99%8D', detail: 'Tra mục Quảng vận và bảng Trung cổ cho 古巷切, 下江切.' },
        { id: 'moe-variant', title: 'Dị thể tự tự điển · hai mục 降 và 夅', url: 'https://dict.variants.moe.edu.tw/dictView.jsp?ID=-48325', detail: 'Trích nguyên hai mục Thuyết văn và ghi nhận quan hệ dị thể trong các tự thư.' },
        { id: 'moe-jiang', title: 'Quốc ngữ từ điển giản biên · 降 jiàng', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=23507&la=0&powerMode=0', detail: 'Đối chiếu nghĩa xuống, hạ xuống và những tổ hợp như 降價, 降落.' },
        { id: 'moe-xiang', title: 'Quốc ngữ từ điển giản biên · 降 xiáng', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=28008&la=0&powerMode=0', detail: 'Xác nhận cả nghĩa chịu phục và làm cho phục.' },
        { id: 'moe-xiangfu', title: 'Quốc ngữ từ điển giản biên · 降伏', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=28009&la=0&powerMode=0', detail: 'Xác nhận xiángfú và cách dùng với ngựa hoang.' },
        { id: 'thieu', title: 'Thiều Chửu, Hán-Việt tự điển · mục 降', url: 'https://hvdic.thivien.net/whv/%E9%99%8D', detail: 'Bản chép mục từ ở hai cách đọc, trong đó có 霜降 “sương hàng”. Mục từ ghép trên trang cũng ghi “sương giáng”.' }
      ]
    },
    {
      id: 'dieu-dieu',
      glyph: '調',
      title: 'Vì sao “điều tra” 調查 đọc là diàochá?',
      deck: 'Thiều Chửu đã để lại ngay dưới chữ 調 một lời ghi về cách người Việt đọc “điều” ở những từ ông xếp dưới âm “điệu”.',
      category: 'âm',
      search: ['diao', 'tiao', 'điệu tra', 'điều động', 'điều chỉnh', '調查', '调查', '调整', '調整', '調', '调', '曲调', '声调', 'phiên thiết', 'Nguyễn Du'],
      intro: [
        'Đọc bản tin thấy 调查, ta nhận ra ngay hai tiếng “điều tra”. Đến lúc nghe mới vướng. Người nói đọc diàochá, cùng âm diào ở cuối 声调, “thanh điệu”. Sang 调整, nghĩa là điều chỉnh, chữ 调 lại đọc tiáo. Hóa ra hai tiếng “điều” nghe y hệt nhau trong tiếng Việt đang dẫn ta tới hai âm Quan thoại khác nhau.'
      ],
      summary: [
        ['Điều chỉnh · tiáo', '调整 tiáozhěng, thay đổi cho hợp.'],
        ['Điều tra · diào', '调查 diàochá, tìm hiểu sự việc có thực.'],
        ['Thanh điệu · diào', '声调 shēngdiào, sách ngữ âm dùng từ này cho sự lên xuống của tiếng.']
      ],
      sections: [
        {
          id: 'tu-dien-xua',
          title: 'Thiều Chửu ghi điệu tra, rồi chú thêm một dòng',
          paragraphs: [
            'Mở Hán-Việt tự điển tới mục 調, ta gặp điều hòa 調和 và điều đình 調停 ở nhóm đầu. Đến lượt “một âm là điệu”, Thiều Chửu đưa ra 調兵, 調任 và 調查, lần lượt chỉ việc sai phái binh lính, đổi chỗ nhận chức và tra xét. Ngay sau các nghĩa ấy, ông ghi một nhận xét về thói quen dùng âm điều. Bởi thế “điều tra” ta nói hằng ngày và “điệu tra” ở mục từ cổ có thể cùng chỉ một tổ hợp chữ.',
            '“Điệu” vẫn còn trong điệu đàn, điệu hát. Trong Sơ thu cảm hứng kỳ 2, Nguyễn Du nghe tiếng ve mà viết 其中自有清商調, “kỳ trung tự hữu thanh thương điệu”. Chữ 調 là danh từ ở cuối cụm 清商調. Tiếng ve trên cành cao gợi cho người nghe một điệu nhạc buồn.'
          ],
          refs: ['thieu', 'nguyen-du']
        },
        {
          id: 'van-thu',
          title: 'Cùng một phụ âm đầu trong hai dòng Quảng vận',
          paragraphs: [
            'Thuyết văn giảng 調 bằng chữ 和, nghĩa là hòa hợp. Trong Kinh Thi, câu 弓矢既調 nói cung và tên đã vừa với nhau. Chú giải của Trịnh Huyền giải chữ 調 bằng sự tương xứng giữa độ mạnh yếu của cung và độ nặng nhẹ của tên. Cách dùng ấy gần với điều chỉnh hôm nay ở chỗ làm các phần hợp nhau.',
            'Quảng vận ghi 徒聊切 cho mục thanh bình và 徒弔切 cho mục thanh khứ. Chữ đầu 徒 ở cả hai công thức đưa âm vào cùng nhóm định 定. Chữ sau đổi từ 聊 sang 弔, dẫn đến hai ô khác nhau của vận thư. Vậy sự khác biệt có thể nhận thấy ngay trong tư liệu cũ, trước khi đối chiếu với tiáo và diào ngày nay.'
          ],
          table: {
            heading: 'Hai âm đang xét trong bài',
            headers: ['Phiên thiết', 'Thanh loại Trung cổ', 'Âm đối chiếu'],
            rows: [
              ['徒聊切 · đồ liêu thiết', 'Bình 平, vần 蕭', 'Điều · tiáo'],
              ['徒弔切 · đồ điếu thiết', 'Khứ 去, vần 嘯', 'Điệu · diào']
            ]
          },
          note: 'Quảng vận còn ghi 張流切 cho chữ 調 ở một mục riêng. Bảng này chỉ đối chiếu hai nhánh cần dùng cho những từ đang gặp.',
          refs: ['cuhk', 'kinh-thi']
        },
        {
          id: 'hom-nay',
          title: 'Nhớ bằng việc người nói đang làm',
          paragraphs: [
            'Sửa giờ họp để mọi người đến được, ta dùng 调整时间, đọc tiáozhěng shíjiān. Chuyển nhân viên sang một bộ phận, ta dùng 调动人员, đọc diàodòng rényuán. Cần hỏi han, thu thập thông tin về một việc, dùng 调查, đọc diàochá. Nhánh diào còn gặp ở danh từ 曲调 chỉ giai điệu và 声调 chỉ thanh điệu.',
            'Có lúc đúng hai chữ cũng có hai cách đọc. Từ điển ghi 调配 diàopèi khi điều phối công việc hoặc nguồn lực, và tiáopèi khi pha phối nguyên liệu. Lúc gặp một lời như 重新调配工作, chữ 工作 chỉ ra ngay cảnh điều phối. Nếu đang đọc cách pha đồ uống, hãy xét nghĩa phối trộn.'
          ],
          table: {
            heading: 'Đọc theo cả từ',
            headers: ['Từ đang gặp', 'Quan thoại', 'Công việc hoặc sự vật'],
            rows: [
              ['调整', 'tiáozhěng', 'Điều chỉnh lại cho phù hợp'],
              ['调查 / 调动', 'diàochá / diàodòng', 'Điều tra sự việc hoặc điều động người'],
              ['曲调 / 声调', 'qǔdiào / shēngdiào', 'Giai điệu hoặc thanh điệu']
            ]
          },
          refs: ['moe-adjust', 'moe-investigate', 'moe-transfer', 'moe-song', 'moe-tone', 'moe-distribute', 'moe-mix']
        }
      ],
      examples: [
        {
          han: '我们得调整明天的工作时间。',
          py: 'Wǒmen děi tiáozhěng míngtiān de gōngzuò shíjiān.',
          vi: 'Chúng ta phải điều chỉnh giờ làm ngày mai.',
          note: '得 ở đây đọc děi, nghĩa là phải. 调整 đi nguyên khối với đối tượng 明天的工作时间.'
        },
        {
          han: '他们正在调查这件事。',
          py: 'Tāmen zhèngzài diàochá zhè jiàn shì.',
          vi: 'Họ đang điều tra việc này.',
          note: '正在 đặt hành động vào lúc nó đang diễn ra. 调查 đứng trước đối tượng 这件事. 件 đếm việc.'
        },
        {
          han: '这首歌的曲调很好听。',
          py: 'Zhè shǒu gē de qǔdiào hěn hǎotīng.',
          vi: 'Bài hát này có giai điệu rất hay.',
          note: '这首歌的 bổ nghĩa cho 曲调. Cả cụm danh từ đứng trước 很好听 để nêu thứ được nhận xét.'
        }
      ],
      connections: [
        { han: '工作', why: 'Trong 工作时间, 工作 quy định loại thời gian. Đặt cả cụm sau 调整 để nói điều chỉnh giờ làm.' },
        { han: '歌', why: 'Thêm lượng từ 首 được 这首歌. Thêm 的曲调 thì chuyển từ bài hát sang chính giai điệu của bài.' },
        { han: '听', why: '好听 là nghe hay, một nhận xét về âm thanh. Trong 听声调, 听 là động tác còn 声调 là thứ bạn lắng nghe.' }
      ],
      quiz: {
        prompt: 'Trong 调整时间, 调查情况 và 声调, lần lượt đọc chữ 调 thế nào?',
        choices: ['tiáo · tiáo · diào', 'tiáo · diào · diào', 'diào · diào · tiáo'],
        answer: 1,
        explain: '调整 là chỉnh cho phù hợp. 调查 là tìm rõ tình hình, còn 声调 gọi một đặc điểm âm thanh. Tiếng Việt nói điều chỉnh và điều tra với cùng tiếng điều, nên cần học cách đọc theo từng từ.'
      },
      sources: [
        { id: 'thieu', title: 'Thiều Chửu, Hán-Việt tự điển · mục 調', url: 'https://hvdic.thivien.net/whv/%E8%AA%BF', detail: 'Bản chép mục từ ghi “điệu tra” và thói quen dùng “điều” cho một số nghĩa.' },
        { id: 'nguyen-du', title: 'Nguyễn Du · Sơ thu cảm hứng kỳ 2', url: 'https://www.thivien.net/Nguy%E1%BB%85n-Du/S%C6%A1-thu-c%E1%BA%A3m-h%E1%BB%A9ng-k%E1%BB%B3-2/poem-3ME1lWwwFcJanoeXlQmUDg', detail: 'Nguyên văn 其中自有清商調 và tên bài thơ trong Bắc hành tạp lục.' },
        { id: 'cuhk', title: 'Đại học Trung văn Hồng Kông · mục 調', url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E8%AA%BF', detail: 'Các mục Thuyết văn, Quảng vận và chú giải của Trịnh Huyền về chữ 調.' },
        { id: 'kinh-thi', title: 'Kinh Thi, Tiểu nhã · Xa công, bản Điền gian thi học', url: 'https://www.shidianguji.com/zh/book/SK0269/chapter/1m2bcn7icok63', detail: 'Nguyên văn câu 弓矢既調 trong bài Xa công.' },
        { id: 'moe-adjust', title: 'Quốc ngữ từ điển tu đính · 調整', url: 'https://dict.revised.moe.edu.tw/dictView.jsp?ID=52662', detail: 'Xác nhận tiáozhěng trong nghĩa điều chỉnh, sắp xếp lại.' },
        { id: 'moe-investigate', title: 'Quốc ngữ từ điển giản biên · 調查', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=8755', detail: 'Xác nhận diàochá trong nghĩa tìm hiểu tình hình thực tế.' },
        { id: 'moe-transfer', title: 'Quốc ngữ từ điển tu đính · 調動', url: 'https://dict.revised.moe.edu.tw/dictView.jsp?ID=46005', detail: 'Xác nhận diàodòng trong nghĩa chuyển đổi, điều động.' },
        { id: 'moe-song', title: 'Quốc ngữ từ điển giản biên · 曲調', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=25919&la=0&powerMode=0', detail: 'Xác nhận qǔdiào dùng cho giai điệu trong âm nhạc.' },
        { id: 'moe-tone', title: 'Quốc ngữ từ điển giản biên · 聲調', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=35125&la=0&powerMode=1', detail: 'Xác nhận shēngdiào và nghĩa âm cao thấp, lên xuống.' },
        { id: 'moe-distribute', title: 'Quốc ngữ từ điển giản biên · 調配 diàopèi', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=8738&la=0&powerMode=0', detail: 'Cách đọc khi phân bổ, điều phối công việc.' },
        { id: 'moe-mix', title: 'Quốc ngữ từ điển giản biên · 調配 tiáopèi', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=10984&la=0&powerMode=0', detail: 'Cách đọc khi pha phối, có ví dụ đồ uống.' }
      ]
    }
  ]);
})();
