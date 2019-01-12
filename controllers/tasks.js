const Task = require('../models/task');

exports.getAddTask = (req, res, next) => {
  res.render('add-task', {
    pageTitle: 'Add Task',
    path: '/add-task',
    editing: false
  });
};
exports.postAddTask = (req, res, next) => {

  const {title} = req.body;
  const {description} = req.body;
  const task = new Task(title, description);
  task.save()
  .then(result => {
      res.redirect('/')
  })
  .catch(error => {
    throw error
  })
  
};

exports.getTasks = (req, res, next) => {
  Task.fetchAll()
    .then(tasks => {
      res.render('tasks', {
        tasks,
        pageTitle: 'All Tasks',
        path: '/'
      });
    })
    .catch(error => {
      throw error
    });
};

exports.getTask = (req, res, next) => {
  const {taskId} = req.params;

  Task.findById(taskId)
    .then(task => {
      res.render('task-details', {
        task: task,
        pageTitle: task.title,
        path: '/tasks'
      });
    })
    .catch(error => {throw  error});
};
exports.postDeleteTask = (req, res, next) => {
  const {taskId} = req.body
  Task.deleteById(taskId)
    .then(() => {
 
      res.redirect('/');
    })
    .catch(error => {
      throw error
    });
};
exports.getEditTask = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.redirect('/');
      }
      res.render('add-task', {
        pageTitle: 'Edit task',
        path: '/edit-task',
        editing: editMode,
      task: task
      });
    })
    .catch(error => {throw error});
};
exports.postEditTask = (req, res, next) => {
  const {taskId} = req.body;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;


  const task = new Task(
    updatedTitle,
    updatedDesc,
    taskId
  );
  task
    .save()
    .then(result => {

      res.redirect('/');
    })
    .catch(error => {throw error});
};

