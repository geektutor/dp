//service worker --TODO: Not yet implemented
var staticCacheName = 'eventDP-static-v1',
    eventDPs = 'eventDP-list',
    images = 'eventDP-image',
    eventDP_info = 'eventDP-page';

var allCaches = [
  staticCacheName,
  eventDPs,
  images,
  eventDP_info
];

var scope = '/';

var staticFilesToCache = [
  `${scope}`,
  `${scope}index.html`,
  `${scope}offline.html`,
  `${scope}css/responsive.css`,
  `${scope}css/styles.css`,
  `${scope}js/dbhelper.js`,
  `${scope}js/main.js`,
  `${scope}js/eventDP_info.js`,
  `${scope}data/eventDPs.json`,
];

var offlineUrl = `${scope}offline.html`;

self.addeventDPListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(staticFilesToCache);
    })
  );
});

self.addeventDPListener('activate', function(eventDP) {
  eventDP.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          console.log('[ServiceWorker] Removing old cache', cacheName);
          return cacheName.startsWith('eventDP-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addeventDPListener('fetch', function(eventDP) {
  var requestUrl = new URL(eventDP.request.url);

  if (requestUrl.origin !== location.origin) {
    //cache other origin file like map resources
    eventDP.respondWith(serveFiles(eventDP.request, 'eventDP-map-assets'));
    return;
  }

  if (requestUrl.origin == location.origin && requestUrl.pathname.startsWith('/img')) {
    // response to image file request in the folder
    eventDP.respondWith(serveFiles(eventDP.request, images));
    return;
  }

  if (requestUrl.origin == location.origin && eventDP.request.url.includes('eventDP.html')) {
    // eventDP pages - detail info
    eventDP.respondWith(serveFiles(eventDP.request, eventDP_info));
    return;
  }

  eventDP.respondWith(
    caches.match(eventDP.request).then(function(response) {
      if (response) return response;
      return fetch(eventDP.request).then(function(response) {
        return response
      }).catch((e)=>{
        /*respond with offline page*/
        console.log(`ServiceWorker failed request:`, eventDP.request);
        return (eventDP.request.url.includes('eventDP.html')) && (
            caches.open(staticCacheName).then(function(cache) {
              return cache.match(offlineUrl).then(function(response) {
                  if (response) return response;
              })
            })
          );
        /*END offline response page*/
      });
    })
  );
});

function serveFiles(request, cacheName) {
  var storageUrl = (request.url.includes('eventDP.html'))? `eventDP.html/id/${request.url.split('?')[1].slice(3)}` : request.url;

  /*check cache first then network*/
  return caches.open(cacheName).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      }).catch((e)=>{
        /*respond with offline page*/
        console.log(`ServiceWorker failed request:`, request);
        return (request.url.includes('eventDP.html')) && (
            caches.open(staticCacheName).then(function(cache) {
              return cache.match(offlineUrl).then(function(response) {
                  if (response) return response;
              })
            })
          );
        /*END offline response page*/
      });
    });
  });
}

self.addeventDPListener('message', function(eventDP) {
  if (eventDP.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

