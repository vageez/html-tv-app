type BackHandler = () => boolean;

const stack: BackHandler[] = [];

export function pushBackHandler(handler: BackHandler) {
  stack.push(handler);
  return () => {
    const i = stack.indexOf(handler);
    if (i >= 0) stack.splice(i, 1);
  };
}

export function handleBackPress(): boolean {
  const handler = stack[stack.length - 1];
  if (!handler) return false;
  return handler();
}
