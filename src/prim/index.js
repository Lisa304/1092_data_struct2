import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
const Prim = () =>{
    const [nodes,setNodes] = useState([]);
    const [pos,setPos] = useState();
    const [tstart,setStart] = useState([]);
    const [tend,setEnd] = useState([]);
    const [ans,setAns] = useState([]);
    const [count,setCount] = useState(0);
    const prim_algorithm =()=>{
        var tmp_pos = pos;
        var tmp_nodes = nodes;
        let start = [];
        let end = [];
        let path = [];
        var i,j,k;
        for (i = 0; i< tmp_pos.length;i++){
            if (tmp_pos[i] !== ""){
                start.push(tmp_pos[i].split(",")[0].substr(1,1));
                end.push(tmp_pos[i].split(',')[1]);
                path.push(parseInt(tmp_pos[i].split(',')[2]));
            }
        }
        var datas = [];
        for (i = 0; i< tmp_pos.length;i++){
            datas.push([]);
            for (j = 0; j< tmp_pos.length;j++){
                datas[i].push(-1);
            }
        }
        console.log(start,":",end,":",path);
        for (i = 0; i< tmp_pos.length;i++){
            for (k = 0; k< tmp_pos.length;k++){
                if (nodes[k] === nodes[i]){
                    datas[i][k] = 0;
                }
                else{
                    for(j = 0; j< path.length;j++){
                        if(nodes[i] === start[j] && nodes[k] === end[j]){
                            datas[i][k] = path[j];
                        }
                        if(nodes[i] === end[j]  && nodes[k] === start[j]){
                            datas[i][k] = path[j];
                        }
                    }
                }
            }
            //console.log(i,"#",datas);
        }
        //console.log(path,":",datas);
        setStart(start);
        setEnd(end);
        get_ans(datas,tmp_nodes);
    }
    const get_ans = (datas,n) =>{
        var tmp_nodes = n;
        let ans_order = [];
        ans_order.push(tmp_nodes[0]);
        //console.log(tmp_nodes,":::::",datas);
        var tmp, tmpmin, i, j, k;
        tmp = "G";
        while (ans_order.length !== tmp_nodes.length){
            tmpmin = 100000000;
            //console.log(tmp_nodes.length,"::?");
            for (i = 0; i< tmp_nodes.length;i++){//有經過的
                //console.log(tmp_nodes[i],":",ans_order,"@$");
                if (ans_order.includes(tmp_nodes[i])){
                    for (j = 1; j< datas[i].length;j++){    // 找有經過地的最短   
                        //console.log("????",i,":",j);                 
                         if (datas[i][j] > 0 &&  !(ans_order.includes(tmp_nodes[j]))){
                            for (k = 0; k< datas[i].length;k++){//找最小
                                //console.log(i,":",j,":",k);
                                if (datas[i][k] > 0 && (!ans_order.includes(tmp_nodes[k])) 
                                && datas[i][k] < tmpmin ){
                                    tmpmin = datas[i][k];
                                    tmp = tmp_nodes[k];
                                }
                            }
                         }
                    }
                }
            }
            
            if (!ans_order.includes(tmp)){
                ans_order.push(tmp);
            }
            //console.log(ans_order);
        }
        setAns(ans_order);
        console.log("ans_order",ans_order);
        return;
    }
    var x = [280,330,380,430,450,400,360,320,250,225,200,175,150,175,200,225,240]
    var y = [80,100,130,170,250,300,320,340,400,360,320,290,250,210,170,130,100]
    const draw =  ( times )=>{
        console.log("times",times);
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var i;
        ctx.font = '10pt Arial'; 
            for ( i = 0;i < nodes.length;i++){
                ctx.strokeStyle  = "black";
                ctx.beginPath();
                ctx.arc(x[i], y[i], 15, 0, 2 * Math.PI);
                ctx.fillText(nodes[i], x[i], y[i]);
                ctx.stroke();
            }
            for ( i = 0;i < tstart.length;i++){
                ctx.beginPath();
                ctx.strokeStyle  = "black";
                ctx.moveTo(x[nodes.indexOf(tstart[i])], y[nodes.indexOf(tstart[i])]);
                ctx.lineTo(x[nodes.indexOf(tend[i])], y[nodes.indexOf(tend[i])]);
                ctx.stroke();
            }            
            for (i = 1 ; i<times;i++){
                console.log("redans",i,ans[i]);
                ctx.beginPath();
                ctx.strokeStyle  = "red";
                ctx.width = 20;
                ctx.moveTo(x[nodes.indexOf(ans[i])], y[nodes.indexOf(ans[i])]);
                ctx.lineTo(x[nodes.indexOf(ans[i-1])], y[nodes.indexOf(ans[i-1])]);
                ctx.stroke();
            }    
    }
    return(
        <MDBContainer>
            <h1 className = "w-100">Prim's algorithm</h1>
            <MDBRow>
                <MDBCol size = "3" style={{borderRight:'1px dashed black', width: "75%"}}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">店代號:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput1"
                            onChange = {(e)=>
                                {   
                                    setNodes(e.target.value.split(""));
                                }
                            }
                        />
                        <label htmlFor="formGroupExampleInput">店相對位置:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange = {(e)=>
                                {   
                                    setPos(e.target.value.split(") "));
                                }
                            }
                        />
                        <MDBBtn onClick={()=>prim_algorithm()} >輸出結果</MDBBtn>
                        <p>小心店相對位置之間有沒有空格</p>
                    </div>
                </MDBCol>
                <MDBCol>
                    <h2>output</h2>
                    <p>answer : {ans}</p>
                    <canvas id="myCanvas" width="500" height="500" style={{border:"1px solid #000000"}}></canvas>                    
                    {count<=nodes.length &&(<MDBBtn onClick = {()=> setCount(count+1)}>第 {count} 次的圖</MDBBtn>)}
                    {!!count && draw(count)}
                    
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default Prim;