// @ts-check
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...overrideConfigSeverity(tseslint.configs.strictTypeChecked),
  ...overrideConfigSeverity(tseslint.configs.stylisticTypeChecked),
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
  {
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // @ts-expect-error
    rules: {
      ...overrideRulesSeverity(reactPlugin.configs.recommended.rules),
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: [
            // "function-declaration",
            // "function-expression",
            'arrow-function',
          ],
          unnamedComponents: [],
        },
      ],
      'react/iframe-missing-sandbox': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-max-depth': ['warn', { max: 10 }],
      'react/jsx-no-bind': [
        'warn',
        {
          ignoreDOMComponents: true,
          ignoreRefs: true,
          allowArrowFunctions: false,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-no-leaked-render': [
        'warn',
        { validStrategies: ['ternary', 'coerce'] },
      ],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          multiline: 'last',
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: false,
          locale: 'auto',
        },
      ],
      'react/no-array-index-key': 'warn',
      'react/no-invalid-html-attribute': ['warn', ['rel']],
      'react/no-multi-comp': ['warn', { ignoreStateless: true }],
      'react/no-object-type-as-default-prop': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/no-unstable-nested-components': [
        'warn',
        { allowAsProps: false, customValidators: [] },
      ],
      'react/prefer-read-only-props': 'warn',
      'react/self-closing-comp': ['warn', { component: true, html: true }],
      'react/void-dom-elements-no-children': 'warn',
    },
  },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      // "@typescript-eslint/member-ordering": [
      //   "warn",
      //   { "default": { "order": "alphabetically" } }
      // ],
      '@typescript-eslint/method-signature-style': ['warn', 'property'],
      // "@typescript-eslint/naming-convention": "warn",
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/no-loop-func': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // "@typescript-eslint/no-shadow": [
      //   "warn",
      //   {
      //     "ignoreTypeValueShadow": true,
      //     "ignoreFunctionTypeParameterNameValueShadow": false
      //   }
      // ],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-destructuring': [
        'warn',
        { array: true, object: true },
        {
          enforceForRenamedProperties: false,
          enforceForDeclarationWithTypeAnnotation: false,
        },
      ],
      // "@typescript-eslint/prefer-readonly-parameter-types": [
      //   "warn",
      //   {
      //     "allow": [],
      //     "checkParameterProperties": true,
      //     "ignoreInferredTypes": false,
      //     "treatMethodsAsReadonly": false
      //   }
      // ],
      '@typescript-eslint/prefer-readonly': [
        'warn',
        { onlyInlineLambdas: false },
      ],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/sort-type-constituents': [
        'warn',
        {
          checkIntersections: true,
          checkUnions: true,
          groupOrder: [
            'keyword',
            'literal',
            'named',
            'operator',
            'intersection',
            'union',
            'conditional',
            'function',
            'object',
            'tuple',
            'import',
            'nullish',
          ],
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    rules: {
      'block-scoped-var': 'warn',
      'class-methods-use-this': 'warn',
      'func-name-matching': [
        'warn',
        'always',
        {
          considerPropertyDescriptor: true,
          includeCommonJSModuleExports: false,
        },
      ],
      'no-await-in-loop': 'warn',
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-new-native-nonconstructor': 'error',
      'no-param-reassign': 'off',
      'no-promise-executor-return': 'warn',
      'no-self-compare': 'warn',
      'no-template-curly-in-string': 'warn',
      'no-unmodified-loop-condition': 'warn',
      'no-unreachable-loop': 'warn',
      'prefer-const': [
        'warn',
        { destructuring: 'all', ignoreReadBeforeAssign: false },
      ],
      'prefer-named-capture-group': 'warn',
      'prefer-promise-reject-errors': ['warn', { allowEmptyReject: true }],
      'require-atomic-updates': ['warn', { allowProperties: true }],
      // "sort-imports": [
      //   "warn",
      //   {
      //     "allowSeparatedGroups": false,
      //     "ignoreCase": false,
      //     "ignoreDeclarationSort": true,
      //     "ignoreMemberSort": false,
      //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      //   }
      // ],
      // "sort-keys": "warn",
      strict: ['warn', 'safe'],
    },
  },
  {
    ignores: [
      '.next',
      'dist',
      '.eslintrc*',
      'eslint.config.js',
      '**/*.{cjs,mjs,js}',
    ],
  },
);

function overrideConfigSeverity(
  /** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */ params,
) {
  return params.map(({ rules, ...config }) => ({
    ...config,
    rules: overrideRulesSeverity(rules),
  }));
}

function overrideRulesSeverity(
  /** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config['rules']} */ rules,
) {
  /** @type {typeof rules} */ const newRules = {};
  for (const rule in rules) {
    if (Object.hasOwnProperty.call(rules, rule)) {
      /** @type {import('@typescript-eslint/utils').TSESLint.Linter.RuleLevel | import('@typescript-eslint/utils').TSESLint.Linter.RuleLevelAndOptions} */
      // @ts-expect-error
      const item = rules[rule];
      if (Array.isArray(item)) {
        const [severity, config] = item;
        newRules[rule] = ['error', 2].includes(severity)
          ? ['warn', config]
          : item;
      } else {
        newRules[rule] = ['error', 2].includes(item) ? 'warn' : item;
      }
    }
  }
  return newRules;
}
