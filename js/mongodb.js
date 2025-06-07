// تكوين MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://abdou:abdcom1790@abdou.vzucgpc.mongodb.net/?retryWrites=true&w=majority&appName=abdou';
const API_KEY = 'bjdhiubl';
const PRIVATE_KEY = '70721204-e4e5-4c69-bb70-1227cac07fcc';

// دالة للتحقق من تسجيل الدخول
async function checkLogin(username, password) {
    try {
        const response = await fetch('https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1/action/findOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'private-key': PRIVATE_KEY
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: 'center-dues-system',
                collection: 'users',
                filter: {
                    userId: username,
                    password: password
                }
            })
        });

        const data = await response.json();
        return data.document !== null;
    } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        return false;
    }
}

// دالة لحفظ بيانات المستخدم
async function saveUserData(userId, data) {
    try {
        const response = await fetch('https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1/action/updateOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'private-key': PRIVATE_KEY
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: 'center-dues-system',
                collection: 'users',
                filter: { userId },
                update: {
                    $set: { ...data, lastUpdated: new Date() }
                },
                upsert: true
            })
        });

        const result = await response.json();
        return result.modifiedCount > 0 || result.upsertedCount > 0;
    } catch (error) {
        console.error('خطأ في حفظ بيانات المستخدم:', error);
        return false;
    }
}

// دالة لاسترجاع بيانات المستخدم
async function getUserData(userId) {
    try {
        const response = await fetch('https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1/action/findOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'private-key': PRIVATE_KEY
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: 'center-dues-system',
                collection: 'users',
                filter: { userId }
            })
        });

        const data = await response.json();
        return data.document;
    } catch (error) {
        console.error('خطأ في استرجاع بيانات المستخدم:', error);
        return null;
    }
}

export {
    checkLogin,
    saveUserData,
    getUserData
}; 