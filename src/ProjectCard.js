// src/ProjectCard.js
import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const { projectName, projectManager, employees, amountReceived, totalExpense, profit } = project;

    return (
        <div className="card">
            <h2>{projectName}</h2>
            <p><strong>Project Manager:</strong> {projectManager}</p>
            <p><strong>Employees:</strong></p>
            <ul>
                {employees.map((employee, index) => (
                    <li key={index}>{employee}</li>
                ))}
            </ul>
            <p><strong>Amount Received:</strong> Rs {amountReceived}</p>
            <p><strong>Total Expense:</strong> Rs {totalExpense}</p>
            <p><strong>Profit:</strong> Rs {profit}</p>
            <button onClick={onEdit}>Edit Project</button>
            <button onClick={onDelete}>Delete Project</button>
        </div>
    );
};

export default ProjectCard;
