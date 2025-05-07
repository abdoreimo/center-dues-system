import database from './database.js';

// التحقق من حالة تسجيل الدخول
function checkAuth() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showLoginForm();
    } else {
        hideLoginForm();
        loadUserData(userId);
    }
}

// عرض نموذج تسجيل الدخول
function showLoginForm() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('userInfo').style.display = 'none';
}

// إخفاء نموذج تسجيل الدخول
function hideLoginForm() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('userInfo').style.display = 'block';
}

// تسجيل الدخول
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await database.connect();
        const userData = await database.getUserData(username);
        
        if (userData && userData.password === password) {
            localStorage.setItem('userId', username);
            hideLoginForm();
            loadUserData(username);
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        alert('حدث خطأ أثناء تسجيل الدخول');
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('userId');
    showLoginForm();
}

// تحميل بيانات المستخدم
async function loadUserData(userId) {
    try {
        const userData = await database.getUserData(userId);
        if (userData) {
            document.getElementById('userName').textContent = `مرحباً ${userData.name}`;
            // هنا يمكنك تحميل بيانات المستخدم الأخرى
        }
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
    }
}

// تصدير الدوال
export {
    checkAuth,
    login,
    logout,
    loadUserData
}; 