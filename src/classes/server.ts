export type RequestType = "FETCH" | "DOCUMENT" | "MULTIPART";

export function typeOfRequest(request: Request): RequestType
{
    switch(request.headers.get("Content-Type")){
        case "application/json":
            return "FETCH" as RequestType;
        case "multipart/form-data":
            return "MULTIPART" as RequestType;
        case "application/x-www-form-urlencoded":
        default:
            return "DOCUMENT" as RequestType;    
    }
}