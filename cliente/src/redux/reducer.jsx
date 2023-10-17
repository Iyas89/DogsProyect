import {
  GET_DOGS,
  GET_TEMPREMENT,
  GET_DOGBYNAME,
  FILTERDOGS,
  ORDEN_DOGS,
  GET_DOGBYID,
  FILTER_TEMP,
} from "./action-types.js";

const initialState = {
  Dogs: [],
  allDogs: [],
  Temprement: [],
  orderAndFilter: { order: "A", tempFilter: "All", originFilter: "all" },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        Dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_TEMPREMENT:
      return { ...state, Temprement: action.payload };

    case GET_DOGBYNAME:
      return {
        ...state,
        Dogs: action.payload,
        allDogs: action.payload,
      };

    case FILTER_TEMP:
      if (action.payload === "Todos") {
        return {
          ...state,
          Dogs: state.allDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            tempFilter:  [...state.Dogs],
          },
        };
      } else {
        let filteredDogs = state.allDogs.filter((dog) =>
          dog?.temperament?.includes(action.payload)
        );
        return {
          ...state,
          Dogs: filteredDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            tempFilter: action.payload,
            originFilter: "All",
          },
        };
      }

    case FILTERDOGS:
      if (action.payload === "Todos") {
        return {
          ...state,
          Dogs: state.allDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            originFilter: [...state.Dogs],
          },
        };
      } else {
        let filteredDogs = [];
        if (action.payload === "DATA_BASE")
          filteredDogs = state.allDogs.filter((dog) => dog.created === true);
        else if (action.payload === "API")
          filteredDogs = state.allDogs.filter((dog) => dog.created === false);
        return {
          ...state,
          Dogs: filteredDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            originFilter: action.payload,
            tempFilter: "All",
          },
        };
      }

    case ORDEN_DOGS:
      let orderedDogs = [...state.Dogs];
      let orderedAllDogs = [...state.allDogs];

      switch (action.payload) {
        case "Todos":
          return {
            ...state,
            Dogs: orderedAllDogs, 
            orderAndFilter: {
              ...state.orderAndFilter,
              order: action.payload,
            },
          };
        case "alfabético_Ascendente":
          orderedDogs.sort((a, b) => a.name.localeCompare(b.name));
          orderedAllDogs.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "alfabético_Descendente":
          orderedDogs.sort((a, b) => b.name.localeCompare(a.name));
          orderedAllDogs.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "weight_Ascendente":
          orderedDogs.sort((a, b) => {
            const weightA = a.weight ? parseInt(a.weight.split(" - ")[0]) : 0;
            const weightB = b.weight ? parseInt(b.weight.split(" - ")[0]) : 0;
            return weightA - weightB;
          });
          orderedAllDogs.sort((a, b) => {
            const weightA = a.weight ? parseInt(a.weight.split(" - ")[0]) : 0;
            const weightB = b.weight ? parseInt(b.weight.split(" - ")[0]) : 0;
            return weightA - weightB;
          });
          break;
        case "weight_Descendente":
          orderedDogs.sort((a, b) => {
            let weightA =
              a.weight && a.weight ? parseInt(a.weight.split(" - ")[0]) : 0;
            let weightB =
              b.weight && b.weight ? parseInt(b.weight.split(" - ")[0]) : 0;
            return weightB - weightA;
          });
          orderedAllDogs.sort((a, b) => {
            const weightA =
              a.weight && a.weight ? parseInt(a.weight.split(" - ")[0]) : 0;
            const weightB = b.weight ? parseInt(b.weight.split(" - ")[0]) : 0;
            return weightB - weightA;
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        Dogs: orderedDogs,
        allDogs: orderedAllDogs,
        orderAndFilter: {
          ...state.orderAndFilter,
          order: action.payload,
        },
      };

    case GET_DOGBYID:
      return { ...state, Dogs: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
