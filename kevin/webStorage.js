class WebStorage {
    constructor() {
        if (typeof(Storage) === 'undefined') {
            console.log('WebStorage not available, try downloading Firefox: https://www.mozilla.org/en-US/firefox/new/');
        }
    }

    checktype(type) {
        if (type === undefined) {
            console.log('Missing Type : Session or Local');
            return false;
        } else if (!(type.localeCompare('session') || type.localeCompare('local'))) {
            console.log('Unkown Type : Session or Local');
            return false;
        } else {
            return true;
        }
    }

    add(key, value, type) {
        if (this.checktype(type)) {
            try {
                (type === 'local') ? (localStorage.setItem(key, value)) : (sessionStorage.setItem(key, value));
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    console.log('Size Limit 5MB');
                }
            }
        }
    }

    get(key, type = null) {
        if (type === null) {
            return sessionStorage.getItem(key) || localStorage.getItem(key);
        } else {
            if (type === 'local') {
                return localStorage.getItem(key);
            } else if (type === 'session') {
                return sessionStorage.getItem(key);
            }
        }
    }

    remove(key, type = null) {
        if (type === null) {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        } else {
            if (type === 'session') {
                sessionStorage.removeItem(key);
            } else if (type === 'local') {
                localStorage.removeItem('key');
            }
        }
    }

    clear(type) {
        if (type === 'session') {
            sessionStorage.clear();
        } else if (type === 'local') {
            localStorage.clear();
        }
    }
}