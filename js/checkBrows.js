/**
 * 
 *  Chrome以外では使わせない
 *  ここはブラウザを問わない記載が必要
 * 
 * */ 
window.onload = function(){
    if (!isChrome() ) {
        alert("Google Chromeで使用してください。")
        window.close();
        return;
    }
}
function isChrome(){
    var agent = window.navigator.userAgent.toLowerCase();
    return ((agent.indexOf('chrome') !== -1) 
        && (agent.indexOf('edge') === -1)  
        && (agent.indexOf('opr') === -1) 
        )?true:false;
}