onload = () =>{

    setLoginInfo();
    initTable();

}
function setLoginInfo(){
    let loginInfo = getParam()["userName"] + "としてログインしています。";
    document.getElementById("loginUser").innerText = loginInfo;
}
function initTable(){
    for (var i=0; i<10; i++) {
        var row = document.getElementById("settingTable").insertRow(-1);
        for (var j=0; j<10; j++) {
            var no = j.toString();
            row.insertCell(-1).innerHTML = i&&j ? "<input pattern='[-0-9]{1,2}' id='inputValue"+ i+no +"' name='inputValue"+ i+no +"' maxlength='2' />" : i||no;
        }
    }
}
function postSettingValue(){
    let settingValueList = new Array();
    let settingValue;
    for(let count=11;count<=100;count++){
        let result = document.getElementById("inputValue" + count);
        if(result != null && result.value != ""){
            //let settingValue= new Object();
            settingValue= new Object();
            settingValue.settingName = "inputValue" + count; 
            settingValue.settingDay = result.value;
            settingValueList.push(settingValue);
        }
    }
    console.log(settingValueList);
    //let jsonData = JSON.stringify(settingValueList);
    let jsonData = JSON.stringify(settingValue);
    console.log(jsonData)
    let url = "http://localhost:37326/testApi/web/mainApi/setting";

    // 一時的にWebStrageへ保持
    sessionStorage.setItem("work",jsonData);

    //doPost(url,jsonData);
/*
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.addEventListener('load', () => {
        console.log("success");
      });
    xmlHttpRequest.open( 'POST', url);

    xmlHttpRequest.setRequestHeader("Content-type","application/json");
    // データをリクエスト ボディに含めて送信する
    xmlHttpRequest.send(jsonData);
*/
}
function doPost(url, data) {
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      console.log(xhr.status);
      console.log("success!");
    };
    xhr.onerror = () => {
      console.log(xhr.status);
      console.log("error!");
    };
    xhr.send(data);
 }

 /** ボタンが切り替わってスケジューラを表示するSPAパターン */
 function changeForm(){
    let settingButton = document.getElementById("settingButton");
    settingButton.innerText = "Confirm";

    dispList();
 }

 /** スケジューラー表示処理 */
 function dispList(){


    var date = new Date();
    // 現在年
    var presentYear = date.getFullYear();
    // 現在月
    var presentMonth = date.getMonth() + 1; // javascriptのDate仕様

    // 処理日
    document.getElementById("executeYmd").innerHTML 
    = "処理日：" + presentYear + "年" + presentMonth + "月" + date.getDate() + "日";

    // 現在月から最終日取得
    var daysCountOfthisMonth = getLastDaysPresentDays(presentYear,presentMonth);
    var columnCount = daysCountOfthisMonth + 2;

    // tableのヘッダーを生成
    var tableHeaderElement = document.getElementById('theadId');
    for (let i = 1; i <= 2; i++){
        var trElement = document.createElement('tr');


        if(i === 1){
            // 日付
            for (let j = 1; j <= columnCount; j++){
                    var daysTdElement = document.createElement('td');
                    if(j <= 2){ // 日付外のヘッダー考慮
                        daysTdElement.innerHTML = " ";
                    }else{
                        var targetDay = j - 2;
                        daysTdElement.innerHTML = targetDay;
                        daysTdElement.setAttribute("name","days");
                        daysTdElement.setAttribute("id","column" + targetDay);

                    }
                tableHeaderElement.appendChild(daysTdElement);                       
            }
        }else if(i === 2){
            // 曜日
            for (let k = 1; k <= columnCount; k++){
                var aDayTdElement = document.createElement('td');
                var targetAWeek = k - 2;
                if(k === 1){ // 日付外のヘッダー考慮
                    aDayTdElement.innerHTML = "機能名称";
                    aDayTdElement.style = "padding:0 80 0";
                }else if(k === 2){
                    aDayTdElement.innerHTML = "機能ID";
                    aDayTdElement.style = "padding:0 30 0";
                }else{
                    aDayTdElement.innerHTML = getADayOfWeek(presentYear,presentMonth,targetAWeek); // 日付に対応した曜日を取得
                    aDayTdElement.setAttribute("name","aweek");                   
                    aDayTdElement.setAttribute("id","column" + targetAWeek);
                }
                tableHeaderElement.appendChild(aDayTdElement); 
            }  
        }

        tableHeaderElement.appendChild(trElement);
    }

    // JSONからデータを取得 - 非同期
    getJSON(columnCount);

    let jobListDiv = document.getElementById("jobListDiv");
    jobListDiv.style = "display:"
    
    document.getElementById("settingButton").onclick = "";
 }