/**
 * Created by parker10 on 8/9/2017.
 */
var environment =  {
    width : window.innerWidth || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth,

    height : window.innerHeight|| document.documentElement.clientHeight
    || document.getElementsByTagName('body')[0].clientHeight
}

function getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){dd = '0'+dd}
    if(mm<10){mm = '0'+mm}
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}



function getHoursBetween(date1, date2){
    return Math.abs(new Date(date1) - new Date(date2)) / 36e5;
}

function toggleElement(elementId) {
    var x = document.getElementById(elementId);
    if (x.style.display === 'none') {x.style.display = 'block';}
    else {x.style.display = 'none';}
}

function showElement(elementId) {
    var x = document.getElementById(elementId);
    x.style.display = 'block';

}

function replaceAtEvery(input, lineSize, lineArray) {
    lineArray = lineArray || [];
    if (input.length <= lineSize) {
        lineArray.push(input);
        return lineArray;
    }
    lineArray.push(input.substring(0, lineSize));
    var tail = input.substring(lineSize);
    return replaceAtEvery(tail, lineSize, lineArray);
}

function hideElement(elementId) {
    var x = document.getElementById(elementId);
     x.style.display = 'none';
}


function hideDataTable(elementId){$('#'+elementId).parents('div.dataTables_wrapper').first().hide();}
function showDataTable(elementId){$('#'+elementId).parents('div.dataTables_wrapper').first().show();}
function changeBackgroundColor(tagName, bgColor) {document.getElementById(tagName).style.backgroundColor = bgColor;}
function changeTextColor(tagName, txtColor)  {document.getElementById(tagName).style.color = txtColor;}
function getBackgroundColor(tagName){ return document.getElementById(tagName).style.backgroundColor; }
function getTextColor(tagName){ return document.getElementById(tagName).style.color; }