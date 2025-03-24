function generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 15);
    const num2 = Math.floor(Math.random() * 15);
    const operators = ['+', '-', '*'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    
    // خلفية متدرجة
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 85%)`);
    gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 85%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // تشويش
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for(let i = 0; i < 200; i++) {
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5,
        Math.random() * 5
      );
    }
    
    // رسم المعادلة
    ctx.fillStyle = '#000';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(`${num1} ${op} ${num2} = ?`, 40, 50);
    
    // حفظ الإجابة
    const answer = eval(`${num1}${op}${num2}`);
    localStorage.setItem('captchaAnswer', answer);
    
    return canvas.toDataURL();
  }
  
  // توليد CAPTCHA عند التحميل
  document.addEventListener('DOMContentLoaded', () => {
    const captchaImg = document.getElementById('captcha-image');
    if(captchaImg) {
      captchaImg.src = generateMathCaptcha();
    }
  });