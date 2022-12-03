const grid = document.getElementById("grid");

const sizeSquare = 50;
const Squares = []
grid.addEventListener("click",e=>{
     e.target.style.backgroundColor = "red";
})

class Square{
    constructor(){  
        this.createSquare();
        this.x;
        this.y;
        this.nc = [];
        this.neighbours = [];
    }
    createSquare(){
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = `${sizeSquare}px`;
        square.style.width = `${sizeSquare}px`
        this.square = square;
        grid.append(square);
    }
    getNeighbourCoordinates(){
        
    }
}
class Grid{
    constructor(height,width){
        this.height = height;
        this.width = width;
    }
    gridInit = ()=>{
        const number = (this.height * this.width);
        grid.style.height = `${this.height * 50}px`;
        grid.style.width = `${this.width * 50}px`;
        grid.style.gridTemplateColumns = `repeat(${this.width},1fr)`
       
        for(let i = 0 ; i < number; i++){
            const newSquare = new Square();
            Squares.push(newSquare);
        }
        let x= 0;
        let y = 0;
        Squares.forEach(square =>{
            square.x = x;
            square.y = y;
            square.square.setAttribute("xc",x)
            square.square.setAttribute("yc",y)
            x=== width-1 ? (x = 0,y++) : x++;
        })
    }
}

// const gridInit = ()=>{
//     const number = (height * width);
//     console.log(number)
//     grid.style.height = `${height * 50}px`;
//     grid.style.width = `${width * 50}px`;
//     grid.style.gridTemplateColumns = `repeat(${width},1fr)`
   
//     for(let i = 0 ; i < number; i++){
//         const newSquare = new Square();
//         Squares.push(newSquare);
//     }
//     let x= 0;
//     let y = 0;
//     Squares.forEach(square =>{
//         square.x = x;
//         square.y = y;
//         square.square.setAttribute("xc",x)
//         square.square.setAttribute("yc",y)
//         x=== width-1 ? (x = 0,y++) : x++;
//     })
//     //find neighbours
//     for(let i = 0 ; i<Squares.length; i++){
//         //get current squares
//         getNeighbours(Squares[i])
//     }
// }

// gridInit();
const main = ()=>{
    const height = Number(prompt("Enter height"));
    const width = Number(prompt("Enter width"));
    const newGrid = new Grid(height,width);
    newGrid.gridInit();
}

main();