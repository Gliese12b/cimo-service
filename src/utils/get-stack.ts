export const getStack = (err: Error) => (err?.stack ? err.stack.split('\n').map((s) => s.trim()) : []);
