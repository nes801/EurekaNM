
//クリックした時間でDate型を作成
function setTime(obj){
  var time=new Date();
  obj.time=time;
}

//最後にクリックしてからの経過時間を秒(小数点切り捨て)で返す
function calcTime(obj){
  var current_time=new Date();
  if (obj.time == null){
    //時間がなければnoDate
    return 'noDate';
  }else{
    return Math.floor((current_time-obj.time)/1000);
  }
}

//表示用にデータを整形
function dateFormat(date){
  if (!date)  return '--:--';
  //0埋めして取得
  var hours=("0"+date.getHours()).slice(-2);
  var minutes=("0"+date.getMinutes()).slice(-2);
  var res=hours+":"+minutes;
  return res;
}
