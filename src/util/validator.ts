function validateInt(value: number) {
  if (!Number.isInteger(value)) {
    throw new Error('dispatchInterval must be an integer');
  }
}

export { validateInt };
