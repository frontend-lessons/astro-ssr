export function sessionPresets(appMode)
{
    switch(appMode){
        case 'EPHIMERAL': return {
            MODE: 'COOKIE',
            STORAGE: 'NONE',
            OAUTH: false
        };
        case 'LOCAL': return {
            MODE: 'COOKIE',
            STORAGE: 'SQLITE',
            OAUTH: false
        };
        case 'LUCIA': return {
            MODE: 'LUCIA',
            STORAGE: 'SQLITE',
            OAUTH: false
        };
        case 'OAUTH': return {
            MODE: 'JWT',
            STORAGE: 'BACKEND',
            OAUTH: true
        };
        case 'AUTH': return {
            MODE: 'AUTHJS',
            STORAGE: 'SQLITE',
            OAUTH: true

        }
        case 'BACKEND':
        default: return {
            MODE: 'JWT',
            STORAGE: 'BACKEND',
            OAUTH: false
        };
    }
}