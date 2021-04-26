import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "../binary/binary.css"
import Tree from "./tree"
//import tree from "./tree";
//import Nodes from "./nodes";

const Binary = () =>{
    const [foods,setFoods] = useState([]);
    const [freq,setFreq] = useState();
    const [cost,setCost] = useState([]);
    const [best,setBest] = useState(null);
    const [namelist,setNameList] = useState([]);
    const [endtable,setEndTable] = useState([]);
    const [ansOrder,setAnsOrder] = useState();
    
    let ans = [];
    let ans_order = [];
    const node =  {"S":"Salmon","T":"Tuna","I":"Istiophoridae","F":"Fenneropenaeus",
        "B":"Borealis","A":"Adductor","H":"Haliotis","G":"Gratilla",
        "K":"Kuroge","C":"Chionoecetes","E":"Eriocheir","P":"Palinuridae"};
    const binary_algorithm = () =>{
        
        let cost = [];
        let best = [];
        var lengthh = foods.length + 1;
        var i,j,k,n,tmp;
        for (i=0;i<lengthh+1;i++){
            cost.push([]);
            best.push([]);
            for (j = 0; j< lengthh;j++){
                cost[i].push(100000000);
                best[i].push("0");
            }            
        }
        //console.log(cost[1][1],"/",freq[0]);
        for (i=1;i<lengthh;i++){
            cost[i][i] = parseInt(freq[i-1]);
            best[i][i] = foods[i-1];
        }
        for (i=1;i<(lengthh+1);i++){
            cost[i][i-1] = 0;
        }
        //console.log(cost,":",best);
        //console.log(cost[5][5]);
        for ( j = 1 ; j <= lengthh;j++){
            for (i = 1; i < (lengthh - j);i++){
                for (k = i ; k<(i+j+1);k++){
                    tmp = cost[i][k-1] + cost[k+1][i+j];
                    //console.log(cost[i][k-1],":",cost[k+1][i+j],":",k,":",i,":",i+j)
                    if (tmp < cost[i][i+j]){
                        cost[i][i+j] = tmp;
                        best[i][i+j] = foods[k-1];
                    }                    
                }
                tmp = 0;
                for (n = i; n <(i+j+1); n++){
                    tmp += parseInt(freq[n-1]);
                }
                cost[i][i+j] += tmp;
            }
        }
        var name = [];
        var food = foods;
        console.log("food",foods,":",food);
        for ( i = 0 ; i < food.length;i++){
            name.push(node[food[i]]);
        }
        var endtable = [];
        for (i=0;i<food.length;i++){
            endtable.push([]);
            for (j = 0; j< food.length;j++){
                endtable[i].push("");
            }            
        }
        for (i = 0; i<food.length; i++){
            for (j = 0; j< food.length;j++){
                if(cost[i+1][j+1]>0 && cost[i+1][j+1]<100000000){
                    endtable[i][j] = (cost[i+1][j+1].toString()+best[i+1][j+1]);
                }
            } 
        }        
        //console.log("//name",name);
        setCost(cost);
        setBest(best);
        setNameList(name);
        setEndTable(endtable);
        
       
        get_preorder(1,foods.length,best,0,0);
        console.log("#ans_order",ans_order);
        setAnsOrder(ans_order);
    }
    const get_preorder = (start,end,best,dir,depth) =>{
        if (start>end){
            depth-=1;
            return;
        }
        var root, curr;                    
        root = best[start][end];
        curr = foods.indexOf(root)+1;
        if (!ans.includes(root)){
            ans_order.push(root);
            ans.push(root);
            draw(root,dir,depth);
        }
        //console.log("#ans",ans);
        //console.log("#ans_order",ans_order);
        if (ans.length === foods.length){
            return;
        }            
        if (start === end){
            depth-=1;
            return;
        }
        
        get_preorder(start,curr - 1,best,1,depth+1)
        get_preorder(curr + 1,end,best,2,depth+1)
    }
    var x = 250;
    var y = 100;
    const draw =(root,dir,depth)=>{
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        if (depth <= 0){
            ctx.moveTo(x, y);
        }else{
            if (dir === 1 ){
                ctx.moveTo(250+(depth-1)*50, y+ (depth-1) * 50);
            }else if( dir === 2){
                ctx.moveTo(250-(depth-1)*50, y+ (depth-1) * 50);
            }            
        }        
        if (dir === 1){
            x = 250-(depth*50);
        }else if(dir === 2){
            x = 250+(depth*50);
        }
        
        ctx.lineTo(x, y+ (depth * 50))
        ctx.stroke();
        ctx.fillText(node[root], x, y+ (depth * 50));
 
    }
    return(        
        <MDBContainer>
            <MDBRow>
            <h1 className = "w-100">Optimal binary searching tree</h1>
            </MDBRow>            
            <MDBRow>
                <MDBCol size = "3" style={{borderRight:'1px dashed black', width: "75%"}}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">食材代號:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput1"
                            onChange = {(e)=>
                                {   
                                    setFoods(e.target.value.split(""));
                                }
                            }
                        />
                        <label htmlFor="formGroupExampleInput">吃的貫數:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange = {(e)=>
                                {   
                                    setFreq(e.target.value.split(","));
                                }
                            }
                        />
                        <MDBBtn onClick={()=>binary_algorithm()} >輸出結果</MDBBtn>
                    </div>
                </MDBCol>
                <MDBCol>
                    <h2>output</h2>
                    <MDBTable bordered black>
                        <MDBTableHead style = {{background : "lightblue"}}>
                            <tr>
                            <th> </th>
                            {
                                namelist.map((item)=>
                                    <th>{item}</th>                                
                                )
                            }                            
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                endtable.map((item,idx) => 
                                    <tr key = {idx}>
                                    <td>{namelist[idx]}</td>
                                        {                                        
                                        item.map((e)=>
                                            <td>{e}</td>
                                        )
                                    }</tr>
                                )
                            }
                        </MDBTableBody>
                    </MDBTable>  
                                      
                    <MDBCol>    
                    <h2>選擇的順序(Pre-order) : {ansOrder}</h2>  
                    <canvas id="myCanvas" width="500" height="500" style={{border:"1px solid #000000"}}></canvas>
                             
                        {//console.log("foods:",foods,"best",best)
                        }
                        {/* {!!best && (<Tree food = {foods} bestdata = {best} 
                            start = {1} end = {foods.length}
                        />)}  */}
                        
                        {/* <Nodes comeList = {best} left = {1} right = {foods.length}/> */}
                        {/* {!!best[0] && best[0].length && (
                            <Nodes
                            left={1}
                            right={best[0].length - 1}
                            comeList={best}
                            className="w-100"
                            typefoodToEat={foods}
                            dir="right"
                            ></Nodes>
                        )} */}
                    </MDBCol>                
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Binary;