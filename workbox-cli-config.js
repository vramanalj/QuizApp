module.exports = {
  maximumFileSizeToCacheInBytes: 6291456,
  globDirectory: 'www/',
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  swSrc: 'src/sw.js',
  swDest: 'www/sw.js',

  // runtimeCaching: [
  //   {
  //     // Match any request ends with .png, .jpg, .jpeg or .svg.
  //     urlPattern: new RegExp('https://picsum.photos/*'),

  //     // Apply a cache-first strategy.
  //     handler: 'cacheFirst',

  //     options: {
        
  //       expiration: {
  //         maxEntries: 20,
  //         maxAgeSeconds: 30 * 24 * 60 * 60,
  //       },
  //     },
  //   },
  // ],

  globIgnores: [
    '../workbox-cli-config.js'
  ]
};
