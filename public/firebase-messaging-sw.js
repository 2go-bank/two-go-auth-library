importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDxrVKpz3iTxYATd9HG5nPRGhXDiSboYBA',
  authDomain: 'baseauthdemo.firebaseapp.com',
  projectId: 'baseauthdemo',
  storageBucket: 'baseauthdemo.firebasestorage.app',
  messagingSenderId: '536724989083',
  appId: '1:536724989083:web:87227ca7e720583722123e'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});