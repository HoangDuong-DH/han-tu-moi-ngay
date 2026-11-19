(() => {
 'use strict';
 const cu=h=>'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word='+encodeURIComponent(h);
 const moe=id=>'https://dict.concised.moe.edu.tw/dictView.jsp?ID='+id+'&la=0&powerMode=0';
 const records=[];
 const add=(han,py,hv,meaning,usage,formation,contrast,bridge,examples,links,article,extra=false)=>records.push({han,py,hv,meaning,usage,formation,contrast,bridge,examples,links,article,extra});
 add('师','shī','sư','Thầy, người chuyên một nghề; thành tố trong nhiều từ chỉ nghề nghiệp.',
  'Gặp trong 老师 giáo viên, 厨师 đầu bếp, 律师 luật sư. Không gắn 师 vào tên mọi công việc để tự tạo từ. Trong giao tiếp, dùng từ hoàn chỉnh như 老师 hoặc tên họ + 老师.',
  '师 là giản thể của 師. Chữ 師 có lịch sử gắn với quân đội; không đọc các nét giản thể thành hình thầy cầm thước. Các nghĩa hiện đại như thầy/người chuyên nghề cần học theo từ chứa nó.',
  '老师 là giáo viên; 学生 là học sinh. Trong 王老师, 王 là họ, 老师 là danh xưng; không đảo thành 老师王 theo thứ tự tiếng Việt.',
  '“Sư” quen trong sư phạm, sư phụ; không đồng nhất với mọi tiếng “sư” có trong từ Việt. Cách gọi “thầy” trong tiếng Việt không phải pinyin của 师.',
  [['王老师教我们汉语。','Wáng lǎoshī jiāo wǒmen Hànyǔ.','Thầy/cô Vương dạy chúng tôi tiếng Trung.'],['我哥哥是厨师。','Wǒ gēge shì chúshī.','Anh trai tôi là đầu bếp.']],
  [['CUHK · 師',cu('師')]],'teacher',true);
 add('老师','lǎoshī','lão sư','Thầy, cô giáo; cách gọi tôn trọng người dạy kiến thức hoặc kỹ năng.',
  'Dùng được cho giáo viên trẻ hoặc lớn tuổi. Họ + 老师 là cách xưng gọi thông dụng trong lớp: 王老师. 一位老师 lịch sự; 一个老师 dùng khi đếm thông thường.',
  '老师 là từ đã quy ước. 老 ở đây góp sắc thái danh xưng, không xác định người ấy già. Trong 老的老师, phần 老的 bên ngoài mới mô tả tuổi của người giáo viên.',
  '新老师 là giáo viên mới; 年轻的老师 là giáo viên trẻ. 新 có thể chỉ mới đối với lớp/trường, không tự nói tuổi. 王老师 và 老王 là hai cách gọi với quan hệ khác nhau.',
  '“Lão sư” là đối chiếu âm Hán Việt, lời Việt tự nhiên là thầy/cô. “Thầy” và “sư” có quan hệ lịch sử cần bằng chứng ngữ âm riêng; sơ đồ trong ảnh chưa đủ chứng minh đường vay mượn.',
  [['我们的新老师很年轻。','Wǒmen de xīn lǎoshī hěn niánqīng.','Giáo viên mới của chúng tôi còn rất trẻ.'],['王老师，我没听懂，请您再说一遍。','Wáng lǎoshī, wǒ méi tīngdǒng, qǐng nín zài shuō yí biàn.','Thầy/cô Vương ơi, em chưa nghe hiểu, xin thầy/cô nói lại một lượt.']],
  [['Bộ GD Đài Loan · 老師',moe(13585)],['Bộ GD Đài Loan · 老',moe(13471)]],'teacher');
 add('师父','shīfu','sư phụ','Người thầy trong quan hệ truyền nghề, truyền dạy; cũng dùng với người tu hành theo ngữ cảnh.',
  'Nhấn quan hệ học trò với người trực tiếp truyền dạy. Các từ điển có cách ghi shīfu/shīfù; ở đây thẻ ghi cách đọc nhẹ phổ biến trong khẩu ngữ. Cần theo người nói và môi trường cụ thể.',
  '师 gắn với người dạy, 父 là cha. Sự ghép này gợi cách hình dung quan hệ dìu dắt; không có nghĩa người thầy là cha ruột, cũng không chứng minh mọi người học đều phải dùng danh xưng ấy.',
  '师父 và 师傅 có vùng nghĩa chồng lấn. Khi nói thầy truyền nghề của mình, 师父 thường làm rõ quan hệ; khi lịch sự gọi người có tay nghề, 师傅 thường thuận hơn. Đây là xu hướng dùng, không phải ranh giới tuyệt đối.',
  '“Sư phụ” là từ đang dùng trong tiếng Việt. 父 là “phụ” của phụ thân, khác 傅 trong 师傅 dù pinyin trùng gần nhau.',
  [['他跟师父学做饭。','Tā gēn shīfu xué zuòfàn.','Anh ấy học nấu ăn với sư phụ.'],['师父让我先看看，再自己试一试。','Shīfu ràng wǒ xiān kànkan, zài zìjǐ shì yi shì.','Sư phụ bảo tôi xem trước rồi tự thử làm.']],
  [['Bộ GD Đài Loan · 師父',moe(33218)]],'teacher');
 add('师傅','shīfu','sư phó','Cách gọi người có nghề hoặc tay nghề, thường dùng để xưng gọi lịch sự.',
  'Có thể gọi người sửa đồ, thợ hoặc người lái xe trong môi trường phù hợp. Từ điển Đài Loan ghi shīfù; dạng nhẹ shīfu thường gặp trong lời nói đại lục. Không lấy khác biệt ghi âm này để kết luận một bên viết sai.',
  'Học 师傅 như một danh xưng cả từ. 傅 và 父 là hai chữ khác nhau; cùng âm gần nhau và nghĩa có phần chồng lấn không làm chúng thành một chữ.',
  '老师 làm rõ vai người dạy trong lớp; 师傅 có thể là người có tay nghề đang giúp ta. Tuy vậy từ điển ghi cả những nghĩa thầy dạy của 师傅, nên cần xét ngữ cảnh thay vì cấm thay thế trong mọi trường hợp.',
  '“Sư phó” là đối chiếu chữ, không phải cách gọi tự nhiên cho tài xế trong tiếng Việt. Dịch theo vai người được gọi: bác tài, bác thợ…',
  [['师傅，请问车站怎么走？','Shīfu, qǐngwèn chēzhàn zěnme zǒu?','Bác ơi, cho cháu hỏi đi tới ga thế nào?'],['这位师傅已经帮我修好了自行车。','Zhè wèi shīfu yǐjīng bāng wǒ xiūhǎo le zìxíngchē.','Bác thợ này đã sửa xong xe đạp cho tôi.']],
  [['Bộ GD Đài Loan · 師傅',moe(33217)]],'teacher');
 add('父','fù','phụ','Cha; thành tố trong 父亲、父母、师父.',
  '父亲 gọi cha với sắc thái văn viết/trang trọng hơn 爸爸 trong nhiều tình huống gia đình. 父母 là cha mẹ; không dùng một mình 父 làm cách gọi thông thường thay cho 爸爸 ở mức học này.',
  'Đây là chữ đơn. Trong 师父, nghĩa quan hệ cha được vận dụng vào danh xưng người thầy, không mô tả huyết thống.',
  '父亲 là cha, 母亲 là mẹ; 父母 bao gồm cả hai. So sánh 爸爸 và 父亲 theo cách xưng gọi và văn cảnh, không coi là hai người khác nhau.',
  '“Phụ” trong phụ thân, phụ mẫu có đúng chữ 父; “phụ” trong phụ giúp 輔/辅 là chữ khác.',
  [['我父亲是一位老师。','Wǒ fùqīn shì yí wèi lǎoshī.','Cha tôi là một giáo viên.'],['周末我想回家看父母。','Zhōumò wǒ xiǎng huí jiā kàn fùmǔ.','Cuối tuần tôi muốn về nhà thăm cha mẹ.']],
  [['Bộ GD Đài Loan · 師父',moe(33218)]],'teacher',true);
 add('谦','qiān','khiêm','Khiêm nhường; thường dùng trong từ ghép như 谦虚、谦和.',
  'Trong nói hằng ngày, dùng cả 谦虚 khi nhận xét một người khiêm tốn. Chữ đơn 谦 xuất hiện tự nhiên hơn trong tổ hợp, văn viết hoặc lời dẫn cổ.',
  '谦 là giản thể của 謙. Theo phân tích được CUHK dẫn từ Thuyết văn, 言 gợi phạm vi nghĩa, 兼 gợi âm. Quan hệ ấy không phải phép cộng “nói + lúa = khiêm tốn”.',
  '谦虚 nhấn không tự mãn; 谦和 thường hướng vào cách đối đãi ôn hòa. Hai từ gần nghĩa và có thể cùng miêu tả một người, không phải hai nhóm người loại trừ nhau.',
  '“Khiêm” nối trực tiếp với khiêm tốn, khiêm nhường, khiêm hòa. Pinyin qiān phải học riêng, không đọc theo âm Việt.',
  [['他很谦虚，也很愿意听别人的意见。','Tā hěn qiānxū, yě hěn yuànyì tīng biérén de yìjiàn.','Anh ấy rất khiêm tốn, cũng rất sẵn lòng nghe ý kiến người khác.'],['这位老师待人很谦和。','Zhè wèi lǎoshī dàirén hěn qiānhé.','Thầy/cô giáo này đối đãi với người khác rất khiêm hòa.']],
  [['CUHK · 謙',cu('謙')]],'modesty',true);
 add('兼','jiān','kiêm','Cùng đảm nhiệm, đồng thời bao gồm; thường trong từ ghép.',
  'Nhận nghĩa cùng/kiêm trong 兼任 kiêm nhiệm, 兼职 làm thêm/kiêm chức, 兼顾 chú ý đồng thời đến nhiều mặt. 兼 ít làm từ hội thoại độc lập ở trình độ đầu.',
  'CUHK giải thích dạng cổ có bàn tay giữ hai bó ngũ cốc. 禾 trong phân tích cổ không bắt buộc là cây lúa nước. Khi 兼 làm phần gợi âm của 謙, không mang nguyên câu chuyện ngũ cốc vào nghĩa từ mới.',
  '兼任 nói một người cùng giữ vai; 一起 nêu nhiều người cùng làm cũng có thể được. “Đồng thời” trong tiếng Việt chưa đủ để thay 兼 vào mọi câu có 一起.',
  '“Kiêm” trong kiêm nhiệm là cầu nối tốt; 兼/谦 có pinyin jiān/qiān gần nhau nhưng là hai chữ và hai mạng nghĩa.',
  [['他兼任两个班的老师。','Tā jiānrèn liǎng ge bān de lǎoshī.','Anh ấy đồng thời làm giáo viên của hai lớp.'],['她想找一份周末的兼职。','Tā xiǎng zhǎo yí fèn zhōumò de jiānzhí.','Cô ấy muốn tìm một việc làm thêm vào cuối tuần.']],
  [['CUHK · 兼',cu('兼')]],'modesty',true);
 add('谦虚','qiānxū','khiêm hư','Khiêm tốn, không tự mãn.',
  'Dùng để khen thái độ nhìn nhận mình hoặc nhắc đừng quá khách khí khi được khen. 你太谦虚了 thường là lời đáp khi người kia nói giảm về thành tích của họ.',
  '谦 và 虚 cùng hướng vào phẩm chất khiêm nhường trong từ này. 虚 không bắt buộc mang nghĩa giả dối như trong 虚假; nghĩa thành tố phải chọn theo từ cụ thể.',
  '谦虚 không đồng nghĩa không có năng lực hoặc tự chê mình vô dụng. 自信 là tự tin; một người có thể vừa tự tin về việc làm được, vừa sẵn sàng nghe sửa sai.',
  '“Khiêm hư” không phải lời Việt thông thường. Dịch tự nhiên là khiêm tốn; đừng lấy chữ “hư” trong hư hỏng để đoán nghĩa.',
  [['你说得很好，别太谦虚了。','Nǐ shuō de hěn hǎo, bié tài qiānxū le.','Bạn nói rất tốt, đừng khiêm tốn quá.'],['学会以后，也要谦虚地听听别人的意见。','Xuéhuì yǐhòu, yě yào qiānxū de tīngting biérén de yìjiàn.','Sau khi học được rồi, cũng nên khiêm tốn nghe thử ý kiến người khác.']],
  [['Bộ GD Đài Loan · 謙虛',moe(25153)]],'modesty');
 add('谦和','qiānhé','khiêm hòa','Khiêm nhường và ôn hòa trong cách đối đãi.',
  'Thường dùng nhận xét thái độ đối với người khác: 待人谦和. Phù hợp văn viết hoặc nhận xét lịch sự hơn một câu nói rất thân mật.',
  '谦 hướng đến không kiêu căng, 和 hướng đến hòa nhã. Hai thành tố góp nghĩa; không phải một chữ hình thanh được tách làm hai.',
  '和谐 héxié là hài hòa trong quan hệ/tổng thể; 谦和 qiānhé tả phẩm chất hoặc cách đối đãi của người. Cùng 和 nhưng không thay được cả từ.',
  '“Khiêm hòa” dùng được trong tiếng Việt. Đây là cầu nối sát hơn “khiêm hư”; vẫn cần học đúng qiānhé và vị trí trong câu.',
  [['她待人谦和，大家都喜欢跟她说话。','Tā dàirén qiānhé, dàjiā dōu xǐhuan gēn tā shuōhuà.','Cô ấy đối đãi khiêm hòa, mọi người đều thích trò chuyện với cô ấy.'],['他很有经验，说话却很谦和。','Tā hěn yǒu jīngyàn, shuōhuà què hěn qiānhé.','Anh ấy rất có kinh nghiệm nhưng nói năng vẫn rất khiêm hòa.']],
  [['Bộ GD Đài Loan · tra nhóm 謙', 'https://dict.concised.moe.edu.tw/search.jsp?word=%E8%AC%99']],'modesty');
 add('言','yán','ngôn','Lời nói; thành tố và bộ phận gợi nghĩa liên quan ngôn ngữ.',
  'Nhận trong 语言 yǔyán — ngôn ngữ, 发言 fāyán — phát biểu. Trong hội thoại “nói”, từ thường dùng là 说; không thay 说 bằng 言 trong mọi câu.',
  '言 là chữ đơn; khi đứng bên trái nhiều chữ giản thể có dạng 讠, như 语、说、谦. Bộ phận gợi nghĩa chỉ định hướng, không giải thích hết nghĩa từng chữ.',
  '语言 là danh từ, 说话 là cụm hành động nói chuyện. 我学汉语 đúng; khi muốn bảo “nói tiếng Trung”, dùng 说汉语, không ghép “言汉语”.',
  '“Ngôn” trong ngôn ngữ, phát ngôn là chữ 言; “ngữ” trong ngôn ngữ là 語/语, không phải cùng một chữ.',
  [['我想学一种新的语言。','Wǒ xiǎng xué yì zhǒng xīn de yǔyán.','Tôi muốn học một ngôn ngữ mới.'],['请先听他说完，再发言。','Qǐng xiān tīng tā shuōwán, zài fāyán.','Hãy nghe anh ấy nói xong trước rồi hãy phát biểu.']],
  [['CUHK · 謙',cu('謙')]],'modesty',true);
 add('禾','hé','hòa','Ngũ cốc; chữ/thành phần thường dùng để nhận cấu tạo.',
  'Ưu tiên nhận hình trong phân tích chữ, chưa cần dùng riêng trong một câu hội thoại. Tên đồ ăn hằng ngày như 米饭、面条 phải học theo từ thực.',
  'Trong cách giải thích 兼 của CUHK, hai thành phần 禾 đi với hình bàn tay. Không vì cùng hình mà mọi chữ có 禾 đều mang nghĩa lúa chín cúi đầu.',
  '禾 hé là ngũ cốc; 和 hé là hòa/và trong những cách dùng tương ứng. Cùng cách đọc không cho phép viết thay nhau.',
  '“Hòa” ở đây ít dùng độc lập trong tiếng Việt; “hòa bình” dùng 和, không dùng 禾.',
  [['“禾”和“和”读音相同，意思不同。','“Hé” hé “hé” dúyīn xiāngtóng, yìsi bùtóng.','“禾” và “和” có cách đọc giống nhau nhưng nghĩa khác nhau.'],['这个字左边有一个“禾”。','Zhè ge zì zuǒbian yǒu yí ge “hé”.','Bên trái chữ này có một thành phần “禾”.']],
  [['CUHK · 兼',cu('兼')]],'modesty',true);
 add('又','yòu','hựu','Lại, thêm một lần; còn dùng trong mẫu vừa…vừa…',
  '又 thường đặt một lần lặp trong sự việc đã xảy ra hoặc đã thành tình hình: 又来了. Trong 又高又大, hai đặc điểm cùng được nêu.',
  'Hình bàn tay trong phân tích chữ cổ và từ 又 yòu nghĩa “lại” hôm nay thuộc hai việc cần phân biệt: nguồn gốc hình chữ và cách dùng hiện đại.',
  '他又来了 nói anh ấy lại đến rồi; 请明天再来 mời ngày mai đến lại. Đừng biến 又 = quá khứ, 再 = tương lai thành quy tắc tuyệt đối; xem loại sự việc và cấu trúc.',
  '“Hựu” là âm đối chiếu hiếm trong đời sống. Dùng cặp 又来/再来 để nhớ chức năng hiệu quả hơn.',
  [['我又忘了带书。','Wǒ yòu wàng le dài shū.','Tôi lại quên mang sách rồi.'],['这家饭店又便宜又好吃。','Zhè jiā fàndiàn yòu piányi yòu hǎochī.','Nhà hàng này vừa rẻ vừa ngon.']],
  [['CUHK · 兼',cu('兼')]],'modesty',true);
 add('满招损，谦受益','mǎn zhāo sǔn, qiān shòu yì','mãn chiêu tổn, khiêm thụ ích','Tự mãn chuốc thiệt hại, khiêm nhường nhận lợi ích.',
  'Lời dẫn cổ dùng để khuyên đừng tự mãn; có thể gặp trong bài viết giáo dục. Không phải một câu giao tiếp phải thuộc để gọi món hoặc hỏi đường.',
  'Hai vế song song: 满/谦 nêu thái độ, 招/受 là hai động từ khác nhau, 损/益 nêu mất–được. Chữ 满 ở đây được hiểu là tự mãn, không phải mọi vật chứa đầy đều xấu.',
  '“Bông lúa cúi đầu” là liên tưởng ghi nhớ trong ảnh; nguồn câu là Thượng thư · Đại Vũ mô. Liên tưởng ấy không chứng minh từ nguyên của 谦.',
  'Các từ tổn hại, thụ hưởng, ích lợi giúp nhận chữ, nhưng cả câu cần diễn nghĩa tự nhiên như trên.',
  [['老师用“满招损，谦受益”提醒我们不要自满。','Lǎoshī yòng “mǎn zhāo sǔn, qiān shòu yì” tíxǐng wǒmen bú yào zìmǎn.','Thầy/cô dùng câu “tự mãn chuốc thiệt, khiêm nhường được lợi” để nhắc chúng tôi đừng tự mãn.'],['我还没完全学会，应该再听听别人的意见。','Wǒ hái méi wánquán xuéhuì, yīnggāi zài tīngting biérén de yìjiàn.','Tôi vẫn chưa học thạo hoàn toàn, nên nghe thêm ý kiến người khác.']],
  [['Bộ GD Đài Loan · 滿招損，謙受益','https://dict.revised.moe.edu.tw/dictView.jsp?ID=29842']],'modesty',true);
 add('一日为师，终身为父','yí rì wéi shī, zhōngshēn wéi fù','nhất nhật vi sư, chung thân vi phụ','Một ngày làm thầy, cả đời coi như cha — lời đề cao nghĩa thầy trò.',
  'Đọc như một câu tục ngữ có hoàn cảnh văn hóa. Không suy từ đó rằng mọi thầy là cha ruột hoặc mọi người phải đồng ý vô điều kiện với thầy.',
  '为 wéi nối vai làm/là trong hai vế; khác wèi trong 为你 và 因为. 一日 và 终身 đặt một quãng ngắn cạnh một đời để nhấn nghĩa tình kéo dài.',
  'Bộ GD Đài Loan dẫn câu này trong Tây du ký, hồi 31. Đây là một chứng cứ văn bản cụ thể, chưa tự chứng minh đó là lần đầu câu được tạo ra.',
  'Vi đọc wéi ở đây, không theo wèi của một số từ quen. 师父 là danh xưng, còn 为父 trong câu là một phần lời ví quan hệ.',
  [['中文里有“一日为师，终身为父”这句话。','Zhōngwén lǐ yǒu “yí rì wéi shī, zhōngshēn wéi fù” zhè jù huà.','Trong tiếng Trung có câu “một ngày làm thầy, cả đời coi như cha”.'],['我很感谢老师，也愿意提出自己的问题。','Wǒ hěn gǎnxiè lǎoshī, yě yuànyì tíchū zìjǐ de wèntí.','Tôi rất biết ơn thầy/cô và cũng sẵn lòng nêu câu hỏi của mình.']],
  [['Bộ GD Đài Loan · 一日為師，終身為父','https://dict.revised.moe.edu.tw/dictView.jsp?ID=149751']],'teacher',true);
 const list=window.HAN_DATA.words;
 for(const [i,r] of records.entries()){
  let w=list.find(w=>w.han===r.han);
  if(!w){w={id:'IMG26-'+(i+1),han:r.han,py:r.py,hv:r.hv,meaning:r.meaning,gloss:r.meaning,category:'Tư liệu bạn gửi · '+(r.article==='teacher'?'Thầy và sư':'Khiêm và kiêm'),extra:r.extra,note:r.usage};list.push(w);}
  const s={...r,key:'supplied:'+w.id,lesson:null};w.usageStudies=[s];w.studyExamples=r.examples;w.suppliedTopic=r.article;
  window.HAN_STUDIES.set(r.han,{lead:r.usage,body:[r.formation,r.contrast,r.bridge],links:r.links,article:r.article});
 }
 window.HAN_DATA.meta.total=list.length;
 const G=window.HAN_CHARACTER_GRAPH_DATA;
 G.formations.push(['谦','讠','兼','謙']);
 Object.assign(G.readings,{师:['shī','sư','Thầy; trong 老师、厨师'],師:['shī','sư','Phồn thể của 师'],谦:['qiān','khiêm','Khiêm nhường; trong 谦虚'],謙:['qiān','khiêm','Phồn thể của 谦'],兼:['jiān','kiêm','Cùng đảm nhiệm; trong 兼任'],言:['yán','ngôn','Lời nói; dạng 讠 khi ở bên trái nhiều chữ giản thể'],禾:['hé','hòa','Ngũ cốc; chữ/thành phần mở rộng'],又:['yòu','hựu','Lại; hình tay trong một số phân tích chữ cổ'],父:['fù','phụ','Cha; trong 父亲、师父'],傅:['fù','phó','Gặp trong 师傅'],虚:['xū','hư','Trong 谦虚 khiêm tốn, 虚心 cầu thị']});
 G.bridges.师=[['sư phạm','师范','shīfàn','Nối cùng chữ 师; từ mở rộng'],['sư phụ','师父','shīfu','Thầy truyền dạy theo ngữ cảnh']];
 G.bridges.谦=[['khiêm hòa','谦和','qiānhé','Khiêm nhường, ôn hòa']];
 G.bridges.兼=[['kiêm nhiệm','兼任','jiānrèn','Cùng đảm nhiệm nhiều vai']];
 window.HAN_SUPPLIED_STUDIES={records,topics:['teacher','modesty']};
})();
