const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide a cada 5 segundos
setInterval(nextSlide, 5000);

// Inicia com slide visível
showSlide(currentSlide);

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function (e) {
    // Impede que clique dentro do submenu feche tudo
    if (e.target.closest('.submenu')) return;

    const submenu = this.querySelector('.submenu');

    // Fecha todos os submenus e remove .open dos outros itens
    document.querySelectorAll('.submenu').forEach(sm => {
      if (sm !== submenu) sm.style.display = 'none';
    });
    document.querySelectorAll('.menu-item').forEach(mi => {
      if (mi !== this) mi.classList.remove('open');
    });

    // Alterna submenu e classe .open
    if (submenu.style.display === 'flex') {
      submenu.style.display = 'none';
      this.classList.remove('open');
    } else {
      submenu.style.display = 'flex';
      this.classList.add('open');
    }
  });
});

document.querySelectorAll('.menu-item').forEach(item => {
    let timeout;

    // Quando o mouse entra no menu-item
    item.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      item.classList.add('show');
    });

    // Quando o mouse sai do menu-item
    item.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        item.classList.remove('show');
      }, 100); // Delay de 200ms para permitir a transição suave
    });

    // Garante que o submenu não feche se o mouse estiver dentro dele
    const submenu = item.querySelector('.submenu');

    if (submenu) {
      submenu.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
      });

      submenu.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          item.classList.remove('show');
        }, 200);
      });
    }
  });