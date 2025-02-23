export const initialState = {
  images: [],
  totalImg: 0,
  error: null,
  isLoading: false,
  page: 1,
  q: '',
  firstLoad: false,
  isOpen: false,
  content: null,
};

export const imageFinderReducer = (state, action) => {
  switch (action.type) {
    case 'fetchImg':
      return {
        ...state,
        images: [...state.images, ...action.payload.hits],
        totalImg: action.payload.totalHits,
      };
    case 'loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    case 'firstLoad':
      return { ...state, firstLoad: action.payload };
    case 'findImg':
      return {
        ...state,
        q: action.payload,
        images: [],
        page: 1,
      };
    case 'changePage':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'toggleModal':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'largeImgOpen':
      return { ...state, content: action.payload, isOpen: true };
    default:
      return state;
  }
};
