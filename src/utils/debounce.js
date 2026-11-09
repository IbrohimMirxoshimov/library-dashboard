const tasks = {};
let keySequence = 0;

export function debounce(callBack, nameTask, duration = 1000) {
	// get task
	let task = tasks[nameTask];

	// remove timeout if it has
	task && clearTimeout(task);

	// set new task or update
	tasks[nameTask] = setTimeout(callBack, duration);
}

export function cancelDebounce(nameTask) {
	tasks[nameTask] && clearTimeout(tasks[nameTask]);
	delete tasks[nameTask];
}

// Har bir komponent nusxasi uchun alohida kalit (bir-birining qidiruvini bekor qilmasin)
export function uniqueDebounceKey(prefix) {
	keySequence += 1;
	return `${prefix}-${keySequence}`;
}
