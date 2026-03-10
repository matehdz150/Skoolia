export const SCHOOL_THREADS_UPDATED_EVENT = "school-threads-updated";

export function notifySchoolThreadsUpdated() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(SCHOOL_THREADS_UPDATED_EVENT));
}