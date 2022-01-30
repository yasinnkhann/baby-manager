import Head from 'next/head';
import { parseJSON } from 'date-fns';
import TodoItem from '../components/TodoItem';

export const getStaticProps = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    return {
      props: { todos: data },
    };
  } catch (err) {
    console.log(err);
  }
};

const Todos = ({ todos }) => {
  const renderTodos = () => {
    return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <>
      <Head>
        <title>BabyManager | Todos</title>
      </Head>
      <section>
        <h1>Todos</h1>
        {renderTodos()}
      </section>
    </>
  );
};

export default Todos;
