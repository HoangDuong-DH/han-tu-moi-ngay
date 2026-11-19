(() => {'use strict';
 const units=[
 {id:'intro',title:'Đọc pinyin mà không nhầm chữ với âm',range:[21,26],focus:'Âm tiết · thanh mẫu · vận mẫu · dấu thanh',words:['学习','我们','一','不','女儿'],sections:[
 ['Một chữ viết và một âm tiết không phải hai tên của cùng một thứ','学习 có hai chữ và thường có hai âm tiết xué-xí. Nhưng trong 花儿 huār, hai chữ có thể biểu thị một âm tiết đã nhi hóa. Vì vậy đừng lấy số ô chữ để quyết định số nhịp đọc. Trước hết xác định cả từ, rồi mới tách âm tiết theo cách đọc của nó.'],
 ['Chia để đọc, không chia để dựng nghĩa','Trong xué, x là thanh mẫu, üe là vận mẫu; dấu sắc trên e ghi thanh hai. Theo quy tắc viết sau j/q/x, ü bỏ hai chấm nên ta thấy xue. Việc tách x–üe phục vụ phát âm; nó không chứng minh chữ 学 được tạo từ những nghĩa tương ứng x và üe.'],
 ['Ba lỗi viết cần sửa ngay','Khi không có thanh mẫu, i/u/ü dùng y/w theo quy tắc: i→yi, u→wu, ü→yu; iou/uei/uen sau thanh mẫu thường viết iu/ui/un. Giữ ü trong nǚ、lǜ để phân biệt với nu/lu. Dấu cách âm trong Xī’ān hoặc nǚ’ér giữ ranh giới âm tiết, không phải dấu nhấn.'],
 ['Dấu thanh bám vào nguyên âm chính','Có a thì thường đặt dấu lên a; không a thì xét o/e; trong iu/ui đặt trên chữ nguyên âm sau: liù、shuǐ. Đây là mẹo viết, không cho phép đọc u/i bằng âm Việt. Khi i nhận dấu thanh, bỏ dấu chấm của i. Âm nhẹ không có dấu thanh nhưng vẫn được phát ra.']
 ],pairs:[['学习','xuéxí','học tập'],['我们学习汉语。','Wǒmen xuéxí Hànyǔ.','Chúng tôi học tiếng Trung.'],['女儿','nǚ’ér','con gái (hai âm tiết)'],['花儿','huār','hoa (một âm tiết nhi hóa)']],practice:[
 ['Trong xue, vận mẫu được khôi phục là gì?',['üe','ue với u như 乌','x','e duy nhất'],0,'Sau x, hai chấm của ü được lược trong chính tả; xue không đọc như x + u tiếng Việt.'],
 ['Cặp nào cần giữ hai chấm để không lẫn âm?',['nǚ / nǔ','ju / jū','xue / xué','yi / yī'],0,'n đi được với cả u và ü nên chính tả giữ sự khác nhau.'],
 ['Cách ghi thanh đúng của shui thanh ba?',['shuǐ','shǔi','shuǐ không có nguyên âm mang dấu','shùi'],0,'Trong ui, dấu thanh đặt trên i.'],
 ['Vì sao không đếm 花儿 thành hai nhịp huā–ér?',['儿 ở đây đã hòa vào âm tiết trước','Mọi chữ 儿 đều câm','花 không được đọc','Pinyin chỉ dành cho một chữ'],0,'Nhi hóa khác 儿 độc lập trong 女儿.']
 ]},
 {id:'1',title:'1 · Miệng, luồng hơi và bốn thanh',range:[27,33],audio:1,focus:'a o e i u ü · b p m f d t n l g k h',words:['爸爸','妈妈','你','女儿','努力','你好'],sections:[
 ['Bắt đầu bằng vị trí miệng','Giữ một nguyên âm đủ lâu để kiểm tra, rồi mới chuyển sang cặp. Với ü, đặt lưỡi gần như i, sau đó tròn môi như u; đừng đẩy lưỡi lùi thành u. Đọc i–ü–u chậm và kiểm tra cả môi lẫn âm nghe được. Tên chữ cái trong bảng chữ cái không phải âm của vận mẫu.'],
 ['b/p, d/t, g/k khác nhau nổi bật ở bật hơi','Đặt một tờ giấy nhẹ trước miệng để quan sát luồng hơi: p/t/k thường làm giấy rung rõ hơn b/d/g. Không biến b/d/g thành đối lập hữu thanh theo thói quen tiếng Anh hoặc tiếng Việt. Tờ giấy chỉ kiểm luồng hơi, không chấm toàn bộ cách phát âm.'],
 ['Bốn thanh là quan hệ cao độ, không phải bốn mức âm lượng','Đọc mā–má–mǎ–mà trên cùng một nguyên âm. Thanh một tương đối cao và bằng; thanh hai đi lên; thanh ba đọc riêng có đường thấp rồi lên; thanh bốn hạ nhanh. Trong câu, thanh ba thường không đi hết đường lên: sẽ học riêng ở bài 6. Đừng hét to để thay đường thanh.'],
 ['Luyện một lỗi mỗi lượt','Lượt đầu phân biệt ba/pa, lượt sau li/ni, rồi mới ghép từ 父母、努力. Nếu vừa sửa môi, hơi và thanh trong cùng một lượt quá nhanh, rất khó biết mình sai ở đâu. Sau khi nghe câu, che pinyin và gọi lại nghĩa để kiểm việc nghe có đi cùng hiểu.']
 ],pairs:[['父母','fùmǔ','cha mẹ'],['努力','nǔlì','cố gắng'],['弟弟渴。','Dìdi kě.','Em trai khát.'],['我不渴，也不饿。','Wǒ bù kě, yě bú è.','Tôi không khát, cũng không đói.']],practice:[
 ['Cặp tập trung vào bật hơi?',['b / p','m / n','a / o','i / ü'],0,'b/p cùng vùng môi, khác luồng hơi nổi bật.'],
 ['Muốn đi từ i đến ü, thay đổi nào cần thử?',['Giữ lưỡi gần i và tròn môi','Lùi lưỡi thành u rồi không đổi môi','Đọc chữ y tiếng Anh','Bỏ âm ü'],0,'Tách vị trí lưỡi với độ tròn môi giúp tránh nhập ü vào u.'],
 ['Thấy mā/má/mǎ/mà khác dấu, điều gì thay đổi?',['Đường cao độ có thể phân biệt nghĩa','Chỉ âm lượng','Số âm tiết','Luôn thay thanh mẫu'],0,'Thanh điệu nằm trong âm tiết và có vai trò phân biệt nghĩa.'],
 ['Câu 我不渴，也不饿 nói gì?',['Không khát và cũng không đói','Không khát nhưng đói','Đang hỏi người kia đói không','Chỉ chào buổi sáng'],0,'也 nối thêm một ý phủ định; 不 trước 饿 thanh bốn được đọc bú.']
 ]},
 {id:'2',title:'2 · j/q/x, z/c/s và zh/ch/sh/r',range:[34,39],audio:2,focus:'Vị trí lưỡi · bật hơi · i trong zhi/zi',words:['七','吃','是','四','十','老师','车','星期四'],sections:[
 ['Đặt ba nhóm cạnh nhau','j/q/x dùng phần trước của mặt lưỡi gần vùng ngạc trước, đi với i hoặc ü. z/c/s dùng vùng đầu lưỡi phía trước hơn; zh/ch/sh dùng vùng đầu lưỡi lùi hơn. Đừng mô tả mọi zh là cuộn lưỡi thật mạnh: thao tác quá mức có thể tạo âm khác.'],
 ['Giữ cùng vận mẫu khi so thanh mẫu','Đọc ji–zhi–zi, qi–chi–ci, xi–shi–si. Mục đích là nghe chỗ khác ở đầu âm; nhưng i sau z/zh không giống i trong ji. Có thể học zi/ci/si và zhi/chi/shi/ri như âm tiết hoàn chỉnh trước, tránh ghép một i tiếng Việt vào cuối.'],
 ['Đừng để chữ u đánh lừa sau j/q/x','ju、qu、xu có vận mẫu ü dù không có hai chấm trên giấy. So ju–zhu để nghe cả vị trí lưỡi lẫn vận mẫu. Sau khi phân biệt nhóm, trở về 机器、汽车、老师: âm luyện riêng chỉ có ích khi giữ được trong từ.'],
 ['Âm gần nhau vẫn có thể khác thanh và nghĩa','机器 jīqì khác 极其 jíqí; 支持 zhīchí khác 直尺 zhíchǐ. Đọc đúng thanh mẫu chưa đủ nhận từ. Lượt nghe đầu chọn nghĩa, lượt sau xem pinyin để xác định mình lẫn ở âm đầu hay dấu thanh.']
 ],pairs:[['机器 / 极其','jīqì / jíqí','máy móc / cực kỳ'],['支持 / 直尺','zhīchí / zhíchǐ','ủng hộ / thước thẳng'],['你吃什么？','Nǐ chī shénme?','Bạn ăn gì?'],['今天星期四。','Jīntiān xīngqīsì.','Hôm nay thứ Năm.']],practice:[
 ['Cặp nào đối chiếu vị trí lưỡi, đồng thời cần chú ý i không hệt nhau?',['ji / zhi','ba / pa','ma / má','an / ang'],0,'j và zh thuộc vùng cấu âm khác, i trong ji và zhi cũng không đồng nhất.'],
 ['qu có nguyên âm đầu vận mẫu nào?',['ü','u của 乌','a','o'],0,'Pinyin bỏ hai chấm sau q.'],
 ['机器 và 极其 khác ở điểm nào trong pinyin?',['Thanh điệu của cả hai âm','Chỉ số lượng chữ','Một từ có âm nhẹ bắt buộc','Không khác âm'],0,'jīqì đối chiếu jíqí: phải nghe cả hai thanh.'],
 ['四是四，十是十 nên luyện điều gì trước khi tăng tốc?',['s/sh cùng thanh đúng','Chỉ nói thật nhanh','Bỏ âm cuối mỗi cụm','Đọc tất cả thành shì'],0,'Câu líu lưỡi là bài kiểm tra độ phân biệt, tốc độ không phải mục tiêu đầu tiên.']
 ]}
 ];
 window.HAN_PHONETICS={book:{title:'经理人汉语·语音篇',subtitle:'Chinese for Managers · Phonetics',author:'李明',publisher:'外语教学与研究出版社',isbn:'978-7-5600-5002-7',pdf:'materials/ngu-am-122-trang.pdf',providedPages:122,note:'Bản bạn gửi có 20 trang đầu sách, rồi trang in 1–102. Mục lục còn nhắc bảng ghép thanh–vận ở phụ lục III, nhưng bảng đó không có trong 122 trang này. Khóa ngữ âm này tách khỏi sáu bài HSK 2.'},units,pages:[],readings:[]};
})();
