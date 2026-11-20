(function () {
  'use strict';

  window.HAN_DEEP_READING_DATA.add([
    {
      id: 'tat-va-bat',
      glyph: '畢 弼',
      title: 'Vì sao bì có thể là tất hoặc bật?',
      deck: 'Nghe giống nhau trong Quan thoại, 畢 và 弼 để lại hai dấu vết khác nhau trong tiếng Việt. Cặp 賓 và 彬 cho thấy sự khác biệt ấy nằm ở đâu trong sách vận.',
      category: 'âm',
      search: ['畢業', '毕业', '畢', '毕', '弼', '賓', '宾', '彬', 'bìyè', 'bì', 'bīn', 'tất', 'bật', 'tân', 'bân', 'dân', 'mân', 'trùng nữu', 'phiên thiết', 'Phi Luật Tân'],
      intro: [
        'Trong câu 她今年毕业, bạn nghe bìyè và hiểu ngay “năm nay cô ấy tốt nghiệp”. Chữ đầu là 畢, chữ “tất” trong “hoàn tất”. Cũng tiếng bì ấy, đọc đến 弼 trong văn cổ thì người Việt gọi là “bật”, với nghĩa phò giúp. Vì sao một tiếng nghe như nhau lại có hai âm Hán Việt?',
        'Muốn thấy chỗ rẽ, hãy đặt sách vận cạnh tiếng Việt, rồi thử một cặp khác. 賓 trong “tân khách” và 彬 trong “bân bân hữu lễ” cùng đọc bīn ngày nay. Khi hai chữ này đứng cạnh nhau, ta thấy rõ hơn điều mà pinyin đã gộp lại.'
      ],
      summary: [
        ['畢 bì', 'tất · làm xong, như 毕业'],
        ['弼 bì', 'bật · phò giúp, thường gặp trong văn cũ'],
        ['賓／彬 bīn', 'tân／bân · khác nhau trong âm Hán Việt']
      ],
      sections: [
        {
          id: 'hai-tieng-bi',
          title: 'Từ lễ tốt nghiệp về trang sách vận',
          paragraphs: [
            'Hai dòng 《廣韻》 cho ta hai cách ghi. 畢 ở tiểu vận 卑吉切, lấy 卑 chỉ phụ âm đầu, 吉 chỉ vần và thanh. 弼 ở tiểu vận 房密切, lấy 房 và 密 làm hai chữ chú âm. Tên gọi “phiên thiết” chỉ cách ghép những thành phần âm được quy chiếu trong hệ thống của sách.',
            '畢 thuộc thanh mẫu 幫, 弼 thuộc 並. Cả hai được xếp vào nhóm vần nhập 質. Âm “tất” và “bật” còn giữ đuôi -t, với hai phụ âm đầu và hai thanh khác nhau. Trong cụm 毕业 bìyè, 畢 mang nghĩa hoàn thành. Trong văn cổ, 弼 chỉ việc giúp đỡ hoặc uốn sửa cho đúng, như trong 輔弼 “phò tá”.'
          ],
          table: {
            heading: 'Mỗi chữ đi với một mục riêng',
            headers: ['Chữ và âm Hán Việt', 'Phiên thiết', 'Nghĩa trong ngữ cảnh'],
            rows: [
              ['畢／毕 · tất', '卑吉切 · ti cát thiết', 'Kết thúc, hoàn thành trong 毕业'],
              ['弼 · bật', '房密切 · phòng mật thiết', 'Phò giúp trong 輔弼']
            ]
          },
          refs: ['guangyun-bi', 'park', 'bi-modern', 'bi-assist']
        },
        {
          id: 'trung-nuu',
          title: 'Đặt tân và bân vào cùng một bảng',
          paragraphs: [
            'Cặp 賓 và 彬 cho phép giữ nguyên thanh mẫu 幫, cùng vần Chân và cùng thanh bình. Điểm tách nằm ở tiểu vận và ở vị trí trên vận đồ. 賓 được ghi 必鄰切, 彬 được ghi 府巾切. Trong phép đối chiếu của Park Ji Hoon, 彬 nằm hàng III và 賓 nằm hàng IV. Hai chữ cùng thuộc lớp vần tam đẳng xét theo hệ thống vần sách, còn III và IV ở đây là hàng khi đưa âm lên vận đồ. Sự phân đôi ấy được gọi là trùng nữu 重紐.',
            'Đối chiếu thêm 珉 “mân” với 民 “dân”, đều ở thanh mẫu 明. Một số cặp của lớp Hán Việt thường giữ âm đầu môi ở hàng III và có âm đầu lưỡi ở hàng IV, chẳng hạn b–t, m–d. Phan và de Sousa dùng các cặp như 岷 “mân” và 民 “dân” để giải thích cách sự phân biệt còn thấy ở âm đầu tiếng Việt. Park cũng ghi những trường hợp kết quả phức tạp hơn, như 皮 và 陴 đều có cách đọc “bì”.'
          ],
          table: {
            heading: 'Hai cặp trong bảng của Park',
            headers: ['Thanh mẫu', 'Hàng III', 'Hàng IV'],
            rows: [
              ['幫', '彬 bân · 府巾切', '賓 tân · 必鄰切'],
              ['明', '珉 mân · 武巾切', '民 dân · 彌鄰切']
            ]
          },
          refs: ['park', 'phan', 'guangyun-bin-guest', 'guangyun-bin-grace', 'baxter'],
          note: 'Bảng Baxter–Sagart ghi 畢 là pjit và 賓 là pjin ở cột chuyển tự Trung cổ. Các ký hiệu cho biết cách phân loại âm từ tư liệu, còn giá trị phát âm cụ thể là vấn đề tái lập. Ở cặp 畢–弼, thanh mẫu cũng thay đổi. 賓–彬 là cặp dễ soi hơn khi chỉ xét hàng III và IV.'
        },
        {
          id: 'tu-tan-khach',
          title: 'Tân trong tân khách là ai?',
          paragraphs: [
            'Đọc 賓客 là “tân khách”, trong đó 賓 cũng chỉ khách. Gặp 宾馆 bīnguǎn trên biển, bạn đang tìm một chỗ lưu trú. “Tân” ở đây còn có mặt trong “Phi Luật Tân” 菲律賓, tên đọc Hán Việt của Philippines. Trong “tân niên” 新年, tiếng “tân” lại biểu thị sự mới. Cả hai trùng âm Hán Việt, còn tiếng Trung đọc 賓 là bīn và 新 là xīn.',
            '彬 có câu cổ 文質彬彬，然後君子 trong 《論語》. Ở đây 彬彬 tả sự hài hòa giữa dáng vẻ đã được trau chuốt 文 và chất mộc 質. Sang cụm 彬彬有礼 bīnbīn yǒulǐ, lời khen tập trung vào cách cư xử lịch thiệp. Đặt cụm ấy sau 待人 để tả cách một người đối đãi với người khác.'
          ],
          refs: ['guangyun-bin-guest', 'guangyun-bin-grace', 'hotel', 'courteous']
        }
      ],
      examples: [
        {han: '我打算毕业以后找工作。', py: 'Wǒ dǎsuàn bìyè yǐhòu zhǎo gōngzuò.', vi: 'Tôi định tìm việc sau khi tốt nghiệp.', note: '毕业以后 đặt mốc cho việc 找工作. Trong câu tiếng Việt, “tốt nghiệp” là cách dịch của cả từ 毕业.'},
        {han: '我们先到宾馆放行李，再去吃饭。', py: 'Wǒmen xiān dào bīnguǎn fàng xíngli, zài qù chī fàn.', vi: 'Chúng tôi đến khách sạn cất hành lý trước rồi đi ăn.', note: '先…再… đặt hai việc theo thứ tự. 宾馆 chỉ nơi đến. 行李 đọc xíngli trong cách ghi Phổ thông của bài.'},
        {han: '他待人彬彬有礼。', py: 'Tā dàirén bīnbīn yǒulǐ.', vi: 'Anh ấy đối xử với mọi người rất lịch thiệp.', note: '待人 đặt câu chuyện trong cách đối đãi với người khác. 彬彬有礼 là cả lời nhận xét.'}
      ],
      connections: [
        {han: '学习', why: '学习 nói quá trình học. 毕业 nói đến mốc đã hoàn thành chương trình học.'},
        {han: '工作', why: 'Ghép với 找 thành 找工作 “tìm việc”, việc dự định sau mốc 毕业以后 trong câu mẫu.'},
        {han: '新', why: '新 xīn là “tân” trong 新年. 賓 bīn là “tân” trong 賓客. Gắn mỗi âm Việt với đúng chữ và nghĩa.'}
      ],
      quiz: {
        prompt: 'Nghe bīn trong 宾馆 và 彬彬有礼. Vì sao bài đem cả hai chữ vào một phép đối chiếu?',
        choices: ['Cùng âm bīn hiện đại, nhưng 《廣韻》 ghi hai phiên thiết và tiếng Việt còn phân biệt tân với bân.', 'Hai chữ thuộc một tiểu vận, còn âm bân xuất hiện do lặp chữ trong 彬彬.', 'Cả hai chữ đều mang nghĩa “khách”, rồi khác âm Việt khi ghép vào từ dài.'],
        answer: 0,
        explain: '賓 có 必鄰切 và âm tân, 彬 có 府巾切 và âm bân. Hai chữ cùng thanh mẫu 幫 nhưng được xếp khác hàng trên vận đồ. Cách lặp 彬彬 và nghĩa “lịch thiệp” thuộc một ngữ cảnh riêng.'
      },
      sources: [
        {id: 'guangyun-bi', title: 'Đại học Trung Văn Hồng Kông · mục 畢 trong 《廣韻》', url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E7%95%A2', detail: 'Mục 畢, trang 470, 卑吉 và nhóm 幫／入／質.'},
        {id: 'park', title: 'Park Ji Hoon · Hiện tượng trùng nữu ở Thần âm trong tiếng Việt', url: 'https://hannom.vass.gov.vn/nghien-cuu-van-ban/hien-tuong-quot-trung-nuu-quot-o-than-am-trong-tieng-viet-tap-chi-han-nom-so-6-97-2009-tr-45-52-506443', detail: 'Tạp chí Hán Nôm 6 (2009), tr. 45–52. Mục II-1-3 có vần Chân và Chất, gồm 賓／彬, 民／珉, 弼 房密. Mục III cho các trường hợp có kết quả khác.'},
        {id: 'phan', title: 'John D. Phan và Hilário de Sousa · Southwestern Middle Chinese', url: 'https://hilario.bambooradical.com/downloadables/Phan-de-Sousa-2022-Southwestern-Middle-Chinese.pdf', detail: 'Bài Preliminary Evidence from Hunan, Guangxi, and Sino-Vietnamese, tr. 59–79. Bảng 7 đối chiếu trùng nữu III và IV, trong đó có 岷／民.'},
        {id: 'baxter', title: 'Baxter và Sagart · Bảng chuyển tự Trung cổ và tái lập Thượng cổ', url: 'https://sites.lsa.umich.edu/ocbaxtersagart/wp-content/uploads/sites/1415/2025/03/BaxterSagartOCbyMandarinMC2014-09-20.pdf', detail: 'Lời mở đầu định nghĩa cột MC. Hai dòng 畢 “finish” và 賓 “guest” ghi pjit và pjin.'},
        {id: 'guangyun-bin-guest', title: 'Đại học Trung Văn Hồng Kông · mục 賓', url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E8%B3%93', detail: 'Ghi 必鄰切, nghĩa khách và cách ghép 賓客.'},
        {id: 'guangyun-bin-grace', title: 'Đại học Trung Văn Hồng Kông · mục 彬', url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E5%BD%AC', detail: 'Ghi 府巾切 và dẫn 文質彬彬 trong 《論語·雍也》.'},
        {id: 'bi-modern', title: 'Từ điển Bộ Giáo dục Đài Loan · 畢業', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=1363&la=0&powerMode=0', detail: 'Đọc bìyè, hoàn thành chương trình quy định của trường hoặc lớp đào tạo.'},
        {id: 'bi-assist', title: 'Từ điển Bộ Giáo dục Đài Loan · 弼', url: 'https://dict.revised.moe.edu.tw/dictView.jsp?ID=407&la=0&powerMode=0', detail: 'Đọc bì, mục nghĩa phò giúp và sửa sai.'},
        {id: 'hotel', title: 'Từ điển Bộ Giáo dục Đài Loan · 賓館', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=1707&q=1', detail: 'Ghi bīnguǎn và nghĩa cơ sở cho khách lưu trú hoặc nghỉ ngơi.'},
        {id: 'courteous', title: 'Từ điển Bộ Giáo dục Đài Loan · 彬彬有禮', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=1702&la=0&powerMode=0', detail: 'Âm đọc và nghĩa cư xử có lễ phép.'}
      ]
    },
    {
      id: 'hanh-va-hang',
      glyph: '行',
      title: 'Vì sao 行 trong 银行 đọc háng?',
      deck: 'Từ gửi hành lý đến ghé ngân hàng, vài chữ 行 trong một ngày đi đường đủ để lần ra “hành”, “hàng”, “hạnh” và hai cách đọc 品行.',
      category: 'nghĩa',
      search: ['行', '银行', '銀行', '行李', '品行', '行不行', '行人', '旅行', '行业', '行業', '三人行', '師', '师', '老师', 'háng', 'xíng', 'xìng', 'hàng', 'hành', 'hạnh', 'hạng', 'ngân hàng', 'hành lý', 'đức hạnh'],
      intro: [
        'Trước khi ra sân bay, bạn định ghé 银行 lấy tiền rồi về khách sạn lấy 行李. Nhìn chữ thì đều thấy 行. Nói ra, một tiếng là háng trong yínháng, một tiếng là xíng trong xíngli. Tiếng Việt phân biệt ngay ở hai từ rất quen, “ngân hàng” và “hành lý”.',
        'Đến khi gặp chữ ấy trong “đức hạnh”, ta có thêm một câu hỏi. Vì sao cùng một mặt chữ lại đi với cả chuyến đi, nghề nghiệp và cách cư xử? Những dòng phiên thiết trong 《廣韻》 cho thấy cách người xưa ghi từng nhóm nghĩa theo âm.'
      ],
      summary: [
        ['行李 xíngli', 'Hành lý mang theo khi đi.'],
        ['银行 yínháng', 'Ngân hàng, một cơ sở tài chính.'],
        ['品行', 'Phẩm hạnh · pǐnxíng trong danh mục Phổ thông, pǐnxìng trong từ điển Đài Loan.']
      ],
      sections: [
        {
          id: 'sach-van',
          title: 'Bốn dòng phiên thiết của một chữ',
          paragraphs: [
            'Bản 《校正宋本廣韻》 xếp 行 nghĩa “bước, đi, đến” ở vần 庚, cùng bình thanh với 行 nghĩa “hàng lối” ở vần 唐. Hai dòng khác thuộc khứ thanh. Một dòng ghi thứ tự, một dòng ghi dấu vết hoặc điều người ta làm, nói. Nói cách khác, tiếng Việt “hành”, “hàng”, “hạnh” có sẵn những nhóm âm nghĩa để đối chiếu trong tư liệu cũ.',
            'Nhóm tác giả ở Viện Nghiên cứu Văn Triết Trung Quốc đọc nghĩa “hành vi” như một sự mở rộng có quan hệ với bên “bước đi, thực hành”. Đó là cách họ giải thích quá trình phát triển của các nghĩa dựa trên chữ cổ và văn bản. Bốn lời cắt là dẫn chứng trực tiếp trong sách vận, còn thứ tự lịch sử giữa các nghĩa là kết quả phân tích của nghiên cứu.'
          ],
          table: {
            heading: 'Ghi theo bản Tống được nghiên cứu trích',
            headers: ['Phiên thiết', 'Vần và thanh', 'Âm Việt và nghĩa đối chiếu'],
            rows: [
              ['戶庚切', '庚 · bình', 'Hành · bước đi, tới, rời đi'],
              ['胡郎切', '唐 · bình', 'Hàng · đội ngũ, dãy'],
              ['下更切', '映 · khứ', 'Hạnh · dấu vết, việc làm, lời nói'],
              ['下浪切', '宕 · khứ', 'Hạng · thứ tự, thứ bậc']
            ]
          },
          refs: ['xing-history', 'thieu-xing'],
          note: 'Cột nghĩa ghi trong sách vận phản ánh từng mục cổ. Cách đọc trong từ hiện đại được tra theo cả từ và theo chuẩn đang học.'
        },
        {
          id: 'cung-mot-ngay',
          title: 'Đi một chuyến, gặp hai tiếng',
          paragraphs: [
            'Khi hỏi chỗ gửi đồ, 行李 là cả danh từ chỉ đồ mang theo chuyến đi. Học liền hai chữ với xíng. Từ này còn có một đời sống khác trong 《左傳》. Câu 行李之往來 đặt giữa lời thuyết phục nước Tần giữ nước Trịnh làm nơi tiếp đón. Theo chú giải từ điển, 行李 trong chính câu ấy chỉ sứ giả qua lại. Cùng dạng chữ, nghĩa truy ra từ người được tiếp đón trong câu.',
            'Đến 银行 yínháng thì 行 thuộc nhóm chỉ cơ sở buôn bán hoặc nghề. Từ điển Đài Loan đặt 银行／銀行 và 分行 “chi nhánh” cạnh 商行 “hãng buôn” ở nghĩa này. 一行字 “một dòng chữ” cũng đọc háng, với nghĩa hàng dãy. Hai nghĩa đó cho bạn cách nhận họ gần của từ, rồi cả 银行 dịch gọn là “ngân hàng”.'
          ],
          refs: ['xing-luggage', 'zuo', 'xing-hang', 'bank', 'mainland']
        },
        {
          id: 'thay-tren-duong',
          title: 'Học bạn trên đường đi',
          paragraphs: [
            'Câu “Học thầy không tày học bạn” trong ảnh bạn gửi gợi nhớ một đoạn 《論語·述而》, 三人行，必有我師焉, nghĩa là khi ba người cùng đi, thế nào cũng có người để mình học hỏi. Đọc theo tiếng Quan thoại là Sān rén xíng, bì yǒu wǒ shī yān.',
            'Ngắt 三人／行 và 必／有／我師／焉. 三人 là chủ ngữ, 行 là động từ “đi”. 有 nói trong nhóm có một người như thế. 我師 là “thầy của tôi” trong lối cổ, gần với 我的老师 ở lời nói hiện nay. Trong câu này 焉 quy chiếu về nhóm người ấy. Chú giải cổ còn nói ta có thể học điều hay của người khác và nhìn điều dở để tự sửa mình.'
          ],
          refs: ['analects-shu-er', 'thieu-xing']
        },
        {
          id: 'pham-hanh',
          title: 'Phẩm hạnh đọc khác tùy chuẩn',
          paragraphs: [
            'Trong 品行 “phẩm hạnh”, 行 chỉ cách cư xử xét về đạo đức. Âm “hạnh” còn thấy trong “đức hạnh” 德行. Nếu nghe tiếng ở Đài Loan, bạn có thể gặp pǐnxìng, đúng như mục 品行 của từ điển Bộ Giáo dục Đài Loan. Danh mục GF 0015–2010 của Bộ Giáo dục Trung Quốc đại lục ghi cùng từ là pǐnxíng. Vì vậy hai người đọc chuẩn theo hai nguồn có thể dùng dấu thanh khác nhau ở chữ thứ hai.',
            'Hãy thử dùng 行 trong câu hỏi 这样行不行？ Ở đây 行 mang nghĩa “được”, diễn đạt một phương án có thể chấp nhận. Vị ngữ 行不行 đặt khẳng định và phủ định kề nhau để hỏi ý. Bạn đáp 行 hoặc 可以 đều được. Chỉ một chữ 行 đủ đứng thay cho cả lời đồng ý trong lượt nói đó.'
          ],
          refs: ['mainland', 'pinxing-taiwan', 'xing-modern', 'thieu-xing']
        }
      ],
      examples: [
        {han: '我先去银行取钱，再回宾馆拿行李。', py: 'Wǒ xiān qù yínháng qǔ qián, zài huí bīnguǎn ná xíngli.', vi: 'Tôi ghé ngân hàng rút tiền trước rồi quay về khách sạn lấy hành lý.', note: '银行 và 行李 gọi hai thứ khác nhau trong cùng lịch trình. Giữ cả mỗi từ khi nhìn chữ để chọn háng và xíng.'},
        {han: '我们明天出发，这样行不行？', py: 'Wǒmen míngtiān chūfā, zhèyàng xíng bu xíng?', vi: 'Ngày mai mình khởi hành, vậy được không?', note: '这样 nhắc lại phương án vừa nêu. 行不行 hỏi xác nhận bằng mẫu A不A. 不 trong mẫu có thể đọc nhẹ.'},
        {han: '这家银行有两个分行。', py: 'Zhè jiā yínháng yǒu liǎng ge fēnháng.', vi: 'Ngân hàng này có hai chi nhánh.', note: '家 đi với tổ chức 银行. 分行 là chi nhánh, cũng đọc háng. So với 总行 “trụ sở chính của ngân hàng”.'}
      ],
      connections: [
        {han: '旅游', why: '旅游 nói đi du lịch. Khi kể về chuyến đi có thể dùng 旅行 và nói thêm 行李 để chỉ đồ mang theo.'},
        {han: '老师', why: '师 là dạng giản thể của 師. Trong 我師 của câu cổ, “thầy” là bất kỳ người nào có điều cho ta học hỏi.'},
        {han: '可以', why: 'Đáp 可以 hoặc 行 khi đồng ý phương án trong câu 这样行不行？'}
      ],
      quiz: {
        prompt: 'Trong 我先去银行，再回宾馆拿行李, hai chữ 行 đọc theo thứ tự nào?',
        choices: ['xíng rồi háng', 'háng rồi xíng', 'cả hai háng'],
        answer: 1,
        explain: '银行 yínháng chỉ cơ sở giao dịch, thuộc nhóm 行 háng. 行李 xíngli là đồ mang theo chuyến đi, với âm xíng. Hai mặt chữ giống nhau được đọc theo hai từ khác nhau.'
      },
      sources: [
        {id: 'xing-history', title: 'Trịnh Cát Hùng và cộng sự · 先秦經典「行」字字義的原始與變遷', url: 'https://www.litphil.sinica.edu.tw/bulletin/35/35-089-127.pdf#page=7', detail: 'Bài nghiên cứu năm 2009, tr. 95–96. Bốn phiên thiết, nghĩa và số trang bản 《校正宋本廣韻》 ở chú thích 25–28.'},
        {id: 'thieu-xing', title: 'Thiều Chửu · Hán Việt tự điển, mục 行', url: 'https://hvdic.thivien.net/whv/%E8%A1%8C', detail: 'Bản tra cứu số có phần riêng mang tên Thiều Chửu, cho các âm hành, hàng, hạnh và hạng.'},
        {id: 'xing-luggage', title: 'Từ điển Bộ Giáo dục Đài Loan · 行李', url: 'https://dict.revised.moe.edu.tw/dictView.jsp?ID=110773&la=0&powerMode=0', detail: 'Hai nghĩa sứ giả và đồ đem theo, dẫn 《左傳》 năm Hi Công thứ 30.'},
        {id: 'zuo', title: '《左傳》 · 燭之武退秦師', url: 'https://zh.wikisource.org/zh/%E7%87%AD%E4%B9%8B%E6%AD%A6%E9%80%80%E7%A7%A6%E5%B8%AB', detail: 'Văn bản truyền lại của đoạn thuyết phục nước Tần, chứa câu 行李之往來.'},
        {id: 'xing-hang', title: 'Từ điển Bộ Giáo dục Đài Loan · 行 đọc háng', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=19765', detail: 'Các nghĩa dãy, nghề, cơ sở buôn bán và đơn vị đếm theo hàng.'},
        {id: 'bank', title: 'Từ điển Bộ Giáo dục Đài Loan · 銀行', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=42074&la=0&powerMode=0', detail: 'Ghi yínháng và nghĩa tổ chức tài chính.'},
        {id: 'mainland', title: 'Bộ Giáo dục Trung Quốc · GF 0015–2010', url: 'https://www.moe.gov.cn/jyb_sjzl/ziliao/A19/201010/W020220124393643101738.pdf', detail: 'Danh mục Phổ thông ghi 行李 xíngli, 银行 yínháng và 品行 pǐnxíng. Có thể tìm ba chữ ghép ngay trong PDF.'},
        {id: 'analects-shu-er', title: '《論語註疏》 · thiên 述而, quyển 7', url: 'https://zh.wikisource.org/zh-hant/%E8%AB%96%E8%AA%9E%E8%A8%BB%E7%96%8F/%E5%8D%B707', detail: 'Câu 三人行，必有我師焉 và phần chú sớ giải mối liên hệ giữa học người khác và tự sửa mình.'},
        {id: 'pinxing-taiwan', title: 'Từ điển Bộ Giáo dục Đài Loan · 品行', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=3265', detail: 'Cho pǐnxìng và nghĩa phẩm chất, đức hạnh.'},
        {id: 'xing-modern', title: 'Từ điển Bộ Giáo dục Đài Loan · 行 đọc xíng', url: 'https://dict.concised.moe.edu.tw/dictView.jsp?ID=28209&la=0&powerMode=0', detail: 'Các nghĩa đi, thực hiện và “được, có thể”.'}
      ]
    }
  ]);
})();
