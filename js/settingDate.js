
/**
 * 
 *  計算に必要な日付を用意する
 * 
 * 
 */

const SettingDate = {

    // 設定値を返す
     getSettingDate(){

        const execYear = new Date().getFullYear();
        const execMonth = new Date().getMonth() + 1;
        const day4 = "27"; // 実行日4

        let settingDate = new Map();

        // 1. 27日、祝日休日であれば前営業日
        let day4Result;
        if(isPublicHoliday(
            new Date(execYear,execMonth,27))){
                day4Result = getExecBusinessDay(parseInt(day4),parseInt(1));
        }else{
            day4Result = day4;
        }
        settingDate.set("day4",day4Result);
        console.log("[Info]day4Result:" +  day4Result);

        // 2. 1. の7営業日前
        let day2Result = getExecBusinessDay(parseInt(day4Result),parseInt(7));
        settingDate.set("day2",day2Result);
        console.log("[Info]day2Result:" + day2Result);

        // 3. 2の1営業日前
        let day1Result = getExecBusinessDay(parseInt(day2Result),parseInt(1));
        settingDate.set("day1",day1Result);
        console.log("[Info]day1Result:" +  day1Result);

        // 4. 3の1営業日前
        let day0Result = getExecBusinessDay(parseInt(day1Result),parseInt(1))
        settingDate.set("day0",day0Result);
        console.log("[Info]day0Result:" +  day0Result);

        // 指定日1
        settingDate.set("target1","3");

        // 指定日2
        settingDate.set("target2","4");

        return settingDate;
    }
}