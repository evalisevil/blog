'use client'

import 'md-editor-rt/lib/preview.css'
import '@/app/styles/md-editor.css'

import { MdPreview } from 'md-editor-rt'

const CONTENT = `
컨테이너 쿼리는 부모 컨테이너의 크기나 상태에 따라 스타일을 동적으로 조정할 수 있게 해주는 최신 CSS 기능 중 하나이다. 기존 미디어 쿼리가 뷰포트 크기에 따라 스타일을 변경하는 데 사용되었다면, 컨테이너 쿼리는 요소가 배치되는 곳 자체에 집중하여 스타일을 조절하는 새로운 접근 방식을 제공한다.

이번 포스트에서는 CSS 컨테이너 쿼리의 기본 구문과 사용 예시를 알아본다.

---

# 미디어 쿼리와의 차이

컨테이너 쿼리는 미디어 쿼리와 문서의 레이아웃을 반응형으로 작성한다는 점에서 유사하지만, 미디어 쿼리는 브라우저 너비를 기준으로 반응하며, 컨테이너 쿼리는 각 요소의 크기를 기준으로 반응형 쿼리를 지정할 수 있다는 차이가 있다.

![](https://vshplselkzxwtmuwjjji.supabase.co/storage/v1/object/public/blog-bucket/posts/image.png)

또한, 당연히도 컨테이너 쿼리는 **현재의 DOM 트리**를 기준으로 동작하므로 별도의 DOM 트리를 가지는 다른 페이지에서는 기준이 되는 컨테이너를 참조할 수 없다.

---

# 기준 컨테이너 지정

\`\`\`css
div {
  container-name: div-container;
  container-type: inline-size;

  /* 간략히 작성 */
  container: div-container / inline-size;
}
\`\`\`

1. container-name 속성을 통해 컨테이너의 이름을 지정
2. container-type 속성에 컨테이너 타입을 지정
    - size: 너비와 높이 모두에 대한 쿼리 가능
    - inline-size: 너비에 대해서만 쿼리 가능
    - normal: 컨테이너 쿼리 컨텍스트를 생성하지 않음(기본 값)
    - none: 컨테이너 쿼리 컨텍스트를 명시적으로 비활성화 */
---

# 컨테이너 쿼리 기본 구문

컨테이너 쿼리는 @container 규칙을 사용하여 정의한다.

\`\`\`css
@container <container-name> (<container-condition>) {
  <stylesheet>
}
\`\`\`
정의된 container-name을 선택적으로 지정하여 해당 컨테이너에만 반응형 스타일을 적용하거나 이를 생략하여 모든 컨테이너에 스타일을 지정할 수 있다.

<container-condition>은 컨테이너의 크기, 상태 등을 나타내며, 일반적으로 미디어 쿼리와 유사한 방식으로 지정된다. 예를 들어, min-width, max-width, min-height, max-height 등의 속성이나 다음 작성 예시와 같이 사용하여 컨테이너의 크기에 따라 스타일을 적용할 수 있다.

\`\`\`css
@container div-container (width > 400px) {
  h2 {
    font-size: 1.5em;
  }
}

@container div-container (height > 30rem) {
  h2 {
    line-height: 1.6;
  }
}
\`\`\`

---

# 컨테이너 쿼리 길이 단위

뷰포트의 vw, vh 단위 처럼 컨테이너의 너비와 높이를 기준으로 하는 상대 기준점 단위가 존재한다.

- cqw : 쿼리 컨테이너 너비의 1%
- cqh : 쿼리 컨테이너 높이의 1%
- cqi : 쿼리 컨테이너 인라인 크기의 1%
- cqb : 쿼리 컨테이너의 블록 크기의 1%
- cqmin : cqi 또는 cqb 중 더 작은 값
- cqmax : cqi 또는 cqb 중 더 큰 값

---

# 주의 사항

최신 CSS 문법인만큼 사용 전 브라우저 호환을 반드시 체크해보아야 한다. [[컨테이너 쿼리 브라우저 지원 범위 확인하기]](https://caniuse.com/?search=container%20query)

현대의 대부분의 브라우저에서는 컨테이너 쿼리를 지원하지만, 그렇지 않은 브라우저에서 사용하기 위해서는 CSS 속성이나 값의 지원 여부를 확인하는 @supports을 이용하여 폴백 스타일을 먼저 정의하여 해결할 수 있다.

\`\`\`css
/* 기본 스타일 */
.card {
  width: 100%;
  padding: 1rem;
}

/* 컨테이너 쿼리 지원 확인 */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      padding: 2rem;
      width: 50%;
    }
  }
}
\`\`\`
`

export const PostText = () => {
  return (
    <section className="mb-8 md:mb-12 w-full">
      <MdPreview
        className="flex-1 custom-preview detail"
        editorId="preview-only"
        language="en-US"
        modelValue={CONTENT}
        previewTheme="github"
      />
    </section>
  )
}
