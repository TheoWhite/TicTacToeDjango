//Set board equal to zero
var INTERVAL_ID = 0;
var board = new Array(11).fill("-");
createBoard(board);

function createBoard(array)
{
	//Create elements of board and reset
	var boardParentDiv = document.getElementById("board");
	makeRows(boardParentDiv, 3, 3, array);
}

function makeRows(container, rows, cols, array)
{
	//Clear board for next game
	$("#board").empty();
	var element_counter = 0;
	for (var x = 0; x != rows; ++x)
	{
		for (var y = 0; y != cols; ++y)
		{
			var element = document.createElement("div");
				element.id = "row" + element_counter;
			if(String(array[element_counter]) === "-")
			{
				element.className = "flex-row-item";
			} else {
			element.className = "flex-row-item-done";
		}
			element.innerHTML = array[element_counter];
			container.appendChild(element);
			element_counter++;
		}
	}
}



//One cell click

var selected_element = 0;

function selectAndClear(element)
{
	if (selected_element != 0)
	{
		selected_element.style.backgroundColor = "#000065";
		selected_element = document.getElementById($(element).attr('id'));
	}
	else
	{
		selected_element = document.getElementById($(element).attr('id'));
		$("#submit-button").prop("disabled", false);
	}
	element.style.backgroundColor = "red";
}

function find()
{

			$("#submit-button").on("click",function(event)
			{
				event.preventDefault();
				var change = selected_element.id;
				change = String(change).substr(3, change.length);
				//TODO: Complete POST request
				var response = {
					data:
					{
						"cell": change,
						"new_value": "0"
					}
				}
				clearInterval(INTERVAL_ID);
				INTERVAL_ID = setInterval(getUserData, 500);
				var json_response = JSON.stringify(response);
				$.post('/o', json_response);
			});

			$(".flex-row-item").on("click",function()
			{
				selectAndClear(this);
			});
}

//Get Request
INTERVAL_ID = setInterval(getUserData, 500);

//Handle function for GET request
function getUserData()
{
	$.ajax(
	{
		url: "/board",
		type: 'GET',
		success: function(data)
		{
			x = JSON.parse(data);
			var result = Object.entries(x);
			var new_array = []
			for (var counter = 0; counter != 11; ++counter)
			{
				new_array[counter] = result[counter][1]
			}
			console.log("Updating O")
			//Check if there is any updates from server
			console.log("value of " + new_array[9])
			if(new_array[10] === "O")
			{
				alert("Winner!");
			}
			if(new_array[10] === "X")
			{
				alert("You lose!");
			}
			if(new_array[9] === 1)
			{
				console.log("Should clear interval");
				createBoard(new_array);
				clearInterval(INTERVAL_ID);
				INTERVAL_ID = setInterval(find,50);
			}
			createBoard(new_array);
		}
	});
}
