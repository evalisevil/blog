import bcrypt from 'bcryptjs'
import { setHours, setMinutes, setSeconds, subDays } from 'date-fns'

import { prisma } from './prisma'

/** 문의 20건 각각 다른 접수 시각(오늘~수개월 전, 시·분 다양) */
const INQUIRY_RECEIVED_SLOTS: { daysAgo: number; hour: number; minute: number }[] = [
  { daysAgo: 0, hour: 9, minute: 3 },
  { daysAgo: 0, hour: 11, minute: 27 },
  { daysAgo: 0, hour: 14, minute: 41 },
  { daysAgo: 0, hour: 16, minute: 55 },
  { daysAgo: 1, hour: 10, minute: 8 },
  { daysAgo: 1, hour: 15, minute: 19 },
  { daysAgo: 2, hour: 9, minute: 44 },
  { daysAgo: 3, hour: 13, minute: 2 },
  { daysAgo: 5, hour: 17, minute: 36 },
  { daysAgo: 7, hour: 11, minute: 51 },
  { daysAgo: 10, hour: 8, minute: 14 },
  { daysAgo: 14, hour: 16, minute: 9 },
  { daysAgo: 21, hour: 12, minute: 33 },
  { daysAgo: 28, hour: 14, minute: 47 },
  { daysAgo: 35, hour: 10, minute: 22 },
  { daysAgo: 45, hour: 15, minute: 58 },
  { daysAgo: 60, hour: 9, minute: 6 },
  { daysAgo: 75, hour: 13, minute: 40 },
  { daysAgo: 90, hour: 11, minute: 17 },
  { daysAgo: 120, hour: 16, minute: 29 },
]

const inquiryReceivedAt = (index: number): Date => {
  const slot = INQUIRY_RECEIVED_SLOTS[index - 1]
  if (!slot) return new Date()
  const day = subDays(new Date(), slot.daysAgo)
  return setSeconds(setMinutes(setHours(day, slot.hour), slot.minute), 0)
}

const GALLERY_TOPICS = [
  '봄맞이 단체 행사',
  '신규 서비스 런칭 현장',
  '사내 교육 워크숍',
  '고객 초청 간담회',
  '봉사활동 스케치',
  '연말 시상식',
  '제품 전시 부스',
  '팀 빌딩 캠프',
  '파트너사 방문',
  '디자인 리뷰 데이',
] as const

const GENERAL_TOPICS = [
  '서비스 점검 안내',
  '개인정보 처리방침 개정',
  '이용약관 변경 공지',
  '자주 묻는 질문 업데이트',
  '채용 공고',
  '보안 강화 권장 사항',
  '모바일 앱 업데이트',
  '고객센터 운영 시간',
  '이벤트 당첨자 발표',
  '설문조사 참여 독려',
] as const

const WRITERS = ['김경식', '이순신', '이영희', '박민수', '최지은'] as const

const BASIC_SETTING_SEED = {
  id: 'default',
  siteName: '어드민 템플릿',
  representativeEmail: 'admin@example.com',
  representativeTel: '02-123-4567',
  fax: '02-987-6543',
  customerTel: '1588-1234',
  address: '서울특별시 중구 을지로 100',
  representativeName: '홍길동',
  businessNumber: '123-45-67890',
  salesRegistrationNumber: '2026-서울중구-01234',
  copyright: '2026 어드민 템플릿',
  linkedIn: 'https://www.linkedin.com/company/blog',
  instagram: 'https://www.instagram.com/admin.template',
  youtube: 'https://www.youtube.com/@blog',
  threads: 'https://www.threads.com/@admin.template',
  facebook: 'https://www.facebook.com/admin.template',
  github: 'https://github.com/blog',
  logo: 'blog/logo-default',
  whiteLogo: 'blog/logo-white',
  favicon: 'blog/favicon',
}

const galleryBody = (n: number): string => {
  return [
    `${n}번 갤러리 게시글 본문입니다.`,
    '',
    '행사 준비부터 당일 현장, 마무리까지 기록했습니다.',
    '추가 이미지나 영상은 별도 자료실에서 확인할 수 있어요.',
  ].join('\n')
}

const generalBody = (n: number): string => {
  return [
    `${n}번 일반 게시글입니다.`,
    '',
    '문의는 담당 부서로 연락 주시면 안내드리겠습니다.',
    '공지 내용은 변경될 수 있으니 정기적으로 확인해 주세요.',
  ].join('\n')
}

const main = async () => {
  prisma.$transaction(async (tx) => {
    const txWithInquiry = tx
    await tx.basicSetting.deleteMany()
    await tx.gallery.deleteMany()
    await tx.general.deleteMany()
    await txWithInquiry.inquiry.deleteMany()
    await tx.session.deleteMany()
    await tx.account.deleteMany()
  })

  await Promise.all([
    prisma.account.create({
      data: {
        accountId: 'master',
        name: '김경식',
        role: 'master',
        password: await bcrypt.hash('master', 10), // 'password'
      },
    }),
    prisma.account.create({
      data: {
        accountId: 'admin',
        name: '이순신',
        role: 'admin',
        password: await bcrypt.hash('admin', 10), // 'password'
      },
    }),
    prisma.account.create({
      data: {
        accountId: 'lee_younghee',
        name: '이영희',
        role: 'editor',
        password: await bcrypt.hash('lee_younghee', 10), // 'password'
      },
    }),
    prisma.account.create({
      data: {
        accountId: 'park_minsoo',
        name: '박민수',
        role: 'viewer',
        password: await bcrypt.hash('park_minsoo', 10), // 'password'
      },
    }),
    prisma.account.create({
      data: {
        accountId: 'choi_jiyeon',
        name: '최지은',
        role: 'viewer',
        password: await bcrypt.hash('choi_jiyeon', 10), // 'password'
      },
    }),
  ])

  const statusCycle = ['unread', 'read'] as const
  const prismaWithInquiry = prisma as typeof prisma & { inquiry: typeof prisma.inquiry }

  for (let i = 1; i <= 20; i++) {
    await prismaWithInquiry.inquiry.create({
      data: {
        name: `이지영 ${i}`,
        email: `e.jiyoung${i}@example.com`,
        phone: '010-1234-5678',
        subject: '솔루션 도입 관련 상담 요청',
        content: 'test',
        received: inquiryReceivedAt(i),
        status: statusCycle[(i - 1) % statusCycle.length],
      },
    })
  }

  const galleryCount = 32
  await prisma.gallery.createMany({
    data: Array.from({ length: galleryCount }, (_, idx) => {
      const i = idx + 1
      const topic = GALLERY_TOPICS[(i - 1) % GALLERY_TOPICS.length]
      return {
        title: `[갤러리] ${topic} #${i}`,
        content: galleryBody(i),
        thumbnail: `https://picsum.photos/seed/admin-gallery-${i}/640/480`,
        writer: WRITERS[(i - 1) % WRITERS.length],
        isVisible: i % 7 !== 0,
        order: i,
      }
    }),
  })

  await prisma.general.createMany({
    data: Array.from({ length: galleryCount }, (_, idx) => {
      const i = idx + 1
      const topic = GENERAL_TOPICS[(i - 1) % GENERAL_TOPICS.length]
      return {
        title: `[공지] ${topic} (${i})`,
        content: generalBody(i),
        writer: WRITERS[(i - 1) % WRITERS.length],
        isVisible: i % 9 !== 0,
        order: i,
      }
    }),
  })

  await prisma.basicSetting.create({
    data: BASIC_SETTING_SEED,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
