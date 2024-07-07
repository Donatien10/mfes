
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.7700a4f0c9fe9fd8b12e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.6d90f9ef17e5a7215238.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/3569.latest.en.9864dca70239bbd6697a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.3f6777dd67f84b88ff3c.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6846.latest.en.52b14d870951c1a5a741.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8933.latest.en.fbecd6fcb2d3a7dec43b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.latest.en.5460d8dcceec80be92e6.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5137.latest.en.4cf74cdc91d53d11c8f6.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.latest.en.80dc15d80fb3eb83ddf0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.latest.en.b20b76a18fc60dcdaa46.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.cda85ef5d501a62b91e8.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.3975c63f818b50435dd4.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.8039276cabb7faecfb04.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/lato/lato_n4.c86cddcf8b15d564761aaa71b6201ea326f3648b.woff2?h1=dGhlbWUyNzItc29mdC5teXNob3BpZnkuY29t&hmac=5a9ab7f5f1fb85caee63845450792f53b57739ba7c61e49f1149b764483154c5","https://fonts.shopifycdn.com/lato/lato_n7.f0037142450bd729bdf6ba826f5fdcd80f2787ba.woff2?h1=dGhlbWUyNzItc29mdC5teXNob3BpZnkuY29t&hmac=d391392f5cba702f7523cfd2d9a26f5de91ef1e5a603ae85bfb53b0b27b4dedf","https://fonts.shopifycdn.com/source_sans_pro/sourcesanspro_n4.c85f91ea821d792887902daa9670754f7c64e25c.woff2?h1=dGhlbWUyNzItc29mdC5teXNob3BpZnkuY29t&hmac=f9ade8498995aa53d34a62884cfa4c68ea466e54a99631af07d77896b5130121","https://fonts.shopifycdn.com/source_sans_pro/sourcesanspro_n6.91ba95a725d9bdfe4971390fba64eb8dfe38af4a.woff2?h1=dGhlbWUyNzItc29mdC5teXNob3BpZnkuY29t&hmac=61fc057b3ba13b885d6888da234b946fdff22ece640589f5211599856fc5f13f"];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  