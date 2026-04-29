export const TOAST_MESSAGES = {
  SUCCESS: {
    CREATE: '등록되었습니다.',
    UPDATE: '수정되었습니다.',
    DELETE: '삭제되었습니다.',
    REPLY: '회신을 전송했습니다.',
    REPLY_TEMPLATE: '회신 템플릿을 저장했습니다.',
    STATUS: '상태가 변경되었습니다.',
    ORDER: '순서가 변경되었습니다.',
  },
  ERROR: {
    CREATE: '등록에 실패했습니다.',
    UPDATE: '수정에 실패했습니다.',
    DELETE: '삭제에 실패했습니다.',
    REPLY: '회신 전송에 실패했습니다.',
    REPLY_TEMPLATE_SAVE: '회신 템플릿 저장에 실패했습니다.',
    STATUS: '상태 변경에 실패했습니다.',
    ORDER: '순서 변경에 실패했습니다.',
  },
}

export const FORM_MESSAGES = {
  REQUIRED: '필수 입력 항목입니다.',
  NOT_FORMATTED: '올바른 형식이 아닙니다.',
  LOGIN: {
    REQUIRED: '아이디와 비밀번호를 입력해주세요.',
  },
  ID: {
    MIN: '아이디는 최소 4자 이상이어야 합니다.',
    MAX: '아이디는 최대 12자 이하이어야 합니다.',
    PATTERN: '아이디는 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.',
  },
  PASSWORD_CONFIRM: {
    MATCH: '비밀번호가 서로 일치하지 않습니다.',
  },
}

export const API_RESPONSE_MESSAGES = {
  ERROR: {
    SERVER: '내부 서버 오류가 발생했습니다.',
    UPDATE: '수정에 실패했습니다.',
    DELETE: '삭제에 실패했습니다.',
    ACCOUNT: {
      DUPLICATE: '이미 사용 중인 아이디입니다.',
      INVALID_ID: '아이디 형식이 올바르지 않습니다.',
      NOT_ALLOWED: '사용할 수 없는 아이디입니다.',
      NOT_FOUND: '계정을 찾을 수 없습니다.',
      ADMIN_COUNT_LIMIT: 'Admin 권한의 계정은 최소 1개 이상 유지해야 합니다.',
    },
    AUTH: {
      INVALID_CREDENTIALS: '아이디 또는 비밀번호가 올바르지 않습니다.',
      UNAUTHORIZED: '세션 정보가 존재하지 않습니다. 다시 로그인해주세요.',
    },
    INQUIRY: {
      NOT_FOUND: '문의를 찾을 수 없습니다.',
      INVALID_STATUS: '유효하지 않은 상태입니다.',
      REPLY_INVALID: '제목과 내용을 입력해주세요.',
      REPLY_TEMPLATE_INVALID: '회신 템플릿 입력값이 올바르지 않습니다.',
    },
    GENERAL: {
      NOT_FOUND: '게시글을 찾을 수 없습니다.',
      INVALID_REORDER: '순서 변경 요청이 올바르지 않습니다.',
      REORDER_BOUNDARY: '이 위치에서는 순서를 더 바꿀 수 없습니다.',
      INVALID_VISIBILITY: '노출 여부 값이 올바르지 않습니다.',
      CREATE_INVALID: '입력값을 확인해주세요.',
    },
  },
}
