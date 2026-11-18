// Optional bridge words authorized by the learner. No old word or exercise ID changes.
(() => {
 'use strict';
 const d=window.HAN_DATA,lookup=new Map(d.words.map(w=>[w.han,w]));
 const rows=[
  ['都','dōu','đô','Đều; tất cả trong phạm vi đang nói','Đặt trước phần vị ngữ: 我们都去 = chúng tôi đều đi. 都 không thay 和; 和 nối hai thành phần, 都 nói phạm vi cùng có tính chất/hành động.','我们都喜欢喝茶。','Wǒmen dōu xǐhuan hē chá.','Chúng tôi đều thích uống trà.'],
  ['等','děng','đẳng','Chờ, đợi','等你: chờ bạn; 等一下: đợi một chút. Đẳng trong bình đẳng là cùng chữ nhưng khác nghĩa/cách kết hợp; đừng lấy nghĩa Hán Việt ấy thay cho động từ chờ.','我在饭店等你。','Wǒ zài fàndiàn děng nǐ.','Tôi đang chờ bạn ở nhà hàng.'],
  ['答案','dá’àn','đáp án','Đáp án, câu trả lời cho một câu hỏi','问题 là câu hỏi/vấn đề; 答案 là lời giải/đáp án. 答 là đáp, 案 là án; đây là từ ghép và liên hệ Hán Việt, chưa phải phân tích nguồn gốc từng chữ.','我不知道这个问题的答案。','Wǒ bù zhīdào zhège wèntí de dá’àn.','Tôi không biết đáp án của câu hỏi này.'],
  ['需要','xūyào','nhu yếu','Cần, có nhu cầu','需要 giúp nói rõ nhu cầu; 想 thiên về mong muốn. Nối 需 với nhu trong nhu cầu, 要 với yếu trong trọng yếu; không suy nghĩa từng chữ là đủ dùng cả từ.','我需要休息一下。','Wǒ xūyào xiūxi yíxià.','Tôi cần nghỉ một chút.'],
  ['应该','yīnggāi','ứng cai','Nên; lẽ ra/phải theo kỳ vọng, tuỳ câu','Học nghĩa nên trước: 应该 nghỉ ngơi là lời khuyên. Không đồng nhất với 可以 được phép hay 必须 bắt buộc.','你应该休息一下。','Nǐ yīnggāi xiūxi yíxià.','Bạn nên nghỉ một chút.'],
  ['先','xiān','tiên','Trước; làm việc gì trước','先 đứng trước hành động; 前边 nói phía trước theo không gian. Tiên trong ưu tiên gợi thứ tự, nhưng cần đúng câu.','我先吃早饭。','Wǒ xiān chī zǎofàn.','Tôi ăn sáng trước.'],
  ['然后','ránhòu','nhiên hậu','Sau đó, rồi','Nối bước tiếp theo. 然后 không tự khẳng định quan hệ nguyên nhân–kết quả; 后 trong 下班后 tạo mốc sau khi tan ca, không thay máy móc bằng 然后.','我先吃饭，然后去上班。','Wǒ xiān chī fàn, ránhòu qù shàngbān.','Tôi ăn cơm trước, sau đó đi làm.'],
  ['以前','yǐqián','dĩ tiền','Trước đây; trước một mốc','以前 chỉ phía trước theo thời gian. Đối chiếu với 前边 chỉ vị trí. Có thể đứng sau mốc: 九点以前 trước 9 giờ.','我以前在这里工作。','Wǒ yǐqián zài zhèlǐ gōngzuò.','Trước đây tôi làm việc ở đây.'],
  ['以后','yǐhòu','dĩ hậu','Sau này; sau một mốc','Giữ cặp 以前 / 以后 để định hướng thời gian. 下班以后 = sau khi tan ca, không phải một địa điểm phía sau công ty.','下班以后，我去超市。','Xiàbān yǐhòu, wǒ qù chāoshì.','Sau khi tan ca, tôi đi siêu thị.'],
  ['一起','yìqǐ','nhất khởi','Cùng nhau','和朋友一起 + hành động: cùng làm với bạn. 和 chỉ quan hệ/nối thành phần; 一起 làm rõ cùng tham gia. 一 trong từ này thường đọc yì trước thanh 3 của 起.','我想和朋友一起去。','Wǒ xiǎng hé péngyou yìqǐ qù.','Tôi muốn đi cùng bạn.'],
  ['因为','yīnwèi','nhân vi','Vì, bởi vì','Đưa ra lý do; 因 nối với nhân trong nguyên nhân. Ở từ 因为, 为 đọc wèi. Không dùng thứ tự hai sự việc để tự suy ra lý do.','因为下雨，我不去。','Yīnwèi xià yǔ, wǒ bú qù.','Vì trời mưa nên tôi không đi.'],
  ['所以','suǒyǐ','sở dĩ','Cho nên, vì thế','Tiếng Trung hiện đại thường 因为 + lý do，(所以) + kết quả. Sở dĩ trong tiếng Việt lại thường mở phần cần giải thích; hai cách dùng không trùng hoàn toàn.','今天下雨，所以我不去。','Jīntiān xià yǔ, suǒyǐ wǒ bú qù.','Hôm nay mưa nên tôi không đi.'],
  ['如果','rúguǒ','như quả','Nếu','Đặt một điều kiện giả định; chưa nói điều ấy đã xảy ra. 如果明天下雨 = nếu ngày mai mưa.','如果明天下雨，我不去。','Rúguǒ míngtiān xià yǔ, wǒ bú qù.','Nếu ngày mai mưa thì tôi không đi.'],
  ['可能','kěnéng','khả năng','Có thể, có khả năng xảy ra','可能去 là có lẽ sẽ đi; 可以去 thường nói được phép/có thể làm trong điều kiện. Không lấy khả năng suy đoán thay cho lời cho phép.','他可能在家。','Tā kěnéng zài jiā.','Có lẽ anh ấy ở nhà.'],
  ['其实','qíshí','kỳ thực','Thực ra, thật ra','Có cầu nối kỳ thực trong tiếng Việt. Thường đưa thông tin điều chỉnh điều người nghe nghĩ; khác 真 dùng nhấn tính chất như 真好.','其实，我还不知道。','Qíshí, wǒ hái bù zhīdào.','Thật ra tôi vẫn chưa biết.']
 ];
 const examples={},ids=[];
 for(const [i,[han,py,hv,gloss,note,zh,ep,vi]] of rows.entries()){
  let w=lookup.get(han);if(!w){w={id:'EX-'+String(i+1).padStart(2,'0'),han,py,hv,gloss,meaning:gloss+'.',note,category:'Mở rộng · Nối câu & lập luận',extra:false,lesson11:false,extension:true};d.words.push(w);lookup.set(han,w);}ids.push(w.id);examples[han]=[zh,ep,vi];
 }
 d.meta={...d.meta,total:d.words.length,bridgeWords:ids.length};
 window.HAN_EXTENSION={ids,examples,groups:[
  {title:'Làm rõ người và nhu cầu',hans:rows.slice(0,5).map(r=>r[0]),reason:'Nối 问题 → 答案; hỏi nhu cầu, chờ người và đưa lời khuyên.'},
  {title:'Xếp lịch và làm cùng nhau',hans:rows.slice(5,10).map(r=>r[0]),reason:'Từ 明天, 下班, 前边 mở sang trước/sau theo thời gian và thứ tự hành động.'},
  {title:'Nói có lý do, có điều kiện',hans:rows.slice(10).map(r=>r[0]),reason:'Phân biệt lý do đã nêu, điều kiện giả định và mức chắc chắn; tránh suy luận quá câu.'}
 ]};
})();
