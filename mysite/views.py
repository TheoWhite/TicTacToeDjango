from django.views import View
from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from mysite.board import getBoard, setBoard
from django.http import JsonResponse



class Hello(View):
	@csrf_exempt
	def get(self, request):
		current_board = getBoard()
		return render(request,"hello.html",{"board":current_board})
	def post(self, request):

		data = str(request.body)
		data = data[2:]
		data = data[:len(data)- 1]
		y = json.loads(data)
		print(y)
		print(y["data"]["cell"])
		#Lets add the new value to
		cell = y["data"]["cell"]
		new_value = "X"
		#Board cell,value and players go
		setBoard(cell,new_value,1)
		return render(request,"hello.html")

class Hi(View):
	@csrf_exempt
	def get(self, request):
		current_board = getBoard()
		return render(request,"hi.html",{"board":current_board})
	def post(self, request):

		data = str(request.body)
		data = data[2:]
		data = data[:len(data)- 1]
		y = json.loads(data)
		print(y)
		print(y["data"]["cell"])
		#Lets add the new value to
		cell = y["data"]["cell"]
		new_value = "O"
		#Board cell,value and players go
		setBoard(cell,new_value,0)
		return render(request,"hello.html")

class Item(View):
	def get(self,request):
			current_board = getBoard()
			print(current_board)
			return JsonResponse(json.dumps(current_board),safe=False)
