drawGraph([.25,.25,.25,.25],"q1");
drawGraph([.50,.50,0,0],"q2");
drawGraph([0,0,.50,.50],"q3");

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