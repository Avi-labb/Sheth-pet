import Blog from "../models/blogModel.js";

// Create a blog post
export const createBlog = async (req, res) => {
  try {

    const { title, description, content, author, tags, isPublished } = req.body;
    
    if (!title || !description || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, description and content are required",
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const blogData = {
      title,
      slug,
      description,
      content,
      author: author || "Admin",
      isPublished: isPublished === 'true' || isPublished === true,
    };

    if (req.file) {
      blogData.image = req.file.filename;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Handle tags
    if (tags) {
      if (typeof tags === 'string') {
        try {
          blogData.tags = JSON.parse(tags);
        } catch {
          blogData.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
      } else if (Array.isArray(tags)) {
        blogData.tags = tags;
      }
    }

    const blog = await Blog.create(blogData);

    return res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error getting blogs:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single blog by id or slug
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    let blog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error getting blog:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const body = req.body || {};
    const updateData = {};

    if (body.title !== undefined) {
      updateData.title = body.title;
      // Update slug if title changed
      updateData.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.isPublished !== undefined) {
      updateData.isPublished = body.isPublished === 'true' || body.isPublished === true;
    }

    // Handle tags
    if (body.tags !== undefined) {
      let tags = body.tags;
      if (typeof tags === 'string') {
        try {
          tags = JSON.parse(tags);
        } catch {
          tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
      }
      updateData.tags = tags;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      blog: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
