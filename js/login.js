/*!
######################################################

# LOGIN.JS

#ASSET RELEASE: 1.0.0

# BUILD DATE: 2019 3:4 

# COPYRIGHT 2019 

######################################################
*/

/** 
 * 
 * ログイン処理
 * 
 *  
 * */

// 管理ステータスに応じて遷移を振り分け
  function login(){

    // 入力した固有番号
    let inputLoginNo = document.getElementById("userName").value;
    if(!validateLoginParam(inputLoginNo)){
        alert("6文字入力してください。")
        return;
    };

    // 翌月を取得 2019年3月 → 201904


    // 翌月レコードが未登録
    // 初期設定画面へ

    // 翌月レコードが既登録
    // 回覧画面へ

    window.location.href = "jobList.html";
}
// Todo ユーティリティとして共通化
// 入力値チェック
function validateLoginParam(target){

    // 6字
    return (target && target.length == 6)?true:false;
}