export function cookieParse(unparsedCookie){
    if(!unparsedCookie) return {userID: '0'}
    let urlDecoded = decodeURIComponent(unparsedCookie)
    const jsonString = urlDecoded.split('=')[1];
    const jsonObject = JSON.parse(jsonString);

    return jsonObject
}
 