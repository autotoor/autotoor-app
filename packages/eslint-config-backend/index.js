module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'jest', 'prettier', 'unused-imports'],
    extends: [
        'airbnb-base',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['.eslintrc.js'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'import/prefer-default-export': 'off',
                indent: 'off', // Conflicts
                'no-alert': 'off',
                'class-methods-use-this': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                // Duplicative of ts:
                'import/no-duplicates': 'off',
                'no-redeclare': 'off',
                'import/no-unresolved': 'off',
                'import/named': 'off',
                'import/namespace': 'off',
                'import/default': 'off',
                'import/export': 'off',
                'no-undef': 'off',
            },
        },
        {
            files: ['*.tsx'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'function',
                        format: ['PascalCase', 'camelCase'],
                    },
                ],
            },
        },
        {
            files: ['.eslintrc.js', '.eslintrc.base.js'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
        'no-shadow': 0,
        'import/extensions': ['error', 'never', { ignorePackages: true }],
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', ['sibling', 'parent'], 'index', 'internal', 'object'],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                    },
                ],
                // Providing set of defaults that exclude 'external' so that the @/ path group can be properly applied.
                // See this issue for more details: https://github.com/benmosher/eslint-plugin-import/issues/2008
                pathGroupsExcludedImportTypes: ['builtin', 'object'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'no-duplicate-imports': 'off',
        "unused-imports/no-unused-imports": "error",
        '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
};

