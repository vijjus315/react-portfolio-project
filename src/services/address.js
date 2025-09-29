import apiClient from "./client.js";

export const getAddresses = async () => {
  try {
    const response = await apiClient.get("/product/get-user-addresses");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const addAddress = async (addressData) => {
  try {
    const response = await apiClient.post(
      "/product/add-user-address",
      addressData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await apiClient.post(
      `/product/update-user-address?id=${addressId}`,
      addressData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await apiClient.delete(
      `/product/delete-user-address?id=${addressId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export default { getAddresses, addAddress, updateAddress, deleteAddress };
