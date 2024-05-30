// ProjectForm.js
import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const ProjectForm = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState('');
    const [amountReceived, setAmountReceived] = useState('');
    const [totalExpense, setTotalExpense] = useState('');
    const [expenditureDescription, setExpenditureDescription] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmount, setExpenseAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        // Calculate total amount when total expense or expense amount changes
        const total = parseFloat(amountReceived) - getTotalExpenses();
        setTotalExpense(total);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountReceived, expenses]);

    // Function to calculate total expense
    const getTotalExpenses = () => {
        return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    };

    const handleAddEmployee = () => {
        if (newEmployee.trim() !== '') {
            setEmployees([...employees, newEmployee]);
            setNewEmployee('');
        }
    };

    const handleRemoveEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    const handleAddExpense = () => {
        if (expenditureDescription.trim() !== '' && expenseAmount.trim() !== '') {
            setExpenses([...expenses, { description: expenditureDescription, amount: expenseAmount }]);
            setExpenditureDescription('');
            setExpenseAmount('');
        }
    };

    const handleRemoveExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const handleAddProject = (e) => {
        e.preventDefault();

        if (!projectName || !projectManager || !employees.length || !amountReceived || !totalExpense) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        const duplicate = projects.find((project, index) => project.projectName === projectName && index !== editingIndex);
        if (duplicate) {
            setErrorMessage('Project with this name already registered.');
            return;
        }

        // Calculate total expenses
        const totalExpenses = getTotalExpenses();

        const newProject = {
            projectName,
            projectManager,
            employees,
            amountReceived: parseFloat(amountReceived),
            totalExpense: parseFloat(totalExpenses),
            expenses,
            profit: parseFloat(amountReceived) - totalExpenses,
        };

        if (isEditing) {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = newProject;
            setProjects(updatedProjects);
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            setProjects([...projects, newProject]);
        }

        // Reset form fields and state variables
        setProjectName('');
        setProjectManager('');
        setEmployees([]);
        setNewEmployee('');
        setAmountReceived('');
        setTotalExpense('');
        setExpenditureDescription('');
        setExpenseAmount('');
        setExpenses([]);
        setErrorMessage('');
    };

    const handleEditProject = (index) => {
        const project = projects[index];
        setProjectName(project.projectName);
        setProjectManager(project.projectManager);
        setEmployees(project.employees);
        setAmountReceived(project.amountReceived.toString());
        setTotalExpense(project.totalExpense.toString());
        setExpenses(project.expenses || []); // If expenses are not provided, default to an empty array
        setIsEditing(true);
        setEditingIndex(index);
    };

    const handleDeleteProject = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Project Management</h1>
                <form onSubmit={handleAddProject}>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div>
                        <label>Enter Project Name:</label>
                        <input 
                            type="text" 
                            value={projectName} 
                            onChange={(e) => setProjectName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Project Manager:</label>
                        <input 
                            type="text" 
                            value={projectManager} 
                            onChange={(e) => setProjectManager(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Employees:</label>
                        <div>
                            <input 
                                type="text" 
                                value={newEmployee} 
                                onChange={(e) => setNewEmployee(e.target.value)} 
                            />
                            <button type="button" onClick={handleAddEmployee}>Add Employee</button>
                        </div>
                        <ul>
                            {employees.map((employee, index) => (
                                <li key={index}>
                                    {employee} 
                                    <button type="button" onClick={() => handleRemoveEmployee(index)}>  Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label>Amount Received:</label>
                        <input 
                            type="number" 
                            value={amountReceived} 
                            onChange={(e) => setAmountReceived(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Expenditure Description:</label>
                        <input 
                            type="text" 
                            value={expenditureDescription} 
                            onChange={(e) => setExpenditureDescription(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Write Expense Amount:</label>
                        <input 
                            type="number" 
                            value={expenseAmount} 
                            onChange={(e) => setExpenseAmount(e.target.value)} 
                        />
                        <button type="button" onClick={handleAddExpense}>Click to Add Expense</button>
                    </div>
                    <div>
                        <ul>
                            {expenses.map((expense, index) => (
                                <li key={index}>
                                    {expense.description} - Rs{expense.amount}
                                    <button type="button" onClick={() => handleRemoveExpense(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</button>
                </form>
            </div>
            <div className="project-list">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={index
}
                        project={project}
                        onEdit={() => handleEditProject(index)}
                        onDelete={() => handleDeleteProject(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectForm;
