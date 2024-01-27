# Reflexio
State manager based on redux for nice and scalable organizing of business logic in web applications.
It helps you to build big enterprize level application with modular architecture. 


This is powerful tool for implementing business flow of large enterprise-level web applications.  No more *store.dispatch* hell. Just nicely readable and configurable in one place class-definitively styled description of the business logic of your application. 
Comes with ecosistem of helper packages and adapters to ui libries such as react.

## Installation

```bash
yarn add @reflexio/core-v1

```


## Motivation


Redux is an intuitively simple and powerful tool for state management. However it hurts when it comes to writing a lot of boilerplate to implement every small piece of business logic. We need to describe the reducer and  action creator. 
Now we have  such a nice improvement of this as  redux/toolkit. 
We bring new improvements to redux state management approach.
Here we make more  accent on redux-middlewares and use it not only for placing side-effects into it, but also to  to build a configurable structure of management events (actions)
flowing form triggers to the application state. This structure has a full set of injected management tools and custom dependencies as well as ability to organize local data and storage aside from application state.

## Usage
In the following example we describe a single redux slice related to a specific functional part of the application using Slice function. 
It accepts slice name literal, initial state and Bites. Bites are created with  function Bite which accepts two arguments - object of reducers and middleware. 

```typescript

import {Slice, Bite} from '@reflexio/react-v1'


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

 
  

## License

[MIT](https://choosealicense.com/licenses/mit/)