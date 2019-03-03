/*!
######################################################

# WORK.JS

# ASSET RELEASE: 1.0.0

# BUILD DATE: 2019 3:4 

# COPYRIGHT 2019 

######################################################
*/
// 入力内容をAPIを経由で登録
const postSettingTarget = () => {

    // 入力内容
    const inputValueMap = getInputValue();

    // 入力チェック Todo 実装


    // API経由で登録
    const url = "http://localhost:7870/api/";
    const method = "POST";
    let jsonData = JSON.stringify([...inputValueMap]);

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.onload = () => {
      console.log(xmlHttpRequest.status);
      console.log("success!");
      window.location.href = "jobList.html"
    };
    xmlHttpRequest.onerror = () => {
      console.log(xmlHttpRequest.status);
      console.log("error!");
      alert("HTTP ERROR");
      // Todo テスト後消す。
      window.location.href = "jobList.html"
    };
    xmlHttpRequest.send(jsonData);
    console.log("送信データ:"+jsonData)

 }
// 全入力内容を取得
const getInputValue = () => {

    let result = new Map();
    let inputValueList = document.getElementsByTagName("input");
    for(const inputValue of inputValueList){
        result.set(inputValue.id,inputValue.value);
        console.log("入力内容:"+ inputValue.id + ":" + inputValue.value);
    }
    return result;
}
