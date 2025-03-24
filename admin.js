// توليد OTP
document.getElementById('generate-otp')?.addEventListener('click', () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpData = {
      otp: otp.toString(),
      used: false,
      created: new Date().toISOString()
    };
    localStorage.setItem('currentOTP', JSON.stringify(otpData));
    alert(`🔑 OTP الجديد: ${otp}`);
  });
  
  // إدارة المستخدمين
  function updateUserLogs(username, status) {
    const logEntry = {
      user: username,
      time: new Date().toISOString(),
      status: status,
      ip: '...' // يمكن إضافة IP حقيقي
    };
    
    const logs = JSON.parse(localStorage.getItem('userLogs')) || [];
    logs.push(logEntry);
    localStorage.setItem('userLogs', JSON.stringify(logs));
    updateEventLog();
  }
  
  // الإشعارات
  function sendBroadcast() {
    const message = document.getElementById('broadcast-message').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    users.forEach(user => {
      user.notifications = user.notifications || [];
      user.notifications.push({
        message: message,
        timestamp: new Date().toISOString()
      });
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ تم إرسال الإشعار لجميع المستخدمين!');
  }
  
  // الأدوات المتقدمة
  function nukeSystem() {
    if(confirm('⚠️ هل أنت متأكد من حذف جميع البيانات؟')) {
      localStorage.clear();
      location.reload();
    }
  }
  
  function exportData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-backup.json';
    a.click();
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
  
  // التهيئة الأولية
  document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
    updateEventLog();
  });
  
  function updateEventLog() {
    const logs = JSON.parse(localStorage.getItem('userLogs')) || [];
    const logContainer = document.getElementById('event-log');
    logContainer.innerHTML = logs.map(log => `
      <div class="log-entry">
        <span>🕒 ${new Date(log.time).toLocaleString()}</span>
        <span>👤 ${log.user}</span>
        <span>${log.status === 'success' ? '✅' : '❌'} ${log.status}</span>
      </div>
    `).join('');
  }