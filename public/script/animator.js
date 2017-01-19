// Eric's Animation Script

// Assuming this function is free...
// Came from http://www.javascriptkit.com/javatutors/setcss3properties.shtml
function setProps(thingy,proparray,value){
    for (var i=0; i<proparray.length; i++){ //loop through possible properties
        thingy.css(proparray[i],value)
    }
}

function runSequence(funcList) {
	funcData = funcList.shift();
	func = funcData[0]
	time = funcData[1]
	func();
	if (funcList.length > 0) {
		setTimeout(function () {
			runSequence(funcList);
		}, time);
	}
}

function runSequenceWData(funcList) {
	funcData = funcList.shift();
	func = funcData[0]
	time = funcData[1]
	data = funcData[2]
	// console.log("Data: "+data);
	func(data);
	if (funcList.length > 0) {
		setTimeout(function () {
			runSequenceWData(funcList);
		}, time);
	}
}

// Predefineed thingies
transitionPropList = ['transition','-webkit-transition','-moz-transition']
transformPropList = ['transform','-webkit-transform','-moz-transform']

$(document).ready(function() {
	mainObj = $("#intro_panel");

	seq = [];
	var i =0;

	mainObj.find('div').each(function () {
		var item = $(this);

		if (item.hasClass('ctext')) {
			seq.push([function (args) {
				var item = args[0];
				item.css('opacity','1');
			},500,[item]]);
			seq.push([function (args) {
				var item = args[0];
				var i = args[1];
				item.css('opacity','0');
				console.log(i);
				if (i%2==0) {
				 item.css('left','-200px');
				 setProps(item,transformPropList,"rotate(-45deg) scale(3)");
				} else {
				 item.css('left','200px');
				 setProps(item,transformPropList,"rotate(45deg) scale(3)");
				}
			},600,[item,i]]);
		}

		if (item.hasClass('btext')) {
			text = item.data('value');
			for (var j=0, len = text.length; j < len; j++) {
				item.append("<span>"+text[j]+"</span>");
			}

			item.find('span').each(function () {
				var letter = $(this);
				seq.push([function (args) {
				 var letter = args[0];
				 letter.css('opacity','1');
				},80,[letter]]);
			});

			var colList = ["rgba(0,119,202,0.8)","rgba(0,119,202,0.8)","rgba(0,119,202,0.8)","rgba(0,119,202,0.8)","#C0C"];
			var colN = 0;
			item.find('span').each(function () {
				var letter = $(this);
				var colour = colList[colN];
				$(this).css('color', colour);
				seq.push([function (args) {
				 var letter = args[0];
				 var colour = args[1];
				 letter.css('opacity','0');
				 letter.css('color',"#FFF");
				},80,[letter,colour]]);
				colN++;
			});
		}

		if (item.hasClass('cfhtext')) {
			var words = item.data('value').split(',');
			for (var j=0, len=words.length; j < len; j++) {
				item.append("<span>"+words[j]+"</span>");
			}

			item.find('span').each(function () {
				var word = $(this);
				seq.push([function (args) {
				 var word = args[0];
				 word.css('opacity','1')
				},300,[word]]);
				seq.push([function (args) {
				 var word = args[0];
				 word.css('opacity','0')
				},300,[word]]);
			});
			seq.push([function (args) {
				var item = args[0];
				item.find('span').each(function () {
				 $(this).css('opacity','0.2');
				});
			},300,[item]]);
			seq.push([function (args) {
				var item = args[0];
				item.css('opacity','0')
				setProps(item,transformPropList,"rotate(-90deg) scale(2)");
			},300,[item]]);

		}

		if (item.hasClass('etext')) {
			var txtSpan = item.find('span').first();
			seq.push([function (args) {
				var txtSpan = args[0];
				txtSpan.css('opacity','1');
			},300,[txtSpan]]);
			seq.push([function (args) {
				var item = args[0];
				item.css('opacity','0');
				item.css('top','0%');
				item.css('left','0%');
			},3000,[item]]);

		}

		

		console.log("DID THING");

		i++;
	});

	seq.push([function (args) {
		console.log("\"Pointless log\"");
	},3000,[]]);

	seq.push([function (args) {
		var obj = args[0];
		obj.css('opacity','0');
	},300,[mainObj]]);

	seq.push([function (args) {
		location.reload();
	},5000,[mainObj]]);

	runSequenceWData(seq);
});
