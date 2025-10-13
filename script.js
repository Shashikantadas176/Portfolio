/* ------------- Initialization & helpers ------------- */

// EmailJS placeholders:
   
if (window.emailjs) {
  emailjs.init("Q5-0TKfhTWT_ifGSO"); 
}

/* Utility: set theme from localStorage or default to dark */
(function themeInit(){
  const stored = localStorage.getItem('site-theme');
  if(stored === 'day'){
    document.body.classList.add('day-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
  // update toggle icon
  const tbtn = document.getElementById('themeToggle');
  if(tbtn) tbtn.textContent = document.body.classList.contains('day-theme') ? '☀️' : '🌙';
})();

/* ------------- Typed effect ------------- */
(function(){
  const el = document.getElementById('typedText');
  if(!el) return;
  const text = "Building solutions with cloud, data, and design.";
  let i=0;
  function tick(){
    el.textContent = text.slice(0,i);
    i++;
    if(i<=text.length) setTimeout(tick,28);
  }
  setTimeout(tick,350);
})();

/* ------------- Fade-in & skill bars ------------- */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold:0.08});
  document.querySelectorAll('.fade').forEach(el=> io.observe(el));

  const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        document.querySelectorAll('.bar').forEach(b=>{
          const val = b.getAttribute('data-val') || 70;
          b.querySelector('i').style.width = val + '%';
        });
      }
    });
  }, {threshold:0.18});
  const skills = document.getElementById('skills');
  if(skills) skillObserver.observe(skills);
})();

/* ------------- Nav smooth scroll ------------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* ------------- CV / Download buttons ------------- */
(function(){
  const resumeFilename = "Shashikanta_Das_Resume.pdf"; // replace if needed
  const downloadBtns = [document.getElementById('downloadBtn'), document.getElementById('cvBtn')];
  downloadBtns.forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const a = document.createElement('a');
      a.href = resumeFilename;
      a.target = "_blank";
      a.download = resumeFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });
})();

/* ------------- Blob subtle movement ------------- */
(function(){
  const b1 = document.querySelector('.b1'), b2 = document.querySelector('.b2');
  let t = 0;
  function anim(){
    t += 0.006;
    if(b1) b1.style.transform = `translate3d(${Math.sin(t*0.8)*12}px, ${Math.cos(t*0.6)*8}px,0)`;
    if(b2) b2.style.transform = `translate3d(${Math.cos(t*0.6)*10}px, ${Math.sin(t*0.9)*6}px,0)`;
    requestAnimationFrame(anim);
  }
  anim();
})();

/* ------------- Theme toggle (localStorage) ------------- */
(function(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const isDay = document.body.classList.toggle('day-theme');
    document.body.classList.toggle('dark-theme', !isDay);
    localStorage.setItem('site-theme', isDay ? 'day' : 'dark');
    btn.textContent = isDay ? '☀️' : '🌙';
  });
})();

/* ------------- Contact form (EmailJS) ------------- */
(function(){
  const sendBtn = document.getElementById('sendBtn');
  const form = document.getElementById('contactForm');
  if(!sendBtn || !form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
      alert('Please fill all fields.');
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Message';
      return;
    }

    // Use EmailJS if available; otherwise simulate
    if(window.emailjs && typeof emailjs.send === 'function'){
      
      const serviceID = 'service_elgfc7q';
      const templateID = 'template_cd461b3';
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message
      };
      emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        sendBtn.textContent = 'Sent ✓';
        alert('Message sent — thank you!');
        form.reset();
      }, (error) => {
        console.error('EmailJS error', error);
        alert('There was an error sending the message. Try again or check EmailJS keys.');
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
      });
    } else {
      // Fallback simulation if EmailJS is not loaded/configured
      setTimeout(()=>{
        sendBtn.textContent = 'Sent ✓';
        alert('Message simulated as sent. Configure EmailJS to send real emails.');
        form.reset();
      }, 900);
    }
  });
})();

/* ------------- Accessibility small improvements ------------- */
/* Set current year */
(function(){ const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear(); })();
