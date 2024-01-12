/** @format */

const express = require("express");

const Tasks = require("../models/Tasks");
const router = express.Router({ mergeParams: true });

// /api/tasks
router.get("/", async (req, res) => {
	try {
		const list = await Tasks.find();
		res.send(list);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});

router.post("/", async (req, res) => {
	try {
		const newTask = await Tasks.create({
			...req.body.data,
		});
		res.status(201).send(newTask);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});
router.delete("/", async (req, res) => {
	try {
		const tasksId = req.body._id;
		const removedTask = await Tasks.findById(tasksId);
		await removedTask.remove();
		return res.send(null);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});

router.patch("/", async (req, res) => {
	try {
		const updatedTask = await Tasks.findByIdAndUpdate(
			req.body.id,
			req.body.data,
			{
				new: true,
			},
		);

		res.send(updatedTask);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});
module.exports = router;
