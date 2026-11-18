(() => {
 'use strict';
 const rows=[];
 const add=(mode,id,prompt,cue,answer,wrong,why,words,source=null)=>rows.push({mode,id,prompt,cue,answer,options:[answer,...wrong],why,words,source});
 // Visible modern components, not invented historical explanations.
 const structures=[
 ['rest','休','亻 + 木',['亻 + 本','扌 + 木','讠 + 木'],'Bên trái là 亻, dạng đứng bên của 人; bên phải là 木. Nhận đúng hình trước khi đọc bài giải thích lịch sử riêng.',['休','休息']],
 ['good','好','女 + 子',['女 + 了','子 + 女','亻 + 子'],'Trong dạng chữ hiện đại: 女 ở trái, 子 ở phải. Đây là mô tả mặt chữ, không phải suy luận về vai trò nam nữ.',['好']],
 ['bright','明','日 + 月',['目 + 月','日 + 用','月 + 日'],'Nhìn 日 ở trái: phần trong có một nét ngang. Đừng thay bằng 目 có hai nét ngang bên trong.',['明天','明年']],
 ['book','本','木 + nét ngang ở phần dưới',['木 + nét ngang ở phần trên','两个木','日 + 木'],'So với 木, 本 thêm nét ngang ngắn ở phần dưới. Nhận vị trí nét; không tách 本 thành hai từ.',['本','书']],
 ['character','字','宀 + 子',['宀 + 了','穴 + 子','广 + 子'],'Phía trên là 宀, phía dưới là 子. Chữ 字 và từ 汉字 thuộc hai cấp: một chữ và một từ ghép.',['字','汉字']],
 ['please','请','讠 + 青',['氵 + 青','忄 + 青','扌 + 青'],'讠 liên hệ với lời nói; 青 là thành phần gợi âm trong 請, dạng giản thể là 请. Cùng có 青 không có nghĩa là đọc giống hệt nhau.',['请'],['Bộ Giáo dục Đài Loan · 請','https://dict.variants.moe.edu.tw/dictView.jsp?ID=41903&q=1']],
 ['hold','抱','扌 + 包',['饣 + 包','足 + 包','氵 + 包'],'扌 liên hệ với tay, 包 gợi âm. 抱 bào là ôm/bế; 饱 bǎo là no, 跑 pǎo là chạy. Phần chung giúp nhận họ chữ, không thay việc học âm và thanh từng chữ.',['抱','包','饱','跑'],['CUHK · 抱','https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=抱']],
 ['rice','饭','饣 + 反',['钅 + 反','扌 + 反','讠 + 反'],'Trong 饭 hiện đại, bên trái là 饣, không phải 钅. Gặp lại 饣 trong 饱, 饺; mở từng từ để kiểm tra nghĩa và âm.',['饭','米饭','晚饭']],
 ['money','钱','钅 + 戋',['饣 + 戋','扌 + 戈','氵 + 戋'],'Bên trái là 钅, bên phải là 戋. Học đúng bộ phận bên phải; đừng bỏ nét rồi viết thành một chữ khác.',['钱']],
 ['school','校','木 + 交',['扌 + 交','木 + 文','禾 + 交'],'木 ở trái, 交 ở phải. 校 trong 学校 đọc xiào; ghép 学 + 校 mới thành từ 学校.',['校','学校','校长']],
 ['speech','语','讠 + 吾',['氵 + 吾','讠 + 古','口 + 五'],'吾 có 五 ở trên, 口 ở dưới; cả chữ 语 có 讠 ở bên trái. Phân tích nhiều tầng để tránh ghi nhớ một khối nét rời rạc.',['语','汉语']],
 ['mum','妈','女 + 马',['亻 + 马','女 + 鸟','子 + 马'],'Nhận 女 ở trái, 马 ở phải. Đối chiếu 妈妈 māma trong kho từ, không đọc âm Hán Việt thay cho pinyin.',['妈妈']]
 ];
 for(const [id,h,a,w,e,ws,src] of structures)add('structure',id,'Chọn cấu tạo đúng của chữ hiện đại.',h,a,w,e,ws,src);
 const contrasts=[
 ['buy-sell','Tôi muốn mua bánh mì.','我想___面包。','买',['卖','读','写'],'买 mǎi là mua; 卖 mài là bán. 卖 có phần 十 phía trên. Nghĩa và thanh khác nhau, không chỉ khác một nét.',['买','卖','面包']],
 ['ask-place','Bạn đi đâu?','你去___儿？','哪',['那','这','他'],'哪 nǎ dùng để hỏi; 那 nà để chỉ “kia/đó”. Trong 哪 nhìn thấy 口 ở trái.',['哪儿','那儿']],
 ['see-day','Chọn 日 để hoàn thành từ “Chủ nhật”.','星期___','日',['目','月','曰'],'日 rì khác 目 mù ở số nét ngang bên trong. 星期日 và 星期天 đều chỉ Chủ nhật.',['星期日','星期天']],
 ['not-yet','Chữ nào là vị trong 未知 “chưa biết”?','___知','未',['末','本','木'],'未: nét ngang phía trên ngắn hơn nét ngang dưới. 末: phía trên dài hơn. 未知 là từ mở rộng; đây là bài phân biệt hình, không thay 还没 một cách máy móc trong mọi câu.',['还没','本']],
 ['my-find','Chọn 找 để hoàn thành “đang tìm điện thoại”.','正在___手机','找',['我','钱','书'],'找 zhǎo có 扌 ở trái, 戈 ở phải. 我 wǒ là tôi; đừng coi hai chữ gần hình là cùng nghĩa.',['找','手机','我']],
 ['tea','Điền từ chỉ thức uống.','一杯___','茶',['菜','字','书'],'茶 chá là trà, 菜 cài là rau/món ăn. Cả hai có 艹 nhưng phần dưới khác và không cùng âm.',['茶','菜','杯']],
 ['earth','Trong từ 男士 “quý ông”, chữ nào phù hợp?','男___','士',['土','上','下'],'士 shì: nét trên dài, nét dưới ngắn; 土 tǔ: nét dưới dài. 男士 là từ mở rộng, cùng 士 với 女士 đã học.',['男','女士','先生']],
 ['in-enter','Chọn chữ trong từ “bên trong”.','___边','里',['理','田','果'],'里 lǐ chỉ bên trong trong 里边. 理 lǐ có 王 ở bên trái; cùng âm không có nghĩa là thay cho nhau.',['里','里边','理']],
 ['greet','Chọn chữ hoàn thành từ “nghỉ ngơi”.','___息','休',['体','本','木'],'休 xiū có 木 ở phải. 体 tǐ có 本 ở phải; một nét thay cả chữ.',['休息','本']],
 ['listen','Chọn chữ để diễn đạt nghe thấy.','听___','见',['贝','儿','几'],'见 jiàn: gặp/thấy; 贝 bèi là chữ khác. 听见 nói nghe được âm thanh; 听 nhấn vào việc nghe.',['听','听见','见']],
 ['write','Chọn đúng chữ trong “chữ Hán”.','汉___','字',['学','子','了'],'字 zì có 宀 + 子; 学 xué có phần đầu khác. 汉字 là chữ Hán, 汉语 là tiếng Hán.',['汉字','汉语','学习']],
 ['rain','Chọn chữ để diễn đạt “tuyết rơi”.','下___了。','雪',['雨','电','雷'],'雪 xuě có 雨 ở phần trên. 下雨 là mưa, 下雪 là tuyết rơi; học cả cụm để chọn đúng hiện tượng.',['下雪','下雨','雪']]
 ];
 for(const x of contrasts)add('contrast',...x);
 const compounds=[
 ['mobile','điện thoại di động','手 + 机','手机',['机手','手书','电话'],'Ghép hai chữ thành một từ. 手 đứng trước 机. 电话 là từ liên quan nhưng không phải đáp án của bộ chữ này.',['手机']],
 ['study','học tập','学 + 习','学习',['习学','学校','学生'],'学习 → học tập là cầu Hán Việt hữu ích; trật tự hai chữ ở đây tương ứng.',['学习']],
 ['school','trường học','学 + 校','学校',['校学','学习','学生'],'学校 → học hiệu; tiếng Việt quen dùng “trường học”, còn 校 vẫn gặp trong “hiệu trưởng”.',['学校','校长']],
 ['principal','hiệu trưởng','校 + 长','校长',['长校','学校','学生'],'校 là hiệu trong học hiệu; 长 ở nghĩa người đứng đầu đọc zhǎng. Hán Việt không quyết định pinyin của từng nghĩa.',['校长']],
 ['student','học sinh','学 + 生','学生',['生学','大学','学习'],'学生 → học sinh. 生 còn có nghĩa khác trong 生病, không dịch mọi 生 là “học sinh”.',['学生','生病']],
 ['university','đại học','大 + 学','大学',['学大','小学','学生'],'大 + 学 tạo 大学. Chữ 学 được giữ lại, chữ đứng trước giúp phân biệt cấp học.',['大学','小学']],
 ['chinese-char','chữ Hán','汉 + 字','汉字',['字汉','汉语','名字'],'汉字 là chữ; 汉语 là ngôn ngữ. Hai từ chia sẻ 汉 nhưng khác đối tượng.',['汉字','汉语']],
 ['language','tiếng Hán','汉 + 语','汉语',['语汉','汉字','说话'],'汉语 → Hán ngữ. Dùng 学汉语: học tiếng Trung; 写汉字: viết chữ Hán.',['汉语','汉字']],
 ['hospital','bệnh viện','医 + 院','医院',['院医','医生','饭店'],'医院 đối chiếu “y viện”. 医 còn có trong 医生; 院 được gặp ở 电影院. Nghĩa toàn từ phải học trong ngữ cảnh.',['医院','医生','电影院']],
 ['doctor','bác sĩ','医 + 生','医生',['生医','医院','学生'],'医生 đối chiếu “y sinh”, nhưng tiếng Việt thông dụng gọi bác sĩ. Không mặc định hai tổ hợp Hán Việt đồng nghĩa trong mọi thời đại.',['医生','医院']],
 ['train','tàu hỏa','火 + 车','火车',['车火','开车','出租车'],'火车 → hỏa xa. Tên hiện đại vẫn dùng cho tàu chạy điện, nên không suy “có chữ lửa thì phải chạy bằng lửa”.',['火车','车']],
 ['fruit','trái cây','水 + 果','水果',['果水','苹果','喝水'],'水果 là tên nhóm trái cây trong tiếng Trung hiện đại. Đọc cả từ; “thủy quả” chỉ là đối chiếu từng chữ, không phải cách gọi tiếng Việt thường ngày.',['水果','苹果']],
 ['dinner','bữa tối','晚 + 饭','晚饭',['饭晚','早饭','面包'],'Đổi 晚 thành 早 được 早饭, bữa sáng. Giữ 饭 và thay phần chỉ buổi để tạo nhóm nghĩa.',['晚饭','早饭']],
 ['call','gọi điện thoại','打 + 电话','打电话',['电话打','写电话','看电话'],'打电话 là kết hợp động từ + danh từ; đừng dịch 打 thành “đánh” trong cụm này.',['打电话','电话']],
 ['read-book','đọc sách','读 + 书','读书',['书读','写字','听见'],'读书 có thể nói đọc sách hoặc đi học tùy ngữ cảnh. Hỏi 看什么书/读什么书 khi cần nói rõ sách nào.',['读书','书']],
 ['clothes','quần áo','衣 + 服','衣服',['服衣','穿衣','件衣'],'衣服 là từ; 穿衣服 là cụm động từ. Một 件 quần áo là 一件衣服, không phải 件衣.',['衣服','穿','件']]
 ];
 for(const [id,v,parts,a,w,e,ws] of compounds)add('compound',id,'Sắp hai khối thành từ/cụm có nghĩa: '+v,parts,a,w,e,ws);
 const usages=[
 ['know','Tôi biết số điện thoại của cô ấy.','我___她的手机号。','知道',['认识','会','可以'],'Đối tượng là thông tin: 知道. 认识她 là quen/nhận biết cô ấy; 会开车 là biết lái xe.',['知道','认识','会']],
 ['skill','Anh ấy biết lái xe.','他___开车。','会',['认识','知道','的'],'会 + hành động để nói kỹ năng ở câu này. 知道 không đứng một mình thay cho 会 trước 开车 theo nghĩa biết lái.',['会','开车']],
 ['wear','Mặc món quần áo này đi nhé.','___这件衣服吧。','穿',['坐','读','喝'],'穿 kết hợp với quần áo/giày trong nghĩa mặc/mang. 件 là lượng từ đứng trước 衣服.',['穿','衣服','件']],
 ['hear','Không nghe thấy lời bạn, không chỉ là không chú ý nghe.','我没___你说的话。','听见',['听','看','说话'],'听见 nêu kết quả âm thanh đã đến tai. 没听 có thể nói không nghe/không thực hiện việc nghe, không cùng trọng tâm.',['听见','听','说话']],
 ['place','Nói vị trí của con mèo đã được nhắc tới.','猫___椅子上。','在',['有','是','去'],'猫 là vật đã biết, 在 nối nó với vị trí. 椅子上有一只猫 giới thiệu có mèo ở vị trí ấy.',['在','有','椅子']],
 ['more','Bạn đã gọi trà, giờ gọi thêm một cốc.','___来一杯茶吧。','再',['在','不','没'],'再 nêu thêm lần nữa/tiếp theo; 在 có chức năng vị trí hoặc đang làm. Cùng âm zài vẫn là hai chữ.',['再','在','茶']],
 ['a-little','Muốn uống một chút nước.','我想喝___水。','一点儿',['有点儿','非常','都'],'一点儿 + danh từ: một ít nước. 有点儿 + tính từ thường nói hơi có một trạng thái, như 有点儿冷.',['一点儿','有点儿','水']],
 ['cold','Cảm thấy hơi lạnh.','我觉得___冷。','有点儿',['一点儿','一半','些'],'有点儿 đứng trước 冷; 一点儿水 là cụm số lượng + danh từ.',['觉得','冷','有点儿']],
 ['price','Hỏi giá của chiếc cốc.','这个杯子___钱？','多少',['几','怎么','哪里'],'多少钱 là hỏi bao nhiêu tiền. 几 thường đi với lượng từ/danh từ phù hợp: 几个杯子.',['多少','钱','杯子']],
 ['bookmeasure','Tôi mua một quyển sách.','我买一___书。','本',['件','杯','斤'],'本 là lượng từ của sách; 件 cho món quần áo, 杯 cho cốc đồ uống, 斤 là đơn vị khối lượng.',['本','书','件','杯','斤']],
 ['some-all','Có người uống trà, có người uống sữa; không phải tất cả đều uống trà.','___人喝茶，有的人喝牛奶。','有的',['都','他们','她们'],'有的人...有的人... chia các nhóm. 都 cần đứng ở vị trí trước vị ngữ và mang nghĩa tất cả trong phạm vi đã nêu.',['有的','都','牛奶']],
 ['sale','Người bán nói: cửa hàng chúng tôi bán quần áo.','我们商店___衣服。','卖',['买','穿','写'],'卖 là bán từ góc người bán. 买 là mua từ góc người mua. Cùng món hàng nhưng vai giao dịch khác.',['卖','买','商店']]
 ];
 for(const x of usages)add('usage',...x);
 for(const q of rows)q.key='wordlab:'+q.mode+':'+q.id;
 window.HAN_WORDLAB={rows,modes:[['structure','拆','Nhận cấu tạo','Tách thành phần nhìn thấy trong một chữ; đọc nguồn khi bàn nguồn gốc.'],['contrast','辨','Phân biệt chữ','Tìm nét hoặc bộ phận khác, rồi dùng nghĩa để chọn.'],['compound','合','Ghép từ, nối Hán Việt','Phân biệt ghép hai chữ thành từ với cấu tạo bên trong một chữ.'],['recall','忆','Tự nhớ lại mặt chữ','Từ pinyin và nghĩa, gõ lại chữ Hán; áp dụng toàn kho.'],['usage','用','Chọn từ đúng cảnh','So từ gần nghĩa, lượng từ và kết hợp từ bằng câu cụ thể.'],['write','写','Viết tay từ trí nhớ','Nhìn mẫu, che lại, viết rồi tự đối chiếu.']],byKey:new Map(rows.map(q=>[q.key,q]))};
})();
