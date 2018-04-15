//タイムピッカーの読み込み
$(function(){
  $('input').timepicki();
});

//クリックした時間でDate型を作成
function setTime(obj){
  var time=new Date();
  obj.time=time;
}

//タイムピッカー全体から値を変更
function setTimePickerAll(){
  var pickers=document.getElementsByClassName('timeclass');
  for(o in objs){
    //編集するピッカーの時刻(**:**)を取得
    var time=pickers[objs[o].No-1].value;
    // console.log(objs[o],time);
    setTimePicker(objs[o],time);
  }
  redrawCircle();
}
//指定したidのタイムピッカーから値を変更
//TODO 日付越え未実装
//TODO 未来の時間未実装
function setTimePicker(obj,time){
  if (time =='--:--'){
    //何もせず終わる
    return;
  }
  //時刻が初期値だったら
  else if(obj.time==null){
    setTime(obj);
  }
  var hour=parseInt(time.slice(0,2));
  var minute=parseInt(time.slice(3,6));

  //値をセット
  obj.time.setHours(hour);
  obj.time.setMinutes(minute);
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
