import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/environment';

export const handle = async ({ event, resolve }) => {
    event.locals.id = '';
    event.locals.email = '';
    event.locals.pb = new PocketBase('https://pb.openrxn.com');
  
    const isAuth = event.url.pathname === '/auth';
    // const isHome = event.url.pathname ==="/";
    // const isAbout = event.url.pathname ==="/about";
    if (isAuth) {
        event.cookies.set('pb_auth', '', {path: '/'});
        return await resolve(event);
    }
  
    // const pb_auth = event.request.headers.get('cookie') ?? '';
    // // console.log(pb_auth)
    let loaded_cookie = event.locals.pb.authStore.loadFromCookie(pb_auth);
  
    if (!event.locals.pb.authStore.isValid) {
        // // console.log('Session expired');
        event.cookies.set('pb_auth', '', {path: '/'});
    }
    
    try {
        const auth = await event.locals.pb.collection('users').authRefresh();
        event.locals.id = auth.record.id;
        event.locals.email = auth.record.email;
    } catch (_) {
        throw redirect(303, '/auth');
    }
  
    if (!event.locals.id) {
      throw redirect(303, '/auth');
    }
  
    const response = await resolve(event);
    let cookie = event.locals.pb.authStore.exportToCookie({ sameSite: 'lax', secure: false });
    response.headers.append('set-cookie', cookie);
    
    return response;
  };