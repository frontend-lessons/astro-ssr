
export async function POST({ request }: { request: Request }) {    
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.text();
        console.log('Called POST /actions/resetPassword with body:', body);
    }
    
    return new Response(
        JSON.stringify({
           action: 'resetPassword',
           redirect: 'login'
        })
      );
}