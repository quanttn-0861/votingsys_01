<!DOCTYPE html>
<html lang="vi">
<body>
    <h3>Xin chào bạn !</h3>
    <h4>Bạn được mời để tham gia bầu chọn poll từ Nam!</h4>
    <p><i>Xin hãy click vào link dưới đây để tham gia bầu chọn</i></p>
    @php
        $url = config('app.url').'/vote/'. $linkUser
    @endphp
    <a href="{{ $url }}" target="_blank">{{ $url }}</a>&nbsp;
</body>
</html>
