(() => {
  'use strict';

  const entries = [];
  const add = (id, topics, answer, wrong, ...frames) => entries.push({
    id, topics, answer, wrong:Object.fromEntries(wrong),
    frames:frames.map(([line,scene,vi,why]) => ({line,scene,vi,why}))
  });
  const terms = {
    '毕业':['bìyè','tốt nghiệp, học hết chương trình'],
    '开学':['kāixué','bắt đầu học kỳ'],
    '宾馆':['bīnguǎn','khách sạn'],
    '银行':['yínháng','ngân hàng'],
    '行李':['xíngli','hành lý mang theo khi đi xa'],
    '降温':['jiàngwēn','hạ nhiệt, nhiệt độ hạ xuống'],
    '投降':['tóuxiáng','đầu hàng'],
    '调整':['tiáozhěng','điều chỉnh cho phù hợp'],
    '调查':['diàochá','điều tra, tìm hiểu có chủ đích'],
    '曲调':['qǔdiào','giai điệu'],
    '过奖':['guòjiǎng','khen quá lời'],
    '兼任':['jiānrèn','kiêm nhiệm một chức vụ'],
    '信':['xìn','lá thư, thư tín trong những câu này'],
    '果汁':['guǒzhī','nước ép trái cây'],
    '变':['biàn','thay đổi, trở nên'],
    '已经':['yǐjīng','đã, tới lúc này thì việc đã xảy ra'],
    '明白':['míngbai','hiểu rõ'],
    '水落石出':['shuǐ luò shí chū','chân tướng được làm sáng tỏ'],
    '查明':['chámíng','tra xét đến chỗ biết rõ'],
    '得':['de','đứng sau động từ để mở phần bổ nghĩa trong cấu trúc đang học'],
    '学会':['xuéhuì','học đến mức biết làm'],
    '麻烦':['máfan','làm phiền, dùng khi nhờ vả'],
    '经历':['jīnglì','trải qua, hoặc điều đã trải qua'],
    '阅历':['yuèlì','vốn sống tích lũy qua trải nghiệm'],
    '日历':['rìlì','lịch xem ngày'],
    '不客气':['bú kèqi','không có gì, thường dùng để đáp lại lời cảm ơn'],
    '别客气':['bié kèqi','đừng khách sáo, cứ tự nhiên'],
    '生气':['shēngqì','nổi giận, bực mình'],
    '相信':['xiāngxìn','tin ai hoặc tin một điều có thật'],
    '最佳':['zuìjiā','tốt nhất trong số được so sánh'],
    '一起':['yìqǐ','cùng nhau'],
    '借':['jiè','mượn hoặc cho mượn, tùy cách đặt người'],
    '卖':['mài','bán'],
    '拿':['ná','cầm, lấy'],
    '没':['méi','chưa hoặc đã không xảy ra'],
    '从':['cóng','từ một điểm bắt đầu'],
    '离':['lí','cách một nơi hay một mốc'],
    '到':['dào','đến một đích, tới một mốc'],
    '出发':['chūfā','khởi hành'],
    '停止':['tíngzhǐ','dừng lại'],
    '表演':['biǎoyǎn','biểu diễn'],
    '批评':['pīpíng','phê bình'],
    '准备':['zhǔnbèi','chuẩn bị'],
    '封':['fēng','lượng từ cho thư'],
    '照片':['zhàopiàn','ảnh chụp'],
    '一帆风顺':['yì fān fēng shùn','thuận buồm xuôi gió'],
    '以后':['yǐhòu','sau một thời điểm hoặc sự việc'],
    '话':['huà','lời nói'],
    '句':['jù','lượng từ đếm câu, lời nói'],
    '着':['zhe','trợ từ chỉ trạng thái hoặc cách thức đang tiếp diễn trong ngữ cảnh này'],
    '了':['le','trợ từ, có thể báo việc đã xảy ra hoặc tình huống đổi khác'],
    '请进':['qǐng jìn','xin mời vào'],
    '读':['dú','đọc'],
    '比赛':['bǐsài','thi đấu hoặc cuộc thi đấu'],
    '年龄':['niánlíng','độ tuổi'],
    '不用谢':['bú yòng xiè','không cần cảm ơn'],
    '再见':['zàijiàn','tạm biệt'],
    '告诉':['gàosu','nói cho ai biết'],
    '记得':['jìde','còn nhớ'],
    '爱':['ài','yêu, ưa hoặc có thói quen làm điều gì']
  };

  add('finish-school',['tot-nghiep','tat-va-bat'],'毕业',[
    ['开学','开学 nói buổi học hoặc học kỳ bắt đầu. Câu đang nói người học hoàn thành cả chương trình.'],
    ['上课','上课 là đi học một buổi hoặc lên lớp. Đó chưa phải mốc ra trường.'],
    ['工作','工作 nói việc làm. Nhân vật đang nói mốc học xong, chưa nói làm ở đâu.']
  ], ['我明年大学＿。','Còn năm cuối đại học. Bạn báo cho người nhà khi nào mình ra trường.','Sang năm tôi tốt nghiệp đại học.','大学 đặt bậc học. Động từ chính phải gọi việc hoàn thành bậc học ấy.'],
     ['她六月＿，七月开始找工作。','Cô ấy học xong vào tháng sáu và tháng bảy bắt đầu tìm việc.','Cô ấy tốt nghiệp tháng sáu, tháng bảy bắt đầu tìm việc.','Tháng sáu khép chuyện học. Hành động tìm việc thuộc tháng sau nên hai mốc cần hai động từ riêng.']);

  add('employment',['tot-nghiep','dieu-dieu'],'工作',[
    ['上课','上课 là lên lớp. Sau khi ra trường, nhân vật đang tìm một công việc có thể làm.'],
    ['学习','学习 là học. Sau 找, câu này cần một danh từ chỉ thứ người ấy đi tìm.'],
    ['学校','学校 là trường học. Đó là địa điểm, còn nhân vật đang xin việc làm.']
  ], ['她毕业以后想在北京找＿。','Cô mới ra trường đang đi xin việc ở Bắc Kinh.','Sau khi tốt nghiệp, cô ấy muốn tìm việc làm ở Bắc Kinh.','Sau 找 là thứ mình đi tìm. 工作 ở đây là danh từ “việc làm”.'],
     ['我弟弟刚找到一份新＿。','Em trai vừa nhận được việc mới.','Em trai tôi vừa tìm được một công việc mới.','一份 đếm một công việc. 新 đứng trước danh từ để bổ nghĩa.']);

  add('at-hotel',['tat-va-bat','hanh-va-hang'],'宾馆',[
    ['银行','银行 là nơi rút, gửi hoặc đổi tiền. Câu có nhận phòng và nghỉ qua đêm.'],
    ['学校','学校 là nơi học. Người nói đang hỏi chỗ có thể thuê phòng nghỉ.'],
    ['房间','房间 là căn phòng. Câu cần tên cơ sở có các phòng cho khách thuê.']
  ], ['我们先去＿拿房卡，晚上再出来吃饭。','Đến một thành phố lạ, bạn muốn nhận thẻ phòng trước.','Chúng ta đến khách sạn lấy thẻ phòng trước, tối lại ra ngoài ăn.','拿房卡 gợi nơi thuê phòng. 宾馆 làm đích của 去.'],
     ['火车太晚了，他们在车站旁边找了一家＿。','Hai người cần chỗ ở qua đêm gần ga.','Tàu muộn quá, họ tìm một khách sạn cạnh ga.','一家 dùng để chỉ một cơ sở. Hoàn cảnh cần chỗ ngủ, nên danh từ gọi nơi lưu trú.']);

  add('at-bank',['hanh-va-hang','shang-yang'],'银行',[
    ['宾馆','宾馆 dùng để gọi chỗ ở của khách. Trong câu, người nói cần dịch vụ rút hoặc đổi tiền.'],
    ['商店','商店 là cửa hàng bán đồ. Câu đang nói đến giao dịch với tài khoản hoặc tiền tệ.'],
    ['车站','车站 là ga hoặc trạm. Không có chuyến xe nào được hỏi ở đây.']
  ], ['我去＿取钱，你在门口等我。','Cần lấy tiền mặt từ tài khoản.','Tôi vào ngân hàng rút tiền, bạn đợi tôi ở cửa.','取钱 nói việc làm ở nơi vừa nêu. Bối cảnh tài khoản xác định đó là 银行.'],
     ['这家＿周六也能换钱。','Bạn cần biết chỗ đổi ngoại tệ vào thứ bảy.','Ngân hàng này thứ bảy vẫn đổi tiền được.','换钱 là dịch vụ được hỏi. 家 đếm cơ sở, nên chọn tên nơi cung cấp dịch vụ.']);

  add('luggage',['hanh-va-hang'],'行李',[
    ['钱','钱 là tiền. Câu đang nói một va li hoặc kiện hành lý cồng kềnh.'],
    ['房间','房间 là căn phòng. Một căn phòng không phải món đem theo từ nơi này sang nơi khác.'],
    ['手机','手机 có thể mang theo, nhưng cảnh nói về va li hoặc kiện đồ đi đường, không phải điện thoại.']
  ], ['这件＿太重，我一个人拿不动。','Chiếc va li đi đường nặng quá, bạn nhờ người nâng cùng.','Kiện hành lý này nặng quá, mình tôi không nhấc nổi.','件 đếm một kiện đồ. 拿不动 cho biết vật ấy mang đi được nhưng quá nặng với người nói.'],
     ['她把＿留在宾馆，只带了钱包。','Cô ấy gửi va li ở khách sạn rồi ra ngoài tay nhẹ.','Cô ấy để hành lý tại khách sạn, chỉ mang ví theo.','Chỗ trống là vật bị để lại trong khung 把…留在…. Hành lý đối lập với chiếc ví được mang đi.']);

  add('temperature-drop',['giang-hang','qi'],'降温',[
    ['下雨','下雨 nói có mưa. Con số nhiệt độ và việc mặc thêm áo mới là chi tiết câu cần diễn đạt.'],
    ['投降','投降 nói bên chịu thua đối phương. Chủ đề ở đây là thời tiết.'],
    ['生气','生气 nói ai đó bực mình. Dự báo và số độ thuộc về trời, không phải cảm xúc.']
  ], ['明天会＿，出门记得多穿一件。','Dự báo trời từ 24 độ xuống 15 độ.','Mai trời sẽ hạ nhiệt, ra ngoài nhớ mặc thêm một lớp.','会 đưa ra dự báo. Việc mặc thêm áo hợp với trời lạnh đi khi nhiệt độ hạ.'],
     ['夜里可能会＿，窗户早点儿关上吧。','Đêm có luồng lạnh khiến nhiệt độ đi xuống.','Đêm có thể hạ nhiệt, đóng cửa sổ sớm đi.','可能会 nói khả năng. Câu đang nói thay đổi của nhiệt độ, chưa nói có mưa.']);

  add('surrender',['giang-hang'],'投降',[
    ['降温','降温 là nhiệt độ giảm. Người trong câu chịu thua trước một phía khác.'],
    ['调整','调整 là điều chỉnh. Việc buông vũ khí có ý nghĩa dừng chống cự.'],
    ['出发','出发 là khởi hành. Câu xác nhận bên kia chấp nhận thua, không kể một chuyến đi.']
  ], ['他们最后放下武器，＿了。','Một cảnh trong truyện. Phía yếu hơn buông vũ khí và chịu thua.','Cuối cùng họ buông vũ khí và đầu hàng.','放下武器 đặt nghĩa cho hành động kế tiếp. 最后 đưa người đọc tới kết cục.'],
     ['故事里，那支队伍被包围后终于＿了。','Trong truyện, đội bị vây và chấp nhận không chống cự nữa.','Trong truyện, đội ấy rốt cuộc đầu hàng sau khi bị bao vây.','终于 nêu việc cuối cùng đã xảy ra. Bên bị vây làm chủ thể của động từ đầu hàng.']);

  add('adjustment',['dieu-dieu'],'调整',[
    ['调查','调查 tìm thông tin chưa biết. Ở đây đã biết giờ cũ và cần đổi giờ.'],
    ['毕业','毕业 gọi việc học xong. Sau động từ còn có lịch, là thứ cần sửa cho vừa.'],
    ['停止','停止 là dừng. Đổi giờ mà vẫn tiếp tục công việc thì cần động từ khác.']
  ], ['下周的工作时间得＿一下。','Lịch giờ làm tuần tới không còn phù hợp, nên cần sửa một chút.','Giờ làm tuần tới phải điều chỉnh một chút.','得 báo việc phải làm. 一下 cho biết một lần sửa nhẹ, còn 工作时间 là thứ cần sửa.'],
     ['下午两点不行，我们能＿开会的时间吗？','Cuộc họp vẫn diễn ra, bạn chỉ muốn chuyển giờ.','Hai giờ chiều không được, mình điều chỉnh giờ họp được không?','开会的时间 là đối tượng của 调整. Bạn hỏi có thể đổi mốc họp, chứ chưa hủy cuộc họp.']);

  add('investigate',['dieu-dieu','thuy'],'调查',[
    ['调整','调整 là thay đổi cho phù hợp. Nhóm còn đang tìm xem chuyện gì đã xảy ra.'],
    ['表演','表演 là biểu diễn. Câu nói thu thập thông tin về một sự việc.'],
    ['降温','降温 nói hạ nhiệt. Câu đang tìm nguyên nhân của sự việc, không nói về số độ.']
  ], ['到底发生了什么？他们正在＿这件事。','Nguyên nhân chưa rõ. Một nhóm đang hỏi và kiểm tra dữ kiện.','Rốt cuộc đã xảy ra chuyện gì? Họ đang điều tra việc này.','正在 đặt việc vào lúc diễn ra. 这件事 là sự việc đang được tìm hiểu.'],
     ['我们先＿原因，知道以后再想办法。','Trước khi sửa, phải tìm vì sao xảy ra lỗi.','Ta điều tra nguyên nhân trước, biết rồi mới nghĩ cách.','先…再… tách hai bước. Bước đầu là tìm nguyên nhân, chưa phải đổi cách làm.']);

  add('classroom',['mot-tieng-thay','neutral-tone'],'老师',[
    ['学生','学生 là người đi học. Trong câu, người được gọi đứng ở vị trí dạy hoặc giảng.'],
    ['师傅','师傅 hợp khi gọi người có nghề trong việc nhờ vả. Câu đang ở quan hệ giáo viên với lớp.'],
    ['先生','先生 có nhiều cách dùng. Ở trường và gọi theo họ cho đúng vai dạy lớp, dùng danh xưng 老师.']
  ], ['陈＿，您能再说一遍吗？','Bạn xin cô Trần, giáo viên đang đứng lớp, nhắc lại một lần.','Thưa cô Trần, cô có thể nói lại một lần không ạ?','Họ 陈 đi trước danh xưng 老师. Dấu phẩy tách lời gọi khỏi điều bạn muốn hỏi.'],
     ['我在学校遇见了教我们中文的＿。','Bạn vừa gặp người dạy tiếng Trung của lớp ở trường.','Tôi gặp giáo viên dạy tiếng Trung cho chúng tôi ở trường.','教我们中文的 đứng trước và làm rõ người được gặp là ai. Danh từ phải chỉ người dạy.']);

  add('ask-a-driver',['mot-tieng-thay','register'],'师傅',[
    ['老师','老师 thường gọi người dạy học. Người nghe trong cảnh này là tài xế hoặc thợ được nhờ làm việc.'],
    ['学生','学生 chỉ người học, không nói đúng vai người cầm lái hay người sửa xe.'],
    ['师父','师父 thích hợp khi nhấn quan hệ truyền dạy. Câu đang xưng hô trong một lời nhờ dịch vụ.']
  ], ['＿，请在前面的路口停车。','Đang ngồi xe, bạn nhờ bác tài dừng ở ngã tư trước mặt.','Bác tài ơi, xin dừng ở ngã tư phía trước.','Chỗ trống đứng trước dấu phẩy, làm lời gọi tài xế. 师傅 là cách gọi quen trong cảnh đi xe.'],
     ['＿，您能看看这辆车吗？它坏了。','Bạn nhờ một người thợ ở tiệm sửa xe xem xe bị hỏng.','Bác thợ ơi, bác xem giúp chiếc xe này được không? Nó hỏng rồi.','Người nghe được nhờ nhờ vào tay nghề. Bạn gọi người thợ trong vai đang sửa xe.']);

  add('modest-answer',['khiem-va-kiem'],'过奖',[
    ['生气','生气 nói giận. Người nghe vừa khen, và nhân vật muốn đáp lại cho lịch sự.'],
    ['兼任','兼任 nói giữ thêm chức. Một lời khen không đi với nghĩa đó.'],
    ['批评','批评 là phê bình. Người trước vừa tán dương, và lời đáp muốn nhẹ bớt mức khen.']
  ], ['您＿了，我还在学习。','Có người khen bạn nói tiếng Trung rất hay. Bạn đáp khiêm nhường.','Anh/chị quá khen, tôi vẫn đang học.','您 là người vừa khen. 过奖了 là lời đáp về mức khen chứ không phải tự khen mình.'],
     ['哪里哪里，您＿了。这是大家一起做的。','Được khen về kết quả của cả nhóm, bạn chia công cho mọi người.','Đâu có, anh/chị quá khen. Đây là việc mọi người cùng làm.','哪里哪里 và câu nhắc công của cả nhóm cho biết người nói đang đỡ lời khen.']);

  add('extra-position',['khiem-va-kiem'],'兼任',[
    ['过奖','过奖 đáp lại lời khen. 班主任 là tên chức mà người trong câu đảm nhận.'],
    ['学习','学习 là học kiến thức hoặc kỹ năng. Ở đây người nói gọi việc đảm nhiệm thêm chức.'],
    ['准备','准备 là chuẩn bị. Cô ấy thực sự giữ thêm chức, không chỉ sắp chuẩn bị để làm.']
  ], ['她教中文，也＿班主任。','Cô giáo dạy tiếng Trung và còn làm giáo viên chủ nhiệm.','Cô ấy dạy tiếng Trung và cũng kiêm nhiệm chức chủ nhiệm lớp.','也 thêm một vai. 班主任 theo sau động từ chỉ việc giữ cùng lúc thêm chức ấy.'],
     ['他在学校教书，还＿图书馆馆长。','Ngoài công việc dạy, người đó giữ luôn một chức ở thư viện.','Anh ấy dạy ở trường và còn kiêm chức giám đốc thư viện.','还 thêm việc thứ hai. Chỗ trống phải nối người ấy với cả chức vụ được nêu sau.']);

  add('return-home',['gia','be-dau'],'家',[
    ['学校','学校 là trường học. Nhân vật đang trở về nơi ở cùng gia đình.'],
    ['房间','房间 chỉ một căn phòng. Câu nói cả nơi mình trở về, không chỉ phòng bên trong.'],
    ['银行','银行 là nơi giao dịch tiền. Lời nhắn đang nói việc về nhà.']
  ], ['下班后我先回＿，再去买菜。','Tan làm, bạn ghé nơi ở trước rồi đi chợ.','Tan làm tôi về nhà trước, rồi mới đi mua đồ ăn.','回 cần một đích trở về. 回家 là cụm thông dụng, với 家 là nơi ở.'],
     ['孩子们放学就回＿吃饭。','Học sinh tan học và ăn cơm ở chỗ ở của gia đình.','Bọn trẻ tan học là về nhà ăn cơm.','回家 rồi 吃饭 là hai việc nối nhau. 家 nêu đích về, không phải người làm việc.']);

  add('fixed-location',['gia','space-time','shuowen'],'在',[
    ['有','有 dùng khi giới thiệu thứ có mặt ở đâu. Câu đưa sẵn người hoặc vật rồi xác định vị trí của họ.'],
    ['是','是 dùng để xác định ai hay cái gì. Câu trả lời “ở đâu”, nên cần động từ vị trí.'],
    ['到','到 nêu chuyển động đến đích. Câu đang hỏi nơi họ đang ở hoặc nơi đồ đang nằm.']
  ], ['你找的那把椅子＿门口。','Bạn đã biết chiếc ghế nào. Bây giờ hỏi nó đang ở đâu.','Chiếc ghế bạn tìm ở cửa ra vào.','那把椅子 đứng đầu vì đã biết. 在 theo sau và đặt nó vào vị trí 门口.'],
     ['老师＿办公室，你可以去找她。','Bạn chỉ cho bạn mình chỗ giáo viên đang ở.','Cô giáo đang ở văn phòng, bạn có thể đến tìm cô ấy.','老师 là người đã nói tới. 在办公室 trả lời nơi người ấy đang có mặt.']);

  add('book-counter',['thu','viet-couplets'],'本',[
    ['张','张 thường đếm những thứ như tờ giấy hoặc vé. 书 ở đây là quyển có đóng trang.'],
    ['杯','杯 đếm theo cốc. 书 được đếm như một quyển, không theo vật đựng.'],
    ['封','封 là lượng từ dùng cho thư. Sau chỗ trống là sách để đọc.']
  ], ['我在书店买了一＿汉语书。','Bạn mua một quyển sách tiếng Trung ở hiệu sách.','Tôi mua một quyển sách tiếng Trung ở hiệu sách.','Trong 一…汉语书, chỗ trống là lượng từ. 本 đếm quyển sách.'],
     ['桌上有两＿词典，你要左边的还是右边的？','Trên bàn có hai quyển từ điển.','Trên bàn có hai quyển từ điển, bạn lấy quyển bên trái hay bên phải?','Từ điển được đếm theo quyển. 两 đứng trước lượng từ 本, rồi mới tới danh từ 词典.']);

  add('letter',['thu'],'信',[
    ['书','书 thường là sách. 一封 và việc gửi qua bưu điện nhận diện lá thư trong câu.'],
    ['手机','手机 là điện thoại. 一封 là lượng từ dành cho thư, không phải đồ dùng.'],
    ['照片','照片 là ảnh. Một tấm ảnh thường dùng 一张, còn câu nói lá thư viết cho người nhận.']
  ], ['她给父母写了一封＿。','Cô ấy tự tay viết một lá thư cho bố mẹ.','Cô ấy viết một lá thư cho bố mẹ.','写 cho biết hành động, 给父母 cho biết người nhận. 一封 chỉ một lá thư.'],
     ['他收到一封从家里寄来的＿。','Có thư gửi từ nhà tới, nhân vật vừa nhận được.','Anh ấy nhận được một lá thư gửi từ nhà.','从家里寄来的 bổ nghĩa cho danh từ ở cuối. 一封 cho biết thứ được gửi là thư.']);

  add('liquid-water',['thuy','qi'],'水',[
    ['茶','茶 là trà. Người nói nêu rõ muốn nước đun rồi để nguội, không pha lá trà.'],
    ['果汁','果汁 làm từ trái cây. Bạn chỉ muốn nước lọc.'],
    ['东西','东西 nói đồ vật nói chung. Sau lượng từ 杯, câu cần gọi đồ uống cụ thể.']
  ], ['请给我一杯凉白开，也就是烧开后放凉的＿。','Bạn giải thích rằng mình muốn nước đun sôi để nguội.','Cho tôi một cốc nước đun sôi để nguội, tức nước đã đun sôi rồi để nguội.','烧开后放凉的 mô tả thứ chất lỏng. Trong cảnh này, thứ đó là 水.'],
     ['我刚跑完，只想喝一点儿＿，什么都不用加。','Vừa chạy xong, bạn chỉ muốn uống ít nước lọc.','Tôi vừa chạy xong, chỉ muốn uống một chút nước, không cần thêm gì.','一点儿 nói lượng. Cảnh chỉ nước uống thường, không pha trà hay ép từ trái cây.']);

  add('truth-emerges',['thuy'],'水落石出',[
    ['一帆风顺','一帆风顺 chúc mọi việc thuận lợi. Câu nói lúc một bí mật được làm rõ.'],
    ['生气','生气 nói cảm xúc. Chuyện ở đây là tìm rõ chân tướng từ chứng cứ.'],
    ['下雨','下雨 tả thời tiết. Cụm cần điền nói sự thật hiện ra khi có bằng chứng.']
  ], ['证据都找到了，事情终于＿。','Nhờ đủ chứng cứ, bây giờ mọi người hiểu sự thật của vụ việc.','Đã tìm đủ chứng cứ, chân tướng sự việc cuối cùng cũng rõ.','证据 và 事情 đặt cụm bốn chữ vào nghĩa bóng. 终于 đánh dấu lúc sự thật hiện ra.'],
     ['警察找到新的证据，让这个谜终于＿。','Chứng cứ mới giải được một bí ẩn đã lâu.','Cảnh sát tìm ra chứng cứ mới, cuối cùng làm sáng tỏ bí ẩn này.','让 nối nguyên nhân với kết quả. Ở đây kết quả là điều bí ẩn đã được giải.']);

  add('in-the-past',['be-dau'],'以前',[
    ['现在','现在 là bây giờ. Mệnh đề sau dành cho hiện tại, còn chỗ trống đặt cảnh cũ.'],
    ['明天','明天 chỉ ngày mai. Cảnh cũ đã có trước ngày nói.'],
    ['以后','以后 nhìn về sau một mốc. Câu đang nhìn lại nơi ấy trước khi thay đổi.']
  ], ['＿这儿是田，现在已经有了很多房子。','Nhìn khu dân cư mới, bạn kể ngày xưa chỗ này là ruộng.','Trước kia đây là ruộng, bây giờ đã có nhiều nhà.','以前 mở phần hồi tưởng. 现在 mở phần đối chiếu về hiện tại.'],
     ['他＿住在海边，后来搬到了山里。','Nhà cũ của người đó ở cạnh biển. Về sau mới dọn lên miền núi.','Anh ấy trước kia ở gần biển, về sau dọn vào miền núi.','以前 đặt mốc cũ cho 住. 后来 đánh dấu sự kiện đến sau.']);

  add('transformation',['be-dau'],'变',[
    ['在','在 đặt một vật ở vị trí nào. Ở đây 成 dẫn trạng thái mới của chính chỗ ấy.'],
    ['看','看 là nhìn hoặc xem. Cảnh mô tả bản thân nơi đó đã đổi khác.'],
    ['回','回 là quay về. Câu đang nói thay dạng từ trạng thái trước sang trạng thái sau.']
  ], ['那片田后来＿成了一个小公园。','Chỗ từng là ruộng đã trở thành công viên.','Thửa ruộng đó về sau biến thành một công viên nhỏ.','变成 nối trạng thái cũ với kết quả mới. 一个小公园 gọi kết quả.'],
     ['几年没回来，河边都＿样了。','Sau nhiều năm quay lại, bạn thấy bờ sông khác hẳn.','Mấy năm không về, bờ sông đã đổi khác hết rồi.','变样 là đổi dáng vẻ. 都 mở rộng lời nhận xét ra toàn đoạn bờ sông đang nhìn.']);

  add('to-the-recipient',['thu','viet-couplets','register'],'给',[
    ['和','和 nối hai phía cùng tham gia. Câu cần nêu ai nhận thư hoặc món đồ.'],
    ['从','从 chỉ phía bắt đầu. Trong câu này người đứng sau là đích đến của hành động.'],
    ['在','在 đặt hành động ở một địa điểm. Người đứng sau chỗ trống là người nhận, không phải nơi hành động diễn ra.']
  ], ['我想＿妈妈写一封信。','Bạn viết thư để mẹ là người nhận.','Tôi muốn viết một lá thư cho mẹ.','给妈妈 đặt người nhận trước hành động 写一封信.'],
     ['过年了，我＿邻居送了一张贺卡。','Bạn đem thiệp chúc Tết tặng hàng xóm.','Tết đến, tôi tặng hàng xóm một tấm thiệp chúc mừng.','Chỗ trống mở người nhận thiệp. 送 nói hành động chuyển thiệp từ người tặng sang người nhận.']);

  add('han-character',['viet-couplets','shuowen'],'字',[
    ['书','书 là sách hoặc quyển sách. Người nói hỏi một mặt chữ riêng lẻ.'],
    ['话','话 là lời nói. Cảnh đang nhận diện một ký tự được viết trên giấy.'],
    ['句','句 có thể đếm câu. Người hỏi chọn một mặt chữ, không chọn cả câu.']
  ], ['你知道这个＿怎么读吗？','Bạn chỉ vào một chữ Hán trên tấm biển.','Bạn biết chữ này đọc thế nào không?','这个 ở đây chỉ một mặt chữ. 怎么读 theo sau hỏi cách đọc nó.'],
     ['这两个＿写得很像，可是读音不同。','Bạn đang so hai mặt chữ trông gần giống nhau.','Hai chữ này viết khá giống nhau nhưng cách đọc khác nhau.','两个 đếm hai ký tự. 写得很像 nhận xét hình viết của chúng.']);

  add('past-experience',['neutral-tone','lich-duyet','tot-nghiep'],'过',[
    ['着','着 nói cách một trạng thái hoặc hành động còn kéo dài. Câu hỏi kinh nghiệm đã từng có.'],
    ['再','再 đứng trước động từ nếu nói sẽ làm thêm lần nữa. Chỗ trống ở sau động từ và nhắm tới lần đã trải qua.'],
    ['得','得 thường nối động từ với bổ ngữ. Sau động từ ở đây cần dấu hiệu của trải nghiệm.']
  ], ['你以前去＿北京吗？','Bạn hỏi người kia đã từng đến Bắc Kinh lần nào chưa.','Trước đây bạn từng đến Bắc Kinh chưa?','过 đi ngay sau 去. Có 以前, câu hỏi nhắm tới kinh nghiệm trước lúc nói.'],
     ['这道菜我吃＿一次，味道还记得。','Bạn đã ăn thử món đó một lần và vẫn nhớ vị.','Món này tôi từng ăn một lần, vẫn nhớ hương vị.','过 gắn với 吃, còn 一次 đếm lần đã trải qua. Chỗ trống đánh dấu kinh nghiệm.']);

  add('general-things',['neutral-tone'],'东西',[
    ['行李','行李 là hành lý đi xa. Câu nói đồ nói chung mà người đi mua chưa liệt kê ra.'],
    ['钱','钱 là tiền. Người nói sẽ dùng tiền để mua đồ, không nói mua tiền.'],
    ['前边','前边 chỉ phía trước. Sau 买 cần một thứ được mua.']
  ], ['我去超市买点儿＿，一会儿就回来。','Bạn ra siêu thị mua ít đồ lặt vặt rồi về ngay.','Tôi ra siêu thị mua ít đồ, lát là về.','买 gọi hành động. 点儿 đo một ít thứ mua chung. 东西 ở đây đọc nhẹ xi và có nghĩa “đồ”.'],
     ['别把＿都放在桌上，留一点儿空。','Bạn bảo người nhà đừng bày hết đồ lên bàn.','Đừng để hết đồ trên bàn, chừa lại một chút chỗ trống.','把 đưa những thứ bị di chuyển ra trước 放. Câu chỉ đồ vật nói chung, chưa nêu riêng loại nào.']);

  add('school',['han-viet','mot-tieng-thay'],'学校',[
    ['学生','学生 là người học. Sau 去 trong câu này cần nơi đến để dự buổi học.'],
    ['老师','老师 là người dạy. Câu đang chỉ nơi học sinh đi tới.'],
    ['宾馆','宾馆 đón khách lưu trú. Ở đây mục đích là đi học hoặc gặp giáo viên của mình.']
  ], ['孩子们早上坐车去＿上课。','Buổi sáng học sinh đi xe đến trường để học.','Buổi sáng bọn trẻ đi xe đến trường lên lớp.','去学校 nói đích đến. 上课 nêu việc làm khi đến đó.'],
     ['我下午去＿找班主任。','Chiều bạn đến trường gặp giáo viên chủ nhiệm.','Chiều tôi đến trường tìm giáo viên chủ nhiệm.','学校 chỉ nơi. Trong tiếng Việt cũng có yếu tố “học”, nhưng câu tiếng Trung cần nguyên từ để gọi địa điểm.']);

  add('know-a-person',['han-viet','shang-yang'],'认识',[
    ['知道','知道 hợp để nói biết một thông tin. Cảnh này hỏi hai người đã làm quen trực tiếp chưa.'],
    ['听','听 là nghe. Nhân vật đang nói mối quan hệ quen biết với một người.'],
    ['相信','相信 là tin ai đó. Hai người đã quen nhau là việc khác với tin lời nhau.']
  ], ['我＿那位老师，我们去年一起工作过。','Bạn quen trực tiếp cô giáo đó vì từng làm chung.','Tôi quen cô giáo ấy, chúng tôi từng làm việc chung năm ngoái.','那位老师 là người được biết trực tiếp. Vế sau giải thích hai người quen nhau từ đâu.'],
     ['你＿门口那个人吗？你们以前见过面吗？','Bạn hỏi người đối diện đã gặp và quen người đứng ở cửa chưa.','Bạn có quen người ở cửa không? Hai người từng gặp nhau chưa?','见过面 xác định câu hỏi nói về quen người. Nếu hỏi biết người ấy tên gì, dùng 知道 theo sau bởi thông tin.']);

  add('learn-to-do',['han-viet','shuowen'],'学会',[
    ['学','学 nói quá trình học. Trong cảnh đã tự làm được, 会 nêu kết quả đạt kỹ năng.'],
    ['写','写 chỉ hành động viết. Câu này nêu kết quả học được một kỹ năng.'],
    ['听','听 nói tiếp nhận âm thanh. Cả tình huống đặt trọng tâm vào làm được việc sau khi học.']
  ], ['练了两个月以后，她终于＿骑自行车了。','Sau hai tháng tập, cô ấy đã tự đi xe đạp được.','Sau hai tháng tập, cô ấy cuối cùng cũng học được cách đi xe đạp.','会 đi ngay sau 学 và chỉ kết quả. 骑自行车 gọi việc mà cô ấy nay làm được.'],
     ['他已经＿用中文点菜，今天可以自己说。','Từ sau khi tập, hôm nay anh tự gọi món bằng tiếng Trung được.','Anh ấy đã học được cách gọi món bằng tiếng Trung, hôm nay có thể tự nói.','可以自己说 ở sau kiểm chứng kết quả. 学会 phù hợp vì câu đi từ học đến làm được.']);

  add('there-is',['space-time'],'有',[
    ['在','在 hợp khi đã biết người hoặc vật rồi nói vị trí. Câu bắt đầu bằng vị trí để giới thiệu thứ mới có mặt.'],
    ['是','是 xác định đó là gì. Một danh từ kèm số lượng sau chỗ trống đang được giới thiệu là có mặt ở đây.'],
    ['去','去 chỉ đi tới. Bàn hoặc nơi ấy làm mốc có một vật, không phải chủ thể di chuyển.']
  ], ['桌子下面＿一只猫。','Bạn vô tình thấy một con mèo dưới bàn và báo cho người khác.','Dưới bàn có một con mèo.','桌子下面 mở khung vị trí. 有 đưa 一只猫 vào cuộc nói chuyện lần đầu.'],
     ['车站旁边＿一家小店，咱们去买水吧。','Bạn mới phát hiện cạnh ga có cửa hàng nhỏ.','Cạnh ga có một cửa hàng nhỏ, mình vào mua nước đi.','车站旁边 đứng đầu làm mốc. Sau 有 là thứ được giới thiệu, 一家小店.']);

  add('wait',['space-time'],'等',[
    ['找','找 là đi tìm. Bạn đã biết chỗ hẹn và được bảo ở đó chờ.'],
    ['跟','跟 chỉ đi theo hoặc cùng ai. Người kia chưa tới nên chưa thể đi cùng.'],
    ['走','走 nói đi hay rời chỗ. Lời nhắn yêu cầu ở yên cho đến khi gặp.']
  ], ['我还在路上，你在门口＿我吧。','Người gọi đang đi tới, bạn được nhờ chờ ở cửa.','Tôi vẫn đang trên đường, bạn đợi tôi ở cửa nhé.','在门口 đặt nơi. 我 là người được chờ và đứng sau 等.'],
     ['别走，我五分钟就到，请再＿一下。','Người kia sắp đến chỗ bạn, nhờ bạn nán lại một chút.','Đừng đi, năm phút nữa tôi tới. Xin đợi thêm một chút.','一下 thu ngắn phần hành động. Cảnh có người chưa đến, nên hành động là chờ.']);

  add('ask-politely',['register'],'请问',[
    ['请进','请进 mời vào trong. Người nói đang bắt đầu một câu hỏi.'],
    ['谢谢','谢谢 bày lời cảm ơn. Chỗ trống đứng trước điều bạn chưa biết và muốn hỏi.'],
    ['可以','可以 có thể hỏi sự cho phép. Đứng riêng trước dấu phẩy ở đây cần lời mở đầu lịch sự cho câu hỏi thông tin.']
  ], ['＿，去车站怎么走？','Bạn hỏi một người lạ đường đến ga.','Xin hỏi, đến ga đi thế nào ạ?','请问 đứng ngoài câu hỏi chính đi sau. Câu hỏi hướng đường bắt đầu từ 去车站.'],
     ['＿，这班车几点出发？','Bạn hỏi nhân viên giờ chuyến này khởi hành.','Xin hỏi, chuyến này khởi hành lúc mấy giờ?','请问 mở lời nhờ trả lời. 几点 mới là chi tiết thông tin người nói cần.']);

  add('write-it',['shuowen'],'写',[
    ['读','读 là đọc. Cảnh yêu cầu tạo mặt chữ bằng bút hoặc đưa phần viết vào ô.'],
    ['听','听 cần tiếp nhận âm thanh. Sau chỗ trống là thứ cần ghi ra trên mặt giấy.'],
    ['说','说 tạo lời bằng miệng. Câu đã chỉ tờ giấy hoặc ô để ghi.']
  ], ['请把你的名字＿在这张纸上。','Bạn đưa bút và tờ giấy để người kia ghi tên.','Xin viết tên bạn trên tờ giấy này.','把你的名字 đưa thứ được viết ra trước. 在这张纸上 cho vị trí của chữ đã viết.'],
     ['这里要＿日期，不是填电话号码。','Bạn đang chỉ người khác ghi ngày ở một mục trên phiếu.','Chỗ này cần viết ngày, không phải điền số điện thoại.','日期 là thông tin phải ghi thành chữ hoặc số. 这里 xác định ô trên giấy.']);

  add('lived-event',['lich-duyet'],'经历',[
    ['阅历','阅历 thường dùng như danh từ chỉ vốn sống. Chỗ trống ở đây là động từ đi với việc thực tế đã trải qua.'],
    ['日历','日历 là lịch để xem ngày. Câu kể một quãng đời hoặc một sự kiện từng đi qua.'],
    ['比赛','比赛 là thi đấu hoặc cuộc đấu. Câu này không có thi, chỉ nói từng sống qua hoàn cảnh khó khăn.']
  ], ['她＿过一段很困难的日子。','Cô ấy từng sống qua một quãng thời gian khó khăn.','Cô ấy từng trải qua một quãng thời gian rất khó khăn.','一段很困难的日子 là đối tượng của động từ. 过 đi sau động từ để nói từng trải qua.'],
     ['这家公司＿了三次搬家。','Công ty đã trải qua ba lần chuyển văn phòng.','Công ty này đã trải qua ba lần chuyển chỗ.','三次搬家 nêu những sự việc đã xảy ra. Câu đếm trải nghiệm, chưa nhận xét về vốn sống.']);

  add('accumulated-experience',['lich-duyet'],'阅历',[
    ['日历','日历 là lịch xem ngày. Câu đang nhận xét vốn sống của một người.'],
    ['工作','工作 là việc làm. Cảnh nhìn tổng thể những điều người ấy hiểu từ nhiều năm sống và gặp gỡ.'],
    ['年龄','年龄 là tuổi. Tuổi tác đếm bằng số, còn 丰富 ở đây nhận xét vốn sống.']
  ], ['她的＿很丰富，遇到难事也不慌。','Một người từng đi nhiều nơi, hiểu người hiểu việc và xử lý bình tĩnh.','Cô ấy có vốn sống phong phú, gặp chuyện khó cũng không hoảng.','很丰富 là vị ngữ nhận xét vốn sống. Câu tiếp cho một biểu hiện của vốn sống ấy.'],
     ['他年纪不大，＿却很丰富。','Người chưa nhiều tuổi nhưng đã trải qua nhiều cảnh và có vốn sống.','Anh ấy chưa lớn tuổi nhưng vốn sống rất phong phú.','却 làm nổi sự bất ngờ giữa còn trẻ và có vốn sống rộng. “Tuổi” đã được nêu riêng ở đầu câu.']);

  add('thanks-reply',['qi','khiem-va-kiem'],'不客气',[
    ['再见','再见 là lời chào tạm biệt. Lượt lời này cần đáp lời cảm ơn ngay trước.'],
    ['对不起','对不起 là xin lỗi. Người kia đang cảm ơn bạn, không có việc cần xin lỗi.'],
    ['过奖','过奖 đáp lời khen. 谢谢你帮我 nói lời cảm ơn vì được giúp.']
  ], ['A：谢谢你帮我找到了钥匙。 B：＿，举手之劳。','Bạn vừa giúp người kia tìm chìa khóa. Họ cảm ơn, bạn muốn đáp bằng công thức “không có gì”.','A: Cảm ơn bạn đã giúp tôi tìm thấy chìa khóa. B: Không có gì, chuyện nhỏ thôi.','Công thức cần điền đứng ngay sau lời cảm ơn. 举手之劳 tiếp lời, coi sự giúp đỡ là chuyện nhỏ.'],
     ['A：谢谢您帮我开门。 B：＿。','Một người cảm ơn vì bạn mở cửa giúp. Chọn lời đáp trực tiếp “không có gì”.','A: Cảm ơn anh/chị mở cửa giúp tôi. B: Không có gì.','谢谢您 mở lời cảm ơn. 不客气 là câu đáp cố định có thể đứng độc lập.']);

  add('make-yourself-at-home',['qi','register'],'别客气',[
    ['不客气','不客气 thường đáp lời cảm ơn. Cảnh này chủ nhà bảo khách cứ tự nhiên ăn hoặc lấy trà.'],
    ['不用谢','不用谢 nói không cần cảm ơn. Câu đang mời khách bớt giữ ý trước khi ăn uống.'],
    ['请问','请问 mở câu hỏi thông tin. Chủ nhà đang đưa ra một lời mời.']
  ], ['＿，茶和点心都在桌上，想吃就拿。','Chủ nhà thấy khách còn ngại, bảo cứ tự nhiên lấy bánh và trà.','Đừng khách sáo, trà và bánh đều ở trên bàn, muốn ăn thì cứ lấy.','别 bảo đừng giữ ý. Câu phía sau nói khách muốn thì có thể lấy ngay.'],
     ['＿，就当在自己家，想喝什么自己拿。','Chủ nhà muốn khách thoải mái như ở nhà riêng.','Đừng khách sáo, cứ coi như ở nhà mình, muốn uống gì thì tự lấy.','别客气 mở lời khuyến khích, còn 自己拿 nói rõ người khách có thể tự lấy.']);

  add('want-now',['ai'],'想',[
    ['喜欢','喜欢 diễn tả sở thích có thể lâu dài. Câu nói lúc này người đó muốn hoặc chưa muốn uống.'],
    ['爱','爱 có thể tả tình cảm hoặc một thói quen. Ở đây câu hỏi lựa chọn muốn làm ngay bây giờ.'],
    ['会','会 chỉ biết làm hoặc có khả năng. Câu hỏi ý định tức thời, không kiểm tra khả năng.']
  ], ['我平时喝茶，可是现在不＿喝。','Bạn thường uống trà nhưng lúc này không muốn uống.','Tôi thường uống trà, nhưng bây giờ không muốn uống.','现在 là mốc của ý muốn đang được phủ định. 喝 nêu việc người nói không muốn làm lúc này.'],
     ['你刚到家，现在＿先喝杯水吗？','Người kia vừa về đến nhà. Bạn hỏi lúc này có muốn uống nước trước không.','Bạn vừa về nhà, bây giờ muốn uống một cốc nước trước không?','Chỗ trống mở ý muốn ở mốc 现在. 先喝杯水 nói việc người ấy có thể muốn làm đầu tiên.']);

  add('a-long-term-liking',['ai'],'喜欢',[
    ['想','想 thường nêu muốn làm hoặc nhớ. Câu này đối chiếu sở thích từ lâu với việc lúc này có muốn làm.'],
    ['在','在 đặt nơi hoặc đánh dấu đang làm. Câu đang mô tả một sở thích.'],
    ['会','会 chỉ khả năng. Người nói có thể biết làm một việc mà không yêu thích nó.']
  ], ['她从小就＿画画，但今天太累，不想画。','Vẽ là sở thích từ nhỏ của cô ấy, hôm nay mệt nên không muốn vẽ.','Cô ấy thích vẽ từ nhỏ, nhưng hôm nay quá mệt, không muốn vẽ.','从小就 kéo dài theo nhiều năm. Câu sau dành riêng 不想 cho mong muốn hôm nay.'],
     ['我很＿喝茶，但睡觉以前不喝。','Người nói thích trà lâu nay, nhưng kiêng uống trước giờ ngủ.','Tôi rất thích uống trà, nhưng trước khi đi ngủ thì không uống.','很 chỉ mức độ yêu thích. Mệnh đề sau nói một giới hạn về thời điểm uống.']);

  add('money',['shang-yang'],'钱',[
    ['人','人 chỉ người. Câu đang nói tiền thưởng hoặc thứ đưa ra để trả.'],
    ['手机','手机 là điện thoại, có thể là đồ đem theo. Cảnh chỉ khoản tiền cần để thanh toán.'],
    ['衣服','衣服 là quần áo. Trong câu này, chỗ trống gọi thứ dùng để trả tiền công.']
  ], ['他把东西搬到门口以后才拿到＿。','Làm xong việc khuân đồ, anh mới được trả tiền công.','Anh ấy chuyển đồ tới cửa xong mới nhận được tiền.','才 đặt việc nhận tiền sau hành động đã xong. Tiền là thứ nhận được sau 拿到.'],
     ['买完这本书，我身上只剩一点儿＿了。','Mua sách xong, tiền mặt mang theo còn rất ít.','Mua xong quyển sách, tôi chỉ còn ít tiền trong người.','只剩一点儿 nói lượng còn lại sau khi chi. Mạch mua bán xác định đó là tiền.']);

  add('trust',['shang-yang'],'相信',[
    ['认识','认识 nói quen biết. Câu cần sự tin tưởng vào lời nói hoặc lời hứa của người ấy.'],
    ['告诉','告诉 đưa thông tin cho ai. Ở đây người nói tự nêu mình tin lời người kia.'],
    ['记得','记得 nói còn nhớ. Nhớ đã nghe lời hứa và tin nó sẽ được thực hiện là hai việc khác nhau.']
  ], ['他每次都说到做到，我当然＿他。','Người đó luôn làm đúng điều đã nói, nên bạn tin anh ấy.','Anh ấy lần nào cũng nói được làm được, tất nhiên tôi tin anh ấy.','说到做到 là căn cứ. 他 sau động từ là người được tin.'],
     ['看到他真的给了奖金，大家才＿那句话。','Sau khi tận mắt thấy phần thưởng được trao, mọi người mới tin lời hứa.','Thấy ông ấy thực sự trao tiền thưởng, mọi người mới tin lời đó.','才 nêu điều kiện đến lúc thấy bằng chứng mới tin. 那句话 là lời được tin.']);

  add('together',['jia','khiem-va-kiem'],'一起',[
    ['只','只 giới hạn phần sau. Câu muốn cho biết cả hai cùng làm một việc.'],
    ['先','先 tách một việc làm trước. Cảnh nhấn làm chung trong cùng lượt, không chia trước sau.'],
    ['又','又 nói một việc lặp hoặc thêm một việc. Câu không nêu lần trước, chỉ nói làm chung.']
  ], ['他们约好周末＿去看电影。','Hai người hẹn đi xem phim cùng nhau.','Họ hẹn cuối tuần cùng nhau đi xem phim.','一起 đứng trước cả 去看电影 và nói hai người cùng thực hiện.'],
     ['我们＿做晚饭吧，你切菜，我煮汤。','Bạn rủ người kia làm bữa tối cùng, rồi chia phần việc.','Mình cùng nấu bữa tối nhé, bạn thái rau, tôi nấu canh.','一起 áp lên cả việc nấu bữa tối. Chia việc sau đó vẫn là cùng làm một bữa.']);

  add('best-suited',['jia'],'最佳',[
    ['便宜','便宜 nói giá thấp. Câu dựa trên chất lượng hoặc sự phù hợp, không lấy giá làm tiêu chí.'],
    ['新','新 nói mới. Câu xếp một lựa chọn cao nhất trong các phương án.'],
    ['一起','一起 chỉ làm cùng nhau. Chỗ trống bổ nghĩa cho một phương án hoặc một thời điểm được chọn.']
  ], ['我们比较了几个办法，最后选出＿方案。','Sau khi so nhiều phương án, nhóm chọn phương án tốt nhất.','Chúng tôi so sánh vài cách và cuối cùng chọn phương án tốt nhất.','最佳 bổ nghĩa cho 方案. 最 thể hiện mức cao nhất trong nhóm đã so.'],
     ['想避开人多的时候，清晨是＿选择。','Muốn tránh đông, sáng sớm là lựa chọn phù hợp nhất.','Muốn tránh giờ đông người, sáng sớm là lựa chọn tốt nhất.','最佳 đặt trước 选择. Điều kiện tránh đông giải thích tiêu chí dùng để chọn.']);

  add('again-next',[],'再',[
    ['又','又 thường nhắc một lần lặp đã xảy ra. Trong câu này, lần tiếp theo được đề nghị hoặc dự định.'],
    ['过','过 theo sau động từ để nói từng có trải nghiệm. Chỗ trống đứng trước việc sẽ làm tiếp.'],
    ['已经','已经 nói việc đã diễn ra tới nay. Lượt thêm vẫn còn ở phía trước.']
  ], ['我没听清，你能＿说一遍吗？','Bạn muốn người nói nhắc thêm một lần.','Tôi chưa nghe rõ, bạn nói lại một lần được không?','再 đứng trước 说. 一遍 đếm trọn lần được xin nhắc lại.'],
     ['今天来不及，明天＿做吧。','Việc hôm nay chưa làm kịp, được hẹn mai làm tiếp.','Hôm nay không kịp, để mai làm nhé.','明天 đặt mốc tương lai và 再 hướng sang lần thực hiện sau mốc ấy.']);

  add('go-already',[],'已经',[
    ['正在','正在 nói việc đang diễn ra. Tới lúc được hỏi, việc mua trong câu đã xong.'],
    ['再','再 nói thực hiện lần nữa hoặc để sau mới làm. Ở đây người nói báo đã hoàn thành.'],
    ['想','想 nói ý muốn. Có sẵn món đồ hoặc đã tới nơi xác nhận kết quả rồi.']
  ], ['不用买票了，我＿买好了。','Bạn bảo bạn mình thôi mua vì mình đã mua xong.','Khỏi mua vé, tôi đã mua xong rồi.','已经 đặt hành động 买好 trước mốc nói. 好 cho biết việc mua đã hoàn thành.'],
     ['他＿到车站了，现在在等我们。','Người ấy đã tới ga, hiện đang đứng chờ.','Anh ấy đã đến ga rồi, bây giờ đang chờ chúng ta.','到车站了 xác nhận đã đến đích. 现在 mở một hành động khác đang diễn ra là chờ.']);

  add('in-progress',[],'正在',[
    ['已经','已经 có thể nói việc đã bắt đầu, nhưng câu cần nêu đang làm ngay lúc bạn gọi.'],
    ['以前','以前 báo thời trước. Người nói đang giải thích hiện không thể bắt máy vì làm việc đó.'],
    ['明天','明天 đặt việc ở ngày sau. Cảnh diễn ra ngay bây giờ.']
  ], ['我＿开会，一会儿给你回电话。','Bạn vừa gọi. Người kia đang họp, lát mới gọi lại.','Tôi đang họp, lát nữa gọi lại cho bạn.','正在 đứng trước 开会 để nêu việc diễn ra ngay lúc nói. 一会儿 đặt việc gọi lại sau đó.'],
     ['别进去，他们＿考试。','Bạn đứng trước phòng thi và được bảo chưa vào vì bên trong đang thi.','Đừng vào, họ đang thi.','Việc thi đang diễn ra là lý do cho lời dặn. 正在 báo trạng thái ở thời điểm hiện tại.']);

  add('because',[],'因为',[
    ['所以','所以 mở hệ quả. Chỗ trống đứng ngay trước lý do trời mưa hoặc bị sốt.'],
    ['但是','但是 báo ý trái chiều. Vế sau ở đây lý giải việc đã nói ở vế trước.'],
    ['然后','然后 nêu việc xảy ra tiếp theo. Vế sau trả lời “vì sao”, không nối thời điểm.']
  ], ['比赛取消了，＿雨下得太大。','Bạn giải thích lý do người ta hủy trận đấu.','Trận đấu đã bị hủy vì trời mưa quá to.','Vế đầu nói kết quả. 因为 có thể theo sau để giới thiệu lý do.'],
     ['她今天没来上课，＿她发烧了。','Bạn giải thích tại sao cô ấy nghỉ học hôm nay.','Hôm nay cô ấy không đi học vì bị sốt.','Không đi học là kết quả. Việc bị sốt đi sau 因为 và làm lý do.']);

  add('purchase',[],'买',[
    ['卖','卖 là bán. Người trong câu đưa tiền và muốn nhận món đồ.'],
    ['借','借 là mượn hoặc cho mượn. Tình huống này trả tiền để lấy món đồ làm của mình.'],
    ['送','送 là đem tặng hoặc đưa đi. Câu tập trung vào bước mua, trước khi món đồ có thể được tặng.']
  ], ['我想给弟弟＿一本词典。','Bạn chuẩn bị mua một quyển từ điển để tặng em.','Tôi muốn mua một quyển từ điển cho em trai.','给弟弟 nói người hưởng lợi. 买 đi trước 一本词典, quyển từ điển được mua.'],
     ['这张票我昨天就＿好了，明天直接进站。','Bạn đã trả tiền mua vé từ hôm qua.','Tôi đã mua xong vé này từ hôm qua, mai vào ga luôn.','买好 là đã mua xong. 车站 là chỗ sẽ dùng vé, không phải nơi câu nói mua lại.']);

  add('look-read',[],'看',[
    ['写','写 tạo văn bản mới. Cảnh này người nói đọc thông tin đã in.'],
    ['听','听 nhận âm thanh. Câu nói dùng mắt xem sách hoặc xem giờ.'],
    ['说','说 diễn đạt bằng lời. Người làm đang kiểm tra chữ trên lịch bằng mắt.']
  ], ['我＿了一下日历，下周一有空。','Bạn liếc lịch để kiểm tra ngày rảnh.','Tôi xem qua lịch một chút, thứ hai tuần tới rảnh.','看 lấy 日历 làm đối tượng. 一下 thu hành động thành một lượt ngắn.'],
     ['你能帮我＿一下这张表吗？','Bạn nhờ người cùng nhóm xem bản bảng đã in.','Bạn xem giúp tôi bảng này một chút được không?','帮我 nêu người được giúp, còn chỗ trống nói hành động xem bảng trong lời nhờ.']);

  add('ride-by',[],'坐',[
    ['开','开车 là lái xe. Người nói đi với tư cách hành khách, không lái tàu.'],
    ['拿','拿 là cầm. 火车 trong câu là phương tiện dùng để đi.'],
    ['等','等 là đợi. Câu đã hoàn tất hành trình và nói đến bằng phương tiện nào.']
  ], ['我是＿火车来的。','Bạn được hỏi đã đến bằng phương tiện gì. Bạn là hành khách đi tàu.','Tôi đến bằng tàu hỏa.','Cấu trúc 是…的 làm nổi phương tiện. 坐火车 chỉ đi tàu với tư cách hành khách.'],
     ['下雨了，我们＿地铁去吧。','Trời mưa, bạn đề nghị đi bằng tàu điện ngầm.','Trời mưa rồi, mình đi tàu điện ngầm nhé.','Phương tiện đứng sau 坐. 去 cho biết cả cụm nói cách đi tới đích.']);

  add('hours-duration',[],'小时',[
    ['点','点 dùng để đọc giờ trên đồng hồ. Câu hỏi một việc kéo dài bao lâu.'],
    ['岁','岁 đếm tuổi. Con số ở đây đo chặng đi hoặc quãng học trong ngày.'],
    ['年','年 đếm năm. Hai sự kiện trong câu cùng xảy ra trong một buổi, nên đơn vị cần ngắn hơn.']
  ], ['我从两点等到四点，一共等了两个＿。','Bạn đợi từ 2 giờ đến 4 giờ trong cùng chiều.','Tôi đợi từ hai giờ đến bốn giờ, tổng cộng hai tiếng.','两点 và 四点 là hai mốc. 两个小时 đo khoảng cách giữa hai mốc ấy.'],
     ['从上午九点到十一点，他学了两个＿的中文。','Buổi học bắt đầu lúc 9 giờ, kết thúc lúc 11 giờ.','Từ chín tới mười một giờ sáng, anh ấy học tiếng Trung hai tiếng.','Hai mốc cho độ dài buổi học. Cụm số lượng dùng 小时 chứ không lấy 点 của đồng hồ để đếm thời lượng.']);

  window.HAN_CLOZE_DATA = {entries,terms};
})();
