/* eslint-disable sonar/for-in */
/* eslint-disable no-useless-constructor */
import { getTriggerAndStatus } from "./utils";
import { UpdateOnType } from "./types";

/**
 * 
 * key object (__ISALL__: boolean)
 * other keys are statuses from array
 * value of status keys or __ISALL__ key are biteNames array (to which trigger __afterEffects__ event)
 */

/*
** 
*/

export class AfterEffects {
    private finalMap: any = {};
    private removeCheckMap: any = {};
    constructor(private getCurrentTask: () => {type: string, payload: string}, private timeout: number) {}

    private dispatchAf(trigger, status, key, payload, dispather: (action) => void) {
        if(this.finalMap[trigger][key] === '_ALLSTATUSES_') {
            setTimeout(()=> {
                dispather({
                    type: `${key}/__AFTEREFFECTS__`,
                    payload
                })
            },this.timeout)
         
            return;
        }

        if(this.finalMap[trigger][key] === status ) {
            setTimeout(()=> {
                dispather({
                    type: `${key}/__AFTEREFFECTS__`,
                    payload
                })},this.timeout)

            return;
        }

        if(this.finalMap[trigger][key].includes(status)) {
            setTimeout(() => {
                dispather({
                    type: `${key}/__AFTEREFFECTS__`,
                    payload
                })
            },this.timeout)  
        }
    }
     
    public handleAfterEffect = (dispather: (action) => void) => {
        const currentTask = this.getCurrentTask();
        const dispatchPayload = currentTask;

        if(currentTask) {
            const {trigger, status} = getTriggerAndStatus(currentTask.type);

            if(this.finalMap[trigger]) {
                for( const key in this.finalMap[trigger]) {
                    this.dispatchAf(trigger, status, key, dispatchPayload, dispather)
                }
            }
        }
        //check if current task has after effects
        //if is => dispatch after effects
        
    }   

    public removeAfterEffect = (biteName:string) => {
        if(this.removeCheckMap[biteName]) {
            for(const r of this.removeCheckMap[biteName]) {
                if(typeof r === 'string') {
                    delete this.finalMap[r][biteName]
                }
                else {
                    const objectkey = Object.keys(r)[0];

                    delete this.finalMap[objectkey][biteName]
                }
            }
        }

        delete this.removeCheckMap[biteName]
    }

    public  addAfterEffect = <Tr>(updateOn: UpdateOnType<Tr>, biteName: string) => {
   
        //add to remove map array
        this.removeCheckMap[biteName] = updateOn;

        for (const uo of updateOn) {  
            if(!this.finalMap[uo]) {
                this.finalMap[uo] = {}
            }

            if(typeof uo === 'string') {
                this.finalMap[uo][biteName] = '_ALLSTATUSES_'
            }
            else {
                const objectkey = Object.keys(uo)[0];
                const objectValues = uo[objectkey];

                this.finalMap[objectkey][biteName] = objectValues;
            }
        }
    
    }
}