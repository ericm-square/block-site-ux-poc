self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return new Response('Network error occurred');
      })
    );
  });