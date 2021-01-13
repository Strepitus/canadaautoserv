var month_1_text  = 'January';
var month_2_text  = 'February';
var month_3_text  = 'March';
var month_4_text  = 'April';
var month_5_text  = 'May';
var month_6_text  = 'June';
var month_7_text  = 'July';
var month_8_text  = 'August';
var month_9_text  = 'September';
var month_10_text = 'October';
var month_11_text = 'November';
var month_12_text = 'December';

function initConstants (month1, month2, month3, month4,
			month5, month6, month7, month8,
			month9, month10, month11, month12) {
    month_1_text  = month1;
    month_2_text  = month2;
    month_3_text  = month3;
    month_4_text  = month4;
    month_5_text  = month5;
    month_6_text  = month6;
    month_7_text  = month7;
    month_8_text  = month8;
    month_9_text  = month9;
    month_10_text = month10;
    month_11_text = month11;
    month_12_text = month12;
}


function printFromToDate (year, month, day, from_year, from_month, from_date, to_year, to_month, to_date)
{
    var d;
    var from_out;
    var to_out;
    var first_load;

    if (year && month && day) {
        d = new Date(year, month, day);
    } else {
        d = new Date();
    }

    if (!from_year && !from_month && !from_date &&
        !to_year   && !to_month   && !to_date) {
	first_load = 1;
    }

    var y = d.getFullYear();
  
    from_month                  = (from_month) ? from_month + 1 : d.getMonth();
    to_month                    = (to_month)   ? to_month       : d.getMonth();
    if (!from_date)  from_date  = d.getDate();
    if (!to_date)    to_date    = d.getDate();
    if (!from_year)  from_year  = y;
    if (!to_year)    to_year    = y;

    if (from_month == 0 && first_load == 1) {
       from_month = 11;
       from_year  = from_year  - 1;
    } else {
       from_month = from_month - 1;
    }

    from_out   = list_months ('from_month', from_month);
    to_out     = list_months ('to_month', to_month);
    from_date  = list_dates ('from_date', from_date, from_month, from_year);
    to_date    = list_dates ('to_date', to_date, to_month, to_year);
    from_year  = list_years ('from_year', from_year, y);
    to_year    = list_years ('to_year', to_year, y);

    document.getElementById('from_time').innerHTML 
         = from_out + '&nbsp;' + from_date + '&nbsp;' + from_year;
    document.getElementById('to_time').innerHTML 
         = to_out   + '&nbsp;' + to_date   + '&nbsp;' + to_year;
}

function list_months (name, selected_month)
{
    var list;
    var i;
    var selected = '';
    var months = new Array ('January', 'February', 'March', 'April', 
                            'May', 'June', 'July', 'August', 'September', 
                            'October', 'November', 'December');
    var months = new Array (month_1_text, month_2_text, month_3_text, month_4_text,
			    month_5_text, month_6_text, month_7_text, month_8_text,
			    month_9_text, month_10_text, month_11_text, month_12_text);
    
    list  = '<select name=' + name;
    list += ' size=1 class=SButton onchange=changeFromToDate(this.form)>\n';
    for (i = 0; i < 12; i++) {
	selected = (i == selected_month) ? ' selected' : '';
        list += '<option value=' + i + selected + '>' + months[i] + '</option>\n';
    } 
    list += '</select>\n';

    return list;
}

function list_dates (name, selected_day, month, year)
{  
    var list;
    var i;
    var j;
    var selected = '';

    list  = '<select name=' + name;
    list += ' size=1 class=SButton onchange=changeFromToDate(this.form)>';
    for (i = 0; i < 31; i++) {
        j = i + 1;
	selected = (j == selected_day) ? ' selected' : '';
        list += '<option value=' + j + selected + '>' + j + '</option>';
    }
    list += '</select>';
    
    return list;
}

function list_years (name, selected_year, this_year)
{
    var i;
    var selected = '';
    var list;
    var d = new Date();
    var y = d.getYear();

    list  = '<select name=' + name;
    list += ' size=1 class=SButton onchange=changeFromToDate(this.form)>';
    for (i = selected_year - 8; i <= this_year; i++) {
	selected = (i == selected_year) ? ' selected' : '';
        list += '<option value=' + i + selected + '>' + i + '</option>';
    }

    list += '</select>';

    return list;
}

function changeFromToDate(form)
{
    var fromYear = form.from_year.value;
    var toYear   = form.to_year.value;

    if (!fromYear) {
        var d = new Date();
        fromYear = d.getYear();
    }
    
    if (!toYear) {
        var d = new Date();
        toYear = d.getYear();
    }

    var daysInMonthFrom  = new Array(31, ((fromYear % 4 == 0 && fromYear % 100 != 0) || fromYear % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var daysInMonthTo = new Array(31, ((toYear % 4 == 0 && toYear % 100 != 0) || toYear % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    if (form.from_date.value > daysInMonthFrom[form.from_month.value]) {
        form.from_date.value = daysInMonthFrom[form.from_month.value];
    }

    if (form.to_date.value > daysInMonthTo[form.to_month.value]) {
        form.to_date.value = daysInMonthTo[form.to_month.value];
    }

    return;
}

function validateFromToDate(form)
{
    var fromYearString;
    var fromMonthString;
    var fromDateString;
    var fromString;
    var toYearString;
    var toMonthString;
    var toDateString;
    var toString;

    fromYearString  = form.from_year.value.toString();
    fromMonthString = form.from_month.value.toString();
    fromDateString  = form.from_date.value.toString();
    toYearString    = form.to_year.value.toString();
    toMonthString   = form.to_month.value.toString();
    toDateString    = form.to_date.value.toString();

    if (fromMonthString.length < 2) {
        fromMonthString = "0" + fromMonthString;
    }

    if (fromDateString.length < 2) {
        fromDateString = "0" + fromDateString;
    }
    if (toMonthString.length < 2) {
        toMonthString = "0" + toMonthString;
    }
    if (toDateString.length < 2) {
        toDateString = "0" + toDateString;
    }
    
    fromString = fromYearString + fromMonthString + fromDateString;
    toString   = toYearString + toMonthString + toDateString;

    if (fromString >= toString) {
        alert ("From date should be ealier than the to date");
        return false;
    }

    form.submit();
}

function pageSwitch (form, application)
{
    var loc;
    var hiddens = '';
    var i;
    var form_type;

    for (i = 0; i < form.elements.length; i++) {
	form_type = new String(form.elements[i].type);
	form_type.toLowerCase();
        if (form_type == 'hidden') {
	     hiddens += '&' + form.elements[i].name + '=' + form.elements[i].value;
        }
    }
    
    loc = application + '?records_perpage='
          +form.records_perpage.value+'&from_year='
          +form.from_year.value+'&from_month='
          +form.from_month.value+'&from_date='
          +form.from_date.value+'&to_year='
          +form.to_year.value+'&to_month='
          +form.to_month.value+'&to_date='
          +form.to_date.value+'&current_page='
          +form.current_page.value
          +hiddens;

    window.location = loc;
}




