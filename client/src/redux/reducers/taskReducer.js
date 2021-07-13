import { INIT_SORT, INIT_TASKS, TURN_PAGE } from "../actionTypes/actionTypes";

const initialState = {
  tasks: [],
  activePage: [],
  pages: null,
  arrayOfPages: [],
  pageNumber: 1,
  name: null,
  email: null,
  status: null,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_TASKS:
      state.tasks = action.payload;
      let sliced = state.tasks.slice();
      while (sliced.length) {
        if (sliced.length >= 3) {
          state.arrayOfPages.push(sliced.splice(0, 3));
        } else {
          state.arrayOfPages.push(sliced.splice(0));
        }
      }
      if (state.tasks.length >= 3) {
        state.activePage = state.tasks.slice(0, 3);
        state.pages = Math.ceil(state.tasks.length / 3);
        return { ...state };
      } else {
        state.activePage = state.tasks;
        state.pages = 1;
        return { ...state };
      }
    case TURN_PAGE:
      state.pageNumber = action.payload;
      state.activePage = state.arrayOfPages[action.payload - 1];
      return { ...state };
    case INIT_SORT:
      
      if(action.payload === "name") {
        if(state.name === null) {
          
          state.name = true;
          state.arrayOfPages = []
          let sliced = state.tasks.slice().sort();
          console.log(state.arrayOfPages);
          while (sliced.length) {
            if (sliced.length >= 3) {
              state.arrayOfPages.push(sliced.splice(0, 3));
            } else {
              state.arrayOfPages.push(sliced.splice(0));
            }
          }
          console.log(state.arrayOfPages)
          state.activePage = state.arrayOfPages[state.pageNumber];
          return {...state}
        }else {
          state.name = !state.name
        }
      }
      if(action.payload === "email") {
        if(state.email === null) {
          state.email = true;
        }else {
          state.email = !state.email
        }
      }
      if(action.payload === "status") {
        if(state.status === null) {
          state.status = true;
        }else {
          state.status = !state.status
        }
      }
      return { ...state };
    default:
      return state;
  }
}

export default taskReducer;
