import Career from "../models/careerModel.js";

// Create a career post
export const createCareer = async (req, res) => {
  try {
    const { postName, location, employmentType, experience, education, salary, isActive } = req.body;
    
    if (!postName || !location || !employmentType || !experience || !education || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const career = await Career.create({
      postName,
      location,
      employmentType,
      experience,
      education,
      salary,
      isActive: isActive === 'true' || isActive === true,
    });

    return res.status(201).json({
      success: true,
      career,
    });

  } catch (error) {
    console.error("Error creating career:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all careers
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      careers,
    });
  } catch (error) {
    console.error("Error getting careers:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single career
export const getCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      success: true,
      career,
    });
  } catch (error) {
    console.error("Error getting career:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update career
export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (updateData.isActive !== undefined) {
      updateData.isActive = updateData.isActive === 'true' || updateData.isActive === true;
    }

    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCareer) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      success: true,
      career: updatedCareer,
      message: "Career updated successfully",
    });
  } catch (error) {
    console.error("Error updating career:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete career
export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCareer = await Career.findByIdAndDelete(id);

    if (!deletedCareer) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting career:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
