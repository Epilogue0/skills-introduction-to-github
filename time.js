(function () {
    'use strict';

    // 等待 DOM 完全加载，确保 #span_dt_dt 可用
    document.addEventListener('DOMContentLoaded', function () {
        const el = document.getElementById('span_dt_dt');
        if (!el) {
            console.warn('time.js: element #span_dt_dt not found');
            return;
        }

        // 回退出生日期（月份从0开始）
        const fallbackBirth = new Date(2006, 9, 25, 0, 0, 0); // 对应 2006-10-25

        // 从 data-birth 属性解析出生日期，支持 ISO、YYYY-MM-DD 或 YYYY/MM/DD
        function parseBirthDateFromAttr(attr) {
            if (!attr) return null;
            // 先尝试直接用 Date 解析（支持 ISO 格式）
            const d1 = new Date(attr);
            if (!isNaN(d1.getTime())) return d1;
            // 再尝试 YYYY-MM-DD 或 YYYY/MM/DD
            const parts = attr.split(/[-\\/]/).map(p => parseInt(p, 10));
            if (parts.length >= 3 && parts.every(p => !isNaN(p))) {
                return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
            }
            return null;
        }

        const attr = el.getAttribute('data-birth'); // 可在 index.html 的 span 上设置 data-birth="2006-10-25"
        const birthDate = parseBirthDateFromAttr(attr) || fallbackBirth;

        function update() {
            const now = new Date();
            const diffMs = now.getTime() - birthDate.getTime();

            if (!isFinite(diffMs)) {
                el.textContent = '出生日期无效';
                return;
            }
            if (diffMs < 0) {
                el.textContent = '出生日期在将来';
                return;
            }

            const msPerDay = 24 * 60 * 60 * 1000;
            const days = Math.floor(diffMs / msPerDay);
            let rem = diffMs - days * msPerDay;
            const hours = Math.floor(rem / (60 * 60 * 1000));
            rem -= hours * 60 * 60 * 1000;
            const minutes = Math.floor(rem / (60 * 1000));
            rem -= minutes * 60 * 1000;
            const seconds = Math.floor(rem / 1000);

            el.textContent = days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分 ' + seconds + ' 秒';
        }

        update();
        setInterval(update, 1000);
    });
}());
