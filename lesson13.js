// The learner's 20-item lesson 13 list; 女士 was explicitly confirmed.
// Examples and exercises are authored practice, not a textbook transcription.
(() => {
 'use strict';
 const d=window.HAN_DATA, byHan=new Map(d.words.map(w=>[w.han,w]));
 const rows=[
  ['可以','kěyǐ','khả dĩ','Có thể; được phép','可以 + hành động: được/có thể làm. 我可以坐这儿吗？: tôi ngồi đây được không? 会 thường nói kỹ năng đã học; 可以 thường hỏi sự cho phép hoặc điều kiện phù hợp. Viết kěyǐ; khi nói liền, thanh 3 đầu thường chuyển thành thanh 2: kéyǐ.'],
  ['再','zài','tái','Lại, thêm; rồi (chỉ trình tự)','再给我一杯茶: cho tôi thêm một cốc trà. 回家后再喝茶: về nhà rồi hãy uống trà. 在 và 再 cùng đọc zài: 在 là ở/đang, 再 là lại/thêm/rồi. Giữ cả ví dụ trình tự ở bài 12.'],
  ['问题','wèntí','vấn đề','Câu hỏi; vấn đề','我有一个问题: tôi có một câu hỏi/vấn đề. 问 = hỏi, liên hệ vấn trong vấn đáp; 题 = đề, như đề mục. 问题 là một từ ghép; không phải mọi 问题 đều là sự cố. Trong chữ 问 hiện đại, nhận diện 门 ở ngoài và 口 ở trong; đây là cách nhận mặt chữ, không phải một câu chuyện nguồn gốc.'],
  ['卖','mài','mại','Bán','买 mǎi = mua; 卖 mài = bán. Liên hệ thương mại để nhớ 卖. 这家商店卖面包: cửa hàng này bán bánh mì. So hình hiện đại: 卖 có phần 十 ở trên; đây là dấu hiệu phân biệt mặt chữ, không phải giải thích lịch sử tạo chữ.'],
  ['打电话','dǎ diànhuà','đả điện thoại','Gọi điện thoại','给 + người + 打电话: gọi điện cho ai. 我给你打电话: tôi gọi điện cho bạn. 打电话 là cách kết hợp cố định; không dịch riêng 打 thành đánh trong câu này. 电话 = điện thoại.'],
  ['一下','yíxià','nhất hạ','Một lát; làm một chút, thử làm','Động từ + 一下: 问一下 hỏi một chút, 看一下 xem một chút. Có thể làm lời đề nghị nhẹ hơn, tùy ngữ cảnh. Đây không phải lượng đồ vật: uống một chút nước là 喝一点儿水. 一 đọc yí trước thanh 4 của 下.'],
  ['服务员','fúwùyuán','phục vụ viên','Nhân viên phục vụ','服务 = phục vụ, 员 = viên (người làm một công việc). 服务员 chỉ nhân viên phục vụ trong ngữ cảnh dịch vụ; 售货员 nhấn công việc bán hàng. Liên hệ cùng thành phần 员 trong 售货员, không coi mọi chữ trong từ là một bộ thủ.'],
  ['女士','nǚshì','nữ sĩ (đối chiếu chữ)','Quý bà/cô; cách gọi phụ nữ lịch sự','女士 dùng xưng gọi lịch sự, như 李女士. Âm Hán Việt nữ sĩ chỉ giúp đối chiếu chữ: nghĩa đang học không phải nữ thi sĩ. Nhận 女 trong 女朋友、女儿 để nối với chữ đã học. nǚ có ü: giữ lưỡi ở vị trí i rồi tròn môi; không đọc nǔ.'],
  ['请','qǐng','thỉnh','Mời; xin (lời đề nghị lịch sự)','请坐: mời ngồi. 请给我一杯茶: xin cho tôi một cốc trà. q là âm bật hơi: đầu lưỡi gần răng dưới, mặt trước lưỡi nâng; khác j ít hơi. qǐng kết thúc bằng ng, không phải n. Liên hệ thỉnh trong thỉnh cầu.'],
  ['坐','zuò','tọa','Ngồi; đi bằng phương tiện','请坐: mời ngồi. 坐出租车: đi taxi, nhấn người đi xe. 开车: lái xe. 坐 và 做 đều đọc zuò nhưng 做 là làm, như 做饭. Tọa trong tọa đàm giúp nhớ nghĩa ngồi; không dùng âm Hán Việt thay pinyin.'],
  ['给','gěi','cấp','Cho; cho ai (trước hành động)','给我一杯茶: cho tôi một cốc trà. 我给你打电话: tôi gọi điện cho bạn. Mẫu cho đồ: người cho + 给 + người nhận + đồ vật. Mẫu hành động: chủ ngữ + 给 + người nhận + động từ. Trong các câu đang học, 给 đọc gěi.'],
  ['杯','bēi','bôi','Cốc, chén (đơn vị đong/đếm đồ uống)','一杯茶: một cốc trà; 两杯牛奶: hai cốc sữa. 杯子 là đồ vật cái cốc: 一个杯子. Liên hệ bôi trong giao bôi để nhớ chữ; bēi mới là âm tiếng Trung. Không nói 一个茶 để diễn đạt một cốc trà.'],
  ['要','yào','yếu','Muốn; cần; định; lấy (khi gọi món)','我要一杯茶: tôi muốn/lấy một cốc trà. 要 có thể là ý định, nhu cầu hoặc yêu cầu theo ngữ cảnh; 想 thường nêu mong muốn. Thêm 请 và lời cảm ơn khi phù hợp. Không dịch mọi 要 thành phải.'],
  ['早饭','zǎofàn','tảo phạn','Bữa sáng','早 = sớm/sáng, 饭 = cơm/bữa ăn. 早饭 đối chiếu 晚饭 bữa tối. 吃早饭: ăn sáng. 饭 trong tên bữa ăn không có nghĩa bữa đó bắt buộc ăn cơm: 早饭我吃面包和鸡蛋.'],
  ['这个','zhège','giá cá (đối chiếu chữ)','Cái này; này (这 + 个)','这个 chỉ một đối tượng gần/người nói đang đề cập. 这个鸡蛋: quả trứng này. 个 đọc nhẹ trong zhège. Chọn lượng từ theo vật: 这杯茶 cốc trà này, 这件衣服 bộ/chiếc quần áo này. Giá cá là đối chiếu chữ, không phải từ giá cả của tiếng Việt.'],
  ['面包','miànbāo','miến bao (麵包)','Bánh mì','Dạng phồn thể 麵包: 麵 liên quan bột mì/mì, 包 có âm Hán Việt bao. Giản thể dùng 面 cho 麵 trong từ này; không suy từ nghĩa mặt/khuôn mặt để giải thích bánh mì. Liên hệ 面条儿 mì sợi. Học 面包 như một từ chỉ món ăn, không cần bịa chuyện hình chữ.'],
  ['鸡蛋','jīdàn','kê đản','Trứng gà','鸡 = gà (kê), 蛋 = trứng (đản). 一个鸡蛋: một quả trứng gà. jī: j ít hơi, không bật hơi mạnh như q. 鸡 là dạng giản thể của 雞; không suy nguồn gốc từ việc nhìn hình giản thể.'],
  ['先生','xiānsheng','tiên sinh','Ông, ngài; cách gọi đàn ông lịch sự','Họ + 先生, ví dụ 王先生. Trong xưng gọi thông thường, sheng đọc nhẹ. 先生 từng/còn có cách dùng tôn xưng khác theo ngữ cảnh, nhưng bài này học cách gọi ông/ngài. Liên hệ từ Hán Việt tiên sinh; tránh dịch máy móc thành người sinh trước trong hội thoại.'],
  ['一半','yíbàn','nhất bán','Một nửa','一半 là một nửa của một tổng thể: 我吃一半，你吃一半. 半 đứng trước đơn vị khi nói nửa đơn vị: 半天 nửa ngày; 六点半 là 6 giờ rưỡi. Không nói 六点一半. 一 đọc yí trước thanh 4 của 半.'],
  ['茶','chá','trà','Trà','喝茶: uống trà; 一杯茶: một cốc trà. Trà là liên hệ Hán Việt quen thuộc. ch là âm bật hơi, đầu lưỡi nâng về vùng sau lợi; không đặt lưỡi như q. 茶 đọc thanh 2 đi lên.']
 ];
 let n=0;
 for(const [han,py,hv,gloss,note] of rows){
  let w=byHan.get(han);
  if(!w){w={id:'L13-'+String(++n).padStart(2,'0'),han,py,hv,meaning:gloss+'.',gloss,note,category:'Bài 13 · Gọi món & giao tiếp',extra:false,lesson11:false};d.words.push(w);byHan.set(han,w);}
  else Object.assign(w,{py,hv,meaning:gloss+'.',gloss,note});
  w.lesson13=true;
 }
 d.meta={...d.meta,total:d.words.length,newLesson13:n,lesson13Unique:rows.length,date:'02/11/2026'};
 const examples={
  可以:['我可以坐这儿吗？','Wǒ kěyǐ zuò zhèr ma?','Tôi ngồi đây được không?'],
  再:['请再给我一杯茶。','Qǐng zài gěi wǒ yì bēi chá.','Xin cho tôi thêm một cốc trà.'],
  问题:['我有一个问题。','Wǒ yǒu yí ge wèntí.','Tôi có một câu hỏi.'],
  卖:['这家商店卖面包。','Zhè jiā shāngdiàn mài miànbāo.','Cửa hàng này bán bánh mì.'],
  打电话:['我明天给你打电话。','Wǒ míngtiān gěi nǐ dǎ diànhuà.','Ngày mai tôi gọi điện cho bạn.'],
  一下:['我想问一下。','Wǒ xiǎng wèn yíxià.','Tôi muốn hỏi một chút.'],
  服务员:['服务员，我要一杯茶。','Fúwùyuán, wǒ yào yì bēi chá.','Bạn phục vụ ơi, cho tôi một cốc trà.'],
  女士:['女士，请坐。','Nǚshì, qǐng zuò.','Thưa bà/cô, mời ngồi.'],
  请:['请给我一杯茶。','Qǐng gěi wǒ yì bēi chá.','Xin cho tôi một cốc trà.'],
  坐:['我坐出租车去饭店。','Wǒ zuò chūzūchē qù fàndiàn.','Tôi đi taxi đến nhà hàng.'],
  给:['我给你打电话。','Wǒ gěi nǐ dǎ diànhuà.','Tôi gọi điện cho bạn.'],
  杯:['我要两杯茶。','Wǒ yào liǎng bēi chá.','Tôi muốn hai cốc trà.'],
  要:['我要面包和鸡蛋。','Wǒ yào miànbāo hé jīdàn.','Tôi lấy bánh mì và trứng gà.'],
  早饭:['早饭我吃面包和鸡蛋。','Zǎofàn wǒ chī miànbāo hé jīdàn.','Bữa sáng tôi ăn bánh mì và trứng gà.'],
  这个:['这个鸡蛋多少钱？','Zhège jīdàn duōshao qián?','Quả trứng gà này giá bao nhiêu?'],
  面包:['我想买面包。','Wǒ xiǎng mǎi miànbāo.','Tôi muốn mua bánh mì.'],
  鸡蛋:['我吃一个鸡蛋。','Wǒ chī yí ge jīdàn.','Tôi ăn một quả trứng gà.'],
  先生:['先生，你要什么？','Xiānsheng, nǐ yào shénme?','Thưa ông, ông muốn dùng gì?'],
  一半:['我吃一半，你吃一半。','Wǒ chī yíbàn, nǐ chī yíbàn.','Tôi ăn một nửa, bạn ăn một nửa.'],
  茶:['我喜欢喝茶。','Wǒ xǐhuan hē chá.','Tôi thích uống trà.']
 };
 const sentences=[
  [1,'Tôi có một câu hỏi.','我 有 一个 问题','Wǒ yǒu yí ge wèntí.','一个问题: một câu hỏi/vấn đề. 个 là lượng từ.'],
  [1,'Mời ngồi.','请 坐','Qǐng zuò.','请 + động từ: lời mời/đề nghị. 坐 là ngồi; 做 là làm.'],
  [1,'Tôi muốn hỏi một chút.','我 想 问 一下','Wǒ xiǎng wèn yíxià.','一下 đứng sau 问, chỉ một lượt hỏi ngắn và làm lời nói nhẹ hơn.'],
  [1,'Tôi thích uống trà.','我 喜欢 喝 茶','Wǒ xǐhuan hē chá.','喜欢 + cụm động từ 喝茶.'],
  [1,'Tôi lấy bánh mì và trứng gà.','我 要 面包 和 鸡蛋','Wǒ yào miànbāo hé jīdàn.','Khi gọi món, 我要 + món ăn. 和 nối hai món.'],
  [2,'Xin cho tôi một cốc trà.','请 给 我 一杯 茶','Qǐng gěi wǒ yì bēi chá.','给 + người nhận + đồ vật. 杯 đếm lượng trà trong cốc.'],
  [2,'Tôi ngồi đây được không?','我 可以 坐 这儿 吗','Wǒ kěyǐ zuò zhèr ma?','可以 hỏi sự cho phép; 这儿 là địa điểm; 吗 cuối câu hỏi có/không.'],
  [2,'Cửa hàng này bán bánh mì.','这家 商店 卖 面包','Zhè jiā shāngdiàn mài miànbāo.','这家商店 làm chủ ngữ, 卖 là bán, 面包 là thứ được bán.'],
  [2,'Bữa sáng tôi ăn bánh mì và trứng gà.','早饭 我 吃 面包 和 鸡蛋','Zǎofàn wǒ chī miànbāo hé jīdàn.','早饭 làm chủ đề của câu: nói riêng về bữa sáng.'],
  [3,'Sau khi tan ca ngày mai, tôi gọi điện cho bạn.','明天 下班 后 我 给 你 打电话','Míngtiān xiàbān hòu, wǒ gěi nǐ dǎ diànhuà.','下班后 làm mốc thời gian; 我 là người gọi; 给你 chỉ người nhận cuộc gọi.'],
  [3,'Xin cho tôi thêm một cốc trà.','请 再 给 我 一杯 茶','Qǐng zài gěi wǒ yì bēi chá.','再 đứng trước 给, chỉ thêm/lặp lại; không thay bằng 在.'],
  [3,'Tôi ăn một nửa, bạn ăn một nửa.','我 吃 一半 你 吃 一半','Wǒ chī yíbàn, nǐ chī yíbàn.','Hai vế song song. 一半 chỉ mỗi phần bằng một nửa; 半 trong 六点半 có cấu trúc khác.']
 ];
 const contexts=[
  [1,'Muốn xin phép ngồi ở đây. Chọn câu.',['我可以坐这儿吗？','我知道坐这儿吗？','我认识坐这儿吗？','我这儿可以是吗？'],0,'可以 hỏi được phép làm gì; biết thông tin là 知道, quen biết là 认识.','Wǒ kěyǐ zuò zhèr ma?'],
  [1,'Bạn muốn nói “Tôi có một câu hỏi”.',['我有一个问题。','我有一个问一下。','我一个请问题。','我是问一个。'],0,'问题 là danh từ câu hỏi/vấn đề; 问 là động từ hỏi.','Wǒ yǒu yí ge wèntí.'],
  [1,'Gọi một CỐC TRÀ, không phải cái cốc rỗng.',['我要一杯茶。','我要一个杯子。','我要一个茶。','我要一茶杯。'],0,'一杯茶 chỉ đồ uống; 一个杯子 chỉ đồ vật cái cốc.','Wǒ yào yì bēi chá.'],
  [2,'Bạn là khách muốn mua bánh mì, cửa hàng là bên bán.',['我买面包，商店卖面包。','我卖面包，商店买面包。','我穿面包，商店看面包。','我卖买面包。'],0,'买 mǎi là mua; 卖 mài là bán. Đổi chữ cũng đổi vai trong giao dịch.','Wǒ mǎi miànbāo, shāngdiàn mài miànbāo.'],
  [2,'Nói nhẹ lời: “Tôi muốn hỏi một chút”.',['我想问一下。','我想问题一下是。','我想问一点儿水。','我想问一半水。'],0,'Động từ + 一下: làm một chút/ngắn. 一点儿水 là một ít nước; 一半 là một nửa.','Wǒ xiǎng wèn yíxià.'],
  [2,'Bạn gọi điện cho bạn mình vào ngày mai.',['我明天给你打电话。','你明天给我打电话。','我明天电话你给打。','我明天给电话打你。'],0,'我 là người gọi; 给你 chỉ người nhận. Câu thứ hai đảo vai người gọi và nhận.','Wǒ míngtiān gěi nǐ dǎ diànhuà.'],
  [3,'Bạn đã uống một cốc trà và muốn gọi THÊM một cốc nữa.',['请再给我一杯茶。','请在给我一杯茶。','请给再我一杯茶。','请给我一半茶在。'],0,'请 + 再 + 给 + người + đồ uống. 再 là thêm/lại, 在 là ở/đang.','Qǐng zài gěi wǒ yì bēi chá.'],
  [3,'Mỗi người ăn một nửa. Sau đó bạn tan ca lúc 6:30. Chọn cách dùng 半 đúng.',['我吃一半，你吃一半。我六点半下班。','我吃半点，你吃半点。我六点一半下班。','我吃一杯半，你吃一杯半。我六半点下班。','我一半吃你。我六点个半下班。'],0,'一半 = một nửa tổng thể; 六点半 = 6 giờ rưỡi. Không ghép thành 六点一半.','Wǒ chī yíbàn, nǐ chī yíbàn. Wǒ liù diǎn bàn xiàbān.']
 ];
 const clozes=[
  ['可以','我___坐这儿吗？','Xin phép: tôi ngồi ở đây ĐƯỢC không?',['可以','知道','认识','有'],'Wǒ kěyǐ zuò zhèr ma?','可以 + động từ: có thể/được phép làm.'],
  ['再','请___给我一杯茶。','Xin cho tôi THÊM một cốc trà nữa.',['再','在','是','有'],'Qǐng zài gěi wǒ yì bēi chá.','再 là thêm/lại; 在 không thay được 再 ở đây.'],
  ['问题','我有一个___。','Tôi có một CÂU HỎI.',['问题','一下','可以','请'],'Wǒ yǒu yí ge wèntí.','问题 là danh từ; 问 là động từ hỏi.'],
  ['卖','这家商店___面包。','Cửa hàng này BÁN bánh mì.',['卖','买','穿','坐'],'Zhè jiā shāngdiàn mài miànbāo.','卖 mài bán; 买 mǎi mua.'],
  ['打电话','我明天给你___。','Ngày mai tôi GỌI ĐIỆN cho bạn.',['打电话','做饭','穿衣服','看书'],'Wǒ míngtiān gěi nǐ dǎ diànhuà.','给你 + 打电话: gọi điện cho bạn.'],
  ['一下','我想问___。','Tôi muốn hỏi MỘT CHÚT, dùng cụm sau động từ.',['一下','一点儿水','一半茶','一杯'],'Wǒ xiǎng wèn yíxià.','问一下: hỏi một chút; không dùng lượng đồ uống sau 问 để mang nghĩa này.'],
  ['服务员','___，我要一杯茶。','Gọi NHÂN VIÊN PHỤC VỤ để gọi đồ uống.',['服务员','早饭','面包','问题'],'Fúwùyuán, wǒ yào yì bēi chá.','服务员 là nhân viên phục vụ; viên trong 员 chỉ người.'],
  ['女士','___，请坐。','Thưa BÀ/CÔ, mời ngồi (cách gọi lịch sự).',['女士','先生','男','早饭'],'Nǚshì, qǐng zuò.','女士 nǚshì gọi phụ nữ lịch sự; 先生 gọi đàn ông trong cách dùng này.'],
  ['请','___坐。','MỜI ngồi.',['请','问题','给','再'],'Qǐng zuò.','请 + động từ: mời/xin. 再坐 có nghĩa khác: lại ngồi/ngồi thêm.'],
  ['坐','请___。','Mời NGỒI.',['坐','做','卖','吃'],'Qǐng zuò.','坐 = ngồi, 做 = làm; cả hai cùng đọc zuò.'],
  ['给','我___你打电话。','Tôi gọi điện CHO bạn.',['给','杯','问题','的'],'Wǒ gěi nǐ dǎ diànhuà.','给 + người nhận đặt trước 打电话.'],
  ['杯','我要两___茶。','Tôi muốn hai CỐC trà.',['杯','本','件','只'],'Wǒ yào liǎng bēi chá.','杯 đếm đồ uống theo cốc; 本 cho sách, 件 cho quần áo.'],
  ['要','我___一杯茶。','Gọi món: tôi LẤY một cốc trà.',['要','正在','是','在'],'Wǒ yào yì bēi chá.','要 + danh từ dùng nêu món mình muốn gọi.'],
  ['早饭','我早上吃___。','Buổi sáng tôi ăn BỮA SÁNG.',['早饭','晚饭','一半','问题'],'Wǒ zǎoshang chī zǎofàn.','早饭 là bữa sáng, 晚饭 là bữa tối.'],
  ['这个','___鸡蛋多少钱？','Quả trứng NÀY giá bao nhiêu? Dùng cụm có 个.',['这个','那个','这些','那些'],'Zhège jīdàn duōshao qián?','这个 chỉ một vật này; 那个 là vật kia; 这些 chỉ số nhiều.'],
  ['面包','早饭我吃___和鸡蛋。','Bữa sáng tôi ăn BÁNH MÌ và trứng gà.',['面包','面条儿','米饭','包子'],'Zǎofàn wǒ chī miànbāo hé jīdàn.','面包 là bánh mì, 面条儿 là mì sợi.'],
  ['鸡蛋','我吃一个___。','Tôi ăn một quả TRỨNG GÀ.',['鸡蛋','杯子','问题','朋友'],'Wǒ chī yí ge jīdàn.','鸡 là gà; 蛋 là trứng.'],
  ['先生','___，你要什么？','Thưa ÔNG, ông muốn dùng gì?',['先生','女士','问题','早饭'],'Xiānsheng, nǐ yào shénme?','先生 là cách gọi ông/ngài; sheng thường đọc nhẹ.'],
  ['一半','我吃___，你吃一半。','Tôi ăn MỘT NỬA, bạn ăn một nửa.',['一半','半点','一个半点','一点钟'],'Wǒ chī yíbàn, nǐ chī yíbàn.','一半 là một nửa của tổng thể; khác 半 trong 六点半.'],
  ['茶','我喜欢喝___。','Tôi thích uống TRÀ.',['茶','牛奶','水','早饭'],'Wǒ xǐhuan hē chá.','茶 chá là trà; đọc ch bật hơi và thanh 2.']
 ];
 const cards=[
  {id:'l13-request',tag:'Bài 13',title:'Xin phép và đề nghị lịch sự',formula:'可以 + V + 吗？ · 请 + V · V + 一下',explain:'可以 hỏi xem một hành động có được phép/phù hợp không. 请 mở lời mời hay đề nghị. 一下 sau động từ nói làm ngắn/thử và có thể làm lời nói nhẹ hơn. Chọn theo việc bạn muốn nói, không thay ba cấu trúc cho nhau.',examples:[examples.可以,examples.请,examples.一下],trap:'一下 không chỉ lượng đồ vật: 问一下 là hỏi một chút; 喝一点儿水 là uống một ít nước. 会说汉语 nhấn kỹ năng, 可以坐这儿 hỏi sự cho phép.'},
  {id:'l13-give',tag:'Bài 13',title:'给: ai cho ai, ai gọi cho ai?',formula:'给 + người + đồ vật · 给 + người + động từ',explain:'我给你一杯茶: tôi cho bạn một cốc trà. 我给你打电话: tôi gọi điện cho bạn. Dựa vào chủ ngữ và người ngay sau 给 để giữ đúng vai; cả cụm 给你 đứng trước hành động 打电话.',examples:[['我给你一杯茶。','Wǒ gěi nǐ yì bēi chá.','Tôi cho bạn một cốc trà.'],examples.打电话],trap:'我给你打电话 và 你给我打电话 đảo người gọi/nhận. Liên hệ 医生给我看病 ở bài 12.'},
  {id:'l13-quantity',tag:'Bài 13',title:'Cốc trà, cái cốc và một nửa',formula:'Số + 杯 + đồ uống · 个 + 杯子 · 一半 / 半 + đơn vị',explain:'一杯茶 đếm lượng đồ uống trong cốc; 一个杯子 đếm đồ vật cái cốc. 一半 là một nửa tổng thể. Khi nói nửa đơn vị: 半天, 半杯茶; giờ rưỡi: 六点半.',examples:[examples.杯,['我有一个杯子。','Wǒ yǒu yí ge bēizi.','Tôi có một cái cốc.'],examples.一半],trap:'Không dùng 一个茶 cho một cốc trà, không nói 六点一半 cho 6:30. 这个鸡蛋 đúng; với trà chọn 这杯茶, quần áo chọn 这件衣服.'},
  {id:'l13-order',tag:'Bài 13',title:'Gọi món và xin thêm',formula:'我要 + món · 请再给我 + số lượng + món',explain:'要 + danh từ nêu thứ muốn lấy/gọi. 再 trước 给 chỉ thêm/lặp lại. Khi nói mua bán, khách thường 买 và bên bán 卖; khi gọi món trong quán, có thể dùng 我要… hoặc 请给我….',examples:[examples.要,examples.再,examples.卖],trap:'再 zài = lại/thêm/rồi, 在 zài = ở/đang. 买 mǎi = mua, 卖 mài = bán; cần nhớ cả chữ và thanh điệu.'}
 ];
 const q=(id,group,prompt,options,answer,py,explain)=>({id:'context-grammar-l13-'+id,group:'l13-'+group,prompt,options,answer,py,explain});
 const questions=[
  q('permission','request','Xin phép ngồi tại đây.',['我可以坐这儿吗？','我认识坐这儿吗？','我知道坐这儿吗？','我问题坐这儿吗？'],examples.可以[0],examples.可以[1],'可以 + động từ + 吗 hỏi có được phép làm không.'),
  q('brief','request','Muốn hỏi một chút, làm lời mở đầu nhẹ hơn.',['我想问一下。','我想问一杯。','我想问一点儿水。','我想一下问题是。'],examples.一下[0],examples.一下[1],'一下 đứng sau động từ 问, không phải lượng câu hỏi hay lượng nước.'),
  q('call','give','Ngày mai TÔI gọi điện CHO BẠN.',['我明天给你打电话。','你明天给我打电话。','我明天电话打给是你。','我明天给打你电话。'],examples.打电话[0],examples.打电话[1],'Chủ ngữ 我: người gọi. 给你: hướng tới người nhận cuộc gọi.'),
  q('give','give','TÔI cho BẠN một cốc trà.',['我给你一杯茶。','你给我一杯茶。','我一杯给茶你。','我给茶一杯你。'],'我给你一杯茶。','Wǒ gěi nǐ yì bēi chá.','给 + người nhận 你 + đồ vật 一杯茶. Câu đảo 你/我 có vai nghĩa khác.'),
  q('cup','quantity','Gọi HAI CỐC TRÀ, không gọi hai cái cốc rỗng.',['我要两杯茶。','我要两个杯子。','我要两本茶。','我要两个茶。'],examples.杯[0],examples.杯[1],'杯 là đơn vị cốc trà; 杯子 là vật chứa. Hai cốc nói 两杯.'),
  q('half','quantity','Chọn cách nói “Tôi tan ca lúc 6 giờ rưỡi”.',['我六点半下班。','我六点一半下班。','我六半点下班。','我六点个半下班。'],'我六点半下班。','Wǒ liù diǎn bàn xiàbān.','六点半 = 6:30. 一半 dùng cho một nửa tổng thể, như 我吃一半.'),
  q('another','order','Đã gọi trà, giờ muốn gọi THÊM một cốc.',['请再给我一杯茶。','请在给我一杯茶。','请给再我一杯茶。','请再一杯茶我给。'],examples.再[0],examples.再[1],'请 + 再 + 给 + người nhận + món. 再 là thêm/lại.'),
  q('sale','order','Bạn muốn nói “Cửa hàng này BÁN bánh mì”.',['这家商店卖面包。','这家商店买面包。','这家商店穿面包。','这家商店坐面包。'],examples.卖[0],examples.卖[1],'卖 mài = bán. 买 mǎi = mua. Cả hai có thể có cùng tân ngữ nhưng hướng giao dịch khác nhau.')
 ];
 window.HAN_LESSONS.sentences.push(...sentences);
 window.HAN_LESSONS.contexts.push(...contexts);
 window.HAN_LESSONS.families.push(
  {title:'服务 / 员 · Phục vụ / viên',words:['服务员','售货员'],text:'Đây là cách ghép TỪ: 服务 + 员, 售货 + 员. 员 nối với “viên” trong nhân viên, thành viên của tiếng Việt. Nhận phần chung để hiểu vai nghề nghiệp; không gọi cả 服务 là một bộ thủ.'},
  {title:'饭 / 茶 / 蛋 · Tên món và tên bữa',words:['早饭','晚饭','米饭','面包','面条儿','鸡蛋','茶'],text:'早饭: bữa sáng; 晚饭: bữa tối; 米饭: cơm. 饭 đổi phạm vi nghĩa theo từ ghép. 鸡蛋 = trứng gà. 茶 nối với trà. 面包 dạng phồn thể 麵包, cùng 麵 với 麵條; không phân tích nó từ nghĩa “khuôn mặt”.'},
  {title:'先生 / 女士 · Tôn xưng và Hán Việt',words:['先生','女士','女','男'],text:'先生 → tiên sinh, 女士 → nữ sĩ là cầu nối âm/chữ. Trong tình huống xưng gọi đang học, hiểu 先生 là ông/ngài và 女士 là bà/cô, không áp nghĩa “nữ thi sĩ” của tiếng Việt vào 女士. Chưa có chứng cứ thì không suy ra tuổi hay tình trạng hôn nhân từ cách gọi này.'}
 );
 window.HAN_LESSONS.confusions.push(
  ['买 / 卖','我买面包，商店卖面包。','Wǒ mǎi miànbāo, shāngdiàn mài miànbāo.','Tôi mua bánh mì, cửa hàng bán bánh mì.','买 mǎi mua; 卖 mài bán. Nhớ cả thanh 3/thanh 4 và phần 十 ở trên chữ 卖 hiện đại.'],
  ['杯 / 杯子','我要一杯茶，不要杯子。','Wǒ yào yì bēi chá, bú yào bēizi.','Tôi muốn một cốc trà, không lấy cái cốc.','一杯茶 là lượng đồ uống; 一个杯子 là đồ vật. 杯 không thay 杯子 trong mọi vị trí.'],
  ['一下 / 一点儿 / 一半','我想问一下。','Wǒ xiǎng wèn yíxià.','Tôi muốn hỏi một chút.','问一下: hành động ngắn/thử. 一点儿水: một ít nước. 一半: một nửa tổng thể. Có thể có 看一点儿书 nhưng phạm vi nghĩa khác: đọc một ít sách.'],
  ['可以 / 会','我会开车，但今天不可以开车。','Wǒ huì kāi chē, dàn jīntiān bù kěyǐ kāi chē.','Tôi biết lái xe, nhưng hôm nay không được phép lái.','会 nói kỹ năng trong câu này; 可以 nói sự cho phép. 但 dàn = nhưng là từ bổ trợ của ví dụ, không tự cộng vào kho học.'],
  ['服务员 / 售货员','服务员，我要一杯茶。','Fúwùyuán, wǒ yào yì bēi chá.','Bạn phục vụ ơi, tôi lấy một cốc trà.','服务员: nhân viên phục vụ trong dịch vụ; 售货员: nhân viên bán hàng. Dựa vào công việc/ngữ cảnh, không đồng nhất mọi nhân viên với người phục vụ quán ăn.']
 );
 window.HAN_GRAMMAR.cards.push(...cards);
 window.HAN_GRAMMAR.questions.push(...questions);
 window.HAN_LESSON13={hans:rows.map(r=>r[0]),examples,sentences,contexts,clozes,newCount:n,
  groups:[
   {title:'01 · Mở lời & hỏi',hans:['可以','问题','一下','请','坐'],goal:'我可以坐这儿吗？ → 我想问一下。'},
   {title:'02 · Người nói & người nhận',hans:['服务员','女士','先生','给','打电话'],goal:'Ai làm? Ai nhận? Nhìn chủ ngữ và người sau 给.'},
   {title:'03 · Gọi bữa sáng',hans:['要','早饭','面包','鸡蛋','茶'],goal:'早饭我吃面包和鸡蛋。 → 我要一杯茶。'},
   {title:'04 · Chọn, chia & gọi thêm',hans:['这个','杯','一半','再','卖'],goal:'这个鸡蛋多少钱？ → 请再给我一杯茶。'}
  ],
  references:[{title:'Bộ Giáo dục Đài Loan · 麵 (bột mì / thực phẩm từ bột)',url:'https://dict.revised.moe.edu.tw/dictView.jsp?ID=1450&la=1&powerMode=0'},{title:'Từ điển Hán Nôm · âm miàn và 麵 / miến',url:'https://hvdic.thivien.net/py/mian4'}]
 };
})();
