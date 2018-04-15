
//全てのテーブルの値を更新
function setTableAll(objs){
  var enemy_table=document.getElementById("enemy_table");
  for (var i = 0, rowLen=enemy_table.rows.length;i<rowLen; i++) {
    enemy_table.rows[i].cells[0].innerHTML=objs[i+1].No;
    enemy_table.rows[i].cells[1].innerHTML=objs[i+1].sName;
    enemy_table.rows[i].cells[3].innerHTML=calcTime(objs[i+1]);
  }
}

//
