module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'jest', 'prettier'],
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
        'import/extensions': ['error', 'never', { ignorePackages: true }],
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
    },
};

