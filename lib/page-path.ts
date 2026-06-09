export const normalizePagePath = (value: string) => {
	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}

	let path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
	path = path.replace(/\/{2,}/g, "/");

	if (path.length > 1 && path.endsWith("/")) {
		path = path.slice(0, -1);
	}

	if (path.includes("..") || path.includes("?") || path.includes("#")) {
		return null;
	}

	return path;
};
