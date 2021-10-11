var task = []

document.forms[0].onsubmit = function(e) {
    e.preventDefault();
    task.push(
        {
            date: new Date(),
            name: e.target.name.value,
            description: e.target.description.value,
        }
    );
    var lastTask = task[task.length-1]
    var updateTask = `<td>${lastTask.date}</td><td>${lastTask.name}</td><td>${lastTask.description}</td>`
    document.querySelector('tbody').innerHTML += updateTask    
}