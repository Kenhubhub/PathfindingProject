const grid = document.getElementById("grid");
const height = Number(prompt("Enter height"));
const width = Number(prompt("Enter width"));
const sizeSquare = 50;
const Squares = []
class Square{
    constructor(){  
        this.createSquare();
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
grid.addEventListener("click",e=>{
     e.target.style.backgroundColor = "red";
})
const gridInit = ()=>{
    const number = (height * width);
    console.log(number)
    grid.style.height = `${height * 50}px`;
    grid.style.width = `${width * 50}px`;
    grid.style.gridTemplateColumns = `repeat(${width},1fr)`
    for(let i = 0 ; i < number; i++){
        const newSquare = new Square();
        Squares.push(newSquare.square);
    }
}

gridInit();