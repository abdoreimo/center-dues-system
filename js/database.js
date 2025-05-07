import { MongoClient } from 'mongodb';
import dbConfig from './config.js';

class Database {
    constructor() {
        this.client = new MongoClient(dbConfig.connectionString);
        this.db = null;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(dbConfig.databaseName);
            console.log('تم الاتصال بقاعدة البيانات بنجاح');
        } catch (error) {
            console.error('خطأ في الاتصال بقاعدة البيانات:', error);
            throw error;
        }
    }

    async saveUserData(userId, data) {
        try {
            const collection = this.db.collection('users');
            await collection.updateOne(
                { userId },
                { $set: { ...data, lastUpdated: new Date() } },
                { upsert: true }
            );
            return true;
        } catch (error) {
            console.error('خطأ في حفظ بيانات المستخدم:', error);
            return false;
        }
    }

    async getUserData(userId) {
        try {
            const collection = this.db.collection('users');
            const userData = await collection.findOne({ userId });
            return userData;
        } catch (error) {
            console.error('خطأ في استرجاع بيانات المستخدم:', error);
            return null;
        }
    }

    async close() {
        try {
            await this.client.close();
            console.log('تم إغلاق الاتصال بقاعدة البيانات');
        } catch (error) {
            console.error('خطأ في إغلاق الاتصال بقاعدة البيانات:', error);
        }
    }
}

export default new Database(); 