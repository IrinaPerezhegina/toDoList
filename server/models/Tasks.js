/** @format */

const { Schema, model } = require("mongoose");

const schema = new Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = model("Tasks", schema);
