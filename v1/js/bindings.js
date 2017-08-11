/**
 * Created by parker10 on 8/8/2017.
 */
var dt;
var notes_dt;
var dpt_dt;
var agen_dt;
var Ticket;
var row;
var rIndex;
var assignedAgent = 'unassigned';
var assignedDepartment = '';
var noteAdded=false;

/*****not needed but cool effect*****/
var bgColor='';
var textColor='';
var tag='';
/***********************************/

/******project specific functions****/
function changeToSuccessColor(tagName, color, txtColor){
    tag = tagName;
    bgColor = getBackgroundColor(tagName);
    textColor = getTextColor(tagName);
    changeBackgroundColor(tag, color);
    changeTextColor(tag, txtColor);
}

function changeToNormal() {
  changeBackgroundColor(tag,bgColor);
  changeTextColor(tag,textColor);
    bgColor='';
    textColor='';
    tag='';
}

/************************************/

var Tickets = (function () {
    function Tickets(id, datecreated, sonis, title, department, status, dateclosed, body, category, email, closedby ) {
        this.notes = [];
        this.assigenedTo = 'unassigned',
        this.id = id;
        this.sonisId = sonis;
        this.category = category;
        this.department = department;
        this.title = title;
        this.createdDate = datecreated;
        this.authorEmail = email;
        this.status = status;
        this.closedDate = dateclosed;
        this.closedBy = closedby;
        this.body = body;
    }
    return Tickets;
}());

$(document).ready(function() {
    Ticket = new Tickets(null,null,null,null,null,null,null,null,null,null,null);
});

function setTicket(){
    currentRow = row;
    Ticket.notes = row[11]
    Ticket.id = row[0];
    Ticket.sonisId = row[2];
    Ticket.category = row[8];
    Ticket.department = row[4];
    Ticket.title = row[3];
    Ticket.createdDate = row[1];
    Ticket.authorEmail = row[9];
    Ticket.status = row[5];
    Ticket.closedDate = row[6];
    Ticket.closedBy = row[10];
    Ticket.body = row[7];

    document.getElementById('tk-author').innerHTML = Ticket.sonisId+" ("+Ticket.authorEmail+")<br>" +
        " On:"+Ticket.createdDate;
    if(Ticket.status === 'closed') {
        document.getElementById('tk-status').innerHTML = Ticket.status+" ("+Ticket.closedDate+") " +
            "<br>ClosedBy"+"("+Ticket.closedBy+") ";
    }else {document.getElementById('tk-status').innerHTML = Ticket.status;}
    document.getElementById('tk-ctgy').innerHTML = Ticket.category;
    document.getElementById('tk-dept').innerHTML = Ticket.department+"<br>("+Ticket.assigenedTo+")";
    document.getElementById('tk-body').innerHTML = Ticket.body;
}