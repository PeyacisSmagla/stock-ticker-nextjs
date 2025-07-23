export const getErrorMessage = (error) => {
  if (
    error?.response &&
    error?.response?.data &&
    error?.response?.data?.message
  ) {
    console.error("API Error:", error.response.data.message);
    return error.response.data.message;
  } else if (error.message) {
    console.error("Error:", error.message);
    return error.message;
  } else {
    console.error("Unexpected error:", error);
    return "An unexpected error occurred.";
  }
};
