(() => {
 const words=window.HAN_DATA.words,lookup=new Map(words.map(w=>[w.han,w]));
 const specs=[
  ['first','Câu đầu tiên','Ai — có gì — là gì',['我','你','是','有','的','这','那','不','没有','吗','什么','谁','叫','名字','也','呢','我们','他','她']],
  ['phone','Điện thoại & liên lạc','Hỏi số, sở hữu đồ vật, liên lạc',['手机','电话','号','喂','手机号','号码','学号','学生号','打电话','电脑','新','给','请问','认识','你好','谢谢']],
  ['count','Số & số lượng','Đếm, chọn lượng từ, phân biệt 二 / 两',['零','一','二','两','三','四','五','六','七','八','九','十','个','几','多少','只','本','把','件','部','台','杯','瓶','张','碗','斤','半','百','千','万','亿','幺','第','次']],
  ['time','Thời gian & lịch hẹn','Mốc giờ, thời lượng, thứ và ngày',['现在','今天','明天','昨天','后天','早上','上午','中午','下午','晚上','白天','点','分','分钟','小时','秒','刻','星期','星期一','星期二','星期三','星期四','星期五','星期六','星期日','星期天','年','月','日','今年','生日','几点','几号','时候','每天','后','前']],
  ['shop','Mua sắm & ăn uống','Muốn mua gì, hỏi giá, gọi món',['想','去','超市','买','卖','东西','些','一些','这些','那些','钱','块','元','角','毛','人民币','多少钱','水果','苹果','少','便宜','贵','商店','衣服','穿','售货员','杯子','牛奶','吃','晚饭','米饭','吃饭','做饭','菜','蔬菜','青菜','包子','饺子','面条儿','好吃','非常','很多','怎么样']],
  ['space','Vị trí & chủ thể','Ai ở đâu, ở đâu có gì',['在','家','里','里边','前边','后边','外边','旁边','这儿','那儿','那里','哪儿','哪里','这边','那边','那个','椅子','猫','狗','坐','怎么','出租车','车','开车','饭店','西安饭店','医院','医生','房间','楼']],
  ['daily','Sinh hoạt & bài 11','Đang làm gì, khi nào, hỏi lại thông tin',['上班','下班','工作','忙','休息','上课','下课','课','学校','学生','老师','学','学习','读','读书','书','写','听','说','汉语','中文','知道','找','正在','还','还没','已经','弟弟','起床','睡','睡觉','要','小朋友','问','对','大学','大学生','看','电视','电影','看电影','电影院','和','朋友','女朋友','玩']],
  ['family','Con người & gia đình','Giới thiệu, xưng hô, quan hệ',['人','们','他们','她们','口','爸爸','妈妈','哥哥','姐姐','妹妹','儿子','女儿','孩子','岁','几岁','多大','大','多','中国','法国','泰国','国','哪']],
  ['lesson12','Bài 12 · Thời tiết & sức khỏe','Tình huống mới, cảm nhận, lượng ít và thứ tự hành động',window.HAN_LESSON12.hans],
  ['lesson13','Bài 13 · Gọi món & giao tiếp','11 mục mới; bộ riêng đủ 20 mục ở trang Bài 13',window.HAN_LESSON13.hans.filter(h=>lookup.get(h)?.id.startsWith('L13-'))],
  ['nov05','Bộ từ 05/11','Đi tàu, đi học và nói về các nhóm',words.filter(w=>w.nov05).map(w=>w.han)],
  ['extend','Ghép từ & mở rộng','Nối vốn Hán Việt, kỹ năng, trạng thái',[]],
  ['characters','Họ chữ đọc thêm','Nhận thành phần, so sánh âm — nghĩa',[]]
 ];
 const assigned=new Set();
 const units=specs.map(([id,title,goal,hans])=>({id,title,goal,ids:hans.filter(h=>lookup.has(h)&&!lookup.get(h).extra&&!assigned.has(lookup.get(h).id)).map(h=>{const id=lookup.get(h).id;assigned.add(id);return id;})}));
 units.find(u=>u.id==='extend').ids=words.filter(w=>!w.extra&&!assigned.has(w.id)).map(w=>w.id);
 units.find(u=>u.id==='characters').ids=words.filter(w=>w.extra).map(w=>w.id);
 const ordered=units.flatMap(u=>u.ids).map(id=>words.find(w=>w.id===id));
 const examples={
  我:['我有手机。','Wǒ yǒu shǒujī.','Tôi có điện thoại di động.'],
  你:['你有手机吗？','Nǐ yǒu shǒujī ma?','Bạn có điện thoại di động không?'],
  是:['这是我的书。','Zhè shì wǒ de shū.','Đây là sách của tôi.'],
  有:['我有一本书。','Wǒ yǒu yì běn shū.','Tôi có một quyển sách.'],
  的:['这是我的手机。','Zhè shì wǒ de shǒujī.','Đây là điện thoại di động của tôi.'],
  这:['这是我的书。','Zhè shì wǒ de shū.','Đây là sách của tôi.'],
  那:['那是你的手机吗？','Nà shì nǐ de shǒujī ma?','Kia là điện thoại của bạn phải không?'],
  不:['我不去。','Wǒ bú qù.','Tôi không đi.'],
  没有:['我没有电脑。','Wǒ méiyǒu diànnǎo.','Tôi không có máy tính.'],
  吗:['你有书吗？','Nǐ yǒu shū ma?','Bạn có sách không?'],
  什么:['你买什么？','Nǐ mǎi shénme?','Bạn mua gì?'],
  谁:['她是谁？','Tā shì shéi?','Cô ấy là ai?'],
  叫:['你叫什么名字？','Nǐ jiào shénme míngzi?','Bạn tên là gì?'],
  名字:['你的名字真好听！','Nǐ de míngzi zhēn hǎotīng!','Tên bạn nghe thật hay!'],
  也:['我也去。','Wǒ yě qù.','Tôi cũng đi.'],
  呢:['你呢？','Nǐ ne?','Còn bạn thì sao?'],
  手机:['我想买手机。','Wǒ xiǎng mǎi shǒujī.','Tôi muốn mua điện thoại di động.'],
  电话:['我给你打电话。','Wǒ gěi nǐ dǎ diànhuà.','Tôi gọi điện cho bạn.'],
  号:['你的手机号是多少？','Nǐ de shǒujīhào shì duōshao?','Số điện thoại di động của bạn là bao nhiêu?'],
  喂:['喂，你在哪儿？','Wéi, nǐ zài nǎr?','A lô, bạn ở đâu?'],
  新:['这是我的新电脑。','Zhè shì wǒ de xīn diànnǎo.','Đây là máy tính mới của tôi.'],
  两:['下午两点上课。','Xiàwǔ liǎng diǎn shàngkè.','Vào học lúc hai giờ chiều.'],
  二:['现在两点二十分。','Xiànzài liǎng diǎn èrshí fēn.','Bây giờ là 2 giờ 20 phút.'],
  半:['我晚上六点半下班。','Wǒ wǎnshang liù diǎn bàn xiàbān.','Tôi tan ca lúc 6 giờ rưỡi tối.'],
  在:['猫在椅子旁边。','Māo zài yǐzi pángbiān.','Con mèo ở cạnh chiếc ghế.'],
  好吃:['这些苹果很好吃。','Zhèxiē píngguǒ hěn hǎochī.','Những quả táo này rất ngon.'],
  好听:['你的名字真好听！','Nǐ de míngzi zhēn hǎotīng!','Tên bạn nghe thật hay!']
 };
 function exampleFor(w){if(w.studyExamples?.length)return w.studyExamples[0];if(window.HAN_EXTENSION?.examples[w.han])return window.HAN_EXTENSION.examples[w.han];if(window.HAN_LESSON13.examples[w.han])return window.HAN_LESSON13.examples[w.han];if(window.HAN_LESSON12.examples[w.han])return window.HAN_LESSON12.examples[w.han];if(examples[w.han])return examples[w.han];const q=window.HAN_LESSONS.sentences.find(q=>q[2].split(' ').some(t=>t===w.han));return q?[q[2].replace(/ /g,'')+'。',q[3],q[1]]:null;}
 // A cloze targets one lexical/grammatical decision. Other words in the sentence
 // are supporting context; success does not imply mastery of every word present.
 const clozeRows=[
 ['我','___有手机。','Điền “tôi”: Tôi có điện thoại di động.',['我','你','他','她'],'Wǒ yǒu shǒujī.','我 là chủ ngữ: ai có điện thoại?'],
 ['你','___有书吗？','Điền “bạn”: Bạn có sách không?',['你','我','她','他'],'Nǐ yǒu shū ma?','你 chỉ người đang nghe.'],
 ['是','这___我的书。','Đây LÀ sách của tôi.',['是','有','在','去'],'Zhè shì wǒ de shū.','是 nối hai thành phần: cái này là sách của tôi.'],
 ['有','我___手机。','Tôi CÓ điện thoại di động.',['有','是','在','的'],'Wǒ yǒu shǒujī.','有 diễn tả sở hữu; 是 dùng xác định “là”.'],
 ['的','这是我___手机。','Đây là điện thoại CỦA tôi.',['的','是','在','吗'],'Zhè shì wǒ de shǒujī.','我的手机: người sở hữu + 的 + đồ vật.'],
 ['这','___是我的书。','ĐÂY là sách của tôi (ở gần người nói).',['这','那','谁','哪'],'Zhè shì wǒ de shū.','这 chỉ gần; 那 chỉ xa hơn trong tình huống này.'],
 ['那','___是你的手机吗？','KIA là điện thoại của bạn phải không?',['那','这','谁','哪'],'Nà shì nǐ de shǒujī ma?','那 nà: kia; 哪 nǎ: nào.'],
 ['不','我___去。','Tôi KHÔNG đi (quyết định hiện tại).',['不','没','也','很'],'Wǒ bú qù.','Dùng 不去 cho ý định không đi. 不 thường đọc bú trước thanh 4.'],
 ['没有','我___电脑。','Tôi KHÔNG CÓ máy tính.',['没有','不是','不在','不会'],'Wǒ méiyǒu diànnǎo.','Phủ định 有 dùng 没有.'],
 ['吗','你有书___？','Tạo câu hỏi có/không: Bạn có sách không?',['吗','的','是','有'],'Nǐ yǒu shū ma?','吗 đặt cuối câu hỏi có/không.'],
 ['手机','这是我的___。','Đây là ĐIỆN THOẠI DI ĐỘNG của tôi.',['手机','电脑','书','电视'],'Zhè shì wǒ de shǒujī.','手机 chỉ điện thoại di động; 电脑 là máy tính.'],
 ['买','我想___手机。','Tôi muốn MUA điện thoại.',['买','卖','看','写'],'Wǒ xiǎng mǎi shǒujī.','买 mǎi: mua. 卖 mài: bán.'],
 ['卖','这家商店___衣服。','Cửa hàng này BÁN quần áo.',['卖','买','穿','读'],'Zhè jiā shāngdiàn mài yīfu.','卖: bán; 买: mua. Chú ý cả nét chữ và thanh điệu.'],
 ['想','我___去超市。','Tôi MUỐN đi siêu thị (ý định).',['想','在','很','谁'],'Wǒ xiǎng qù chāoshì.','想 đứng trước cụm động từ 去超市.'],
 ['两','下午___点上课。','Vào học lúc HAI GIỜ chiều.',['两','二','第','几'],'Xiàwǔ liǎng diǎn shàngkè.','Hai giờ thường nói 两点; tháng 2 là 二月.'],
 ['二','两点___十分。','2 giờ HAI MƯƠI phút.',['二','两','第','几'],'Liǎng diǎn èrshí fēn.','20 là 二十; không dùng 两十.'],
 ['在','那只猫___椅子旁边。','Con mèo kia Ở cạnh ghế.',['在','有','是','去'],'Nà zhī māo zài yǐzi pángbiān.','Chủ thể đã xác định + 在 + vị trí.'],
 ['有','椅子旁边___一只猫。','Cạnh ghế CÓ một con mèo.',['有','在','是的','去'],'Yǐzi pángbiān yǒu yì zhī māo.','Giới thiệu sự vật: nơi chốn + 有 + sự vật.'],
 ['只','一___猫','MỘT CON MÈO: chọn lượng từ.',['只','本','件','把'],'Yì zhī māo.','猫 dùng 只 trong cách đếm thông thường.'],
 ['本','一___书','MỘT QUYỂN SÁCH: chọn lượng từ.',['本','只','件','把'],'Yì běn shū.','书 dùng 本.'],
 ['件','这___衣服多少钱？','CHIẾC áo/quần này giá bao nhiêu?',['件','本','只','把'],'Zhè jiàn yīfu duōshao qián?','衣服 dùng 件.'],
 ['把','一___椅子','MỘT CHIẾC GHẾ: chọn lượng từ.',['把','本','只','件'],'Yì bǎ yǐzi.','椅子 dùng 把.'],
 ['会','我___说汉语。','Tôi BIẾT nói tiếng Trung (kỹ năng đã học).',['会','知道','认识','是'],'Wǒ huì shuō Hànyǔ.','会 + kỹ năng; 知道 biết thông tin; 认识 quen/nhận biết.'],
 ['知道','我不___你的手机号。','Tôi không BIẾT thông tin số điện thoại của bạn.',['知道','会','认识','在'],'Wǒ bù zhīdào nǐ de shǒujīhào.','知道 chỉ biết thông tin.'],
 ['认识','我___这位老师。','Tôi QUEN BIẾT thầy/cô này.',['认识','会','在','有'],'Wǒ rènshi zhè wèi lǎoshī.','认识: quen/nhận biết người. 位 là lượng từ lịch sự bổ trợ trong ví dụ; chưa cộng vào kho từ chính.'],
 ['好吃','这些苹果很___。','Những quả táo này ăn rất NGON.',['好吃','好听','好看','忙'],'Zhèxiē píngguǒ hěn hǎochī.','好吃 cho vị giác; 好听 cho âm thanh; 好看 cho nhìn/xem.'],
 ['好听','你的名字真___！','Tên bạn NGHE thật hay.',['好听','好吃','贵','便宜'],'Nǐ de míngzi zhēn hǎotīng!','好听 đánh giá âm thanh/cách gọi.'],
 ['正在','我___找手机。','Tôi ĐANG tìm điện thoại.',['正在','已经','很','不'],'Wǒ zhèngzài zhǎo shǒujī.','正在 + động từ chỉ việc đang diễn ra.'],
 ['下班','我晚上六点半___。','Tôi TAN CA lúc 6 giờ rưỡi tối.',['下班','下课','起床','睡觉'],'Wǒ wǎnshang liù diǎn bàn xiàbān.','下班: tan ca; 下课: tan học.'],
 ['再','___读一遍。','Đọc THÊM MỘT LẦN NỮA.',['再','在','有','是'],'Zài dú yí biàn.','再 chỉ lặp lại; 在 chỉ ở/đang.'],
 ['哪儿','你在___？','Bạn đang ở ĐÂU? Dùng dạng có 儿.',['哪儿','那儿','这儿','那边'],'Nǐ zài nǎr?','哪儿 hỏi đâu. 那儿 chỉ ở đó.']
 ];
 const l12clozes=[
 ['天气','今天___怎么样？','Hỏi THỜI TIẾT hôm nay thế nào.',['天气','药','公司','手机'],'Jīntiān tiānqì zěnmeyàng?','天气 là thời tiết, không phải tên công ty hay đồ vật.'],
 ['这里','我在___。','Tôi ở ĐÂY (chọn dạng có 里).',['这里','那里','哪里','这边'],'Wǒ zài zhèli.','这里 chỉ chỗ người nói; 哪里 hỏi ở đâu; 那里 chỉ chỗ kia.'],
 ['天','我休息两___。','Tôi nghỉ hai NGÀY.',['天','点','分','年'],'Wǒ xiūxi liǎng tiān.','天 là ngày thời lượng trong 两天; 一天 khác 一号 ngày mùng 1.'],
 ['下雨','___了。','Trời MƯA rồi.',['下雨','下班','生病','下课'],'Xià yǔ le.','下雨 là mưa, không cần một chủ ngữ giả.'],
 ['了','十二点___。','Đã 12 giờ RỒI: báo tình huống mới.',['了','在','的','回'],'Shí’èr diǎn le.','了 cuối câu nêu mốc mới ở hiện tại; không phải dấu quá khứ.'],
 ['雨','下___了。','Trời MƯA rồi (không phải tuyết).',['雨','雪','水','药'],'Xià yǔ le.','下雨: mưa rơi; 下雪: tuyết rơi.'],
 ['有点儿','我觉得___冷。','Tôi thấy HƠI lạnh.',['有点儿','一点儿','几点','一点钟'],'Wǒ juéde yǒudiǎnr lěng.','有点儿 + tính từ: hơi. 一点儿 + danh từ: lượng nhỏ.'],
 ['觉得','我___有点儿冷。','Tôi CẢM THẤY hơi lạnh.',['觉得','认识','会','是'],'Wǒ juéde yǒudiǎnr lěng.','觉得 nêu cảm nhận/ý kiến; 认识 là quen/nhận ra.'],
 ['冷','太___了！','LẠNH quá!',['冷','热','贵','忙'],'Tài lěng le!','太冷了: lạnh quá. 太热了: nóng quá.'],
 ['下','___雪了。','Tuyết RƠI rồi.',['下','上','回','来'],'Xià xuě le.','下 trong 下雪 là động từ chỉ tuyết rơi, không dịch thành “dưới” ở đây.'],
 ['雪','下___了。','TUYẾT rơi rồi (không phải mưa).',['雪','雨','水','药'],'Xià xuě le.','雪 xuě: tuyết; u sau x ghi âm ü.'],
 ['来','你明天___公司吗？','Tôi đang ở công ty, hỏi bạn ngày mai có ĐẾN chỗ tôi không.',['来','回家','喝','睡'],'Nǐ míngtiān lái gōngsī ma?','来 hướng về điểm nhìn tại công ty.'],
 ['公司','我在___工作。','Tôi làm việc ở CÔNG TY.',['公司','雨','药','手机'],'Wǒ zài gōngsī gōngzuò.','公司 = công ty; 在 + nơi chốn + hành động.'],
 ['生病','我昨天___了。','Hôm qua tôi BỊ ỐM.',['生病','下课','下雨','看书'],'Wǒ zuótiān shēng bìng le.','生病 là mắc bệnh; 看病 là đi khám hoặc khám cho người khác.'],
 ['看病','我去医院___。','Tôi đi bệnh viện KHÁM BỆNH.',['看病','生病','下雨','上课'],'Wǒ qù yīyuàn kàn bìng.','去 + nơi + mục đích. Không nói đi bệnh viện “để mắc bệnh”.'],
 ['病','我___了。','Tôi ỐM rồi (một chữ).',['病','雨','药','水'],'Wǒ bìng le.','病 vừa chỉ bệnh vừa dùng trong 我病了; không cần 是.'],
 ['一点儿','我想喝___水。','Tôi muốn uống MỘT CHÚT nước.',['一点儿','有点儿','几点','一个'],'Wǒ xiǎng hē yìdiǎnr shuǐ.','一点儿 + 水 chỉ lượng ít; không nói 喝有点儿水 để chỉ lượng nước.'],
 ['药','我回家后吃___。','Sau khi về nhà tôi dùng THUỐC.',['药','水','雪','雨'],'Wǒ huí jiā hòu chī yào.','Cách kết hợp thường dùng: 吃药, 喝水. Đây là mẫu ngôn ngữ, không hướng dẫn dùng thuốc.'],
 ['回','我六点半___家。','Tôi VỀ nhà lúc 6 giờ rưỡi.',['回','在','喝','看'],'Wǒ liù diǎn bàn huí jiā.','回家 là trở về nhà; thời gian đứng trước hành động.'],
 ['再','回家后___喝水。','Về nhà RỒI hãy uống nước.',['再','在','是','有'],'Huí jiā hòu zài hē shuǐ.','再 chỉ thứ tự tiếp theo. 在 cùng âm zài nhưng khác chức năng.'],
 ['喝','我喜欢___牛奶。','Tôi thích UỐNG sữa.',['喝','吃','看','读'],'Wǒ xǐhuan hē niúnǎi.','喝 đi với đồ uống như 牛奶、水.'],
 ['热','我想喝一点儿___水。','Tôi muốn uống một chút nước ẤM/NÓNG.',['热','冷','贵','忙'],'Wǒ xiǎng hē yìdiǎnr rè shuǐ.','热水 là nước nóng/ấm tùy ngữ cảnh; 热 đứng trước 水.'],
 ['水','我想买一瓶___。','Tôi muốn mua một chai NƯỚC.',['水','雨','雪','米饭'],'Wǒ xiǎng mǎi yì píng shuǐ.','一瓶水: một chai nước; 瓶 là lượng từ.']
 ];
 clozeRows.push(...l12clozes,...window.HAN_LESSON13.clozes);
 const clozes=clozeRows.filter(q=>lookup.has(q[0])).map((q,i)=>({id:'cloze-'+i,target:lookup.get(q[0]).id,han:q[1],prompt:q[2],options:q[3],answer:q[0],py:q[4],explain:q[5],level:1}));
 function unitFor(id){return units.find(u=>u.ids.includes(id));}
 function sentenceTargets(q){return [...new Set(q[2].split(' ').map(t=>lookup.get(t)?.id).filter(Boolean))];}
 function skillName(k){return {meaning:'Nhớ nghĩa',recognition:'Nhớ mặt chữ',reading:'Tự viết pinyin',listening:'Nghe nhận chữ',usage:'Dùng đúng chỗ'}[k]||k;}
 window.HAN_CURRICULUM={units,ordered,exampleFor,clozes,unitFor,sentenceTargets,skillName};
})();
