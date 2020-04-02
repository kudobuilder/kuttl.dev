module.exports = {
    title: 'KUDO',
    base: '/',
    themeConfig: {
        logo: '/images/kuttl-small.jpg',
        sidebar: {
            '/docs/': [
              '/docs/',
              'what-is-kuttl',
              'kuttl-test-harness',
              'cli',
              'api-integration',
              'testing/asserts-errors',
              'testing/reference',
              'testing/steps',
              'testing/test-environments',
              'testing/tips',
              'contributing'
            ],
        },
        docsRepo: "kudobuilder/kuttl.dev",
        docsDir: "content",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Help us improve this page",
        nav: [
            { text: 'Docs', link: '/docs/' },
            { text: 'Community', link: 'http://kudo.dev/community/' }
        ]
    },
    markdown: {
        toc: {
          includeLevel: [2, 3, 4]
        },
        lineNumbers: false,
        extendMarkdown: md => {
            md.use(require('markdown-it-footnote'))
            md.use(require('markdown-it-imsize'))
        }
    },
    plugins: [
        ['container', {
            type: 'flex-box',
            before: type => `<div class="flex-box ${type}">`,
            after: '</div>',
        }],
        ['container', {
            type: 'flag',
            before: name => `<div class="flag"><code class="title" v-pre>${name}</code>`,
            after: '</div>',
        }],
        ['container', {
            type: 'attribute',
            before: name => `<div class="attribute"><code class="title" v-pre>${name}</code>`,
            after: '</div>',
        }],
        ['container', {
            type: 'teaser',
            before: name => `<div class="teaser custom-block"><h2 class="custom-block-title">${name}</h2>`,
            after: '</div>',
        }],
        ['check-md', {
          pattern: '**/*.md',
        }]
    ]
};
