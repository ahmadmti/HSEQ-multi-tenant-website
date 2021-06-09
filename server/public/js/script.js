jQuery(function ($) {


    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });




});




$(function () {

    var email_receiver_user = [];



    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();

        var controlForm = $('.controls .form-array:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<i class="fa fa-minus"></i>');
    }).on('click', '.btn-remove', function (e) {
        $(this).parents('.entry:first').remove();

        e.preventDefault();
        return false;
    });

    $('#city').on('change', function (e) {

        $.ajax({
            url: 'get-zip-codes',
            method: 'POST',
            data: { cityId: e.target.value },
            success: function (data) {
                $('#zipCode').attr('disabled', false);
                // $('#zipCode option').remove();

                // $('#zipCode ').append(`<option value="">{{trans 'select'}}</option>`);
                $('#zipCode').html('');
                data.zipCodes.forEach(item => {
                    $('#zipCode').append(`<option  value="${item.zip_code}">${item.zip_code}</option>`)
                });
                $('#zipCode').selectpicker('refresh');
            }
        })
    });


    $('#zipCode').on('change', function (e) {

        $.ajax({
            url: 'get-street-address',
            method: 'POST',
            data: { zipCode: e.target.value },
            success: function (data) {
                $('#street_address_id').attr('disabled', false);
                $('#street_address_id option').remove();
                // $('#street_address_id ').append('<option value="">Select Street</option>');
                $('#street_address_id').html('');
                data.streetAddress.forEach(item => {
                    $('#street_address_id').append(`<option value="${item.street_address_id}">${item.street_name}</option>`)

                });
                $('#street_address_id').selectpicker('refresh');


            }
        })
    });

    // $('.activate-opt').on('click', function () {
    //     let id = $(this).attr('id');
    //     status = $(this).attr('data-prop');
    //     $.ajax({
    //         url: 'company-activiation',
    //         method: 'POST',
    //         data: { id, status },
    //         success: function (data) {
    //             alert('fds');

    //         }
    //     })
    // })

    $('#InputName').on('blur', function (e) {
        if (e.target.value != null && e.target.value != '') {

            $.ajax({
                url: 'check-name',
                method: 'POST',
                data: { name: e.target.value },
                success: function (data) {
                    if (data.status) {
                        $('#submit').attr('disabled', true);
                        $('#message').html(`
                     <div class="alert alert-danger" role="alert">
                    ${data.message}
                    </div>
                `);
                    } else {
                        $('#submit').attr('disabled', false);

                        $('#message').html(`
                     <div class="alert alert-success" role="alert">
                        ${data.message}
                    </div>
                `);
                    }

                }
            })

        }

    })

    function btnManger() {

        if (($('#subject').val() != '' && CKEDITOR.instances.email_content.getData() != '') && ($('#allUsers').prop('checked') || email_receiver_user.length > 0)) {
            $('#submit-email').attr('disabled', false);
        } else {
            $('#submit-email').attr('disabled', true);
        }
    }

    function notibtnManger() {

        if ($('#type').val() && ($('#notification_title').val() != '' && CKEDITOR.instances.notification_desc.getData() != '') && ($('#allCompany').prop('checked') || $('.company_array:checked').val())) {
            $('#submit-notification').attr('disabled', false);
        } else {
            $('#submit-notification').attr('disabled', true);
        }
    }

    $('#subject').on('blur', function (e) {
        btnManger();
    })

    $('#register_form').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                console.log(response);
            }
        });
        return false;
    });



    $('.user_array').on('change', function (e) {
        btnManger();
    })

    $('#email_content').on('blur', function (e) {
        btnManger();
    })
    $('#allUsers').on('change', function (e) {
        btnManger();
    })



    $(document).on('change', '.selection-box input:checkbox', function () {
        var value = $(this).val();
        if (this.checked) {
            email_receiver_user.push(value);
            btnManger();
        } else {
            email_receiver_user.pop(value);
            btnManger();
        }
    });


    $('#email-send-form-calls').on('submit', function (event) {

        event.preventDefault(); // Prevent the form from submitting via the browser
        var form = $(this);

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: {
                'subject': $('#subject').val(),
                'email_content': CKEDITOR.instances.email_content.getData(),
                'allUsers': $('#allUsers').is(':checked'),
                'users': email_receiver_user,
            },
            success: function (data) {
                form[0].reset();
                $('#email-template').val('')
                $('.message .alert').text(data.message);
                $('.message .alert').removeClass('alert-danger');
                $('.message .alert').addClass('alert-success');
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                CKEDITOR.instances.email_content.setData('')
            },
            error: function (error) {
                $('.message .alert').text(error.data.error);
                $('.message .alert').addClass('alert-danger');
                $('.message .alert').removeClass('alert-success');
            }
        });
        return false;
    });



    $('#notification_title').on('blur', function (e) {
        notibtnManger();
    })
    $('#allCompany').on('change', function (e) {
        notibtnManger();
    })
    $('#notification_desc').on('blur', function (e) {
        notibtnManger();
    })
    $('.company_array').on('change', function (e) {
        notibtnManger();
    });

    $('#type').on('change', function (e) {
        notibtnManger();
    })

    $('#restaurant_name').on('blur', function (e) {
        let value = ((e.target.value.toLowerCase().trim()).replace(/\s/g, ''));
        $('#domain').val(value);
        domainChecker(value);
    })
    function domainChecker(value) {
        const re = /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/;
        if (re.test(value)) {
            if (value) {
                $.ajax({
                    url: 'check-domain',
                    method: 'POST',
                    data: { domain: value.toLowerCase() },
                    success: function (data) {
                        if (data.status) {
                            $('#submit_rest').attr('disabled', true);
                            $('#message_domain').text(data.message);
                            $('#message_domain').removeClass('text-success');
                            $('#message_domain').addClass('text-danger');
                            $('#message_domain').css('font-weight', 'bold');
                            $('#domain').css('border', '2px solid red');
                            $('#available_name').html('');
                            data.domain.forEach(function (item) {
                                $('#available_name').append(`
                            <span class="domain_guess text-success">${item.domain}</span>
                            `);
                            })


                        } else {
                            $('#available_name').html('');
                            $('#submit_rest').attr('disabled', false);
                            $('#domain').css('border', '1px solid green')
                            $('#message_domain').text(data.message);
                            $('#message_domain').removeClass('text-danger');
                            $('#message_domain').addClass('text-success');
                            $('#message_domain').css('font-weight', 'bold');
                        }
                    }
                })
            }
        } else {
            $('#submit_rest').attr('disabled', true);
            $('#message_domain').text(`Sub Domain is Not Valid`);
            $('#message_domain').removeClass('text-success');
            $('#message_domain').addClass('text-danger');
            $('#message_domain').css('font-weight', 'bold');
            $('#domain').css('border', '2px solid red');
            $('#available_name').html('');
        }
    }

    $(document).on('click', '.domain_guess', function (e) {
        var text = $(this).text();
        $('#domain').val(text);
        domainChecker(text);

    })

    $(document).on('blur', '#domain', function (e) {

        domainChecker(e.target.value);

    });

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        console.log(result);

        return result.toISOString().slice(0, 10);
    }
    $('.exp-btn').on('click', function () {
        $('#extendModal').modal('show');
        let id = $(this).attr('id');
        $('#form_id').val(id);
        $('input[name=date]').val(addDays(new Date($(this).attr('data-exp')).toISOString().slice(0, 10), 1));
    })

    $('#email-template').on('change', function () {

        let id = $(this).val();

        $.ajax({
            url: '/v1/admin/get-template',
            method: 'post',
            data: { id },
            success: function (data) {
                $('#subject').val(data.template.email_subject);

                // CKEDITOR.replace('email_content');
                CKEDITOR.instances.email_content.setData(data.template.email_description);
                btnManger();
            },
            error: function (err) {
                alert('Error in Templates')
            }
        })


    })

});
