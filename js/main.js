import { DataManager } from './data.js';

class NavigationManager {
  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

class SliderManager {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.autoPlayInterval = null;
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.setupControls();
    this.autoPlay();
  }

  setupControls() {
    const prevBtn = this.container.querySelector('.prev-btn');
    const nextBtn = this.container.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // 인디케이터 설정
    this.setupIndicators();
  }

  setupIndicators() {
    const indicatorContainer = this.container.querySelector('.slider-indicators');
    if (!indicatorContainer) return;

    indicatorContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `w-3 h-3 rounded-full mx-1 ${index === 0 ? 'bg-primary' : 'bg-base-300'}`;
      indicator.addEventListener('click', () => this.goToSlide(index));
      indicatorContainer.appendChild(indicator);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  updateSlider() {
    this.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
    });

    // 인디케이터 업데이트
    const indicators = this.container.querySelectorAll('.slider-indicators button');
    indicators.forEach((indicator, index) => {
      indicator.className = `w-3 h-3 rounded-full mx-1 ${index === this.currentSlide ? 'bg-primary' : 'bg-base-300'}`;
    });
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

class TabManager {
  init(tabContainerId) {
    this.container = document.getElementById(tabContainerId);
    if (!this.container) return;

    this.setupTabs();
    this.loadInitialContent();
  }

  setupTabs() {
    const tabButtons = this.container.querySelectorAll('.tab');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = button.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    // 탭 버튼 활성화 상태 변경
    const tabButtons = this.container.querySelectorAll('.tab');
    tabButtons.forEach(button => {
      if (button.getAttribute('data-tab') === tabId) {
        button.classList.add('tab-active');
      } else {
        button.classList.remove('tab-active');
      }
    });

    // 탭 콘텐츠 표시/숨김
    const tabContents = this.container.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
      if (content.getAttribute('data-tab') === tabId) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });

    this.loadTabContent(tabId);
  }

  async loadTabContent(tabId) {
    const tabContent = this.container.querySelector(`[data-tab="${tabId}"].tab-content`);
    if (!tabContent) return;

    const items = DataManager.getCultureItems(tabId);
    if (items.length === 0) return;

    const html = items.map(item => `
      <div class="card bg-base-100 shadow-xl">
        <figure class="px-4 pt-4">
          <img src="${item.image}" alt="${item.title}" class="rounded-xl w-full h-48 object-cover" />
        </figure>
        <div class="card-body">
          <h3 class="card-title text-lg">${item.title}</h3>
          <p class="text-sm text-base-content/70">${item.description}</p>
          <div class="card-actions justify-end mt-4">
            ${item.tags.map(tag => `<div class="badge badge-outline">${tag}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    tabContent.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${html}</div>`;
  }

  loadInitialContent() {
    const firstTab = this.container.querySelector('.tab');
    if (firstTab) {
      const tabId = firstTab.getAttribute('data-tab');
      this.switchTab(tabId);
    }
  }
}

class AccordionManager {
  init(accordionId) {
    this.container = document.getElementById(accordionId);
    if (!this.container) return;

    this.setupAccordion();
  }

  setupAccordion() {
    const accordionItems = this.container.querySelectorAll('.collapse');
    accordionItems.forEach(item => {
      const input = item.querySelector('input[type="radio"]');
      if (input) {
        input.addEventListener('change', () => {
          if (input.checked) {
            this.expandItem(item);
          }
        });
      }
    });
  }

  expandItem(item) {
    // DaisyUI의 collapse 컴포넌트는 자동으로 처리됨
    const content = item.querySelector('.collapse-content');
    if (content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
}

class GalleryManager {
  init(galleryId) {
    this.container = document.getElementById(galleryId);
    if (!this.container) return;

    this.setupGallery();
    this.loadGalleryImages();
  }

  setupGallery() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = modal?.querySelector('.modal-action button');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // 모달 배경 클릭시 닫기
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  loadGalleryImages() {
    const categories = DataManager.getCultureCategories();
    const allItems = categories.flatMap(cat => cat.items);
    
    const html = allItems.map(item => `
      <div class="gallery-item cursor-pointer" data-image="${item.image}" data-title="${item.title}" data-description="${item.description}">
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <figure>
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover" />
          </figure>
          <div class="card-body p-4">
            <h3 class="card-title text-sm">${item.title}</h3>
            <p class="text-xs text-base-content/70">${item.description}</p>
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">${html}</div>`;

    // 이미지 클릭 이벤트 설정
    this.container.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const image = item.getAttribute('data-image');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        this.openModal(image, title, description);
      });
    });
  }

  openModal(image, title, description) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = modal.querySelector('#modal-image');
    const modalTitle = modal.querySelector('#modal-title');
    const modalDescription = modal.querySelector('#modal-description');

    if (modalImage) modalImage.src = image;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;

    modal.checked = true;
  }

  closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.checked = false;
  }
}

class TimelineManager {
  init() {
    this.container = document.getElementById('timeline-container');
    if (!this.container) return;

    this.loadTimelineData();
    this.setupFilters();
  }

  loadTimelineData() {
    const events = DataManager.getTimelineEvents();
    this.renderTimeline(events);
  }

  renderTimeline(events) {
    const html = events.map((event, index) => `
      <div class="timeline-item flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}">
        <div class="timeline-content flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="badge badge-primary mb-2">${event.year}</div>
              <h3 class="card-title text-lg">${event.title}</h3>
              <p class="text-sm text-base-content/70">${event.description}</p>
              <div class="badge badge-outline mt-2">${this.getCategoryName(event.category)}</div>
            </div>
          </div>
        </div>
        <div class="timeline-marker w-4 h-4 bg-primary rounded-full border-4 border-base-100 shadow-lg z-10"></div>
        <div class="flex-1"></div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="relative">
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-base-300 h-full"></div>
        ${html}
      </div>
    `;
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.timeline-filter');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        this.filterByCategory(category);
        
        // 활성 버튼 스타일 변경
        filterButtons.forEach(btn => btn.classList.remove('btn-primary'));
        button.classList.add('btn-primary');
      });
    });
  }

  filterByCategory(category) {
    const events = DataManager.getTimelineEvents();
    const filteredEvents = category === 'all' ? events : events.filter(event => event.category === category);
    this.renderTimeline(filteredEvents);
  }

  getCategoryName(categoryId) {
    const categoryNames = {
      'kpop': 'K-pop',
      'kdrama': 'K-drama',
      'kfood': '한식',
      'tradition': '전통문화',
      'kbeauty': 'K-beauty',
      'kmovie': '한국영화'
    };
    return categoryNames[categoryId] || categoryId;
  }
}

// 메인 애플리케이션 클래스
class KCultureApp {
  constructor() {
    this.navigationManager = new NavigationManager();
    this.sliderManager = new SliderManager();
    this.tabManager = new TabManager();
    this.accordionManager = new AccordionManager();
    this.galleryManager = new GalleryManager();
    this.timelineManager = new TimelineManager();
  }

  init() {
    // DOM이 로드된 후 초기화
    document.addEventListener('DOMContentLoaded', () => {
      this.navigationManager.init();
      this.sliderManager.init('hero-slider');
      this.tabManager.init('culture-tabs');
      this.accordionManager.init('faq-accordion');
      this.galleryManager.init('gallery-grid');
      this.timelineManager.init();
      
      // 테마 토글 설정
      this.setupThemeToggle();
    });
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });

      // 저장된 테마 로드
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }
}

// 애플리케이션 시작
const app = new KCultureApp();
app.init();