/**
 * Created by parker10 on 8/23/2017.
 */
const flags = {
    'id' : 123456,
    'dept' : 'blazertech',
    'name' : 'Isaac Parker'

};
var row;
var rIndex;
var dpt_dt;
var assignedAgent = 'unassigned';
var assignedDepartment = '';
const breakPoint = (environment.width/2)/10;
var currentCat;

$( function() {
    $( "#faq-accordion" ).accordion({
        heightStyle: "content"
    });
} );

$( function() {
    $( "#cat-accordion" ).accordion({
        heightStyle: "content"
    });
} );

faqToUi();
categoryToUi();

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
        this.history =[];
        this.activeTime = 0;
    }
    return Tickets;
}());

var Ticket = new Tickets(null,null,null,null,null,null,null,null,null,null,null);

function setTicket(){
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
    Ticket.history = row[13];
    Ticket.assigenedTo = dataSet[dataSet.indexOf(row)][12];
    Ticket.activeTime = getHoursBetween(getDate(), Ticket.createdDate);

    document.getElementById('notesBD').value = '';
    if(Ticket.status == 'closed'){
        showElement('reOpen');
        hideElement('selfAssignSpan');

    }else{
        hideElement('reOpen');
        showElement('selfAssignSpan');
        document.getElementById("selfAgent").checked = false;
    }

    document.getElementById('uname').innerHTML = Ticket.sonisId;
    document.getElementById('uemail').innerHTML = Ticket.authorEmail;
    document.getElementById('ucat').innerHTML = Ticket.category;
    document.getElementById('udept').innerHTML = Ticket.department;
    document.getElementById('uage').innerHTML = Ticket.assigenedTo;
    historyToUi();
    notesToUi();
}

function historyToUi() {
    var hisRef = document.getElementById('history').getElementsByTagName('ul')[1];
    hisRef.innerHTML = '';
    for( var i=0; i< Ticket.history.length; i++) {
                hisRef.innerHTML = hisRef.innerHTML+"<li><span>"+Ticket.history[i][0]+" </span></li>";
    }
}

function notesToUi() {
    var body = replaceAtEvery(Ticket.body, breakPoint);
    body = body.join('<br/>');
    var tableRef = document.getElementById('notesTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = '';
    tableRef.innerHTML = tableRef.innerHTML+"<tr><td >"+

        "<span>Date: "+Ticket.createdDate+" </span> <span>From: "+Ticket.sonisId+"" +
        "</span> </td> <td><span>"+body+"</span></td></tr>";
        for( var i=0; i< Ticket.notes.length; i++) {
            body = replaceAtEvery(Ticket.notes[i][2], breakPoint);
            body = body.join('<br/>');
            if(i%2 == 0) {

                tableRef.innerHTML = tableRef.innerHTML+"<tr class='pure-table-odd'><td>"+
                    "<span>Date: "+Ticket.notes[i][0]+" </span> <span>From: "+Ticket.notes[i][1]+"" +
                    "</span> </td> <td><span>"+body+"</span></td></tr>";
            }else {
                tableRef.innerHTML = tableRef.innerHTML+"<tr ><td >"+
                    "<span>Date: "+Ticket.notes[i][0]+" </span> <span>From: "+Ticket.notes[i][1]+"" +
                    "</span> </td> <td><span>"+body+"</span></td></tr>";
            }
    }
}

function faqToUi() {

    var catRef = document.getElementById('faq-accordion');
    for( var i=0; i< faq.length; i++) {

        catRef.innerHTML = catRef.innerHTML+"" +
            "<h3>"+faq[i][0]+"</h3>" +
            "<div><p>"+faq[i][1]+"</p>" +
            "<button class='pure-button-active' onclick='faqToCat()'>Select</button> " +
            "</div>";
    }
}

function faqToCat() {
    hideElement('stage1');
    showElement('stage2');
}

function catToNewTicket(category) {
    hideElement('stage2');
    showElement('stage3');
    currentCat = category;
}

function categoryToUi() {
    var catRef = document.getElementById('cat-accordion');
    for( var i=0; i< categories.length; i++) {
        catRef.innerHTML = catRef.innerHTML+"" +
            "<h3>"+categories[i][0]+"</h3>" +
            "<div><p>"
            +categories[i][1]+"</p><button class='center pure-button-active' " +
            "onclick='catToNewTicket([categories["+i+"][0], departments[categories["+i+"][2]][0] ])'>" +
            "Select</button> " +
            "</div>";
    }
}

/********************************************************************************************************************/

var dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    minWidth: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: '',

    buttons: {

        'Assign Ticket':toAssign,
        'Close Ticket': closeTicket,
        'Delete Ticket': deleteTicket,
        'Submit Note': addNote
    }
});

var createView = $( "#createModal" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    minWidth: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: 'New Ticket',

    buttons: {

        'Create':createTicket,
        'Cancel': function () {
            document.getElementById('make-title').value ='';
            document.getElementById('make-email').value='';
            document.getElementById('make-body').value='';
            currentCat='';
            createView.dialog('close');
        }
    }
});


var assignView = $( "#assign" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    width: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: '',
    buttons: {
        'reset' : resetAssign,
        'Assign' : assignAgent,
        'To Ticket': function() {
            resetAssign();
            assignView.dialog( "close" );
            dialog.dialog( "open" );
        }
    }
});


function openTicketView(){
    dialog.dialog( "open" );
}

function closeTicketView(){
    dialog.dialog( "close" );
}
/********************************************Ticket Actions***********************************************************/
function selfAssign() {
    if (document.getElementById('selfAgent').checked && Ticket.status === 'open') {
        ticketService.selfAssign(row, flags.name);
        Ticket.assigenedTo = dataSet[dataSet.indexOf(row)][12];
        Ticket.history = dataSet[dataSet.indexOf(row)][13];
        document.getElementById('uage').innerHTML = Ticket.assigenedTo;
        historyToUi();
        var objDiv = document.getElementById("historyList");
        objDiv.scrollTop = objDiv.scrollHeight;
        dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
    }
}

function addNote() {
    var preProcessData = document.getElementById("notesBD").value;
    if (preProcessData.trim().length > 0 && Ticket.status === 'open') {
        var data = [getDate(), flags.name, preProcessData];
        ticketService.addNote(row, data);
        Ticket.notes = dataSet[dataSet.indexOf(row)][11];
        document.getElementById("notesBD").value = "";
        notesToUi();
        var objDiv = document.getElementById("notesPan");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}
    
    function closeTicket() {
        if (Ticket.status === 'open') {
            ticketService.closeTicket(row);
            dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
            Ticket.status = 'closed';
            Ticket.closedDate = dataSet[dataSet.indexOf(row)][6];
            Ticket.closedBy = dataSet[dataSet.indexOf(row)][10];
            Ticket.history = dataSet[dataSet.indexOf(row)][13];
            historyToUi();
            var objDiv = document.getElementById("historyList");
            objDiv.scrollTop = objDiv.scrollHeight;
            hideElement('selfAssignSpan');
            showElement('reOpen');


        }
    }


function reOpenTicket() {
    if (Ticket.status === 'closed') {
        ticketService.reOpenTicket(row);
        dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
        Ticket.status = 'open';
        Ticket.closedDate = dataSet[dataSet.indexOf(row)][6];
        Ticket.closedBy = dataSet[dataSet.indexOf(row)][10];
        Ticket.history = dataSet[dataSet.indexOf(row)][13];
        historyToUi();
        var objDiv = document.getElementById("historyList");
        objDiv.scrollTop = objDiv.scrollHeight;
        hideElement('reOpen');
        showElement('selfAssignSpan');
    }
}

function deleteTicket() {
    ticketService.deleteTicket(row);
    dt.row(rIndex).remove().draw();
    dialog.dialog( "close" );
}


function assignAgent() {
    if(assignedAgent.length>0 && assignedDepartment.length>0 && Ticket.status === 'open') {
        ticketService.assignAgent(row,assignedDepartment,assignedAgent);
        Ticket.department = dataSet[dataSet.indexOf(row)][4];
        Ticket.assigenedTo = dataSet[dataSet.indexOf(row)][12];
        document.getElementById('udept').innerHTML = Ticket.department;
        document.getElementById('uage').innerHTML = Ticket.assigenedTo;
        resetAssign();
        assignView.dialog( "close" );
        dialog.dialog( "open" );
        historyToUi();
        var objDiv = document.getElementById("historyList");
        objDiv.scrollTop = objDiv.scrollHeight;
        dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
    }

}

function resetAssign() {
    hideDataTable('agns');
    agen_dt.clear();
    showDataTable('depts');
    dpt_dt.clear();
    dpt_dt.rows.add(departments);
    dpt_dt.columns.adjust().draw();
    assignedDepartment = '';
    assignedAgent='unassigned';
}

function toAssign() {
    if(Ticket.status === 'open') {
    if(assignedDepartment.length>0){
        resetAssign();
    }
    dialog.dialog( "close" );
    $('#assign').dialog('option', 'title',Ticket.title+" Assignment");
    assignView.dialog("open");
    dpt_dt.clear();
    dpt_dt.rows.add(departments);
    dpt_dt.columns.adjust().draw();
    hideDataTable('agns');}
}

function createTicket() {
    var title = document.getElementById('make-title').value;
    var email = document.getElementById('make-email').value;
    var content = document.getElementById('make-body').value;
    var assign = document.getElementById('make-assign').checked;
    var close = document.getElementById('make-close').checked;

    if(title.trim().length > 0 && email.trim().length>0 && content.trim().length>0 && currentCat.length>0){
        ticketService.createTicket(title,email,content,close,currentCat[0],currentCat[1],assign);
        dt.row.add(dataSet[dataSet.length-1]);
        dt.columns.adjust().draw();
        document.getElementById('make-title').value ='';
        document.getElementById('make-email').value='';
        document.getElementById('make-body').value='';
        currentCat='';
        createView.dialog('close');
    }

}