(() => {
  const {words,meta}=window.HAN_DATA;
  const byHan=new Map(words.map(word=>[word.han,word]));
  const rows=[
    ['上','shàng','thượng','Trên; lên phương tiện; học hoặc đi học','Trong 桌子上, 上 đứng sau 桌子 để chỉ vị trí trên bàn. Trong 上火车, 上 là lên tàu. Trong 上中学, 上 là theo học bậc trung học.',[
      ['我们上火车吧。','Wǒmen shàng huǒchē ba.','Chúng ta lên tàu đi.'],
      ['他明年上中学。','Tā míngnián shàng zhōngxué.','Năm sau cậu ấy học trung học.'],
      ['书在桌子上。','Shū zài zhuōzi shàng.','Sách ở trên bàn.']]],
    ['火车','huǒchē','hỏa xa','Tàu hỏa','上火车 là lên tàu, 坐火车 là đi bằng tàu, 火车开了 là tàu đã chạy.',[
      ['我们坐火车去北京。','Wǒmen zuò huǒchē qù Běijīng.','Chúng tôi đi Bắc Kinh bằng tàu hỏa.']]],
    ['中午','zhōngwǔ','trung ngọ','Buổi trưa','中午 chỉ khoảng giữa ngày. 上午 là buổi sáng và 下午 là buổi chiều.',[
      ['火车中午十二点开。','Huǒchē zhōngwǔ shí’èr diǎn kāi.','Tàu khởi hành lúc 12 giờ trưa.']]],
    ['开','kāi','khai','Mở; lái xe; chạy hoặc khởi hành','开门 là mở cửa, 开车 là lái xe. Khi 火车 làm chủ ngữ, 开 có thể chỉ tàu chạy hoặc khởi hành.',[
      ['火车开了。','Huǒchē kāi le.','Tàu chạy rồi.']]],
    ['有些','yǒuxiē','hữu ta','Một số; hơi','有些 + danh từ chỉ một phần trong nhóm. 有些 + tính từ có thể chỉ mức độ nhẹ, như 有些晚 (hơi muộn).',[
      ['有些学生在写字。','Yǒuxiē xuésheng zài xiě zì.','Một số học sinh đang viết chữ.']]],
    ['有的','yǒu de','hữu đích','Có người/cái thì; một số trong nhóm','Khi nhóm đã rõ, dùng 有的…，有的… để kể các nhóm nhỏ làm những việc khác nhau.',[
      ['有的在写字，有的在看书。','Yǒu de zài xiě zì, yǒu de zài kàn shū.','Có bạn đang viết chữ, có bạn đang đọc sách.']]],
    ['了','le','','Trợ từ chỉ sự việc đã xảy ra hoặc tình huống mới','了 sau động từ có thể đánh dấu sự việc đã diễn ra, như 写了一封信. 了 cuối câu có thể báo tình huống mới, như 火车开了. Có câu mà hai cách hiểu gặp nhau.',[
      ['火车开了。','Huǒchē kāi le.','Tàu chạy rồi.'],
      ['我写了一封信。','Wǒ xiě le yì fēng xìn.','Tôi đã viết một lá thư.']]],
    ['写','xiě','tả','Viết','Viết chữ là 写字. Nói rõ hệ chữ đang luyện thì dùng 写汉字.',[
      ['她在写汉字。','Tā zài xiě Hànzì.','Cô ấy đang viết chữ Hán.']]],
    ['都','dōu','đô','Đều; tất cả trong nhóm đang nói','Đặt 都 sau chủ ngữ và trước phần vị ngữ. 他们都会写 có nghĩa mọi người trong nhóm đó đều biết viết.',[
      ['他们都在听。','Tāmen dōu zài tīng.','Họ đều đang nghe.']]],
    ['听见','tīngjiàn','thính kiến','Nghe thấy','听 chỉ hoạt động nghe. 见 trong 听见 cho biết âm thanh đã lọt đến tai. 没听见 là đã không nghe thấy.',[
      ['你听见了吗？','Nǐ tīngjiàn le ma?','Bạn nghe thấy chưa?']]],
    ['不要','bú yào','bất yếu','Đừng; không muốn hoặc không lấy','不要 + hành động có thể dùng để ngăn hoặc nhắc, như 不要说话. Trong 我不要茶, người nói từ chối lấy trà.',[
      ['请不要说话。','Qǐng bú yào shuōhuà.','Xin đừng nói chuyện.']]],
    ['说话','shuōhuà','thuyết thoại','Nói; nói chuyện','说话 chỉ hoạt động nói. 说汉语 cho biết người đó nói bằng tiếng Trung.',[
      ['他们在说话。','Tāmen zài shuōhuà.','Họ đang nói chuyện.']]],
    ['听','tīng','thính','Nghe','听 chỉ việc nghe, như 听老师说话. Dùng 听见 khi muốn cho biết đã nghe thấy âm thanh.',[
      ['请听老师说话。','Qǐng tīng lǎoshī shuōhuà.','Hãy nghe thầy cô nói.']]],
    ['那些','nàxiē','na ta','Những người hoặc vật kia','那些 có thể đứng trước danh từ như 那些学生 hoặc đứng riêng khi đối tượng đã rõ. 这些 chỉ nhóm này.',[
      ['那些是小学生。','Nàxiē shì xiǎoxuéshēng.','Những bạn kia là học sinh tiểu học.']]],
    ['字','zì','tự','Chữ; ký tự','一个字 là một chữ. 汉字 gọi cụ thể chữ Hán, như 学 trong 学生.',[
      ['这个字怎么写？','Zhège zì zěnme xiě?','Chữ này viết thế nào?']]],
    ['汉语','Hànyǔ','Hán ngữ','Tiếng Hán; tiếng Trung','语 là ngữ trong ngôn ngữ. Nói tiếng Trung dùng 说汉语, viết chữ Hán dùng 写汉字.',[
      ['她会说汉语。','Tā huì shuō Hànyǔ.','Cô ấy biết nói tiếng Trung.']]],
    ['汉字','Hànzì','Hán tự','Chữ Hán','汉字 là hệ chữ hoặc từng chữ trong hệ ấy. Có thể ghép thành câu 学汉语，也学写汉字 (học tiếng Trung và học viết chữ Hán).',[
      ['我会写这个汉字。','Wǒ huì xiě zhège Hànzì.','Tôi biết viết chữ Hán này.']]],
    ['明年','míngnián','minh niên','Năm sau','明天 là ngày mai. Đổi đơn vị 天 thành 年 thì 明年 chỉ năm sau.',[
      ['她明年上小学。','Tā míngnián shàng xiǎoxué.','Năm sau cô bé học tiểu học.']]],
    ['中学','zhōngxué','trung học','Trường hoặc bậc trung học','中学 có thể bao gồm 初中 (THCS) và 高中 (THPT). 上中学 là theo học bậc trung học.',[
      ['哥哥在上中学。','Gēge zài shàng zhōngxué.','Anh trai đang học trung học.']]],
    ['小学','xiǎoxué','tiểu học','Trường hoặc bậc tiểu học','小学 gọi bậc học hoặc trường. Ghép thêm 生 thành 小学生, chỉ người học bậc đó.',[
      ['弟弟在上小学。','Dìdi zài shàng xiǎoxué.','Em trai đang học tiểu học.']]],
    ['中学生','zhōngxuéshēng','trung học sinh','Học sinh trung học','Ghép 中学 (bậc trung học) với 生 (người học), cùng kiểu với 小学生 và 大学生.',[
      ['他们是中学生。','Tāmen shì zhōngxuéshēng.','Họ là học sinh trung học.']]],
    ['小学生','xiǎoxuéshēng','tiểu học sinh','Học sinh tiểu học','小学 là bậc học. 生 cho biết từ này chỉ người học, giống 生 trong 学生.',[
      ['她们都是小学生。','Tāmen dōu shì xiǎoxuéshēng.','Các bạn ấy đều là học sinh tiểu học.']]],
    ['他们','tāmen','tha môn','Họ (nhóm nam hoặc nhóm hỗn hợp)','他们、她们、它们 đều đọc tāmen. Khi viết, chọn 他 cho nhóm nam hoặc nhóm có cả nam và nữ.',[
      ['他们都听见了。','Tāmen dōu tīngjiàn le.','Họ đều nghe thấy rồi.']]],
    ['她们','tāmen','tha môn','Họ (nhóm nữ)','她们 dùng cho nhóm nữ đã xác định. Khi nghe tāmen, dựa vào đoạn hội thoại để biết người nói chỉ ai.',[
      ['她们都在写汉字。','Tāmen dōu zài xiě Hànzì.','Các bạn nữ đều đang viết chữ Hán.']]],
    ['它们','tāmen','tha môn','Chúng (động vật hoặc đồ vật)','Dùng 它们 để nhắc lại các con vật hoặc đồ vật đã nói đến. Cách đọc giống 他们 và 她们.',[
      ['那些是小猫，它们都在睡觉。','Nàxiē shì xiǎomāo, tāmen dōu zài shuìjiào.','Kia là những chú mèo con, chúng đều đang ngủ.']]],
    ['晚','wǎn','vãn','Muộn; tối trong các từ ghép','太晚了 là muộn quá rồi. 晚 có nghĩa buổi tối trong 晚饭 và 晚上.',[
      ['我们来晚了。','Wǒmen lái wǎn le.','Chúng tôi đến muộn rồi.']]]
  ];
  const items=[];
  for(const [index,[han,py,hv,gloss,studyNote,studyExamples]] of rows.entries()){
    let word=byHan.get(han);
    if(!word){
      word={id:'NOV05-'+String(index+1).padStart(2,'0'),han,py,hv,category:'Bộ từ 05/11',extra:false,lesson11:false};
      words.push(word);
    }
    Object.assign(word,{gloss,meaning:gloss+'.',studyNote,studyExamples,nov05:true});
    items.push(word);
  }
  window.HAN_DATA.meta={...meta,total:words.length};
  window.HAN_NOV05=items;
})();
