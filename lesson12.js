// Transcribed and explained from the learner's photographs of New HSK 1,
// lesson 12, pp. 88–91. Preserve all existing IDs and progress.
(() => {
 const d=window.HAN_DATA,byHan=new Map(d.words.map(w=>[w.han,w]));
 const rows=[
 ['天气','tiānqì','thiên khí','Thời tiết','天: trời; 气: khí. 天气 nói chung về thời tiết, không chỉ nhiệt độ.'],
 ['这里','zhèli','giá lý','Ở đây, chỗ này','Nối 这儿 zhèr. 这里/这儿 chỉ nơi chốn; 这些 chỉ những cái này. li thường đọc nhẹ.'],
 ['天','tiān','thiên','Trời; ngày (thời lượng)','天冷: trời lạnh. 两天: hai ngày. Bài có hai dòng 天 với hai cách dùng; kho chỉ giữ một mục chữ.'],
 ['下雨','xià yǔ','hạ vũ','Mưa, trời mưa','下 là động từ chỉ mưa/tuyết rơi; 雨 là mưa. 下雨了: trời mưa rồi / bắt đầu mưa.'],
 ['了','le','liễu','Trợ từ chỉ tình huống mới; hoàn thành tùy vị trí','Bài 12 tập trung 了 cuối câu: có thay đổi/tình huống mới. Không dịch máy móc mọi 了 thành “đã”, không xem là dấu quá khứ.'],
 ['雨','yǔ','vũ','Mưa','Liên hệ phong vũ: 风 fēng là gió (mở rộng). yǔ có âm ü: giữ vị trí lưỡi như i và tròn môi; dấu hai chấm lược sau y.'],
 ['有点儿','yǒudiǎnr','hữu điểm nhi','Hơi, hơi… một chút','有点儿 + tính từ: 有点儿冷 hơi lạnh. Thường gợi cảm nhận chưa như ý; khác 一点儿 chỉ một lượng nhỏ.'],
 ['觉得','juéde','giác đắc','Cảm thấy; thấy rằng, cho rằng','我觉得有点儿冷: tôi cảm thấy hơi lạnh. 觉 đọc jué ở đây, khác jiào trong 睡觉. de đọc nhẹ.'],
 ['冷','lěng','lãnh','Lạnh','Liên hệ lãnh đạm để nhớ âm Hán Việt; nghĩa đang học là lạnh. Chú ý vần eng kết thúc bằng ng.'],
 ['下','xià','hạ','Dưới; xuống; (mưa, tuyết) rơi','椅子下: dưới ghế. 下班: tan ca. 下雨/下雪: mưa/tuyết rơi. Cùng chữ, nghĩa theo cả từ ghép.'],
 ['雪','xuě','tuyết','Tuyết','下雪: tuyết rơi. Trong xuě, u ghi âm ü sau x; đọc một âm tiết, không tách thành xu-ê.'],
 ['来','lái','lai','Đến (hướng về điểm nhìn)','来公司: đến công ty khi công ty là điểm nhìn/người nói đang ở đó; 去公司: đi đến công ty, hướng rời điểm nhìn.'],
 ['公司','gōngsī','công ty','Công ty','Đây là từ Hán Việt quen dùng. 学校 là trường học; 公司 là công ty.'],
 ['生病','shēng bìng','sinh bệnh','Bị ốm, mắc bệnh','生病了: bị ốm rồi. Sinh bệnh là liên hệ chữ; tiếng Việt thường nói bị ốm/bị bệnh.'],
 ['看病','kàn bìng','khán bệnh','Đi khám bệnh; khám/chữa bệnh tùy chủ thể','我去医院看病: tôi đi bệnh viện khám. 医生给我看病: bác sĩ khám cho tôi. Nhìn chủ thể để hiểu ai khám cho ai.'],
 ['病','bìng','bệnh','Bệnh; bị ốm','病 trong 生病、看病. Có thể nói 我病了: tôi ốm rồi. Không cần thêm 是 trước 病 trong câu này.'],
 ['一点儿','yìdiǎnr','nhất điểm nhi','Một chút, một ít','喝一点儿水: uống một chút nước. 一点儿 đứng trước danh từ chỉ lượng hoặc sau tính từ trong so sánh: 早一点儿. Khác 一点: 1 giờ.'],
 ['药','yào','dược','Thuốc','Liên hệ dược phẩm, dược sĩ để nhớ chữ. 吃药: uống/dùng thuốc trong cách nói thông thường; 喝水: uống nước.'],
 ['回','huí','hồi','Về, quay về','回家: về nhà; thường không nói 回去家. Hồi trong hồi hương giúp nối nghĩa quay trở về.'],
 ['再','zài','tái','Lại, thêm; rồi (chỉ trình tự)','再读一遍: đọc lại một lần. 回家后再喝水: về nhà rồi hãy uống nước. 再 và 在 cùng âm zài, khác vai trò.'],
 ['喝','hē','hát','Uống','喝水: uống nước; 喝牛奶: uống sữa. Âm Hán Việt ở đây chỉ đối chiếu chữ, không phải động từ “hát” của tiếng Việt.'],
 ['热','rè','nhiệt','Nóng, ấm tùy ngữ cảnh','热水: nước nóng/ấm. Nhiệt trong nhiệt độ giúp nhớ nghĩa; khi giao tiếp cần xét ngữ cảnh để hiểu mức nóng.'],
 ['水','shuǐ','thủy','Nước','Liên hệ thủy điện, thủy sản. 水果 là trái cây: nghĩa của cả từ đã cố định, không dịch rời thành “nước quả”.']
 ];
 let n=0;
 for(const [han,py,hv,gloss,note] of rows){let w=byHan.get(han);if(!w){w={id:'L12-'+String(++n).padStart(2,'0'),han,py,hv,meaning:gloss+'.',gloss,note,category:'Bài 12 · Thời tiết & sức khỏe',extra:false,lesson11:false};d.words.push(w);byHan.set(han,w);}else Object.assign(w,{py,hv,meaning:gloss+'.',gloss,note});w.lesson12=true;}
 d.meta={...d.meta,total:d.words.length,excludedLesson12:[],newLesson12:n,lesson12Unique:rows.length,lesson12TextbookEntries:24,date:'30/10/2026'};
 const examples={
 天气:['今天天气怎么样？','Jīntiān tiānqì zěnmeyàng?','Thời tiết hôm nay thế nào?'],
 这里:['这里有一家医院。','Zhèli yǒu yì jiā yīyuàn.','Ở đây có một bệnh viện.'],
 天:['我今天休息半天。','Wǒ jīntiān xiūxi bàn tiān.','Hôm nay tôi nghỉ nửa ngày.'],
 下雨:['下雨了。','Xià yǔ le.','Trời mưa rồi.'],
 了:['十二点了。','Shí’èr diǎn le.','Đã 12 giờ rồi.'],
 雨:['这里下雨了。','Zhèli xià yǔ le.','Ở đây trời bắt đầu mưa rồi.'],
 有点儿:['我觉得有点儿冷。','Wǒ juéde yǒudiǎnr lěng.','Tôi cảm thấy hơi lạnh.'],
 觉得:['你觉得怎么样？','Nǐ juéde zěnmeyàng?','Bạn cảm thấy / thấy thế nào?'],
 冷:['太冷了！','Tài lěng le!','Lạnh quá!'],
 下:['昨天下雪了。','Zuótiān xià xuě le.','Hôm qua tuyết rơi.'],
 雪:['这里下雪吗？','Zhèli xià xuě ma?','Ở đây có tuyết rơi không?'],
 来:['你明天来公司吗？','Nǐ míngtiān lái gōngsī ma?','Ngày mai bạn đến công ty không?'],
 公司:['我在公司工作。','Wǒ zài gōngsī gōngzuò.','Tôi làm việc ở công ty.'],
 生病:['我昨天生病了。','Wǒ zuótiān shēng bìng le.','Hôm qua tôi bị ốm.'],
 看病:['我去医院看病。','Wǒ qù yīyuàn kàn bìng.','Tôi đến bệnh viện khám bệnh.'],
 病:['我病了。','Wǒ bìng le.','Tôi ốm rồi.'],
 一点儿:['我想喝一点儿水。','Wǒ xiǎng hē yìdiǎnr shuǐ.','Tôi muốn uống một chút nước.'],
 药:['我回家后吃药。','Wǒ huí jiā hòu chī yào.','Sau khi về nhà tôi dùng thuốc.'],
 回:['我六点半回家。','Wǒ liù diǎn bàn huí jiā.','Tôi về nhà lúc 6 giờ rưỡi.'],
 再:['回家后再喝水。','Huí jiā hòu zài hē shuǐ.','Về nhà rồi hãy uống nước.'],
 喝:['我喜欢喝牛奶。','Wǒ xǐhuan hē niúnǎi.','Tôi thích uống sữa.'],
 热:['这儿太热了！','Zhèr tài rè le!','Ở đây nóng quá!'],
 水:['我想买一瓶水。','Wǒ xiǎng mǎi yì píng shuǐ.','Tôi muốn mua một chai nước.']
 };
 const sentences=[
 [1,'Trời mưa rồi.','下雨 了','Xià yǔ le.','Câu thông báo thời tiết không cần chủ ngữ giả. 了 báo tình huống mới.'],
 [1,'Thời tiết hôm nay thế nào?','今天 天气 怎么样','Jīntiān tiānqì zěnmeyàng?','今天 là thời gian; 天气 là chủ đề được hỏi.'],
 [1,'Tôi cảm thấy hơi lạnh.','我 觉得 有点儿 冷','Wǒ juéde yǒudiǎnr lěng.','有点儿 + tính từ chỉ mức hơi; 觉得 nêu cảm nhận.'],
 [1,'Tôi muốn uống một chút nước.','我 想 喝 一点儿 水','Wǒ xiǎng hē yìdiǎnr shuǐ.','一点儿 + danh từ: một ít nước; không dùng 有点儿水 ở cấu trúc này.'],
 [1,'Lạnh quá rồi!','太 冷 了','Tài lěng le!','太 + tính từ + 了 để cảm thán mức độ cao.'],
 [2,'Hôm qua tuyết rơi.','昨天 下雪 了','Zuótiān xià xuě le.','昨天 xác định thời gian quá khứ; không quy mọi 了 thành quá khứ.'],
 [2,'Hôm qua tôi không đến công ty.','我 昨天 没 来 公司','Wǒ zuótiān méi lái gōngsī.','没 phủ định việc không xảy ra. Điểm nhìn ở công ty nên dùng 来.',['昨天 我 没 来 公司']],
 [2,'Tôi đến bệnh viện khám bệnh.','我 去 医院 看病','Wǒ qù yīyuàn kàn bìng.','去 + nơi chốn + mục đích: đi bệnh viện để khám bệnh.'],
 [2,'Bác sĩ khám bệnh cho tôi.','医生 给 我 看病','Yīshēng gěi wǒ kàn bìng.','给我 xác định người được bác sĩ khám; cùng 看病 nhưng đổi chủ thể.'],
 [2,'Em trai chưa thức dậy.','弟弟 还 没 起床','Dìdi hái méi qǐ chuáng.','还没 + động từ: vẫn chưa làm; khác 还在 + động từ: vẫn đang làm.'],
 [3,'Hôm qua tôi bị ốm nên không đi làm.','我 昨天 生病 了 没 去 上班','Wǒ zuótiān shēng bìng le, méi qù shàngbān.','Hai vế kể tình huống và việc không xảy ra. 了 đi với 生病, không đặt sau 没去上班.',['昨天 我 生病 了 没 去 上班']],
 [3,'Sau khi tan ca lúc 6 giờ rưỡi tối, tôi về nhà nghỉ.','晚上 六点半 下班 后 我 回家 休息','Wǎnshang liù diǎn bàn xiàbān hòu, wǒ huí jiā xiūxi.','Thời gian + sự việc + 后 tạo mốc; sau đó là chủ thể và hành động.'],
 [3,'Sau khi về nhà tôi uống thêm một chút nước ấm.','我 回家 后 再 喝 一点儿 热水','Wǒ huí jiā hòu zài hē yìdiǎnr rè shuǐ.','回家后 → 再 → 喝. 一点儿 chỉ lượng; 热 bổ nghĩa cho 水.',['回家 后 我 再 喝 一点儿 热水']]
 ];
 const contexts=[
 [1,'Bạn vừa nhìn ra ngoài và thấy trời bắt đầu mưa.',['下雨了。','下班了。','我雨了。','下雨是。'],0,'下雨了 thông báo tình huống thời tiết mới; không cần thêm chủ ngữ giả.','Xià yǔ le.'],
 [1,'Bạn muốn nói: “Tôi cảm thấy hơi lạnh.”',['我觉得有点儿冷。','我觉得一点儿水。','我冷觉得。','我有点儿喝水。'],0,'有点儿 đứng trước tính từ 冷 để nói mức hơi.','Wǒ juéde yǒudiǎnr lěng.'],
 [1,'Bạn muốn uống MỘT CHÚT nước.',['我想喝一点儿水。','我想喝有点儿水。','我想吃一点儿水。','我想水一点喝。'],0,'喝一点儿水: động từ + lượng nhỏ + danh từ.','Wǒ xiǎng hē yìdiǎnr shuǐ.'],
 [2,'Bạn đang ở công ty, hỏi đồng nghiệp ngày mai có ĐẾN đây không.',['你明天来公司吗？','你明天回公司家吗？','你明天公司来是？','你明天在哪儿公司？'],0,'来 hướng về điểm nhìn hiện tại ở công ty; 去 thường hướng ra xa điểm nhìn.','Nǐ míngtiān lái gōngsī ma?'],
 [2,'Hôm qua bạn không đi làm. Chọn câu phủ định.',['我昨天没去上班。','我昨天没去了上班。','我昨天是不去上班。','我昨天不有上班。'],0,'Trong câu đơn này, dùng 没去 phủ định sự việc không xảy ra; không giữ 了 hoàn thành.','Wǒ zuótiān méi qù shàngbān.'],
 [2,'Chọn câu trong đó BÁC SĨ là người khám, bạn là người được khám.',['医生给我看病。','我给医生看病。','医生在我病。','我看医生给。'],0,'给我 đứng trước 看病 để chỉ người được khám.','Yīshēng gěi wǒ kàn bìng.'],
 [3,'Bạn muốn nói: “Đã 12 giờ rồi”, ngay lúc nhìn đồng hồ.',['十二点了。','十二点昨天。','十二个小时。','十二点没。'],0,'了 cuối câu báo mốc/tình huống mới ở hiện tại; không nhất thiết là quá khứ.','Shí’èr diǎn le.'],
 [3,'Về nhà trước, rồi hãy uống nước. Chọn trật tự đúng.',['回家后再喝水。','喝水后再回家。','回家后在喝水。','回家再后水喝。'],0,'V + 后: sau khi V. 再 chỉ hành động tiếp sau; 在 không dùng thay 再 ở đây.','Huí jiā hòu zài hē shuǐ.']
 ];
 window.HAN_LESSONS.sentences.push(...sentences);window.HAN_LESSONS.contexts.push(...contexts);
 window.HAN_LESSONS.families.push({title:'水 / 雨 / 雪 · Thủy / vũ / tuyết',words:['水','水果','雨','下雨','雪','天气'],text:'水 → thủy, 雨 → vũ, 雪 → tuyết giúp nối với vốn Hán Việt. 水果 là từ ghép cố định “trái cây”. Đây là liên hệ từ và âm Hán Việt; không suy ra lịch sử tạo chữ chỉ từ hình hiện đại.'},{title:'病 / 医 / 药 · Bệnh / y / dược',words:['病','生病','看病','医','医生','医院','药'],text:'生病: mắc bệnh. 看病 có thể là người bệnh đi khám hoặc bác sĩ khám cho ai, theo chủ thể và cả câu. 医 → y trong y học; 药 → dược trong dược phẩm. Không dùng âm Hán Việt thay pinyin.'});
 window.HAN_LESSONS.confusions.push(
 ['有点儿 / 一点儿','我觉得有点儿冷，想喝一点儿水。','Wǒ juéde yǒudiǎnr lěng, xiǎng hē yìdiǎnr shuǐ.','Tôi thấy hơi lạnh, muốn uống một ít nước.','有点儿 + tính từ: mức hơi, thường chưa như ý. 一点儿 + danh từ: lượng ít; tính từ + 一点儿: hơn một chút, như 早一点儿.'],
 ['来 / 去 / 回','我去医院，下午回家。','Wǒ qù yīyuàn, xiàwǔ huí jiā.','Tôi đi bệnh viện, chiều về nhà.','来: hướng về điểm nhìn; 去: rời điểm nhìn; 回: trở về. Cần biết người nói đang ở đâu trước khi chọn 来/去.'],
 ['了 / 昨天','十二点了。','Shí’èr diǎn le.','Đã 12 giờ rồi.','昨天 xác định hôm qua. 了 không phải từ chỉ quá khứ: ở đây báo mốc mới ngay hiện tại.'],
 ['看病 / 生病','我生病了，去医院看病。','Wǒ shēng bìng le, qù yīyuàn kàn bìng.','Tôi bị ốm rồi, đi bệnh viện khám.','生病: mắc bệnh. 看病: đi khám/khám chữa tùy chủ thể. 我看病 là tôi đi khám; 医生给我看病 là bác sĩ khám cho tôi.'],
 ['觉得 / 知道','我觉得有点儿冷。','Wǒ juéde yǒudiǎnr lěng.','Tôi cảm thấy hơi lạnh.','觉得: cảm nhận/ý kiến. 知道: biết thông tin. 我觉得他很好: tôi thấy anh ấy rất tốt; 我知道他的名字: tôi biết tên anh ấy.']
 );
 window.HAN_LESSON12={hans:rows.map(r=>r[0]),examples,sentences,contexts,newCount:n};
})();
