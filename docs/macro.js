$(function(){
  $('#macro_text_area_btn').on('click',function(){
    var text = $('#macro_text_area').val();
    $.each(objs,function(index,val){
      var reg = new RegExp("("+val.sName+"|"+val.Name+").*?(\\d{1,2}:\\d{1,2})");
      if(reg.test(text)){
        setTimePicker(val,reg.exec(text)[2]);
        $('#time'+index).val(reg.exec(text)[2]);
      }
    });
    redrawCircle();
  })
});
