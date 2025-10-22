(function () {
    'use strict';

    const el = document.getElementById('span_dt_dt');
    if (!el) {
        console.warn('time.js: element #span_dt_dt not found');
        return;
    }

    // 修改为目标出生时间（注意月份从0开始）
    const birthDate = new Date(2006, 9, 25, 0, 0, 0);

    function update() {
        const now = new Date();
        let diff = Math.floor((now.getTime() - birthDate.getTime()) / 1000); // 秒
        if (!isFinite(diff) || diff < 0) {
            el.textContent = '出生日期无效或在将来';
            return;
        }
        const days = Math.floor(diff / (24 * 3600));
        diff -= days * 24 * 3600;
        const hours = Math.floor(diff / 3600);
        diff -= hours * 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff - minutes * 60;

        el.textContent = days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分 ' + seconds + ' 秒';
    }

    update();
    setInterval(update, 1000);
}());
