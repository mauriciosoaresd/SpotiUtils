//função q retorna um estado
//recebe o estado inicial e a action(action.type e .payload)
const reducer = (state = 0, action) => {
    switch(action.type) {
        case "DEPOSIT":
            return state + action.payload;
        case "WITHDRAW":
            return state - action.payload;
        default:
            return state;
    }
}

export default reducer;