/**
 * Created by parker10 on 8/23/2017.
 */
var sorted = false;
$(document).ready(function() {

    dt = $('#main-ticket').DataTable({
        data: dataSet,
        columns: [
            {title: "id", visible: false},
            {title: "Created Date"},
            {title: "Author"},
            {title: "Title"},
            {title: "Department"},
            {title: "Status"},
            {title: "Last Modified"},
            {title: "x", visible: false, searchable: false},
            {title: "x2", visible: false, searchable: false},
            {title: "x3", visible: false, searchable: false},
            {title: "x4", visible: false, searchable: false},
            {title: "x5", visible: false, searchable: false},
            {title: "assignedTo", visible: false, searchable: true},
            {title: "x7", visible: false, searchable: false},
            {title: "SLA", visible: false}
        ],
        columnDefs: [{
            targets: "_all",
            orderable: false
        }],
        "createdRow": function( row, data, dataIndex ) {
            var sla = data[14].replace('>', '').replace('- 12', '').replace('- 12', '').replace('- 48', '').trim();

           if (sla == 48) {
                $('td',row).addClass( 'overSla' );
            }
        },

        "scrollY": "400px",
        "scrollCollapse": true,
        "paging": false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": true,
        "bAutoWidth": false,
        select: true,
        "dom": '<"center"i>t<"clear">',,
        "order": [[0, "desc"]],

        initComplete: function () {
                this.api().columns([1,2,4,5,6]).every(function () {
                    var column = this;


                    var select = $('<select id="formfilter" class="filterdropdown center-text"><option value="">'
                        + $(column.header()).text() + '</option></select>')
                        .appendTo($(column.header()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
             }
        }).columns.adjust().draw();

    dt.on( 'click', 'tr', function () {
        row = dt.row( this ).data();
        rIndex = dt.row( this ).index();
        setTicket();
        $('#dialog-form').dialog('option', 'title',Ticket.title);
        openTicketView();
    } );

    dpt_dt =  $('#depts').DataTable({
        data: [],
        columns: [{ title: "Department Name" }],
        "iDisplayLength" : 4,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        select: true});
    dpt_dt.on( 'click', 'tr', function () {
        hideDataTable('depts');
        showDataTable('agns');
        agen_dt.clear();
        assignedDepartment = dpt_dt.row( this ).data();
        var agentsList = agents[departments.indexOf(dpt_dt.row( this ).data())];
        dpt_dt.clear();
        for (var i = 0; i < agentsList.length; i++) {
            agen_dt.row.add([agentsList[i]]);
        }
        agen_dt.columns.adjust().draw();
    });
    agen_dt =  $('#agns').DataTable({
        data: [],
        columns: [{ title: "Agent Name" }],
        "iDisplayLength" : 4,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        select: true
    });

    agen_dt.on( 'click', 'tr', function () {
        assignedAgent = agen_dt.row( this ).data();
    });

});

$('#searchFilter').keyup(function(){
    dt.search($(this).val()).draw() ;
});

$('#slaFilter').change(function(){
    var data = $(this).val();
    if(data == 'All') {data =''; sorted=false; }
    else{ sorted = true; }
    dt.search(data).draw();

});

$('#tkFilter').change(function(){
    var data = $(this).val();
    var num;
    if(data == 'Assigned To Me') { num=12; data=flags.name; }
    else if(data == 'Closed') { data = 'closed'; num=5; }
    else if(data == 'Open') { data = 'open'; num=5; }
    else { data = ''; num='x'; }
    if(!sorted) { sortColumn(num,data, true); }
    else {sortColumn(num,data, false);}


});

$('#newTik').click(function () {
    showElement('stage1');
    hideElement('stage2');
    hideElement('stage3');
    document.getElementById('make-title').value ='';
    document.getElementById('make-email').value='';
    document.getElementById('make-body').value='';
    currentCat='';
    document.getElementById('make-assign').checked = true;
    document.getElementById('make-close').checked = true;
    createView.dialog( "open" );
});

function sortColumn(columnNumber, data, reset) {
    if(columnNumber == 'x'){
        dt.columns().search(data).draw();
    }else{
        if(reset){
            dt.columns().search('').draw();
        }
        dt.columns(columnNumber).search(data).draw();
    }
}
