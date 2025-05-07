import database from './database.js';

async function createInitialUser() {
    try {
        await database.connect();
        
        // بيانات المستخدم الأول
        const userData = {
            userId: 'admin',
            name: 'المدير',
            password: 'admin123', // يمكنك تغيير كلمة المرور
            role: 'admin',
            createdAt: new Date()
        };

        // حفظ بيانات المستخدم
        const result = await database.saveUserData(userData.userId, userData);
        
        if (result) {
            console.log('تم إنشاء المستخدم بنجاح');
        } else {
            console.error('فشل في إنشاء المستخدم');
        }
    } catch (error) {
        console.error('خطأ في إنشاء المستخدم:', error);
    } finally {
        await database.close();
    }
}

// تنفيذ إنشاء المستخدم
createInitialUser(); 