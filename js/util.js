"use strict";

// 共通ヘッダー読み込み
$(function(){$("#header").load("./header-templete.html");});
      
/**
 * 曜日リストを取得
 * @return 曜日List
 */
const getAWeekList = () =>{
    return ["日", "月", "火", "水", "木", "金", "土"];
}
/**
 * 基準日から計算して実行日を取得
 * @param {*} targetDay 
 * @param {*} calculateValue 
 */
const getExecBusinessDay = (targetDay,calculateValue) =>{
    return getBusinessDayList()[getBusinessDayList().indexOf(targetDay)-calculateValue]
 }
/**
 * 営業日一覧を取得
 * @param {*} targetYear 
 * @param {*} targetMonth 
 */
const getBusinessDayList = (targetYear,targetMonth) =>{
    let businessDayList = new Array();
    for(let i = 1;i <= getTargetMonthDayCount(targetYear,targetMonth);i++){
        if(getAllHolidayList(targetYear,targetMonth).indexOf(i)=== -1){
            businessDayList.push(i);
        }
    }
    return businessDayList;
} 
/**
 * 対象月の日数を取得
 * @param 年
 * @param 月
 * @return 対象月の日数
 */
const getTargetMonthDayCount = (targetYear,targetMonth) =>{
    return new Date(targetYear, targetMonth, 0).getDate();
} 
/**
 * 休日・祝日Listを取得
 * @param 年
 * @param 月
 * @return 休日・祝日List
 */
const getAllHolidayList = (targetYear,targetMonth)=>{
    let allHolidayList = new Array();
    allHolidayList = getHolidayList(targetYear,targetMonth).concat(getFormatedPublicHolidayList(targetYear,targetMonth));
    allHolidayList = Array.from( new Set(allHolidayList) );
    return allHolidayList;
}
/**
 * 休日List(日付のみ）を取得
 * @param 年
 * @param 月
 * @return 休日List
 */
const getHolidayList = (targetYear,targetMonth)=>{
    let targetHoliday = new Array();
    for(let i = 1;i <= getTargetMonthDayCount(targetYear,targetMonth);i++){
        let targetAWeek = getAWeekList()[new Date(targetYear, targetMonth - 1, i).getDay()];
        console.log(formatByArr("{0}年{1}月{2}日は{3}曜日です。", targetYear,targetMonth,i,targetAWeek));
        if(targetAWeek === "土" || targetAWeek === "日"){
            targetHoliday.push(i);
        }
    }
    return targetHoliday;
} 
/**
 * 祝日List(日付のみ）を取得
 * @param 年
 * @param 月
 * @return 即時仕様できる祝日List
 */
const getFormatedPublicHolidayList = (targetYear,targetMonth)=>{
    let publicHolidayList = new Array();
    for(let i = 1;i <= getTargetMonthDayCount(targetYear,targetMonth);i++){
        // 12月をDateにnewすると0月になる。
        if(isPublicHoliday(new Date(targetYear, targetMonth === 12?targetMonth+1:targetMonth, i))){
            publicHolidayList.push(i);
        }
    }
    return publicHolidayList;
}
/**
 * 祝日オブジェクトを取得
 * @return 祝日オブジェクト
 */
const getPublicHolidayList = () =>{return holidayList;}

/**
 * 年月日から曜日を取得
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
const getADayOfWeek = (year,month,day) =>{
    //日曜が0、土曜日が6。曜日変換テーブル
    var aDayOfWeeek = getAWeekList();
    return aDayOfWeeek[new Date(year,month - 1,day).getDay()];
}

/**
 * new Date(年、月、日)から祝日チェック
 * @param {*} date 
 * @return 祝日であればtrue
 */
const isPublicHoliday = (date) => {
    // 年月日を取得
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    // 祝日リストに日付が含まれるかどうか調べ、結果を返す
    return getPublicHolidayList()[y][m].indexOf(d) !== -1;
}
/**
 * ログ出力時、プレースホルダを変数に置き換える
 * アロー関数はargumentsを持たない
 * @param {*} msg  
 */
function formatByArr(msg){
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
    }
    return msg.replace(/\{(\d+)\}/g, function (m, k) {
        return args[k];
    });
}
// apiのテスト
function apiGet(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:37326/testApi/web/mainApi/get?input=input');
    xhr.send();
    xhr.addEventListener('load', function(result){
      var element = document.getElementById("targetH1");
      element.innerText = result.target.responseText;
    });
}
function doApiGet(content){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:7870/api/?userName=' + content);
    xhr.send();
}
function doApiPost(content){
    let inputData = {content};
    //let jsonData = JSON.stringify(inputData);

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.addEventListener('load', () => {
        console.log("success");
      });
    xmlHttpRequest.open( 'GET', 'http://localhost:7870/api/');

    xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // データをリクエスト ボディに含めて送信する
    xmlHttpRequest.send("content=" + content);

}
// HTMLフォームの形式にデータを変換する
function EncodeHTMLForm( data )
{
    var params = [];

    for( var name in data )
    {
        var value = data[ name ];
        var param = encodeURIComponent( name ) + '=' + encodeURIComponent( value );

        params.push( param );
    }

    return params.join( '&' ).replace( /%20/g, '+' );
}
function getParam() {
    if (1 < document.location.search.length) {
      // 最初の1文字 (?記号) を除いた文字列を取得する
       var query = document.location.search.substring(1);
  
      // クエリの区切り記号 (&) で文字列を配列に分割する
       var parameters = query.split('&');
  
      var result = new Object();
      for (var i = 0; i < parameters.length; i++) {
        // パラメータ名とパラメータ値に分割する
         var element = parameters[i].split('=');
  
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
  
        // パラメータ名をキーとして連想配列に追加する
         result[paramName] = decodeURIComponent(paramValue);
      }
      return result;
    }
    return null;
  }
  // db apiに社員番号をpostする
function login(){

    let content = document.getElementById("userName");
    doApiGet(content.value);
}