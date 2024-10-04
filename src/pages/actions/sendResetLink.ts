
export async function POST({ request }: { request: Request }) {    
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.text();
        console.log('Called POST /actions/sendResetLink with body:', body);
    }
    
    return new Response(
        JSON.stringify({
           action: 'sendResetLink',
           redirect: 'resetPassword'
        })
      );
}