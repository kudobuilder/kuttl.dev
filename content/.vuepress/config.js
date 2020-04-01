const feed_options = {
  enable: false,
  canonical_base: 'https://kuttl.dev/',
  count: 20,
  feeds: {
    rss2: {
      enable: true,
      file_name: 'rss.xml',
      head_link: {
        enable: true,
        type: 'application/rss+xml',
        title: '%%site_title%% RSS Feed',
      }
    },
    atom1: {
      enable: true,
      file_name: 'feed.atom',
      head_link: {
        enable: true,
        type: 'application/atom+xml',
        title: '%%site_title%% Atom Feed',
      }
    },
    json1: {
      enable: true,
      file_name: 'feed.json',
      head_link: {
        enable: true,
        type: 'application/json',
        title: '%%site_title%% JSON Feed',
      }
    },
  }
};

module.exports = {
    title: 'KUDO',
    base: '/',
    themeConfig: {
        logo: '/images/kuttl-small.jpg',
        sidebar: {
            '/docs/': [
              'what-is-kuttl',
              'getting-started',
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
        docsRepo: "kudobuilder/www",
        docsDir: "content",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Help us improve this page",
        nav: [
            { text: 'Docs', link: '/docs/' },
            { text: 'Blog', link: 'http://kudo.dev/blog/' },
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
        [ 'feed', feed_options ],
        ['check-md', {
          pattern: '**/*.md',
        }]
    ]
};
