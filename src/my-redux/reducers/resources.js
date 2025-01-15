import { resources } from "api/resources";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { mergeArraysToUniqueList } from "utils/array";
import { ADD_NEEDS, ADD_NEWS, DELETE_RESOURCE } from "../constants/resource";

const resourcesList = Object.keys(resources);

const initialState = {
  items: [],
};

const getResourceReduser =
  (resource) =>
  (state = initialState, action) => {
    if (resource === action.resource) {
      switch (action.type) {
        case ADD_NEEDS:
          return {
            items: mergeArraysToUniqueList(state.items, action.items),
          };
        case ADD_NEWS:
          return {
            items: mergeArraysToUniqueList(state.items, action.items),
          };
        case DELETE_RESOURCE:
          if (action.id) {
            return {
              items: state.items.filter((r) => r.id !== action.id),
            };
          }

          return {
            items: [],
          };
        default:
          return state;
      }
    }

    return state;
  };

const resourceRedusers = resourcesList.reduce((pv, resource) => {
  return {
    ...pv,
    [resource]: persistReducer(
      {
        key: resource,
        storage: storage,
        keyPrefix: "l-",
      },
      getResourceReduser(resource)
    ),
  };
}, {});

export default resourceRedusers;
