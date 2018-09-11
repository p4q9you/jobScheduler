/** 初期化処理 */
window.onload = function(){

    var date = new Date();
    // 現在年
    var presentYear = date.getFullYear();
    // 現在月
    var presentMonth = date.getMonth() + 1; // javascriptのDate仕様

    // 処理日
    document.getElementById("executeYmd").innerHTML 
    = "処理日：" + presentYear + "年" + presentMonth + "月" + date.getDay() + "日";

    // 現在月から最終日取得
    var daysCountOfthisMonth = getLastDaysPresentDays(presentYear,presentMonth);
    var columnCount = daysCountOfthisMonth + 2;

    // tableのヘッダーを生成
    var tableHeaderElement = document.getElementById('theadId');
    for (i = 1; i <= 2; i++){
        var trElement = document.createElement('tr');


        if(i === 1){
            // 日付
            for (j = 1; j <= columnCount; j++){
                    var daysTdElement = document.createElement('td');
                    if(j <= 2){ // 日付外のヘッダー考慮
                        daysTdElement.innerHTML = " ";
                    }else{
                        daysTdElement.innerHTML = j - 2;
                        daysTdElement.setAttribute("name","days");
                    }
                tableHeaderElement.appendChild(daysTdElement);                       
            }
        }else if(i === 2){
            // 曜日
            for (k = 1; k <= columnCount; k++){
                var aDayTdElement = document.createElement('td');
                if(k === 1){ // 日付外のヘッダー考慮
                    aDayTdElement.innerHTML = "機能名称";
                    aDayTdElement.style = "padding:0 80 0";
                }else if(k === 2){
                    aDayTdElement.innerHTML = "機能ID";
                    aDayTdElement.style = "padding:0 30 0";
                }else{
                    aDayTdElement.innerHTML = getADayOfWeek(presentYear,presentMonth,k - 2); // 日付に対応した曜日を取得
                }
                tableHeaderElement.appendChild(aDayTdElement); 
            }  
        }

        tableHeaderElement.appendChild(trElement);
    }

    // JSONからデータを取得 - 非同期
    getJSON(columnCount);
}

/** 現在月から最終日を取得する */
var getLastDaysPresentDays = function(presentYear,presentMonth){
    var presentLastDays = getLastDaysParMonth(presentYear,presentMonth);
    console.debug(presentYear + "年" + presentMonth + "月の最終日：" + presentLastDays);
    return presentLastDays;

};
/** 最終日を取得する */
var getLastDaysParMonth = function(year, month) {
    return new Date(year, month, 0).getDate();
};
/** 年月日から曜日を取得する */
var getADayOfWeek = function(year,month,day){
    //日曜が0、土曜日が6。曜日変換テーブル
    var aDayOfWeeek = ["日","月","火","水","木","金","土"];
    return aDayOfWeeek[new Date(year,month - 1,day).getDay()];
}

/** JSONファイル読み込み */
var getJSON = function(columnCount){

    var req = new XMLHttpRequest;
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            mappingTable(JSON.parse(req.responseText),columnCount);
        }
    }
    req.open("GET","../dist/data/schedule.json",false); // あえて同期処理
    req.send(null);
}

/** リストを表にマッピング */
var mappingTable = function(list,columnCount){
    // 日付リスト
    // var dayList = document.getElementsByName("days");

    var tableBodyElement = document.getElementById('tbodyId');
    for(var element of list){
        var trElement = document.createElement('tr');
        for (k = 1; k <= columnCount; k++){
            var daysTdElement = document.createElement('td');
            if(k === 1){ // 日付外考慮
                daysTdElement.innerHTML = element.functionName;
            }else if(k === 2){
                daysTdElement.innerHTML = element.functionId;
            }else{
                var conpareDay = k-2;
                if(conpareDay === element.executeDay){
                    daysTdElement.innerHTML = "〇";
                }else{
                    daysTdElement.innerHTML = "";
                }
            }
            tableBodyElement.appendChild(daysTdElement); 
        }
        tableBodyElement.appendChild(trElement);
    }

}
