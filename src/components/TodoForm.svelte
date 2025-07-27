<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "../types/todo";

  const dispatch = createEventDispatcher<{
    add: Todo;
  }>();

  //initializer choi
  let text = "";
  let priority: Todo["priority"] = "medium";
  let category = "";
  let showAdvanced = false;
</script>

<form class="todo-form">
  <div class="input-group">
    <div class="text-input-wrapper">
      <input type="text" bind:value{text} onkeydown="" class="text-input" />
    </div>
  </div>
</form>
