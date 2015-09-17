export function Runnable(target) {
  Object.assign(target.prototype, {
		run() {}
	});
}