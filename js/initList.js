/*!
######################################################

# INITLIST.JS

#ASSET RELEASE: 1.0.0

# BUILD DATE: 2019 3:4 

# COPYRIGHT 2019 

######################################################
*/
"use strict";

/** 初期化処理 */
window.onload = function(){

    // 基準日設定
    settingReferrence();

    var date = new Date();
    // 現在年
    var presentYear = date.getFullYear();
    // 現在月
    var presentMonth = date.getMonth() + 1; // javascriptのDate仕様

    // 処理日
    //document.getElementById("executeYmd").innerHTML 
    //= "処理日：" + presentYear + "年" + presentMonth + "月" + date.getDate() + "日";

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
}

/** 現在月から最終日を取得する */
function getLastDaysPresentDays(presentYear,presentMonth){
    var presentLastDays = getTargetMonthDayCount(presentYear,presentMonth);
    console.debug(presentYear + "年" + presentMonth + "月の最終日：" + presentLastDays);
    return presentLastDays;

};



/** JSONファイル読み込み */
function getJSON(columnCount){

    var req = new XMLHttpRequest;
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            mappingTable(JSON.parse(req.responseText),columnCount);
        }
    }
    req.open("GET","data/schedule.json",false); // あえて同期処理
    req.send(null);
}

/** リストを表にマッピング */
function mappingTable(list,columnCount){

    var tableBodyElement = document.getElementById('tbodyId');
    for(let element of list){
        var trElement = document.createElement('tr');
        for (let k = 1; k <= columnCount; k++){
            var daysTdElement = document.createElement('td');
            if(k === 1){ // 日付外考慮
                daysTdElement.innerHTML = element.functionName;
            }else if(k === 2){
                daysTdElement.innerHTML = element.functionId;
            }else{
                var conpareDay = k - 2;
                // 基準日算出テスト
                let execDay = getExecDay(element.executeDay);

                if(conpareDay === execDay){
                    if(element.executeTime === "l"){
                        daysTdElement.innerHTML = "〇";
                    }else if(element.executeTime === "n"){
                        daysTdElement.innerHTML = "●";
                    }
                    
                }else{
                    daysTdElement.innerHTML = "";
                }
                daysTdElement.setAttribute("id","column" + conpareDay);
            }
            tableBodyElement.appendChild(daysTdElement); 
        }
        tableBodyElement.appendChild(trElement);
    }

      addColorToHoliday()
}

// 休日のみ着色
function addColorToHoliday(){

    var date = new Date();
    // 現在年
    var presentYear = date.getFullYear();
    // 現在月
    var presentMonth = date.getMonth() + 1; // javascriptのDate仕様

    // 曜日一覧取得
    var aWeekList = document.getElementsByName("aweek");
    var daysList = document.getElementsByName("days");

    // 対象カラム
    var targetColumnList = new Array();
    let allHolidayList = getAllHolidayList(presentYear, presentMonth);
    for(let element of daysList){
        for(let allHoliday of allHolidayList){
            if(element.innerHTML === allHoliday.toString()){
                targetColumnList.push(element.getAttribute("id"));
            }
        }
    }
    console.log(formatByArr("休日一覧：{0}",targetColumnList));

    var tdList = document.getElementsByTagName("td");
    for(let element of tdList){
        for(let target of targetColumnList){
            if(element.getAttribute("id") === target){
                element.style.backgroundColor = "#d80a30";
            }
        }
    }

}

// 基準日設定
function settingReferrence(){

    //let settingReferenceElement = document.getElementById("settingReference");
    let trElement = document.createElement('tr');
    for(let key in SettingDate.getSettingDate()){
        let counter = 1;
        let tdElement = document.createElement('td');
        tdElement.setAttribute("id","setting" + counter);
        tdElement.innerText = formatByArr("{0} ： {1}",key,SettingDate.getSettingDate()[key]);
        //settingReferenceElement.appendChild(tdElement);
    }
    //settingReferenceElement.appendChild(trElement);
}

// 入力値と基準日から日付を算出
function getExecDay(inputData){

    return inputData;
}
