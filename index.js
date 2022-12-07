const grid = document.getElementById("grid");
const form = document.getElementById("form")
// Obtain objects with square class 
// Arithmetic to obtain coordinates for current square
// compare each square with target coordinates and xc and yc
let start = null;
let target = null;
const sizeSquare = 50;
let Squares = []
const compareCoord = (coord1, coord2)=>{
    // console.log( coord1.x === coord2.x && coord1.y === coord2.y)
    return String(coord1.x) ==coord2.x && String(coord1.y) == coord2.y;

}
const setNeighbours = (squares,squareElements)=>{
    
    squares.forEach(square => {
        const x = square.x;
        const y = square.y;
        const left = {x:x-1,y:y};
        const right = {x:x+1,y:y};
        const up = {x:x , y: y-1};
        const down = {x:x ,y: y+1};
        const tl = {x:x-1,y:y-1};
        const bl = {x:x-1,y:y+1};
        const tr ={x: x+1, y:y-1};
        const br = {x: x+1, y:y+1};
        squares.forEach( element =>{
            const xc = element.square.getAttribute("xc");
            const yc = element.square.getAttribute("yc");
            const elementcoord = {x:xc,y:yc};
            compareCoord(left,elementcoord) ? square.neighbours.push(element) : false;
            compareCoord(right,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(up,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(down,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(tl,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(bl,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(tr,elementcoord) ? square.neighbours.push(element) : false; 
            compareCoord(br,elementcoord) ? square.neighbours.push(element) : false; 
        })
    
    })
}
grid.addEventListener("click",async e=>{
    if(!start){
        e.target.style.backgroundColor = "red";
        start = e.target;
    }else if(!target){
        e.target.style.backgroundColor = "green";
        target = e.target;
    }
    if(start && target){
        Squares.forEach(s => {
            if(s.square.style.backgroundColor ==="red"){
                console.log("found start",s)
                s.start = true;
                start = s;
            }
            if(s.square.style.backgroundColor === "green"){
                s.target = true;
                target = s;
            }
        })
        // const bfs = new BFS(start,target)
        // await bfs.Search();
        // const dfs = new DFS(start,target);
        // await dfs.Search();
        
    }
    
})
form.addEventListener("submit", async e=>{
    e.preventDefault();
    console.log(form.selected.value);
    if(start && target){
        switch(form.selected.value){
            case "1":
                const dfs = new DFS(start,target);
                await dfs.Search();
                break;
            case "2":
                 const bfs = new BFS(start,target)
                 await bfs.Search();
                 break;
            case "3":
                const greedy = new Greedy(start,target);
                 await greedy.Search();
                 break;
        }
    }
})
class Square{
    constructor(){  
        this.createSquare();
        this.x;
        this.y;
        this.nc = [];
        this.neighbours = [];
        this.target = false;
        this.start = false;
        this.explored = false;
        this.weight;
    }
    createSquare(){
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `${sizeSquare}px`;
        square.style.width = `${sizeSquare}px`
        this.square = square;
        grid.append(square);
    }
}
class Grid{
    constructor(height,width){
        this.height = height;
        this.width = width;
        this.squares = [];
    }
    gridInit = ()=>{
        const number = (this.height * this.width);
        grid.style.height = `${this.height * 50}px`;
        grid.style.width = `${this.width * 50}px`;
        grid.style.gridTemplateColumns = `repeat(${this.width},1fr)`
       
        for(let i = 0 ; i < number; i++){
            const newSquare = new Square();
            this.squares.push(newSquare);
        }
        let x= 0;
        let y = 0;
        this.squares.forEach(square =>{
            square.x = x;
            square.y = y;
            square.square.setAttribute("xc",x)
            square.square.setAttribute("yc",y)
            x=== this.width-1 ? (x = 0,y++) : x++;
        })
    }
}


const main = ()=>{
    const height = Number(prompt("Enter height"));
    const width = Number(prompt("Enter width"));
    const newGrid = new Grid(height,width);
    newGrid.gridInit();
    Squares = newGrid.squares;
    setNeighbours(Squares,Array.from(document.getElementsByClassName("square")));
    
}

main();