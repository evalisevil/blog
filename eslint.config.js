/**
 * 모노레포 ESLint 설정 (flat config)
 *
 * 적용 순서 요약
 * 1. 공통 ignore → 추천 프리셋 → apps 이하 TypeScript·TSX 메인 규칙
 * 2. Next default export 관례 파일만 func-style / 컴포넌트 정의 규칙 예외
 * 3. apps 내 JS, 루트 vite.config, 파일명 규칙, 마지막에 Prettier
 */
import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import checkFilePlugin from 'eslint-plugin-check-file'

export default tseslint.config(
  /* ── 1. 검사 제외 (.eslintignore 역할) ── */
  {
    ignores: ['dist', '**/.next', '**/node_modules', 'apps/**/next-env.d.ts'],
  },

  /* ── 2. JS / TS 기본 추천 규칙 ── */
  js.configs.recommended,
  ...tseslint.configs.recommended,

  /* ── 3. 앱 소스: TypeScript + React + 팀 규칙 ── */
  {
    files: ['apps/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./apps/admin/tsconfig.json', './apps/web/tsconfig.json'],
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /* ····· Core ····· */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-nested-ternary': 'warn',
      'no-unused-vars': 'off',
      'no-duplicate-imports': 'warn',

      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../../*', '../../../../*'],
              message: '깊은 상대 경로 import는 금지됩니다.',
            },
          ],
        },
      ],

      /* ····· TypeScript ····· */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          suffix: ['Type'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: ['property', 'parameterProperty'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'method',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'objectLiteralProperty',
          format: [],
        },
      ],

      /* ····· React / JSX ····· */
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'warn',
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
      'react/no-unescaped-entities': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/display-name': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-handler-names': [
        'warn',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      /* ····· React Hooks ····· */
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      /* ····· Import 정리 ····· */
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /* ····· 접근성 ····· */
      'jsx-a11y/alt-text': 'warn',
      'react/button-has-type': 'error',

      /* ····· React Fast Refresh ····· */
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /*
       * 함수 스타일
       * - 선언문 `function f() {}` 대신 식 `const f = () => {}` 권장.
       * - Next에서 `export default`가 관례인 파일은 다음 블록에서 예외.
       */
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
      /*
       * 컴포넌트 정의
       * - 이름 있는/없는 컴포넌트 모두 화살표 함수 권장.
       * - 예외 파일은 동일하게 다음 블록.
       */
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },

  /*
   * Next App Router · 번들 설정
   * - page / layout / special files: `export default` 및 `function` 선언 관례 허용
   * - 설정 파일: `export default` 관례
   * → 위 `func-style`, `react/function-component-definition` 비활성화
   */
  {
    files: [
      'apps/**/app/**/page.ts',
      'apps/**/app/**/page.tsx',
      'apps/**/app/**/layout.ts',
      'apps/**/app/**/layout.tsx',
      'apps/**/app/**/loading.ts',
      'apps/**/app/**/loading.tsx',
      'apps/**/app/**/template.ts',
      'apps/**/app/**/template.tsx',
      'apps/**/app/**/error.ts',
      'apps/**/app/**/error.tsx',
      'apps/**/app/**/not-found.ts',
      'apps/**/app/**/not-found.tsx',
      'apps/**/app/**/global-error.ts',
      'apps/**/app/**/global-error.tsx',
      'apps/**/app/**/default.ts',
      'apps/**/app/**/default.tsx',
      'apps/**/next.config.ts',
      'apps/**/tailwind.config.ts',
      'apps/**/postcss.config.{js,mjs,cjs,ts}',
      'apps/**/vitest.config.ts',
      'apps/**/prisma.config.ts',
    ],
    rules: {
      'func-style': 'off',
      'react/function-component-definition': 'off',
    },
  },

  /* ── 4. `apps` 내 JS: 타입 검사 비활성화 ── */
  {
    files: ['apps/**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  /* ── 5. 루트 Vite 설정 전용 parserOptions ── */
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },

  /* ── 6. 파일·폴더 이름 (check-file) ── */
  {
    plugins: {
      'check-file': checkFilePlugin,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          'apps/**': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'apps/**': 'NEXT_JS_APP_ROUTER_CASE',
        },
      ],
    },
  },

  /* ── 7. Prettier: 포맷 규칙과 충돌하는 ESLint 규칙 끔 (항상 마지막) ── */
  eslintConfigPrettier,
)
