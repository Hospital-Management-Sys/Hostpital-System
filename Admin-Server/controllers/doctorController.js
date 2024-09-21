const Doctor = require('../models/doctorModel');

// Create a new doctor
const createDoctor = async (req, res) => {
    const { specialization, years_of_experience, contact_number } = req.body;
    try {
        const newDoctor = await Doctor.create(specialization, years_of_experience, contact_number);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.getAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a doctor by ID
const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.getById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a doctor's information
const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { specialization, years_of_experience, contact_number } = req.body;
    try {
        const updatedDoctor = await Doctor.update(id, specialization, years_of_experience, contact_number);
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDoctor = await Doctor.delete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
