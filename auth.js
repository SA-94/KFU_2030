const adminCredentials = { username: "admin", password: "admin123" };

document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const captchaAnswer = document.getElementById('captcha-input').value;
  const storedAnswer = localStorage.getItem('captchaAnswer');
  
  // التحقق من CAPTCHA
  if(parseInt(captchaAnswer) !== parseInt(storedAnswer)) {
    showError('❌ الإجابة غير صحيحة، يرجى المحاولة مجدداً');
    document.getElementById('captcha-image').src = generateMathCaptcha();
    return;
  }
  
  // التحقق من بيانات المدير
  if(username === adminCredentials.username && password === adminCredentials.password) {
    window.location.href = 'admin.html';
    return;
  }
  
  // التحقق من OTP
  const otpData = JSON.parse(localStorage.getItem('currentOTP')) || {};
  if(otpData.otp === password && !otpData.used) {
    otpData.used = true;
    localStorage.setItem('currentOTP', JSON.stringify(otpData));
    window.location.href = 'user.html';
  } else {
    handleFailedLogin(username);
  }
});

function handleFailedLogin(username) {
  let userData = JSON.parse(localStorage.getItem(`user_${username}`)) || { attempts: 0 };
  userData.attempts++;
  
  if(userData.attempts >= 3) {
    const lockTime = Date.now() + (30000 * userData.attempts);
    userData.lockUntil = lockTime;
    showError(`⏳ تم تعليق الحساب لمدة ${userData.attempts * 0.5} دقيقة`);
    setTimeout(() => {
      userData.attempts = 0;
      localStorage.setItem(`user_${username}`, JSON.stringify(userData));
    }, lockTime - Date.now());
  }
  
  localStorage.setItem(`user_${username}`, JSON.stringify(userData));
  showError('🔐 بيانات الدخول غير صحيحة');
}

function showError(message) {
  const errorDiv = document.getElementById('error-msg');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => errorDiv.style.display = 'none', 5000);
}