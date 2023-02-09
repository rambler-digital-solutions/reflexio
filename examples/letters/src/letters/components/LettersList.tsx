import * as React from 'react';
import { useTrigger } from "src/_redux/useTrigger";
import { useSelector } from "react-redux";
import { IState } from "src/_redux/types";
import {ComposeGrid} from 'src/compose/components/ComposeGrid'
import './styles.less'


export const LettersList = () => {
    const trigger = useTrigger();

    const { letters, isLoading } = useSelector(
        (state: IState ) => ({letters: state.letters.lettersList.data, 
            isLoading:state.letters.lettersList.loading 
        }))
    
      React.useEffect(()=> {
        trigger('lettersList', 'init', null);
        trigger('setContent', 'init', null);
 
      },[])
      
      return (
        <div className='lettersListContainer'>
            <button className='lettersListButton' 
              onClick={() => trigger('setContent', 'openWindow', {id: '-1'})}>Create new</button>
             <div><ComposeGrid/></div>
            {isLoading ? <div className='lettersList'>Loading ...</div>: null}
            <div className='lettersList'>
            { letters && letters.length ?  letters.map(l => 
                <div className='lettersListItem' key={l.uid} 
                  onClick={()=> trigger('setContent', 'openFromList', {
                  'body': l.body,
                  'subject': l.subject,
                })}>{l.subject} </div>
            ): null}
            </div>
        </div>
      );
}