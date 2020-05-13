import Queue from 'tinyqueue'

export class Map {

	constructor(intersections, roads){
		this.intersections = {}
		this.roads = []

		intersections.forEach((intersection, index) => {
			this.intersections[index] = [intersection['x'], intersection['y']]
		})

		roads.forEach((road, index) => {
			if(this.roads[road['from']]) {
				this.roads[road['from']] = [...this.roads[road['from']], road['to']]
			} else {
				this.roads[road['from']] = [road['to']]
			}
		})

	}

	//helper method to calc straight line distance between two points 
	calcDistance(intersection1, intersection2) {
		let x2_x1 = Math.pow((intersection2[0] - intersection1[0]), 2)
		let y2_y1 = Math.pow((intersection2[1] - intersection1[1]), 2)
		return Math.sqrt(x2_x1 + y2_y1)
	}

	getPath(explored, stop) {

		//return path tracing from goal back to start using the 'origin' param
		let result = []

		function getPathFunc(explored, stop, array = []) {
			if(stop != null) {
				getPathFunc(explored, explored[stop]['origin'], array)
				array.push(stop)
			}
		}

		getPathFunc(explored, stop, result)
		return result
	}

	a_star(start, goal, cb) {
		if(!(start in this.intersections)) {
			return "Start not found"
		}

		if(!(goal in this.intersections)) {
			return "Goal not found"
		}

		let frontier = new Queue([{
			'intersection': start,
			'weight': 0,
			'origin': null,
			'acc_dist': 0
		}], function (a, b) {
			return a.value - b.value
		})

		let explored = {}

		let count = 0
		while (frontier.length) {
			let current_intersection_dict = frontier.pop()
			cb(current_intersection_dict['origin'], current_intersection_dict['intersection'])
			let current_intersection = current_intersection_dict['intersection']

			if(current_intersection in explored) {
				if(current_intersection_dict['weight'] < explored[current_intersection]['weight']) {
					explored[current_intersection] = current_intersection_dict
				}
			} else {
				explored[current_intersection] = current_intersection_dict
			}

			for(let road of this.roads[current_intersection]) {
				if(!(road in explored)) {
					let dist_from_goal = this.calcDistance(this.intersections[road], this.intersections[goal])

					let dist_from_intersection = this.calcDistance(this.intersections[current_intersection], this.intersections[road]) + current_intersection_dict['acc_dist']

					let total_weight = dist_from_intersection + dist_from_goal

					frontier.push({
						'intersection': road,
						'weight': total_weight,
						'acc_dist': dist_from_intersection,
						'origin': current_intersection
					})
				}
			} 
		}
		console.log(this.getPath(explored, goal))
		return this.getPath(explored, goal)
	}
}

// const intersections = {0: [0.7801603911549438, 0.49474860768712914], 1: [0.5249831588690298, 0.14953665513987202], 2: [0.8085335344099086, 0.7696330846542071], 3: [0.2599134798656856, 0.14485659826020547], 4: [0.7353838928272886, 0.8089961609345658], 5: [0.09088671576431506, 0.7222846879290787], 6: [0.313999018186756, 0.01876171413125327], 7: [0.6824813442515916, 0.8016111783687677], 8: [0.20128789391122526, 0.43196344222361227], 9: [0.8551947714242674, 0.9011339078096633], 10: [0.7581736589784409, 0.24026772497187532], 11: [0.25311953895059136, 0.10321622277398101], 12: [0.4813859169876731, 0.5006237737207431], 13: [0.9112422509614865, 0.1839028760606296], 14: [0.04580558670435442, 0.5886703168399895], 15: [0.4582523173083307, 0.1735506267461867], 16: [0.12939557977525573, 0.690016328140396], 17: [0.607698913404794, 0.362322730884702], 18: [0.719569201584275, 0.13985272363426526], 19: [0.8860336256842246, 0.891868301175821], 20: [0.4238357358399233, 0.026771817842421997], 21: [0.8252497121120052, 0.9532681441921305], 22: [0.47415009287034726, 0.7353428557575755], 23: [0.26253385360950576, 0.9768234503830939], 24: [0.9363713903322148, 0.13022993020357043], 25: [0.6243437191127235, 0.21665962402659544], 26: [0.5572917679006295, 0.2083567880838434], 27: [0.7482655725962591, 0.12631654071213483], 28: [0.6435799740880603, 0.5488515965193208], 29: [0.34509802713919313, 0.8800306496459869], 30: [0.021423673670808885, 0.4666482714834408], 31: [0.640952694324525, 0.3232711412508066], 32: [0.17440205342790494, 0.9528527425842739], 33: [0.1332965908314021, 0.3996510641743197], 34: [0.583993110207876, 0.42704536740474663], 35: [0.3073865727705063, 0.09186645974288632], 36: [0.740625863119245, 0.68128520136847], 37: [0.3345284735051981, 0.6569436279895382], 38: [0.17972981733780147, 0.999395685828547], 39: [0.6315322816286787, 0.7311657634689946]}

// const roads = [[36, 34, 31, 28, 17], [35, 31, 27, 26, 25, 20, 18, 17, 15, 6], [39, 36, 21, 19, 9, 7, 4], [35, 20, 15, 11, 6], [39, 36, 21, 19, 9, 7, 2], [32, 16, 14], [35, 20, 15, 11, 1, 3], [39, 36, 22, 21, 19, 9, 2, 4], [33, 30, 14], [36, 21, 19, 2, 4, 7], [31, 27, 26, 25, 24, 18, 17, 13], [35, 20, 15, 3, 6], [37, 34, 31, 28, 22, 17], [27, 24, 18, 10], [33, 30, 16, 5, 8], [35, 31, 26, 25, 20, 17, 1, 3, 6, 11], [37, 30, 5, 14], [34, 31, 28, 26, 25, 18, 0, 1, 10, 12, 15], [31, 27, 26, 25, 24, 1, 10, 13, 17], [21, 2, 4, 7, 9], [35, 26, 1, 3, 6, 11, 15], [2, 4, 7, 9, 19], [39, 37, 29, 7, 12], [38, 32, 29], [27, 10, 13, 18], [34, 31, 27, 26, 1, 10, 15, 17, 18], [34, 31, 27, 1, 10, 15, 17, 18, 20, 25], [31, 1, 10, 13, 18, 24, 25, 26], [39, 36, 34, 31, 0, 12, 17], [38, 37, 32, 22, 23], [33, 8, 14, 16], [34, 0, 1, 10, 12, 15, 17, 18, 25, 26, 27, 28], [38, 5, 23, 29], [8, 14, 30], [0, 12, 17, 25, 26, 28, 31], [1, 3, 6, 11, 15, 20], [39, 0, 2, 4, 7, 9, 28], [12, 16, 22, 29], [23, 29, 32], [2, 4, 7, 22, 28, 36]]




// [{"from":0,"to":36},{"from":0,"to":34},{"from":0,"to":31},{"from":0,"to":28},{"from":0,"to":17},{"from":1,"to":35},{"from":1,"to":31},{"from":1,"to":27},{"from":1,"to":26},{"from":1,"to":25},{"from":1,"to":20},{"from":1,"to":18},{"from":1,"to":17},{"from":1,"to":15},{"from":1,"to":6},{"from":2,"to":39},{"from":2,"to":36},{"from":2,"to":21},{"from":2,"to":19},{"from":2,"to":9},{"from":2,"to":7},{"from":2,"to":4},{"from":3,"to":35},{"from":3,"to":20},{"from":3,"to":15},{"from":3,"to":11},{"from":3,"to":6},{"from":4,"to":39},{"from":4,"to":36},{"from":4,"to":21},{"from":4,"to":19},{"from":4,"to":9},{"from":4,"to":7},{"from":4,"to":2},{"from":5,"to":32},{"from":5,"to":16},{"from":5,"to":14},{"from":6,"to":35},{"from":6,"to":20},{"from":6,"to":15},{"from":6,"to":11},{"from":6,"to":1},{"from":6,"to":3},{"from":7,"to":39},{"from":7,"to":36},{"from":7,"to":22},{"from":7,"to":21},{"from":7,"to":19},{"from":7,"to":9},{"from":7,"to":2},{"from":7,"to":4},{"from":8,"to":33},{"from":8,"to":30},{"from":8,"to":14},{"from":9,"to":36},{"from":9,"to":21},{"from":9,"to":19},{"from":9,"to":2},{"from":9,"to":4},{"from":9,"to":7},{"from":10,"to":31},{"from":10,"to":27},{"from":10,"to":26},{"from":10,"to":25},{"from":10,"to":24},{"from":10,"to":18},{"from":10,"to":17},{"from":10,"to":13},{"from":11,"to":35},{"from":11,"to":20},{"from":11,"to":15},{"from":11,"to":3},{"from":11,"to":6},{"from":12,"to":37},{"from":12,"to":34},{"from":12,"to":31},{"from":12,"to":28},{"from":12,"to":22},{"from":12,"to":17},{"from":13,"to":27},{"from":13,"to":24},{"from":13,"to":18},{"from":13,"to":10},{"from":14,"to":33},{"from":14,"to":30},{"from":14,"to":16},{"from":14,"to":5},{"from":14,"to":8},{"from":15,"to":35},{"from":15,"to":31},{"from":15,"to":26},{"from":15,"to":25},{"from":15,"to":20},{"from":15,"to":17},{"from":15,"to":1},{"from":15,"to":3},{"from":15,"to":6},{"from":15,"to":11},{"from":16,"to":37},{"from":16,"to":30},{"from":16,"to":5},{"from":16,"to":14},{"from":17,"to":34},{"from":17,"to":31},{"from":17,"to":28},{"from":17,"to":26},{"from":17,"to":25},{"from":17,"to":18},{"from":17,"to":0},{"from":17,"to":1},{"from":17,"to":10},{"from":17,"to":12},{"from":17,"to":15},{"from":18,"to":31},{"from":18,"to":27},{"from":18,"to":26},{"from":18,"to":25},{"from":18,"to":24},{"from":18,"to":1},{"from":18,"to":10},{"from":18,"to":13},{"from":18,"to":17},{"from":19,"to":21},{"from":19,"to":2},{"from":19,"to":4},{"from":19,"to":7},{"from":19,"to":9},{"from":20,"to":35},{"from":20,"to":26},{"from":20,"to":1},{"from":20,"to":3},{"from":20,"to":6},{"from":20,"to":11},{"from":20,"to":15},{"from":21,"to":2},{"from":21,"to":4},{"from":21,"to":7},{"from":21,"to":9},{"from":21,"to":19},{"from":22,"to":39},{"from":22,"to":37},{"from":22,"to":29},{"from":22,"to":7},{"from":22,"to":12},{"from":23,"to":38},{"from":23,"to":32},{"from":23,"to":29},{"from":24,"to":27},{"from":24,"to":10},{"from":24,"to":13},{"from":24,"to":18},{"from":25,"to":34},{"from":25,"to":31},{"from":25,"to":27},{"from":25,"to":26},{"from":25,"to":1},{"from":25,"to":10},{"from":25,"to":15},{"from":25,"to":17},{"from":25,"to":18},{"from":26,"to":34},{"from":26,"to":31},{"from":26,"to":27},{"from":26,"to":1},{"from":26,"to":10},{"from":26,"to":15},{"from":26,"to":17},{"from":26,"to":18},{"from":26,"to":20},{"from":26,"to":25},{"from":27,"to":31},{"from":27,"to":1},{"from":27,"to":10},{"from":27,"to":13},{"from":27,"to":18},{"from":27,"to":24},{"from":27,"to":25},{"from":27,"to":26},{"from":28,"to":39},{"from":28,"to":36},{"from":28,"to":34},{"from":28,"to":31},{"from":28,"to":0},{"from":28,"to":12},{"from":28,"to":17},{"from":29,"to":38},{"from":29,"to":37},{"from":29,"to":32},{"from":29,"to":22},{"from":29,"to":23},{"from":30,"to":33},{"from":30,"to":8},{"from":30,"to":14},{"from":30,"to":16},{"from":31,"to":34},{"from":31,"to":0},{"from":31,"to":1},{"from":31,"to":10},{"from":31,"to":12},{"from":31,"to":15},{"from":31,"to":17},{"from":31,"to":18},{"from":31,"to":25},{"from":31,"to":26},{"from":31,"to":27},{"from":31,"to":28},{"from":32,"to":38},{"from":32,"to":5},{"from":32,"to":23},{"from":32,"to":29},{"from":33,"to":8},{"from":33,"to":14},{"from":33,"to":30},{"from":34,"to":0},{"from":34,"to":12},{"from":34,"to":17},{"from":34,"to":25},{"from":34,"to":26},{"from":34,"to":28},{"from":34,"to":31},{"from":35,"to":1},{"from":35,"to":3},{"from":35,"to":6},{"from":35,"to":11},{"from":35,"to":15},{"from":35,"to":20},{"from":36,"to":39},{"from":36,"to":0},{"from":36,"to":2},{"from":36,"to":4},{"from":36,"to":7},{"from":36,"to":9},{"from":36,"to":28},{"from":37,"to":12},{"from":37,"to":16},{"from":37,"to":22},{"from":37,"to":29},{"from":38,"to":23},{"from":38,"to":29},{"from":38,"to":32},{"from":39,"to":2},{"from":39,"to":4},{"from":39,"to":7},{"from":39,"to":22},{"from":39,"to":28},{"from":39,"to":36}]