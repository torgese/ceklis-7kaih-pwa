// Firebase Messaging compat SDK inside service worker; fill firebase-config.js via deployment.
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('./firebase-config.js');
firebase.initializeApp(self.FIREBASE_CONFIG);
const messaging=firebase.messaging();
// FCM displays the notification payload. Avoid duplicating with a custom background handler.
