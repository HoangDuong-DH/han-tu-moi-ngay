(() => {
 'use strict';
 const library='https://ctext.org/library.pl?if=en&res=5453';
 const edition='https://www.nlcpress.com/Info.aspx?Id=360';
 const research='https://www11.ihp.sinica.edu.tw/storage/w2_file/1417mhJqrUR.pdf';
 const qing='https://dict.variants.moe.edu.tw/dictView.jsp?ID=41903&q=1';
 const cuhk='https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=';
 const bell='https://ctext.org/lv-shi-chun-qiu/zi-zhi/zhs';
 const rabbit='https://zh.wikisource.org/zh-hant/韓非子/五蠹';
 const plum='https://zh.wikisource.org/zh-hans/世說新語/雅量';
 const section=(title,...paragraphs)=>({title,html:paragraphs.map(p=>'<p>'+p+'</p>').join('')});
 const source=(title,url,note)=>({title,url,note});
 const external=(url,label)=>'<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';
 const a={
  id:'shuowen',title:'Thuyết văn giải tự · Ai để lại dấu vết trong một chữ?',glyph:'字',
  category:'Chữ Hán và văn bản cổ',
  subtitle:'Đọc một mục chữ đời Hán qua dấu vết người đời Tống và đời Thanh để lại.',
  deck:'Một dấu “thanh” trong 請, một đứa trẻ dưới mái nhà trong 字, và ba chuyện cổ về việc nghe, nhìn và suy luận.',
  sections:[
   section('Trang 11 · Khi 小學 chưa phải là trường tiểu học',
    'Bạn vừa học <strong lang="zh-CN">上小学</strong> (shàng xiǎoxué, học tiểu học). Nhưng trong phần đề yếu của bản PDF, cụm <span lang="zh-Hant">魏晉以來言小學者</span> dẫn vào một cuộc bàn luận về chữ cổ và cách đọc. Ở đây, <strong lang="zh-Hant">小學</strong> là tên gọi truyền thống cho việc nghiên cứu văn tự, âm đọc và chú giải nghĩa. Nếu gặp cùng một chữ trong hai văn cảnh cách xa nhau, hãy nhìn những từ đứng quanh nó trước khi chọn nghĩa.',
    '<strong>Đối chiếu hai tệp bạn gửi.</strong> Tệp 1.pdf có 447 trang, nhưng ở đầu tệp chỉ đọc được bìa, trang tên và phần <span lang="zh-Hant">提要</span> (đề yếu). Bản 2.pdf cũng có 447 trang và có ảnh sách xuyên suốt phần này. Trang PDF 11 có đoạn về <span lang="zh-Hant">唐韻</span>. Trang 444 còn dòng cuối quyển <span lang="zh-Hant">說文解字卷二下</span>. Phần đã kiểm đi tới hết quyển 2 hạ. '+external(library,'Danh mục bản Tứ khố toàn thư hội yếu'),
    'Hứa Thận <span lang="zh-Hant">許慎</span> biên soạn sách thời Đông Hán. Bản truyền thống ghi 9.353 mục chữ chính và 1.163 <span lang="zh-Hant">重文</span> (dạng chữ được ghi kèm), xếp vào 540 bộ. Trang 9 nhắc một lần sách đổi qua tay người khác. Năm 986, Từ Huyễn <span lang="zh-Hant">徐鉉</span> và nhóm hiệu đính đời Tống đối chiếu các bản, bổ sung chữ dưới nhãn <span lang="zh-Hant">新附字</span> và ghi âm bằng phép phiên thiết. Khi tra, nhãn “tân phụ” giúp biết mình đang đọc lớp biên tập nào. '+external(edition,'Giới thiệu ấn bản của Nhà xuất bản Thư viện Quốc gia Trung Quốc')),
   section('Hai mục chữ · Vì sao một chữ có thể có hơn một tác giả?',
    '<strong lang="zh-Hant">請</strong> · Bản Đại Từ ghi <span lang="zh-Hant">「謁也。从言，青聲。七井切。」</span> Đọc thành ba mẩu. <span lang="zh-Hant">謁也</span> giải nghĩa theo cách dùng xưa, liên quan đến việc xin gặp, yết kiến. <span lang="zh-Hant">从言，青聲</span> cho biết 言 gợi phạm vi lời nói và 青 gợi âm. <span lang="zh-Hant">七井切</span> là ghi chú phiên thiết của bản truyền đời Tống. Trong hệ âm thời ấy, chữ đầu cho âm đầu, chữ sau cho vần và thanh. Muốn nói Quan thoại hôm nay, học thẳng <strong>qǐng</strong> và so với <strong>qīng</strong> của 青. Âm đầu và vần vẫn gần nhau, còn thanh đã khác. '+external(qing,'Xem mục 請 của Bộ Giáo dục Đài Loan'),
    'Mang chữ đó trở lại bài 13. <span lang="zh-CN">请坐。</span> (Qǐng zuò, mời ngồi) hướng hành động về người nghe. <span lang="zh-CN">请问，我可以坐这儿吗？</span> (Qǐngwèn, wǒ kěyǐ zuò zhèr ma?, xin hỏi, tôi có thể ngồi đây không?) mở lời rồi xin phép cho chính mình. Biết 請 có 言 giúp nhận mặt chữ. Muốn hiểu lời mời hay lời xin phép, hãy xác định ai sẽ ngồi. <a href="#essay/register">Đọc tiếp bài về 请 và ngữ thể</a>.',
    '<strong lang="zh-Hant">字</strong> · Mục cổ ghi <span lang="zh-Hant">「乳也。从子在宀下，子亦聲。」</span> Nghĩa được giải ở đây là sinh con. Hứa Thận đọc hình đứa trẻ 子 dưới mái 宀 và coi 子 đồng thời góp phần ghi âm. Trong lời tựa, chính ông còn dùng <span lang="zh-Hant">孳乳</span>, sự sinh sôi, để nói về việc các dạng chữ tăng lên. Hai lớp ấy giúp nhớ vì sao chữ 字 xuất hiện trong lời bàn về chữ viết. Hôm nay, <span lang="zh-CN">写汉字</span> (xiě Hànzì) là viết chữ Hán. Chữ 字 trong cụm này chỉ đơn vị chữ viết. '+external(cuhk+'字','Xem mục 字 và tư liệu chữ cổ của CUHK')),
   section('Lục thư · Sáu cách nhìn, mỗi cách trả lời một câu hỏi',
    'Lời tựa <span lang="zh-Hant">《說文解字·敘》</span> dùng <strong>chỉ sự</strong> 指事 với 上 và 下 để cho thấy vị trí có thể được đánh dấu. <strong>Tượng hình</strong> 象形 có 日 và 月, lấy hình mặt trời và mặt trăng làm ví dụ. <strong>Hình thanh</strong> 形聲 có 江 và 河. Trong 江, 氵 gợi nước, 工 là phần gợi âm, dù <em>jiāng</em> và <em>gōng</em> đã cách nhau đáng kể trong Quan thoại.',
    'Hứa Thận nêu 武 và 信 cho <strong>hội ý</strong> 會意, nơi ông giải chữ bằng cách phối hợp các thành phần mang ý nghĩa. <strong>Chuyển chú</strong> 轉注 có cặp 考 và 老, nhưng chính tiêu chí của loại này còn có nhiều cách giải. <strong>Giả tá</strong> 假借 nói đến việc mượn chữ có sẵn dựa vào âm để ghi một từ khác. Lời tựa nêu 令 và 長. Cách phân loại của Hứa Thận cho biết một học giả Đông Hán đọc chữ như thế nào. Tư liệu giáp cốt, kim văn và các bản khai quật cho phép giới nghiên cứu kiểm tra thêm từng trường hợp. '+external(research,'Bottéro và Harbsmeier · Nghiên cứu văn bản Thuyết văn'),
    'Luyện ngay với <strong lang="zh-CN">上</strong>. Trong <span lang="zh-CN">椅子上</span> (yǐzi shang), chiếc ghế là mốc và 上 chỉ vị trí. Trong <span lang="zh-CN">上火车</span> (shàng huǒchē), 上 là động từ “lên”. Trong <span lang="zh-CN">上中学</span> (shàng zhōngxué), cụm nói việc theo học bậc trung học. Hình chữ giúp nhớ trục trên–dưới. Muốn chọn nghĩa khi đọc một câu, hãy xem 上 đứng trước hay sau cái gì và cả cụm đang kể hành động nào. <a href="#practice/read/chair">Luyện tìm mốc trong đoạn Chiếc ghế</a>.'),
   section('Ba chuyện cổ · Nghe thấy, nhìn thấy và biết được',
    '<strong>1. Bịt tai trộm chuông.</strong> Một người thấy chiếc chuông lớn và muốn mang đi. Chuông nặng đến mức anh ta phải tính chuyện đập ra. Cú đập vừa giáng xuống, tiếng chuông vang lên. Anh sợ người khác nghe thấy nên đưa tay bịt tai mình. Tên thành ngữ quen thuộc ngày nay là <span lang="zh-CN">掩耳盗铃</span>, còn vật trong chuyện ở <em>Lã thị Xuân Thu</em> là chiếc <span lang="zh-Hant">鐘</span> lớn. Chi tiết này giải thích vì sao nhân vật phải đập nó.',
    'Mấu chốt nằm ở hai người nghe khác nhau. Khi đọc <span lang="zh-CN">他怕别人听见</span> (tā pà biérén tīngjiàn), chủ thể của 怕 là 他, còn người có thể nghe thấy là 别人. Bịt tai mình thay đổi điều mình nghe được. Đọc đến đó, câu chuyện chỉ cho ta biết anh ta sợ bị nghe thấy. Chữ <span lang="zh-Hant">聞</span> trong lời kể cổ có 耳 gợi nghĩa và 門 gợi âm theo <em>Thuyết văn</em>. '+external(bell,'Đọc thiên Tự tri của Lã thị Xuân Thu')+' · '+external(cuhk+'聞','Tra chữ 聞')+'.',
    '<strong>2. Đợi thỏ ở gốc cây.</strong> Người nước Tống đang cày thì một con thỏ lao vào gốc cây, gãy cổ. Anh bỏ cày, chờ ngay chỗ cũ. Chuyện dừng ở kết quả rất cụ thể. Anh chẳng bắt được thêm con nào, lại thành trò cười. Trong <span lang="zh-CN">守株待兔</span> (shǒuzhū dàitù), 株 là gốc cây và 待 là đợi. Khi gặp 株 trong <span lang="zh-CN">一株植物</span> (yì zhū zhíwù), nó là lượng từ cho một cây.',
    'Đặt chuyện về lại thiên <em>Ngũ đố</em>, Hàn Phi đang nói với người muốn lấy cách trị nước thời trước áp vào hoàn cảnh mới. Người nông dân có một sự kiện thật và một địa điểm thật. Anh đánh cược cả công việc của mình vào giả định rằng điều kiện hôm qua sẽ lặp lại hôm nay. '+external(rabbit,'Đọc nguyên văn Hàn Phi Tử · Ngũ đố')+'.',
    '<strong>3. Vương Nhung và cây mận bên đường.</strong> Năm bảy tuổi, Vương Nhung thấy một cây mận bên đường sai đến cong cành. Các bạn chạy đi hái, riêng cậu đứng lại. Cậu suy ra quả đắng vì một cây dễ hái như thế vẫn còn đầy quả. Sau đó có người hái thử và quả nhiên như lời cậu. Trong câu cổ <span lang="zh-Hant">諸兒競走取之</span>, 走 diễn tả chạy. Khi kể lại bằng lời hôm nay, có thể dùng <span lang="zh-CN">孩子们跑过去摘李子。</span> (Háizimen pǎo guòqu zhāi lǐzi, các bạn nhỏ chạy sang hái mận).',
    'Thử đọc câu chuyện theo ba bước. Cây bên đường và quả đầy cành là điều được nhìn thấy. Vị đắng là điều được suy ra. Hái thử mới là bước kiểm chứng. Nhớ ba bước này khi luyện <span lang="zh-CN">看见、听见</span>. Chúng cho biết đã thấy hoặc nghe được gì. Câu tiếp theo mới là nơi bạn nói điều mình nghĩ từ dữ kiện đó. '+external(plum,'Đọc Thế thuyết tân ngữ · Nhã lượng')+'.',
    '<a href="#practice/read/shuowen-bell">Đọc chuyện chiếc chuông và chọn dòng làm chứng cứ</a> · <a href="#practice/listen/shuowen-bell">Nghe chuyện</a> · <a href="#practice/write/shuowen-bell">Viết lại đoạn kết</a>')
  ],
  words:[
   ['字','zì','chữ'],['汉字','Hànzì','chữ Hán'],['请','qǐng','mời, xin'],['上','shàng','trên, lên, theo học'],['下','xià','dưới, xuống'],['小学','xiǎoxué','tiểu học trong cách dùng hiện nay'],['听','tīng','nghe'],['听见','tīngjiàn','nghe thấy']
  ].map(([han,py,meaning])=>({han,py,meaning})),
  related:['han-viet','register','space-time'],
  sources:[
   source('Chinese Text Project · Bản 四庫全書薈要',library,'Danh mục bản sách cùng nhan đề và hệ ấn bản với tệp bạn gửi.'),
   source('Nhà xuất bản Thư viện Quốc gia Trung Quốc',edition,'Truyền bản và công việc hiệu đính của Từ Huyễn.'),
   source('Bottéro & Harbsmeier · Nghiên cứu Thuyết văn',research,'Khung phân tích, cách đọc và phân loại mục chữ.'),
   source('Bộ Giáo dục Đài Loan · 請',qing,'Nguyên mục và âm phiên thiết trong Đại Từ bản.'),
   source('CUHK · 字 và 聞',cuhk+'字','Tư liệu chữ cổ và lời giải của Hứa Thận.'),
   source('Lã thị Xuân Thu · Tự tri',bell,'Chuyện chiếc chuông lớn.'),
   source('Hàn Phi Tử · Ngũ đố',rabbit,'Chuyện đợi thỏ trong lập luận về phép trị nước.'),
   source('Thế thuyết tân ngữ · Nhã lượng',plum,'Chuyện Vương Nhung nhìn cây mận bên đường.')
  ]
 };
 a.wordCount=a.sections.reduce((n,s)=>n+s.html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).length,0);
 a.minutes=Math.max(4,Math.ceil(a.wordCount/170));
 const {articles,byId}=window.HAN_ESSAYS;
 articles.unshift(a);
 byId.set(a.id,a);
 window.HAN_SHUOWEN=new Map([
  ['请',['Thỉnh. Bản Đại Từ ghi 請 từ 言 gợi nghĩa và 青 gợi âm, kèm phiên thiết 七井切. So 请坐 (mời người kia ngồi) với 我可以坐这儿吗？ (xin phép để mình ngồi).',qing]],
  ['字',['Tự. Hứa Thận giải 字 theo nghĩa sinh con, với 子 dưới 宀 và 子 đồng thời gợi âm. Trong 写字 hôm nay, 字 chỉ chữ viết.',cuhk+'字']],
  ['汉字',['Hán tự. 汉 giới hạn loại chữ, 字 là chữ viết. Lời tựa Thuyết văn dùng hình ảnh 孳乳, sự sinh sôi, khi giải thích sự gia tăng của các dạng chữ.',cuhk+'字']],
  ['小学',['Tiểu học. Trong 上小学, từ chỉ bậc học. 小學 ở trang 11 bản PDF là tên truyền thống của việc nghiên cứu văn tự, âm đọc và chú giải nghĩa.',library]],
  ['上',['Thượng. Hứa Thận nêu 上 và 下 làm ví dụ chỉ sự. So 椅子上 (vị trí), 上火车 (lên phương tiện) và 上中学 (theo học).',research]],
  ['下',['Hạ. Hứa Thận nêu 上 và 下 làm ví dụ chỉ sự. So 桌子下面 (vị trí dưới bàn), 下车 (xuống xe) và 下雨 (trời mưa).',research]],
  ['听',['Thính. Đối chiếu giản thể 听 với phồn thể 聽. 听 là hoạt động nghe, như 听音乐. Trong chuyện chiếc chuông, nguyên văn dùng 聞, một chữ khác với 聽.',cuhk+'聞']],
  ['听见',['Nghe thấy. 听 chỉ hành động, 见 đánh dấu kết quả cảm nhận. 他怕别人听见 chỉ nỗi sợ người khác nghe thấy. Hãy tìm câu nào trong đoạn xác nhận điều đó đã xảy ra.',bell]]
 ]);
})();
