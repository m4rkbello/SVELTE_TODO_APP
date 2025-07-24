import { writable} from "svelte/store";
import type {Todo, TodoFilter} from "../types/todo"

export const todoStore = writable<Todo[]>([]);
export const filterStore = writable<TodoFilter[]>(["all"]);

//Helper
export const todoAction = {
    add: (text: string, priority: Todo['priority'] = 'medium', category? : string) = {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: Text.trim(),
            completed: false,
            createdAt: new Date(),
            priority,
            category,
        };

        //update new data for todo ni chuy!
        todoStore.update(todos => [newTodo, ...todos])
    };

    toggle:(id: string) => {
        todoStore.update(todos => 
            todos.map((todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
        );
    },


    //UPDATE TODO
    update: (id: string, updates: Partial<Todo>) => {
        todoStore.update(todos => todos.map((todo => todo.id === id ? {...todo, updates} : todo))
        );
    },

    //DELETE TODO
    delete: (id: string) => {
        todoStore.update((todos) => todos.filter((todo) => todo.id !== id));
    },

    //CLEAR OR COMPLETED FILTER
    clearCompleted: () => {
        todoStore.update((todos) => todos.filter(todo => !todo.completed));
    },

    setFilter: (filter: TodoFilter) => {
        filterStore.set(filter);

        }
    }


};