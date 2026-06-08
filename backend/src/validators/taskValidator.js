const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.string().optional()
});

module.exports = {
  taskSchema
};