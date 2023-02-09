import * as React from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'
import { IState } from 'src/_redux/types'
import { IPopupState } from '../popup.config'
import './style.less'


export const Window = () => {

    const popupState: IPopupState = useSelector((state: IState)=> state.popup, shallowEqual)

    return popupState.isOpen ? (
        <div className='popupBackground'>
            <div className='popupWindow'>{popupState.content}</div>
        </div>
    ): null
} 