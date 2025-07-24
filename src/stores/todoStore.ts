import { writable } from "svelte/store";
import type { Todo, TodoFilter } from "../types/todo";

// Writable stores
export const todoStore = writable<Todo[]>([]);
export const filterStore = writable<TodoFilter>("all");

// Helper
export const todoActions = {
    add: (text: string, priority: Todo['priority'] = 'medium', category?: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: text.trim(), // ✅ FIXED: used `text.trim()` instead of `Text.trim()`
            completed: false,
            createdAt: new Date(),
            priority,
            category,
        };

        todoStore.update(todos => [newTodo, ...todos]);
    },

    toggle: (id: string) => {
        todoStore.update(todos =>
            todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        );
    },

    update: (id: string, updates: Partial<Todo>) => {
        todoStore.update(todos =>
            todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo)
        );
    },

    delete: (id: string) => {
        todoStore.update(todos => todos.filter(todo => todo.id !== id));
    },

    clearCompleted: () => {
        todoStore.update(todos => todos.filter(todo => !todo.completed));
    },

    setFilter: (filter: TodoFilter) => {
        filterStore.set(filter);
    }
};
