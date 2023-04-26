import { useDispatch } from 'react-redux';
import { ITriggers } from './types';
import { DispatcherType } from '../../../reflexio-on-redux/lib/types';
import { getActionType } from '../../../reflexio-on-redux/lib/utils';

export const useTrigger = () => {
  const dispatch = useDispatch();

  const trigger: DispatcherType<ITriggers> = (trigger, status, payload) => {
    const combynedType = getActionType(trigger, status as any);
    dispatch({ type: combynedType, payload });
  };

  return trigger;
};

/// более сложный пример
/// мультикомпоуз - список писем, 1 письмо, создать пиьмо, удалить письмо, обновить письмо (черновик)
/// без капчи и аттачей // каждый новый имейл сохраняется в контакты
/// список с пагинацией
