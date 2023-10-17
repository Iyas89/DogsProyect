import {
  GET_DOGS,
  GET_DOGBYNAME,
  GET_TEMPREMENT,
  FILTERDOGS,
  ORDEN_DOGS,
  GET_DOGBYID,
  FILTER_TEMP,
} from "./action-types.js";
import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    const respons = (await axios.get("http://localhost:3001/dogs")).data;
    return dispatch({
      type: GET_DOGS,
      payload: respons,
    });
  };
};
export const getDogByName = (name) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(
        `http://localhost:3001/dogname?name=${name}`
      );
      return dispatch({
        type: GET_DOGBYNAME,
        payload: data,
      });
    };
  } catch (error) {
    throw Error(error.message);
  }
};
export const getTemprement = () => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get("http://localhost:3001/temperaments");
      return dispatch({
        type: GET_TEMPREMENT,
        payload: data,
      });
    };
  } catch (error) {
    throw Error(error.message);
  }
};

export const getfilterDogs = (temp) => {
  return {
    type: FILTERDOGS,
    payload: temp,
  };
};

export function filterTemperaments(temp) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_TEMP,
      payload: temp,
    });
  };
}

export const getorderDogs = (order) => {
  return {
    type: ORDEN_DOGS,
    payload: order,
  };
};

export const getDogByID = (id) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
      console.log(data);
      return dispatch({
        type: GET_DOGBYID,
        payload: data,
      });
    };
  } catch (error) {
    throw Error(error.message);
  }
};
