const wait = async (ms) => {
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log("currently waiting")
            resolve();
        }, ms);
    });
}
const distance = (x1,y1,x2,y2) =>{
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
class DFS{
    constructor(start,target){
        this.start = start;
        this.target = target;
        this.frontier =[];
        this.frontier.push(this.start);
        
    }
    async Search(){
        if(this.frontier.length === 0){ console.log("no path found"); return false};
        let currentNode = this.frontier[this.frontier.length-1];
        currentNode.explored = true;
        this.frontier.pop();
        if(currentNode.square.style.backgroundColor !== "red" && currentNode.square.style.backgroundColor !=="green"){
            currentNode.square.style.backgroundColor = "blue";
        }
        await wait(500);
        if(currentNode.target){
            console.log("target found!")
            return true;
        }
        currentNode.neighbours.forEach(neighbour => {
            if(!neighbour.explored && !this.frontier.includes(neighbour))this.frontier.push(neighbour)});
        this.Search();
        
    }
}
class BFS{
    constructor(start,target){
        this.start = start;
        this.target = target;
        this.frontier =[];
        this.frontier.push(this.start);
        
    }
    async Search(){
        if(this.frontier.length === 0){console.log("No path found"); return false};
        let currentNode = this.frontier[0];
        currentNode.explored = true;
        this.frontier.shift();
        await wait(300);
        if(currentNode.square.style.backgroundColor !== "red" && currentNode.square.style.backgroundColor !=="green"){
            currentNode.square.style.backgroundColor = "blue";
        }
        if(currentNode.target){
            console.log("target found")
            return true;
        }
        currentNode.neighbours.forEach(neighbour => {
            if(!neighbour.explored && !this.frontier.includes(neighbour))this.frontier.push(neighbour)});
        this.Search();
        
    }
}

class Greedy{
    constructor(start,target){
        this.start = start;
        this.target = target;
        this.frontier =[];
        this.frontier.push(this.start);
        
    }
    async Search(){
        if(this.frontier.length === 0){console.log("No path found"); return false};
        let currentNode = this.frontier[0];
        currentNode.explored = true;
        this.frontier.shift();
        await wait(500);
        if(currentNode.square.style.backgroundColor !== "red" && currentNode.square.style.backgroundColor !=="green"){
            currentNode.square.style.backgroundColor = "blue";
        }
        if(currentNode.target){
            console.log("target found")
            return true;
        }
        let minnode;
        let min = Infinity;
        currentNode.neighbours.forEach(neighbour => {
            if(!neighbour.explored && !this.frontier.includes(neighbour)){
                neighbour.weight = distance(neighbour.square.getAttribute("xc"),neighbour.square.getAttribute("yc"),this.target.square.getAttribute("xc"),this.target.square.getAttribute("yc"));
                neighbour.weight <= min ? (min = neighbour.weight,minnode = neighbour) : false;
            }
        });
        this.frontier.push(minnode);
        this.Search();
        
    }
    
}