


export const getTriggerAndStatus = (
    actionType: string
  ): { trigger: string; status: string | null } => {
    const parts = actionType.split('/');
  
    return {
      trigger: parts[0],
      status: parts[1] || null,
    };
  };