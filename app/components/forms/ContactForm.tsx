"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { FormData, FormStatus } from "@/app/types/form";

const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("submitting");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setStatus("success");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setStatus("error");
				setErrorMessage(data.message || "Something went wrong");
			}
		} catch {
			setStatus("error");
			setErrorMessage("Failed to send message. Please try again.");
		}
	};

	const inputClasses =
		"w-full px-4 py-3 border border-accent text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
			<div className="mb-4">
				<label htmlFor="name" className="block text-white mb-2 font-medium">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					placeholder="Your name"
					className={inputClasses}
					disabled={status === "submitting"}
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="email" className="block text-white mb-2 font-medium">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
					placeholder="your.email@example.com"
					className={inputClasses}
					disabled={status === "submitting"}
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="message" className="block text-white mb-2 font-medium">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					required
					placeholder="Your message..."
					rows={5}
					className={`${inputClasses} resize-none`}
					disabled={status === "submitting"}
				/>
			</div>

			{status === "error" && (
				<div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300">
					{errorMessage}
				</div>
			)}

			{status === "success" && (
				<div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-300">
					Message sent successfully! I'll get back to you soon.
				</div>
			)}

			<button
				type="submit"
				disabled={status === "submitting"}
				className="w-full bg-accent text-black font-semibold py-3 px-6 rounded-md hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{status === "submitting" ? "Sending..." : "Send Message"}
			</button>
		</form>
	);
};

export default ContactForm;
