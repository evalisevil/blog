import { Hero, Tags } from '@/shared/ui'

import { Post } from './post'

const BLOG_POSTS = [
  {
    id: '1',
    title: 'App Router에서 서버 컴포넌트와 클라이언트 경계 나누기',
    description:
      '데이터 페칭은 서버에서, 인터랙션만 클라이언트로 옮기면 번들이 줄고 초기 HTML에 내용이 포함됩니다. use client 지시어를 어디에 두는지 기준을 정리했습니다.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Tailwind로 다크 모드 토큰 한 세트로 유지하기',
    description:
      'CSS 변수와 dark: 변형을 함께 쓰면 테마 전환 시 한 줄로 색이 바뀝니다. muted, border 같은 의미 토큰 이름으로 일관되게 맞추는 방법입니다.',
    tags: ['Tailwind CSS', 'CSS', 'HTML'],
  },
  {
    id: '3',
    title: 'TypeScript satisfies로 설정 객체 타입 좁히기',
    description:
      'as const만으로는 부족할 때 satisfies로 값은 리터럴을 유지하고 타입은 검사하는 패턴과 자주 나는 오류를 정리했습니다.',
    tags: ['TypeScript', 'JavaScript'],
  },
  {
    id: '4',
    title: 'Node용 Docker 멀티 스테이지 빌드로 이미지 크기 줄이기',
    description:
      '빌드에만 필요한 devDependencies는 빌더 스테이지에 두고, 런타임 스테이지에는 필요한 node_modules만 복사하는 구조를 예제로 설명합니다.',
    tags: ['Docker', 'Node.js'],
  },
  {
    id: '5',
    title: 'PostgreSQL에서 자주 쓰는 B-tree 인덱스 설계 체크리스트',
    description:
      'WHERE·ORDER BY·JOIN에 맞는 컬럼 순서, 부분 인덱스, EXPLAIN ANALYZE로 확인할 때 보는 지표를 짧게 묶었습니다.',
    tags: ['PostgreSQL'],
  },
  {
    id: '6',
    title: 'Redis 캐시: TTL·키 규칙·스탬피드 완화까지',
    description:
      '읽기 많은 API 앞에 두는 캐시의 키 네이밍, 만료 시간 정하는 기준, 동시 만료 시 부하가 몰릴 때 쓰는 락·재계산 패턴입니다.',
    tags: ['Redis', 'Node.js'],
  },
  {
    id: '7',
    title: 'AWS Lambda 콜드 스타트를 줄이기 위한 현실적인 선택지',
    description:
      '메모리 크기와 초기화 코드 분리, 프로비저닝된 동시성 도입 시점, ARM 아키텍처 전환 시 체감이 어떻게 달라지는지 비교했습니다.',
    tags: ['AWS', 'Node.js'],
  },
  {
    id: '8',
    title: 'Kubernetes readiness와 liveness를 헷갈리지 않게 쓰기',
    description:
      '준비 안 된 파드를 트래픽에서 빼는 프로브와, 교착 상태일 때 재시작하는 프로브의 역할을 분리하는 게 안전합니다. 타임아웃 예시 포함.',
    tags: ['Kubernetes', 'Docker'],
  },
  {
    id: '9',
    title: 'Shadcn UI와 Radix로 키보드 포커스 맞추기',
    description:
      '다이얼로그·메뉴 열릴 때 포커스 트랩과 Esc 동작은 접근성과 직결됩니다. 커스텀 스타일을 얹어도 깨지지 않게 점검하는 순서입니다.',
    tags: ['Shadcn UI', 'React'],
  },
  {
    id: '10',
    title: 'Express 미들웨어 체인: 에러와 404를 한곳에서 처리하기',
    description:
      '비동기 핸들러의 에러를 next(err)로 모으고, 마지막에 JSON·로깅을 통일하는 구조. 라우트 정의 순서가 404에 미치는 영향도 다룹니다.',
    tags: ['Express', 'Node.js'],
  },
  {
    id: '11',
    title: 'MySQL에서 복합 인덱스 컬럼 순서 정하는 법',
    description:
      '카디널리티가 높은 컬럼을 앞에 둘지, 범위 조건 뒤에는 인덱스가 어떻게 쓰이지 못하는지 등 선택지를 쿼리 패턴 기준으로 정리했습니다.',
    tags: ['MySQL'],
  },
  {
    id: '12',
    title: 'MongoDB 스키마 없는 컬렉션도 변경 이력은 남기기',
    description:
      '문서에 버전 필드를 두거나, 변경 로그 컬렉션을 분리하는 방식의 장단점. 마이그레이션 스크립트를 배포 파이프에 넣는 흐름입니다.',
    tags: ['MongoDB', 'Node.js'],
  },
  {
    id: '13',
    title: 'GCP Cloud Run에 컨테이너 올릴 때 메모리·CPU 요청 잡기',
    description:
      '동시 요청 수와 CPU 할당의 관계, 최소 인스턴스를 둘지 말지 비용 기준, 헬스 체크 경로를 분리하는 이유를 정리했습니다.',
    tags: ['GCP', 'Docker'],
  },
  {
    id: '14',
    title: 'Azure Container Apps에서 시크릿과 환경 변수 주입 패턴',
    description:
      'Key Vault 참조와 앱 설정 분리, 스테이징·프로덕션 구독을 나눌 때 같은 이미지로 배포하는 흐름을 예시로 설명합니다.',
    tags: ['Azure', 'Kubernetes'],
  },
]

const TAGS = [
  'All',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Shadcn UI',
  'JavaScript',
  'CSS',
  'HTML',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'GCP',
  'Azure',
  'IBM',
  'Oracle',
  'SAP',
]

export const HomePage = async ({ searchParams }: { searchParams: { tag: string } }) => {
  const { tag } = await searchParams
  console.log('tag', tag)

  return (
    <main className="w-full">
      {/* Hero */}
      <Hero />

      {/* Tags */}
      <Tags tags={TAGS} />

      {/* Posts */}
      <section className="flex flex-col gap-4 mt-12 space-y-4">
        <p className="text-sm text-muted-foreground">
          전체 <strong className="text-primary">{BLOG_POSTS.length}</strong>개 포스트
        </p>
        {BLOG_POSTS.map((post) => (
          <Post key={post.title} {...post} />
        ))}
      </section>
    </main>
  )
}
