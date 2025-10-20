// Update this URL to your backend server
const API_BASE_URL = 'http://192.168.1.38:5000'; 

export const predictGesture = async (imageUri) => {
  try {
    const formData = new FormData();
    
    // Append the image file
    formData.append('frame', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'frame.jpg',
    });

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting gesture:', error);
    throw error;
  }
};

export const resetScores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting scores:', error);
    throw error;
  }
};
