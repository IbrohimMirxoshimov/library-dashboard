const tasks = {};

export function debounce(callBack, nameTask, duration = 1000) {
	// get task
	let task = tasks[nameTask];

	// remove timeout if it has
	task && clearTimeout(task);

	// set new task or update
	tasks[nameTask] = setTimeout(callBack, duration);
}
