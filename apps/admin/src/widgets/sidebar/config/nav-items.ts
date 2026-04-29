import {
  Activity,
  Bot,
  Calendar,
  ClipboardList,
  GalleryThumbnails,
  Hammer,
  History,
  Images,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  PictureInPicture2,
  ReceiptText,
  SearchCode,
  Settings,
  Share2,
  UserCog,
} from 'lucide-react'

export interface NavItemType {
  title: string
  items: {
    title: string
    url: string
    isActive?: boolean
    icon: LucideIcon
  }[]
}

export const NAV_ITEMS: NavItemType[] = [
  {
    title: 'overview',
    items: [
      {
        title: '대시보드',
        url: '/',
        isActive: true,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'content',
    items: [
      {
        title: '배너 관리',
        url: '/banner',
        icon: GalleryThumbnails,
      },
      {
        title: '팝업 관리',
        url: '/popup',
        icon: PictureInPicture2,
      },
      {
        title: '문의 관리',
        url: '/inquiry',
        icon: MessageSquare,
      },
    ],
  },
  {
    title: 'page',
    items: [
      {
        title: '일반 게시판',
        url: '/general',
        icon: ClipboardList,
      },
      {
        title: '갤러리 게시판',
        url: '/gallery',
        icon: Images,
      },
      {
        title: '연혁',
        url: '/history',
        icon: History,
      },
      {
        title: '캘린더',
        url: '/calendar',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'insights',
    items: [
      {
        title: '통계 & 분석',
        url: '/analytics',
        icon: Activity,
      },
    ],
  },
  {
    title: 'system',
    items: [
      {
        title: '기본 설정',
        url: '/basic',
        icon: Settings,
      },
      {
        title: '검색 엔진 최적화',
        url: '/seo',
        icon: SearchCode,
      },
      {
        title: '소셜 미디어 공유',
        url: '/og',
        icon: Share2,
      },
      {
        title: '크롤링 & 색인',
        url: '/indexing',
        icon: Bot,
      },
      {
        title: '분석 도구',
        url: '/tools',
        icon: Hammer,
      },
      {
        title: '정책 & 약관',
        url: '/policy',
        icon: ReceiptText,
      },
      {
        title: '계정 관리',
        url: '/account',
        icon: UserCog,
      },
    ],
  },
]
