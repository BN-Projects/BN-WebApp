const url = "http://localhost:8090";
export function getConnectionLink(directory, paramsNames, paramsValues){
    if(paramsNames.length == paramsValues.length){
        var link = url + "/" + directory + "?";
        paramsNames.forEach((element,index) => {
            link =+ element + "=" + paramsValues[index] + "&";
        });
        return link;
    }
    else{
        console.log("b")
        throw "Parametrelerin isim ve değer sayısı eşit değil.";
    }
}
export default function getBeacon(){
    //axios işlemleri
    /*
    var a = new Beacon(1,2,3);
    return a.getBeacon();*/
}