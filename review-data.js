/* Original personal review. This is not an official HSK mock examination. */
(() => {
 'use strict';
 const missions=[];
 const choice=(id,facet,mode,prompt,han,py,vn,answer,wrong,why,concept)=>({id,type:'choice',facet,mode,prompt,han,py,vn,answer,options:[answer,...wrong],why,concept});
 const typed=(id,prompt,han,py,vn,answers,why,concept)=>({id,type:'typed',facet:'syntax',mode:'read',prompt,han,py,vn,answers,answer:answers[0],why,concept});
 const output=(id,mode,prompt,checks,model,py,vn)=>({id,type:'output',mode,prompt,checks,model,py,vn,facet:'production'});
 const add=(id,glyph,title,goal,focus,scene,questions,links=[])=>missions.push({id,glyph,title,goal,focus,scene,questions,links});
 add('contact','联','Giới thiệu và giữ liên lạc','Giới thiệu mình, phân biệt người–đồ vật, đọc số điện thoại không mất số 0.',
  ['我','你','叫','名字','是','的','家','朋友','手机','电话','号','零','一','二','九'],
  'Bạn gặp một người bạn mới ở lớp tiếng Trung. Cần giới thiệu mình và ghi lại đúng số liên lạc.',[
   choice('phone-listen','listening','listen','Người nói cho số nào?','我的手机号是零九零一二零零八零五。','Wǒ de shǒujīhào shì líng jiǔ líng yī èr líng líng bā líng wǔ.','Số điện thoại của tôi là 0901200805.','0901200805',['901200805','0901208050','0902100805'],'Đọc từng chữ số, giữ số 0 đầu và hai số 0 liên tiếp. 一 có thể đọc yāo khi đọc mã số; không dùng 两 thay chữ số 2.','time'),
   choice('owner','syntax','read','Ai sở hữu chiếc điện thoại?','这是我姐姐的手机。','Zhè shì wǒ jiějie de shǒujī.','Đây là điện thoại của chị gái tôi.','Chị gái người nói',['Người nói','Người đang nghe','Chưa có ai sở hữu'],'我姐姐的 bổ nghĩa cho 手机; 的 nối người sở hữu với đồ vật.','roles'),
   typed('name-slot','Điền đúng một chữ vào ô để giới thiệu tên mình.','我___王明。','Wǒ ___ Wáng Míng.','Tôi tên là Vương Minh.',['叫','是'],'我叫王明 là cách nói tên; 我是王明 cũng đúng, thường dùng khi giới thiệu hoặc xác nhận mình là Vương Minh. Cả hai được chấp nhận trong ô này.','roles'),
   typed('not-have','Chỉ sửa từ phủ định: 我不有手机。','我不有手机。','','Ý cần nói: tôi không có điện thoại.',['我没有手机。','我没手机。'],'Phủ định 有 dùng 没有, thường rút thành 没 trong khẩu ngữ. Không dùng 不有.','negative'),
   choice('know-person','meaning','read','Điền từ hợp ý “Tôi quen cô ấy”.','我___她，她是我的朋友。','Wǒ ___ tā, tā shì wǒ de péngyou.','Tôi quen cô ấy, cô ấy là bạn tôi.','认识',['知道','会','可以'],'认识 nói quen/nhận biết một người. 知道 nói biết thông tin; 会 thường nói kỹ năng hoặc khả năng dự báo theo ngữ cảnh.','modals'),
   choice('gender','form','read','Chỉ nhìn chữ viết, nhóm nào được ghi là toàn nữ?','他们 / 她们 / 它们','tāmen / tāmen / tāmen','Họ / họ / chúng.','她们',['他们','它们','Cả ba đều chỉ nhóm toàn nữ'],'Ba từ cùng âm tāmen. 她 giúp phân biệt nhóm nữ trong chữ viết; nghe tāmen riêng lẻ không đủ biết giới tính.','wordbuilding'),
   output('introduce','speak','Nói 30–45 giây: tên, nước hoặc nơi sống, bạn học gì, rồi hỏi tên người đối diện. Dùng thông tin thật.',
    ['Có lời giới thiệu tên','Có một thông tin về mình','Có câu hỏi mời người kia trả lời','Nói lại lần hai mà không nhìn mẫu'],
    '你好，我叫王明。我是越南人。我学习汉语。你叫什么名字？','Nǐ hǎo, wǒ jiào Wáng Míng. Wǒ shì Yuènán rén. Wǒ xuéxí Hànyǔ. Nǐ jiào shénme míngzi?','Chào bạn, tôi tên Vương Minh. Tôi là người Việt Nam. Tôi học tiếng Trung. Bạn tên gì?'),
   output('contact-message','write','Viết 3 câu để gửi bạn mới: chào, nói tên, hỏi số điện thoại. Không cần điền số thật vào bài.',
    ['Giới thiệu đúng tên người nói','Hỏi số, không hỏi thiết bị','Trật tự câu hỏi giữ nguyên mẫu câu trần thuật'],
    '你好，我叫王明。你的手机号是多少？我们明天见吧。','Nǐ hǎo, wǒ jiào Wáng Míng. Nǐ de shǒujīhào shì duōshao? Wǒmen míngtiān jiàn ba.','Chào bạn, tôi tên Vương Minh. Số điện thoại của bạn là bao nhiêu? Mai gặp nhé.')]);
 add('schedule','时','Tan ca và đổi giờ hẹn','Đọc đúng giờ, đặt thời gian trước hành động và phân biệt mốc giờ với khoảng thời gian.',
  ['明天','今天','上午','中午','下午','晚上','点','分','半','两','二','上班','下班','后'],
  'Ngày mai bạn làm việc rồi gặp bạn ở nhà hàng. Giờ hẹn vừa đổi; cần nhắn lại để không ai đến sai.',[
   choice('time-listen','listening','listen','Giờ tan ca là lúc nào?','我明天下午两点零五分下班。','Wǒ míngtiān xiàwǔ liǎng diǎn líng wǔ fēn xiàbān.','Chiều mai tôi tan ca lúc 14:05.','14:05 ngày mai',['02:05 hôm nay','14:50 ngày mai','09:05 ngày mai'],'下午两点 là 14 giờ; 零五分 là 05 phút. Đây là hai chỗ bạn từng luyện, nên nghe hết cả buổi và phút.','time'),
   typed('two-clock','Điền đúng một chữ vào giờ trong cách nói thường dùng.','下午___点二十分。','Xiàwǔ ___ diǎn èrshí fēn.','2 giờ 20 phút chiều.',['两'],'Thường nói 两点 cho 2 giờ; phần 20 phút là 二十分, không phải 两十分.','time'),
   typed('remove-shi','Đưa giờ lên trước 下班 và bỏ chữ 是 thừa.','我下班是晚上六点半。','','Tôi tan ca lúc 6 giờ rưỡi tối.',['我晚上六点半下班。','晚上六点半我下班。'],'Cần đưa mốc giờ lên trước 下班 và bỏ 是. Mẫu: chủ ngữ + thời gian + động từ; thời gian cũng có thể đứng đầu câu.','time'),
   choice('gap','inference','read','Hai mốc cách nhau bao lâu?','我九点上班，下午两点下班。','Wǒ jiǔ diǎn shàngbān, xiàwǔ liǎng diǎn xiàbān.','Tôi bắt đầu làm lúc 9 giờ, tan ca lúc 14 giờ.','5 giờ theo đồng hồ',['5 giờ làm liên tục không nghỉ','7 giờ','Chưa thể tính khoảng cách đồng hồ'],'14:00 − 09:00 = 5 giờ. Chưa biết có nghỉ giữa ca hay không, nên không khẳng định 5 giờ làm liên tục.','time'),
   choice('daypart','meaning','read','Chọn nhóm theo thứ tự trong ngày.','','','','早上 → 上午 → 中午 → 下午 → 晚上',['上午 → 早上 → 下午 → 中午 → 晚上','早上 → 中午 → 晚上 → 上午 → 下午','白天 → 昨天 → 明天 → 今天'],'早上 thường chỉ buổi sáng sớm, 上午 phần trước trưa. Ranh giới cụ thể linh hoạt theo ngữ cảnh; đây là thứ tự khái quát.','time'),
   choice('plan-time','syntax','read','Lịch mới đã được chốt chưa?','我们明天下午三点去，可以吗？','Wǒmen míngtiān xiàwǔ sān diǎn qù, kěyǐ ma?','Mai 3 giờ chiều chúng ta đi, được không?','Chưa; người nói đang hỏi ý kiến',['Đã chốt chắc chắn','Đã đi lúc 3 giờ','Người nói hủy tất cả cuộc hẹn'],'可以吗 đặt câu ở vai đề nghị cần được đáp lại. Một lời đề xuất chưa tự là lịch cả hai đã đồng ý.','modals'),
   output('schedule-speak','speak','Nói lịch thật của ngày mai: giờ bắt đầu làm/học, giờ kết thúc, việc làm sau đó. Lần hai đổi mỗi giờ thêm 5 phút.',
    ['Đủ hai mốc giờ và buổi','Thời gian đứng trước động từ','Dùng 两 cho 2 giờ khi phù hợp','Lần đổi giờ vẫn nói trôi chảy'],
    '我明天上午九点上班，晚上六点半下班。下班后，我去饭店吃晚饭。','Wǒ míngtiān shàngwǔ jiǔ diǎn shàngbān, wǎnshang liù diǎn bàn xiàbān. Xiàbān hòu, wǒ qù fàndiàn chī wǎnfàn.','Mai tôi đi làm lúc 9 giờ sáng, tan ca lúc 6 giờ rưỡi tối. Sau đó tôi đi nhà hàng ăn tối.'),
   output('change-message','write','Bạn không thể gặp lúc 14:05; muốn đổi sang 17:07. Viết tin cho bạn: nêu giờ không đi được, đề nghị giờ mới, hỏi có được không.',
    ['Có 14:05 và 17:07 rõ ràng','Phủ định đúng hành động','Có câu hỏi xin đồng ý'],
    '我下午两点零五分不能去。我们下午五点零七分去，可以吗？','Wǒ xiàwǔ liǎng diǎn líng wǔ fēn bù néng qù. Wǒmen xiàwǔ wǔ diǎn líng qī fēn qù, kěyǐ ma?','Tôi không đi được lúc 14:05. Ta đi lúc 17:07 được không?')]);
 add('location','位','Gặp nhau đúng chỗ','Phân biệt ở đâu có gì với vật đã biết ở đâu; giữ đúng mốc khi mô tả nhiều lớp.',
  ['在','有','前边','后边','旁边','上','里','外边','椅子','书','猫','饭店','怎么','坐','出租车'],
  'Bạn đến nhà hàng trước. Cần chỉ chỗ để người bạn tìm đúng ghế và lấy lại quyển sách.',[
   choice('place-listen','listening','listen','Quyển sách ở đâu?','饭店前边有一把椅子。书在椅子上。','Fàndiàn qiánbian yǒu yì bǎ yǐzi. Shū zài yǐzi shang.','Trước nhà hàng có ghế. Sách ở trên ghế.','Trên ghế trước nhà hàng',['Trước ghế trong nhà hàng','Trong nhà hàng trên bàn','Trên nhà hàng'],'Dòng đầu đặt ghế so với nhà hàng; dòng sau đặt sách so với ghế. Đừng đổi hai mốc ấy.','place'),
   typed('existence','Điền một chữ để giới thiệu vật mới xuất hiện ở nơi này.','饭店前边___一把椅子。','Fàndiàn qiánbian ___ yì bǎ yǐzi.','Trước nhà hàng có một chiếc ghế.',['有'],'Nơi chốn + 有 + vật được giới thiệu. Không dùng 在 trong ô này.','place'),
   typed('location-repair','Sửa câu để nói “Quyển sách ở trên ghế”, giữ đối tượng là quyển sách.','书有椅子上。','','Quyển sách ở trên ghế.',['书在椅子上。'],'Sách đã là chủ thể được xác định: 书 + 在 + 椅子上.','place'),
   choice('relation','inference','read','Điều nào được nói rõ?','猫在椅子旁边，书在椅子上。','Māo zài yǐzi pángbiān, shū zài yǐzi shang.','Mèo cạnh ghế, sách trên ghế.','Mèo và sách có hai quan hệ khác nhau với ghế',['Mèo nằm trên sách','Mèo ở bên trái sách','Mèo cách sách đúng một mét'],'旁边 và 上 cùng lấy ghế làm mốc. Chưa có trái/phải hay khoảng cách cụ thể giữa mèo và sách.','evidence'),
   choice('transport','syntax','read','Người nói đang là người lái hay hành khách?','我坐出租车去饭店，不开车。','Wǒ zuò chūzūchē qù fàndiàn, bù kāichē.','Tôi đi taxi đến nhà hàng, không lái xe.','Hành khách',['Tài xế taxi','Người bán xe','Không đi đâu'],'坐 + phương tiện chỉ cách đi với vai hành khách; 开车 là lái xe.','roles'),
   choice('which-place','meaning','read','Nếu hỏi nơi người bạn đang ở, câu nào phù hợp nhất?','','','','你现在在哪儿？',['你现在去哪儿？','你现在买什么？','你现在几点？'],'在哪儿 hỏi vị trí hiện tại; 去哪儿 hỏi điểm đến. Hai thông tin này có thể khác nhau.','place'),
   output('guide-speak','speak','Mô tả bằng 3 câu: trước siêu thị có ghế; trên ghế có sách; mèo ở cạnh ghế. Sau đó nói lại với điện thoại thay sách.',
    ['Mỗi quan hệ có mốc rõ','Dùng 有 giới thiệu vật','Dùng 在 định vị vật đã biết','Đổi sách thành điện thoại mà giữ đúng trật tự'],
    '超市前边有一把椅子。椅子上有一本书。猫在椅子旁边。','Chāoshì qiánbian yǒu yì bǎ yǐzi. Yǐzi shang yǒu yì běn shū. Māo zài yǐzi pángbiān.','Trước siêu thị có ghế; trên ghế có sách; mèo cạnh ghế.'),
   output('lost-book','write','Nhắn cho bạn 3–4 câu: bạn đang ở nhà hàng; sách của bạn ấy ở trên ghế phía trước; hỏi bạn ấy mấy giờ đến.',
    ['Ai ở nhà hàng được nêu rõ','Đúng người sở hữu sách','Nối nhà hàng–ghế–sách đúng mốc','Có câu hỏi giờ đến'],
    '我在饭店。饭店前边有一把椅子。你的书在椅子上。你几点来？','Wǒ zài fàndiàn. Fàndiàn qiánbian yǒu yì bǎ yǐzi. Nǐ de shū zài yǐzi shang. Nǐ jǐ diǎn lái?','Tôi ở nhà hàng. Trước nhà hàng có ghế. Sách của bạn trên ghế. Bạn mấy giờ đến?')],['#essay/space-time']);
 add('shopping','买','Mua đúng món, trả đúng tiền','Đọc giá và số lượng, phân biệt 买/卖, chọn lượng từ rồi hỏi lại khi chưa rõ.',
  ['买','卖','苹果','斤','钱','块','元','毛','分','贵','便宜','衣服','件','这些','那些'],
  'Mua táo cho bữa tối và xem một chiếc áo. Giá theo cân khác với số tiền đưa cho người bán.',[
   choice('price-listen','listening','listen','Giá một 斤 táo là bao nhiêu?','苹果六块二一斤。','Píngguǒ liù kuài èr yì jīn.','Táo 6,20 tệ một cân Trung Quốc.','6,20 tệ',['6,02 tệ','62 tệ','0,62 tệ'],'六块二 ở đây là sáu đồng hai hào. Muốn 6,02 cần 六块零二分. Một 斤 theo cách đo hiện hành ở Trung Quốc đại lục là 500 g.','l13-quantity'),
   typed('money-zero','Viết giá 6,02 tệ bằng chữ Hán; dùng 块 và 分.','','','6,02 tệ.',['六块零二分','六块钱零二分'],'Số 0 đánh dấu không có hào. 六块二 sẽ thường được hiểu là 6,20 trong cảnh mua bán này.','l13-quantity'),
   typed('clothes-measure','Điền một chữ chỉ đơn vị cho quần áo.','这___衣服多少钱？','Zhè ___ yīfu duōshao qián?','Chiếc áo/quần áo này bao nhiêu tiền?',['件'],'件 dùng cho món quần áo; 本 dùng cho sách, 杯 cho lượng đồ uống theo cốc.','l13-quantity'),
   choice('change','inference','read','Với đúng các khoản đã nêu, phải nhận lại bao nhiêu?','苹果六块二一斤。我买两斤，给售货员二十块。','Píngguǒ liù kuài èr yì jīn. Wǒ mǎi liǎng jīn, gěi shòuhuòyuán èrshí kuài.','Táo 6,20 một cân; mua hai cân, đưa 20 tệ.','7,60 tệ',['12,40 tệ','13,80 tệ','Không trả lại tiền'],'Tiền hàng 6,20 × 2 = 12,40. Tiền đưa là 20, nên trả lại 7,60; tiền đưa không phải giá hàng.','evidence'),
   choice('buy-sell','sound','read','Bạn là khách. Câu nào nói bạn muốn mua táo?','','','','我想买苹果。',['我想卖苹果。','我想穿苹果。','我想看病。'],'买 mǎi thanh 3 là mua; 卖 mài thanh 4 là bán. Một dấu thanh đổi vai trong giao dịch.','wordbuilding'),
   choice('cheap','meaning','read','便宜 có nghĩa gì trong câu này?','这件衣服不贵，很便宜。','Zhè jiàn yīfu bú guì, hěn piányi.','Món quần áo này không đắt, khá rẻ.','Rẻ',['Thuận tiện','Đẹp','Ít'],'便宜 đọc piányi và nghĩa rẻ trong cảnh giá cả; không tách từng âm Hán Việt để suy ra nghĩa dùng hiện đại.','hanviet'),
   output('bargain-speak','speak','Đóng vai khách: hỏi giá một cân táo, nói muốn mua hai cân, hỏi chiếc áo kia bao nhiêu tiền. Nói lại bằng 这 thay 那.',
    ['Đúng 买, không dùng 卖','Có 多少钱一斤','Có 两斤 và 件','Đổi 这/那 phù hợp vật đang chỉ'],
    '苹果多少钱一斤？我想买两斤。那件衣服多少钱？','Píngguǒ duōshao qián yì jīn? Wǒ xiǎng mǎi liǎng jīn. Nà jiàn yīfu duōshao qián?','Táo bao nhiêu một cân? Tôi muốn mua hai cân. Món quần áo kia bao nhiêu?'),
   output('shopping-message','write','Nhắn cho bạn: bạn đang ở cửa hàng, muốn mua hai cân táo và một món quần áo; hỏi bạn ấy có cần mua gì không.',
    ['Có vị trí hiện tại','Số lượng và lượng từ đúng','Có lời hỏi nhu cầu người nhận'],
    '我在商店，想买两斤苹果和一件衣服。你要买什么东西吗？','Wǒ zài shāngdiàn, xiǎng mǎi liǎng jīn píngguǒ hé yí jiàn yīfu. Nǐ yào mǎi shénme dōngxi ma?','Tôi ở cửa hàng, muốn mua hai cân táo và một món quần áo. Bạn có cần mua gì không?')]);
 add('restaurant','请','Gọi món và nói cho đúng người','Nhờ phục vụ, gọi thêm, phân biệt đồ vật với đơn vị và lựa lời theo quan hệ.',
  ['请','给','要','想','可以','服务员','杯','杯子','茶','牛奶','面包','鸡蛋','早饭','再','一下'],
  'Bạn ăn sáng với một người lớn tuổi. Cần gọi đồ, gọi thêm cho bạn và nhờ phục vụ mang trà cho đúng người.',[
   choice('order-listen','listening','listen','Tính cả hai lượt, khách gọi mấy cốc trà?','我要一杯茶。请再给我一杯茶。','Wǒ yào yì bēi chá. Qǐng zài gěi wǒ yì bēi chá.','Tôi lấy một cốc trà. Xin cho tôi thêm một cốc trà.','Hai cốc',['Một cốc','Ba cốc','Một cái cốc rỗng'],'再 thêm một lượt yêu cầu. Một cốc ban đầu cộng một cốc thêm; không cần suy đoán đã uống bao nhiêu.','l13-order'),
   typed('again','Điền một chữ nghĩa “thêm một lượt”; không phải “đang”.','请___给我一杯茶。','Qǐng ___ gěi wǒ yì bēi chá.','Xin cho tôi thêm một cốc trà.',['再'],'再 chỉ lặp/thêm; 在 chỉ đang hoặc ở, hai chữ cùng âm zài nhưng khác chức năng.','l13-order'),
   typed('polite-repair','Thêm 请 ở đầu, giữ nguyên phần còn lại để lời yêu cầu lịch sự hơn.','给我一杯茶。','','Xin cho tôi một cốc trà.',['请给我一杯茶。'],'请 đưa người nghe vào một lời nhờ. Ngữ điệu và cách gọi người nghe vẫn góp phần tạo lịch sự.','register'),
   choice('recipient','syntax','read','Ai là người nhận trà?','请给那位先生一杯茶。','Qǐng gěi nà wèi xiānsheng yì bēi chá.','Xin đưa một cốc trà cho vị nam giới kia.','那位先生',['Người phục vụ','Người nói chắc chắn','Cô gái bên cạnh'],'给 + 那位先生 đánh dấu người nhận. Câu không nói người ấy trả tiền. 位 là lượng từ kính trọng cho người, có thể mở chú giải.','l13-give'),
   choice('cup','meaning','read','Nếu muốn mua chính cái cốc, chọn từ nào?','','','','杯子',['一杯茶','茶','喝茶'],'杯子 là đồ vật. 一杯茶 là lượng trà tính bằng cốc; mua cốc không đồng nghĩa gọi một phần đồ uống.','l13-quantity'),
   choice('permission','register','read','Bạn muốn hỏi xin về sớm một chút với thầy. Cách nào phù hợp hơn?','','','','老师，我今天可以早一点儿回家吗？',['你必须让我回家。','喂，我走了。','我今天是回家吗？'],'Cách đầu gọi đúng người nghe, hỏi sự cho phép với 可以…吗. Đề bài yêu cầu lời xin, không phải thông báo hoặc ra lệnh.','register'),
   output('restaurant-speak','speak','Đóng vai khách qua ba lượt: gọi trà và trứng; thêm sữa cho bạn; nhờ đưa trà cho một vị khách. Mỗi lượt thay người nhận.',
    ['Có 请 khi nhờ','杯 và 个 hợp danh từ','再 dùng cho lượt thêm','给 đặt trước đúng người nhận'],
    '请给我一杯茶和一个鸡蛋。请再给我朋友一杯牛奶。请给那位先生一杯茶。','Qǐng gěi wǒ yì bēi chá hé yí ge jīdàn. Qǐng zài gěi wǒ péngyou yì bēi niúnǎi. Qǐng gěi nà wèi xiānsheng yì bēi chá.','Xin cho tôi trà và trứng. Xin thêm sữa cho bạn tôi. Xin đưa trà cho vị khách kia.'),
   output('invitation','write','Viết lời rủ bạn ăn tối ngày mai: có giờ, nơi, món muốn ăn và câu hỏi xin ý kiến. Lần sửa, đổi người nghe thành thầy/cô.',
    ['Đủ giờ và nơi','Dùng 想 cho mong muốn','Có hỏi ý kiến','Lời gọi người nghe được đổi phù hợp'],
    '我们明天晚上六点半去饭店吃晚饭，可以吗？我想吃饺子。','Wǒmen míngtiān wǎnshang liù diǎn bàn qù fàndiàn chī wǎnfàn, kěyǐ ma? Wǒ xiǎng chī jiǎozi.','Mai 6 giờ rưỡi tối mình ra nhà hàng ăn được không? Tôi muốn ăn sủi cảo.')],['#essay/register','#essay/viet-couplets']);
 add('daily','在','Đang làm, chưa làm và đổi ý','Theo thời điểm của lời kể, phân biệt 不/没, 在/再 và hai kiểu nói ít.',
  ['正在','在','再','不','没有','没有','了','昨天','今天','明天','睡觉','起床','生病','下雨','一点儿','有点儿'],
  'Một người bạn bị mệt và phải đổi kế hoạch. Bạn cần hiểu việc nào đã xảy ra, việc nào chỉ là ý định.',[
   choice('sleep-listen','listening','listen','Hiện giờ người ấy thế nào?','他还没起床，还在睡觉。','Tā hái méi qǐchuáng, hái zài shuìjiào.','Anh ấy chưa dậy, vẫn đang ngủ.','Chưa dậy và đang ngủ',['Chưa ngủ và đang dậy','Đã đi làm','Chắc chắn không đi đâu cả ngày'],'还没 phủ định việc dậy tính đến lúc nói; 还在 giữ trạng thái đang ngủ. Chưa biết lịch cả ngày.','ongoing'),
   typed('past-negative','Điền một chữ để nói việc đi hôm qua không xảy ra.','我昨天___去公司。','Wǒ zuótiān ___ qù gōngsī.','Hôm qua tôi không đi công ty.',['没'],'没 phủ định việc đã/không diễn ra ở mốc hôm qua. 不 thường dùng cho thói quen, lựa chọn hoặc ý định theo ngữ cảnh.','negative'),
   typed('ongoing-repair','Đổi đúng một chữ để nói “Tôi đang học tiếng Trung”.','我再学习汉语。','','Tôi đang học tiếng Trung.',['我在学习汉语。'],'在 đứng trước động từ đánh dấu hành động đang diễn ra. 再学习 là học thêm/lại vào một lượt khác.','ongoing'),
   choice('small','syntax','read','Chọn câu diễn đạt “Tôi muốn uống một ít nước”.','','','','我想喝一点儿水。',['我想喝有点儿水。','我想一点喝水儿。','我想喝水有点儿。'],'一点儿 + danh từ chỉ lượng. 有点儿冷 là hơi lạnh, nêu mức độ cảm nhận.','small'),
   choice('le-future','syntax','read','了 trong câu này có bắt buộc là quá khứ không?','明天吃了早饭再去。','Míngtiān chī le zǎofàn zài qù.','Mai ăn sáng xong rồi đi.','Không; việc ăn sáng được đặt trước việc đi trong tương lai',['Có; cứ có 了 là hôm qua','Có; 明天 là hôm qua','Câu nói không có thứ tự hành động'],'明天 đặt mốc tương lai. 吃了…再去 đặt hoàn tất việc ăn trước đi; không dịch mọi 了 thành “đã” theo thời quá khứ.','sequence'),
   choice('weather-reason','inference','read','Đã đủ để khẳng định mưa là nguyên nhân gây bệnh chưa?','昨天下雨了。今天我生病了，想去医院。','Zuótiān xià yǔ le. Jīntiān wǒ shēngbìng le, xiǎng qù yīyuàn.','Hôm qua mưa. Hôm nay tôi bị ốm, muốn đi bệnh viện.','Chưa; lời kể chỉ nêu hai sự việc và ý định',['Đủ; chắc chắn do mưa','Đã khám xong và biết bệnh','Không có ai bị ốm'],'Sự việc nối tiếp không tự chứng minh nguyên nhân. 想去 chưa xác nhận việc đã đi.','evidence'),
   output('update-speak','speak','Nói 4 câu: hôm qua làm gì; bây giờ đang làm gì; một việc chưa làm; ngày mai muốn làm gì. Không dùng một mẫu phủ định cho tất cả.',
    ['Mỗi câu có mốc rõ','在/正在 cho hành động đang diễn ra','没 cho việc chưa xảy ra','想 cho dự định chưa hoàn tất'],
    '我昨天去超市了。我现在在家里看书。我还没吃晚饭。明天我想和朋友看电影。','Wǒ zuótiān qù chāoshì le. Wǒ xiànzài zài jiāli kàn shū. Wǒ hái méi chī wǎnfàn. Míngtiān wǒ xiǎng hé péngyou kàn diànyǐng.','Hôm qua tôi đi siêu thị. Bây giờ tôi ở nhà đọc sách. Tôi chưa ăn tối. Mai tôi muốn xem phim với bạn.'),
   output('leave-note','write','Viết lời xin nghỉ nửa ngày: hôm nay cảm thấy hơi mệt/lạnh, muốn về nhà nghỉ; hỏi ngày mai có thể đến không. Đây là luyện ngôn ngữ.',
    ['Nêu cảm nhận thay vì tự chẩn đoán','Có 想 nghỉ nửa ngày','Có câu hỏi 可以…吗','Trật tự thời gian trước động từ'],
    '我今天觉得有点儿冷，想回家休息半天。我明天可以来吗？','Wǒ jīntiān juéde yǒudiǎnr lěng, xiǎng huí jiā xiūxi bàn tiān. Wǒ míngtiān kěyǐ lái ma?','Hôm nay tôi cảm thấy hơi lạnh, muốn về nhà nghỉ nửa ngày. Mai tôi đến được không?')]);
 add('characters','字','Nghe âm, nhận chữ và nối Hán Việt','Phân biệt q/j, hiểu họ chữ gợi âm và dùng trường học–đọc–viết đúng ngữ cảnh.',
  ['请','去','几','九','学习','小学','中学','小学生','中学生','汉语','汉字','听','听见','说话','写','都','有些','有的'],
  'Giải thích với bạn mới về lớp học, sau đó kể ai đang viết, ai đang đọc. Họ chữ giúp nhớ, nhưng vẫn phải kiểm tra từng cách đọc.',[
   choice('school-listen','listening','listen','Học sinh đang làm những việc nào?','有的学生在写汉字，有的在读书。','Yǒude xuésheng zài xiě Hànzì, yǒude zài dú shū.','Có học sinh đang viết chữ Hán, có học sinh đang đọc sách.','Viết chữ Hán và đọc sách',['Tất cả đang hát','Tất cả đang viết','Không ai đang học'],'有的…有的… chia các nhóm; không có 都 để nói tất cả cùng làm một việc.','ongoing'),
   typed('all','Điền một chữ để nói tất cả nhóm này đều học tiếng Trung.','他们___学习汉语。','Tāmen ___ xuéxí Hànyǔ.','Họ đều học tiếng Trung.',['都'],'都 đứng sau chủ ngữ và trước động từ. 有些 chỉ một số, không mang nghĩa tất cả.','roles'),
   typed('school-repair','Thay “大学” bằng “小学”, giữ nguyên các chữ còn lại.','我妹妹上大学。','','Muốn đổi thành: em gái tôi học tiểu học.',['我妹妹上小学。'],'小学 là tiểu học, 大学 là đại học. 上 + bậc/trường học nói việc theo học.','wordbuilding'),
   choice('jq','sound','read','j và q khác chủ yếu ở đâu khi giữ cùng vị trí cấu âm?','','','','q bật hơi rõ hơn; j không bật hơi',['j phải uốn đầu lưỡi lên, q thì không','q luôn thanh 1, j luôn thanh 4','j là giọng nam, q là giọng nữ'],'Hai âm đều dùng phần trước mặt lưỡi gần ngạc cứng, đầu lưỡi thấp gần răng dưới. Thử ji/qi trước mảnh giấy: luồng hơi của q thường rõ hơn. Đây là bài cơ chế, chưa phải kiểm tra phát âm của bạn.','neutral'),
   choice('family','source','read','Nhìn 抱、饱、跑 có chung 包, suy ra điều gì hợp lý?','','','','包 có thể gợi họ âm, vẫn phải học riêng bào/bǎo/pǎo',['Cả ba luôn đọc bāo','Cả ba đều có nghĩa bánh bao','Bộ bên trái không có vai trò gì'],'扌、饣、足 nối với tay, ăn và chân; 包 gợi âm. Sự gợi âm không đảm bảo trùng âm đầu và thanh hiện đại.','etymology'),
   choice('hear-result','meaning','read','听见 trong câu này nhấn điều gì?','我听了，但是没听见你的名字。','Wǒ tīng le, dànshì méi tīngjiàn nǐ de míngzi.','Tôi có nghe, nhưng không nghe thấy tên bạn.','Kết quả nghe thấy tên chưa đạt',['Chắc chắn đã hiểu tên','Không hề có hành động nghe','Người nói đã viết tên'],'听 là hành động nghe; 听见 nói nghe thấy. Đừng đồng nhất việc có lắng nghe với việc đã nhận được mọi thông tin.','roles'),
   output('class-speak','speak','Nói về một lớp: ai học tiếng Trung, một số đang viết, một số đang đọc. Đọc thêm ji–qi, jǐ–qǐ, jù–qù và tự chú ý luồng hơi.',
    ['分 biệt 有的 với 都','Hành động đang diễn ra dùng 在','Hán ngữ là ngôn ngữ, Hán tự là chữ','j/q không đọc thành zh/ch uốn lưỡi'],
    '我们都学习汉语。有的同学在写汉字，有的在读书。','Wǒmen dōu xuéxí Hànyǔ. Yǒude tóngxué zài xiě Hànzì, yǒude zài dú shū.','Chúng tôi đều học tiếng Trung. Có bạn đang viết chữ Hán, có bạn đang đọc sách.'),
   output('hanviet-note','write','Chọn 本 hoặc 学习: viết một câu tiếng Trung dùng từ ấy; dưới đó ghi bằng tiếng Việt cầu Hán Việt và chức năng trong câu. Không cần bịa nguồn gốc chữ.',
    ['Có câu của riêng mình','Tách từ ghép khỏi cấu tạo một chữ','Phân biệt nghĩa hiện tại với mẹo nhớ'],
    '我买了一本书。\n本 ở đây là lượng từ đếm sách; “bản” còn thấy trong căn bản, cơ bản. Không dịch 一本书 thành “một gốc sách”.','Wǒ mǎi le yì běn shū.','Tôi mua một quyển sách.')],['#essay/han-viet','#essay/shuowen','#essay/viet-couplets']);
 add('case','探','Hồ sơ cuối: cuộc hẹn chưa thành','Nối giờ, người gọi, vị trí và lời chưa nói; giải quyết một cuộc hẹn bằng ngôn ngữ đơn giản.',
  ['下午','晚上','给','打电话','在','前边','后边','书','没有','还','来','去','可以'],
  'Bạn và Minh hẹn ở nhà hàng. Một quyển sách cần trả lại, cuộc gọi không được nghe và một tin nhắn dễ hiểu lầm. Các tình tiết đều hư cấu để luyện đọc.',[
   choice('call-listen','listening','listen','Lúc 18:05, ai gọi cho ai?','晚上六点零五分，小林给小明打电话。小明没听见。','Wǎnshang liù diǎn líng wǔ fēn, Xiǎo Lín gěi Xiǎo Míng dǎ diànhuà. Xiǎo Míng méi tīngjiàn.','18:05, Tiểu Lâm gọi Tiểu Minh. Tiểu Minh không nghe thấy.','Tiểu Lâm → Tiểu Minh',['Tiểu Minh → Tiểu Lâm','Nhà hàng → bác sĩ','Tiểu Minh không gọi vì ghét Tiểu Lâm'],'给小明 chỉ người nhận cuộc gọi. 没听见 nêu chưa nghe thấy, chưa giải thích động cơ. 晚上六点零五分 là 18:05.','l13-give'),
   typed('case-location','Điền chữ phù hợp vào tin xác định vị trí của người nói.','我___饭店后边，不在前边。','Wǒ ___ fàndiàn hòubian, bú zài qiánbian.','Tôi ở phía sau nhà hàng, không ở phía trước.',['在'],'Chủ thể 我 + 在 + vị trí. 前边/后边 cùng lấy 饭店 làm mốc.','place'),
   typed('case-question','Điền chữ hỏi số giờ để chốt cuộc hẹn.','你___点来？','Nǐ ___ diǎn lái?','Bạn mấy giờ đến?',['几'],'几点 hỏi mốc giờ. 多少 trong 多少钱 lại hỏi giá.','time'),
   choice('case-chain','inference','read','Người bạn nên tìm sách ở đâu?','六点十分，小明说：“书在饭店前边的椅子上。我在饭店后边。”','Liù diǎn shí fēn, Xiǎo Míng shuō: “Shū zài fàndiàn qiánbian de yǐzi shang. Wǒ zài fàndiàn hòubian.”','18:10, Minh nói: sách trên ghế trước nhà hàng, tôi ở sau nhà hàng.','Trên ghế phía trước nhà hàng',['Ở phía sau cùng chỗ Minh','Trên người Minh chắc chắn','Trong siêu thị'],'Vị trí của sách khác vị trí người nói. Cần theo đúng chủ thể mỗi câu, không chuyển mốc của 我 sang 书.','place'),
   choice('case-intent','register','read','Tin này cho biết chắc điều nào?','我今天还有事，不能和你吃晚饭。我们明天见，可以吗？','Wǒ jīntiān hái yǒu shì, bù néng hé nǐ chī wǎnfàn. Wǒmen míngtiān jiàn, kěyǐ ma?','Hôm nay tôi còn việc, không ăn tối cùng bạn được. Mai gặp được không?','Từ chối bữa tối hôm nay và đề nghị gặp ngày mai',['Không muốn làm bạn nữa','Đã chốt giờ gặp ngày mai','Chắc chắn đang nói dối'],'Có thể đọc hành động giao tiếp của tin; chưa thể kết luận toàn bộ tình cảm hoặc giờ đã thống nhất.','register'),
   choice('case-best','syntax','read','Bạn muốn lấy sách và chốt lịch mai. Trả lời nào giải quyết đúng cả hai việc?','','','','好的，我去前边拿书。我们明天晚上六点见，可以吗？',['你为什么不喜欢我？','我昨天去医院了。','那件衣服很便宜。'],'Câu đầu nói kế hoạch lấy sách và đề nghị giờ mới. 拿 ná là lấy/cầm, được chú giải riêng trong nhiệm vụ này.','modals'),
   output('case-speak','speak','Kể lại hồ sơ trong 45–60 giây: cuộc gọi, nơi sách, nơi Minh, việc chưa thống nhất. Chỉ kể điều có căn cứ.',
    ['Đúng người gọi và người nhận','Không lẫn sách với người','Giờ và thứ tự hợp lý','Không gán động cơ ngoài tin nhắn'],
    '小林给小明打电话，小明没听见。书在饭店前边的椅子上，小明在饭店后边。他今天不能一起吃晚饭，想明天见。','Xiǎo Lín gěi Xiǎo Míng dǎ diànhuà, Xiǎo Míng méi tīngjiàn. Shū zài fàndiàn qiánbian de yǐzi shang, Xiǎo Míng zài fàndiàn hòubian. Tā jīntiān bù néng yìqǐ chī wǎnfàn, xiǎng míngtiān jiàn.','Lâm gọi Minh nhưng Minh không nghe thấy. Sách trên ghế phía trước, Minh ở phía sau. Minh không ăn cùng hôm nay được và muốn gặp mai.'),
   output('case-message','write','Soạn tin 4–5 câu cho Minh: bạn đã biết nơi sách, sẽ đến lấy, chấp nhận gặp ngày mai, đề nghị giờ và hỏi có được không. Sau đó đổi vai, viết lời Minh đáp.',
    ['Trả lời đúng thông tin của hồ sơ','Đủ nơi lấy và giờ mới','Có lượt đáp chấp nhận hoặc đổi giờ','Không buộc người nhận nhận một điều chưa đồng ý'],
    '好的，我知道了。我去饭店前边拿书。我们明天晚上六点半见，可以吗？\n可以，明天见。','Hǎo de, wǒ zhīdào le. Wǒ qù fàndiàn qiánbian ná shū. Wǒmen míngtiān wǎnshang liù diǎn bàn jiàn, kěyǐ ma? Kěyǐ, míngtiān jiàn.','Được, tôi biết rồi. Tôi ra phía trước lấy sách. Mai 6 giờ rưỡi tối gặp được không? Được, mai gặp.')]);
 const diagnostic=['schedule:time-listen','schedule:two-clock','schedule:remove-shi','location:existence','location:relation','shopping:price-listen','shopping:buy-sell','restaurant:recipient','daily:past-negative','daily:small','characters:jq','contact:gender'];
 const byId=new Map(missions.map(m=>[m.id,m])),items=new Map();
 for(const m of missions)for(const q of m.questions){q.key=m.id+':'+q.id;q.mission=m.id;items.set(q.key,q);}
 window.HAN_REVIEW={missions,byId,items,diagnostic,plan:[
  ['Khảo sát & liên lạc','diagnostic','Không mở gợi ý trước; dùng kết quả chọn phần yếu.'],
  ['Giờ và lịch hẹn','schedule','Ôn 10–12 mục từ rồi làm nhiệm vụ; nhắn một lịch thật.'],
  ['Vị trí và chỉ đường','location','Vẽ cảnh 3 vật; mô tả từ nơi lớn đến vật nhỏ.'],
  ['Mua sắm và tiền','shopping','Đổi giá/số lượng; kiểm tra lại tiền thừa.'],
  ['Gọi món và quan hệ','restaurant','Đổi người nhận đồ và cách xưng hô.'],
  ['Kể việc theo thời gian','daily','Đổi hôm qua–bây giờ–ngày mai, giữ logic phủ định.'],
  ['Chữ và phát âm','characters','Tự gõ pinyin, nhận họ chữ, rồi dùng từ trong câu.'],
  ['Giải hồ sơ cuối','case','Kể lại bằng trí nhớ trước khi mở mẫu.'],
  ['Quay lại lỗi cũ','repair','Ưu tiên câu sai và câu đã dùng gợi ý; đừng chỉ làm câu quen.'],
  ['Rà kho từ lần hai','words','Đổi chiều chữ→nghĩa, nghĩa→chữ, chữ→pinyin.'],
  ['Nghe không nhìn chữ','schedule','Nghe nhiệm vụ lịch hẹn; tự nói lại rồi mới đối chiếu.'],
  ['Viết cho người thật','restaurant','Chọn một tin nhắn có thể dùng; đổi bạn thân thành thầy/cô.'],
  ['Đổi dữ kiện','case','Kể lại cùng tình huống khi giờ, nơi và người gọi thay đổi.'],
  ['Khảo sát lại','diagnostic','So với lần đầu theo từng kỹ năng, không suy ra điểm thi HSK.']
 ],references:[
  ['HSK · Đề cương chính thức','https://www.chinesetest.cn/HSK','Khung nhiệm vụ, chủ đề, từ, ngữ pháp và chữ. Bộ này ôn theo vốn đã gửi, không tự nhận là đề thi chính thức hoặc đã đối soát toàn bộ mục HSK.'],
  ['Roediger & Karpicke (2006)','https://learninglab.psych.purdue.edu/downloads/2006/2006_Roediger_Karpicke_Review.pdf','Tự nhớ trước khi xem lại là một cách luyện trí nhớ; kết quả trong nghiên cứu không phải bảo đảm điểm số cho mọi người.'],
  ['Cepeda và cộng sự (2006)','https://pubmed.ncbi.nlm.nih.gov/16719566/','Ôn cách quãng có lợi cho ghi nhớ; lịch 1–3–7–14–30 ngày của app là lựa chọn sản phẩm, không phải lịch tối ưu đã đo riêng cho bạn.']
 ],gloss:[['位','wèi','lượng từ kính trọng cho người'],['拿','ná','lấy, cầm'],['一起','yìqǐ','cùng nhau'],['同学','tóngxué','bạn học'],['越南','Yuènán','Việt Nam']]};
})();


