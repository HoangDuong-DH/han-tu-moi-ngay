(() => {
  'use strict';

  const {byId} = window.HAN_DEEP_READING_DATA;
  function annotate(id, takeaway, notes) {
    const article = byId.get(id);
    article.takeaway ||= takeaway;
    for (const [han, segments, grammar] of notes) {
      const example = article.examples.find(item => item.han === han);
      if (!example) throw new Error('Missing sentence in ' + id + ': ' + han);
      Object.assign(example,{segments,grammar});
    }
  }

  annotate('tat-va-bat','Hai chữ cùng đọc bì vẫn có thể thuộc những nhóm âm xưa khác nhau. Hãy dùng cả chữ và mục vận thư để giải thích “tất” và “bật”. Dùng cả từ để nói 毕业 hay 宾馆.',[
    ['我打算毕业以后找工作。',[
      ['我','Người có dự định.'],['打算','Động từ “dự định”. Giữ hai chữ vì 打 ở đây không phải động tác đánh.'],
      ['毕业','Sự kiện ra trường.'],['以后','Đứng sau sự kiện, tạo mốc “sau khi”.'],
      ['找','Động từ tìm.'],['工作','Trong cụm này là việc làm, đối tượng của 找.']
    ],'打算 mở cả kế hoạch. Bên trong kế hoạch, 毕业以后 đứng trước 找工作 để đặt thời điểm cho việc tìm chứ không đặt thời điểm cho lúc nảy ý định.'],
    ['我们先到宾馆放行李，再去吃饭。',[
      ['我们','Chủ thể chung cho cả hai vế.'],['先','Báo việc đầu.'],['到','Động từ đến, chờ một đích sau nó.'],
      ['宾馆','Tên một loại nơi ở, giữ thành một từ.'],['放','Để hay đặt xuống.'],['行李','Hành lý, cả từ chỉ thứ mang theo.'],
      ['再','Báo việc sau.'],['去','Đi tới để làm việc tiếp.'],['吃饭','Cụm ăn + cơm đã dùng quen để gọi việc dùng bữa.']
    ],'先 bao quát 到宾馆放行李 và 再 bao quát 去吃饭. 到宾馆 đưa người nói đến nơi sẽ 放行李. Nghe thấy 再, ta có thể khôi phục chủ ngữ 我们 từ đầu câu.'],
    ['他待人彬彬有礼。',[
      ['他','Người được nhận xét.'],['待人','待 là đối đãi, 人 chỉ người khác nói chung. Ghép lại để giới hạn nhận xét vào cách cư xử.'],
      ['彬彬有礼','Cụm cố định chỉ phong thái nhã nhặn, có lễ. 彬彬 và 有礼 không liệt kê hai việc rời.']
    ],'他 là chủ thể. 待人 nêu phương diện của lời nhận xét, 彬彬有礼 cho biết cách cư xử ở phương diện ấy. So với 他很有礼貌, câu gọn mà đặt đúng vào quan hệ với người khác.']
  ]);

  annotate('hanh-va-hang','Trước khi đọc 行, nhìn chữ đi cùng. 银行 gọi nơi giao dịch, 行李 gọi đồ mang đi. Khi đứng trong câu hỏi 行不行, chữ ấy lại đánh giá một phương án.',[
    ['我先去银行取钱，再回宾馆拿行李。',[
      ['我','Người làm cả hai việc.'],['先','Đặt việc đi ngân hàng trước.'],['去','Đi đến.'],
      ['银行','Cả từ nghĩa là ngân hàng, đọc háng.'],['取钱','Động từ 取 và đối tượng 钱, rút tiền.'],['再','Chuyển sang việc kế.'],
      ['回','Trở về nơi đã biết.'],['宾馆','Đích của 回.'],['拿','Lấy, cầm.'],['行李','Cả từ là hành lý, đọc xíngli.']
    ],'Mỗi vế có một động từ di chuyển với đích, theo sau là việc làm khi đến nơi. 先…再… cho thứ tự của cả hai vế, chứ không miêu tả hai hành động xảy ra đồng thời.'],
    ['我们明天出发，这样行不行？',[
      ['我们','Chủ thể của phương án.'],['明天','Mốc ngày mai.'],['出发','Khởi hành, giữ cả từ.'],
      ['这样','Gom lại phương án vừa nói.'],['行不行','行 lặp hai phía của 不 để hỏi chấp nhận hay không.']
    ],'Vế đầu đưa ra một phương án hoàn chỉnh. Vế sau lấy 这样 làm điều được hỏi và 行不行 làm câu hỏi có/không. Ta hỏi xem kế hoạch có ổn, không hỏi có biết đi bộ.'],
    ['这家银行有两个分行。',[
      ['这家','Đại từ chỉ định 这 đi với lượng từ 家 của cơ sở.'],['银行','Tên loại tổ chức, không cắt 行 sang vế sau.'],
      ['有','Báo quan hệ có, trực thuộc.'],['两个','Số hai và lượng từ.'],['分行','Cả từ chỉ chi nhánh; 行 vẫn đọc háng.']
    ],'这家银行 là chủ thể. 有 mang nghĩa sở hữu hay có trong cơ cấu, rồi 两个分行 nêu thứ được đếm. Câu khác với 这儿有两个分行, ở đó 这儿 chỉ nơi tồn tại.']
  ]);

  annotate('giang-hang','Vật gì hạ xuống, hoặc ai chịu thua ai? Câu hỏi đó giúp chọn hai nhánh của 降. 降落 giữ jiàng của sự chuyển động, 投降 giữ xiáng của sự quy phục.',[
    ['明天会降温。',[
      ['明天','Ngày mai là mốc.'],['会','Dự đoán có khả năng xảy ra, trong câu thời tiết không chỉ kỹ năng.'],
      ['降温','降 + 温 tạo tổ hợp hạ nhiệt, cần đọc chung để nhận việc chính.']
    ],'Trong lời dự báo có thể lược chủ thể “thời tiết”. 明天 đứng trước 会, và 会 chi phối cả việc 降温. Câu không nói chính 明天 rơi hay hạ xuống.'],
    ['飞机已经降落了。',[
      ['飞机','Sự vật chuyển động.'],['已经','Sự kiện đã xảy ra trước hoặc tính đến lúc nói.'],
      ['降落','Một động từ chỉ quá trình hạ xuống hoặc hạ cánh.'],['了','Trợ từ cuối câu báo việc đã thành sự thực trong tình huống đang nói.']
    ],'飞机 làm chủ thể của 降落. 已经 + cụm động từ + 了 làm rõ việc hạ cánh đã đạt mốc. Bản thân 了 không phải cách đọc quá khứ cho mọi động từ.'],
    ['他们最后还是投降了。',[
      ['他们','Nhóm người được nhắc.'],['最后','Mốc sau cùng trong diễn biến.'],['还是','Vẫn đi đến kết quả ấy sau khả năng khác hoặc kỳ vọng khác.'],
      ['投降','Động từ “đầu hàng”, đọc xiáng trong từ này.'],['了','Câu báo kết quả đã xảy ra.']
    ],'最后 đặt điểm kết, còn 还是 cho biết kỳ vọng và kết quả không hẳn cùng hướng. Hai từ cùng nằm trước 投降, nhưng chỉ 还是 mang ý “rốt cuộc vẫn”.']
  ]);

  annotate('dieu-dieu','Hỏi phần nào đang đổi cho vừa, phần nào được đem ra xem xét, và phần nào là giai điệu. Đọc cả 调整, 调查, 曲调 rồi chọn âm của 调.',[
    ['我们得调整明天的工作时间。',[
      ['我们','Những người cần làm việc này.'],['得','Đọc děi, báo sự cần thiết.'],['调整','Động từ “điều chỉnh”, nối nguyên từ với phần được sửa.'],
      ['明天的','明天 + 的 nêu lịch của ngày nào.'],['工作时间','Cụm danh từ với 时间 là trung tâm, 工作 thu hẹp nghĩa thành giờ làm.']
    ],'得 phải đứng trước điều bắt buộc là cả cụm 调整明天的工作时间. Trong đối tượng của 调整, 明天的 bổ nghĩa cho 工作时间. Đây là lý do đọc děi, còn 得 trong 说得好 giữ chức năng bổ ngữ.'],
    ['他们正在调查这件事。',[
      ['他们','Người đang điều tra.'],['正在','Đặt việc vào lúc đang diễn ra.'],['调查','Một từ chỉ việc điều tra hoặc tìm hiểu có chủ đích.'],
      ['这件','这 chọn việc đang nói, 件 là lượng từ đi với 事.'],['事','Việc được điều tra.']
    ],'正在 bổ nghĩa cho cụm động từ 调查这件事. Trung tâm của đối tượng là 事. Mốc đang diễn ra do 正在 tạo, nên đổi cả động từ sang 了解 vẫn giữ được lớp thời gian ấy.'],
    ['这首歌的曲调很好听。',[
      ['这首歌','这 + 首 + 歌, nêu bài hát cụ thể.'],['的','Nối bài hát với cái thuộc về bài hát.'],['曲调','Cả từ chỉ giai điệu, là thứ được khen.'],
      ['很','Mức độ của 好听.'],['好听','Tính từ nghĩa là nghe hay.']
    ],'这首歌的曲调 là cụm chủ thể. 很好听 trực tiếp làm vị ngữ tính từ, không cần thêm 是. Nếu lược 曲调 để nói 这首歌很好听, lời khen chuyển từ riêng giai điệu sang cả bài hát.']
  ]);

  annotate('mot-tieng-thay','Hãy nhìn quan hệ trước khi chọn chữ “thầy”. Gọi giáo viên trong lớp là 老师, gọi người truyền nghề của mình có thể là 师父, còn lời nhờ một người thợ thường mở bằng 师傅.',[
    ['陈老师，您好！',[
      ['陈老师','Họ 陈 và danh xưng 老师 tạo lời gọi người đang nghe.'],['您','Ngôi thứ hai lịch sự.'],['好','Tạo lời chào đi sau 您.']
    ],'Dấu phẩy ngăn tiếng gọi 陈老师 khỏi lời chào 您好. 陈老师 đứng ngoài cấu trúc chính, dù vẫn là người mà 您 chỉ tới.'],
    ['师父，您能再教我一遍吗？',[
      ['师父','Lời gọi người đang truyền dạy.'],['您','Người được nhờ.'],['能','Khả năng hoặc mức sẵn lòng trong lời hỏi.'],
      ['再','Làm lại việc đã làm.'],['教','Động từ dạy.'],['我','Người được dạy.'],['一遍','Một lượt trọn từ đầu đến cuối.'],['吗','Đánh dấu câu hỏi có/không.']
    ],'能 đi trước 再教我一遍. 一遍 ở sau việc dạy để đo số lượt thực hiện, còn 我 vẫn là đối tượng người nhận. Cả khung 您能…吗 dùng như một lời nhờ lịch sự.'],
    ['师傅，麻烦您送我到车站。',[
      ['师傅','Danh xưng gọi người làm nghề, ở đây là người chở khách.'],['麻烦','Động từ trong công thức mở lời nhờ.'],
      ['您','Người được nhờ và sẽ thực hiện hành động tiếp theo.'],['送','Đưa, chở.'],['我','Người được đưa.'],['到','Đánh dấu đích.'],['车站','Cả từ chỉ trạm hoặc ga; tình huống quyết định cụ thể.']
    ],'麻烦您 + hành động là lời nhờ, vừa cho biết ai được nhờ vừa dẫn vào hành động người ấy làm. Trong 送我到车站, 我 là người được đưa và 到车站 là đích của chuyến đi.']
  ]);

  annotate('khiem-va-kiem','Khi nhìn chữ, 兼 gợi âm trong 謙. Khi nghe người thật nói, hãy để hành động chỉ nghĩa. 过奖 đáp lại một lời khen, 谦让 là nhường nhau, còn 兼任 chỉ việc kiêm một chức.',[
    ['您过奖了，我还在学。',[
      ['您','Người vừa khen.'],['过奖','Một lời đáp cố định. 过 gợi mức vượt, 奖 liên quan khen.'],['了','Khép lời đáp lại lời khen vừa nhận.'],
      ['我','Người tự nói về mình.'],['还','Vẫn còn tiếp diễn.'],['在','Đánh dấu đang làm.'],['学','Động từ học, việc cụ thể hiểu từ ngữ cảnh.']
    ],'Hai vế có hai chủ thể. Vế đầu đặt nhận xét vào lời khen của 您, vế sau kéo về việc học của 我. Trong 还在学, 还 bao trùm trạng thái đang học, nên có ý “tôi vẫn đang học”.'],
    ['两个人都不肯先坐，互相谦让。',[
      ['两个人','Số + lượng từ + người, một nhóm chủ thể.'],['都','Áp điều theo sau lên từng thành viên.'],
      ['不肯','Không chịu làm. 不 phủ định sự bằng lòng.'],['先','Đứng trước việc làm, nghĩa “trước”.'],['坐','Hành động ngồi.'],
      ['互相','Việc hướng từ người này sang người kia và ngược lại.'],['谦让','Một từ về hành động nhường nhau.']
    ],'都不 đặt phủ định lên cả hai người, khác 不都 khi chỉ phủ nhận rằng tất cả đều làm. Vế 互相谦让 lược chủ thể 两个人 và giải thích vì sao mỗi người đợi phía kia ngồi.'],
    ['她教中文，也兼任班主任。',[
      ['她','Chủ thể của hai việc.'],['教','Dạy.'],['中文','Thứ tiếng được dạy.'],['也','Thêm một việc vào công việc đã nêu.'],
      ['兼任','Giữ nguyên động từ “kiêm nhiệm”.'],['班主任','Chức giáo viên chủ nhiệm, giữ cả danh xưng.']
    ],'教中文 và 兼任班主任 là hai vị ngữ có chung chủ thể. 也 giới thiệu vai thêm, còn 兼任 trực tiếp nhận tên chức. Cùng thấy 兼 nhưng ở đây nó có vai nghĩa trong từ.']
  ]);

  byId.get('hanh-va-hang').examples.push({
    han:'三人行，必有我師焉', py:'Sān rén xíng, bì yǒu wǒ shī yān.', vi:'Ba người cùng đi, ắt có người mình học được ở trong nhóm ấy.',
    kind:'Luận Ngữ · thiên Thuật nhi', refs:['analects-shu-er'],
    segments:[['三人','Cụm số và danh từ chỉ nhóm người.'],['行','Động từ đi, chủ ngữ là 三人.'],['必','Chỉ điều ắt có ở vế sau.'],['有','Động từ tồn tại, dẫn cái có trong nhóm.'],['我師','我 thuộc về danh từ 師, tương đương thầy của mình trong lối nói nay.'],['焉','Từ cuối vế gợi chỗ “trong đó” theo mạch câu.']],
    grammar:'Vế đầu dựng tình huống. Vế sau lấy 必 bổ nghĩa cho 有, nối việc đi chung với khả năng học người cùng đi. 我師 làm thành phần sau động từ tồn tại, nên câu không bảo ba người đều là thầy.',
    note:'Câu tiếp theo trong văn bản nói đến học điều hay và tự sửa qua điều dở. “Thầy” ở đây có thể là người đi bên cạnh mình.'
  });
  byId.get('mot-tieng-thay').examples.push({
    han:'一日为师，终身为父', py:'Yí rì wéi shī, zhōngshēn wéi fù.', vi:'Một ngày làm thầy, suốt đời kính như cha.',
    kind:'Thành ngữ', refs:['moe-maxim'],
    segments:[['一日','Cụm thời gian một ngày.'],['为师','为 đọc wéi, giữ cùng vai 师 là làm thầy.'],['终身','Cả đời, đối nhịp với 一日.'],['为父','Cùng khung 为 + vai. 父 là hình ảnh kính người dạy như cha.']],
    grammar:'Hai vế cùng đặt thời lượng trước cụm 为. Vế đầu nêu mối quan hệ khởi đầu dù chỉ một ngày. Vế sau kéo cách đối đãi ấy suốt đời. 一 trong lời đọc biến điệu thường thành yí trước rì thanh bốn.',
    note:'Có thể đọc mỗi vế bốn chữ một nhịp. Đây là hình ảnh đạo lý, còn khi bước vào lớp, lời gọi thường là 老师.'
  });
})();
