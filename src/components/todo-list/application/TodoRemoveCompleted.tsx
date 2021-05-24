interface Props {
  deleteCompleted: () => Promise<void>;
}

export function TodoRemoveCompleted({ deleteCompleted }: Props) {
  const handleClearCompleted = async () => {
    await deleteCompleted();
  };

  return <button onClick={handleClearCompleted}>➖ Clear completed tasks</button>;
}
