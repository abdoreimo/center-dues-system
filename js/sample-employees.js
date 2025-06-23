// قاعدة بيانات تجريبية: 100 موظف
// يمكن استيرادها أو تحميلها في localStorage أو استخدامها مباشرة

const sampleEmployees = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    return {
        id: id,
        name: `موظف ${id}`,
        account: `1000${String(id).padStart(4, '0')}`,
        meter: `MTR${String(id).padStart(4, '0')}`
    };
});

// تصدير أو طباعة أو استخدام حسب الحاجة
console.log(sampleEmployees);

// إذا أردت تحميلها مباشرة في localStorage (للتجربة فقط):
// localStorage.setItem('beneficiaries', JSON.stringify(sampleEmployees));

// إذا أردت استخدامها في النظام:
// beneficiaries = sampleEmployees;
