/**
 * Created by Administrator on 2017/5/4.
 */

function addItem(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}
function getItem(key){
    return localStorage.getItem(key);

}
function delItem(key){
    localStorage.removeItem(key);
}
function isItem(key){
    for (var i = 0; i < localStorage.length; i++) {
        if(key == localStorage.key(i)){
            return true;
        }else{
            return false;
        }
    }
}
function clearAll(){
    localStorage.clear();
}