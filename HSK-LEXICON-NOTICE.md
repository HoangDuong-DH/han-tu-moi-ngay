# Nguồn dữ liệu từ điển HSK 1–9

`hsk-lexicon.json` có 12.524 dòng tra cứu cho 12.176 từ và cụm từ giản thể. Dữ liệu bao phủ 11.092 mục của chuẩn năng lực 2021 và 11.000 mục của đề cương thi công bố tháng 11/2025. Biến thể chữ và cách đọc có thể xuất hiện ở nhiều dòng. Hai nguồn cùng gộp cấp 7–9 thành một nhóm.

| Nguồn | 1 | 2 | 3 | 4 | 5 | 6 | 7–9 | Tổng |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Chuẩn năng lực 2021 | 500 | 772 | 973 | 1.000 | 1.071 | 1.140 | 5.636 | 11.092 |
| Đề cương thi công bố tháng 11/2025 | 300 | 200 | 500 | 1.000 | 1.600 | 1.800 | 5.600 | 11.000 |

Số mục trong bảng là số được đưa vào lần đầu ở mỗi cấp. Hai giá trị cấp trên mỗi dòng lần lượt là cấp theo chuẩn 2021 và theo đề cương thi. Giá trị `7` biểu thị nhóm 7–9. Giá trị `0` biểu thị từ hoặc cách đọc không có ở bản tương ứng. Trang tra gộp các dòng trùng chữ, cách đọc và lời giải, rồi hiện các cấp tương ứng trong danh sách đang chọn.

## Ghi công và giấy phép

- **Chuẩn năng lực 2021.** Danh sách chữ, pinyin và cấp dựa trên bản phiên chép `hsk30` của Ivan Krasilnikov, Shawky và Pleco Inc., theo giấy phép MIT bên dưới. Bản dùng để ghép dữ liệu là commit `4ff9e3915ce87baaecd7ebe263085573a4ea3192`. [Công bố GF0025-2021 của Bộ Giáo dục Trung Quốc](https://hudong.moe.gov.cn/jyb_xwfb/moe_2082/siju/yywzxxgls/ztzl_yywzgfbz/202111/t20211118_580755.html) · [Bản phiên chép và giấy phép MIT](https://github.com/ivankra/hsk30/tree/4ff9e3915ce87baaecd7ebe263085573a4ea3192).
- **Đề cương thi HSK công bố tháng 11/2025.** Chữ giản thể, pinyin và cấp được đọc trực tiếp từ bảng từ vựng do 中外语言交流合作中心 công bố, rồi đối chiếu số thứ tự, chữ và cấp với bản phiên chép của chinese-typing-practice.com tại commit `c24f2d32b6d03a39423eae871d3197df0df1edc8`. SHA-256 của PDF được đọc là `d8b6646599bc9a0c9616a4cb06d4b37461f8792f70a3171016d00fcd8eda09ad`. [Đề cương thi HSK chính thức](https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf) · [Bản đối chiếu](https://github.com/marpalo/hsk-vocabulary-dataset/tree/c24f2d32b6d03a39423eae871d3197df0df1edc8).
- **Nghĩa tiếng Việt và một số dạng phồn thể.** CVDICT của Phong Phan, commit `c379d909e308343a247e51619f7839a2060a271c`, phát hành theo CC BY-SA 4.0 và chuyển dịch từ CC-CEDICT. CEDICT © 1997, 1998 Paul Andrew Denisowski, được MDBG và cộng đồng CC-CEDICT tiếp tục phát triển và phát hành theo CC BY-SA 4.0. [CVDICT](https://github.com/ph0ngp/CVDICT/tree/c379d909e308343a247e51619f7839a2060a271c) · [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cc-cedict) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Bản ghép `hsk-lexicon.json` được cung cấp theo CC BY-SA 4.0. Thông báo MIT của bản phiên chép chuẩn 2021 được giữ bên dưới. [Điều khoản CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Nghĩa CVDICT có hỗ trợ dịch bằng AI và được tác giả hiệu đính một phần. Mỗi dòng giữ tối đa ba mục nghĩa từ nguồn, với ưu tiên cách đọc và dạng chữ phù hợp. Khi CVDICT ghi rõ cách đọc tương đương hoặc chỉ có một ứng viên phù hợp về thanh nhẹ hay biến điệu của 一 và 不, bản ghép dùng nghĩa nguồn cho cách đọc đó. Trong 12.524 dòng, 85 dòng chưa có nghĩa tiếng Việt phù hợp và 12 dòng chưa có dạng phồn thể được xác nhận. Các giá trị này để trống.

## Giấy phép MIT của bản phiên chép chuẩn 2021

```text
MIT License

Copyright (c) 2023 Ivan Krasilnikov
Copyright (c) 2021 Shawky
Copyright (c) 2021 Pleco Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
