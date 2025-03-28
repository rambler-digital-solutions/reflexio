# Reflexio
A state management solution built on top of Redux for clean, scalable organization of business logic in web applications.
 It helps you build large, enterprise-level applications with a modular and maintainable architecture.
This is a powerful tool for implementing complex business flows in enterprise-grade web applications. Say goodbye to store.dispatch chaos — instead, define your business logic in a clear, configurable, and class-based way, all in one place.
The library comes with an ecosystem of helper packages and adapters for popular UI libraries like React.


## Installation

```bash
yarn add @reflexio/core-v1

```

## 🎯 Motivation  

### 🔹 Introduction  

Redux is a powerful and intuitive state management tool, but it often requires **excessive boilerplate** just to implement small pieces of business logic. Developers must manually define reducers and action creators, leading to unnecessary complexity.  

Redux Toolkit (`@reduxjs/toolkit`) improved this by introducing **`createSlice`**, which simplifies state structuring by combining reducers and actions. However, **we believe there is still room for improvement**. Reflexio takes the next step by enhancing modularization, middleware integration, and event-driven state management.  

---

### 🔹 What Reflexio Adds to Redux  

Reflexio refines and extends Redux Toolkit by addressing these challenges:  

✅ **Modularization Beyond State Structure**  
- Not only modularizing state but also modularizing actions.  
- Enhancing action organization for better maintainability.  

✅ **Middleware as a Core Part of Modules**  
- In Reflexio, middlewares are **class instances** that persist in a dedicated container.  
- This ensures middleware logic is structured, reusable, and encapsulated.  

✅ **Separation of Action Types**  
- **Case-Reducer Actions:** Directly modify the state.  
- **Script-Only Actions (Events):** Do not modify the state but control business logic and side effects.  

✅ **Class-Based Middleware Handlers**  
- Middleware logic is encapsulated in **processor classes** that define event behavior.  
- This allows injected dependencies and better lifecycle control.  

---

### 🔹 The Need for Higher-Order Event Grouping  

Traditional reactive applications use **events (actions) and handlers** to modify state.  
However, in large applications, simple event-handler mappings become inefficient due to **interdependencies** between different actions and states.  

Consider these examples:  

- A **button click** starts an **asynchronous process**, which triggers an event when completed.  
- A **form action** should only be available after a **modal window is opened**.  

Such dependencies need to be **logically grouped** to improve maintainability and prevent conflicts.  

---

### 🔹 Reflexio’s Solution: Event Grouping with OOP  

To address these issues, Reflexio introduces **OOP-based event grouping**:  

🔹 **Introducing "Bytes" – The Building Blocks of Reflexio**  
A **Byte** is a structured entity that:  
- Groups **logically related events** into a single class-based module.  
- Encapsulates **reducers, middleware logic, and configurations** within a class.  
- Provides a **two-tier naming system** for actions:  
  - **Byte Name** → Defines the namespace for a set of actions.  
  - **Action Name** → Defines the individual event within that namespace.  

🔹 **How It Works**  
- **All actions first pass through middleware**, where they can be intercepted or pre-processed.  
- Then, the action is routed to the **appropriate reducer**, which updates the state.  
- Multiple reducers and middleware logic can be grouped under a **Byte**, keeping the codebase modular and scalable.  

---

### 🔹 Why Choose Reflexio?  

Reflexio eliminates Redux’s **boilerplate burden** while introducing a **structured, event-driven architecture** that:  

✅ **Reduces complexity** by modularizing both state and actions.  
✅ **Enhances maintainability** through clear OOP-based event grouping.  
✅ **Simplifies debugging** with structured event flows and clear action dependencies.  
✅ **Improves middleware organization** by treating middlewares as persistent class instances.  

🚀 Reflexio is designed for **enterprise-level applications** where scalability, modularity, and maintainability are critical.  



## 🚀 Key Features  

### 1️⃣ OOP Encapsulation – Spawning, Inheritance, and Dependency Injection (DI)  

Reflexio embraces object-oriented programming (OOP) techniques to make state management more modular and reusable.  

- Use **private properties** for intermediate storage, flags, caching, and other internal mechanisms.  
- **Extend functionality** by creating reusable templates and plugins through inheritance.  
- **Inject dependencies dynamically**, enabling flexible and modular business logic composition.  

With these features, Reflexio allows you to encapsulate logic inside structured units while maintaining clean and maintainable code.  

---

### 2️⃣ Separation of Storage and Business Logic – Enabling Multi-Stage Processing  

Reflexio enforces a strict separation between:  

- **State-Changing Actions (Reducers):**  
  - Modify the application state directly.  
  - Follow a predictable reducer logic for maintainability.  
  - Do not handle business logic beyond simple state modifications.  

- **Logic-Driven Actions (Middleware-Handled):**  
  - Do not modify the state directly but control the flow of business logic.  
  - Enable **multi-stage event processing**, where one event can trigger multiple independent operations.  
  - Keep business logic modular and prevent unnecessary state mutations.  

By separating these concerns, Reflexio simplifies debugging, improves performance, and ensures scalable workflows.  

---

### 3️⃣ Event-Oriented Reactivity – Beyond State Changes  

Unlike traditional Redux, Reflexio supports **event-driven reactivity**, allowing event handling **independently** of state modifications.  

- React to **pure events** with specific names or event ranges, even if they don't affect the state.  
- Enable **event-driven interactions** between Reflexio modules (*Bites*) and UI components.  
- **Intercept actions and redefine behavior dynamically**, enabling:  
  - Custom **caching** strategies.  
  - **Debugging** tools and event tracing.  
  - **Analytics** and telemetry collection.  

With Reflexio’s event-driven model, applications gain **greater flexibility** in managing interactions, reducing boilerplate while keeping logic modular and scalable.  

---

## 🎯 Conclusion  

Reflexio enhances Redux by introducing:  
✅ **Encapsulation** – using OOP principles for structured logic.  
✅ **Clear separation of concerns** – distinguishing between state and business logic.  
✅ **Event-driven reactivity** – enabling flexible and dynamic workflows.  

By eliminating unnecessary boilerplate and making state management more intuitive, Reflexio is an excellent choice for **building large-scale enterprise applications**.  



## Usage
In the following example we describe a single redux slice related to a specific functional part of the application using Slice function. 
It accepts slice name literal, initial state and Bites. Bites are created with  function Bite which accepts two arguments - object of reducers and middleware. 

```typescript

import {Slice, Bite} from '@reflexio/core-v1'


const loadUserBite = Bite(
  {
  	wait: (state, payload) => {
            state.loading = true
         },
	done:  (state, payload) => {
            state.loading = false
            state.user = payload
         },
	fail: (state, payload) => {
           state.error = payload
           state.loading = false
         },
  },
  {
    watchScope: ['loadUser'],
    instance: 'stable',
    script: LoadUser,
    initOn: 'wait',
  }
);
const resetUserStateBite = Bite(
  (state, payload) => { state = userInitialState},
  null
);

export const userSlice = Slice(
  'user',
  {
    loadUser: loadUserBite,
    resetUserState: resetUserStateBite,
  },
  userInitialState
);



```
where first argument of *Bite* function is reducer or object of the type of 
> {actionName: reducer},


Second argument is the **script configuration object**, 
which feeds one of the key features of **reflexio** library. 
What is script? This is  where all the business happens.


Here 
>script: LoadUser

is a middleware handler class. 

>instance : ... 

 configures mode of creating of *LoadUser* class instance. There are three types of modes: **stable**, **refreshing** and **multiple**. **stable** means instance is created once when triggering action is dispatched and lives in the context until it will be manually dropped. On **refreshing** mode, instance is getting dropped and recreated every time. On **multiple**, the new instance of corresponding script class is created (with different uid).

> initOn: wait 

means that middleware handler (script class instance) inits when *action* with the type *loadUser/wait* is dispatched.


  

Script class has required method **init(...)** which accepts triggered action payload and
is called when this action is dispatched.
It also has the non-required method **watch(...)**, which is called every time when
actions with types specified in 
>watchScope: [....] are dispatched.

In array you can specify types of actions like ['actionOne', 'actionTwo'] or even specify more precisely [{actionOne: 'init' }] 

Let's check out example of the *LoadUser* script.
```typescript
  

export  class  LoadUser {
	constructor(private  opts) {}

	public  async  init(args) {
		/*
        ** Here you can call side effects, 
		** dispatch actions 
		** via this.opts.trigger('actionName', 'actionStatus',{...payload})
    ** get current state via
    ** this.opts.getCurrentState()
		*/ 
		setTimeout(() => {
			this.opts.trigger('loadUser', 'fail', this.opts.uid);
		}, 5000);
	}

	public async  watch(args) {

		this.opts.hangOn()
		/* 
        ** Here you can do all the same staff and 
		*/
		
	}
}
```
Inside the script all the actions that could be triggered are specified in 
>canTrigger : [...]

Now  plug it into *redux* *store*

```typescript
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { userSlice, IUserState } from 'src/user/slice.config.ts';


export type IState = {
  user: IUserState;
};

export type ITriggers = IUserTriggers


const rootReducer = combineReducers({
  ...userSlice.reducer,
});

function configureStore() {
  const middlewares: Middleware[] = [userSlice.middleware];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
const store = configureStore();

export default store;

```


## Bite and Script

In Reflexio, a **bite** is a modular unit within a slice that manages a specific part of the application’s state and logic. Each bite communicates reactively with other bites through a **bus**, exchanging actions and responding to events in real time.

A **Script** is a class that encapsulates the bite’s business logic. It processes actions, responds to events, and manages state changes in an organized way. The script’s functionality is primarily governed by two core methods: `init` and `watch`.

### Bite Configuration Parameters

A script’s configuration defines its lifecycle, behavior, and event monitoring capabilities. Key parameters include:

#### `initOn`
- Defines the action that triggers the creation of a new script instance.
- When the specified action (e.g., `"init"`) is dispatched, the script’s `init()` function is executed.
- Used for initial setup tasks like logging or preloading data.

#### `instance`
- Determines how script instances are managed.
- `"stable"` means the script follows a **singleton pattern**, ensuring only one active instance per bite.
- This allows scripts to persistently manage state across different events.

#### `watchScope`
- Specifies which events the script should monitor.
- Events related to the listed bites trigger responses in the `watch` function.
- Example: `watchScope: ["calendarsList"]` makes the script listen for all events from the `calendarsList` bite.

### How the Script Works with Actions

The script’s behavior revolves around its `init` and `watch` methods:

#### `init` Method
- Executes once when the script is initialized based on `initOn`.
- Used for initial setup tasks.
- Example:
  - Logs an initialization message.
  - Dispatches `loadCalendarsList` to preload calendar items.

#### `watch` Method
- Continuously listens for actions defined in `watchScope`.
- Uses `catchStatus` to intercept specific actions and execute relevant logic.
- Examples:
  - Handles `clickCalendarListItem` to process list item selections.
  - Responds to `clickAddNewCalendar` to trigger new calendar creation.
  - Reacts to `setCloseAddCalendarWindow` for UI state updates.

### Script Utilities and Event Handling Tools

Reflexio provides several built-in utilities within the script context to simplify event management:

#### `catchStatus`
- Intercepts specific events and returns relevant details.
- Helps determine if a targeted event has occurred, enabling precise responses.

#### `getCurrentState`
- Retrieves the latest Redux state object.
- Ensures access to up-to-date data before executing actions.

#### `trigger`
- Dispatches an action across different bites.
- Takes `biteName`, `actionName`, and an optional `payload` as arguments.
- Facilitates inter-bite communication.

#### `setStatus`
- A local version of `trigger`, limited to the script’s current bite.
- Updates the bite’s state using the `actionName` and `payload`.
- Example:
  ```js
  this.opts.setStatus('setSelectedItemsList', newList);
  ```
  - Updates the selected items list after a checkbox click.

### Conclusion

Scripts in Reflexio offer a structured approach to handling business logic, state management, and event-driven interactions within bites. By leveraging `init`, `watch`, and built-in utilities, scripts enable seamless modularity and reactivity across the application.

## License

[MIT](https://choosealicense.com/licenses/mit/)