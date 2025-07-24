<script lang="ts">
  import { onMount } from "svelte";
  import { todoStore, todoActions } from "./stores/todoStore";
  import type { Todo } from "./types/todo";

  let isInitialized = false;

  todoStore.subscribe((value) => {
    if (isInitialized) {
      localStorage.setItem("svelete-todo", JSON.stringify(value));
    }
  });

  onMount(() => {
    //initialization - load todos from localStorage
    let saveTodos = localStorage.getItem("svelte-todo");

    if (saveTodos) {
      try {
        const parseTodos = JSON.parse(saveTodos);
        const todosWithDates = parseTodos.map((todo: Todo) => ({
          ...todoStore,
          createdAt: new Date(todo.createdAt),
        }));
        todoStore.set(todosWithDates);
        isInitialized = true;
      } catch (error) {
        console.error("ERROR LOADING TODOS FROM LOCALSTORAGE", error);
        todoStore.set([]);
        isInitialized = true;
      }
    } else {
      isInitialized = true;
    }
  });

  function handleAdd(event: CustomEvent<Todo>) {
    todoActions.add(
      event.detail.text,
      event.detail.priority,
      event.detail.category
    );
  }
</script>

<main class="app">
  <div class="container">
    <header class="header">
      <h1>Modern Todo App</h1>
      <p>Stay organized and boost your productivity</p>
    </header>
    <div class="content">
      <!--TodoFORM-->
    </div>
  </div>
</main>

<style>
  .app {
    min-height: 100vh;
    background: radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%
    );
    font-family:
      "linter",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    padding: 2rem 1rem;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }

  .header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
