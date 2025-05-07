// تهيئة المتغيرات العامة
let beneficiarySearchTerm = '';
window.currentBeneficiaryFilterType = 'all';
window.beneficiaries = [];

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    loadBeneficiaries();
    initializeTabs();
});

// تهيئة وظائف البحث
function initializeSearch() {
    const beneficiarySearchInput = document.getElementById('beneficiary-search-input');
    const beneficiarySearchClear = document.getElementById('beneficiary-search-clear');

    if (beneficiarySearchInput) {
        beneficiarySearchInput.addEventListener('input', function() {
            beneficiarySearchTerm = this.value.trim();
            if (beneficiarySearchTerm.length > 0) {
                beneficiarySearchClear.style.display = '';
            } else {
                beneficiarySearchClear.style.display = 'none';
            }
            applyBeneficiarySearchAndFilter();
        });
    }

    if (beneficiarySearchClear) {
        beneficiarySearchClear.addEventListener('click', function() {
            beneficiarySearchInput.value = '';
            beneficiarySearchTerm = '';
            beneficiarySearchClear.style.display = 'none';
            applyBeneficiarySearchAndFilter();
            beneficiarySearchInput.focus();
        });
    }
}

// تهيئة الفلاتر
function initializeFilters() {
    const beneficiaryFilterButtons = document.getElementById('beneficiary-filter-buttons');
    if (beneficiaryFilterButtons) {
        beneficiaryFilterButtons.addEventListener('click', function(e) {
            if (e.target.closest('button')) {
                setTimeout(applyBeneficiarySearchAndFilter, 0);
            }
        });
    }
}

// تهيئة التبويبات
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content > div');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // إزالة الفئة النشطة من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المحدد
            button.classList.add('active');
            
            // إخفاء جميع المحتويات
            tabContents.forEach(content => content.style.display = 'none');
            // إظهار المحتوى المحدد
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // تفعيل التبويب الأول افتراضياً
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

// تطبيق البحث والتصفية
function applyBeneficiarySearchAndFilter() {
    let filteredList = Array.isArray(window.beneficiaries) ? [...window.beneficiaries] : [];
    
    // تطبيق الفلتر
    if (window.currentBeneficiaryFilterType !== 'all') {
        filteredList = filteredList.filter(b => b.compensation && b.compensation.type === window.currentBeneficiaryFilterType);
    }
    
    // تطبيق البحث
    if (beneficiarySearchTerm.length > 0) {
        const term = beneficiarySearchTerm.toLowerCase();
        filteredList = filteredList.filter(b =>
            (b.lastName && b.lastName.toLowerCase().includes(term)) ||
            (b.firstName && b.firstName.toLowerCase().includes(term)) ||
            (b.ssNum && b.ssNum.includes(term))
        );
    }
    
    // عرض النتائج
    if (typeof window.renderBeneficiariesTable === 'function') {
        window.renderBeneficiariesTable(filteredList);
    }
}

// تغيير نوع الفلتر
window.applyBeneficiaryFilter = function(filterType) {
    window.currentBeneficiaryFilterType = filterType;
    applyBeneficiarySearchAndFilter();
    
    // تحديث حالة الأزرار
    document.querySelectorAll('#beneficiary-filter-buttons button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-filter-type') === filterType);
    });
};

// تحميل بيانات المستفيدين
function loadBeneficiaries() {
    // هنا يمكنك إضافة كود لتحميل البيانات من الخادم
    // مثال:
    // fetch('/api/beneficiaries')
    //     .then(response => response.json())
    //     .then(data => {
    //         window.beneficiaries = data;
    //         applyBeneficiarySearchAndFilter();
    //     });
} 