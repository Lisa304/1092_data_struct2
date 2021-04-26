import React, {useState} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import "../knapsack/knapsack.css"
const Knapsack = () =>{
    const [amo,setAmount] = useState();
    const [nodes,setNodes] = useState();
    const [food,setFood] = useState([]);
    const [answer,setAnswer] = useState();
    const [end,setEnd] = useState();
    const [endFood,setEndFood] = useState([]);
    const [total,setTotal] = useState();

    const knap_eval = () => {
        setFood(nodes.split(','));
        //foods = foods.split(',');
        var foods = nodes.split(',');
        var amount = amo;
        let cost = [],i,best = [];
        for (i = 0; i < amount ; i++){
            cost.push(0);
            best.push("0");
        }
        var index;
        var size = {
            "Salmon":153,"Tuna":260,"Istiophoridae":67,"Fenneropenaeus":93,
            "Borealis":152,"Adductor":50,"Haliotis":58,"Gratilla":13,
            "Kuroge":166,"Chionoecetes":77,"Eriocheir":151,"Palinuridae":60
        };
        var value = {
            "Salmon":253,"Tuna":530,"Istiophoridae":153,"Fenneropenaeus":196,
            "Borealis":250,"Adductor":87,"Haliotis":191,"Gratilla":33,
            "Kuroge":431,"Chionoecetes":90,"Eriocheir":180,"Palinuridae":100
        };
        let j;
        var thing;
        var ans = {
            1:[],2:[],3:[],4:[],5:[],
            6:[],7:[],8:[],9:[],10:[],
            11:[],12:[]
        };
        for ( j = 1 ; j <= foods.length ; j++){ // j是第幾個物件
            index = amount-1;
            for ( i = 1; i <= amount ; i++){ // i是第幾格背包
                thing = foods[j-1];
                if ((i-size[thing])>=0){ //背包放得進去嗎?這個到後面都一定是true 
                    if (cost[i] < ( cost[i-size[thing]] + value[thing])){
                        cost[i] = cost[ i-size[thing] ] + value[thing];
                        best[i] = thing;
                        //console.log("k")
                    }
                }
            }
            while(true){
                if(best[index] === '0')
                    break
                ans[j].push(best[index])
                index = index - size[best[index]]
            }
        }
        //console.log(ans);
        setAnswer(ans);
        //console.log(":",answer);
        let times = foods.length;
        console.log(foods,"<",times);
        var count = {};
        var haveAdd = []
        var total = 0;
        for (i = 0 ; i < ans[times].length;i++){
            if (! haveAdd.includes(ans[times][i])){
                haveAdd.push(ans[times][i]);
                count = {...count,[ans[times][i]]:1};
            }else{
                count[ans[times][i]]++;
            }
            total += value[ans[times][i]];
        }
        setTotal(total);
        setEnd(count);
        setEndFood(haveAdd);
        //console.log(">",count);
    }
    return(
        <MDBContainer >
            <h1 className = "w-100">Knapsack</h1>
            <MDBRow>
            <MDBCol size = "3" style={{borderRight:'1px dashed black', width: "75%"}}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">胃容量:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput1"
                        onChange = {(e)=>
                            {   
                                setAmount(e.target.value);
                            }
                        }
                    />
                    <label htmlFor="formGroupExampleInput">食品名稱:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        onChange = {(e)=>
                            {   
                                setNodes(e.target.value);
                            }
                        }
                    />
                    <MDBBtn onClick = {()=>knap_eval()}>輸出結果</MDBBtn>
                </div>
            </MDBCol>
            <MDBCol size = "9" >
                <h2>output</h2>
                <div>
                    {
                    food.map((item,idx)=>
                    <MDBCol md="4" key = {idx} className="my-3 text-center instock_product_image">
                            <span>僅考慮 : </span><span style = {{color:"green"}}>
                                {food.filter(n => food.indexOf(n)<=(idx) )}</span>
                            <div class="flex-container">
                            {
                                answer[idx+1].map((e) =>
                                    <div>{e}</div>
                                )
                            }
                            </div>
                    </MDBCol>                
                    )
                    }                    
                </div>  
                <MDBRow >
                    <h2>當胃容量大小為 {amo},拿{
                        endFood.map((item) =>
                            <span>{item} {end[item]} 個</span>
                        )
                    },得總價值{total}</h2>  
                </MDBRow>                 
            </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Knapsack;