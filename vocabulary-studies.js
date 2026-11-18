(() => {
 'use strict';
 const studies=new Map();
 const han='https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=';
 const add=(word,lead,body,links=[],article='')=>studies.set(word,{lead,body,links,article});
 const link=(label,char)=>[label,han+encodeURIComponent(char)];
 add('上','上 shàng là “thượng” trong thượng tầng. Hình 上 và 下 được Hứa Thận nêu làm ví dụ chỉ sự. Với nét dài làm mốc, phần ngắn nằm phía trên giúp nhận chữ 上.',
  ['Đặt cùng chữ vào ba khung. 椅子上 đặt 上 sau chiếc ghế để chỉ vị trí. 上火车 đặt 上 trước tên phương tiện, thành hành động lên tàu. 上中学 là theo học trung học. Khi đọc, giữ cả cụm trong mắt rồi chọn nghĩa.',
   'So 我上火车 với 我坐火车去北京. Câu đầu kể lúc lên tàu. Câu sau cho biết phương tiện đi Bắc Kinh. Tự hỏi “đang bước lên hay đang nói đi bằng gì?” sẽ giúp chọn 上 hoặc 坐.'],[],'shuowen');
 add('火车','火车 huǒchē là “hỏa xa”. 火 là hỏa trong hỏa hoạn, 車 là xa trong xa lộ. Chữ giản thể của 車 là 车. Khi nhìn biển hoặc văn bản cũ, bạn có thể gặp 火車.',
  ['Dạng cổ của 火 vẽ ngọn lửa. Dạng cổ của 車 vẽ phương tiện có bánh và trục. Hai chữ ấy ghép thành tên phương tiện 火车. Trong cách dùng hôm nay, 火车 vẫn gọi tàu hỏa khi đầu máy dùng điện.',
   '我们上火车吧。Wǒmen shàng huǒchē ba. Chúng ta lên tàu đi. Sau khi lên, nói 我们坐火车去北京. Nếu kể tàu khởi hành, đổi chủ ngữ thành 火车开了.'],[link('CUHK · 火','火'),link('CUHK · 車','車')]);
 add('中午','中午 zhōngwǔ nối với “trung ngọ”. 中 chỉ giữa, 午 là ngọ, như giờ Ngọ. Trong lời nói hiện đại, 中午 gọi khoảng buổi trưa.',
  ['Bạn đã có 上午 và 下午. Thêm 中午 vào giữa thành 上午 → 中午 → 下午. Hai chữ 午 giống nhau trong cả ba từ, còn vị trí của 上、中、下 phân biệt các khoảng trong ngày.',
   '火车中午十二点开。Huǒchē zhōngwǔ shí’èr diǎn kāi. Tàu chạy lúc 12 giờ trưa. 十二点 là mốc giờ, 中午 giúp người nghe chọn giữa trưa thay vì nửa đêm.']);
 add('开','开 kāi nối với chữ “khai” trong khai trương, khai giảng. Chữ phồn thể là 開. Nhìn cả 開 để nhận ra khung 門, dạng chữ “môn” còn thấy trên nhiều hoành phi.',
  ['开门 là mở cửa. 开车 là lái xe. Với 火车开了, chủ thể là tàu nên 开 nói tàu chạy hoặc khởi hành. Gạch dưới chủ ngữ trước khi dịch sẽ giúp bạn tránh đọc thành “tàu lái xe”.',
   '我开车去饭店。Wǒ kāichē qù fàndiàn. Tôi lái xe đi nhà hàng. 我坐车去饭店 đổi vai người đi thành hành khách, dù điểm đến giữ nguyên.']);
 add('有些','有些 yǒuxiē chỉ một số trong một tập hợp. Có thể chia từ thành 有 + 些 để nhận mặt, rồi học hai vị trí mà cả cụm thường xuất hiện.',
  ['有些学生在写字 nói một số học sinh đang viết. Sau 有些 là danh từ 学生. 今天有些晚了 nói hôm nay hơi muộn, sau 有些 là tính từ 晚. Cùng mặt chữ nhưng phần đi sau đổi cách hiểu.',
   'Hãy lấy một cảnh có mười học sinh. 有些学生在写字 chọn ra một phần của nhóm. Muốn kể tiếp nhóm còn lại làm gì, dùng 有的在写字，有的在看书.']);
 add('有的','有的 yǒu de thường chọn một phần của nhóm đã rõ. 的 ở đây đọc nhẹ. Đọc liền yǒude, rồi dừng ngắn ở ranh giới giữa hai vế.',
  ['学生们在教室里。有的在写字，有的在看书. Câu đầu đặt ra tập hợp học sinh, hai vế sau chọn các nhóm trong tập hợp ấy. Bạn có thể phục hồi nghĩa “có bạn” mà bản chữ không lặp 学生.',
   'So 有些学生 với 有的. 有些学生 tự nêu danh từ. 有的 có thể đứng riêng khi người nghe biết đang nói về nhóm nào. Đừng học 的 tách khỏi cụm để cố dịch nó thành một từ tiếng Việt ở mọi câu.']);
 add('了','了 le đọc nhẹ trong các câu bạn đang luyện. Hãy tìm hai vị trí trước khi chọn nghĩa. 写了一封信 đặt 了 sau hành động 写. 太晚了 đặt 了 ở cuối nhận xét.',
  ['我写了一封信 kể hành động viết thư đã được thực hiện. 明天写了信再去 đặt việc viết xong trước một việc khác trong tương lai. Vì vậy, khi thấy 了, hãy tìm cả mốc thời gian của câu.',
   '太晚了 báo tình hình hiện tại đã muộn. 我不去了 báo thay đổi ý định “tôi không đi nữa”. 我没去 kể rằng việc đi đã không diễn ra hoặc chưa diễn ra. Thử dịch hai câu cuối thành hai tình huống khác nhau.']);
 add('写','写 xiě là chữ “tả” trong miêu tả, tả thực. Dạng phồn thể 寫 có nhiều nét hơn. Trong các từ tiếng Việt ấy, “tả” đã đi vào nghĩa diễn đạt, khắc họa.',
  ['写字 là viết chữ nói chung. 写汉字 nói rõ hệ chữ. 写汉语 cần ngữ cảnh về việc viết bằng tiếng Trung, còn bài luyện mặt chữ của bạn dùng 写汉字 trực tiếp hơn.',
   '她在写汉字。Tā zài xiě Hànzì. Cô ấy đang viết chữ Hán. Hãy đọc theo ba khối 她 / 在写 / 汉字 để giữ người làm, hành động đang diễn ra và đối tượng.'],[],'viet-couplets');
 add('都','都 dōu trong 他们都来 là “đều”. Cùng chữ đó trong 首都 shǒudū đọc dū, nghĩa thủ đô. Chọn âm theo từ và câu đang dùng.',
  ['他们都听见了 nói mọi người thuộc nhóm 他们 đều nghe thấy. 有些人听见了 chỉ xác nhận một số người nghe thấy. Khoanh nhóm người trước, rồi xem 都 đang bao phủ nhóm nào.',
   '他们都不去 là tất cả đều không đi. 他们不都去 là không phải tất cả đều đi. Vị trí 不 thay đổi điều bị phủ định. Đọc chậm hai câu và thử vẽ ba người để kiểm tra.']);
 add('听见','听见 tīngjiàn ghép 听, nghe, với 见, kết quả nghe thấy. “Kiến” trong kiến thức, kiến giải nối với chữ 見. Chữ 見 có dạng giản thể 见.',
  ['Dạng cổ 見 nhấn con mắt trên hình người, mang nghĩa nhìn thấy. Trong 听见 hiện đại, 见 làm bổ ngữ kết quả cho hành động nghe. Học cả cấu trúc giúp bạn nhận 看见, nhìn thấy, rồi so 听懂, nghe hiểu.',
   '我在听，可是没听见. Tôi đang nghe, nhưng không nghe thấy. Có thể người kia nói nhỏ hoặc âm thanh bị che. Tôi đã chú ý nghe và tôi đã nghe được là hai thông tin có thể tách nhau trong một câu.'],[link('CUHK · 見','見')],'shuowen');
 add('不要','不要 bú yào có hai cách dùng rất hay gặp. Đứng trước hành động, nó có thể là lời ngăn. Đứng trước món được mời, nó có thể là lời từ chối.',
  ['不要说话 là đừng nói chuyện. 我不要茶 là tôi không lấy trà. Giữ cả chữ 我 và tân ngữ 茶 khi đọc câu thứ hai để biết người nói đang từ chối cho mình.',
   '不 có âm từ điển bù. Trước 要 yào thanh 4, nó thường đọc bú. Thử đọc bú yào thành một cụm. Muốn lời nhắc nhẹ hơn, dùng 请不要说话 với giọng phù hợp.']);
 add('说话','说话 shuōhuà nối với “thuyết” và “thoại”. Bạn gặp “thuyết” trong thuyết minh, “thoại” trong đối thoại, điện thoại. Dạng phồn thể là 說話, cả hai chữ đều có 言.',
  ['Trong 說, 言 liên quan lời nói, 兌 tham gia gợi âm theo phân tích chữ cổ. Giản thể thu 言 thành 讠. Nhận cùng phần bên trái trong 说、话、请、语 giúp bạn gom một nhóm về lời nói và ngôn ngữ.',
   '他们在说话 cho biết họ đang nói chuyện. 他们说汉语 cho biết họ dùng tiếng Trung. 他说“不要说话” là anh ấy nói câu “đừng nói chuyện”. Mỗi câu cho 说 một phần đi sau khác nhau.'],[link('CUHK · 說','說')]);
 add('听','听 tīng là hoạt động nghe, như 听老师说话. Dạng phồn thể tương ứng là 聽. Khi đọc tài liệu Hán Nôm, nhận được 聽 sẽ giúp nối về chữ nghe bạn đã học.',
  ['Học theo chuỗi 听 → 听见 → 听懂. 我在听 xác nhận tôi đang nghe. 我听见了 xác nhận âm thanh đã đến tai. 我听懂了 xác nhận tôi đã hiểu nội dung.',
   '请听老师说话。Qǐng tīng lǎoshī shuōhuà. Hãy nghe thầy cô nói. Trong cụm 老师说话, người nói là 老师, còn người thực hiện 听 là người đang được nhắc.'],[],'shuowen');
 add('那些','那些 nàxiē là những người hoặc vật kia. Tách 那, kia, và 些, số nhiều không xác định, rồi nối với 这些 zhèxiē, những người hoặc vật này.',
  ['那些学生 giữ danh từ ở phía sau. 那些是小学生 dùng 那些 thay cho nhóm người đang được chỉ, rồi 是 giới thiệu nhóm ấy là học sinh tiểu học.',
   '那 nà có thanh 4, 哪 nǎ có thanh 3. 那些是哪儿的学生？ hỏi những bạn kia là học sinh ở đâu. Trong cùng câu, 那些 chỉ nhóm đã thấy, 哪儿 đặt câu hỏi về địa điểm.']);
 add('字','字 zì là “tự” trong Hán tự, văn tự, tự điển. Trong bản tự điển cổ, Hứa Thận giải 字 theo nghĩa sinh con, nhìn 子 dưới 宀 và coi 子 đồng thời góp âm.',
  ['Trong 写字 hôm nay, 字 chỉ đơn vị chữ viết. 汉字 chọn loại chữ, còn 生字 là chữ mới hoặc chưa biết đối với người học. Nhìn 字 ở cuối mỗi từ rồi tìm phần đứng trước đang giới hạn nghĩa ra sao.',
   '这个字怎么写？Zhège zì zěnme xiě? Chữ này viết thế nào? Khi đọc câu đối 平安二字, 二字 cũng đếm chữ. Người Việt đọc “bình an nhị tự”, và “hai chữ bình an” đã thành cách nói quen.'],[link('CUHK · 字','字')],'viet-couplets');
 add('汉语','汉语 Hànyǔ là Hán ngữ, tức tiếng Hán. Dạng phồn thể 漢語. Chữ 语 là “ngữ” trong ngôn ngữ, ngoại ngữ, ngữ pháp.',
  ['Đối chiếu 汉语 với 汉字. 汉语 là ngôn ngữ nên bạn có thể 听汉语, 说汉语. 汉字 là chữ viết nên có thể 看汉字, 写汉字. Một người nói thạo vẫn có thể phải học thêm mặt chữ.',
   '我学汉语，也学写汉字。Wǒ xué Hànyǔ, yě xué xiě Hànzì. Tôi học tiếng Trung, đồng thời học viết chữ Hán. Hai vế gọi đúng hai việc bạn đang luyện.']);
 add('汉字','汉字 Hànzì nối trực tiếp với “Hán tự”. 汉 giới hạn hệ chữ, 字 là chữ viết. Trong 漢字 phồn thể, chữ 字 vẫn giữ mặt như trong giản thể.',
  ['Hán tự ở Việt Nam được đọc bằng âm Hán Việt trong truyền thống Hán học. Chẳng hạn 和 trong câu đối đọc “hòa”, còn khi luyện Quan thoại bạn đọc hé. Một chữ có thể nối hai truyền thống âm đọc.',
   '我会写这个汉字。Wǒ huì xiě zhège Hànzì. Tôi biết viết chữ Hán này. Đổi 写 thành 读 khi muốn nói biết đọc. Đổi 汉字 thành 汉语 khi hỏi về khả năng nói một ngôn ngữ.'],[],'viet-couplets');
 add('明年','明年 míngnián là năm sau. 明 là “minh” trong bình minh, minh bạch. 年 là “niên” trong niên học, niên đại, tân niên.',
  ['Dạng hiện đại 明 có 日 và 月. Thuyết văn còn ghi dạng 朙 với 月 và 囧, và tư liệu chữ cổ có nhiều cách viết. Nhớ 日–月 giúp nhận hình hiện tại. Trong 明年, hãy học 明 ở nghĩa “kế tiếp” cùng với 明天.',
   '她明年上小学。Tā míngnián shàng xiǎoxué. Năm sau cô bé vào tiểu học. Năm mới là 新年 xīnnián, âm Hán Việt “tân niên”. Hai từ phân biệt năm tiếp theo trên lịch với năm mới trong lời chúc.'],[link('CUHK · 明','明'),link('CUHK · 年','年')],'viet-couplets');
 add('中学','中学 zhōngxué là trung học. 中 đứng trước 学 để giới hạn bậc học. Dạng phồn thể 中學 thường dễ gặp khi đọc tên trường hoặc văn bản cũ.',
  ['So 小学 → 中学 → 大学. Đổi 小、中、大 để đổi bậc. Thêm 生 vào sau để gọi người học, như 中学生. Đây là việc ghép các chữ thành từ.',
   '哥哥在上中学。Gēge zài shàng zhōngxué. Anh trai đang học trung học. Nếu bỏ 上 thành 哥哥在中学, câu thiên về địa điểm anh ấy ở.']);
 add('小学','小学 xiǎoxué là tiểu học trong 上小学. 小 là “tiểu” trong tiểu đội, 学 là “học”. Thêm 生 thành 小学生, học sinh tiểu học.',
  ['Trong sách truyền thống, 小學 còn có cách dùng gọi ngành nghiên cứu văn tự, âm vận, chú giải. Trang 11 bản PDF bạn gửi dùng nghĩa ấy. Tìm những từ quanh nó như 字、音、義 sẽ giúp nhận văn cảnh nghiên cứu.',
   '弟弟在上小学。Dìdi zài shàng xiǎoxué. Em trai đang học tiểu học. Giữ câu này làm mốc dùng đời thường, rồi thêm nghĩa chuyên ngành khi gặp văn bản cổ.'],[],'shuowen');
 add('中学生','中学生 zhōngxuéshēng là trung học sinh. Chia theo hai tầng 中学 + 生. Tầng đầu gọi bậc học, tầng sau gọi người theo học.',
  ['So 中国学生 và 中学生. 中国学生 là học sinh Trung Quốc, có chữ 国. 中学生 là học sinh trung học. Đọc đủ từng chữ giúp bạn tránh chọn nghĩa chỉ vì thấy 中 ở đầu.',
   '他们都是中学生。Tāmen dōu shì zhōngxuéshēng. Họ đều là học sinh trung học. Đặt 都 sau 他们 để phạm vi “đều” bao phủ nhóm đang nói đến.']);
 add('小学生','小学生 xiǎoxuéshēng là tiểu học sinh. 小学 gọi trường hoặc bậc, 小学生 gọi người học. Sinh trong học sinh cũng là chữ 生 này.',
  ['Ghép 我是小学生 và 我在小学. Câu đầu trả lời tôi là ai. Câu sau trả lời tôi ở đâu. Chọn 是 để giới thiệu thân phận, 在 để xác định vị trí.',
   '那些是小学生，她们在写字。Nàxiē shì xiǎoxuéshēng, tāmen zài xiě zì. Những bạn kia là học sinh tiểu học, các bạn ấy đang viết chữ. 她们 cho biết nhóm được nhắc trong câu này là nữ.']);
 add('他们','他们 tāmen gọi nhóm nam hoặc nhóm có cả nam và nữ. Chữ 他 có 亻 bên trái. Phần 们 là 們 ở dạng phồn thể, có 門 gợi âm lịch sử.',
  ['们 là hậu tố số nhiều trong nhóm đại từ này. Trong 他们都来, 他们 tạo nhóm người còn 都 cho biết mỗi người trong nhóm đều đến.',
   '他们、她们、它们 cùng đọc tāmen. Chỉ nghe một âm tāmen chưa đủ để chọn chữ đầu, cần biết đoạn trước nói về người hay vật và nhóm nào.']);
 add('她们','她们 tāmen dùng cho nhóm nữ. Bạn đã gặp 女 trong 女朋友、女士. Bên trái 她 cũng là 女, nên mặt chữ cho một dấu hiệu phân biệt với 他.',
  ['她们是我的朋友 nói nhóm nữ ấy là bạn của tôi. 她们都是我的朋友 thêm ý tất cả thành viên nhóm đều là bạn. 们 lập nhóm, 都 xác nhận toàn bộ nhóm.',
   '她们都在写汉字。Tāmen dōu zài xiě Hànzì. Các bạn nữ đều đang viết chữ Hán. Khi nghe câu này mà chưa có bối cảnh, âm tāmen vẫn có thể ứng với 他们.']);
 add('它们','它们 tāmen nhắc lại nhóm đồ vật hoặc động vật trong cách dùng đang học. Nhớ mặt 它, rồi đối chiếu với 他 và 她 khi chép chính tả.',
  ['那些是小猫，它们都在睡觉. Câu đầu giới thiệu mèo, 它们 nối về nhóm ấy. Nếu trước đó đang nói về hai quyển sách, 它们 có thể nhắc lại hai quyển sách.',
   'Đọc một đoạn và gạch chân danh từ mà 它们 quay lại thay thế. Khi từ đó đã rõ, bạn có thể theo câu tiếp theo mà không phải dịch tāmen sang “họ” một cách tự động.']);
 add('晚','晚 wǎn là “vãn” trong vãn niên. Phần 日 bên trái là một dấu hiệu liên quan thời gian. Học hai cụm rất quen 晚上, buổi tối, và 太晚了, muộn quá.',
  ['晚上六点半 dùng 晚 trong tên khoảng thời gian. 我们来晚了 dùng 晚 sau 来 để nói kết quả đến muộn. Chỉ thấy cùng một chữ chưa đủ biết nó đang gọi buổi tối hay đánh giá trễ.',
   '我们晚上来，不会太晚。Wǒmen wǎnshang lái, bú huì tài wǎn. Chúng tôi đến buổi tối, sẽ không quá muộn. Hai lần 晚 làm hai việc khác nhau.']);
 // Earlier input lists. These explanations concern modern compounds and usage.
 const older=[
 ['手机','手机 shǒujī ghép 手, tay, với 机, máy. Cầu Hán Việt là “thủ” trong thủ công, “cơ” trong cơ khí. Trong tên thiết bị hiện đại này, 手 giới hạn loại máy mang theo dùng bằng tay.',
  'Khi đặt câu hỏi, 手机 hướng tới thiết bị, còn 手机号 hướng tới số liên lạc. 你有手机吗？ hỏi có điện thoại không. 你的手机号是多少？ hỏi số điện thoại. Trong số điện thoại, đọc từng chữ số và giữ số 0.'],
 ['电话','电话 diànhuà nối với “điện thoại”. Dạng phồn thể 電話. Điện trong điện lực, thoại trong đối thoại giúp bạn nhận hai phần của từ.',
  'Đặt 打 trước 电话 thành hành động gọi. Đặt 给 + người trước 打电话 để nói gọi cho ai. 手机 chỉ rõ thiết bị di động, còn 电话 có thể nói điện thoại hoặc cuộc gọi tùy câu.'],
 ['号','号 hào có dạng phồn thể 號. Âm “hiệu” còn thấy trong quốc hiệu, niên hiệu. Trong 手机号, chữ này gọi số dùng để nhận diện điện thoại.',
  '今天几号？ hỏi ngày mấy. 你的手机号是多少？ hỏi số liên lạc. 十三号 đọc ngày 13 theo số thông thường, còn số điện thoại đọc từng chữ số.'],
 ['明天','明天 míngtiān là ngày mai. Đặt 明天 cạnh 明年 để nhớ phần 明 mang nghĩa kế tiếp trong hai từ thời gian này.',
  '天 đổi sang 年 là đổi đơn vị ngày sang năm. 我明天去 và 我明年去 cùng một khung, nhưng hai lời hẹn xa nhau rất nhiều.'],
 ['去','去 qù là đi tới đích theo điểm nhìn cuộc nói chuyện. Môi tròn cho âm ü sau q, dù pinyin viết u.',
  '去超市 là đi siêu thị. 在超市 là đang ở siêu thị. Chọn 去 khi kể hành động đi, 在 khi xác định chỗ. 我去那儿 và 我在那儿 trả lời hai câu hỏi khác nhau.'],
 ['哪儿','哪儿 nǎr hỏi ở đâu hoặc đi đâu. 哪 có 口 bên trái, 那 làm phần gợi âm. Nhìn thêm 口 để phân biệt với 那 trong 那儿.',
  '你去哪儿？ hỏi đích đến. 你在哪儿？ hỏi vị trí. Đổi 哪 nǎ thành 那 nà để chuyển từ hỏi sang chỉ chỗ kia.'],
 ['想','想 xiǎng là “tưởng” trong tưởng tượng. Nhận 心 ở dưới để nối nhóm từ về suy nghĩ, mong muốn. 相 nằm trên, góp âm lịch sử.',
  '我想去超市 nói mong muốn đi. 我在超市 nói hiện đang ở đó. 我想买东西 chưa xác nhận việc mua đã diễn ra. Muốn kể đã mua, dùng 我买了东西.'],
 ['超市','超市 chāoshì gồm 超, siêu, và 市, thị. “Siêu thị” là cầu Hán Việt trùng với tên đồ vật trong tiếng Việt.',
  '市 là thị trong đô thị, thị trường. 去超市 nói đi đến siêu thị. 在超市买水果 thêm chỗ mua trước hành động 买. 商店 gọi cửa hàng rộng hơn, không mặc định quy mô siêu thị.'],
 ['买','买 mǎi là “mãi” trong mãi lực. 卖 mài là “mại” trong thương mại. Nhìn mặt giản thể, 卖 có phần 十 ở trên để phân biệt.',
  '我买面包 là tôi mua. 这家商店卖面包 là cửa hàng bán. Khi nghe, thanh 3 mǎi và thanh 4 mài giúp xác định bên mua hay bên bán.'],
 ['东西','东西 dōngxi là đồ vật. 西 thường đọc nhẹ trong từ này. Với phương hướng “đông–tây”, hai chữ đọc dōng xī và có nghĩa khác.',
  '我买东西 kể tôi mua đồ. Tôi đã nói loại hành động nhưng chưa chỉ món. 我买了这些东西 chọn đúng nhóm đồ này, còn 那些东西 ở phía kia.'],
 ['些','些 xiē đi với 这、那、有、一 thành 这些、那些、有些、一些. Học nó trong cả cụm để nhớ số nhiều hoặc một lượng không xác định.',
  '一些学生 là một số học sinh. 这些学生 là những học sinh này. 两个学生 cho con số chính xác. Ba cụm chọn cùng loại đối tượng bằng ba cách khác nhau.'],
 ['牛奶','牛奶 niúnǎi ghép 牛, ngưu, với 奶, sữa. “Ngưu” còn gặp trong ngưu lang. Nghĩa cả từ là sữa bò.',
  '一杯牛奶 dùng 杯 đo một cốc. 一个杯子 đếm đồ vật cái cốc. 喝牛奶 nói uống sữa, 买牛奶 nói mua sữa.'],
 ['吃','吃 chī là ăn trong 吃饭、吃包子. Chữ có 口 bên trái để nhận nhóm liên quan miệng.',
  '吃药 là dùng thuốc uống, còn 喝水 là uống nước. Học theo kết hợp có sẵn. Hỏi đã ăn sáng chưa dùng 你吃早饭了吗？'],
 ['晚饭','晚饭 wǎnfàn ghép 晚, tối, với 饭, cơm hoặc bữa ăn. Dạng phồn thể 飯 giữ phần 食 liên quan ăn uống.',
  '早饭、中饭/午饭、晚饭 gọi ba bữa. 今天晚饭你想吃什么？ hỏi món muốn ăn cho bữa tối, không hỏi tối nay mấy giờ.'],
 ['那边','那边 nàbiān là phía kia. 边 là “biên” trong biên giới, biên cương. Dạng phồn thể 邊 giúp nhận biển hoặc chữ cũ.',
  '去那边买东西 lấy phía kia làm đích. 那边的东西 dùng 的 nối đồ vật với chỗ. 那边有一家商店 giới thiệu cửa hàng xuất hiện trong vùng được chỉ.'],
 ['包子','包子 bāozi là bánh bao, 子 đọc nhẹ. 包 còn xuất hiện trong 面包, bánh mì, nhưng hai tên món cần học nguyên từ.',
  '吃包子 là ăn bánh bao. Làm bánh bao là 做包子. Học thêm 包 trong họ 抱、饱、跑 để nhận thành phần gợi âm, rồi nhớ riêng bāo、bào、bǎo、pǎo.'],
 ['非常','非常 fēicháng thường chỉ mức độ rất, như 非常好吃. Hán Việt “phi thường” trong tiếng Việt thường nhấn khác thường, xuất chúng.',
  '非常忙 là rất bận, có thể là chuyện thường ngày. 非常好吃 là rất ngon. Đừng đưa sắc thái “phi thường” của tiếng Việt vào mọi câu chứa 非常.'],
 ['好吃','好吃 hǎochī là ngon, xét đồ ăn. 好 đứng trước hành động 吃 để đánh giá ăn thấy dễ chịu.',
  '好听 hǎotīng đánh giá thứ nghe, 好看 hǎokàn đánh giá thứ nhìn. 面包好吃, 歌很好听, 这件衣服很好看. Thay phần sau 好 theo giác quan đang dùng.'],
 ['米饭','米饭 mǐfàn là cơm nấu từ gạo. 米 là “mễ” trong mễ cốc, 饭 là “phạn” trong cơm áo theo các tổ hợp Hán Việt.',
  '米 nói gạo, 米饭 nói cơm. 吃饭 có thể chỉ ăn bữa nói chung. 我不吃米饭 chỉ loại trừ cơm, chưa nói tôi không ăn món nào khác.'],
 ['怎么','怎么 zěnme hỏi cách làm. Chữ 么 thường đọc nhẹ, nên giữ nhịp zěn-me ngắn gọn.',
  '这个字怎么写？ hỏi cách viết chữ. 我们怎么去？ hỏi cách đi. 怎么样 hỏi thế nào, như 味道怎么样？ hỏi đánh giá mùi vị.'],
 ['坐','坐 zuò là “tọa” trong tọa đàm. 坐出租车 dùng 坐 để nói đi bằng taxi, còn 请坐 mời ngồi.',
  '做 cũng đọc zuò nhưng nghĩa làm. Dùng 我坐车去饭店 khi là hành khách, 我开车去饭店 khi lái xe. Đối chiếu chữ 土 của 坐 với 亻 ở 做 để nhận mặt hiện đại.'],
 ['出租车','出租车 chūzūchē là xe cho thuê chở khách, tức taxi trong bài này. 车 là “xa”, như hỏa xa. Dạng phồn thể 出租車.',
  '坐出租车去饭店 ghép phương tiện và đích. Nếu nhờ tài xế chở đến nhà hàng, có thể mở bằng 请去西安饭店. Người lên xe cần biết tên điểm đến, chưa cần tách tên ấy thành một câu.'],
 ['西安饭店','西安饭店 Xī’ān Fàndiàn là tên nhà hàng/khách sạn trong bài. 西安 là Tây An, 饭店 là phạn điếm khi đối chiếu Hán Việt.',
  'Dấu tách trong Xī’ān giữ hai âm xī và ān, tránh đọc thành xiān. 去西安饭店 và 在西安饭店 lần lượt nói đi đến và ở tại địa điểm này.'],
 ['杯子','杯子 bēizi là cái cốc. 子 đọc nhẹ. 杯 là “bôi”, như giao bôi trong ngữ cảnh lễ cưới.',
  '一个杯子 đếm đồ vật. 一杯茶 đo đồ uống bằng một cốc. Khi mua cốc, bạn có thể nói 买一个杯子. Khi gọi nước, 请给我一杯茶.'],
 ['售货员','售货员 shòuhuòyuán tách thành 售货, bán hàng, và 员, người làm công việc ấy. 员 là “viên” trong nhân viên, thành viên.',
  'So 服务员, nhân viên phục vụ. Ở quán, gọi 服务员 để nhờ mang trà. Khi nói công việc bán hàng, 售货员 xác định vai nghề rõ hơn.'],
 ['这边','这边 zhèbiān là phía này. 边 là biên như trong biên giới. Đổi 这 thành 那 để được 那边.',
  '请来这边 lấy phía người nói chỉ làm đích đến. 这边有椅子 cho biết phía này có ghế. 来 và 有 đặt cùng địa điểm vào hai loại câu khác nhau.'],
 ['钱','钱 qián là tiền, chữ phồn thể 錢. Nhận 金/钅 liên quan kim loại trong hình chữ, rồi học 钱 như tên tiền nói chung.',
  '多少钱？ hỏi bao nhiêu tiền. 三十元 là số tiền với đơn vị. 钱 không tự xác định loại tiền của quốc gia, cần biết giá đang được niêm yết theo đơn vị nào.'],
 ['这些','这些 zhèxiē là những cái/người này. 这 chỉ gần, 些 cho số nhiều không chính xác.',
  '这些苹果多少钱？ hỏi giá nhóm táo này. 这一个苹果 hỏi riêng một quả. 那些苹果 chuyển sang nhóm kia. Hãy dùng tay chỉ ba nhóm khi luyện nói.'],
 ['这儿','这儿 zhèr là ở đây, 这里 zhèlǐ là cách nói tương đương thường dùng. 这 đọc thanh 4.',
  '我在这儿。Tôi ở đây. 你来这儿吧。Bạn đến đây đi. 在 xác định vị trí hiện tại, 来 mời thực hiện chuyển động đến chỗ được chỉ.'],
 ['水果','水果 shuǐguǒ là “thủy quả” khi đối chiếu chữ, nghĩa đời thường là trái cây. 果 là quả trong thành quả, kết quả.',
  '水 là thủy trong thủy điện. Học cả từ 水果 rồi nối 果 trong 苹果. 买水果 nêu nhóm mặt hàng, 买苹果 chọn rõ loại trái cây.'],
 ['少','少 shǎo là ít. “Thiểu” trong thiểu số giúp nhớ nghĩa. Chữ 多 duō là nhiều, như đa số.',
  '很少, rất ít, và 多少, bao nhiêu, dùng cùng chữ 少 trong hai cụm khác nhau. 不少 là không ít, thường ngụ ý khá nhiều. Dấu phủ định thay đổi lượng được nhận xét.'],
 ['斤','斤 jīn là “cân”. Trong mua bán ở Trung Quốc đại lục hiện đại, một 斤 bằng 500 g. Nếu mua ở vùng khác, xem đơn vị niêm yết vì độ lớn có thể khác.',
  '一斤苹果 là nửa kilôgam táo trong hệ ấy. 一公斤 là một kilôgam, bằng 两斤. 苹果十元一斤 là táo giá 10 tệ mỗi 斤.'],
 ['苹果','苹果 píngguǒ là táo. 果 đọc guǒ, nghĩa quả, như trong 水果. Bình quả là đối chiếu Hán Việt, còn tên thông dụng trong tiếng Việt là táo.',
  '一个苹果 đếm quả. 一斤苹果 cân khối lượng. Cùng những quả táo, đổi lượng từ sẽ đổi loại thông tin về số lượng bạn đang mua.'],
 ['便宜','便宜 piányi là rẻ trong bài mua sắm. 宜 đọc nhẹ. Chữ 便 còn có âm biàn trong 方便 fāngbiàn, thuận tiện.',
  '这个便宜 hỏi hoặc nhận xét món này rẻ, còn 很方便 nhận xét tiện. 便宜一点儿吧 là đề nghị giảm giá một chút, cần giữ cả cụm và giọng thương lượng.'],
 ['商店','商店 shāngdiàn nối với “thương” trong thương mại và “điếm” trong khách điếm. Đây là cửa hàng.',
  '超市 là một loại nơi mua sắm cụ thể. 这家商店卖衣服 nói cửa hàng này bán quần áo. 家 ở đây là lượng từ cho cơ sở kinh doanh.'],
 ['衣服','衣服 yīfu là quần áo, 服 đọc nhẹ. 衣 là “y” trong y phục. Dạng hai chữ vẫn dễ đối chiếu ở tiếng Việt.',
  '一件衣服 dùng 件 để đếm món quần áo. 穿衣服 là mặc. 买衣服 là mua. Muốn hỏi đẹp hay không, nói 这件衣服好看吗？'],
 ['件','件 jiàn là “kiện” trong sự kiện, điều kiện. Trong 一件衣服 nó là lượng từ đếm món quần áo.',
  'Cùng một chữ 件 dùng trong 一件事, một việc. Sách dùng 一本书. Cốc đồ uống dùng 一杯茶. Học cả số + lượng từ + danh từ thành từng cụm.'],
 ['元','元 yuán là “nguyên” trong nguyên niên. Trong bảng giá, nó là đơn vị tiền. Khẩu ngữ thường dùng 块 kuài cho cùng bậc đơn vị RMB.',
  '3 tệ có hai cách đọc thông dụng sān yuán và 三块 sān kuài. 元 trong 元旦 gọi mốc đầu năm, nên nhìn cả từ để chọn nghĩa.'],
 ['怎么样','怎么样 zěnmeyàng hỏi thế nào, ra sao. 样 yàng là “dạng”. Hai phần 么 và 样 cùng nằm trong từ hỏi cả cụm.',
  '这件衣服怎么样？ hỏi ý kiến về áo. 这个字怎么写？ hỏi phương pháp viết. 怎么样 mở ra một đánh giá, 怎么 + động từ tìm cách làm.'],
 ['贵','贵 guì là “quý” trong quý giá. Khi mua sắm, 太贵了 nói đắt quá.',
  'Hỏi 贵不贵？ để người nghe xác nhận có đắt không. 请问贵姓？ lại dùng 贵 làm kính ngữ khi hỏi họ. Cùng chữ nhưng lời hỏi họ không bàn về giá tiền.'],
 ['穿','穿 chuān là mặc trong 穿衣服. Học cả tổ hợp để nhớ động tác và vật được mặc.',
  '我穿这件衣服 nói tôi mặc món áo này. 这件衣服很贵 đổi chiếc áo lên làm chủ ngữ để nhận xét giá. Người mặc và vật bị đánh giá đổi chỗ theo mục đích câu.'],
 ['女','女 nǚ là “nữ” trong phụ nữ, nữ sinh. Âm ü được viết đủ dấu sau n. Giữ lưỡi ở vị trí i rồi tròn môi khi luyện.',
  '女生 nǚshēng là nữ sinh. 女士 nǚshì là cách xưng gọi phụ nữ lịch sự. Âm Hán Việt “nữ sĩ” trong tiếng Việt còn có nghĩa nữ tác giả, nên học nghĩa sử dụng của cả từ.'],
 ['男','男 nán là “nam”. Nam sinh là 男生 nánshēng. Bạn có thể đối chiếu 女生 để nhớ theo cặp.',
  '男朋友 nánpéngyou thông thường là bạn trai trong quan hệ yêu đương. 一个男性朋友 nói rõ một người bạn là nam khi cần tránh cách hiểu ấy.'],
 ['那儿','那儿 nàr là ở kia. Chỉ đổi 那 nà thành 哪 nǎ là câu hỏi “đâu” trong 哪儿.',
  '你在哪儿？— 我在那儿. Khi luyện, chỉ một điểm làm mốc rồi hỏi và đáp. Tiếp đó đổi 在 sang 去 để hỏi người ấy đi đâu.'],
 ['本','本 běn là “bản” trong căn bản, bản thảo. Hứa Thận giải hình 本 bằng 木 có nét đánh dấu phía dưới, chỉ gốc cây.',
  '一本书 dùng 本 làm lượng từ sách. 木本水源 trong câu đối ở Hội An lấy 本 ở nghĩa gốc. Cùng chữ nối sách bạn đang cầm với lời tưởng nhớ nguồn cội trên từ đường.'],
 ['家','家 jiā là “gia” trong gia đình, gia tộc. 回家 là về nhà. 我家 có thể chỉ nhà tôi hoặc gia đình tôi theo văn cảnh.',
  '一家商店 dùng 家 làm lượng từ cho cơ sở kinh doanh. So 回我家 với 去那家商店. 家 lần đầu gọi nhà, lần sau nằm giữa từ chỉ định và tên cửa hàng.'],
 ['和','和 hé nối với “hòa” trong hòa thuận, hòa bình. Trong 我和朋友, nó nối hai người.',
  '我和朋友去看电影 là tôi cùng bạn đi xem phim. 我和朋友都去 thêm 都 để xác nhận cả tôi lẫn bạn đều đi. Trong 和顺 trên câu đối, 和 nằm trong từ nói về hòa thuận.'],
 ['书','书 shū là “thư” trong thư viện, thư pháp. Phồn thể 書 xuất hiện trên sách hoặc tên môn thư pháp.',
  '一本书 là một quyển sách. 看书 là đọc sách theo cách dùng quen. 读书 cũng là đọc hoặc học tùy câu. Những từ tiếng Việt thư viện, thư pháp nối về cùng chữ 書 này.'],
 ['读书','读书 dúshū nối với “độc thư”. Độc trong độc giả, thư trong thư viện giúp nhớ hai chữ của từ.',
  '读书 có thể là đọc sách hoặc theo học. 我在读书 cần bối cảnh để chọn. 我在读这本书 chỉ rõ quyển đang đọc, còn 我读大学 nói việc học đại học.'],
 ['学习','学习 xuéxí là “học tập”. 學習 là dạng phồn thể. 习 nằm trong 练习, luyện tập, nên học một nhóm 学习、练习、复习.',
  '学习汉语 giới thiệu môn/ngôn ngữ học. 学生 gọi người học. Trong ôn tập, hãy đổi phần sau 学习 thành môn mình đang học thay vì chỉ đọc lại nghĩa “học tập”.'],
 ['做','做 zuò là làm, như 做饭. Chữ có 亻 phía trái để phân biệt mặt với 坐, ngồi.',
  '我做饭 kể tôi nấu ăn. 我坐在椅子上 kể tôi ngồi trên ghế. Cả hai động từ đọc zuò, nên đọc câu trước khi gõ chữ.'],
 ['白天','白天 báitiān là ban ngày. 白 là “bạch” trong bạch nhật 白日. 天 chỉ ngày hoặc trời trong các cụm.',
  '白天我工作，晚上我学习. Ban ngày tôi làm việc, buổi tối tôi học. Hai cụm thời gian mở đầu hai vế giúp bạn đọc theo cùng một khung.'],
 ['朋友','朋友 péngyou là bạn, 友 thường đọc nhẹ. Hữu trong hữu nghị, bằng hữu nối với 友.',
  '我和朋友去饭店 nói cùng bạn đi nhà hàng. 我的朋友在饭店 dùng 的 gắn người bạn với tôi, rồi 在 cho vị trí. Cả hai câu cùng từ nhưng thông tin chính khác nhau.'],
 ['唱','唱 chàng là hát. 口 bên trái giúp nhận nhóm liên quan miệng. 昌 nằm bên phải và góp âm lịch sử.',
  '唱歌 là hát. 听歌 là nghe bài hát. Khi đổi 唱 sang 听, vai của mình đổi từ người tạo âm thanh sang người tiếp nhận.'],
 ['歌','歌 gē là “ca” trong ca khúc, ca sĩ. 歌曲 gēqǔ là bài hát.',
  '这首歌很好听 dùng 首 để đếm bài hát. 唱歌 đặt 歌 sau động từ hát. 好听 nhận xét trải nghiệm nghe.'],
 ['好听','好听 hǎotīng là nghe hay hoặc dễ nghe. 好 đánh giá trải nghiệm, 听 xác định giác quan.',
  '歌很好听 khen bài hát. 你的名字很好听 khen tên nghe hay. Với món ăn, dùng 好吃. Với áo hoặc cảnh, dùng 好看.'],
 ['电视','电视 diànshì là “điện thị” khi đối chiếu chữ. “Thị” trong thị giác liên quan nhìn, còn tên đời thường ở Việt Nam là tivi.',
  '看电视 là xem tivi. 买电视 là mua chiếc tivi. Động từ trước 电视 cho biết đang nói nội dung xem hay thiết bị.'],
 ['狗','狗 gǒu là chó. Nhận 犭 bên trái trong nhóm chữ động vật. 句 bên phải góp âm lịch sử, không đọc nguyên theo gǒu trong mọi từ.',
  '一只狗 đếm một con chó. 狗在椅子旁边 lấy chó làm đối tượng đang tìm, rồi đặt vị trí sau 在.'],
 ['玩','玩 wán là chơi. 我在玩 nói tôi đang chơi. 玩儿 wánr là cách đọc có nhi hóa trong một số lối nói.',
  '和朋友玩 nối người chơi cùng. 玩手机 nói dùng điện thoại để giải trí. Chữ 手机 giữ nguyên, động từ 玩 cho biết mục đích dùng.'],
 ['边','边 biān là “biên” trong biên giới. Dạng phồn thể 邊. Ghép với 前、外、那、这 để tạo các cụm phương vị.',
  '饭店前边 lấy nhà hàng làm mốc. 那边 lấy một phía được chỉ làm mốc. Bên nào chỉ rõ khi người nghe có đối tượng tham chiếu.'],
 ['前边','前边 qiánbian là phía trước. 前 là “tiền” trong tiền tuyến, tiền nhiệm, chỉ trước về vị trí hoặc thời gian theo từ.',
  '饭店前边 có nhà hàng làm mốc. 饭店前边有椅子 giới thiệu ghế. 椅子在饭店前边 tìm vị trí chiếc ghế đã được nhắc.'],
 ['外边','外边 wàibian là phía ngoài. 外 là “ngoại” trong ngoại ngữ, ngoại thất.',
  '家外边 lấy căn nhà làm mốc. 狗在外边 cần bối cảnh để hiểu ngoài nhà hay ngoài phòng. Nếu chưa rõ, thêm tên nơi chốn trước 外边.'],
 ['椅子','椅子 yǐzi là ghế. 椅 có 木 bên trái, liên quan đồ gỗ trong cấu tạo, 奇 bên phải góp âm lịch sử. 子 đọc nhẹ.',
  '一把椅子 đếm chiếc ghế. 椅子上有书 nói trên ghế có sách. 书在椅子上 tìm vị trí sách. Cùng cảnh nhưng vật được giới thiệu khác nhau.'],
 ['那个','那个 nàge chỉ cái/người kia với 个. 那 đọc thanh 4, 个 trong cụm thường nhẹ.',
  '那个是我的。Cái kia là của tôi. Muốn gọi rõ quyển sách, dùng 那本书. Muốn gọi áo, dùng 那件衣服.'],
 ['那','那 nà chỉ người hoặc vật kia, hoặc điều vừa nhắc trong câu chuyện. Dùng một điểm nhìn cụ thể khi luyện cặp 这/那.',
  '那本书是我的 dùng 本 cho sách. 那些书是我的 chuyển sang nhóm sách. 那儿 là địa điểm thay vì vật.'],
 ['第','第 dì đánh dấu thứ tự. 第一次 là lần thứ nhất, 第二天 là ngày thứ hai. “Đệ” trong đệ nhất giúp nhớ chức năng.',
  '一课 có thể đếm một bài. 第一课 chọn bài thứ nhất trong thứ tự giáo trình. Giữ 第 ở trước số rồi thêm tên đơn vị sau số.']
 ];
 for(const [word,lead,body] of older)add(word,lead,[body],word==='本'?[link('CUHK · 本','本')]:[],['本','书','家','和','明天'].includes(word)?'viet-couplets':'');
 add('请','请 qǐng là Hán Việt “thỉnh” trong thỉnh cầu, thỉnh giáo. Dạng 請 có 言 gợi nghĩa lời nói, 青 gợi âm. Giản thể của 言 là 讠 trong 请.',
  ['请坐 là mời người nghe ngồi. 我可以坐这儿吗？ là hỏi mình có được phép ngồi đây không. 请给我一杯茶 nhờ người nghe cho mình trà. Tìm người thực hiện hành động sau 请 trước khi dịch.',
   '请问 mở lời hỏi, còn 请教 nhờ người khác chỉ bảo. Bạn có thể nối chữ đã học với “thỉnh giáo” trong tiếng Việt, rồi luyện cả câu 这个字怎么读？'],[['Bộ Giáo dục Đài Loan · 請','https://dict.variants.moe.edu.tw/dictView.jsp?ID=41903&q=1']],'register');
 add('可以','可以 kěyǐ nối với “khả dĩ”, có thể. Trong 我可以坐这儿吗？ người nói hỏi sự cho phép. Khi đọc liền hai thanh 3, âm đầu thường nâng lên như thanh 2, nhưng pinyin giữ kěyǐ.',
  ['我会写汉字 nói kỹ năng biết viết chữ Hán. 我可以写这个字吗？ có thể hỏi được phép viết chữ ấy không. Từ điển Việt có thể dịch cả 会 và 可以 là “có thể”, nhưng câu hỏi thực tế đang nhắm hai điều.',
   'Hãy tưởng tượng trước một tờ giấy dành cho người khác. 你会写吗？ hỏi có biết viết. 我可以写吗？ hỏi mình có được viết. Đổi chủ thể để cảm được khác biệt.']);
 add('再','再 zài là “tái” trong tái bản, tái ngộ. Trong 再给我一杯茶, nó đề nghị thêm một lượt. Trong 回家后再喝茶, nó đặt việc uống sau mốc về nhà.',
  ['在 zài và 再 zài cùng âm, khác mặt chữ và chức năng. 我在家喝茶 nói nơi uống. 我回家再喝茶 nói trình tự. Hãy chỉ ra phần theo sau zài trong từng câu.',
   '再见 zàijiàn nối “tái kiến”, hẹn gặp lại. Gặp chữ 再 trên một câu chúc hoặc trong hội thoại, thử hỏi đó là lặp một lần nữa hay chờ sau một mốc.']);
 add('问题','问题 wèntí là “vấn đề”. Dạng 問題. Trong 問, 門 là phần gợi âm, 口 liên quan lời hỏi. Nhìn giản thể 问 với 门 bao quanh 口 để nhận mặt.',
  ['我有一个问题 có thể là tôi có một câu hỏi, cũng có thể là một vấn đề cần giải quyết. Tiếng Việt “vấn đề” thường làm bạn nghĩ ngay đến sự cố, nên cần nhìn câu tiếp xem người nói sắp hỏi gì.',
   '这个字有问题 thường nhận xét chữ có chỗ sai hoặc cần xem lại. 我想问一个问题 mở lời hỏi. Động từ 问 và danh từ 问题 cùng họ nghĩa nhưng đứng ở hai vị trí.']);
 add('卖','卖 mài là “mại” trong thương mại, mại dâm. Dạng phồn thể 賣. Mua là 买 mǎi, “mãi” trong mãi lực.',
  ['Nhìn giản thể 卖 có phần 十 ở trên, 买 không có. Đây là dấu nhận mặt chữ hiện tại. Khi nghe, để ý mǎi thanh 3 và mài thanh 4.',
   '我买面包，商店卖面包. Tôi mua bánh mì, cửa hàng bán bánh mì. Cùng món hàng nhưng chủ thể đứng ở hai phía giao dịch.']);
 add('打电话','打电话 dǎ diànhuà là gọi điện. 电话 nối với “điện thoại”, còn 打 tạo thành cụm hành động gọi trong cách kết hợp này.',
  ['我给你打电话 đặt 我 là người gọi và 你 là người nhận. 你给我打电话 đảo hai vai. Gạch chân phần sau 给 rồi đọc lại cả câu.',
   '我在打电话 là đang gọi điện. 我想打电话 mới nêu mong muốn. 我没打电话 xác nhận việc gọi chưa xảy ra hoặc đã không xảy ra theo mốc của đoạn.']);
 add('一下','一下 yíxià đứng sau động từ để nói làm một chút hoặc làm thử, như 看一下, 问一下. 一 đọc yí trước thanh 4 của 下.',
  ['请看一下 nhờ xem một chút, có thể làm lời đề nghị nhẹ hơn. 喝一点儿水 đo lượng nước, còn 看一下 chỉ phần thực hiện hành động xem. Hãy tìm danh từ sau từ chỉ lượng.',
   '一下 cũng có thể đếm một lần tác động, như 敲一下门, gõ cửa một cái. Cụm động từ và tình huống giúp chọn “một chút” hay “một lần”.']);
 add('服务员','服务员 fúwùyuán là phục vụ viên. Chia 服务 + 员, công việc phục vụ + người làm. Cùng 员 trong 售货员, nhân viên bán hàng.',
  ['服务员，请给我一杯茶. Người nói gọi nhân viên phục vụ rồi nhờ đưa trà. Người thực hiện 给 là nhân viên, người nhận là 我.',
   'Học thêm 员工 yuángōng, nhân viên, và 会员 huìyuán, hội viên, để nhận 员 trong hai vị trí. Pinyin của 员 ở các từ này là yuán.']);
 add('女士','女士 nǚshì là cách xưng gọi phụ nữ lịch sự. 女 là “nữ”, 士 là “sĩ”. Nghĩa của cả từ trong lời xưng gọi tương đương bà/cô hoặc Ms.',
  ['李女士 gọi bà/cô họ Lý. Trong tiếng Việt, “nữ sĩ” còn gọi nữ tác giả. Giữ hai cách dùng tách rõ khi phiên dịch.',
   '女士们、先生们 là cách mở lời với quý bà và quý ông. Trong hội thoại chỉ một người, dùng họ + 女士 nếu phù hợp cách người ấy muốn được gọi.']);
 add('给','给 gěi là cho trong 给我一杯茶. Hán Việt “cấp” còn thấy ở cung cấp, cấp phát. Pinyin ở các mẫu đang học là gěi.',
  ['我给你一杯茶 theo thứ tự người cho / 给 / người nhận / đồ. 我给你打电话 theo thứ tự người gọi / 给你 / hành động gọi.',
   '这两个字是给我爸爸的 chỉ người mà hai chữ dành cho. Câu ấy chưa tự xác nhận đã viết hay đã trao xong. Tìm động từ và mốc thời gian khác trong đoạn để biết việc đã đến bước nào.'],[],'viet-couplets');
 add('杯','杯 bēi là “bôi”, như giao bôi trong lễ cưới. Trong 一杯茶, nó đo một cốc trà. Trong 杯子, nó tạo tên đồ vật cái cốc.',
  ['一个杯子 đếm cốc rỗng cũng được. 一杯茶 nói phần trà đựng hoặc đong bằng cốc. Muốn hai cốc sữa, nói 两杯牛奶.',
   '请给我一杯茶 dùng cả 给, người nhận 我, lượng 一杯 và đồ 茶. Thử đổi 我 thành 朋友, 茶 thành 牛奶 để luyện cùng khung.']);
 add('要','要 yào có thể là muốn, cần hoặc dự định tùy câu. Trong gọi món, 我要一杯茶 là tôi lấy một cốc trà.',
  ['我想喝茶 thiên về mong muốn uống. 我要一杯茶 nói món mình chọn. 可以给我一杯茶吗？ đưa lựa chọn ấy thành lời hỏi nhờ.',
   '他明天要去学校 thường nói dự định hoặc việc sắp làm. 不要说话 đặt 要 trong lời ngăn. Học bằng hai câu trọn vẹn sẽ rõ hơn việc gán một nghĩa cho riêng chữ 要.']);
 add('早饭','早饭 zǎofàn là bữa sáng. 早 chỉ sớm hoặc buổi sáng trong tổ hợp, 饭 gọi bữa ăn. Cùng 饭 trong 晚饭.',
  ['吃早饭 là ăn sáng. 做早饭 là làm bữa sáng. 我早上七点吃早饭 đặt khoảng buổi và mốc giờ trước hành động.',
   '早饭吃什么？ hỏi món ăn. 几点吃早饭？ hỏi giờ. Cùng 早饭 nhưng từ hỏi chọn loại thông tin khác nhau.']);
 add('这个','这个 zhège là cái/người này, với 个 là lượng từ phổ dụng trong cụm. Trong lời nói 个 thường đọc nhẹ.',
  ['这个字 dùng 个 vì đang chỉ một chữ. 这本书 đổi sang 本 cho sách, 这件衣服 sang 件 cho quần áo. 这 giữ ý chỉ gần, lượng từ theo danh từ.',
   '这个是我的 lược danh từ khi người nghe biết đang chỉ cái gì. Câu 这个字是我写的 nêu rõ chữ này do tôi viết.']);
 add('面包','面包 miànbāo là bánh mì. Phồn thể 麵包. 麵 chỉ bột mì hoặc mì, giản thể được viết thành 面, trùng mặt với 面 trong 面前.',
  ['Nhận 面包 cạnh 面条儿 để nối nhóm thực phẩm làm từ bột mì. Trong 后面、前面, 面 lại chỉ mặt hoặc phía. Nhìn từ ghép để chọn nghĩa.',
   '我买面包，明天吃早饭的时候吃. Tôi mua bánh mì để ăn lúc ăn sáng ngày mai. Câu do người học có thể chia thành 我买面包。明天早上我吃面包.']);
 add('鸡蛋','鸡蛋 jīdàn là trứng gà. 鸡 là “kê” như trong kê minh, gà gáy. 蛋 là trứng. Phồn thể 雞蛋.',
  ['Đổi 鸡 thành 鸭 yā thành 鸭蛋, trứng vịt. 蛋糕 dàngāo là bánh ngọt. Học một chữ 蛋 trong nhóm món thay vì coi mỗi từ là một hình riêng.',
   '我早饭吃面包和鸡蛋. Bữa sáng tôi ăn bánh mì và trứng gà. 和 nối hai món cùng làm tân ngữ của 吃.'],[],'viet-couplets');
 add('先生','先生 xiānsheng nối với “tiên sinh”. Trong xưng gọi hiện đại, 李先生 tương đương ông/anh Lý theo ngữ cảnh. 生 thường đọc nhẹ trong từ này.',
  ['Tiên sinh trong văn hóa Việt còn gợi cách kính gọi người có học. Trong tiếng Trung hiện đại, 先生 còn dùng rộng như Mr., nên phải nhìn đối tượng xưng gọi.',
   '先生，您想喝什么？ mở lời với khách nam và dùng 您 để kính trọng. Câu hỏi muốn uống gì đặt 什么 sau 喝, giữ thứ tự câu hỏi tiếng Trung.']);
 add('一半','一半 yíbàn là một nửa. 半 là “bán” trong bán đảo, bán cầu. 一 đọc yí trước 半 thanh 4.',
  ['一半 và 半个 đều có thể diễn đạt phần nửa nhưng đặt khác nhau. 我吃了一半 nói tôi ăn một nửa của phần đã rõ. 半个苹果 nói rõ nửa quả táo.',
   '六点半 là sáu giờ rưỡi. 一天半 là một ngày rưỡi. Số + đơn vị + 半 thêm nửa đơn vị, nên vị trí 半 quyết định độ dài.']);
 add('茶','茶 chá nối trực tiếp với “trà”. 一杯茶 là một cốc/chén trà. 喝茶 nói uống trà, 泡茶 pào chá nói pha/ngâm trà.',
  ['Dùng 请给我一杯茶 để gọi đồ. Nếu không lấy thêm, có thể nói 不要了，谢谢, tôi không lấy nữa, cảm ơn. 了 ở đây cho người nghe biết lựa chọn đã thay đổi.',
   'Ở Việt Nam, chén trà có thể xuất hiện trong tiếp khách hoặc lễ nghi. Trong bài tiếng Trung này, hãy xác định ai mời ai và trà được mang cho ai bằng các từ 请、给、我、您.']);
 add('年','年 nián là “niên” trong tân niên, niên khóa. Dạng giáp cốt gắn với hình người mang lúa, còn Thuyết văn giải 年 theo mùa lúa chín.',
  ['Trong 今年、明年, 年 là năm trên lịch. Trong 百年偕老, trăm năm nói ước nguyện đi cùng nhau trọn đời. Năm trong số tuổi thường dùng 岁, như 六十岁.',
   '明年他六十岁 nói năm sau ông ấy 60 tuổi. 今年是他的本命年 nói một thông tin khác về năm tuổi. Học một câu lịch và một câu tuổi để tránh dùng 年 thay 岁 ở mọi chỗ.'],[link('CUHK · 年','年')],'viet-couplets');
 for(const word of ['想','狗','椅子','哪儿','说话']){
  const char={'想':'想','狗':'狗','椅子':'椅','哪儿':'哪','说话':'說'}[word];
  const d=studies.get(word);
  if(d&&!d.links.length)d.links.push(link('CUHK · '+char,char));
 }
 window.HAN_STUDIES=studies;
})();
