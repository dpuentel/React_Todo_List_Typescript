import React from 'react';

interface Props {
  deleteCompleted: () => Promise<void>;
}

/* export function TodoRemoveCompleted({ deleteCompleted }: Props) {
  const handleClearCompleted = async () => {
    await deleteCompleted();
  };

  return <button onClick={handleClearCompleted}>➖ Clear completed tasks</button>;
} */

export class TodoRemoveCompleted extends React.Component<Props> {
  /* constructor(props: Props) {
    super(props);
  } */

  private handleClearCompleted: () => Promise<void> = async () => {
    await this.props.deleteCompleted();
  };

  render() {
    return <button onClick={this.handleClearCompleted}>➖ Clear completed tasks</button>;
  }
}
