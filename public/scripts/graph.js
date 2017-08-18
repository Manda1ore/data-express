/*
drawGraph([.25,.25,.25,.25],"q1");
drawGraph([.50,.50,0,0],"q2");
drawGraph([0,0,.50,.50],"q3");
*/

var answers1 = [0,0,0,0];
var answers2 = [0,0,0,0];
var answers3 = [0,0,0,0];

var values1 = [0,0,0,0];
var values2 = [0,0,0,0];
var values3 = [0,0,0,0];

var total = 0;

function drawGraph(arr, canvasId){
    var cvs = document.getElementById(canvasId);
    var ctx = cvs.getContext("2d");

    var width_inc = cvs.width/arr.length;

    var width_seg1 = width_inc-((width_inc/arr.length));
    var width_seg2 = width_inc-((width_inc/arr.length)*(arr.length-1));

    ctx.fillStyle = "#ff0000";

    for(var i = 0; i < arr.length; i++){
        ctx.moveTo((width_inc*i)+width_seg2,cvs.height);
        ctx.lineTo((width_inc*i)+width_seg2,(cvs.height-arr[i]*cvs.height));
        ctx.lineTo((width_inc*i)+width_seg1,(cvs.height-arr[i]*cvs.height));
        ctx.lineTo((width_inc*i)+width_seg1,cvs.height);

        ctx.stroke();
    }

    ctx.stroke();
    ctx.fill();
}

function sendInfo1(value){
    if(value == "Water"){
        values1[0]++;
    }else if(value == "Air"){
        values1[1]++;
    }else if(value == "Noise"){
        values1[2]++;
    }else{
        values1[3]++;
    }
    total++;
}

function sendInfo2(value){
    if(value == "Pizza"){
        values2[0]++;
    }else if(value == "Steak"){
        values2[1]++;
    }else if(value == "Salad"){
        values2[2]++;
    }else{
        values2[3]++;
    }
}

function sendInfo3(value){
    if(value == "Cat"){
        values3[0]++;
    }else if(value == "Dog"){
        values3[1]++;
    }else if(value == "Bird"){
        values3[2]++;
    }else{
        values3[3]++;
    }
}

function calcPercents(){
    for(var i = 0; i < 4; i++){
        answers1[i] = values1[i]/total;
        answers2[i] = values2[i]/total;
        answers3[i] = values3[i]/total;
    }
    console.log("HERE");
}

function printThing(thing){
    console.log(thing);
}