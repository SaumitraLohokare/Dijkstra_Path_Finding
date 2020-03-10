var cout = document.getElementById("output")
var htmlBoard = document.createElement('div')
document.body.appendChild(htmlBoard)

function print(string) {
    var buffer = cout.innerText
    buffer += string
    cout.innerText = buffer
}

/*
Dijkstra:
! We need a graph.
I wanna represent it as a matrix, but instead of
1 and 0's it will have length or -1.

! We need the actual algorithm
Now we need a list to store the node distances.
Also we need a list of lists to store minimum path.
to go from source.
loop though every node connected to our source.
then check their minimum distance. * make sure to set distance of everything to infinity before.
accordingly set their min_dist_list.
then we go to the next node not selected and wuth minimum distance.
*/

var buttons = []
var user_blocked = []

var min_dist = []
var min_dist_list = []

var Board = {
    matrix: [],
    n: 0,
    print: () => console.log(this.matrix),
    init: function () {
        this.matrix = []
        //this.matrix.splice(0, this.matrix.length);
        
        for (let i = 0; i < this.n; i++) {
            this.matrix.push([])
            let answer = prompt(`Enter the length of branches of${i} :`, "1 ".repeat(this.n))
            let answers = answer.trim().split(" ")
            answers.forEach((val) => this.matrix[i].push(parseInt(val)))
        }
    },
}

function nextNode(selected) { // returns the next node which is not selected and has minmum distance
    console.log(`Length of selected in nextNode() : ${selected.length}`)
    let dist = Number.MAX_VALUE
    let ret = -1
    for (let i = 0; i < Board.n; i++) {
        if (!selected.includes(i)) {
            if (min_dist[i] < dist) {
                dist = min_dist[i]
                ret = i
            }
        }
    }
    return ret
} 

function dijkstra(source, destination) {
    // create a list to store selected nodes
    let selected = []
    // fill up the min_dist list with 0 and infinity
    min_dist = []
    min_dist_list = []
    for (let i = 0; i < Board.n; i++) {
        if (i == source) {
            min_dist.push(0)
            min_dist_list.push([source])
        } else {
            min_dist.push(Number.MAX_VALUE)
            min_dist_list.push([])
        }
    }

    // start from source
    let current = source
    while (selected.length != Board.n) { // while all the nodes have not been selected
        selected.push(current) // add current to selected so that we dont select it again
        for (let i = 0; i < Board.n; i++) {
            if (Board.matrix[current][i] != -1 && !selected.includes(i)) { // means that a branch exists b/w current node and node 'i'
                console.log(Board.matrix[current][i])
                // calculate distance to that node
                console.log(`Distance to curent : ${min_dist[current]}`)
                let dist = min_dist[current] + Board.matrix[current][i]
                console.log(`Calculated dist = ${dist}`)

                if (dist < min_dist[i]) { // if our calculated dist is smaller than it's previous calculated dist
                    min_dist[i] = dist
                    min_dist_list[i] = min_dist_list[current].concat([i]) // min path to current node + current node
                }
            }
        }
        console.log(`Lenght of seleceted : ${selected.length}`)
        // now we need to get the next node which has not been selected and has minimum distance
        current = nextNode(selected)
        console.log(`Next node : ${current}`)
        if (current == -1) {
            console.error(`\nnextNode returned with -1. \nValue of selected : ${selected}\n`)
            break
        }
        console.log("\n=============================================\n")
    }

    // hopefully this solved the pathfinding now we can just print the minimum dist and min dist list
    for (let i = 0; i < Board.n; i++) {
        if (i != destination) {
            console.log(`Min dist for node ${i} = ${min_dist[i]}\n`)
            console.log(`Path : ${min_dist_list[i]}\n`)
            console.log("======================================\n")
        } else {
            cout.innerText = "" // reset the p tag
            print("\n\nSolution : \n\n")
            print("___________________________________________________\n\n")
            print(`Min dist to node ${i} = ${min_dist[i]}\n`)
            print(`Path : ${min_dist_list[i]}\n`)
        }
    }
}

window.onload = function () {
    this.Board.n = parseInt(prompt('Enter size of n : ', '3'))
    this.Board.init()
    this.Board.print()
    print("\n\nSolution : \n\n")
    print("___________________________________________________\n\n")
    let source = prompt('Source node: ', `0`)
    let destination = prompt('Destination node: ', `0`)
    dijkstra(parseInt(source), parseInt(destination))
}
