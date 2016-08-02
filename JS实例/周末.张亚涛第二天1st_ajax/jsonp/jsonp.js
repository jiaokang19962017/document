/**
 * ��һϵ�е�jsonp������װ��һ��
 */
(function () {
    // �ȶ���һ�������ռ�
    var namespace = {};
    // ���Ⱪ¶��ȫ�ֺ�����
    var globalName = 'x';
    /**
     * jsonp����
     * @param {string} url ����jsonp�ӿ�
     * @param {*} data ���͵Ĳ���
     * @param {string} jsonpcallback ֻ��һ����ͳ�����ƣ���ʾserver����õĲ�����
     * @param {Function} callback �ص�����
     */
    var jsonp = function (url, data, jsonpcallback, callback) {
        // ����ص��������� ���������ۼӵ� ��һ�� cb1 �ڶ��� cb2
        // һֱ�ۼ���Ϊ�˷�ֹ����
        var cbName = 'cb' + jsonp.count++;
        // ����ȫ�ֺ����� ��Ϊjsonp������Ҫһ��ȫ�ֺ�����
        var callbackName = 'window.x.jsonp.' + cbName;
        // ����ȫ�ֺ�����
        window.x.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                // Ϊʲô��scriptɾ����û��ɾ�������ϣ�
                // ����Ϊscriptֻ�����ȡjs���ݡ���ȡ���֮��script��ǩ��û���κ��ô���
                // ��ȡ���������ݺ�scriptҲû���˰�ëǮ��ϵ������ɾ��script��������ݹ����κ�Ӱ��
                // scriptֻ�Ǹ����ȡ���ݣ������𱣴����ݡ�
                script.parentNode.removeChild(script);
                delete window.x.jsonp[cbName];
            }
        };
        // ��Ϊjsonp��ԭ�����ͨ��script��ǩȥ����server��
        var script = document.createElement('script');
        // ����в������Ѳ�����ʽ��Ϊuri string
        if (data) {
            data = tool.encodeToURIString(data);
        }
        // jsonpcallback�Ƿ�Ϊ�ַ�������jsonpcallback���Ѿ�����õ�ȫ�ֺ�����ƴ�ӵ�һ��
        if (typeof jsonpcallback === 'string') {
            //��func��server����õĲ�����(val)һ��ƴ�ӵ�url�ĺ� http://localhost:8080?val=func
            var canshu = jsonpcallback + '=' + callbackName;
        }
        // ƴ�Ӳ���
        url = tool.hasSearch(url, data);
        // ƴ��jsonpcallback���Ѿ�����õ�ȫ�ֺ�����
        url = tool.hasSearch(url, canshu);
        // �����յõ���������url ��ֵ��script��ǩ��src������
        script.src = url;
        // ��script��ǩ��ӵ�body�ϣ�����script�Ż�ȥ�����Լ���src��
        document.body.appendChild(script);
    };
    jsonp.count = 0;
    namespace.jsonp = jsonp;
    // ��¶��ȫ�ֱ����� x
    this[globalName] = namespace;
    var tool = {
        encodeToURIString: function (data) {
            if (!data) return '';
            if (typeof data === 'string') return data;
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        },
        hasSearch: function (url, padString) {
            if (!padString) return url;
            if (typeof padString !== 'string') return url;
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        }
    }
})();
//window.x.jsonp('HTTP://XXX',{},CALLABCK,FUNCTION(){}));