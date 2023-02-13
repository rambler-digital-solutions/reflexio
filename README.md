# reflexio
Business flow manager. 
Library for nice and scalable organizing of business logic in web applications.


## Motivation
**Use Dispatch for Free**. It was Initially build on the top of redux to make powerful tool for implementing business flow of large enterprise-level web applications.  No more *store.dispatch* hell. Just nicely readable and configurable in one place class-definitively styled description of the business logic of your application. 
Comes with ecosistem of helper packages and adapters to ui libries such as react.
## Installation

```bash

yarn add @reflexio/reflexio-on-redux

```

## Usage

To use it, implement *Slice* and it's *Bites*  as follows.
```typescript

import { User } from  'src/_api/types/entities';
import { loadUserDone } from  './loadUserDone';
import { loadUserWait } from  './loadUserWait';
import { IState, ITriggers } from 'src/_redux/types'
  

export  interface  IUserSate {
	user: User | null;
	loading: boolean;
}

export  interface  IUserTriggers {
	resetUserState: IUserSate
	loadUser: TriggerPhaseWrapper<{
		wait: never;
		done: User;
		fail: string;
	}>
};
  

export  const  userInitialState: IUserSate = {
	user:  null,
	loading:  false,
};


const loadUserBite = Bite<IUserTriggers, ITriggers, IUserState, IState, 'loadUser'>(
  {
  	wait:  loadUserWait,
	done:  loadUserDone,
	fail:  null,
  },
  {
    updateOn: [{ loadUser:  'done' }],
    canTrigger: [],
    instance: 'stable',
    script: LoadUser,
    triggerStatus: 'wait',
  }
);
const resetUserStateBite = Bite<IUserTriggers, ITriggers, IUserState, IState, 'resetUserState'>(
  resetUserState,
  null
);

export const userSlice = Slice<IUserTriggers, ITriggers, IUserState, IState>(
  'user',
  {
    loadUser: loadUserBite,
    resetUserState: resetUserStateBite,
  },
  userInitialState
);



```
where first argument of *Bite* function is reducer (or object of {pahaseName: phaseReduer}),
*loadUserWait* and *loadUserDone* behaves like they are mutating state.

```typescript
import { UserReducerType } from  '.';
import { MakeBiteReducerType } from '@reflexio/reflexio-on-redux/lib/types'
  

export  const  loadUserDone: MakeBiteReducerType<IUserTriggers, IUserState, 'loadUser'>['done'] = (
	state,
	payload
) => {
	state.user = payload;
	state.loading = false;
};

export  const  loadUserWait: MakeBiteReducerType<IUserTriggers, IUserState, 'loadUser'>['wait'] = (
	state,
	payload
) => {
	state.loading = true;
};
```

Second argument is **processor configuration object** (PCO), 
which feeds one of the key features of **redux-hang-on** library. 
What is processor? This is  where all the business happens.

In PCO 
> loadUser: { 
triggerStatus: wait 
...
}

means that process inits when *action* with the type *loadUser/wait* is dispatched.

>script: LoadUser

is a processor class itselves. 

>instance : ... 

 configures mode of creating of *LoadUser* class instance. There are three types of modes: **stable**, **refreshing** and **multiple**. **stable** means instance is created once when triggering action is dispatched and lives in the context until it will be manually dropped. On **refreshing** mode, instance is getting dropped and recreated every time. On **multiple**, the new instance of corresponding script class is created (with different uid).

  

Script class has required method **init(...)** which accepts triggered action payload and
is called when this action is dispatched.
It also has the non-required method **update(...)**, which is called every time when
actions with types specified in 
>updateOn: [....] are dispatched.

In array you can specify types of actions like ['actionOne', 'actionTwo'] or even specify more precisely [{actionOne: 'init' }] 

Let's see our example of *LoadUser* script.
```typescript

import { ScriptUpdateArgsType,
	 ScriptInitArgsType, 
	 ScriptOptsType } from  '@reflexio/reflexio-on-redux/lib/types';
import { IState } from  'src/_redux/types';
import { IUserTriggers } from  '../__reducers';

  

export  class  LoadUser {
	constructor(private  opts: ScriptOptsType<IUserTriggers, ITriggers, IState,'loadUser'>) {}

	public  async  init(args: ScriptInitArgsType<IUserTriggers, 'loadUser', 'wait'>) {
		/*
        ** Here you can call side effects, 
		** dispatch actions 
		** via this.opts.trigger('actionName', 'actionStatus',{...payload})
		** safely trigger action which does not affect updateOn watchers
		** via this.opts.triggerOnly('actionName', 'actionStatus',{...payload})
        ** get curent state via
        ** this.opts.getCurrentState()
		*/ 
		setTimeout(() => {
			this.opts.trigger('loadUser', 'fail', this.opts.uid);
		}, 5000);
	}

	public async  update(args: ScriptUpdateArgsType<IUserTriggers, 'loadUser', 'done'>) {

		this.opts.hangOn()
		/* 
        ** Here you can do all the same staff and 
		** call args.hangOn() to prevent reducer call. WOW!
		** this is not all  - you can call it like args.hangOn({keepUpdate: true}) 
		** to update state but without reducer call ( and subcequent  rendering in
		** react components). 
		*/
		
	}
}
```
Inside the script all the actions that could be triggered are specified in 
>canTrigger : [...]

Now  plug it into *redux* *store*

```typescript
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { userSlice, IUserState } from 'src/user/slice.config.t';


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

## To do

Implement communications between slices

  


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  

Please make sure to update tests as appropriate.

  

## License

[MIT](https://choosealicense.com/licenses/mit/)

