window.HAN_TEA_ORDERS = [
  {
    id: 'mai-hot-black',
    tier: 1,
    name: 'Mai',
    line: '你好，我要一杯热红茶，不加糖。',
    py: 'Nǐ hǎo, wǒ yào yì bēi rè hóngchá, bù jiā táng.',
    vi: 'Chào bạn, cho mình một ly hồng trà nóng, không thêm đường.',
    note: '热 đứng trước 红茶 để gọi hồng trà nóng. 不加糖 là yêu cầu pha không thêm đường.',
    target: '热',
    axis: 'temp',
    cups: [{base: 'black', temp: 'hot', sugar: 'none'}]
  },
  {
    id: 'linh-light-green',
    tier: 1,
    name: 'Linh',
    line: '请给我一杯绿茶，加冰，少放一点儿糖。',
    py: 'Qǐng gěi wǒ yì bēi lǜchá, jiā bīng, shǎo fàng yìdiǎnr táng.',
    vi: 'Cho mình một ly trà xanh có đá, bớt đường một chút nhé.',
    note: 'Trong 少放一点儿糖, 少 đặt trước động từ 放. Lượng đường giảm một chút so với mức bình thường.',
    target: '一点儿',
    axis: 'sugar',
    cups: [{base: 'green', temp: 'cold', sugar: 'less'}]
  },
  {
    id: 'an-one-coffee',
    tier: 1,
    name: 'An',
    line: '一杯热咖啡，正常糖，谢谢。',
    py: 'Yì bēi rè kāfēi, zhèngcháng táng, xièxie.',
    vi: 'Cho mình một ly cà phê nóng, đường bình thường. Cảm ơn nhé.',
    note: '一杯 đếm một ly. Nói lượng và tên đồ uống ngay đầu câu là cách gọi món tự nhiên ở quầy.',
    target: '杯',
    axis: 'quantity',
    cups: [{base: 'coffee', temp: 'hot', sugar: 'regular'}]
  },
  {
    id: 'vy-iced-black',
    tier: 1,
    name: 'Vy',
    line: '麻烦给我一杯红茶，加冰，正常糖。',
    py: 'Máfan gěi wǒ yì bēi hóngchá, jiā bīng, zhèngcháng táng.',
    vi: 'Cho mình một ly hồng trà có đá, đường bình thường nhé.',
    note: '红茶 là hồng trà, cũng gọi là trà đen. Khách nêu loại trà rồi nói 加冰 để yêu cầu thêm đá.',
    target: '茶',
    axis: 'base',
    cups: [{base: 'black', temp: 'cold', sugar: 'regular'}]
  },
  {
    id: 'nam-no-sugar',
    tier: 1,
    name: 'Nam',
    line: '来一杯咖啡，加冰，不要糖。',
    py: 'Lái yì bēi kāfēi, jiā bīng, bú yào táng.',
    vi: 'Cho mình một ly cà phê có đá, không thêm đường.',
    note: '不要糖 là cách nói gọn khi muốn bỏ đường trong ly. Đọc 不 thành bú trước yào.',
    target: '不要',
    axis: 'sugar',
    cups: [{base: 'coffee', temp: 'cold', sugar: 'none'}]
  },
  {
    id: 'lan-two-green',
    tier: 2,
    name: 'Lan',
    line: '我要两杯热绿茶，都不加糖。',
    py: 'Wǒ yào liǎng bēi rè lǜchá, dōu bù jiā táng.',
    vi: 'Cho mình hai ly trà xanh nóng, cả hai đều không thêm đường.',
    note: '两 đứng trước lượng từ 杯 để gọi hai ly. 都 áp dụng yêu cầu không thêm đường cho cả hai.',
    target: '两',
    axis: 'quantity',
    cups: [
      {base: 'green', temp: 'hot', sugar: 'none'},
      {base: 'green', temp: 'hot', sugar: 'none'}
    ]
  },
  {
    id: 'ha-two-iced',
    tier: 2,
    name: 'Hà',
    line: '一杯红茶，一杯咖啡，两杯都加冰，都要少糖。',
    py: 'Yì bēi hóngchá, yì bēi kāfēi, liǎng bēi dōu jiā bīng, dōu yào shǎo táng.',
    vi: 'Cho mình một ly hồng trà và một ly cà phê. Cả hai đều có đá và ít đường.',
    note: 'Hai tiếng 都 cùng chỉ cả hai ly. Tiếng đầu áp dụng cho đá, tiếng sau áp dụng cho mức đường.',
    target: '都',
    axis: 'temp',
    cups: [
      {base: 'black', temp: 'cold', sugar: 'less'},
      {base: 'coffee', temp: 'cold', sugar: 'less'}
    ]
  },
  {
    id: 'minh-add-green',
    tier: 2,
    name: 'Minh',
    line: '给我一杯热红茶，少糖，再要一杯绿茶，加冰，正常糖。',
    py: 'Gěi wǒ yì bēi rè hóngchá, shǎo táng, zài yào yì bēi lǜchá, jiā bīng, zhèngcháng táng.',
    vi: 'Cho mình một ly hồng trà nóng ít đường và thêm một ly trà xanh có đá, đường bình thường.',
    note: '再要一杯 mở phần gọi thêm, đưa tổng số lên hai ly. 加冰 và 正常糖 thuộc ly trà xanh vừa nêu.',
    target: '再',
    axis: 'quantity',
    cups: [
      {base: 'black', temp: 'hot', sugar: 'less'},
      {base: 'green', temp: 'cold', sugar: 'regular'}
    ]
  },
  {
    id: 'thu-coffee-split',
    tier: 2,
    name: 'Thu',
    line: '两杯都要咖啡。一杯要热的，正常糖。另一杯加冰，不加糖。',
    py: 'Liǎng bēi dōu yào kāfēi. Yì bēi yào rè de, zhèngcháng táng. Lìng yì bēi jiā bīng, bù jiā táng.',
    vi: 'Cả hai ly đều là cà phê. Một ly nóng, đường bình thường. Ly kia có đá, không thêm đường.',
    note: '另一杯 chuyển sang ly thứ hai. Trong ly ấy, 加 đi với 冰 để thêm đá và 不加 đi với 糖 để bỏ đường.',
    target: '加',
    axis: 'sugar',
    cups: [
      {base: 'coffee', temp: 'hot', sugar: 'regular'},
      {base: 'coffee', temp: 'cold', sugar: 'none'}
    ]
  },
  {
    id: 'duy-one-of-each',
    tier: 2,
    name: 'Duy',
    line: '红茶和绿茶各来一杯，都要热的。红茶少糖，绿茶正常糖。',
    py: 'Hóngchá hé lǜchá gè lái yì bēi, dōu yào rè de. Hóngchá shǎo táng, lǜchá zhèngcháng táng.',
    vi: 'Cho mình một ly hồng trà và một ly trà xanh, cả hai đều nóng. Hồng trà ít đường, trà xanh đường bình thường.',
    note: '和 nối hai tên đồ uống, còn 各来一杯 nghĩa là mỗi loại một ly. Khách nói riêng mức đường của từng loại.',
    target: '和',
    axis: 'base',
    cups: [
      {base: 'black', temp: 'hot', sugar: 'less'},
      {base: 'green', temp: 'hot', sugar: 'regular'}
    ]
  },
  {
    id: 'phuc-black-first',
    tier: 3,
    name: 'Phúc',
    line: '请先上一杯热红茶，少糖。再上一杯加冰的咖啡，不加糖。',
    py: 'Qǐng xiān shàng yì bēi rè hóngchá, shǎo táng. Zài shàng yì bēi jiā bīng de kāfēi, bù jiā táng.',
    vi: 'Cho mình một ly hồng trà nóng ít đường trước, rồi một ly cà phê có đá, không thêm đường.',
    note: '上 dùng khi dặn nhân viên mang món ra. 先上 bảo mang hồng trà trước, 再上 dành cho cà phê sau đó.',
    target: '先',
    axis: 'sequence',
    cups: [
      {base: 'black', temp: 'hot', sugar: 'less'},
      {base: 'coffee', temp: 'cold', sugar: 'none'}
    ],
    sequence: true
  },
  {
    id: 'binh-coffee-first',
    tier: 3,
    name: 'Bình',
    line: '咖啡请先上，一杯热的，正常糖。绿茶再上，一杯加冰的，少糖。',
    py: 'Kāfēi qǐng xiān shàng, yì bēi rè de, zhèngcháng táng. Lǜchá zài shàng, yì bēi jiā bīng de, shǎo táng.',
    vi: 'Mang cà phê trước giúp mình, một ly nóng, đường bình thường. Sau đó cho mình một ly trà xanh có đá, ít đường.',
    note: 'Khách nêu tên món trước. 咖啡请先上 gọi cà phê ra đầu tiên, rồi 绿茶再上 chuyển sang trà xanh.',
    target: '再',
    axis: 'sequence',
    cups: [
      {base: 'coffee', temp: 'hot', sugar: 'regular'},
      {base: 'green', temp: 'cold', sugar: 'less'}
    ],
    sequence: true
  },
  {
    id: 'huong-switch-base',
    tier: 3,
    name: 'Hương',
    line: '一杯红茶，加冰，正常糖。再加一杯热咖啡，少糖。',
    py: 'Yì bēi hóngchá, jiā bīng, zhèngcháng táng. Zài jiā yì bēi rè kāfēi, shǎo táng.',
    vi: 'Một ly hồng trà có đá, đường bình thường. Thêm một ly cà phê nóng, ít đường nhé.',
    note: '再加一杯 là thêm một ly vào đơn. 加冰 chỉ thêm đá vào một ly đã gọi.',
    target: '加',
    axis: 'quantity',
    cups: [
      {base: 'black', temp: 'cold', sugar: 'regular'},
      {base: 'coffee', temp: 'hot', sugar: 'less'}
    ],
    revision: {
      after: 9,
      line: '等一下，咖啡改成绿茶。要一杯加冰的红茶，正常糖，还有一杯热绿茶，少糖。',
      py: 'Děng yíxià, kāfēi gǎichéng lǜchá. Yào yì bēi jiā bīng de hóngchá, zhèngcháng táng, hái yǒu yì bēi rè lǜchá, shǎo táng.',
      vi: 'Khoan, đổi cà phê thành trà xanh nhé. Cho mình một ly hồng trà có đá, đường bình thường và một ly trà xanh nóng, ít đường.',
      note: '改成绿茶 chuyển ly cà phê cũ thành trà xanh. Lời gọi lại nêu cả ly hồng trà và ly trà xanh.',
      target: '茶',
      axis: 'base',
      cups: [
        {base: 'black', temp: 'cold', sugar: 'regular'},
        {base: 'green', temp: 'hot', sugar: 'less'}
      ]
    }
  },
  {
    id: 'thao-add-ice',
    tier: 3,
    name: 'Thảo',
    line: '麻烦来两杯热咖啡，都少糖。',
    py: 'Máfan lái liǎng bēi rè kāfēi, dōu shǎo táng.',
    vi: 'Cho mình hai ly cà phê nóng, cả hai đều ít đường nhé.',
    note: '少糖 chỉ lượng đường thấp hơn thường lệ. 都 đứng trước để yêu cầu mức ấy cho cả hai ly.',
    target: '少',
    axis: 'sugar',
    cups: [
      {base: 'coffee', temp: 'hot', sugar: 'less'},
      {base: 'coffee', temp: 'hot', sugar: 'less'}
    ],
    revision: {
      after: 11,
      line: '等一下，两杯都改成加冰的咖啡，还是都要少糖。',
      py: 'Děng yíxià, liǎng bēi dōu gǎichéng jiā bīng de kāfēi, háishi dōu yào shǎo táng.',
      vi: 'Khoan, đổi cả hai ly thành cà phê có đá, vẫn ít đường cả hai nhé.',
      note: '两杯都改成 áp dụng thay đổi cho cả hai ly. 还是都要少糖 giữ mức ít đường ở cả hai.',
      target: '都',
      axis: 'temp',
      cups: [
        {base: 'coffee', temp: 'cold', sugar: 'less'},
        {base: 'coffee', temp: 'cold', sugar: 'less'}
      ]
    }
  },
  {
    id: 'ngoc-switch-sequence',
    tier: 3,
    name: 'Ngọc',
    line: '我想先喝一杯加冰的绿茶，不加糖。再给我一杯热红茶，正常糖。',
    py: 'Wǒ xiǎng xiān hē yì bēi jiā bīng de lǜchá, bù jiā táng. Zài gěi wǒ yì bēi rè hóngchá, zhèngcháng táng.',
    vi: 'Mình muốn uống một ly trà xanh có đá, không thêm đường trước. Sau đó cho mình một ly hồng trà nóng, đường bình thường.',
    note: '先喝 cho biết khách muốn uống món nào trước. 再给我 giới thiệu ly cần mang sau.',
    target: '先',
    axis: 'sequence',
    cups: [
      {base: 'green', temp: 'cold', sugar: 'none'},
      {base: 'black', temp: 'hot', sugar: 'regular'}
    ],
    sequence: true,
    revision: {
      after: 14,
      line: '等一下，顺序换一下。先上一杯热红茶，正常糖，再上一杯加冰的绿茶，不加糖。',
      py: 'Děng yíxià, shùnxù huàn yíxià. Xiān shàng yì bēi rè hóngchá, zhèngcháng táng, zài shàng yì bēi jiā bīng de lǜchá, bù jiā táng.',
      vi: 'Khoan, đổi thứ tự một chút nhé. Cho mình một ly hồng trà nóng, đường bình thường trước, rồi một ly trà xanh có đá, không thêm đường.',
      note: '顺序换一下 báo đổi thứ tự. Lần này 先 gắn với hồng trà và 再 gắn với trà xanh.',
      target: '再',
      axis: 'sequence',
      cups: [
        {base: 'black', temp: 'hot', sugar: 'regular'},
        {base: 'green', temp: 'cold', sugar: 'none'}
      ],
      sequence: true
    }
  }
];
