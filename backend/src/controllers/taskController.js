const prisma = require("../config/prisma");
const {
  taskSchema
} = require("../validators/taskValidator");

const createTask = async (req, res, next) => {
  try {
    taskSchema.parse(req.body);
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await prisma.task.findMany({
        include: {
          user: true,
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: {
          userId: req.user.id,
        },
      });
    }

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "ADMIN" &&
      task.userId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    taskSchema.partial().parse(req.body);
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "ADMIN" &&
      task.userId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "ADMIN" &&
      task.userId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};