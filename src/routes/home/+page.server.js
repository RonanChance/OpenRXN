import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, params }) {
    // console.log(request.headers.get('cookie'))
    // console.log("logging request")
    // console.log(request)
    // const pb_auth_cookie = request.headers.get('cookie') ?? null;
    // locals.pb.authStore.loadFromCookie(pb_auth_cookie);

    // if (!locals.pb.authStore.isValid){
    //     console.log("INVALID authstore in +page.server.js chat")
    //     throw redirect(302, "/auth")
    // } else {
    //     console.log("no issues in +page.server.js chat")
    // }
    console.log(request)
    return {
		credits_remaining: 10,
	};
};