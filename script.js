$(document).ready(function() {
    var getAndDisplayAllTasks = function (filter) {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1267',
            dataType: 'json',
            success: function(response, textStatus) {
                $('#task-list').empty();
                response.tasks.forEach(function(task) {
                    if (filter === 'active' && task.complete) return;
                    if (filter === 'completed' && !task.complete) return;
                    $('#task-list').append(
                        '<div class="row">' +
                            '<p class="col-xs-8">' + task.content + '</p>' +
                            '<button class="delete col-xs-1" data-id="' + task.id + '">Delete</button>' +
                            '<input type="checkbox" class="mark-complete col-xs-1" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' +
                        '</div>'
                    );
                });
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    var createTask = function() {
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1267',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function(response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayAllTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    $('#create-task').on('submit', function(e) {
        e.preventDefault();
        createTask();
    });

    var deleteTask = function(id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1267',
            success: function(response, textStatus) {
                console.log(response);
                getAndDisplayAllTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    var markTaskComplete = function(id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1267',
            dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

    var markTaskActive = function(id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1267',
            dataType: 'json',
            success: function (response, textStatus) {
              getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
        }

    $(document).on('click', '.delete', function() {
        var id = $(this).data('id');
        deleteTask(id);
    });

    $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
          markTaskComplete($(this).data('id'));
        } else {
          markTaskActive($(this).data('id'));
        }
      });

    var getCompleted = function(id){
        $.ajax({
            type: 'GET',
            url:'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1267',
            dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
    getAndDisplayAllTasks();
});
