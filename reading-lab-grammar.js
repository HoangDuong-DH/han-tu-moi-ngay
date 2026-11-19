(() => {
 'use strict';const L=window.HAN_READING_LAB;
 const cards=new Map([...window.HAN_GRAMMAR.cards,...window.HAN_HSK2.units.flatMap(u=>u.grammar)].map(g=>[g.id,g]));
 function d(id,formula,walk,scope,transform,swap,words){
  const g=cards.get(id);if(!g)throw Error('Missing grammar '+id);
  const examples=g.examples||[[g.han,g.py,g.vn],...(g.depth?.examples||[])];
  const x={id,title:g.title,formula,walk,scope,transform,swap,words,examples,when:g.depth?.when||g.explain,reason:g.depth?.reason||g.explain,error:g.depth?.error||g.trap||g.contrast};
  L.grammar.set(id,x);g.readerGrammar=x;
 }
 d('simple','(Thời gian) + 下雨 / 下雪 + (了)',
  [['昨天','Đặt mốc cho cả sự việc thời tiết, không là chủ thể tạo ra mưa.'],['下雨','Cách nói mưa rơi; 下 là động từ trong tổ hợp này.'],['了','Thông báo tình huống xuất hiện/đổi khác theo ngữ cảnh.']],
  '下雨了 là một lời thông báo đủ nghĩa. Tiếng Trung không buộc chèn một “nó” giả như cách một số ngôn ngữ đặt chủ ngữ cho thời tiết. Đây không phải phép xóa chủ ngữ cho mọi câu.',
  '昨天下雨了 kể việc mưa; 昨天没下雨 phủ định việc mưa hôm qua. 不下雨 trong dự báo hoặc điều kiện có phạm vi khác, cần đọc mốc thời gian.',
  ['明天下雨吗？','Míngtiān xià yǔ ma?','Mai có mưa không?','Đổi hôm qua thành ngày mai, đổi thông báo thành câu hỏi. Không cần giữ 了 chỉ vì câu gốc có nó.'],['昨天','明天','下雨','雪']);
 d('le','Tình huống / trạng thái mới + 了',
  [['十二点','Một mốc đồng hồ, không phải hành động.'],['了','Người nói thấy mốc ấy đã tới và có liên quan lúc đang nói.']],
  'Trong 十二点了, không có động từ quá khứ nào để “chia thì”. 了 cuối câu báo mốc mới. 我不去了 còn báo thay đổi dự định, vì vậy gặp 不 không có nghĩa luôn phải xóa 了.',
  '我没去 nói việc đi không xảy ra. 我不去了 nói quyết định không đi nữa. Hai câu trả lời hai câu hỏi khác nhau; thay 没/不 một cách cơ học sẽ đổi nghĩa.',
  ['我不在这里工作了。','Wǒ bú zài zhèlǐ gōngzuò le.','Tôi không còn làm ở đây nữa.','在这里工作 là trạng thái làm việc trước kia; 不…了 thông báo nó đã ngừng.'],['了','不','没','工作','现在']);
 d('degree','太 + tính từ / trạng thái + 了',
  [['太','Đẩy mức đánh giá lên cao theo phản ứng người nói.'],['冷 / 好吃','Điều được đánh giá: lạnh hoặc ngon.'],['了','Khép lời cảm thán trong mẫu này; không phải “đã”.']],
  '太冷了 thường là chê lạnh quá, nhưng 太好吃了 có thể khen ngon quá. Thái độ phụ thuộc tính từ và tình huống, không phải 太 luôn tiêu cực hoặc luôn so sánh hai vật.',
  '不太冷 là không lạnh lắm, khác 太冷了 là lạnh quá. Khi hạ mức bằng 不太, không giữ nguyên mẫu cảm thán để rồi dịch từng chữ.',
  ['这杯茶不太热。','Zhè bēi chá bú tài rè.','Cốc trà này không nóng lắm.','不 phủ định mức cao 太热, không khẳng định trà lạnh.'],['太','冷','热','好吃','茶']);
 d('small','有点儿 + tính từ · 一点儿 + danh từ · tính từ + 一点儿',
  [['有点儿冷','Hơi lạnh: 有点儿 đi trước đặc điểm.'],['一点儿水','Một chút nước: lượng nhỏ đứng trước vật.'],['大一点儿','To hơn chút: mức thay đổi đặt sau tính từ.']],
  'Cả ba có thể được dịch bằng “một chút”, nhưng vị trí cho biết lượng vật hay mức đặc điểm. 有点儿 thường dùng khi trạng thái chưa như ý; không từ đó cấm mọi cách đánh giá ngoài sách.',
  '我有点儿累 nói hơi mệt. 我想休息一会儿 nói muốn nghỉ một lúc. Muốn đổi nghĩa phải đổi cả cấu trúc, không chỉ kéo 一点儿 qua lại.',
  ['请写大一点儿。','Qǐng xiě dà yìdiǎnr.','Xin viết to hơn một chút.','大 bổ sung yêu cầu đối với chữ viết; 一点儿 điều chỉnh mức to, không đếm số chữ.'],['有点儿','一点儿','水','大','冷']);
 d('sequence','Hành động A + 后 / 以后，(ai) + 再 + hành động B',
  [['回家后','Lấy hoàn thành việc về nhà làm mốc.'],['再喝水','Rồi mới thực hiện bước uống nước.']],
  '后 gắn sau một cụm việc, còn 再 đứng trước bước tiếp. Câu có thể nói kế hoạch, lời dặn hoặc thứ tự trong tình huống; không mặc định mọi hành động đã xảy ra.',
  '还没回家 thì chưa qua mốc về nhà. 回家后再喝水 chưa nói chờ bao lâu sau khi về. “Sau” xác định thứ tự, không tự xác định thời lượng.',
  ['我下班后先去超市，再回家。','Wǒ xiàbān hòu xiān qù chāoshì, zài huí jiā.','Tan ca rồi tôi đi siêu thị trước, sau đó về nhà.','Một mốc lớn chứa hai bước: 先 A，再 B. 再 khác 在 chỉ nơi chốn/diễn tiến.'],['后','以后','再','先','下班','回家']);
 d('roles','Ai + 给 + người nhận / người hưởng + hành động',
  [['医生','Chủ ngữ: người khám trong 医生给我看病.'],['给我','Người được hưởng/nhận việc khám.'],['看病','Hành động do chủ ngữ làm.']],
  '给 không buộc người đứng sau nó là người làm hành động cuối. 医生给我看病 là bác sĩ khám cho tôi; 我去看病 lại dùng 我 là bệnh nhân đi khám. Từ 看病 giữ hình thức nhưng vai thay theo khung.',
  '我没给医生打电话 phủ định cuộc gọi do tôi thực hiện. 医生没给我打电话 phủ định một cuộc gọi khác. Muốn đổi người gọi phải đổi chủ ngữ, không đổi nghĩa riêng của 给.',
  ['姐姐给弟弟打电话。','Jiějie gěi dìdi dǎ diànhuà.','Chị gọi điện cho em trai.','Giữ khung, thay người và hành động để kiểm tra bạn đã nắm vai.'],['给','医生','看病','打电话','姐姐','弟弟']);
 d('negative','不 / 没 + phần bị phủ định',
  [['我明天不去公司','Không đi trong dự định ngày mai.'],['我昨天没去公司','Việc đi đã không xảy ra hôm qua.'],['我没有手机','没有 phủ định 有 sở hữu.']],
  'Cần biết người nói phủ định trạng thái/ý định hay việc đã xảy ra; mốc quá khứ không tự bắt buộc 没: 我昨天不舒服 vẫn dùng 不 cho trạng thái không khỏe. Bài này không biến tương lai/quá khứ thành quy tắc thay chữ.',
  '我还没看完 = chưa đọc hết; 我不看了 = không đọc nữa. Câu đầu phủ định kết quả đã đạt, câu sau báo ngừng/đổi ý. 了 sau động từ hoàn thành thường không giữ trong mẫu 没 + V đơn giản đang học.',
  ['我昨天不舒服，所以没去公司。','Wǒ zuótiān bù shūfu, suǒyǐ méi qù gōngsī.','Hôm qua tôi không khỏe nên đã không đến công ty.','Cùng hôm qua nhưng 不 phủ định trạng thái, 没 phủ định sự việc đi.'],['不','没','没有','舒服','去']);
 d('ongoing','Ai + (还) + 在 / 正在 + hành động + (呢)',
  [['现在','Thời gian: bây giờ.'],['在家里','Nơi chốn: ở nhà.'],['在看书','Diễn tiến: đang đọc sách.']],
  'Không phải mọi 在 đều dịch “đang”. 在 + địa điểm có thể làm vị ngữ vị trí hoặc trạng ngữ nơi chốn; 在 đứng trước hành động mới thể hiện diễn tiến trong khung này. 呢 còn dùng ở 你呢 để hỏi “còn bạn?”.',
  '还在睡觉 và 还没睡觉 khác nhau ở việc ngủ đang có hay chưa có. Cả hai dùng 还 nhưng không cùng một giai đoạn sự việc.',
  ['我现在在家里看书。','Wǒ xiànzài zài jiāli kàn shū.','Bây giờ tôi đang đọc sách ở nhà.','现在 đặt mốc; 在家里 đặt nơi; 看书 là hành động. Không cần chèn thêm 在 trước mọi động từ.'],['在','正在','现在','还','睡觉','看书']);
 d('question','Ai + V 不 V / V 没 V + phần còn lại？',
  [['去不去','Mở hai khả năng đi hay không đi.'],['去没去','Hỏi sự việc đi đã xảy ra hay chưa.'],['明天 / 昨天','Mốc giúp chọn phạm vi câu hỏi.']],
  'Chính phản đã tạo dạng nghi vấn, nên ở mẫu cơ bản không ghép thêm 吗. Trong 我不知道他去不去, cả khối chính phản lại là câu hỏi nhúng, còn toàn câu là thông báo không biết.',
  '你不去吗 thường chờ xác nhận chuyện không đi hoặc có ngạc nhiên, không hệt sắc thái trung hòa của 你去不去. Những câu hỏi cùng dịch “có đi không” có thể mang kỳ vọng khác nhau.',
  ['我不知道他明天去不去。','Wǒ bù zhīdào tā míngtiān qù bu qù.','Tôi không biết mai anh ấy có đi không.','Dấu chấm vì người nói báo điều chưa biết; không phải đang hỏi trực tiếp người nghe.'],['去','不','没','知道','明天']);
 d('place','Mốc + 有 + vật · Vật đã nói + 在 + mốc',
  [['饭店前边','饭店 là mốc; 前边 ở sau mốc.'],['有一把椅子','Đưa một chiếc ghế vào cảnh.'],['椅子在饭店前边','Chọn chiếc ghế làm điều đang nói, rồi định vị nó.']],
  'Hai mẫu có thể chỉ cùng một cảnh nhưng tổ chức thông tin khác. Không coi 饭店前边 là một từ ghép bắt buộc; đó là cụm có thể thay mốc bằng 学校、家、车站.',
  '没有 phủ định sự hiện diện: 饭店前边没有椅子. 不在 phủ định vị trí của một vật đã xác định: 椅子不在饭店前边. Câu sau chưa nói không có ghế ở bất kỳ đâu.',
  ['书在椅子上，猫在椅子旁边。','Shū zài yǐzi shang, māo zài yǐzi pángbiān.','Sách ở trên ghế, mèo ở cạnh ghế.','Giữ ghế làm mốc, thay chủ thể và phương vị; không đổi mốc theo danh từ gần nhất.'],['在','有','椅子','前边','旁边','上']);
 d('time','(Ngày → buổi → giờ → phút) + hành động',
  [['明天','Ngày.'],['下午','Buổi.'],['两点零五分','Giờ và phút: 14:05.'],['下班','Hành động được định giờ.']],
  'Thời điểm thường đặt đầu câu hoặc sau chủ ngữ, trước động từ. Khoảng thời gian như 两个小时 trả lời “bao lâu”, không cùng chức năng với 两点 trả lời “mấy giờ”.',
  '昨天九点没上班 phủ định việc bắt đầu làm ở mốc ấy; không chắc cả ngày không làm. Muốn phủ định cả ngày cần nói 明天不去上班 hoặc một phạm vi rõ tương ứng.',
  ['我下午两点休息，休息半个小时。','Wǒ xiàwǔ liǎng diǎn xiūxi, xiūxi bàn ge xiǎoshí.','Tôi nghỉ lúc hai giờ chiều, nghỉ trong nửa giờ.','Hai cụm số trả lời hai câu hỏi khác nhau: khi nào và bao lâu.'],['明天','下午','点','分','小时','半']);
 d('modals','Ai + 想 / 要 / 会 / 能 / 可以 + cụm hành động',
  [['想喝水','Mong muốn uống.'],['会开车','Kỹ năng lái xe đã học.'],['今天不能去','Hôm nay điều kiện không cho đi được.']],
  'Người nói có thể 想去 mà 不能去. 会 còn chỉ dự báo như 明天会下雨; 要 cũng có ý định/cần/phải theo câu. Đừng gắn một bản dịch cố định cho mọi lần xuất hiện.',
  '不想去 phủ định mong muốn; 不能去 phủ định khả năng/điều kiện; 不会开车 phủ định kỹ năng. 没去 chỉ báo việc đi không xảy ra, không đủ biết lý do là không muốn hay không thể.',
  ['我想去，但是今天不能去。','Wǒ xiǎng qù, dànshì jīntiān bù néng qù.','Tôi muốn đi nhưng hôm nay không thể đi.','Đây không phải hai mệnh đề mâu thuẫn: mong muốn và điều kiện là hai mặt khác nhau.'],['想','要','会','能','可以']);
 d('l13-request','请 + việc · 我可以 + việc + 吗？',
  [['我可以坐这儿吗','Người kể xin phép cho chính mình ngồi.'],['请坐这儿','Người nói mời/nhờ người nghe ngồi.'],['坐这儿吧','Chủ ngữ 你 lược, thành lời mời gần gũi theo tình huống.']],
  'Lịch sự phụ thuộc người nói, mục đích, quyền quyết định chỗ ngồi và quan hệ, không có một chữ cứ thêm vào là mọi câu đều lịch sự. 请问 mở lời hỏi; 请 + động từ có thể mời hoặc nhờ.',
  '可以不去吗 hỏi xin phép không đi. 不可以去 có thể nói không được phép đi. Vị trí 不 thay đổi điều đang xin phép hoặc điều bị cấm.',
  ['我可以坐那儿吗？','Wǒ kěyǐ zuò nàr ma?','Tôi ngồi đằng kia được không?','Thay 这儿 bằng 那儿 giữ chức năng xin phép, chỉ đổi vị trí.'],['请','请问','可以','坐','这儿','那儿']);
 d('l13-give','Ai + 给 + người + vật · Ai + 给 + người + V',
  [['我给你一杯茶','给 là động từ trao, có người nhận 你 và vật 一杯茶.'],['我给你打电话','给你 giới thiệu người nhận cuộc gọi; hành động chính 打电话 ở sau.']],
  'Không chỉ cần nhìn chữ 给: phải nhìn xem sau người nhận là vật hay hành động. Trong 我给你介绍酒店, người nhận thông tin là 你, còn vật được giới thiệu là khách sạn.',
  '我没给他茶 phủ định việc trao trà; 我没给他打电话 phủ định cuộc gọi cho anh ấy. Cùng 没给 nhưng nội dung bị phủ định khác.',
  ['我给妈妈买了一杯茶。','Wǒ gěi māma mǎi le yì bēi chá.','Tôi mua một cốc trà cho mẹ.','给妈妈 chỉ người hưởng việc mua; câu chưa tự xác nhận mẹ đã nhận hoặc đã uống.'],['给','买','茶','妈妈','介绍']);
 d('l13-quantity','Số / từ chỉ định + lượng từ + danh từ',
  [['两杯茶','杯 đo lượng đồ uống.'],['两个杯子','个 đếm đồ vật là cốc; 杯子 là danh từ.'],['半杯茶','半 đặt trước đơn vị 杯.']],
  'Không phải thấy 杯 là đếm cái cốc: 两杯茶 nói hai phần trà theo cốc, 两个杯子 đếm hai chiếc cốc. Trong 一家酒店, 家 là lượng từ; trong 朋友家, 家 lại là nhà.',
  '没有茶 không tự nói không có cốc. Không thể suy hai người từ 两杯茶 nếu văn bản chỉ nói lượng đồ uống.',
  ['我要半杯茶，不要一杯。','Wǒ yào bàn bēi chá, bú yào yì bēi.','Tôi lấy nửa cốc trà, không lấy cả cốc.','半杯 và 一杯 cùng có trà nhưng khác lượng; 不要 ở đây từ chối một lựa chọn.'],['两','杯','杯子','半','个','家']);
 d('l13-order','我要 + món · 请再给我 + lượng + món',
  [['我要面包和鸡蛋','Khách nêu lựa chọn; 和 nối hai món.'],['请再给我一杯茶','Xin thêm một cốc ngoài yêu cầu trước.']],
  '要 trong gọi món thường là “tôi lấy”, không tự mang sắc thái ra lệnh như một số bản dịch máy. Muốn chọn mức trực tiếp hay mềm còn phải xét tình huống; 可以给我…吗 cũng là một cách hỏi.',
  '不要鸡蛋 là không lấy trứng; 还没吃鸡蛋 là chưa ăn trứng. Không dùng chung một chữ “không” để xóa khác biệt giữa gọi món và kể việc ăn.',
  ['请再给我一个鸡蛋。','Qǐng zài gěi wǒ yí ge jīdàn.','Xin cho tôi thêm một quả trứng.','Thay cốc trà bằng quả trứng cần thay luôn lượng từ 杯 → 个.'],['要','再','给','面包','鸡蛋','茶']);
 d('hsk2:g:1:1','Phán đoán có dấu hiệu + 吧？',
  [['你是新来的老师','Nội dung được đoán dựa vào người/tình huống trước mắt.'],['吧','Chừa chỗ người nghe xác nhận hoặc sửa.']],
  '吧 không biến một câu hoàn toàn không có căn cứ thành câu hỏi trung hòa. Người nói thường đã có một hướng đoán. Cùng 吧 trong 坐这儿吧 lại làm lời mời, nên phải xem loại hành động của toàn câu.',
  '你不是老师吧 có thể nghiêng về đoán không phải giáo viên. 你是老师吗 hỏi trực tiếp hơn về có phải hay không; không phải lúc nào hai dạng thay nhau cùng sắc thái.',
  ['你是来接我的吧？','Nǐ shì lái jiē wǒ de ba?','Bạn đến đón tôi phải không?','Người kể có cơ sở đoán người kia đến đón; 吧 mời xác nhận.'],['吧','老师','接','来']);
 d('hsk2:g:1:2','Ai + 是 + chi tiết sự việc + V + 的',
  [['我','Người đã đến.'],['是坐火车来的','Nhấn cách đến bằng tàu; chi tiết có thể bị bác hoặc sửa.']],
  'Trong cách dùng đang học, việc đến đã là nền thông tin; trọng tâm là bằng gì/lúc nào/ai làm. Không gọi mọi 是…的 là một dạng thì quá khứ: 这是我的书 chỉ nhận diện sách và quan hệ sở hữu.',
  '我不是坐火车来的，是坐飞机来的 bác phương tiện tàu, không bác việc đã đến. Nếu chỉ muốn kể chưa đến, dùng 我还没来 / 还没到 theo điểm nhìn.',
  ['我是昨天来的。','Wǒ shì zuótiān lái de.','Tôi đến hôm qua.','Giữ việc đến làm nền nhưng chuyển phần nhấn từ phương tiện sang thời điểm.'],['是','的','昨天','坐','火车','来']);
 d('hsk2:g:1:3','Người A + 请 / 让 + người B + hành động',
  [['我想请你','我 muốn nhờ; 你 là người được nhờ.'],['帮个忙','Hành động do 你 thực hiện, không phải 我.']],
  'Người B giữ hai vai: nhận tác động từ 请 / 让 và làm chủ thể của việc tiếp. Đó là lý do phải đọc quan hệ thay vì chia từng chữ thành các chủ ngữ độc lập. 请 còn dùng để mời, tùy việc sau nó.',
  '老师没让小王去 bác việc thầy/cô cho/bảo Tiểu Vương đi. Nó chưa tự chứng minh Tiểu Vương thực tế không đi, vì cậu ấy có thể đi vì lý do khác.',
  ['我请朋友帮我买票。','Wǒ qǐng péngyou bāng wǒ mǎi piào.','Tôi nhờ bạn giúp tôi mua vé.','朋友 là người mua giúp; 我 sau 帮 là người được giúp.'],['请','让','帮忙','朋友','买','票']);
 d('hsk2:g:2:1','(Cân nhắc các cách) + 还是 + phương án + 吧',
  [['公交车还没来','Dữ kiện khiến người nói cân nhắc.'],['我们还是打车吧','Đưa taxi thành lựa chọn nên theo sau cân nhắc.']],
  'Ở câu trần thuật/đề nghị này, 还是 gần “hay là/rốt cuộc nên”. Trong 你坐公交车还是打车？ nó nối hai lựa chọn của câu hỏi. Đếm đủ các phương án và xem dấu hỏi, đừng gắn một nghĩa cho mọi 还是.',
  '我们还是不去了吧 chọn phương án không đi. 还没去 chỉ chưa thực hiện, chưa thể thay thành cùng ý quyết định.',
  ['太晚了，我们还是明天去吧。','Tài wǎn le, wǒmen háishi míngtiān qù ba.','Muộn quá rồi, hay là chúng ta đi ngày mai nhé.','Vẫn đề nghị sau cân nhắc nhưng đổi lựa chọn từ phương tiện sang thời gian.'],['还是','吧','打车','公交车','明天']);
 d('hsk2:g:2:2','Số tròn chục + 多 + đơn vị (trong các mẫu đang học)',
  [['二十多','Hơn hai mươi, chưa tới ba mươi theo cách ước lượng này.'],['块钱 / 间教室','Đơn vị cho biết đang đếm tiền hay phòng.']],
  '二十多间教室 đếm phòng, không đếm giáo viên. 多 ở vị trí này là phần của cụm số ước lượng; “hơn” không cho phép suy số chính xác 21 hoặc 25.',
  '二十间 khác 二十多间. Không áp một vị trí 多 cho mọi số thập phân hoặc mọi đơn vị; các cách như 二十块多 và 二十多块 có phạm vi khác, cần đọc mẫu cụ thể.',
  ['学校有三十多间教室。','Xuéxiào yǒu sānshí duō jiān jiàoshì.','Trường có hơn ba mươi phòng học.','Thay 二十 bằng 三十 giữ vị trí 多 và lượng từ 间.'],['多','间','教室','块','钱']);
 d('hsk2:g:2:3','[Mệnh đề mô tả] + 的 + danh từ trung tâm',
  [['我昨天买的','Ai làm gì khi nào: một mệnh đề dùng để xác định.'],['票','Trung tâm: thứ đang được gọi tên.']],
  'Trong 我昨天买的票, trung tâm là vé, không phải 我. Cụm mô tả có chủ ngữ và động từ vẫn chưa phải vị ngữ của câu chính ở vị trí này. Nhận ra danh từ bên phải 的 trước sẽ giảm việc dịch nhầm.',
  '我没买的票 là vé mà tôi không mua; 我买的票不是今天的是 câu về ngày trên vé. Vị trí phủ định quyết định nội dung nào bị bác.',
  ['这是朋友给我买的票。','Zhè shì péngyou gěi wǒ mǎi de piào.','Đây là vé bạn mua cho tôi.','Cụm trước 的 có cả người làm 朋友, người hưởng 我 và việc 买; trung tâm vẫn chỉ là 票.'],['的','票','买','朋友','昨天']);
 d('hsk2:g:3:1','Động từ + kết quả (+ đối tượng)',
  [['看完','Đọc/xem tới hết; 完 cho kết quả hết.'],['看懂','Đọc/xem và hiểu; 懂 cho kết quả hiểu.'],['没看懂','没 phủ định đạt kết quả hiểu, không buộc phủ định từng có nhìn/đọc.']],
  '看完了，但是没看懂 không mâu thuẫn: hoàn thành nội dung và hiểu nội dung là hai kết quả khác nhau. Trong lớp từ & cấu trúc, có thể giữ 看完 làm một khối chức năng nhưng phải ghi rõ nó là động từ + bổ ngữ kết quả, không chỉ nói “một từ hai chữ”.',
  'Phủ định đã đạt kết quả thường dùng 没看懂. 看不懂 là bổ ngữ khả năng, nói không hiểu nổi/không đọc hiểu được trong điều kiện ấy; hai khung liên quan nhưng không đồng nhất.',
  ['我听见了，但是没听懂。','Wǒ tīngjiàn le, dànshì méi tīngdǒng.','Tôi nghe thấy rồi nhưng chưa hiểu.','Dùng lại 听: 见 là nghe được âm, 懂 là hiểu nội dung.'],['看','完','懂','听见','听']);
 d('hsk2:g:3:2','A → AA / A一A · AB → ABAB (với từ phù hợp)',
  [['看看','Xem qua/thử xem, một hành động giới hạn.'],['休息休息','Nghỉ một lát; ABAB với 休息.'],['帮帮忙','Từ ly hợp 帮忙 lặp phần động từ, không nhân đôi máy móc cả chuỗi.']],
  'Lặp động từ thường làm hành động nhẹ, ngắn hoặc mang ý thử. Không phải mọi động từ đều lặp được trong mọi nghĩa, và hình thức hai chữ không đủ để chọn ABAB. 看看 cũng không có nghĩa người nói đã xem.',
  '别看了 là bảo ngừng xem, không phải phủ định AA bằng cách tùy ý chèn 不 giữa hai chữ. Chọn mẫu phù hợp với ý muốn ngăn, thử hay kể đã làm.',
  ['你先试试这件衣服。','Nǐ xiān shìshi zhè jiàn yīfu.','Bạn thử món quần áo này trước xem.','试试 hạ việc thử thành đề nghị nhẹ; 件 là lượng từ của 衣服.'],['看','试','休息','帮忙','衣服']);
 d('hsk2:g:3:3','Động từ đơn âm A + 了 + A',
  [['看了看','Đã xem qua một chút: 了 giữa hai lần 看.'],['介绍','Đối tượng được xem, đứng sau khối động từ.']],
  'A了A vừa biểu thị làm qua một chút vừa đặt hành động vào sự việc đã xảy ra đang kể. 了 không phải miếng dán “quá khứ” đặt tùy ý cuối mọi dạng lặp. Với từ hai âm có thể dùng 休息了一下 cho rõ.',
  '没看介绍 phủ định việc xem, không suy từ đó tạo mẫu 没看了看. Khi đã xem nhưng không hiểu, giữ việc xem rồi phủ định kết quả hiểu ở mệnh đề sau.',
  ['我洗了洗手，再吃饭。','Wǒ xǐ le xi shǒu, zài chī fàn.','Tôi rửa qua tay rồi ăn cơm.','洗了洗 là khối A了A, 手 đi sau làm đối tượng.'],['看','洗','手','了','介绍']);
 d('hsk2:g:4:1','(没) + động từ + 过 + đối tượng',
  [['没穿过','Chưa có trải nghiệm mặc.'],['红色的裤子','Thứ người kể chưa từng mặc.']],
  '过 trong mẫu trải nghiệm đọc nhẹ guo. Trọng tâm là đã từng hay chưa, không phải giờ chính xác của một lần cụ thể. Có thể thêm 去年, nhưng ý trải nghiệm vẫn cần được phân biệt với kể một chuyến đi bằng 了.',
  '我没去过北京 khác 我昨天没去北京. Câu đầu phủ định có kinh nghiệm đến Bắc Kinh, câu sau chỉ phủ định việc đi hôm qua. Không dùng 不去过 trong mẫu cơ bản này.',
  ['你喝过这种茶吗？','Nǐ hē guo zhè zhǒng chá ma?','Bạn đã từng uống loại trà này chưa?','Thay 穿 quần bằng 喝 trà giữ nguyên chức năng trải nghiệm; 过 vẫn đọc nhẹ.'],['过','穿','喝','茶','没']);
 d('hsk2:g:4:2','因为 + nguyên nhân，所以 + hệ quả',
  [['因为车站很远','Lý do được người nói đưa ra.'],['所以我们打车去','Lựa chọn hệ quả: đi taxi.']],
  'Có thể dùng cả cặp hoặc lược một vế nối khi quan hệ rõ. Nguyên nhân và hệ quả phải có nội dung, không phải cứ hai câu sát nhau đã thành quan hệ 因为–所以. Từ nối xác nhận quan hệ trong lời người kể, không tự bảo đảm một khẳng định y học hay lịch sử đúng ngoài đời.',
  '因为没买好票，所以今天不去 có 没 trong lý do, 不 trong quyết định; không cần hai vế dùng cùng kiểu phủ định.',
  ['因为我还没买好票，所以今天不去。','Yīnwèi wǒ hái méi mǎihǎo piào, suǒyǐ jīntiān bú qù.','Vì tôi chưa mua xong vé nên hôm nay không đi.','Đặt điều chưa hoàn tất làm lý do cho quyết định hiện tại.'],['因为','所以','还','买','票']);
 d('hsk2:g:4:3','Phần mô tả + 的 + (danh từ được hiểu)',
  [['红色的','Chiếc màu đỏ, nếu cả đoạn đang lựa quần.'],['裤子','Danh từ có thể khôi phục từ cảnh, không biến mất khỏi nghĩa.']],
  '的 giúp phần mô tả thay cả cụm danh từ khi người nghe biết loại vật đang nói. 红色的 có thể là quần, áo hoặc bút trong cảnh khác. Không dạy 的 là một danh từ mang nghĩa “chiếc quần”.',
  '我不喜欢红色的 phủ định thích một lựa chọn. 不是红色的 bác việc vật ấy có màu đỏ. Hai câu khác điều đang bị phủ định.',
  ['这两条裤子，我想试黑色的。','Zhè liǎng tiáo kùzi, wǒ xiǎng shì hēisè de.','Hai chiếc quần này, tôi muốn thử chiếc đen.','裤子 nêu ở đầu, nên 黑色的 được hiểu là 黑色的裤子.'],['的','红色','黑色','裤子','试']);
 d('hsk2:g:5:1','Hướng chuyển động + 来 / 去',
  [['下来','Từ trên xuống, về phía điểm nhìn đang nói.'],['下去','Từ trên xuống, rời ra phía khác so với điểm nhìn.']],
  '上/下/进/出 cho trục chuyển động; 来/去 cho hướng tương đối với người nói hoặc điểm nhìn câu chuyện. “Xuống” không tự quyết định 来 hay 去. Cần biết ai đứng đâu khi nói.',
  '没下来 nói chuyển động xuống chưa/không xảy ra. 下不来 nêu không xuống được. Không đặt 不 tùy ý vào giữa rồi gọi mọi dạng là cùng một phủ định.',
  ['我在楼下，你下来吧。','Wǒ zài lóuxià, nǐ xiàlái ba.','Tôi ở dưới tầng, bạn xuống đây nhé.','Nếu người nói ở trên và bảo người nghe rời xuống dưới, hướng có thể đổi thành 下去.'],['来','去','上','下','楼下']);
 d('hsk2:g:5:2','进 / 回 / 上 / 下 + đích nơi chốn + 来 / 去',
  [['进教室来','教室 là đích, nằm sau 进 và trước 来 trong mẫu này.'],['拿一本书来','一本书 là đồ vật được mang, khác đích địa điểm.']],
  'Bài học lấy mẫu có tân ngữ nơi chốn đặt trước 来/去. Tân ngữ đồ vật có các cách sắp khác tùy động từ, hoàn thành, thông tin và ngữ cảnh; không áp một vị trí của 教室 lên mọi tân ngữ.',
  '还没进教室来 phủ định đã vào theo hướng điểm nhìn; Các dạng bổ ngữ khả năng với 进不来 nói đến khả năng vào và có điều kiện sử dụng riêng. Khi mới học, giữ mẫu đích rõ rồi đổi người/đích.',
  ['请回家去吧。','Qǐng huí jiā qù ba.','Xin hãy về nhà đi.','家 là đích sau 回; 去 cho biết hướng rời điểm nhìn hiện tại.'],['进','回','教室','家','来','去']);
 d('hsk2:g:5:3','都 + mốc / mức đáng chú ý + 了',
  [['都九点了','Đã tới tận chín giờ rồi, theo cảm nhận muộn/đáng chú ý.'],['你还没准备好','Vế sau nêu việc vẫn chưa sẵn sàng, làm rõ kỳ vọng.']],
  '都 ở đây không quét một nhóm người như 我们都去. Nó nhấn mốc đã đến. Không bắt buộc mọi 都…了 mang trách móc; ngạc nhiên hoặc nhận xét tùy cảnh và ngữ điệu.',
  '都九点了 không phải phủ định. Cụm 还没准备好 phủ định đạt kết quả chuẩn bị xong. Tách hai vế trước khi xác định ai bị chê hoặc việc gì đã làm.',
  ['都十二点了，我们先吃饭吧。','Dōu shí’èr diǎn le, wǒmen xiān chī fàn ba.','Đã mười hai giờ rồi, chúng ta ăn trước nhé.','Mốc giờ thúc đẩy lời đề nghị, không nhất thiết phê phán một người.'],['都','了','点','还','准备']);
 d('hsk2:g:6:1','Tính từ AB → AABB (với từ phù hợp)',
  [['高兴 → 高高兴兴','Tả sắc thái vui vẻ sống động.'],['高高兴兴地打开','Cả cụm lặp làm trạng ngữ cách thức cho hành động mở.']],
  'AABB không phải nhân đôi mọi chuỗi hai chữ. Cần từ được dùng theo mẫu ấy; 高兴、舒服 có các dạng của bài, nhưng không suy động từ như 学习 cũng thành 学学习习.',
  'Đừng giữ máy móc dạng 高高兴兴 khi muốn phủ định trạng thái vui: tùy ý cần nói 不高兴 hoặc một câu khác. Dạng lặp mang sắc thái riêng, không chỉ tăng mức bằng 很.',
  ['我想在家舒舒服服地休息。','Wǒ xiǎng zài jiā shūshufúfú de xiūxi.','Tôi muốn nghỉ thoải mái ở nhà.','在家 chỉ nơi; 舒舒服服地 chỉ cách nghỉ, hai trạng ngữ khác loại.'],['高兴','舒服','地','休息','家']);
 d('hsk2:g:6:2','Một vài ví dụ + 什么的',
  [['鱼、肉','Các món thật sự được nêu.'],['什么的','Để mở các món tương tự, không liệt kê hết.']],
  'Đây là cách nói khẩu ngữ, không phải người kể đang hỏi “cái gì?”. Những mục không nêu tên chưa được xác nhận riêng, dù chúng hợp hoàn cảnh như bánh trong sinh nhật.',
  '没买鱼、肉什么的 là phủ định việc mua nhóm món; 你买了什么 là câu hỏi nội dung. Đọc vị trí và dấu câu thay vì cứ thấy 什么 là trả lời bằng một vật.',
  ['我想买茶、牛奶什么的。','Wǒ xiǎng mǎi chá, niúnǎi shénme de.','Tôi muốn mua trà, sữa và những thứ tương tự.','想 giữ cả danh sách trong ý định, chưa xác nhận đã mua một món nào.'],['什么','的','鱼','肉','茶','牛奶']);
 d('hsk2:g:6:3','Cách thức + 地 + động từ',
  [['舒舒服服地','Tả hành động được làm theo cách thoải mái.'],['睡一觉','Động từ và một lượt ngủ; 觉 là danh từ/lượng lượt trong kết hợp này.']],
  '地 hướng tới động từ phía sau. 的 thường dẫn tới danh từ, 得 trong 说得很好 mở phần đánh giá sau động từ. Ba chữ đồng âm de nhưng quan hệ và vị trí khác nhau; nhiều trạng ngữ thời gian/nơi chốn không cần 地.',
  '不高兴地说 có thể tả cách nói không vui; 没高兴地说 phủ định một sự việc được tả như thế, không tự khẳng định cảm xúc. Muốn diễn đạt một ý cụ thể cần chọn cả câu, không chỉ thay trợ từ.',
  ['他慢慢地走进教室。','Tā mànmàn de zǒu jìn jiàoshì.','Anh ấy từ từ bước vào phòng học.','慢慢地 bổ nghĩa cho 走; 教室 là đích sau 进. Không viết 明天地去 cho “ngày mai đi”.'],['地','的','得','舒服','睡觉','高兴']);
})();
