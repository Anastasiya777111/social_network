import valid from "../../utils/valid.jsx";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
  } catch (err) {}
};

export const registration = (data) => async (dispatch) => {
  try {
    const check = valid(data);
    dispatch({ type: "NOTIFY", payload: { loading: true } });
  } catch (err) {}
};

export { valid };
