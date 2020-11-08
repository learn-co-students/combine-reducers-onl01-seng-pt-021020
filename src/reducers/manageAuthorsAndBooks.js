import { combineReducers } from "redux";
 
const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
});
// in combineReducers, we return a state that has both a key of books with a value equal to the return value of the booksReducer(), same for authors.

export default rootReducer;

//  both booksReducer and authorsReducer are returning a default state of an empty array. 
function booksReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];
 
    case "REMOVE_BOOK":
      idx = state.findIndex(book => book.id  === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
 
    default:
      return state;
  }
}
 
// function authorsReducer(state = [], action) {
//   let idx;
//   switch (action.type) {
//     case "ADD_AUTHOR":
//       return [...state, action.author];
 
//     case "REMOVE_AUTHOR":
//       idx = state.findIndex(author => author.id  === action.id)
//       return [...state.slice(0, idx), ...state.slice(idx + 1)];
 
//     default:
//       return state;
//   }
// }
function authorsReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_AUTHOR":
      return [...state, action.author];
 
    case "REMOVE_AUTHOR":
      idx = state.findIndex(book => book.id === action.id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
 
     
    case "ADD_BOOK":
      let existingAuthor = state.filter(
        author => author.authorName === action.book.authorName 
        // => checking if authorName matches the name dispatches from the BookInput component. How do we know it is the BookInput component?
      );
      if (existingAuthor.length > 0) {
        return state;
        // if name already exists, state is returned unchanged.
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid() }];
        // if the name is not present, it is added to the author array. 
      }
 
    default:
      return state;
  }
}
