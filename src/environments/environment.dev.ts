const environment = {
    baseUrl: 'http://localhost:4200',
    production: false,
    baseHref: '/',
    apiKey: 'AIzaSyANkG13bWvnCkyrrPBVHKnsltAhanwvQWI',
    // Webpush public key
    vapidPublicKey:
        'BOQeqhzAlc94Jzlj6L_nytxOGi4832OnGksmqzU3WxqqQWKeZxfYiX-eztXoMmRELRW51JrzVQFHR2jBcQQVQBM',
    api: {
        url: 'http://localhost:4000/',
        basePath: '/api/v1/',
        socketIO: 'socket.io',
    },
};

export default environment;
