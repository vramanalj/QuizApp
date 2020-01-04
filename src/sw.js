importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);
  workbox.skipWaiting();
  workbox.clientsClaim();

  // var dataCacheName = 'Data-v1';

  // workbox.routing.registerRoute(
  //   new RegExp('https://fonts.googleapis.com/(.*)'),
  //   workbox.strategies.cacheFirst({
  //     cacheName: 'fonts-cache',
  //   plugins: [
  //     new workbox.expiration.Plugin({
  //       maxEntries: 60,
  //       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  //     })
  //   ],
  // }),
  // ); 

  workbox.routing.registerRoute(
    /\.(?:js|css|woff|woff2|ttf|scss|eot)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'appshell-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 1 * 24 * 60 * 60, // 1 Day
        })
      ]
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://picsum.photos/*'),
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ],
    }),
  ); 

  workbox.routing.registerRoute(
    new RegExp('^https://46dffb4e-02d6-431f-8261-8d2f36b065bb-bluemix.cloudant.com'),
    workbox.strategies.networkFirst({
      cacheName: 'network-response-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ]
    })
  );




  // self.addEventListener('fetch', async function(e) {
  //   console.log('[ServiceWorker] Fetch', e.request.url);
  //   var dataUrl = 'https://46dffb4e-02d6-431f-8261-8d2f36b065bb-bluemix.cloudant.com';
  //   var imgUrl = "https://picsum.photos";
  //   if (e.request.method=='GET' && (e.request.url.indexOf(dataUrl) > -1 || e.request.url.indexOf(imgUrl)> -1)) {
  //     e.respondWith(
  //       fetch(e.request)
  //         .then(function(response) {
  //           return caches.open(dataCacheName).then(function(cache) {
  //             cache.put(e.request, response.clone());
  //             console.log('[ServiceWorker] Fetched&Cached Data');
  //             return response;
  //           });
  //         }).catch(()=>{
  //           return caches.match(e.request).then(function(response) {
  //             return response;
  //           })
  //         })
  //     );
  //   } else {
  //     e.respondWith(
  //       fetch(e.request)
  //       .then((response)=>
  //       {
  //         return response;
  //       }).catch(()=>{
  //           caches.match(e.request).then(function(response) {
  //             return response;
  //           }) 
  //       })      
  //     );
  //   }

  // });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
