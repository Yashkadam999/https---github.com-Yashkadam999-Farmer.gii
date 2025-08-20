function MainReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          name: action.payload,
          isEditing: false,
        },
      ];

    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);

    case 'EDIT':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isEditing: true }
          : { ...todo, isEditing: false }
      );

    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name, isEditing: false }
          : todo
      );

    case 'CANCEL':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isEditing: false }
          : todo
      );

    default:
      return state;
  }
}

export default MainReducer;
