import {GAS_WEBAPP_URL,VAPID_PUBLIC_KEY} from './config.js';
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getMessaging,getToken,deleteToken,isSupported} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js';
import './firebase-config.js';
const status=document.getElementById('status'),enable=document.getElementById('enable'),stop=document.getElementById('stop');
const code=new URLSearchParams(location.hash.slice(1)).get('pair');
// Remove bearer code from visible URL/history immediately; keep in this page's memory only.
if(code)history.replaceState(null,'',location.pathname+location.search);
document.getElementById('gasLink').href=GAS_WEBAPP_URL;
const app=initializeApp(self.FIREBASE_CONFIG), messaging=await (async()=>await isSupported()?getMessaging(app):null)();
function post(fields){const form=document.getElementById('gatewayForm');form.action=GAS_WEBAPP_URL;for(const [k,v] of Object.entries(fields))form.elements.namedItem(k).value=v;form.submit();}
enable.onclick=async()=>{enable.disabled=true;try{
 if(!code)throw new Error('Tautan aktivasi tidak ada atau sudah dipakai. Mulai dari website CEKLIS setelah verifikasi PIN.');
 if(!messaging)throw new Error('Browser ini belum mendukung notifikasi push Firebase.');
 if(Notification.permission==='denied')throw new Error('Notifikasi diblokir. Ubah izin notifikasi di pengaturan browser.');
 const permission=await Notification.requestPermission();if(permission!=='granted')throw new Error('Izin notifikasi belum diberikan.');
 const sw=await navigator.serviceWorker.register('./firebase-messaging-sw.js');
 const token=await getToken(messaging,{vapidKey:VAPID_PUBLIC_KEY,serviceWorkerRegistration:sw});
 if(!token)throw new Error('Token perangkat gagal dibuat.');
 localStorage.setItem('7kaih_fcm_token',token);
 post({action:'register',pairCode:code,fcmToken:token,hour:document.getElementById('hour').value});
 status.textContent='Permintaan aktivasi dikirim. Silakan periksa hasil pada tab respons jika muncul. Notifikasi belum pasti aktif sampai registrasi diterima server.';
 }catch(e){status.textContent='Gagal: '+e.message;}finally{enable.disabled=false;}};
stop.onclick=async()=>{try{if(!messaging)throw new Error('Browser tidak mendukung push.');const token=localStorage.getItem('7kaih_fcm_token');if(token)post({action:'unsubscribe',pairCode:'',fcmToken:token,hour:'19'});await deleteToken(messaging);localStorage.removeItem('7kaih_fcm_token');status.textContent='Permintaan penghentian dikirim; token lokal dihapus.';}catch(e){status.textContent=e.message;}};
