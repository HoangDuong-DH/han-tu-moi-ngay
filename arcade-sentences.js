window.HAN_ARCADE_SENTENCES = [
  {
    id: 'polite-question',
    level: 1,
    target: '请问',
    topics: ['register', 'space-time'],
    frames: [
      {
        tiles: ['请问，', '车站', '在', '哪儿'],
        suffix: '？',
        py: 'Qǐngwèn, chēzhàn zài nǎr?',
        vi: 'Xin hỏi, bến xe ở đâu ạ?',
        hint: 'Mở lời lịch sự rồi hỏi về chỗ của một nơi đã biết tên.',
        why: '请问 là một lời mở đầu trọn cụm. Sau đó nêu nơi cần tìm là 车站, rồi dùng 在 để nối với vị trí. 哪儿 nằm đúng chỗ của địa điểm mà người nghe sẽ điền vào khi trả lời.'
      },
      {
        tiles: ['请问，', '这件衣服', '要', '多少钱'],
        suffix: '？',
        py: 'Qǐngwèn, zhè jiàn yīfu yào duōshao qián?',
        vi: 'Xin hỏi, chiếc áo này giá bao nhiêu ạ?',
        hint: 'Ở quầy quần áo, xác định món đang chỉ rồi hỏi số tiền.',
        why: '这 và lượng từ 件 xác định món đồ đang chỉ, nên cả 这件衣服 nằm trên một mảnh. Sau 要 «có giá» là 多少钱, đứng ở chỗ của giá tiền người bán sẽ trả lời.'
      }
    ]
  },
  {
    id: 'place-before-action',
    level: 1,
    target: '在',
    topics: ['space-time', 'gia'],
    frames: [
      {
        prefix: '哥哥',
        tiles: ['在', '学校', '打篮球'],
        suffix: '。',
        py: 'Gēge zài xuéxiào dǎ lánqiú.',
        vi: 'Anh trai tôi chơi bóng rổ ở trường.',
        hint: 'Sau người chơi, đặt địa điểm trước hoạt động.',
        why: '在学校 cho biết nơi anh trai chơi. Cụm nơi chốn đứng trước 打篮球. Giữ 打篮球 thành một mảnh vì 打 và 篮球 cùng gọi tên môn anh ấy chơi.'
      },
      {
        prefix: '奶奶',
        tiles: ['在', '家', '包饺子'],
        suffix: '。',
        py: 'Nǎinai zài jiā bāo jiǎozi.',
        vi: 'Bà nội gói sủi cảo ở nhà.',
        hint: 'Hãy xác định bà gói ở đâu trước khi nói bà gói gì.',
        why: '在 đi với 家 để đặt cảnh ở nhà. Sau cụm nơi chốn là 包饺子. 包 đứng cùng 饺子 để cho biết cả động tác gói lẫn món được gói.'
      }
    ]
  },
  {
    id: 'like-doing',
    level: 1,
    target: '喜欢',
    topics: ['ai'],
    frames: [
      {
        prefix: '我',
        tiles: ['喜欢', '听', '中文歌'],
        suffix: '。',
        py: 'Wǒ xǐhuan tīng Zhōngwén gē.',
        vi: 'Tôi thích nghe các bài hát tiếng Trung.',
        hint: 'Điều được thích là một hoạt động. Nghe gì đi sau hành động nghe.',
        why: '喜欢 đứng trước việc mình thích làm là 听中文歌. 中文 bổ nghĩa cho 歌, nên cả cụm danh từ đứng cùng một mảnh sau 听.'
      },
      {
        prefix: '她',
        tiles: ['喜欢', '给朋友', '做饭'],
        suffix: '。',
        py: 'Tā xǐhuan gěi péngyou zuò fàn.',
        vi: 'Cô ấy thích nấu cơm cho bạn bè.',
        hint: 'Xếp người được hưởng vào bên trong hoạt động cô ấy thích.',
        why: 'Điều cô ấy thích là cả việc 给朋友做饭. Giữ 给朋友 liền nhau để nói cơm nấu cho ai. Cụm ấy đứng trước hoạt động 做饭.'
      }
    ]
  },
  {
    id: 'ask-permission',
    level: 1,
    target: '可以',
    topics: ['register', 'hanh-va-hang'],
    frames: [
      {
        prefix: '我',
        tiles: ['可以', '坐这儿', '吗'],
        suffix: '？',
        py: 'Wǒ kěyǐ zuò zhèr ma?',
        vi: 'Tôi ngồi chỗ này được không ạ?',
        hint: 'Đây là câu xin phép với câu trả lời có hoặc không.',
        why: '可以 đứng trước việc xin phép là 坐这儿. Giữ chỗ ngồi 这儿 cùng động từ 坐 trong một mảnh. 吗 ở cuối biến cả lời xin phép thành câu hỏi.'
      },
      {
        prefix: '我们',
        tiles: ['可以', '开窗', '吗'],
        suffix: '？',
        py: 'Wǒmen kěyǐ kāi chuāng ma?',
        vi: 'Chúng em mở cửa sổ được không ạ?',
        hint: 'Cả nhóm xin được làm một việc. Đặt tiếng hỏi ở cuối.',
        why: 'Cả nhóm là người muốn mở cửa. 可以 xin phép cho cả hành động 开窗, trong đó 窗 chỉ vật được mở. Âm nhẹ ma báo người nghe cần trả lời đồng ý hay từ chối.'
      }
    ]
  },
  {
    id: 'earlier-habit',
    level: 1,
    target: '以前',
    topics: ['be-dau'],
    frames: [
      {
        prefix: '他',
        tiles: ['以前', '在医院', '工作'],
        suffix: '。',
        py: 'Tā yǐqián zài yīyuàn gōngzuò.',
        vi: 'Trước đây anh ấy làm việc ở bệnh viện.',
        hint: 'Xác định thời gian trước, rồi đặt nơi chốn ngay trước việc làm.',
        why: '以前 đặt việc làm vào quá khứ. 在医院 thành một cụm chỉ nơi làm việc, đứng trước 工作. Thời gian đứng trước cụm địa điểm trong cách kể này.'
      },
      {
        prefix: '我',
        tiles: ['以前', '不', '喝茶'],
        suffix: '。',
        py: 'Wǒ yǐqián bù hē chá.',
        vi: 'Trước đây tôi không uống trà.',
        hint: '“Trước đây” bao trùm cả thói quen. Đặt mảnh phủ định sát hành động.',
        why: '以前 nêu thời kỳ được nói tới. 不 phủ định trọn hoạt động 喝茶, trong đó 茶 là thứ được uống. Câu kể một thói quen vào thời kỳ ấy.'
      }
    ]
  },
  {
    id: 'do-together',
    level: 1,
    target: '一起',
    topics: ['jia'],
    frames: [
      {
        prefix: '我们',
        tiles: ['一起', '吃晚饭', '吧'],
        suffix: '。',
        py: 'Wǒmen yìqǐ chī wǎnfàn ba.',
        vi: 'Mình cùng ăn tối nhé.',
        hint: 'Cho biết cả nhóm làm chung việc gì rồi kết bằng lời rủ.',
        why: '一起 đứng trước việc làm chung là 吃晚饭. Giữ 吃 với 晚饭 để thấy rõ đây là bữa nào. 吧 đặt cuối tạo giọng rủ rê nhẹ nhàng.'
      },
      {
        prefix: '我们',
        tiles: ['一起', '去机场接她', '吧'],
        suffix: '。',
        py: 'Wǒmen yìqǐ qù jīchǎng jiē tā ba.',
        vi: 'Mình cùng ra sân bay đón cô ấy nhé.',
        hint: 'Cả chuyến đi đón người là một kế hoạch chung.',
        why: '一起 bao trùm cả việc ra sân bay đón người. Mảnh 去机场接她 giữ thứ tự đi tới sân bay rồi đón cô ấy. 吧 đặt cuối để rủ người nghe cùng đi.'
      }
    ]
  },
  {
    id: 'recipient-gei',
    level: 2,
    target: '给',
    topics: ['thu', 'register'],
    frames: [
      {
        prefix: '我',
        tiles: ['想', '给', '奶奶', '写', '一封信'],
        suffix: '。',
        py: 'Wǒ xiǎng gěi nǎinai xiě yì fēng xìn.',
        vi: 'Tôi muốn viết một lá thư cho bà nội.',
        hint: 'Xác định ai nhận thư, còn vật được viết là gì.',
        why: '想 đứng trước điều muốn làm. 给奶奶 chỉ người nhận và có thể đứng trước 写一封信 hoặc theo sau cụm ấy. Giữ 一封信 liền nhau vì 封 là lượng từ cho thư.',
        alternatives: [['想', '写', '一封信', '给', '奶奶']],
        alternativePy: ['Wǒ xiǎng xiě yì fēng xìn gěi nǎinai.']
      },
      {
        prefix: '服务员',
        tiles: ['给', '客人', '倒了', '一杯茶'],
        suffix: '。',
        py: 'Fúwùyuán gěi kèrén dàole yì bēi chá.',
        vi: 'Nhân viên phục vụ đã rót một tách trà cho khách.',
        hint: 'Phân biệt người được rót cho với thứ được rót.',
        why: '给客人 nói ai được phục vụ. Cụm này đứng được cả trước lẫn sau 倒了一杯茶. Giữ 倒了 cùng nhau để thấy dấu hiệu việc rót đã diễn ra, và 一杯茶 là trọn phần đồ uống.',
        alternatives: [['倒了', '一杯茶', '给', '客人']],
        alternativePy: ['Fúwùyuán dàole yì bēi chá gěi kèrén.']
      }
    ]
  },
  {
    id: 'recommend-haishi',
    level: 2,
    target: '还是',
    topics: ['hanh-va-hang', 'giang-hang'],
    frames: [
      {
        prefix: '太晚了，我们',
        tiles: ['还是', '打车', '回家', '吧'],
        suffix: '。',
        py: 'Tài wǎn le, wǒmen háishi dǎchē huí jiā ba.',
        vi: 'Muộn quá rồi, mình bắt taxi về nhà thì hơn.',
        hint: 'Sau lý do, đề xuất cách về nhà phù hợp với giờ này.',
        why: '还是 đưa ra phương án sau khi cân nhắc giờ muộn. 打车 chỉ cách đi, 回家 chỉ đích đến. 吧 ở cuối làm lời đề xuất mềm hơn.'
      },
      {
        prefix: '这件衣服太贵了，你',
        tiles: ['还是', '买', '那件', '吧'],
        suffix: '。',
        py: 'Zhè jiàn yīfu tài guì le, nǐ háishi mǎi nà jiàn ba.',
        vi: 'Món này đắt quá, bạn mua chiếc kia thì hơn.',
        hint: 'Cân nhắc giá xong, nói món người nghe nên chọn.',
        why: 'Sau 还是 là phương án được khuyên chọn. 买 đứng trước 那件. Giữ 那 với lượng từ 件 vì chúng chỉ món kia, còn 衣服 đã rõ từ vế đầu. 吧 khép lời khuyên.'
      }
    ]
  },
  {
    id: 'finish-complement',
    level: 2,
    target: '完',
    topics: ['thu'],
    frames: [
      {
        prefix: '周末前，你能',
        tiles: ['看', '完', '这本书', '吗'],
        suffix: '？',
        py: 'Zhōumò qián, nǐ néng kànwán zhè běn shū ma?',
        vi: 'Trước cuối tuần, bạn đọc xong cuốn sách này được không?',
        hint: 'Đặt kết quả của việc đọc sát hành động, trước tên vật được đọc.',
        why: '完 đi ngay sau 看 để nói đọc tới hết. Cả 看完 nhận tân ngữ 这本书. Cụm sách giữ 这 với lượng từ 本 và danh từ 书, còn 吗 đặt cuối để hỏi.'
      },
      {
        prefix: '晚饭前，请你',
        tiles: ['写', '完', '这封', '信'],
        suffix: '。',
        py: 'Wǎnfàn qián, qǐng nǐ xiěwán zhè fēng xìn.',
        vi: 'Bạn vui lòng viết xong lá thư này trước bữa tối nhé.',
        hint: 'Lời nhờ đặt một thời hạn cho việc hoàn tất lá thư.',
        why: '写完 nói rằng việc viết phải hoàn tất trước bữa tối. Sau cụm động từ mới đến lá thư. 这封 giữ từ chỉ định và lượng từ của thư cùng nhau để đặt ngay trước 信.'
      }
    ]
  },
  {
    id: 'reason-and-result',
    level: 2,
    target: '因为',
    topics: ['giang-hang'],
    frames: [
      {
        prefix: '因为',
        tiles: ['下雨，', '所以', '比赛', '改到明天'],
        suffix: '。',
        py: 'Yīnwèi xià yǔ, suǒyǐ bǐsài gǎidào míngtiān.',
        vi: 'Vì trời mưa nên trận đấu dời sang ngày mai.',
        hint: 'Khép vế thời tiết trước khi nói chuyện gì đổi lịch.',
        why: '因为 đưa mưa vào vai lý do. Sau 所以, 比赛 là sự kiện được dời. 改到明天 giữ việc đổi lịch và mốc mới thành một cụm.'
      },
      {
        tiles: ['因为', '她生病了，', '所以', '我们', '取消了聚会'],
        suffix: '。',
        py: 'Yīnwèi tā shēngbìng le, suǒyǐ wǒmen qǔxiāole jùhuì.',
        vi: 'Vì cô ấy bị ốm nên chúng tôi đã hủy buổi gặp mặt.',
        hint: 'Người bị ốm và người quyết định hủy thuộc hai vế khác nhau.',
        why: '她生病了 là cả lý do và nằm sau 因为. 取消了聚会 giữ việc hủy cùng buổi gặp được hủy. Người quyết định hủy là 我们, có thể nêu ngay đầu câu hoặc sau 所以.',
        alternatives: [['我们', '因为', '她生病了，', '所以', '取消了聚会']],
        alternativePy: ['Wǒmen yīnwèi tā shēngbìng le, suǒyǐ qǔxiāole jùhuì.']
      }
    ]
  },
  {
    id: 'direction-down-here',
    level: 2,
    target: '下来',
    topics: ['giang-hang', 'space-time'],
    frames: [
      {
        prefix: '我在楼下，你',
        tiles: ['拿着钥匙', '走', '下来', '吧'],
        suffix: '。',
        py: 'Wǒ zài lóuxià, nǐ názhe yàoshi zǒu xiàlai ba.',
        vi: 'Tôi ở tầng dưới. Bạn cầm chìa khóa đi xuống đây nhé.',
        hint: 'Người nói đứng dưới. Cụm chỉ hướng đi sát động tác di chuyển.',
        why: '拿着钥匙 là tình trạng đi kèm lúc di chuyển. 走 cho biết cách di chuyển, còn 下来 theo sau để chỉ hướng từ trên xuống nơi người nói đứng. 吧 kết lời nhờ.'
      },
      {
        prefix: '我在树下，小猫',
        tiles: ['从树上', '跳', '下来', '了'],
        suffix: '。',
        py: 'Wǒ zài shù xià, xiǎo māo cóng shù shàng tiào xiàlai le.',
        vi: 'Tôi đứng dưới gốc cây. Chú mèo con nhảy từ trên cây xuống chỗ tôi.',
        hint: 'Xác định điểm xuất phát của mèo, rồi ghép động tác với hướng.',
        why: '从树上 giữ cùng nhau để nêu nơi mèo xuất phát. 跳 là động tác, 下来 cho biết mèo đi xuống về phía người đang đứng dưới. 了 báo cú nhảy đã xảy ra và cũng có thể đặt ngay sau 跳.',
        alternatives: [['从树上', '跳', '了', '下来']],
        alternativePy: ['Wǒ zài shù xià, xiǎo māo cóng shù shàng tiàole xiàlai.']
      }
    ]
  },
  {
    id: 'choose-by-description',
    level: 2,
    target: '的',
    topics: ['neutral-tone', 'space-time'],
    frames: [
      {
        prefix: '有两条裤子，我',
        tiles: ['想', '试', '黑色', '的'],
        suffix: '。',
        py: 'Yǒu liǎng tiáo kùzi, wǒ xiǎng shì hēisè de.',
        vi: 'Có hai chiếc quần. Tôi muốn thử chiếc màu đen.',
        hint: 'Tên món đã có ở vế mở đầu. Dùng màu để chọn đúng chiếc.',
        why: '裤子 đã rõ, nên 黑色的 tự đứng được ở chỗ của 黑色的裤子. Giữ 黑色 thành một mảnh vì hai chữ gọi chung một màu. 想 nói điều muốn làm, còn 试 là việc thử.'
      },
      {
        prefix: '两把椅子都空着，你',
        tiles: ['坐', '大', '的', '吧'],
        suffix: '。',
        py: 'Liǎng bǎ yǐzi dōu kòngzhe, nǐ zuò dà de ba.',
        vi: 'Cả hai ghế đều còn trống. Bạn ngồi ghế to nhé.',
        hint: 'Chọn một ghế bằng kích thước, rồi kết bằng lời gợi ý.',
        why: '大 là đặc điểm. Thêm 的 để 大的 chỉ «chiếc ghế to» đã có trong ngữ cảnh. Cụm ấy đứng sau 坐. 吧 ở cuối thể hiện lời gợi ý.'
      }
    ]
  },
  {
    id: 'past-experience',
    level: 3,
    target: '过',
    topics: ['neutral-tone', 'tot-nghiep'],
    frames: [
      {
        prefix: '我以前',
        tiles: ['在', '北京', '听', '过', '这首歌'],
        suffix: '。',
        py: 'Wǒ yǐqián zài Běijīng tīngguo zhè shǒu gē.',
        vi: 'Trước đây tôi từng nghe bài hát này ở Bắc Kinh.',
        hint: 'Đặt nơi nghe trước hành động. Dấu hiệu “từng” bám vào động từ.',
        why: '在北京 đứng trước việc nghe. 过 đọc nhẹ guo, đứng ngay sau 听 để nói đây là trải nghiệm đã có. Giữ 这首歌 liền nhau vì 首 là lượng từ của bài hát.',
        trap: ['正在', '正在 nhấn vào lúc hành động đang diễn ra. Người nói đang nhắc tới trải nghiệm đã nghe bài hát trong quá khứ.']
      },
      {
        prefix: '在那家店，你',
        tiles: ['吃', '过', '这种', '面', '吗'],
        suffix: '？',
        py: 'Zài nà jiā diàn, nǐ chīguo zhè zhǒng miàn ma?',
        vi: 'Ở quán ấy, bạn đã từng ăn loại mì này chưa?',
        hint: 'Câu hỏi kiểm tra xem đã có trải nghiệm ấy bao giờ chưa.',
        why: '吃过 nói đã từng ăn. 这种 ghép từ chỉ định với lượng từ chỉ loại và đặt ngay trước 面. Trong lời nói, cũng có thể đưa 这种面 lên trước 吃过 để nêu món đang bàn. 吗 đặt cuối câu hỏi.',
        trap: ['常常', '常常 nói việc xảy ra thường xuyên. Câu này chỉ cần biết người nghe đã từng ăn món ấy ở quán đó hay chưa.'],
        alternatives: [['这种', '面', '吃', '过', '吗']],
        alternativePy: ['Zài nà jiā diàn, nǐ zhè zhǒng miàn chīguo ma?']
      }
    ]
  },
  {
    id: 'invite-a-person-to-act',
    level: 3,
    target: '请',
    topics: ['register', 'space-time'],
    frames: [
      {
        prefix: '老师',
        tiles: ['请', '我', '在门口', '等', '新同学'],
        suffix: '。',
        py: 'Lǎoshī qǐng wǒ zài ménkǒu děng xīn tóngxué.',
        vi: 'Thầy giáo nhờ tôi đợi bạn học mới ngay tại cửa.',
        hint: 'Ai được thầy nhờ? Chính người ấy thực hiện việc đợi ở cửa.',
        why: '我 là người thầy nhờ qua 请, đồng thời là người đợi. 在门口 đi cùng nhau và đứng trong phần việc được nhờ, nên cửa là nơi chờ. 新同学 là người được đợi sau 等.',
        trap: ['让', '让 có thể dùng khi thầy bảo ai làm việc gì. Ở đây cần 请 để thể hiện cách thầy mở lời nhờ lịch sự.']
      },
      {
        prefix: '妈妈',
        tiles: ['请', '邻居', '来', '我们家', '吃晚饭'],
        suffix: '。',
        py: 'Māma qǐng línjū lái wǒmen jiā chī wǎnfàn.',
        vi: 'Mẹ mời hàng xóm đến nhà mình ăn tối.',
        hint: 'Người được mời cũng là người đến nhà và dùng bữa.',
        why: '邻居 đứng sau 请 vì là khách được mời. Sau đó 来我们家 nêu nơi khách đến, còn mảnh 吃晚饭 nêu mục đích. 我们家 giữ từ chỉ người và nhà của họ cùng nhau.',
        trap: ['问', '问 dùng để hỏi nhằm nhận câu trả lời. Mẹ đang mời hàng xóm đến dùng bữa, nên hành động của khách nối sau 请.']
      }
    ]
  },
  {
    id: 'affected-object-ba',
    level: 3,
    target: '把',
    topics: ['space-time', 'register'],
    frames: [
      {
        prefix: '请你',
        tiles: ['把', '这两本书', '放', '在', '桌子上'],
        suffix: '。',
        py: 'Qǐng nǐ bǎ zhè liǎng běn shū fàng zài zhuōzi shàng.',
        vi: 'Bạn đặt hai cuốn sách này lên bàn giúp tôi nhé.',
        hint: 'Nêu hai cuốn sách trước khi nói chúng sẽ được đặt ở đâu.',
        why: '把 đưa vật được di chuyển lên trước 放. Giữ 这两本书 thành mảnh nhận diện đúng hai cuốn. Sau 放, 在桌子上 nêu vị trí cuối cùng của sách.',
        trap: ['给', '给 thường dẫn người nhận hoặc người được giúp. Hai cuốn sách ở đây là đồ được di chuyển, nên chúng đứng sau 把.']
      },
      {
        prefix: '请你',
        tiles: ['把', '这扇', '门', '关', '好'],
        suffix: '。',
        py: 'Qǐng nǐ bǎ zhè shàn mén guānhǎo.',
        vi: 'Bạn đóng kỹ cánh cửa này giúp tôi nhé.',
        hint: 'Nêu đúng cánh cửa trước, rồi cho biết cần đóng đến mức nào.',
        why: 'Sau 把 là cánh cửa cụ thể 这扇门. 这扇 giữ từ chỉ định với lượng từ thường dùng cho cửa. 好 đi sau 关, cho biết cần đóng cho xong và cho chắc.',
        trap: ['着', '关着 tả cửa ở trạng thái đóng hoặc được giữ đóng. Lời nhờ ở đây yêu cầu thực hiện động tác và đóng cho chắc, nên dùng 关好.']
      }
    ]
  },
  {
    id: 'focus-shi-de',
    level: 3,
    target: '是',
    topics: ['tot-nghiep', 'neutral-tone'],
    frames: [
      {
        prefix: '你今天',
        tiles: ['是', '坐', '公交车', '来学校', '的', '吗'],
        suffix: '？',
        py: 'Nǐ jīntiān shì zuò gōngjiāochē lái xuéxiào de ma?',
        vi: 'Hôm nay bạn đến trường bằng xe buýt phải không?',
        hint: 'Người hỏi đã biết bạn tới trường. Điều cần xác nhận là phương tiện.',
        why: '是 đặt trước 坐公交车 để làm nổi bật phương tiện. 来学校 giữ việc di chuyển cùng điểm đến. 的 khép cụm kể cách đến, rồi 吗 mới đặt câu hỏi xác nhận.',
        trap: ['了', '了 có thể báo việc đến đã xảy ra. Ở đây việc đến đã rõ và người hỏi muốn xác nhận phương tiện bằng mẫu 是…的.']
      },
      {
        prefix: '这张照片',
        tiles: ['是', '我', '在', '大学', '拍', '的'],
        suffix: '。',
        py: 'Zhè zhāng zhàopiàn shì wǒ zài dàxué pāi de.',
        vi: 'Bức ảnh này là do tôi chụp ở trường đại học.',
        hint: 'Bức ảnh đã ở trước mặt. Nói rõ ai chụp và chụp ở đâu.',
        why: '是 mở phần nhấn vào người chụp 我 cùng nơi chụp 在大学. Hai mảnh 在 và 大学 ghép lại và đứng trước 拍. 的 khép phần nói về sự việc đã biết.',
        trap: ['给', '给大学 sẽ thành «chụp cho trường đại học». Câu này nói trường đại học là nơi chụp, nên cần 在大学.']
      }
    ]
  },
  {
    id: 'condition-then',
    level: 3,
    target: '如果',
    topics: ['shang-yang', 'space-time'],
    frames: [
      {
        prefix: '如果',
        tiles: ['明天', '还', '下雨，', '我们', '就', '坐地铁'],
        suffix: '。',
        py: 'Rúguǒ míngtiān hái xià yǔ, wǒmen jiù zuò dìtiě.',
        vi: 'Nếu ngày mai trời vẫn mưa thì mình đi tàu điện ngầm.',
        hint: 'Vế đầu nêu khả năng tiếp tục mưa. Vế sau nói cả nhóm đi bằng gì.',
        why: '如果 đưa ra điều kiện. 还 đứng trước 下雨, nghĩa là mưa còn tiếp diễn tới ngày mai. Trong vế sau, 就 đặt sau 我们 và trước 坐地铁 để nối phương án với điều kiện.',
        trap: ['所以', '所以 dẫn kết quả từ một lý do. Thời tiết ngày mai còn là giả định, nên vế chọn phương tiện tiếp nối 如果 bằng 就.']
      },
      {
        tiles: ['如果', '找不到', '那家店，', '就', '在路口', '等', '我'],
        suffix: '。',
        py: 'Rúguǒ zhǎobudào nà jiā diàn, jiù zài lùkǒu děng wǒ.',
        vi: 'Nếu bạn không tìm thấy cửa hàng đó thì đợi tôi ở giao lộ.',
        hint: 'Phân biệt cửa hàng cần tìm với chỗ cần đợi khi không tìm thấy.',
        why: '如果 mở khả năng không tìm thấy. Giữ 找不到 thành một mảnh vì 不到 chỉ kết quả tìm chưa đạt. Sau 就, 在路口 nêu điểm hẹn và 我 đứng sau 等 với vai người được đợi.',
        trap: ['因为', '因为 sẽ đưa chuyện tìm không thấy vào vai lý do đã có. Người nói đang dặn cách xử lý nếu tình huống ấy xảy ra, nên dùng 如果.']
      }
    ]
  },
  {
    id: 'manner-before-verb',
    level: 3,
    target: '地',
    topics: ['neutral-tone'],
    frames: [
      {
        prefix: '学生在黑板上',
        tiles: ['认真', '地', '写了', '自己的', '名字'],
        suffix: '。',
        py: 'Xuésheng zài hēibǎn shàng rènzhēn de xiěle zìjǐ de míngzi.',
        vi: 'Em học sinh đã cẩn thận viết tên mình lên bảng.',
        hint: '“Cẩn thận” tả cách viết. “Của mình” lại đi với tên.',
        why: '认真地 đứng trước 写了 và tả cách viết. Còn 自己的 đứng với 名字 để nói tên thuộc về ai. Hai chữ 地 và 的 đều đọc nhẹ de trong câu này.',
        trap: ['的', '的 đã có trong 自己的名字 để nối người sở hữu với danh từ. Sau 认真 cần 地 để chuyển sang hành động 写.']
      },
      {
        prefix: '生日会上，孩子们',
        tiles: ['高兴', '地', '唱了', '一首', '歌'],
        suffix: '。',
        py: 'Shēngrìhuì shàng, háizimen gāoxìng de chàngle yì shǒu gē.',
        vi: 'Trong buổi tiệc sinh nhật, các em nhỏ vui vẻ hát một bài.',
        hint: 'Đặt tâm trạng ngay trước hành động nó miêu tả.',
        why: '高兴地 đứng trước 唱了, cho thấy các em hát trong tâm trạng vui vẻ. Mảnh 一首 giữ số và lượng từ của bài hát cùng nhau để đặt trước 歌.',
        trap: ['得', '得 có thể nối 唱 với phần mô tả đứng sau động từ, như 唱得很开心. Câu này đặt 高兴 trước 唱, nên cần 地.']
      }
    ]
  }
];
