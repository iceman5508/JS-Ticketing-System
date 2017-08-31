/**
 * Created by parker10 on 8/23/2017.
 */
/**
 * Created by parker10 on 8/8/2017.
 */
function slaGroup(date2) {
    var dif = getHoursBetween(getDate(),date2);
    if(dif >= 0 && dif <= 12)
    {
        return '0 - 12';
    }
    else
    if(dif >= 12 && dif <= 24)
    {
        return '12 - 24';
    }else  if(dif >= 24 && dif <= 48)
    {
        return '24 - 48';
    }else {
        return ' > 48';
    }
}

var dataSet = [
    [1, "8/8/2017", "Isaac Parker", "Software Bug", "Software Dev", "open", "8/8/2017", 'body', 'category', 'isaac@email.com','admin', [
        ['8/01/2017','Isaac Parker', 'Testing'],  ['8/02/2017','John Bacock', 'Testing the system 2']
    ], 'Isaac Parker', [ ['8/01/2017 - Ticket Created'] ], slaGroup("8/8/2017") ],
    [2, "8/8/2017", "Jacob Alberts", "Login", "Help Desk", "closed", "8/9/2017" , 'body', 'category', 'jacib@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ],  slaGroup("8/8/2017")],
    [ 3, "8/9/2017", "Joseph Barber", "Email", "Blazertech", "open", "8/8/2017" , 'body', 'category', 'joseph@email.com','admin' , [],
        '', [ ['8/01/2017 - Ticket Created'] ], slaGroup("8/9/2017")],
    [4, "8/8/2017", "Moses Cohen", "Finance", "Financial Aid", "closed", "8/8/2017" , 'body', 'category', 'moses@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ], slaGroup("8/8/2017")],
    [ 5, "8/8/2017", "Paul Darkins", "Direction", "Help Desk", "closed", "8/9/2017" , 'body', 'category', 'paul@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ],  slaGroup("8/8/2017")],
    [ 6, getDate(), "Peter Evens", "Church Help", "Blazertech", "open", getDate(), 'body', 'category', 'peter@email.com','admin', [],
        '', [ [getDate()+' - Ticket Created'] ],  slaGroup(getDate())],
    [7, "8/7/2017", "Daniel Finley", "Sonis Issue", "Software Dev", "closed", "8/8/2017" , 'body', 'category', 'daniel@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ],  slaGroup("8/7/2017")],
    [8, getDate(), "John Grady", "Ui Issues", "Software Dev", "open",getDate() , 'body', 'category', 'john@email.com','admin', [],
        '', [ [getDate()+' - Ticket Created'] ],  slaGroup(getDate())],
    [ 9, "8/9/2017", "James Homes", "Leadership", "Admin", "open", "8/8/2017" , 'body', 'category', 'james@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ],  slaGroup("8/9/2017")],
    [10, "8/8/2017", "Sarah Inez", "Birthing Ideas", "Help Desk", "closed", "8/9/2017" , 'body', 'category', 'sarah@email.com','admin', [],
        '', [ ['8/01/2017 - Ticket Created'] ],  slaGroup("8/8/2017")],
    [ 11, "8/8/2017", "Ember Johnes", "Sonis is FALLING!", "Software Dev", "open", "8/8/2017" , 'body', 'category', 'ember@email.com','admin', [],
        '', [ ['8/08/2017 - Ticket Created'] ],  slaGroup("8/8/2017")],
    [ 12, getDate(), "Ryan Kelly", "Money Money Money!", "Human Resources", "closed", getDate() , 'body', 'category', 'ryan@email.com','admin', [],
        '', [ [getDate()+' - Ticket Created'] ], slaGroup( getDate())]
];

var departments = [['Blazertech'], ['Software Dev'], ['Help Desk'], ['Financial Aid'], ['Shenanigans']];

var agents = [["unassigned", 'Mat', 'Job', 'Luke', 'Sally', 'Sarah'], ['unassigned', 'Andy', 'John', 'Danny', 'Isaac Parker', 'Amber', 'Jared'],
    ['unassigned', 'Joyce', 'Ryan', 'Easter', 'David', 'Saul'], ['unassigned', 'Caroline', 'Paul', 'Mary'],
    ['unassigned', 'judas' , 'Pontius ']];

var faq = [
    ['Find Billing Information','Visit myocu.ohiochristian.edu and click billing', 1],
    ['Class Room Location','Click Center, then go to classroom listing', 2],
    ['Refund Process','Check Refund List and read through the section that says Refund Process', 3],
    ['How do i log into sonis','Go to sonis.ohiochristian.edu, click on student or faculity.' +
    ' Then put in your username and password', 4]];


var categories = [['Billing','There is a issue or question related to billing',3],
['User Issues','Issue or question relates to student or staff experience',2],
['Refund','Issues or question relates to refunds for whatever reason.',3],
['Sonis issue','Questions deal with anything sonis related', 0]];