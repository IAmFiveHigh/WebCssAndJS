
var clientWidth = document.documentElement.clientWidth
var clientHeight = document.documentElement.clientHeight

var data = {
    "message" : "success",
    "objects" : [
        {
            "options" : [
                {
                    "title" : "曹擦",
                    "isCorrent" : false
                },
                {
                    "title" : "超人",
                    "isCorrent" : false
                },
                {
                    "title" : "香港记者",
                    "isCorrent" : true
                }
            ],
            "question" : "这世界上谁跑的最快？",
            "analysis" : "因为香港记者就一点好，就是哪里有了事情，跑的比谁都快"
        },
        {
            "options" : [
                {
                    "title" : "60秒",
                    "isCorrent" : false
                },
                {
                    "title" : "61秒",
                    "isCorrent" : true
                },
                {
                    "title" : "59秒",
                    "isCorrent" : false
                }
            ],
            "question" : "在中国每过一分钟,你的生命就流逝多少秒？",
            "analysis" : "天若有情天亦老，我为长者续一秒"
        },
        {
            "options" : [
                {
                    "title" : "亦可赛艇",
                    "isCorrent" : true
                },
                {
                    "title" : "亦能覆舟",
                    "isCorrent" : false
                },
                {
                    "title" : "亦能煮粥",
                    "isCorrent" : false
                }
            ],
            "question" : "水能载舟,下一句是?",
            "analysis" : "excited"
        },
        {
            "options" : [
                {
                    "title" : "2",
                    "isCorrent" : true
                },
                {
                    "title" : "3",
                    "isCorrent" : false
                },
                {
                    "title" : "4",
                    "isCorrent" : false
                }
            ],
            "question" : "1 + 1 = ?",
            "analysis" : "这你都不会？"
        },
        {
            "options" : [
                {
                    "title" : "弗利萨",
                    "isCorrent" : false
                },
                {
                    "title" : "蓝精灵",
                    "isCorrent" : true
                },
                {
                    "title" : "不能说的人",
                    "isCorrent" : false
                }
            ],
            "question" : "在山的那边海的那边有一群?",
            "analysis" : "我都唱出来了"
        },
        {
            "options" : [
                {
                    "title" : "苟利国家生死以，岂因祸福避趋之",
                    "isCorrent" : true
                },
                {
                    "title" : "沉舟侧畔千帆过，病树前头万木春",
                    "isCorrent" : false
                },
                {
                    "title" : "孤帆远影碧空尽，惟见长江天际流",
                    "isCorrent" : false
                }
            ],
            "question" : "我当时就念了两首诗是",
            "analysis" : "别人江的话，你再重复一遍，你也是有泽任的，民不民白？"
        }
    ]
}

var index = 0
var indexArr = []
var selectArr = []
var correntArr = []

window.onload = function () {




    var objects = data.objects

    var arr = new Array(objects.length)
    var i = objects.length
    while (i--) {
        arr[i] = i
    }

    //获取随机序列
    randomSort(arr, indexArr)

    //第一题
    displayQAndA(objects)


    //获取正确答案
    var tmpCorrentArr = []
    for (var k=0; k<objects.length; k++) {

        var options = objects[k].options
        for (var l=0; l<options.length; l++) {
            if (options[l].isCorrent === true) {
                tmpCorrentArr.push(l)
            }
        }
    }

    //调整正确答案排序
    for (var m=0; m<indexArr.length; m++) {
        var nIndex = indexArr[m]
        correntArr[m] = tmpCorrentArr[nIndex]
    }

    var content = document.getElementById("content")

    content.style.position = "absolute"
    // var contentWidth = content.clientWidth
    var contentHeight = content.clientHeight

    content.style.top = (clientHeight - contentHeight) / 2 + "px"
    // content.style.left = (clientWidth - contentWidth) / 2 + "px"
    content.style.left = "0px"

    var background = document.getElementById("background")
    background.style.position = "absolute"
    background.style.height = clientHeight + "px"

    if (clientWidth >= 500) {
        background.style.width = 500 + "px"
        background.style.left = (clientWidth - 500) / 2 + "px"
        content.style.width = 500 - 20 + "px"

    }else {
        background.style.width = clientWidth + "px"
        content.style.width = clientWidth - 20 + "px"

    }
}


//刷新UI
function displayQAndA(objects, type) {

    if (index === indexArr.length) { //全部做完


        var correctCount = 0
        for (var i=0; i<selectArr.length; i++) {

            var select = selectArr[i]
            console.log("选择了" + select)
            var correct = correntArr[i]
            console.log("正确答案" + correct)
            if (select == correct) {
                correctCount += 1
            }
        }

        var score = correctCount / indexArr.length * 100
        console.log("得分" + score)
        console.log("正确数" + correctCount)
        localStorage.setItem("score", score)
        localStorage.setItem("name", "name")

        var selectlist = joinStringWithArr(selectArr)
        var indexlist = joinStringWithArr(indexArr)
        localStorage.setItem("selectArr",selectlist)
        localStorage.setItem("indexArr",indexlist)
        localStorage.setItem("jsonData",JSON.stringify(data))
        window.location.href = "score.html"
        return
    }

    //题目
    var question = document.getElementById("question")
    question.textContent = objects[indexArr[index]].question

    //题号
    document.getElementById("progress").textContent = (index + 1) + "/" + objects.length

    //清空当前选项
    var removeQuestions = document.getElementsByClassName("option")
    var content = document.getElementById("content")
    var qLength = removeQuestions.length
    for (var j=0; j<qLength; j++) {
        content.removeChild(removeQuestions[0])
    }

    //根据题类型 创建不同选项
    // if (type === "text") { // 文字选项

        for(var k=0; k<objects[indexArr[index]].options.length; k++) {
            var op = document.createElement("div")
            op.className = "answer answer_normal option"
            op.textContent = objects[indexArr[index]].options[k].title
            content.appendChild(op)

        }
    // }else { //图片选项

        // for(var l=0; l<objects[indexArr[index]].options.length; l++) {
        //     var op_img = document.createElement("div")
        //     op_img.className = "image_answer option"
        //     var op_img_img = document.createElement("img")
        //     op_img_img.src = "images/横图.jpg"
        //     op_img_img.className = "image_answer_img"
        //
        //     //获取图片原始大小
        //     var natureW = op_img_img.naturalWidth
        //     var natureH = op_img_img.naturalHeight
        //
        //     if (natureW > natureH) {
        //
        //         op_img_img.style.width = clientWidth - 24 + "px"
        //         op_img_img.style.height = "auto"
        //     }else {
        //
        //         op_img_img.style.width = (clientWidth - 100) / 2 + "px"
        //
        //     }
        //
        //     var op_img_span = document.createElement("span")
        //     op_img_span.className = "image_answer_text"
        //     op_img_span.textContent = "狗"
        //
        //     op_img.appendChild(op_img_img)
        //     op_img.appendChild(op_img_span)
        //
        //     content.appendChild(op_img)
        // }
    // }

    var btns = document.getElementsByClassName("option")
    for (var m=0; m<btns.length; m++) {
        btns[m].dataset.selectid = m
        btns[m].onclick = function () {
            index += 1
            this.className = "answer answer_error option"
            selectArr.push(this.dataset.selectid)

            setTimeout(function () {
                displayQAndA(objects)
            }, 100)
        }

    }


}

//生成随机数字数组
function randomSort(arr, newArr) {

    if(arr.length === 1) {
        newArr.push(arr[0]);
        return newArr;
    }
    var random = Math.ceil(Math.random() * arr.length) - 1;
    newArr.push(arr[random]);
    arr.splice(random,1);
    return randomSort(arr, newArr);
}

//拼接
function joinStringWithArr(arr) {
    // if (arr.length == 1) {return arr[0]}

    var newArrString = arr.reduce(function (p1, p2) {
        return p1 + "," + p2
    }, "")

    return newArrString

}




