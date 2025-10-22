(function () {
    'use strict';

    const el = document.getElementById('span_dt_dt');
    if (!el) {
        console.warn('time.js: element #span_dt_dt not found');
        return;
    }

    // 请修改出生日期（月份从0开始）：例如 2006-10-25 -> new Date(2006, 9, 25, 0, 0, 0)
    const birthDate = new Date(2006, 9, 25, 0, 0, 0);

    function update() {
        const now = new Date();
        const diffMs = now.getTime() - birthDate.getTime();
        if (isNaN(diffMs)) {
            el.textContent = '出生日期无效';
            return;
        }
        const msPerDay = 24 * 60 * 60 * 1000;
        const days = Math.floor(diffMs / msPerDay);
        el.textContent = `${days} 天`;
    }

    update();
    setInterval(update, 1000);
}());