$(document).ready(function(){

    $keypressNumberCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    $keypressBack       = 8;
    $mysteryNumber      = new Array();
    $formNumbersGuest   = new Array();
    $straightStatus     = 0;
    $boldStatus         = 0;
    $hystoryGuest       = new Array();
    $formNumbersCount   = $('#formNumberLength');

    // When Submit Button Clicked
    $('#submitOn').on('click', function(){

        // Generate input form numbers
        for ( var a = 0 ; a < $formNumbersCount.val() ; a++) {
            $appendElement = '<input readonly id="formNumbers-' + a + '" type="text" class="form-control form-control-sm text-center inputSB" maxlength="1">';
            $('#gameInput .col-10').append($appendElement);
            
        }

        // Generate mystery numbers
        while ($mysteryNumber.length < $formNumbersCount.val()) {

            // Random number from 0 - 9
            var randomNumber = Math.floor(Math.random() * 10);

            // If there is not same number
            if ($.inArray(randomNumber, $mysteryNumber) == -1) {

                $mysteryNumber.push(randomNumber);

            } 

        }

        // Disabled dropDown and submit button
        $(this).attr('disabled', true);
        $($formNumbersCount).attr('disabled', true);

        // undisabled reset Buttons
        $('#giveUp').attr('disabled', false);

        // Focus on first input element
        $('[id^="formNumbers-"]').first().attr('readonly', false).focus();
        
        console.log($mysteryNumber);

    })

    $(document).on('keyup', 'input[id^="formNumbers-"]:focus', function(event) {

        $nextInput      = $(this).next();
        $nextInputAll   = $(this).nextAll();
        $prevInput      = $(this).prev();
        $thisVal        = $(this).val();
        $thisInArray    = $.inArray($thisVal, $formNumbersGuest);
        
        if ($.inArray(event.which, $keypressNumberCode) != -1) {

            $inputNumber = parseInt(event.originalEvent.key);
            // console.log($inputNumber);

            if ($.inArray($inputNumber, $formNumbersGuest) != -1) {

                // $(this).val('');
                console.log('Sudah ada');
                return false;

            } 
            
            else if ($.inArray($inputNumber, $formNumbersGuest) == -1) {

                $(this).attr('readonly', true);    
                $nextInput.attr('readonly', false).focus();
                console.log('tidak ada');
                $formNumbersGuest.push($inputNumber);
                console.log($formNumbersGuest);
                // if ($nextInputAll.length != 0) {

                //     $formNumbersGuest.push(parseInt(event.originalEvent.key));
                //     $(this).attr('readonly', true);    
                //     $nextInput.attr('readonly', false).focus();

                // } 
                
                // else if ($nextInputAll.length == 0) {
    
                //     $(this).attr('readonly', true).blur();
                //     $formNumbersGuest.push(parseInt(event.originalEvent.key));
                //     $('input').val('');
                //     $('[id^="formNumbers-"]').first().attr('readonly', false).focus();
                //     console.log($formNumbersGuest);
                //     $.each($formNumbersGuest, function(i, item) {
                //         if ($.inArray(item, $mysteryNumber) != -1) {

                //             if ($.inArray(item, $formNumbersGuest)  == $.inArray(item, $mysteryNumber ) ) {

                //                 $straightStatus = $straightStatus + 1;

                //             } 
                            
                //             else {

                //                 $boldStatus = $boldStatus + 1;
                            
                //             }

                //         }
                //     })

                //     if ($straightStatus < $formNumbersCount.val()) {

                //         $('#gameStatus .col-5').eq(0).append(
                //             '<ul class="list-inline mb-2">' +
                //                 '<li class="list-inline-item">' + $formNumbersGuest.join(' ') + '</li>' +
                //                 '<li class="list-inline-item">|</li>' +
                //                 '<li class="list-inline-item">' + $straightStatus + ' Straight ' + $boldStatus + ' Bold</li>' +
                //             '</ul>');
                //         $formNumbersGuest = [];
                //         $straightStatus   = 0;
                //         $boldStatus       = 0;

                //     }
                    
                //     else {

                //         alert('YOU WIN !')

                //     }
    
                // }

            }

        } else if (event.which == $keypressBack) {

            if ($prevInput.length > 0) {

                $(this).attr('readonly', true);
                $prevInput.attr('readonly', false).val('').focus();
                $formNumbersGuest.pop();

            } 

        } else {

            $(this).val('');

        }
    });

    $('#giveUp').on('click', function(){

        $('#gameInput .col-10').eq(0).empty();
        $('#gameStatus .col-5').empty();
        $(this).attr('disabled', true);
        $('#submitOn').attr('disabled', false);
        $('#formNumberLength').attr('disabled', false);
        $mysteryNumber    = [];
        $formNumbersGuest = [];
        $straightStatus   = 0;
        $boldStatus       = 0;

    });

})