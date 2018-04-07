
var stage;
var app;
var map;
var MAX_CIRCLE_SIZE=70;
var BEGIN_CIRCLE_COLOR=0xFFFFFF;
var END_CIRCLE_COLOR=0xEA1E63;
var MAX_TIME=60*120; //沸くまでの秒数

//ファイルをアップロード
PIXI.loader
  .add("images/map.jpg")
  .load(setup);

//ウィンドウサイズが変更されたら画像のリサイズ
window.onresize=resize;

//初期表示設定
function setup(){
  //描画エリアの生成
  stage = new PIXI.Container();
  //画像読み込む時はApplicationじゃなくてautoDetectRendererじゃないとダメみたい
  app = new PIXI.autoDetectRenderer({ backgroundColor: 0xF9ECC7, antialias: false });
  map=PIXI.Texture.fromImage("images/map.jpg");
  stage.addChild(new PIXI.Sprite(map));
  resize();
  initCircle(objs);
}

//画像のリサイズ
function resize(){
  var W=document.body.clientWidth;

  //画像のサイズを画面横幅サイズに縮小
  stage.scale.x = stage.scale.y = W/map.width;

  app.resize(stage.width,stage.height);
  //stageを再描画
  requestAnimationFrame(animate);
}

//csvから読み込んで初期化
function initCircle(objs){
  for(obj in objs){
    var x=Number(objs[obj].x);
    var y=Number(objs[obj].y);
    //モンスターの情報に円(circle)を追加
    objs[obj].circle=createCircle(x,y,MAX_CIRCLE_SIZE,END_CIRCLE_COLOR);
  }
}

//円を生成、イベントアクションの登録
function createCircle(x,y,rad,color){
  var circle=new PIXI.Graphics();
  circle.beginFill(color);
  circle.drawCircle(x,y,rad);
  circle.endFill();
  circle.alpha = 0.6;

  circle.interactive=true;
  circle.buttonMode=true;

  stage.addChild(circle);
  //クリック時の処理
  circle.on('click',function(){
    for(o in objs){
      //どの円をクリックしたのかを判定
      if(objs[o].circle == this){
        setTime(objs[o]);
        objs[o].circle.tint=0xFE1E63;
        redrawCircle();
      }
    }

    requestAnimationFrame(animate);
  });

  return circle;
}

var time =0;
( function loop(){
    requestAnimationFrame( loop );
    //5秒間に1回のタイミングで処理を行う
    if(time % 300 ==0){
      redrawCircle();
    }
    time+=1;
} )();

//一定時間ごとの再描画
function redrawCircle(){

  for(o in objs){
    var now=calcTime(objs[o]);
    if(now =='noDate'){

    } else if(now < MAX_TIME){
      objs[o].circle.destroy();
      objs[o].circle=createCircle(  Number(objs[o].x),
                                    Number(objs[o].y),
                                    10+(now*60/MAX_TIME),
                                    colorGradCalc(now/MAX_TIME*50));
    } else if(now >= MAX_TIME){
      objs[o].circle.destroy();
      objs[o].circle=createCircle(  Number(objs[o].x),
                                    Number(objs[o].y),
                                    MAX_CIRCLE_SIZE,
                                    END_CIRCLE_COLOR);
    }

    requestAnimationFrame(animate);
  }

}

//目標カラーへの等比グラデーション
function colorGradCalc(percent){
  //hex_colorは0x??????として読み込む
  Ra=parseInt(BEGIN_CIRCLE_COLOR.toString(16).substr(0,2),16);
  Ga=parseInt(BEGIN_CIRCLE_COLOR.toString(16).substr(2,2),16);
  Ba=parseInt(BEGIN_CIRCLE_COLOR.toString(16).substr(4,2),16);
  Rb=parseInt(END_CIRCLE_COLOR  .toString(16).substr(0,2),16);
  Gb=parseInt(END_CIRCLE_COLOR  .toString(16).substr(2,2),16);
  Bb=parseInt(END_CIRCLE_COLOR  .toString(16).substr(4,2),16);
  Rc=Math.floor((Rb-Ra)*percent /100+Ra);
  Gc=Math.floor((Gb-Ga)*percent /100+Ga);
  Bc=Math.floor((Bb-Ba)*percent /100+Ba);
  return '0x'+Rc.toString(16)+Gc.toString(16)+Bc.toString(16);
}

function animate(){
	//再帰的に呼び出す
	// requestAnimationFrame(animate);
	app.render(stage);
  document.getElementById("pixiview").appendChild(app.view);
  var str="";
  for(o in objs){
    //(time||'noDate')　timeの中身がなければnoDataって表示してくれる
    str+=objs[o].No + " | " +objs[o].sName + " | "+(dateFormat(objs[o].time)||'noData')+" | "+calcTime(objs[o])+"<br>";
  }
  document.getElementById("nm_info").innerHTML=str;

}
