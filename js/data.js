// K-Culture 데이터 관리
export class DataManager {
  static getCultureCategories() {
    return [
      {
        id: 'kpop',
        name: 'K-pop',
        description: '전 세계를 사로잡은 한국 대중음악의 매력',
        image: 'images/kpop-stage.jpg',
        items: [
          {
            id: 'newjeans',
            title: '뉴진스 (NewJeans)',
            description: 'Y2K 감성과 하이틴 무드로 글로벌 인기를 얻은 걸그룹',
            image: 'images/kpop-stage.jpg',
            category: 'kpop',
            year: 2022,
            tags: ['걸그룹', 'Y2K', '글로벌']
          },
          {
            id: 'bts',
            title: 'BTS (방탄소년단)',
            description: '세계적인 성공을 거둔 대표적인 K-pop 그룹',
            image: 'images/kpop-stage.jpg',
            category: 'kpop',
            year: 2013,
            tags: ['보이그룹', '빌보드', '그래미']
          }
        ]
      },
      {
        id: 'kdrama',
        name: 'K-drama',
        description: '감동적인 스토리텔링으로 전 세계 시청자를 매료시키는 한국 드라마',
        image: 'images/hanbok-modern.jpg',
        items: [
          {
            id: 'squid-game',
            title: '오징어 게임',
            description: '넷플릭스 글로벌 1위를 기록한 한국 드라마',
            image: 'images/hanbok-modern.jpg',
            category: 'kdrama',
            year: 2021,
            tags: ['넷플릭스', '서바이벌', '사회비판']
          },
          {
            id: 'parasite',
            title: '기생충',
            description: '아카데미상 4관왕을 수상한 봉준호 감독의 작품',
            image: 'images/hanbok-modern.jpg',
            category: 'kdrama',
            year: 2019,
            tags: ['아카데미상', '봉준호', '사회드라마']
          }
        ]
      },
      {
        id: 'kfood',
        name: '한식',
        description: '건강하고 맛있는 한국의 전통 음식 문화',
        image: 'images/korean-food.jpg',
        items: [
          {
            id: 'kimchi',
            title: '김치',
            description: '한국의 대표적인 발효 음식으로 유네스코 무형문화유산',
            image: 'images/korean-food.jpg',
            category: 'kfood',
            year: 2013,
            tags: ['발효식품', '유네스코', '전통음식']
          },
          {
            id: 'bibimbap',
            title: '비빔밥',
            description: '다양한 나물과 고기를 밥과 함께 비벼 먹는 한국 요리',
            image: 'images/korean-food.jpg',
            category: 'kfood',
            tags: ['건강식', '균형잡힌', '전통요리']
          }
        ]
      },
      {
        id: 'tradition',
        name: '전통문화',
        description: '오랜 역사와 전통을 간직한 한국의 문화유산',
        image: 'images/hanbok-modern.jpg',
        items: [
          {
            id: 'hanbok',
            title: '한복',
            description: '한국의 전통 의상으로 현대적 재해석이 활발한 문화',
            image: 'images/hanbok-modern.jpg',
            category: 'tradition',
            tags: ['전통의상', '현대적재해석', '문화유산']
          },
          {
            id: 'taekwondo',
            title: '태권도',
            description: '한국 전통 무술로 올림픽 정식 종목',
            image: 'images/hanbok-modern.jpg',
            category: 'tradition',
            tags: ['무술', '올림픽', '전통스포츠']
          }
        ]
      },
      {
        id: 'kbeauty',
        name: 'K-beauty',
        description: '혁신적인 기술과 자연 성분으로 세계를 선도하는 한국 뷰티',
        image: 'images/hanbok-modern.jpg',
        items: [
          {
            id: 'skincare',
            title: '스킨케어',
            description: '10단계 스킨케어 루틴으로 유명한 한국 뷰티',
            image: 'images/hanbok-modern.jpg',
            category: 'kbeauty',
            tags: ['스킨케어', '10단계', '뷰티루틴']
          },
          {
            id: 'kcosmetics',
            title: 'K-코스메틱',
            description: '혁신적인 성분과 기술력으로 글로벌 인기',
            image: 'images/hanbok-modern.jpg',
            category: 'kbeauty',
            tags: ['코스메틱', '혁신', '글로벌']
          }
        ]
      },
      {
        id: 'kmovie',
        name: '한국영화',
        description: '독창적인 스토리텔링과 연출로 세계 영화계를 선도',
        image: 'images/hanbok-modern.jpg',
        items: [
          {
            id: 'oldboy',
            title: '올드보이',
            description: '박찬욱 감독의 대표작으로 칸 영화제 황금종려상 수상',
            image: 'images/hanbok-modern.jpg',
            category: 'kmovie',
            year: 2003,
            tags: ['박찬욱', '칸영화제', '황금종려상']
          },
          {
            id: 'burning',
            title: '버닝',
            description: '이창동 감독의 작품으로 칸 영화제 경쟁부문 진출',
            image: 'images/hanbok-modern.jpg',
            category: 'kmovie',
            year: 2018,
            tags: ['이창동', '칸영화제', '예술영화']
          }
        ]
      }
    ];
  }

  static getCultureItems(categoryId) {
    const categories = this.getCultureCategories();
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.items : [];
  }

  static getTimelineEvents() {
    return [
      {
        year: 1992,
        title: '서태지와 아이들 데뷔',
        description: 'K-pop의 시작을 알린 혁신적인 그룹',
        category: 'kpop',
        image: 'images/kpop-stage.jpg'
      },
      {
        year: 1997,
        title: 'H.O.T. 아시아 진출',
        description: '한류의 첫 번째 물결 시작',
        category: 'kpop',
        image: 'images/kpop-stage.jpg'
      },
      {
        year: 2003,
        title: '올드보이 칸 영화제 황금종려상',
        description: '한국 영화의 세계적 인정',
        category: 'kmovie',
        image: 'images/hanbok-modern.jpg'
      },
      {
        year: 2012,
        title: '강남스타일 글로벌 히트',
        description: 'K-pop의 세계적 확산',
        category: 'kpop',
        image: 'images/kpop-stage.jpg'
      },
      {
        year: 2013,
        title: '김치 유네스코 무형문화유산 등재',
        description: '한식의 세계적 인정',
        category: 'kfood',
        image: 'images/korean-food.jpg'
      },
      {
        year: 2020,
        title: '기생충 아카데미상 4관왕',
        description: '한국 영화 역사상 최대 성과',
        category: 'kmovie',
        image: 'images/hanbok-modern.jpg'
      },
      {
        year: 2021,
        title: '오징어 게임 넷플릭스 글로벌 1위',
        description: 'K-드라마의 세계적 성공',
        category: 'kdrama',
        image: 'images/hanbok-modern.jpg'
      },
      {
        year: 2022,
        title: 'BTS 빌보드 1위 달성',
        description: 'K-pop의 새로운 역사',
        category: 'kpop',
        image: 'images/kpop-stage.jpg'
      },
      {
        year: 2023,
        title: 'K-뷰티 글로벌 시장 확대',
        description: '한국 화장품의 세계적 인기',
        category: 'kbeauty',
        image: 'images/hanbok-modern.jpg'
      },
      {
        year: 2024,
        title: '한복의 현대적 재해석 확산',
        description: '전통과 현대의 조화',
        category: 'tradition',
        image: 'images/hanbok-modern.jpg'
      }
    ];
  }
}