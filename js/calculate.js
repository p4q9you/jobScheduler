"use strict";

/**
 * 実行日を計算する
 * @param {*} element ex:date4-7 => 27-7 => 実行日は14日
 */
const calculateExecDay = (element) => {
    let replaceResult = replaceExecDay(element);
    console.log(formatByArr("{0}に対する置き換え結果は{1}です",element,replaceResult));
    let elementList = replaceResult.split("-");
    console.log(formatByArr("実行日は{0}日です。",getExecBusinessDay(parseInt(elementList[0]),parseInt(elementList[1]))));
}
/**
 * 入力済の基準日オブジェクトで置き換えて実行日を計算可能にする
 * @param {*} target 
 */
const replaceExecDay = (target) =>{
    let replaceResult;
    for(let key in SettingDate.getSettingDate()){
        if(target.match(key)){
            replaceResult =  target.replace(key,SettingDate.getSettingDate()[key]);
        }
    }
    return replaceResult;
}