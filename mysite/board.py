reset = 0
board = ["-","-","-","-","-","-","-","-","-",0,"-"]

def init():
	global reset
	global board
	if(reset != 1):
		reset = 1
	return board

def getBoard():
	global reset
	init()
	#Horizontal
	if((board[0] == board[1]) and (board[1] == board[2])):
			board[10] = board[0]
	if((board[3] == board[4]) and (board[3] == board[5])):
			board[10] = board[3]
	if((board[6] == board[7]) and (board[6] == board[8])):
			board[10] = board[6]
	#Vertical
	if((board[0] == board[3]) and (board[0] == board[6])):
			board[10] = board[0]
	if((board[1] == board[4]) and (board[1] == board[7])):
			board[10] = board[1]
	if((board[2] == board[5]) and (board[5] == board[8])):
			board[10] = board[2]

		#Cross
	if((board[0] == board[4]) and (board[0] == board[8])):
				board[10] = board[4]
	if((board[2] == board[4]) and (board[2] == board[6])):
				board[10] = board[4]
	#Return board state in JSON syntax
	return board

def setBoard(index,new_value,player):
	global board
	print(board)
	board[int(index)] = new_value
	board[9] = player
