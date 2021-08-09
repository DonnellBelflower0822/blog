self.addEventListener('install', e => {
  console.log('install')
  e.waitUntil(caches.open('my-cache')).then(cache => {
    return cache.addAll(['./index.html'])
  })
})

self.addEventListener('fetch', e => { 
  // 查找request中被缓存命中的response
  e.respondWith(caches.match(e.request).then( response => {
      if (response) {
          return response
      }
      console.log('fetch source')
  }))
})