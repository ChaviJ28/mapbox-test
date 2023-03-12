"use strict";

/**
 * sends ajax requests to the server
 * @param  {[json]} params
 * Parameters:
 *     method: string - values: 'POST' or 'GET' - takes 'POST' by default
 *     container: string - the html id of a container
 *     show_success_message: boolean - values: true or false - when the ajax request returns a success message, whether to display the success message or not - takes true by default
 *     show_error_message: boolean - values: true or false - when the ajax request returns an error, whether to display the error or not - takes true by default
 *     show_success_message_in_alert: boolean - values true or false - when the ajax request returns a success messages, whether to show the success message in an alert or in the container param - takes true by default
 *     show_error_in_alert: boolean - values true or false - when the ajax request returns an error, whether to show the error in an alert or in the container param - takes true by default
 *     success_callback_function: function - the success callback function to be called when the ajax request returns a success message - can be null
 *     error_callback_function: function - the error callback function to be called when the ajax request returns an error - can be null
 */
function ajaxLoad(params) {
    var getPost = "POST";
    params.requireJson = true;

    if (params.method) {
        getPost = params.method;
    }

    if (params.container) {
        $("#" + params.container).html("<div style='width: 100%;text-align: center;'><img src='/images/loading-icon.gif' /></div>");
    }

    if (typeof params.show_error_message === "undefined") {
        params.show_error_message = true;
    }

    if (typeof params.show_success_message === "undefined") {
        params.show_success_message = true;
    }

    if (typeof params.show_success_message_in_alert === "undefined") {
        params.show_success_message_in_alert = true;
    }

    if (typeof params.show_error_in_alert === "undefined") {
        params.show_error_in_alert = true;
    }

    if (params._csrf) { } else {
        params._csrf = $("#_csrf").val();
    }

    $.ajax({
        url: params.url,
        data: params.data,
        type: getPost,
        beforeSend: function (request) {
            return request.setRequestHeader('X-CSRF-Token', params._csrf);
        },
        success: function (data) {

            /*if (params.container) {
                $("#" + params.container).html(data);
 
                if (params.success_callback_function) {
                    params.success_callback_function(data);
                }
            }*/

            if (params.container) {
                $("#" + params.container).html("");
            }

            if (data.error) {
                if (params.show_error_message) {
                    if (params.show_error_in_alert) {
                        if (data.error.length == 1) {
                            displayErrorAlert(displayErrorFromArray(data.error));
                        } else {
                            displayErrorAlert(displayErrorFromArray(data.error));
                        }
                    } else {
                        var errorElement = displayErrorFromArray(data.error);
                        $("#" + params.container).html(errorElement);
                    }
                }

                if (params.error_callback_function) {
                    params.error_callback_function(data);
                }
            } else if (data.success_message) {

                if (params.show_success_message) {
                    if (params.show_success_message_in_alert) {
                        displaySuccessAlert(data.success_message);
                    } else {
                        var successMessage = "<div class='alert alert-success'>" + data.success_message + "</div>";
                        $("#" + params.container).html(successMessage);
                    }
                }

                if (params.success_callback_function) {
                    params.success_callback_function(data);
                }
            }
        },
        error: function (data) {
            if (params.show_error_message) {
                if (params.show_error_in_alert) {
                    if (data.error) {
                        displayErrorAlert(displayErrorFromArray(data.error));
                        $("#" + params.container).html("");
                    } else {
                        displayErrorAlert(data.responseText);
                        $("#" + params.container).html("");
                    }
                } else {
                    var errorElement = displayErrorFromArray(data.error);
                    $("#" + params.container).html(errorElement);
                }
            }

            if (params.error_callback_function) {
                params.error_callback_function(data);
            }
        }
    });
}

function displayErrorFromArray(error) {
    var errorElement = "<div class='alert alert-danger'>";

    if (error) {
        if (error.length > 0) {
            if (error.length == 1) {
                // errorElement += locale.common.error + ":";

                if (error[0].message) {
                    if (Array.isArray(error[0].message)) {
                        if (error[0].message.length == 1) {
                            errorElement += "<div>" + error[0].message[0] + "</div>";
                        } else {
                            errorElement += "<div>" + error[0].message[1] + "</div>";
                        }

                    } else {
                        errorElement += "<div>" + error[0].message + "</div>";
                    }
                } else {
                    errorElement += "<div>" + error[0] + "</div>";
                }

            } else {
                errorElement += locale.common.error_s + ":";
                errorElement += "<ul>";

                for (var i = 0; i < error.length; i++) {

                    if (error[i].message) {
                        if (Array.isArray(error[i].message)) {
                            if (error[i].message.length == 2) {
                                errorElement += "<li>" + error[i].message[1] + "</li>";
                            } else {
                                errorElement += "<li>" + error[i].message[0] + "</li>";
                            }
                        } else {
                            errorElement += "<li>" + error[i].message + "</li>";
                        }
                    } else {
                        errorElement += "<li>" + error[i] + "</li>";
                    }
                }

                errorElement += "</ul>";
            }
        } else {
            errorElement += "<div>" + locale.common.general_error + "</div>";
        }

    } else {
        errorElement += "<div>" + locale.common.general_error + "</div>";
    }

    errorElement += "</div>";

    return errorElement;
}

function ajaxLoadView(url, params, container, getPost, cb, showErrorInModal) {
    $("#" + container).html("<div class='sidebar-loading-small' style=''><img src='/images/sidebar/loading-icon.gif' /></div>");

    if ((getPost == "") || (!getPost)) {
        getPost = "POST";
    }

    $.ajax({
        url: url,
        data: params,
        type: getPost,
        success: function (data) {
            if (data.error) {
                if (showErrorInModal) {
                    displayErrorAlert(displayErrorFromArray(data.error));
                }
            }

            $("#" + container).html(data);

            if (cb) {
                cb();
            }
        },
        error: function (err) {
            $("#sidebar_content").html("<div class='ajax-error'>An error occurred; please refresh your page and try again!</div>");
        }
    });
}

function ajaxLoadViewAppend(url, params, container, getPost, cb) {
    //$("#" + container).html("<div class='sidebar-loading-small' style=''><img src='/images/sidebar/loading-icon.gif' /></div>");

    if ((getPost == "") || (!getPost)) {
        getPost = "POST";
    }

    $.ajax({
        url: url,
        data: params,
        type: getPost,
        success: function (data) {
            $("#" + container).append(data);

            if (cb) {
                cb();
            }
        },
        error: function (err) {
            $("#sidebar_content").html("<div class='ajax-error'>An error occurred; please refresh your page and try again!</div>");
        }
    });
}

function ajaxLoadSidebarContent(url, params, getPost, cb) {
    $("#sidebar_content").html("<div class='sidebar-loading' style=''><img src='/images/sidebar/loading-icon.gif' /></div>");

    if ((getPost == "") || (!getPost)) {
        getPost = "POST";
    }

    $.ajax({
        url: url,
        data: params,
        type: getPost,
        success: function (data) {
            $("#sidebar_content").html(data);

            if (cb) {
                cb();
            }
        },
        error: function (err) {
            $("#sidebar_content").html("<div class='ajax-error'>An error occurred; please refresh your page and try again!</div>");
        }
    });
}

function displaySuccessAlert(title) {
    swal({
        title: title,
        icon: "success",
        timer: 5000,
        showConfirmButton: false
    });
}

function displayErrorAlert(text) {
    $("#errorModal .modal-body").html(text);
    $("#errorModal").modal("show");
}