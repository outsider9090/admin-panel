jQuery(document).ready(function ($) {

    $('#submit_btn').click(function (e) {
        e.preventDefault();
        var input_date = $('#form1').find('input#inputDate').val();
        var input_time = $('#form1').find('input#inputTime').val();

        var get_time = input_date + ' ' + input_time;
        $('input[name=time]').val(toTimestamp(get_time));

        if (isNaN(toTimestamp(input_date))){
        var miladi = moment.from(fixNumbers(input_date), 'fa', 'YYYY/M/D').format('YYYY-M-D'); // 2013-8-25 16:40:00
        var get_time = miladi + ' ' + input_time;
        $('input[name=time]').val(toTimestamp(get_time));

        console.log(toTimestamp(get_time))
    }


    var name = $('#form1').find('input#inputName').val();
    var phone = $('#form1').find('input#inputPhone').val();
    var cmd = $('#form1').find('textarea#inputCmd').val();
    var time = $('#form1').find('input[name=time]').val();


        // form validation //
        if (phone.length == '11' && input_date != '' && input_time != '' && cmd != ''){
            $('#form1').find('span#inputPhoneErr').css('display', 'none');
            $('#form1').find('span#inputDateErr').css('display', 'none');
            $('#form1').find('span#inputTimeErr').css('display', 'none');
            $(this).find('i').addClass('fa-spin').css('display' , 'inline-block');
            $.ajax({
                //url: 'http://5.253.25.52:8080/api/v1/schedule/',
                url: 'http://xbot.sisoog.com:8080/api/v1/schedule/',
                headers:{
                    'Content-Type':'application/json'
                },
                method: 'post',
                dataType: 'json',
                data: JSON.stringify({'name': name , 'phone': phone , 'cmd': cmd , 'time': time }),
                success: function (data) {
                    console.log(data);
                    alert('اطلاعات با موفقیت ارسال شد.');
                }, error:function (err) {
                    console.log(err);
                    alert('خطا اطلاعات با موفقیت ارسال شد.');
                    $('#submit_btn').find('i').removeClass('fa-spin').css('display' , 'none');
                }, complete:function () {
                    console.log('finish')
                    $('#submit_btn').find('i').removeClass('fa-spin').css('display' , 'none');
                }
            });
        }else {
            alert('لطفا خطاهای موجود را تصحیح کنید!');
            if (phone.length != '11') {
                $('#form1').find('span#inputPhoneErr').css('display', 'block');
            }else {
                $('#form1').find('span#inputPhoneErr').css('display', 'none');
            }
            if (input_date == '') {
                $('#form1').find('span#inputDateErr').css('display', 'block');
            }else {
                $('#form1').find('span#inputDateErr').css('display', 'none');
            }
            if (input_time == '') {
                $('#form1').find('span#inputTimeErr').css('display', 'block');
            }else {
                $('#form1').find('span#inputTimeErr').css('display', 'none');
            }
            if (cmd == '') {
                $('#form1').find('span#inputCmdErr').css('display', 'block');
            }else {
                $('#form1').find('span#inputCmdErr').css('display', 'none');
            }
        }
        // form validation //

    });
});




var today = new Date();
var current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById('inputTime').defaultValue=current_time;

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}

var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
    if(typeof str === 'string')
    {
        for(var i=0; i<10; i++)
        {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
};



