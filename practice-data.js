// Original graded practice using the learner's catalogue. Passage completion
// is evidence for its questions, never automatic mastery of every word seen.
(() => {
 'use strict';
 const passages=[],make=(id,title,level,topic,focus,lines,questions,writing,model,extra=[])=>{
  const p={id,title,level,topic,focus,lines:lines.map(([han,py,vn])=>({han,py,vn})),questions:questions.map((q,i)=>({id:id+'-q'+(i+1),prompt:q[0],options:q[1],answer:q[1][q[2]],proof:q[3],why:q[4],facet:q[5],concepts:q[6]})),writing,model,extra};
  passages.push(p);
 };
 make('morning','Một buổi sáng có giờ hẹn',1,'Thời gian',['早上','上班','早饭','给','打电话'],[
  ['明天早上七点，我吃早饭。','Míngtiān zǎoshang qī diǎn, wǒ chī zǎofàn.','Sáng mai lúc 7 giờ, tôi ăn sáng.'],
  ['我上午九点上班。','Wǒ shàngwǔ jiǔ diǎn shàngbān.','Tôi bắt đầu làm lúc 9 giờ sáng.'],
  ['八点半，我给你打电话。','Bā diǎn bàn, wǒ gěi nǐ dǎ diànhuà.','Lúc 8 giờ rưỡi, tôi gọi điện cho bạn.']
 ],[
  ['Người nói ăn sáng lúc nào?',['7 giờ sáng mai','9 giờ tối mai','8 giờ rưỡi hôm qua','7 giờ tối nay'],0,[[0]],'明天早上七点 chỉ sáng mai lúc 7 giờ. Đừng lấy giờ đi làm làm giờ ăn sáng.','syntax',['time']],
  ['Ai gọi điện cho ai?',['Người nói gọi cho người nghe','Người nghe gọi cho người nói','Cả hai gọi bác sĩ','Chưa có lời hẹn gọi điện'],0,[[2]],'我 là người gọi; 给你 cho biết người nhận.','syntax',['l13-give']],
  ['Cuộc gọi diễn ra trước giờ bắt đầu làm bao lâu?',['30 phút','90 phút','2 giờ','Không có đủ mốc để tính'],0,[[1,2]],'9:00 trừ 8:30 là 30 phút. Phải nối hai dòng, không chỉ nhận một con số.','inference',['time','evidence']]
 ],'Đổi lịch: sáng mai ăn sáng lúc 7:30, bắt đầu làm lúc 9:05; hẹn gọi cho một người bạn trước giờ đi làm. Viết 2–3 câu.','我明天早上七点半吃早饭。我上午九点零五分上班。八点半，我给你打电话。');
 make('chair','Chiếc ghế làm mốc',1,'Vị trí',['前边','椅子','上','旁边','书'],[
  ['饭店前边有一把椅子。','Fàndiàn qiánbian yǒu yì bǎ yǐzi.','Trước nhà hàng có một chiếc ghế.'],
  ['椅子上有一本书。','Yǐzi shang yǒu yì běn shū.','Trên ghế có một quyển sách.'],
  ['那只猫在椅子旁边，不在椅子上。','Nà zhī māo zài yǐzi pángbiān, bú zài yǐzi shang.','Con mèo kia ở cạnh ghế, không ở trên ghế.']
 ],[
  ['Vật nào được nói rõ là ở trên ghế?',['Một quyển sách','Con mèo','Nhà hàng','Một cốc trà'],0,[[1]],'椅子上 là trên ghế; chủ thể được giới thiệu sau 有 là 一本书.','syntax',['place']],
  ['Con mèo ở đâu so với ghế?',['Ở bên cạnh','Ở trên','Ở bên trong nhà hàng','Không có con mèo'],0,[[2]],'旁边 và 上 là hai quan hệ khác nhau. Dòng này còn phủ định rõ 不在椅子上.','syntax',['place','negative']],
  ['Câu nào về khoảng cách mèo–sách có đủ căn cứ?',['Chưa biết chính xác bao xa','Mèo đang ngồi trên sách','Mèo ở cách sách đúng một mét','Mèo ở sau nhà hàng'],0,[[1,2]],'Hai dòng cho quan hệ với ghế; chúng không cho khoảng cách đo được hay vị trí mèo trên sách.','inference',['evidence','place']]
 ],'Đổi vật và mốc: trước siêu thị có ghế; điện thoại ở trên ghế; chó ở cạnh ghế. Viết ba câu.','超市前边有一把椅子。手机在椅子上。狗在椅子旁边。');
 make('breakfast','Gọi món rồi đổi số lượng',1,'Ăn uống',['服务员','要','杯','茶','再'],[
  ['服务员，我要一杯茶和一个鸡蛋。','Fúwùyuán, wǒ yào yì bēi chá hé yí ge jīdàn.','Bạn phục vụ ơi, tôi lấy một cốc trà và một quả trứng gà.'],
  ['我朋友也想喝茶。','Wǒ péngyou yě xiǎng hē chá.','Bạn tôi cũng muốn uống trà.'],
  ['请再给我一杯茶。','Qǐng zài gěi wǒ yì bēi chá.','Xin cho tôi thêm một cốc trà.']
 ],[
  ['Lần gọi đầu có những gì?',['Một cốc trà và một quả trứng','Hai cốc trà và bánh mì','Một cái cốc rỗng','Chỉ một quả trứng'],0,[[0]],'和 nối hai món; 一杯 và 一个 dùng cho hai đối tượng khác nhau.','syntax',['l13-quantity']],
  ['再 trong câu cuối có tác dụng gì?',['Yêu cầu thêm một cốc','Nói đang ở trong cốc','Hủy cốc đã gọi','Hỏi giá cốc rỗng'],0,[[2]],'再 đứng trước 给, chỉ thêm/lặp lại yêu cầu. 在 là chữ khác cùng âm zài.','syntax',['l13-order']],
  ['Tính cả hai lượt gọi, khách đã yêu cầu mấy cốc trà?',['Hai cốc','Một cốc','Ba cốc','Không biết vì chưa uống'],0,[[0,2]],'Đang hỏi số cốc đã yêu cầu: một ban đầu cộng một thêm. Chưa cần biết đã uống bao nhiêu.','inference',['l13-order','evidence']]
 ],'Đổi đồ uống thành sữa; lần đầu gọi hai cốc, sau đó thêm một cốc cho bạn. Viết hai lời gọi món.','服务员，我要两杯牛奶。请再给我一杯牛奶。');
 make('shop','Giá theo cân, tiền đưa khác tiền hàng',1,'Mua sắm',['苹果','斤','钱','卖','买'],[
  ['这家商店卖苹果。','Zhè jiā shāngdiàn mài píngguǒ.','Cửa hàng này bán táo.'],
  ['苹果六块二一斤，我买两斤。','Píngguǒ liù kuài èr yì jīn, wǒ mǎi liǎng jīn.','Táo 6,2 tệ một cân Trung Quốc; tôi mua hai cân.'],
  ['我给售货员二十块。','Wǒ gěi shòuhuòyuán èrshí kuài.','Tôi đưa nhân viên bán hàng 20 tệ.']
 ],[
  ['Người nói là bên mua hay bên bán?',['Bên mua','Bên bán','Cả hai đều là người bán','Đoạn chỉ nói chuyện thuê nhà'],0,[[1]],'我买两斤: tôi mua hai cân. 卖 ở dòng đầu thuộc hành động của cửa hàng.','meaning',['wordbuilding']],
  ['Trong tình huống này, 六块二 là giá bao nhiêu cho mỗi 斤?',['6,20 tệ','62 tệ','6,02 tệ','0,62 tệ'],0,[[1]],'块 là đồng, số 二 ở đây chỉ hai 毛: 6 đồng 2 hào. Không đọc nó như số điện thoại.','syntax',['time','l13-quantity']],
  ['Nếu không có khoản phí khác, tiền hàng và tiền trả lại là bao nhiêu?',['12,40 tệ; trả lại 7,60 tệ','20 tệ; không trả lại','6,20 tệ; trả lại 13,80 tệ','12,40 tệ; trả lại 12,40 tệ'],0,[[1,2]],'2 × 6,20 = 12,40; 20 − 12,40 = 7,60. Điều kiện không có phí khác được nêu ngay trong câu hỏi.','inference',['evidence','l13-quantity']]
 ],'Viết lời hỏi giá táo và nói bạn muốn mua một cân. Không cần tự đặt một mức giá.','苹果多少钱一斤？我想买一斤苹果。');
 make('schedule','Hai mốc 9:05 và 14:05',2,'Thời gian',['明天','上午','下午','上班','下班'],[
  ['我明天上午九点零五分上班。','Wǒ míngtiān shàngwǔ jiǔ diǎn líng wǔ fēn shàngbān.','Sáng mai tôi bắt đầu làm lúc 9:05.'],
  ['下午两点零五分下班。','Xiàwǔ liǎng diǎn líng wǔ fēn xiàbān.','Chiều tôi tan ca lúc 14:05.'],
  ['下班后，我去超市买牛奶。','Xiàbān hòu, wǒ qù chāoshì mǎi niúnǎi.','Sau khi tan ca, tôi đi siêu thị mua sữa.']
 ],[
  ['Giờ tan ca được nêu là giờ nào?',['14:05','02:50','09:05','14:50'],0,[[1]],'下午两点 là 14 giờ; 零五分 là 05 phút, không phải 五十分 50 phút.','listening',['time']],
  ['Thứ tự công việc–mua sữa là gì?',['Tan ca rồi mới đi mua sữa','Đi mua sữa rồi mới tan ca','Mua sữa trong lúc bắt đầu làm','Chỉ nói có sữa ở nhà'],0,[[2]],'下班后 xác định mốc hoàn thành việc tan ca trước hành động đi siêu thị.','syntax',['sequence']],
  ['Từ hai mốc giờ, ta khẳng định được điều gì?',['Hai mốc cách nhau 5 giờ; chưa biết thời gian làm thực tế sau khi trừ nghỉ','Đã làm liên tục 5 giờ không nghỉ','Đã làm đúng 2 giờ','Không thể tính được khoảng cách giữa hai mốc'],0,[[0,1]],'Khoảng cách đồng hồ là 5 giờ. Đoạn không cho biết có thời gian nghỉ hay không.','inference',['time','evidence']]
 ],'Nói lịch ngày mai của bạn với giờ đi làm, tan ca và một việc làm sau ca. Dùng thời gian trước động từ.','我明天上午九点上班，下午六点下班。下班后，我回家吃晚饭。');
 make('sleep','Dự định hôm qua, tình trạng hôm nay',2,'Sinh hoạt',['昨天','说','要','还','正在'],[
  ['昨天我问弟弟：“你明天去不去超市？”','Zuótiān wǒ wèn dìdi: “Nǐ míngtiān qù bu qù chāoshì?”','Hôm qua tôi hỏi em trai: ngày mai em có đi siêu thị không?'],
  ['他说：“我想去。”','Tā shuō: “Wǒ xiǎng qù.”','Em ấy nói: em muốn đi.'],
  ['今天早上八点，他还在睡觉。','Jīntiān zǎoshang bā diǎn, tā hái zài shuìjiào.','Hôm nay lúc 8 giờ sáng, em ấy vẫn đang ngủ.']
 ],[
  ['Ở mốc 8 giờ sáng nay, em trai đang làm gì?',['Vẫn đang ngủ','Vẫn chưa từng ngủ','Đang ở siêu thị','Đã mua sữa xong'],0,[[2]],'还在睡觉 nghĩa là vẫn đang ngủ. 还没睡觉 mới là vẫn chưa ngủ.','syntax',['ongoing','negative']],
  ['明天 trong lời hỏi hôm qua chỉ ngày nào so với lời kể hôm nay?',['Hôm nay','Ngày mai kể từ hôm nay','Hôm qua','Không chỉ một ngày nào'],0,[[0,2]],'Điểm nhìn trong lời trích là hôm qua; ngày mai của hôm qua là hôm nay.','inference',['time','evidence']],
  ['Đã có đủ dữ kiện để kết luận em trai sẽ không đi siêu thị cả ngày chưa?',['Chưa; biết em còn ngủ lúc 8 giờ thôi','Có; ngủ lúc 8 giờ là không thể đi cả ngày','Có; 我想去 luôn nghĩa là từ chối','Có; câu hỏi chính phản luôn mang phủ định'],0,[[1,2]],'Dự định muốn đi và đang ngủ lúc 8 giờ có thể cùng đúng. Chưa có thông tin về cả ngày.','inference',['evidence','modals']]
 ],'Kể một dự định bạn đã nói hôm qua và việc bạn đang làm bây giờ. Không dùng trạng thái hiện tại để khẳng định cả ngày.','昨天我说今天想去超市。我现在在家里看书。');
 make('rain','Đọc chuỗi sự việc, đừng tự thêm nguyên nhân',2,'Bài 12',['下雨','觉得','有点儿','还没','看病'],[
  ['昨天下雨了，我觉得有点儿冷。','Zuótiān xià yǔ le, wǒ juéde yǒudiǎnr lěng.','Hôm qua trời mưa, tôi cảm thấy hơi lạnh.'],
  ['今天我没去公司，在家休息。','Jīntiān wǒ méi qù gōngsī, zài jiā xiūxi.','Hôm nay tôi không đi công ty, ở nhà nghỉ.'],
  ['下午我想去医院看病。','Xiàwǔ wǒ xiǎng qù yīyuàn kàn bìng.','Chiều tôi muốn đến bệnh viện khám bệnh.']
 ],[
  ['Cảm nhận ở dòng đầu là gì?',['Hơi lạnh','Uống ít nước','Rất nóng','Đã xác định một bệnh cụ thể'],0,[[0]],'有点儿冷 nêu mức cảm nhận hơi lạnh; không phải lượng nước và không nêu chẩn đoán.','meaning',['small']],
  ['Việc nào được kể là chưa/không xảy ra hôm nay?',['Đi đến công ty','Mưa hôm qua','Cảm thấy lạnh hôm qua','Ở nhà nghỉ'],0,[[1]],'没去公司 phủ định việc đi công ty; không phủ định mọi hành động trong đoạn.','syntax',['negative']],
  ['Ta biết chắc nguyên nhân người nói nghỉ và bệnh gì chưa?',['Chưa; đoạn chỉ cho chuỗi sự việc và ý định đi khám','Đã biết mưa chắc chắn gây bệnh','Đã biết bác sĩ yêu cầu nghỉ hai ngày','Đã biết bệnh nhân đã khám xong'],0,[[0,1,2]],'Liền nhau trong lời kể không tự chứng minh quan hệ nguyên nhân. 想去 cũng chưa phải 已经去.','inference',['evidence','modals']]
 ],'Viết một tin nhắn ngắn: hôm nay không đến công ty, muốn nghỉ nửa ngày và hỏi ngày mai có thể đến không.','我今天不去公司，想休息半天。我明天可以来公司吗？');
 make('movie','Lời từ chối chưa nói hết mọi thứ',2,'Quan hệ',['电影','有','事','可以','吧'],[
  ['朋友说：“下午我想去看电影，你去吗？”','Péngyou shuō: “Xiàwǔ wǒ xiǎng qù kàn diànyǐng, nǐ qù ma?”','Bạn nói: chiều tôi muốn đi xem phim, bạn có đi không?'],
  ['我说：“我下午还有事，今天不能去。”','Wǒ shuō: “Wǒ xiàwǔ hái yǒu shì, jīntiān bù néng qù.”','Tôi nói: chiều tôi còn có việc, hôm nay không thể đi.'],
  ['“我们明天去，可以吗？”','“Wǒmen míngtiān qù, kěyǐ ma?”','Ngày mai chúng ta đi, được không?']
 ],[
  ['Người nói từ chối điều gì một cách rõ ràng?',['Đi xem phim hôm nay','Mọi cuộc gặp trong tương lai','Làm bạn với người mời','Đi ra ngoài vào bất kỳ ngày nào'],0,[[1]],'Phạm vi phủ định là 今天不能去, không phải mọi ngày.','syntax',['negative']],
  ['Câu cuối thực hiện hành động giao tiếp nào?',['Đề nghị một lịch khác và hỏi ý kiến','Ra lệnh tuyệt đối','Hủy mọi lời hẹn','Khẳng định đã mua vé'],0,[[2]],'我们明天去 + 可以吗 là đề nghị và hỏi sự đồng ý; chưa phải lịch đã chốt.','register',['register','modals']],
  ['Kết luận nào thận trọng nhất về thái độ?',['Có đề xuất gặp ngày mai; chưa đủ để đoán toàn bộ tình cảm','Chắc chắn người nói ghét bạn','Chắc chắn người nói đang nói dối','Người nói đã hứa chắc chắn sẽ có vé'],0,[[1,2]],'Có thể nhận ra ý mở một phương án khác, nhưng không biến hàm ý thành kết luận chắc chắn về tính cách/tình cảm.','inference',['evidence','register']]
 ],'Từ chối lịch hôm nay vì có việc, rồi đề nghị một giờ cụ thể vào ngày mai. Viết như nhắn cho bạn.','我今天还有事，不能去。我们明天下午三点去，可以吗？');
 make('roles','Cùng 给, ba người khác vai',3,'Vai nghĩa',['给','医生','打电话','请','看病'],[
  ['早上，姐姐给医生打电话。','Zǎoshang, jiějie gěi yīshēng dǎ diànhuà.','Buổi sáng, chị gái gọi điện cho bác sĩ.'],
  ['下午，医生给弟弟看病。','Xiàwǔ, yīshēng gěi dìdi kàn bìng.','Buổi chiều, bác sĩ khám cho em trai.'],
  ['晚上，弟弟给姐姐打电话，说他在家里。','Wǎnshang, dìdi gěi jiějie dǎ diànhuà, shuō tā zài jiāli.','Buổi tối, em trai gọi cho chị, nói mình ở nhà.']
 ],[
  ['Ai là người được khám buổi chiều?',['Em trai','Chị gái','Bác sĩ','Không có ai được khám'],0,[[1]],'医生 là người khám; 给弟弟 chỉ người nhận việc khám.','syntax',['roles']],
  ['Cuộc gọi buổi tối có chiều nào?',['Em trai → chị gái','Chị gái → bác sĩ','Bác sĩ → chị gái','Chị gái → em trai'],0,[[2]],'Đừng mang cặp người ở câu đầu sang câu cuối. Chủ ngữ đã đổi thành 弟弟.','syntax',['l13-give']],
  ['Sau câu cuối, điều gì vẫn chưa được xác nhận?',['Em trai đã hoàn toàn khỏe chưa','Em trai nói mình đang ở nhà','Buổi chiều bác sĩ khám cho em','Buổi sáng chị gái có gọi bác sĩ'],0,[[1,2]],'Đi khám rồi và nói ở nhà không đủ để suy ra đã khỏi hoàn toàn; đoạn không nói kết quả sức khỏe.','inference',['evidence']]
 ],'Đổi vai trong hai câu: bạn gọi bác sĩ; bác sĩ khám cho mẹ; sau đó mẹ gọi cho bạn.','我给医生打电话。医生给妈妈看病。妈妈给我打电话。');
 make('reunion','Biết tên khác với quen người',3,'Phân biệt',['知道','认识','会','问题'],[
  ['我知道你的名字，但是我不认识你。','Wǒ zhīdào nǐ de míngzi, dànshì wǒ bù rènshi nǐ.','Tôi biết tên bạn, nhưng chưa quen bạn.'],
  ['你会说汉语，但是你不知道这个问题的答案。','Nǐ huì shuō Hànyǔ, dànshì nǐ bù zhīdào zhège wèntí de dá’àn.','Bạn biết nói tiếng Trung, nhưng không biết đáp án câu hỏi này.']
 ],[
  ['知道 trong dòng đầu nói đến loại biết nào?',['Biết một thông tin','Biết kỹ năng lái xe','Đã quen thân người ấy','Được phép ngồi'],0,[[0]],'知道 tên là biết thông tin; 认识 người là quen/nhận biết người ấy.','meaning',['modals','hanviet']],
  ['会说汉语 khẳng định điều gì?',['Một khả năng ngôn ngữ; không bảo đảm biết mọi đáp án','Được phép nói mọi điều ở mọi nơi','Đã biết tất cả thông tin','Đã quen tất cả người nói tiếng Trung'],0,[[1]],'会 + kỹ năng không đồng nghĩa toàn tri. Chọn phạm vi vừa đủ với câu.','syntax',['modals']],
  ['Hai câu cùng nhắc ta thói quen đọc nào?',['Xem đúng đối tượng của động từ biết và giới hạn thông tin','Dịch mọi chữ biết thành cùng một động từ','Coi Hán Việt là đáp án đủ cho mọi ngữ cảnh','Suy ra người ấy không biết gì'],0,[[0,1]],'Biết gì, biết ai, biết làm gì là ba câu hỏi khác nhau; vốn Hán Việt cần được đối chiếu với kết hợp từ hiện đại.','inference',['hanviet','evidence']]
 ],'Viết hai câu đúng về bạn: một điều biết thông tin, một kỹ năng biết làm. Nếu dùng từ mở rộng, ghi nghĩa ở sổ kiến thức.','我知道你的名字。我会说一点儿汉语。',[
  ['但是','dànshì','Nhưng'],['答案','dá’àn','Đáp án']
 ]);
 make('polite','Cùng cần chỗ ngồi, chọn cách mở lời',3,'Ngữ thể',['请','可以','坐','这儿','先生','女士'],[
  ['在饭店里，我问服务员：“请问，我可以坐这儿吗？”','Zài fàndiàn li, wǒ wèn fúwùyuán: “Qǐngwèn, wǒ kěyǐ zuò zhèr ma?”','Trong nhà hàng, tôi hỏi nhân viên: xin hỏi, tôi ngồi đây được không?'],
  ['朋友来了，我说：“坐这儿吧。”','Péngyou lái le, wǒ shuō: “Zuò zhèr ba.”','Bạn đến, tôi nói: ngồi đây nhé.'],
  ['两句话都说到了“坐这儿”，但是说话的人和要做的事不一样。','Liǎng jù huà dōu shuō dào le “zuò zhèr”, dànshì shuōhuà de rén hé yào zuò de shì bù yíyàng.','Hai câu đều nhắc ngồi đây, nhưng người nói và việc muốn thực hiện không giống nhau.']
 ],[
  ['Câu đầu là xin phép hay mời người kia ngồi?',['Xin phép cho chính mình ngồi','Mời nhân viên ngồi thay mình','Ra lệnh cho bạn','Chào tạm biệt'],0,[[0]],'我可以…吗？ đặt người nói làm chủ thể và hỏi sự cho phép.','register',['register','l13-request']],
  ['Câu “坐这儿吧” trong tình huống đã nêu có vai trò gì?',['Mời/gợi ý cho bạn một chỗ ngồi','Hỏi số điện thoại','Tự xin phép cho mình','Thông báo cấm ngồi'],0,[[1]],'Cùng cụm 坐这儿 nhưng đổi quan hệ và hành động lời nói. 吧 ở đây làm lời mời/gợi ý mềm hơn.','register',['register']],
  ['Có thể dùng độ dài để xếp mọi câu ngắn là bất lịch sự không?',['Không; cần xét người nói, người nghe, mục đích và ngữ cảnh','Có; câu ngắn luôn bất lịch sự','Có; có chữ 请 thì lúc nào cũng trang trọng tuyệt đối','Có; lời nói miệng luôn suồng sã'],0,[[0,1,2]],'Ngữ thể không phải bảng đổi từ máy móc hay thước đo độ dài. Một câu ngắn giữa bạn bè có thể phù hợp.','inference',['register','evidence']]
 ],'Viết hai câu: xin phép ngồi khi gặp người chưa quen; mời một người bạn ngồi. Giữ khác biệt về chủ thể và mục đích.','请问，我可以坐这儿吗？朋友，坐这儿吧。',[
  ['两句话','liǎng jù huà','Hai câu nói'],['都','dōu','Đều'],['不一样','bù yíyàng','Không giống nhau'],['但是','dànshì','Nhưng']
 ]);
 make('messages','Ba tin nhắn, một điểm chưa biết',3,'Tổng hợp',['现在','在','后','再','来','去'],[
  ['九点，小王说：“我现在在公司。”','Jiǔ diǎn, Xiǎo Wáng shuō: “Wǒ xiànzài zài gōngsī.”','Lúc 9 giờ, Tiểu Vương nói: bây giờ tôi ở công ty.'],
  ['十二点，小李说：“我在饭店等你。”','Shí’èr diǎn, Xiǎo Lǐ shuō: “Wǒ zài fàndiàn děng nǐ.”','Lúc 12 giờ, Tiểu Lý nói: tôi đang chờ bạn ở nhà hàng.'],
  ['小王说：“我还没下班。下班后再去。”','Xiǎo Wáng shuō: “Wǒ hái méi xiàbān. Xiàbān hòu zài qù.”','Tiểu Vương nói: tôi vẫn chưa tan ca. Tan ca rồi mới đi.']
 ],[
  ['Dữ kiện về vị trí Tiểu Vương trong dòng đầu gắn với mốc nào?',['9 giờ','Mọi thời điểm trong ngày','Chỉ 12 giờ','Sau khi tan ca'],0,[[0]],'现在 trong lời lúc 9 giờ có điểm nhìn tại mốc 9 giờ, không tự kéo dài mãi.','syntax',['time']],
  ['Tiểu Vương đặt điều kiện/thứ tự nào cho việc đi nhà hàng?',['Tan ca trước rồi mới đi','Đi nhà hàng trước rồi mới tan ca','Phải về nhà trước khi tan ca','Đã đến nhà hàng trước 12 giờ'],0,[[2]],'还没下班: chưa tan ca. 下班后再去: đi sau khi tan ca.','syntax',['sequence','negative']],
  ['Ta có thể chốt chính xác giờ Tiểu Vương đến nhà hàng chưa?',['Chưa; thiếu giờ tan ca và thời gian di chuyển','Có; chính xác 12 giờ','Có; chính xác 9 giờ','Có; chính xác 6 giờ rưỡi tối'],0,[[1,2]],'Người chờ nói lúc 12 giờ, nhưng chưa có giờ tan ca/độ dài hành trình của người sẽ đến.','inference',['evidence','time']]
 ],'Viết một tin nhắn cho người đang chờ: bạn chưa tan ca; sẽ đi sau ca; hỏi người ấy đang ở đâu.','我还没下班，下班后再去。你现在在哪儿？',[
  ['等','děng','Chờ, đợi; thuộc nhánh từ mở rộng'],['小王 / 小李','Xiǎo Wáng / Xiǎo Lǐ','Tên gọi nhân vật hư cấu']
 ]);
 make('bridge-needs','Đề nghị, chờ và câu trả lời',2,'Mở rộng · Nhu cầu',['等','都','答案','需要','应该'],[
  ['我在饭店等你，我们都还没吃早饭。','Wǒ zài fàndiàn děng nǐ, wǒmen dōu hái méi chī zǎofàn.','Tôi chờ bạn ở nhà hàng; chúng ta đều chưa ăn sáng.'],
  ['你说：“我需要先给医生打电话。”','Nǐ shuō: “Wǒ xūyào xiān gěi yīshēng dǎ diànhuà.”','Bạn nói: tôi cần gọi cho bác sĩ trước.'],
  ['我说：“好，你应该先打电话。这个问题，我也不知道答案。”','Wǒ shuō: “Hǎo, nǐ yīnggāi xiān dǎ diànhuà. Zhège wèntí, wǒ yě bù zhīdào dá’àn.”','Tôi nói: được, bạn nên gọi trước. Về câu hỏi này, tôi cũng không biết đáp án.']
 ],[
  ['都还没吃早饭 cho biết điều gì?',['Cả người nói và người nghe đều chưa ăn sáng','Chỉ người nói đã ăn sáng','Bác sĩ đã ăn sáng','Chắc chắn mọi người trong nhà hàng chưa ăn'],0,[[0]],'都 có phạm vi 我们 trong lời này; không kéo thành tất cả mọi người ở nhà hàng.','syntax',['scope','negative']],
  ['Người nghe nêu việc gì là cần làm trước?',['Gọi bác sĩ','Đợi bác sĩ ở nhà hàng','Tự đưa ra đáp án y khoa','Ăn xong rồi mới được gọi'],0,[[1]],'需要先给医生打电话 nêu nhu cầu và thứ tự, không nói bác sĩ đang ở đâu.','syntax',['sequence','l13-give']],
  ['Có thể kết luận người nói đã biết cách giải quyết vấn đề chưa?',['Chưa; người ấy nói không biết đáp án và khuyên gọi trước','Có; 应该 có nghĩa đã biết mọi đáp án','Có; chờ ở nhà hàng là đủ chứng minh','Có; 都 nói rằng hai người cùng là bác sĩ'],0,[[2]],'Lời khuyên 应该 không đồng nghĩa nắm được đáp án. Cần tách lời khuyên với tri thức đã xác nhận.','inference',['evidence','modals']]
 ],'Nhắn một người bạn: bạn đang chờ ở nhà hàng; bạn cần gọi điện trước; bạn chưa biết đáp án. Viết 2–3 câu.','我在饭店等你。我需要先打电话。我还不知道答案。');
 make('bridge-order','Một địa điểm, hai thời đoạn',2,'Mở rộng · Thời gian',['先','然后','以前','以后','一起'],[
  ['我以前在这里工作，现在不在这里工作了。','Wǒ yǐqián zài zhèlǐ gōngzuò, xiànzài bú zài zhèlǐ gōngzuò le.','Trước đây tôi làm ở đây; bây giờ không còn làm ở đây nữa.'],
  ['明天下班以后，我先去超市，然后去饭店。','Míngtiān xiàbān yǐhòu, wǒ xiān qù chāoshì, ránhòu qù fàndiàn.','Ngày mai sau khi tan ca, tôi đi siêu thị trước, rồi đến nhà hàng.'],
  ['你和我一起去饭店吧。','Nǐ hé wǒ yìqǐ qù fàndiàn ba.','Bạn cùng tôi đến nhà hàng nhé.']
 ],[
  ['Hiện nay người nói có còn làm ở địa điểm trong dòng đầu không?',['Không còn làm ở đó','Chắc chắn vẫn làm ở đó','Đã nói sẽ làm ở đó ngày mai','Đang làm bác sĩ ở đó'],0,[[0]],'以前 và 现在 đối chiếu hai thời đoạn; 不…了 ở đây báo sự thay đổi.','syntax',['time','negative']],
  ['Thứ tự được nêu cho ngày mai là gì?',['Tan ca → siêu thị → nhà hàng','Nhà hàng → siêu thị → tan ca','Siêu thị → đi làm → nhà hàng','Tan ca → nhà hàng → siêu thị'],0,[[1]],'以后 tạo mốc sau tan ca; 先…然后… sắp hai bước.','syntax',['sequence','time']],
  ['Lời mời nói rõ cùng đi đoạn nào?',['Đến nhà hàng; chưa nói rõ có cùng đi siêu thị không','Chắc chắn mọi nơi trong ngày','Chỉ cùng đi làm','Chỉ cùng quay về chỗ làm cũ'],0,[[1,2]],'一起去饭店 chỉ hành động được mời cùng làm. Không kéo phạm vi sang mọi bước ở câu trước.','inference',['evidence','scope']]
 ],'Viết lịch sau ca của bạn với 以后、先、然后. Thêm một lời mời bạn cùng tham gia một việc.','下班以后，我先回家，然后去饭店。你和我一起去饭店吧。');
 make('bridge-logic','Có lý do chưa có nghĩa là chắc chắn',3,'Mở rộng · Lập luận',['因为','所以','如果','可能','其实'],[
  ['昨天因为下雨，所以我没去超市。','Zuótiān yīnwèi xià yǔ, suǒyǐ wǒ méi qù chāoshì.','Hôm qua vì mưa nên tôi không đi siêu thị.'],
  ['如果明天下雨，我可能不去。','Rúguǒ míngtiān xià yǔ, wǒ kěnéng bú qù.','Nếu ngày mai mưa, có thể tôi không đi.'],
  ['其实，我还不知道明天会不会下雨。','Qíshí, wǒ hái bù zhīdào míngtiān huì bu huì xià yǔ.','Thật ra tôi vẫn chưa biết ngày mai có mưa hay không.']
 ],[
  ['Quan hệ nguyên nhân nào được người nói nêu rõ?',['Mưa hôm qua → không đi siêu thị hôm qua','Mưa ngày mai → đã không đi hôm qua','Không đi siêu thị → gây mưa','Đợi ở nhà hàng → chắc chắn trời mưa'],0,[[0]],'因为…所以… thể hiện lý do do người nói nêu; mốc ở cả hai việc là 昨天.','syntax',['cause','time']],
  ['Lời về ngày mai có mức chắc chắn nào?',['Một điều kiện kèm khả năng, chưa phải quyết định chắc chắn','Khẳng định chắc chắn không mưa','Khẳng định chắc chắn sẽ đi','Thông báo đã không đi'],0,[[1]],'如果 tạo điều kiện; 可能 giữ mức có thể. Không xoá hai lớp này khi dịch.','inference',['cause','evidence']],
  ['Từ cả đoạn, kết luận nào giữ đúng giới hạn?',['Biết lời giải thích cho hôm qua; chưa chốt thời tiết hay việc đi ngày mai','Đã biết mọi ngày mưa đều không đi','Ngày mai chắc chắn mưa','Người nói chắc chắn đã mua đồ cho ngày mai'],0,[[0,1,2]],'Ba dòng tách sự việc quá khứ, giả định tương lai và điều người nói chưa biết. Câu cuối ngăn ta coi giả định là dữ kiện.','inference',['cause','evidence']]
 ],'Viết ba câu: một lý do cho việc hôm qua; một điều kiện cho ngày mai; một điều bạn chưa biết. Dùng 因为/所以、如果、可能 khi phù hợp.','昨天因为下雨，所以我没去超市。如果明天下雨，我可能不去。其实，我还不知道。');
 make('shuowen-bell','Chiếc chuông · Ai nghe thấy?',2,'Điển tích · Đọc bằng chứng',['想','大','听见','了','他'],[
  ['有人想把一口大钟带走。','Yǒu rén xiǎng bǎ yì kǒu dà zhōng dàizǒu.','Có người muốn mang một chiếc chuông lớn đi.'],
  ['钟太大，他就用锤子敲钟。','Zhōng tài dà, tā jiù yòng chuízi qiāo zhōng.','Chuông quá lớn, nên anh ta dùng búa đập chuông.'],
  ['钟响了，他怕别人听见。','Zhōng xiǎng le, tā pà biérén tīngjiàn.','Chuông vang lên, anh ta sợ người khác nghe thấy.'],
  ['他马上捂住了自己的耳朵。','Tā mǎshàng wǔzhù le zìjǐ de ěrduo.','Anh ta lập tức bịt tai mình.']
 ],[
  ['Vì sao nhân vật dùng búa?',['Chuông quá lớn để mang đi','Người khác đã nghe thấy','Anh muốn báo giờ','Búa làm chuông nhẹ ngay'],0,[[0,1]],'Dòng 1 nêu mục đích mang chuông đi. Dòng 2 cho biết chuông quá lớn và anh dùng búa.','inference',['cause','evidence']],
  ['Ai bịt tai? Anh ấy sợ ai nghe thấy?',['Anh ấy bịt tai mình và sợ người khác nghe thấy','Người khác bịt tai và sợ anh ấy nghe thấy','Anh ấy bịt tai người khác và sợ mình nghe thấy','Cả hai cùng bịt tai'],0,[[2,3]],'怕 là sợ, 别人 là chủ thể của 听见 trong điều anh ta sợ. 自己的耳朵 là tai của chính anh ta.','syntax',['scope','evidence']],
  ['Chi tiết nào là sự việc được xác nhận ở dòng chuông vang?',['Chuông đã vang. Người khác có nghe thấy hay không vẫn chưa rõ','Người khác đã nghe thấy','Không một ai nghe thấy','Người khác đã lấy mất chuông'],0,[[2]],'钟响了 báo chuông đã vang. 怕 đưa phần còn lại vào phạm vi nỗi sợ.','inference',['le','evidence']]
 ],'Viết hai vế về chiếc chuông. Vế đầu nói việc anh ta làm. Vế sau dùng 可能 để nói khả năng người khác nghe thấy.', '他捂住了耳朵，可是别人还是可能听见。',[
  ['一口大钟','yì kǒu dà zhōng','một chiếc chuông lớn'],
  ['带走','dàizǒu','mang đi'],
  ['用锤子敲钟','yòng chuízi qiāo zhōng','dùng búa đập chuông'],
  ['捂住耳朵','wǔzhù ěrduo','bịt tai']
 ]);
 make('viet-couplets','Xin hai chữ bình an',2,'Đời sống Việt · Lời nhờ viết chữ',['请','写','字','给','明天'],[
  ['我想请您写两个字：“平安”。','Wǒ xiǎng qǐng nín xiě liǎng ge zì: “píng’ān”.','Tôi muốn nhờ bác viết hai chữ “bình an”.'],
  ['这两个字是给我爸爸的。','Zhè liǎng ge zì shì gěi wǒ bàba de.','Hai chữ này dành cho bố tôi.'],
  ['他今年六十岁，明天是他的生日。','Tā jīnnián liùshí suì, míngtiān shì tā de shēngrì.','Năm nay bố tôi 60 tuổi, ngày mai là sinh nhật bố.'],
  ['请写大一点儿，他的眼睛不太好。','Qǐng xiě dà yìdiǎnr, tā de yǎnjing bú tài hǎo.','Xin viết to hơn một chút, mắt bố tôi không được tốt lắm.']
 ],[
  ['Ai được nhờ viết? Ai nhận hai chữ?',['Người được xưng 您 viết, bố của người nói nhận','Bố của người nói viết, người được xưng 您 nhận','Người nói viết, bố người nghe nhận','Chưa nêu người nhận'],0,[[0,1]],'请您写 xác định người được nhờ viết. 给我爸爸 xác định người nhận. Hai vai không trùng nhau.','syntax',['l13-request','l13-give']],
  ['Đọc hai dòng cuối, vì sao người nói xin viết to?',['Mắt bố không được tốt lắm','Vì chỉ muốn mua một cái cốc','Vì người viết chưa biết chữ','Vì ngày mai là năm mới'],0,[[3]],'Dòng 4 nêu mắt không tốt ngay sau lời nhờ viết to. Sinh nhật là dịp tặng, chưa phải lý do chọn cỡ chữ.','inference',['evidence']],
  ['Có thể khẳng định bố đã nhận chữ chưa?',['Chưa. Đoạn nêu lời nhờ và mục đích tặng','Rồi. Vì có 给 trong câu','Rồi. Vì bố năm nay 60 tuổi','Rồi. Vì chữ 平安 đã được nói'],0,[[0,1]],'想请 đang nêu mong muốn nhờ viết. 是给…的 nêu người dự định nhận. Cả hai câu chưa xác nhận đã trao.','inference',['evidence','l13-give']]
 ],'Nhờ người khác viết một chữ hoặc hai chữ để tặng một người thân. Nói rõ người nhận và một yêu cầu về cách viết. Dùng 请、给、写 và 一点儿.', '请您写一个“福”字，是给我妈妈的。请写大一点儿。',[
  ['平安','píng’ān','bình an'],['您','nín','ông, bà, bác… trong xưng hô kính trọng'],['眼睛','yǎnjing','mắt'],['大一点儿','dà yìdiǎnr','to hơn một chút']
 ]);
 const concepts=[...window.HAN_GRAMMAR.cards.map(c=>({id:c.id,title:c.title,type:'grammar',text:c.explain,example:c.examples[0],source:[]})),
  {id:'scope',title:'Phạm vi của 都, 一起 và phủ định',type:'grammar',text:'Xác định chủ thể và cụm hành động mà từ đang tác động. 我们都去 nói chúng tôi đều đi, không nói mọi người trên đời đều đi. 一起去饭店 nói cùng đi nhà hàng, chưa xác nhận cùng làm mọi việc trước đó.',example:['我们都还没吃早饭。','Wǒmen dōu hái méi chī zǎofàn.','Chúng tôi đều chưa ăn sáng.'],source:[]},
  {id:'cause',title:'Lý do, điều kiện và mức chắc chắn',type:'grammar',text:'因为…所以… nêu lý do–kết quả; 如果 tạo điều kiện; 可能 đánh dấu khả năng. Đọc rõ mốc thời gian, ai đang khẳng định và phạm vi thông tin. Trình tự hai việc tự nó chưa đủ xác lập nhân quả.',example:['如果明天下雨，我可能不去。','Rúguǒ míngtiān xià yǔ, wǒ kěnéng bú qù.','Nếu ngày mai mưa thì có thể tôi không đi.'],source:[]},
  {id:'evidence',title:'Căn cứ, suy luận và điều chưa biết',type:'culture',text:'Đọc đúng câu rồi nối các dữ kiện. Một ảnh cũ hay một lời hẹn không chứng minh vị trí hiện tại; sự việc đi liền nhau không tự tạo quan hệ nhân quả.',example:['他还在睡觉。','Tā hái zài shuìjiào.','Anh ấy vẫn đang ngủ; chưa đủ để kết luận anh ấy không đi đâu cả ngày.'],source:['https://www.nationalacademies.org/read/24783/chapter/7']},
  {id:'register',title:'语体 · Ngữ thể theo quan hệ và mục đích',type:'register',text:'Cùng ý định có nhiều cách nói, nhưng không phải mọi cách nói gần nghĩa đều thay cho nhau. Xét ai nói với ai, làm việc gì, ở đâu và trong thể loại nào. Văn viết có ảnh hưởng, song không phải quy luật “viết = trang trọng, nói = suồng sã”.',example:['请问，我可以坐这儿吗？','Qǐngwèn, wǒ kěyǐ zuò zhèr ma?','Xin hỏi, tôi ngồi đây được không?'],source:[]},
  {id:'hanviet',title:'Cầu Hán Việt có giới hạn',type:'sound',text:'Hán Việt giúp nối nghĩa và gợi một họ âm; cần tra đúng chữ, thanh, từ và cách dùng. Không có sáu phép thay chữ cái cho phép suy pinyin chắc chắn. 学习 → học tập là cầu nối tốt; ngữ cảnh vẫn quyết định dùng.',example:['学习','xuéxí','Học tập'],source:[]},
  {id:'neutral',title:'Khinh thanh: học theo từ và cấu trúc',type:'sound',text:'朋友 péngyou, 杯子 bēizi thường có âm đọc nhẹ. Khinh thanh chịu quy ước từ vựng, cấu trúc, giọng/vùng và ngữ điệu; không suy chỉ từ việc “rỗng nghĩa”. Học nhịp theo cụm ý, không ép mọi câu vào 2+2.',example:['我的朋友','Wǒ de péngyou.','Bạn của tôi'],source:['https://web.mit.edu/jinzhang/www/pinyin/tones/']},
  {id:'etymology',title:'Nguồn gốc chữ khác với mẹo nhớ',type:'family',text:'Tách ghép TỪ, thành phần bên trong CHỮ và âm Hán Việt. Một hình bàng gợi nghĩa, một thanh bàng gợi âm có thể đã đổi âm qua thời gian. Mẹo hay vẫn cần nhãn mẹo; muốn nói lịch sử cần dẫn tài liệu.',example:['手机 / 抱','shǒujī / bào','手机 ghép hai chữ thành từ. 抱 là một chữ có 扌 và 包.'],source:['https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=愛']},
  {id:'wordbuilding',title:'Học họ từ và từ kết hợp',type:'family',text:'Theo thành phần có ích: 早饭 / 晚饭; 服务员 / 售货员; 买 / 卖; 给我 / 给你. Học một nhánh rồi đổi bối cảnh, giữ vai và lượng từ. Mở thêm một từ không tự là đã thuộc từ ấy.',example:['早饭 / 晚饭','zǎofàn / wǎnfàn','Bữa sáng / bữa tối'],source:[]},
  {id:'source',title:'Kiểm chứng câu chuyện nghe hợp lý',type:'culture',text:'Kiểm tra chữ, văn bản gốc, niên đại và mức chắc chắn. 百年偕老 dùng 偕, không phải 佳. CUHK phân tích 愛 có phần ghi âm; câu chuyện “ngoái đầu vì yêu” không được nâng thành nguồn gốc chắc chắn.',example:['百年偕老','Bǎinián xiélǎo.','Lời chúc vợ chồng cùng sống đến già'],source:['https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=27313&la=0&webMd=1','https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=愛']},
  {id:'borrowing',title:'Giao lưu ngôn ngữ không chỉ đi một chiều',type:'culture',text:'Tiếng Trung có di sản văn ngôn và cũng vay/tiếp nhận qua tiếp xúc ngoại ngữ, trong đó có truyền dịch Phật giáo và từ ngữ hiện đại qua Nhật. Không nói Trung Quốc “không có chỗ để mượn”. Mỗi trường hợp cần nguồn riêng.',example:null,source:['https://doi.org/10.1093/oxfordhb/9780199856336.013.0069','https://link.springer.com/article/10.1186/s40655-018-0038-7']}
 ];
 const sourceQuiz=[
  {id:'source-fake',prompt:'Một bài kể 愛 là người đi mà ngoái đầu vì yêu. Với nguồn CUHK đã dẫn, nên ghi nhớ thế nào?',options:['Có thể là hình ảnh gợi nhớ; không coi đó là từ nguyên đã được xác nhận','Là sự thật đã được mọi học giả đồng ý','Chữ giản thể chứng minh người hiện đại yêu kém hơn','Không cần xem thanh bàng vì câu chuyện hay'],answer:'Có thể là hình ảnh gợi nhớ; không coi đó là từ nguyên đã được xác nhận',why:'CUHK nêu dạng 㤅 có 心 và thành phần ghi âm, và phân biệt cách giải của 說文. Hình ảnh văn chương cần nhãn riêng.',facet:'source',concepts:['source','etymology']},
  {id:'source-xie',prompt:'Cách viết chuẩn của lời chúc “bách niên giai lão” trong nguồn được dẫn là gì?',options:['百年偕老','百年佳老','百年家老','百年加老'],answer:'百年偕老',why:'Từ điển thành ngữ Bộ Giáo dục Đài Loan ghi 百年偕老. Cùng âm Hán Việt giai không có nghĩa là cùng một chữ.',facet:'source',concepts:['source','hanviet']},
  {id:'neutral-limit',prompt:'Chọn cách học khinh thanh đáng tin nhất.',options:['Tra và nghe theo từ/cấu trúc, rồi xem biến thể ngữ cảnh','Thấy chữ thứ hai là bỏ thanh','Hễ nghĩa nhẹ là tự động bỏ thanh','Cứ chia mọi câu thành nhịp 2+2'],answer:'Tra và nghe theo từ/cấu trúc, rồi xem biến thể ngữ cảnh',why:'Khinh thanh không do duy nhất một thang rỗng nghĩa quyết định. Chẳng hạn 朋友 vẫn có nghĩa rõ nhưng you thường nhẹ.',facet:'sound',concepts:['neutral']},
  {id:'register-limit',prompt:'Điều gì cần xét khi chọn cách nói với bạn và với người chưa quen?',options:['Quan hệ, mục đích, bối cảnh và cách dùng đã xác nhận','Chỉ cần mọi câu viết đều thật dài','Từ cổ luôn đúng hơn từ đời thường','当然 và 必须的 thay tự do trong mọi câu'],answer:'Quan hệ, mục đích, bối cảnh và cách dùng đã xác nhận',why:'Ngữ thể gắn với tình huống xã hội và thể loại. Cách diễn đạt có nghĩa/chức năng khác nhau thì không thể thay chỉ vì cùng một mức lịch sự.',facet:'register',concepts:['register']}
 ];
 const standards=[
  ['Bắt đầu từ một điểm đã biết','Một từ mới phải nối được với từ, câu hoặc tình huống bạn đã gặp. Mở một nhánh hữu ích rồi quay lại dùng, không rải mười điều rời nhau.'],
  ['Bóc đúng ba lớp','Ghép từ ≠ cấu tạo một chữ ≠ đối chiếu Hán Việt. Ghi rõ hình bàng, thanh bàng và mẹo nhớ khi có căn cứ.'],
  ['Kể chuyện có nhãn và nguồn','Phân biệt văn bản cổ ghi gì, nghiên cứu phân tích gì và người dạy đang suy luận gì. Câu chuyện đẹp không thay bằng chứng.'],
  ['Từ nghĩa đến quan hệ','Học kết hợp từ, vai nghĩa, phủ định và ngữ thể. Hỏi người nào đang làm gì cho ai, ở mốc thời gian nào.'],
  ['Đọc rồi tự làm','Thử lấy thông tin, nối hai dòng, nói điều chưa biết; sau đó đổi mốc/người/đồ vật và tự viết một câu.'],
  ['Đo đúng phần đã kiểm tra','Đã xem, trả lời có gợi ý, đúng một lần và nhớ qua ngày là các mức khác nhau. Tự viết chưa chấm giữ ở hồ sơ, chưa tự cộng thành thành thạo.']
 ];
 const references=[
  {title:'Roediger & Karpicke (2006) · Truy xuất và giữ nhớ',url:'https://pubmed.ncbi.nlm.nih.gov/16507066/',note:'Thử tự nhớ có ích cho kết quả kiểm tra trễ; không suy rằng một lần chọn đúng là đã thuộc.'},
  {title:'Ishii & Schmitt (2009) · Độ rộng và độ sâu từ vựng',url:'https://doi.org/10.1177/0033688208101452',note:'Số lượng từ và mức biết về từ là hai khía cạnh cần phân biệt; các điểm trong app không phải thang đo nghiên cứu đã chuẩn hóa.'},
  {title:'National Academies (2018) · Kiến thức và suy luận',url:'https://www.nationalacademies.org/read/24783/chapter/7',note:'Nối kiến thức mới với cấu trúc đã có và luyện suy luận; không chỉ tích lũy các mẩu thông tin.'},
  {title:'MIT · Thanh điệu Quan thoại',url:'https://web.mit.edu/jinzhang/www/pinyin/tones/',note:'Đối chiếu khinh thanh và biến điệu với ví dụ. Cách ghi pinyin và âm hiện thực có thể khác theo quy tắc.'},
  {title:'CUHK · 愛 trong 漢語多功能字庫',url:'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=愛',note:'Có dạng chữ cổ, phân tích và dẫn 說文; cần giữ quy thuộc cho từng cách giải.'},
  {title:'Bộ Giáo dục Đài Loan · 百年偕老',url:'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=27313&la=0&webMd=1',note:'Đối chiếu chữ đúng của lời chúc, không ghép lại từ âm Hán Việt.'},
  {title:'Shi (2015) · Ảnh hưởng Phạn ngữ Phật giáo',url:'https://doi.org/10.1093/oxfordhb/9780199856336.013.0069',note:'Tóm tắt công khai ghi nhận tiếp xúc, vay từ và ảnh hưởng dịch thuật; không tuyên bố đã đọc toàn văn.'}
 ];
 const byHan=new Map(window.HAN_DATA.words.map(w=>[w.han,w])),seen=new Set(),sentences=[];
 // Includes every catalogue word for which an existing, reviewed example exists.
 for(const w of window.HAN_DATA.words.filter(w=>!w.extra)){
  const ex=window.HAN_CURRICULUM.exampleFor(w);if(!ex||seen.has(window.HAN_ENGINE.hanKey(ex[0])))continue;seen.add(window.HAN_ENGINE.hanKey(ex[0]));sentences.push({id:'s-'+w.id,target:w.id,han:ex[0],py:ex[1],vn:ex[2],level:w.lesson13||w.extension?2:1});
 }
 for(const [i,q] of window.HAN_LESSONS.sentences.entries()){
  const han=q[2].replace(/ /g,'')+'。',key=window.HAN_ENGINE.hanKey(han);if(seen.has(key))continue;seen.add(key);sentences.push({id:'s-template-'+i,target:null,han,py:q[3],vn:q[1],level:q[0],variants:(q[5]||[]).map(x=>x.replace(/ /g,''))});
 }
 window.HAN_PRACTICE={passages,concepts,sourceQuiz,standards,references,sentences,byHan};
})();
